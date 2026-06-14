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

export {createCustomSchematizer};
