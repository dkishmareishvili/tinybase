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
const _VALUE = 'value';
const DOMAIN = 'domain';
const KEY = 'key';
const OPTIONAL = 'optional';
const REQUIRED = 'required';
const UNIT = 'unit';
const SEQUENCE = 'sequence';

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const isNullish = (thing) => thing == null;
const isUndefined = (thing) => thing === void 0;
const isNull = (thing) => thing === null;
const isTrue = (thing) => thing === true;
const isFalse = (thing) => thing === false;
const ifNotNullish = getIfNotFunction(isNullish);
const ifNotUndefined = getIfNotFunction(isUndefined);
const isString = (thing) => getTypeOf(thing) == STRING;
const isArray = (thing) => Array.isArray(thing);
const size = (arrayOrString) => arrayOrString.length;

const arrayEvery = (array, cb) => array.every(cb);
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
  const schemaData = schema?.json ?? schema;
  if (isArray(schemaData)) {
    const hasNull = !arrayEvery(
      schemaData,
      (item) => !isNull(item?.[UNIT]) && !isNull(item),
    );
    if (
      size(schemaData) === 2 &&
      isFalse(schemaData[0]?.[UNIT]) &&
      isTrue(schemaData[1]?.[UNIT])
    ) {
      return [{[TYPE]: BOOLEAN}, defaultValue, allowNull ?? false];
    }
    if (arrayEvery(schemaData, (item) => isString(item?.[UNIT] ?? item))) {
      return [{[TYPE]: STRING}, defaultValue, allowNull ?? false];
    }
    if (hasNull) {
      const nonNullItem = arrayFind(
        schemaData,
        (item) => !isNull(item?.[UNIT]) && !isNull(item) && item !== '=',
      );
      if (nonNullItem) {
        return unwrapSchema(nonNullItem, defaultValue, true);
      }
    }
  }
  if (!isArray(schemaData) && !isUndefined(schemaData?.[SEQUENCE])) {
    return [{[TYPE]: ARRAY}, defaultValue, allowNull ?? false];
  }
  if (!isArray(schemaData) && isString(schemaData?.[UNIT])) {
    return [{[TYPE]: STRING}, defaultValue, allowNull ?? false];
  }
  return [
    {[TYPE]: schemaData?.[DOMAIN] || schemaData},
    defaultValue,
    allowNull ?? false,
  ];
};
const getProperties = (schema) => {
  const properties = objNew();
  const schemaData = schema?.json ?? schema;
  if (schemaData?.[REQUIRED]) {
    arrayForEach(schemaData[REQUIRED], (field) => {
      properties[field[KEY]] = field[_VALUE];
    });
  }
  if (schemaData?.[OPTIONAL]) {
    arrayForEach(schemaData[OPTIONAL], (field) => {
      const value = field[_VALUE];
      const defaultVal = field[DEFAULT];
      properties[field[KEY]] = !isUndefined(defaultVal)
        ? {[_VALUE]: value, [DEFAULT]: defaultVal}
        : value;
    });
  }
  return objIsEmpty(properties) ? void 0 : properties;
};
const unwrapSchemaWithDefaults = (schema, defaultValue, allowNull) => {
  if (isArray(schema) && size(schema) === 3 && schema[1] === '=') {
    const schemaValue = schema[0]?.json ?? schema[0];
    return unwrapSchema(schemaValue, schema[2], allowNull);
  }
  if (schema?.[_VALUE] && !isUndefined(schema?.[DEFAULT])) {
    return unwrapSchema(schema[_VALUE], schema[DEFAULT], allowNull);
  }
  return unwrapSchema(schema, defaultValue, allowNull);
};
const createArkTypeSchematizer = () =>
  createCustomSchematizer(unwrapSchemaWithDefaults, getProperties);

export {createArkTypeSchematizer};
