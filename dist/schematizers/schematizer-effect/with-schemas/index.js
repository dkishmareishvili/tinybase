const getTypeOf = (thing) => typeof thing;
const EMPTY_STRING = '';
const STRING = getTypeOf(EMPTY_STRING);
const BOOLEAN = getTypeOf(true);
const NUMBER = getTypeOf(0);
const OBJECT = 'object';
const ARRAY = 'array';
const TYPE = 'type';
const DEFAULT = 'default';
const ALLOW_NULL = 'allowNull';
const LITERAL = 'Literal';
const PROPERTY_SIGNATURES = 'propertySignatures';
const STRING_KEYWORD = 'String';
const NUMBER_KEYWORD = 'Number';
const BOOLEAN_KEYWORD = 'Boolean';
const TUPLE_TYPE = 'Arrays';
const TYPE_LITERAL = 'Objects';
const NULL_KEYWORD = 'Null';
const UNION = 'Union';

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const isNullish = (thing) => thing == null;
const isUndefined = (thing) => thing === void 0;
const ifNotNullish = getIfNotFunction(isNullish);
const ifNotUndefined = getIfNotFunction(isUndefined);
const size = (arrayOrString) => arrayOrString.length;

const arrayForEach = (array, cb) => array.forEach(cb);
const arrayFind = (array, cb) => array.find(cb);

const object = Object;
const getPrototypeOf = (obj) => object.getPrototypeOf(obj);
const objEntries = object.entries;
const isObject = (obj) =>
  !isNullish(obj) &&
  ifNotNullish(
    getPrototypeOf(obj),
    (objPrototype) =>
      objPrototype == object.prototype ||
      isNullish(getPrototypeOf(objPrototype)),

    /* istanbul ignore next */
    () => true,
  );
const objIds = object.keys;
const objFreeze = object.freeze;
const objNew = (entries = []) => object.fromEntries(entries);
const objForEach = (obj, cb) =>
  arrayForEach(objEntries(obj), ([id, value]) => cb(value, id));
const objSize = (obj) => size(objIds(obj));
const objIsEmpty = (obj) => isObject(obj) && objSize(obj) == 0;

const createCustomSchematizer = (unwrapSchema, getProperties) => {
  const toCellOrValueSchema = (schema) => {
    const [unwrapped, defaultValue, allowNull] = unwrapSchema(schema);
    const type = unwrapped?.type;
    if (
      type !== STRING &&
      type !== NUMBER &&
      type !== BOOLEAN &&
      type !== OBJECT &&
      type !== ARRAY
    ) {
      return void 0;
    }
    const cellOrValueSchema = {[TYPE]: type};
    ifNotUndefined(defaultValue, (defaultValue2) => {
      cellOrValueSchema[DEFAULT] = defaultValue2;
    });
    if (allowNull) {
      cellOrValueSchema[ALLOW_NULL] = true;
    }
    return cellOrValueSchema;
  };
  const toTablesSchema = (schemas) => {
    const tablesSchema = objNew();
    objForEach(schemas, (schema, tableId) => {
      const tableSchema = objNew();
      ifNotUndefined(getProperties(schema), (properties) =>
        objForEach(properties, (cellSchema, cellId) =>
          ifNotUndefined(toCellOrValueSchema(cellSchema), (cellSchema2) => {
            tableSchema[cellId] = cellSchema2;
          }),
        ),
      );
      if (!objIsEmpty(tableSchema)) {
        tablesSchema[tableId] = tableSchema;
      }
    });
    return tablesSchema;
  };
  const toValuesSchema = (schemas) => {
    const valuesSchema = objNew();
    objForEach(schemas, (schema, valueId) =>
      ifNotUndefined(toCellOrValueSchema(schema), (valueSchema) => {
        valuesSchema[valueId] = valueSchema;
      }),
    );
    return valuesSchema;
  };
  return objFreeze({
    toTablesSchema,
    toValuesSchema,
  });
};

const unwrapSchema = (schema, defaultValue, allowNull) => {
  const ast = schema.ast || schema;
  const type = ast._tag;
  if (type === UNION) {
    const types = ast.types;
    const nonNullType = arrayFind(types, (t) => t._tag !== NULL_KEYWORD);
    return [
      {[TYPE]: getSimpleType(nonNullType)},
      defaultValue,
      allowNull || !!arrayFind(types, (t) => t._tag === NULL_KEYWORD),
    ];
  }
  return [{[TYPE]: getSimpleType(ast)}, defaultValue, allowNull || false];
};
const getSimpleType = (ast) => {
  const tag = ast?._tag;
  const literalType = typeof ast?.literal;
  return tag === LITERAL
    ? literalType === STRING ||
      literalType === NUMBER ||
      literalType === BOOLEAN
      ? literalType
      : EMPTY_STRING
    : tag === STRING_KEYWORD
      ? STRING
      : tag === NUMBER_KEYWORD
        ? NUMBER
        : tag === BOOLEAN_KEYWORD
          ? BOOLEAN
          : tag === TUPLE_TYPE
            ? ARRAY
            : tag === TYPE_LITERAL
              ? OBJECT
              : EMPTY_STRING;
};
const getProperties = (schema) => {
  const ast = schema.ast;
  if (ast._tag === TYPE_LITERAL) {
    const signatures = ast[PROPERTY_SIGNATURES];
    if (signatures) {
      const properties = {};
      signatures.forEach((sig) => {
        properties[sig.name] = sig.type;
      });
      return properties;
    }
  }
};
const createEffectSchematizer = () =>
  createCustomSchematizer(unwrapSchema, getProperties);

export {createEffectSchematizer};
