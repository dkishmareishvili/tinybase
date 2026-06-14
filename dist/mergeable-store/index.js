const getTypeOf = (thing) => typeof thing;
const EMPTY_STRING = '';
const STRING = getTypeOf(EMPTY_STRING);
const BOOLEAN = getTypeOf(true);
const NUMBER = getTypeOf(0);
const FUNCTION = getTypeOf(getTypeOf);
const OBJECT = 'object';
const ARRAY = 'array';
const TYPE = 'type';
const DEFAULT = 'default';
const ALLOW_NULL = 'allowNull';
const NULL = 'null';
const LISTENER = 'Listener';
const SET = 'set';
const ADD = 'add';
const DEL = 'del';
const HAS = 'Has';
const IDS = 'Ids';
const TABLE = 'Table';
const TABLES = TABLE + 's';
const TABLE_IDS = TABLE + IDS;
const ROW = 'Row';
const ROW_COUNT = ROW + 'Count';
const ROW_IDS = ROW + IDS;
const CELL = 'Cell';
const CELL_IDS = CELL + IDS;
const VALUE = 'Value';
const VALUES = VALUE + 's';
const VALUE_IDS = VALUE + IDS;
const TRANSACTION = 'Transaction';
const JSON_PREFIX = '\uFFFD';
const id = (key) => EMPTY_STRING + key;
const strStartsWith = (str, prefix) => str.startsWith(prefix);
const strEndsWith = (str, suffix) => str.endsWith(suffix);
const strSplit = (str, separator = EMPTY_STRING, limit) =>
  str.split(separator, limit);

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const GLOBAL = globalThis;
const math = Math;
const mathMax = math.max;
const mathFloor = math.floor;
const isFiniteNumber = isFinite;
const isInstanceOf = (thing, cls) => thing instanceof cls;
const isNullish = (thing) => thing == null;
const isUndefined = (thing) => thing === void 0;
const isNull = (thing) => thing === null;
const ifNotNullish = getIfNotFunction(isNullish);
const ifNotUndefined = getIfNotFunction(isUndefined);
const isTypeStringOrBoolean = (type) => type == STRING || type == BOOLEAN;
const isString = (thing) => getTypeOf(thing) == STRING;
const isFunction = (thing) => getTypeOf(thing) == FUNCTION;
const isArray = (thing) => Array.isArray(thing);
const slice = (arrayOrString, start, end) => arrayOrString.slice(start, end);
const size = (arrayOrString) => arrayOrString.length;
const test = (regex, subject) => regex.test(subject);
const noop = () => {};
const structuredClone = GLOBAL.structuredClone;
const tryCatch = async (action, then1, then2) => {
  try {
    return await action();
  } catch (error) {
    /* istanbul ignore next */
    then1?.(error);
  }
};

const arrayHas = (array, value) => array.includes(value);
const arrayEvery = (array, cb) => array.every(cb);
const arrayIsEqual = (array1, array2) =>
  size(array1) === size(array2) &&
  arrayEvery(array1, (value1, index) => array2[index] === value1);
const arraySort = (array, sorter) => array.sort(sorter);
const arrayForEach = (array, cb) => array.forEach(cb);
const arrayMap = (array, cb) => array.map(cb);
const arrayReduce = (array, cb, initial) => array.reduce(cb, initial);
const arrayPush = (array, ...values) => array.push(...values);
const arrayShift = (array) => array.shift();

const object = Object;
const getPrototypeOf = (obj) => object.getPrototypeOf(obj);
const objFrozen = object.isFrozen;
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
const objHas = (obj, id) => id in obj;
const objDel = (obj, id) => {
  delete obj[id];
  return obj;
};
const objForEach = (obj, cb) =>
  arrayForEach(objEntries(obj), ([id, value]) => cb(value, id));
const objToArray = (obj, cb) =>
  arrayMap(objEntries(obj), ([id, value]) => cb(value, id));
const objMap = (obj, cb) =>
  objNew(objToArray(obj, (value, id) => [id, cb(value, id)]));
const objSize = (obj) => size(objIds(obj));
const objIsEmpty = (obj) => isObject(obj) && objSize(obj) == 0;

/* istanbul ignore next */
const objIsEqual = (
  obj1,
  obj2,
  isEqual = (value1, value2) => value1 === value2,
) => {
  const entries1 = objEntries(obj1);
  return (
    size(entries1) === objSize(obj2) &&
    arrayEvery(entries1, ([index, value1]) =>
      isObject(value1)
        ? /* istanbul ignore next */
          isObject(obj2[index])
          ? objIsEqual(obj2[index], value1, isEqual)
          : false
        : isEqual(value1, obj2[index]),
    )
  );
};
const objEnsure = (obj, id, getDefaultValue) => {
  if (!objHas(obj, id)) {
    obj[id] = getDefaultValue();
  }
  return obj[id];
};
const objValidate = (obj, validateChild, onInvalidObj, emptyIsValid = 0) => {
  if (
    isNullish(obj) ||
    !isObject(obj) ||
    (!emptyIsValid && objIsEmpty(obj)) ||
    objFrozen(obj)
  ) {
    onInvalidObj?.();
    return false;
  }
  objForEach(obj, (child, id) => {
    if (!validateChild(child, id)) {
      objDel(obj, id);
    }
  });
  return emptyIsValid ? true : !objIsEmpty(obj);
};

const jsonString = JSON.stringify;
const jsonParse = JSON.parse;
const jsonStringWithMap = (obj) =>
  jsonString(obj, (_key, value) =>
    isInstanceOf(value, Map) ? object.fromEntries([...value]) : value,
  );

const getCellOrValueType = (cellOrValue) => {
  if (isNull(cellOrValue)) {
    return NULL;
  }
  if (isArray(cellOrValue)) {
    return ARRAY;
  }
  if (isObject(cellOrValue)) {
    return OBJECT;
  }
  const type = getTypeOf(cellOrValue);
  return isTypeStringOrBoolean(type) ||
    (type == NUMBER && isFiniteNumber(cellOrValue))
    ? type
    : void 0;
};
const isCellOrValueOrUndefined = (cellOrValue) =>
  isUndefined(cellOrValue) || !isUndefined(getCellOrValueType(cellOrValue));
const isJsonType = (type) => type == OBJECT || type == ARRAY;
const encodeIfJson = (value) =>
  isObject(value) || isArray(value) ? JSON_PREFIX + jsonString(value) : value;
const isEncodedJson = (value) => isString(value) && value[0] == JSON_PREFIX;
const decodeIfJson = (raw, _id, encoded) =>
  !encoded && isEncodedJson(raw) ? jsonParse(slice(raw, 1)) : raw;

const collSizeN = (collSizer) => (coll) =>
  arrayReduce(collValues(coll), (total, coll2) => total + collSizer(coll2), 0);
const collSize = (coll) => coll?.size ?? 0;
const collSize2 = collSizeN(collSize);
const collSize3 = collSizeN(collSize2);
const collSize4 = collSizeN(collSize3);
const collHas = (coll, keyOrValue) => coll?.has(keyOrValue) ?? false;
const collIsEmpty = (coll) => isUndefined(coll) || collSize(coll) == 0;
const collValues = (coll) => [...(coll?.values() ?? [])];
const collClear = (coll) => coll.clear();
const collForEach = (coll, cb) => coll?.forEach(cb);
const collDel = (coll, keyOrValue) => coll?.delete(keyOrValue);

const textEncoder = /* @__PURE__ */ new GLOBAL.TextEncoder();
const getHash = (string) => {
  let hash = 2166136261;
  arrayForEach(textEncoder.encode(string), (char) => {
    hash ^= char;
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  });
  return hash >>> 0;
};
const addOrRemoveHash = (hash1, hash2) => (hash1 ^ hash2) >>> 0;
const getValueInValuesHash = (valueId, valueHash) =>
  getHash(valueId + ':' + valueHash);
const getValueHash = (value, valueHlc) =>
  getHash(jsonStringWithMap(value ?? null) + ':' + valueHlc);

const map = Map;
const mapNew = (entries) => new map(entries);
const mapKeys = (map2) => [...(map2?.keys() ?? [])];
const mapGet = (map2, key) => map2?.get(key);
const mapForEach = (map2, cb) =>
  collForEach(map2, (value, key) => cb(key, value));
const mapMap = (coll, cb) =>
  arrayMap([...(coll?.entries() ?? [])], ([key, value]) => cb(value, key));
const mapSet = (map2, key, value) =>
  isUndefined(value) ? (collDel(map2, key), map2) : map2?.set(key, value);
const mapEnsure = (map2, key, getDefaultValue, hadExistingValue) => {
  if (!collHas(map2, key)) {
    mapSet(map2, key, getDefaultValue());
  } else {
    hadExistingValue?.(mapGet(map2, key));
  }
  return mapGet(map2, key);
};
const mapMatch = (map2, obj, set, del = mapSet) => {
  objMap(obj, (value, id) => set(map2, id, value));
  mapForEach(map2, (id) => (objHas(obj, id) ? 0 : del(map2, id)));
  return map2;
};
const mapToObj = (map2, valueMapper, excludeMapValue, excludeObjValue) => {
  const obj = {};
  collForEach(map2, (mapValue, id) => {
    if (!excludeMapValue?.(mapValue, id)) {
      const objValue = valueMapper ? valueMapper(mapValue, id) : mapValue;
      if (!excludeObjValue?.(objValue)) {
        obj[id] = objValue;
      }
    }
  });
  return obj;
};
const mapToObj2 = (map2, valueMapper, excludeMapValue) =>
  mapToObj(
    map2,
    (childMap) => mapToObj(childMap, valueMapper, excludeMapValue),
    collIsEmpty,
    objIsEmpty,
  );
const mapToObj3 = (map2, valueMapper, excludeMapValue) =>
  mapToObj(
    map2,
    (childMap) => mapToObj2(childMap, valueMapper, excludeMapValue),
    collIsEmpty,
    objIsEmpty,
  );
const mapClone = (map2, mapValue) => {
  const map22 = mapNew();
  collForEach(map2, (value, key) => map22.set(key, mapValue?.(value) ?? value));
  return map22;
};
const mapClone2 = (map2) => mapClone(map2, mapClone);
const mapClone3 = (map2) => mapClone(map2, mapClone2);
const visitTree = (node, path, ensureLeaf, pruneLeaf, p = 0) =>
  ifNotUndefined(
    (ensureLeaf ? mapEnsure : mapGet)(
      node,
      path[p],
      p > size(path) - 2 ? ensureLeaf : mapNew,
    ),
    (nodeOrLeaf) => {
      if (p > size(path) - 2) {
        if (pruneLeaf?.(nodeOrLeaf)) {
          mapSet(node, path[p]);
        }
        return nodeOrLeaf;
      }
      const leaf = visitTree(nodeOrLeaf, path, ensureLeaf, pruneLeaf, p + 1);
      if (collIsEmpty(nodeOrLeaf)) {
        mapSet(node, path[p]);
      }
      return leaf;
    },
  );

const MASK6 = 63;
const ENCODE = /* @__PURE__ */ strSplit(
  '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
);
const DECODE = /* @__PURE__ */ mapNew(
  /* @__PURE__ */ arrayMap(ENCODE, (char, index) => [char, index]),
);
const encode = (num) => ENCODE[num & MASK6];
const decode = (str, pos) => mapGet(DECODE, str[pos]) ?? 0;
const getRandomValues = GLOBAL.crypto
  ? (array) => GLOBAL.crypto.getRandomValues(array)
  : /* istanbul ignore next */
    (array) => arrayMap(array, () => mathFloor(math.random() * 256));
const getUniqueId = (length = 16) =>
  arrayReduce(
    getRandomValues(new Uint8Array(length)),
    (uniqueId, number) => uniqueId + encode(number),
    EMPTY_STRING,
  );

const SHIFT36 = 2 ** 36;
const SHIFT30 = 2 ** 30;
const SHIFT24 = 2 ** 24;
const SHIFT18 = 2 ** 18;
const SHIFT12 = 2 ** 12;
const SHIFT6 = 2 ** 6;
const getClientIdFromUniqueId = (uniqueId) => {
  const clientHash30 = getHash(uniqueId);
  return (
    encode(clientHash30 / SHIFT24) +
    encode(clientHash30 / SHIFT18) +
    encode(clientHash30 / SHIFT12) +
    encode(clientHash30 / SHIFT6) +
    encode(clientHash30)
  );
};
const getHlcFunctions = (uniqueId, getNow = Date.now) => {
  let lastLogicalTime = 0;
  let lastCounter = -1;
  const thisClientId = ifNotUndefined(uniqueId, getClientIdFromUniqueId, () =>
    getUniqueId(5),
  );
  const getNextHlc = () => {
    seenHlc();
    return encodeHlc(lastLogicalTime, ++lastCounter);
  };
  const seenHlc = (hlc) => {
    const previousLogicalTime = lastLogicalTime;
    const [remoteLogicalTime, remoteCounter] =
      isUndefined(hlc) || hlc == '' ? [0, 0] : decodeHlc(hlc);
    lastLogicalTime = mathMax(previousLogicalTime, remoteLogicalTime, getNow());
    lastCounter =
      lastLogicalTime == previousLogicalTime
        ? lastLogicalTime == remoteLogicalTime
          ? mathMax(lastCounter, remoteCounter)
          : lastCounter
        : lastLogicalTime == remoteLogicalTime
          ? remoteCounter
          : -1;
  };
  const encodeHlc = (logicalTime42, counter24, clientId) =>
    encode(logicalTime42 / SHIFT36) +
    encode(logicalTime42 / SHIFT30) +
    encode(logicalTime42 / SHIFT24) +
    encode(logicalTime42 / SHIFT18) +
    encode(logicalTime42 / SHIFT12) +
    encode(logicalTime42 / SHIFT6) +
    encode(logicalTime42) +
    encode(counter24 / SHIFT18) +
    encode(counter24 / SHIFT12) +
    encode(counter24 / SHIFT6) +
    encode(counter24) +
    (isUndefined(clientId) ? thisClientId : getClientIdFromUniqueId(clientId));
  const decodeHlc = (hlc16) => [
    decode(hlc16, 0) * SHIFT36 +
      decode(hlc16, 1) * SHIFT30 +
      decode(hlc16, 2) * SHIFT24 +
      decode(hlc16, 3) * SHIFT18 +
      decode(hlc16, 4) * SHIFT12 +
      decode(hlc16, 5) * SHIFT6 +
      decode(hlc16, 6),
    decode(hlc16, 7) * SHIFT18 +
      decode(hlc16, 8) * SHIFT12 +
      decode(hlc16, 9) * SHIFT6 +
      decode(hlc16, 10),
    hlc16.slice(11),
  ];
  const getLastLogicalTime = () => lastLogicalTime;
  const getLastCounter = () => lastCounter;
  const getClientId = () => thisClientId;
  return [
    getNextHlc,
    seenHlc,
    encodeHlc,
    decodeHlc,
    getLastLogicalTime,
    getLastCounter,
    getClientId,
  ];
};

const setNew = (entryOrEntries) =>
  new Set(
    isArray(entryOrEntries) || isUndefined(entryOrEntries)
      ? entryOrEntries
      : [entryOrEntries],
  );
const setAdd = (set, value) => set?.add(value);

const stampClone = ([value, hlc]) => stampNew(value, hlc);
const stampNew = (value, hlc) => (hlc ? [value, hlc] : [value]);
const stampNewWithHash = (value, hlc, hash) => [value, hlc, hash];
const getStampHash = (stamp) => stamp[2];
const replaceHlcHash = (oldHlc, newHlc) =>
  newHlc > oldHlc ? (oldHlc ? getHash(oldHlc) : 0) ^ getHash(newHlc) : 0;
const getLatestHlc = (hlc1, hlc2) =>
  /* istanbul ignore next */
  ((hlc1 ?? '') > (hlc2 ?? '') ? hlc1 : hlc2) ?? '';
const stampUpdate = (stamp, hlc, hash) => {
  if (hlc > stamp[1]) {
    stamp[1] = hlc;
  }
  stamp[2] = hash >>> 0;
};
const stampNewObj = (hlc = EMPTY_STRING) => stampNew(objNew(), hlc);
const stampNewMap = (hlc = EMPTY_STRING) => [mapNew(), hlc, 0];
const stampMapToObjWithHash = ([map, hlc, hash], mapper) => [
  mapToObj(map, mapper),
  hlc,
  hash,
];
const stampMapToObjWithoutHash = ([map, hlc], mapper = stampClone) =>
  stampNew(mapToObj(map, mapper), hlc);
const stampValidate = (stamp, validateThing) =>
  isArray(stamp) &&
  size(stamp) == 3 &&
  isString(stamp[1]) &&
  getTypeOf(stamp[2]) == NUMBER &&
  isFiniteNumber(stamp[2]) &&
  validateThing(stamp[0]);

const defaultSorter = (sortKey1, sortKey2) =>
  (sortKey1 ?? 0) < (sortKey2 ?? 0) ? -1 : 1;

const INTEGER = /^\d+$/;
const getPoolFunctions = () => {
  const pool = [];
  let nextId = 0;
  return [
    (reuse) => (reuse ? arrayShift(pool) : null) ?? EMPTY_STRING + nextId++,
    (id) => {
      if (test(INTEGER, id) && size(pool) < 1e3) {
        arrayPush(pool, id);
      }
    },
  ];
};

const getWildcardedLeaves = (deepIdSet, path = [EMPTY_STRING]) => {
  const leaves = [];
  const deep = (node, p) =>
    p == size(path)
      ? arrayPush(leaves, node)
      : isNull(path[p])
        ? collForEach(node, (node2) => deep(node2, p + 1))
        : arrayForEach([path[p], null], (id) => deep(mapGet(node, id), p + 1));
  deep(deepIdSet, 0);
  return leaves;
};
const getListenerFunctions = (getThing) => {
  let thing;
  const [getId, releaseId] = getPoolFunctions();
  const allListeners = mapNew();
  const addListener = (
    listener,
    idSetNode,
    path,
    pathGetters = [],
    extraArgsGetter = () => [],
  ) => {
    thing ??= getThing();
    const id = getId(1);
    mapSet(allListeners, id, [
      listener,
      idSetNode,
      path,
      pathGetters,
      extraArgsGetter,
    ]);
    setAdd(visitTree(idSetNode, path ?? [EMPTY_STRING], setNew), id);
    return id;
  };
  const callListeners = (idSetNode, ids, ...extraArgs) =>
    arrayForEach(getWildcardedLeaves(idSetNode, ids), (set) =>
      collForEach(set, (id) =>
        mapGet(allListeners, id)[0](thing, ...(ids ?? []), ...extraArgs),
      ),
    );
  const delListener = (id) =>
    ifNotUndefined(mapGet(allListeners, id), ([, idSetNode, idOrNulls]) => {
      visitTree(idSetNode, idOrNulls ?? [EMPTY_STRING], void 0, (idSet) => {
        collDel(idSet, id);
        return collIsEmpty(idSet) ? 1 : 0;
      });
      mapSet(allListeners, id);
      releaseId(id);
      return idOrNulls;
    });
  const callListener = (id) =>
    ifNotUndefined(
      mapGet(allListeners, id),
      ([listener, , path = [], pathGetters, extraArgsGetter]) => {
        const callWithIds = (...ids) => {
          const index = size(ids);
          if (index == size(path)) {
            listener(thing, ...ids, ...extraArgsGetter(ids));
          } else if (isNull(path[index])) {
            arrayForEach(pathGetters[index]?.(...ids) ?? [], (id2) =>
              callWithIds(...ids, id2),
            );
          } else {
            callWithIds(...ids, path[index]);
          }
        };
        callWithIds();
      },
    );
  return [addListener, callListeners, delListener, callListener];
};

const pairNew = (value) => [value, value];
const pairCollSize2 = (pair, func = collSize2) => func(pair[0]) + func(pair[1]);
const pairNewMap = () => [mapNew(), mapNew()];
const pairClone = (array) => [...array];
const pairIsEqual = ([entry1, entry2]) => entry1 === entry2;

const idsChanged = (changedIds, id2, addedOrRemoved) =>
  mapSet(
    changedIds,
    id2,
    mapGet(changedIds, id2) == -addedOrRemoved ? void 0 : addedOrRemoved,
  );
const contentOrChangesIsEqual = ([tables1, values1], [tables2, values2]) =>
  objIsEqual(tables1, tables2) && objIsEqual(values1, values2);
const createStore = () => {
  let hasTablesSchema;
  let hasValuesSchema;
  let hadTables = false;
  let hadValues = false;
  let transactions = 0;
  let middleware = [];
  let internalListeners = [];
  let mutating = 0;
  const changedTableIds = mapNew();
  const changedTableCellIds = mapNew();
  const changedRowCount = mapNew();
  const changedRowIds = mapNew();
  const changedCellIds = mapNew();
  const changedCells = mapNew();
  const changedValueIds = mapNew();
  const changedValues = mapNew();
  const invalidCells = mapNew();
  const invalidValues = mapNew();
  const tablesSchemaMap = mapNew();
  const tablesSchemaRowCache = mapNew();
  const valuesSchemaMap = mapNew();
  const valuesDefaulted = mapNew();
  const valuesNonDefaulted = setNew();
  const tablePoolFunctions = mapNew();
  const tableCellIds = mapNew();
  const tablesMap = mapNew();
  const valuesMap = mapNew();
  const hasTablesListeners = pairNewMap();
  const tablesListeners = pairNewMap();
  const tableIdsListeners = pairNewMap();
  const hasTableListeners = pairNewMap();
  const tableListeners = pairNewMap();
  const tableCellIdsListeners = pairNewMap();
  const hasTableCellListeners = pairNewMap();
  const rowCountListeners = pairNewMap();
  const rowIdsListeners = pairNewMap();
  const sortedRowIdsListeners = pairNewMap();
  const hasRowListeners = pairNewMap();
  const rowListeners = pairNewMap();
  const cellIdsListeners = pairNewMap();
  const hasCellListeners = pairNewMap();
  const cellListeners = pairNewMap();
  const invalidCellListeners = pairNewMap();
  const invalidValueListeners = pairNewMap();
  const hasValuesListeners = pairNewMap();
  const valuesListeners = pairNewMap();
  const valueIdsListeners = pairNewMap();
  const hasValueListeners = pairNewMap();
  const valueListeners = pairNewMap();
  const startTransactionListeners = mapNew();
  const finishTransactionListeners = pairNewMap();
  const [addListener, callListeners, delListenerImpl, callListenerImpl] =
    getListenerFunctions(() => store);
  const whileMutating = (action) => {
    const wasMutating = mutating;
    mutating = 1;
    const result = action();
    mutating = wasMutating;
    return result;
  };
  const ifTransformed = (snapshot, getResult, then, isEqual = Object.is) =>
    ifNotUndefined(getResult(), (result) =>
      snapshot === result || isEqual(snapshot, result)
        ? then(result)
        : whileMutating(() => then(result)),
    );
  const validateTablesSchema = (tableSchema) =>
    objValidate(tableSchema, (tableSchema2) =>
      objValidate(tableSchema2, validateCellOrValueSchema),
    );
  const validateValuesSchema = (valuesSchema) =>
    objValidate(valuesSchema, validateCellOrValueSchema);
  const validateCellOrValueSchema = (schema) => {
    if (
      !objValidate(schema, (_child, id2) =>
        arrayHas([TYPE, DEFAULT, ALLOW_NULL], id2),
      )
    ) {
      return false;
    }
    const type = schema[TYPE];
    if (!isTypeStringOrBoolean(type) && type != NUMBER && !isJsonType(type)) {
      return false;
    }
    const defaultValue = schema[DEFAULT];
    if (isNull(defaultValue) && !schema[ALLOW_NULL]) {
      return false;
    }
    if (!isNull(defaultValue)) {
      if (getCellOrValueType(defaultValue) != type) {
        objDel(schema, DEFAULT);
      } else {
        schema[DEFAULT] = encodeIfJson(defaultValue);
      }
    }
    return true;
  };
  const validateContent = isArray;
  const validateTables = (tables) =>
    objValidate(tables, validateTable, cellInvalid);
  const validateTable = (table, tableId) =>
    (!hasTablesSchema ||
      collHas(tablesSchemaMap, tableId) ||
      /* istanbul ignore next */
      cellInvalid(tableId)) &&
    objValidate(
      table,
      (row, rowId) => validateRow(tableId, rowId, row),
      () => cellInvalid(tableId),
    );
  const validateRow = (tableId, rowId, row, skipDefaults) =>
    objValidate(
      skipDefaults ? row : addDefaultsToRow(row, tableId, rowId),
      (cell, cellId) =>
        ifNotUndefined(
          getValidatedCell(tableId, rowId, cellId, cell),
          (validCell) => {
            row[cellId] = validCell;
            return true;
          },
          () => false,
        ),
      () => cellInvalid(tableId, rowId),
    );
  const getValidatedCell = (tableId, rowId, cellId, cell) =>
    hasTablesSchema
      ? ifNotUndefined(
          mapGet(mapGet(tablesSchemaMap, tableId), cellId),
          (cellSchema) =>
            isNull(cell)
              ? cellSchema[ALLOW_NULL]
                ? cell
                : cellInvalid(tableId, rowId, cellId, cell, cellSchema[DEFAULT])
              : getCellOrValueType(cell) === cellSchema[TYPE]
                ? encodeIfJson(cell)
                : isJsonType(cellSchema[TYPE]) && isEncodedJson(cell)
                  ? cell
                  : cellInvalid(
                      tableId,
                      rowId,
                      cellId,
                      cell,
                      cellSchema[DEFAULT],
                    ),
          () => cellInvalid(tableId, rowId, cellId, cell),
        )
      : isUndefined(getCellOrValueType(cell))
        ? cellInvalid(tableId, rowId, cellId, cell)
        : encodeIfJson(cell);
  const validateValues = (values, skipDefaults) =>
    objValidate(
      skipDefaults ? values : addDefaultsToValues(values),
      (value, valueId) =>
        ifNotUndefined(
          getValidatedValue(valueId, value),
          (validValue) => {
            values[valueId] = validValue;
            return true;
          },
          () => false,
        ),
      () => valueInvalid(),
    );
  const getValidatedValue = (valueId, value) =>
    hasValuesSchema
      ? ifNotUndefined(
          mapGet(valuesSchemaMap, valueId),
          (valueSchema) =>
            isNull(value)
              ? valueSchema[ALLOW_NULL]
                ? value
                : valueInvalid(valueId, value, valueSchema[DEFAULT])
              : getCellOrValueType(value) === valueSchema[TYPE]
                ? encodeIfJson(value)
                : isJsonType(valueSchema[TYPE]) && isEncodedJson(value)
                  ? value
                  : valueInvalid(valueId, value, valueSchema[DEFAULT]),
          () => valueInvalid(valueId, value),
        )
      : isUndefined(getCellOrValueType(value))
        ? valueInvalid(valueId, value)
        : encodeIfJson(value);
  const addDefaultsToRow = (row, tableId, rowId) => {
    ifNotUndefined(
      mapGet(tablesSchemaRowCache, tableId),
      ([rowDefaulted, rowNonDefaulted]) => {
        collForEach(rowDefaulted, (cell, cellId) => {
          if (!objHas(row, cellId)) {
            row[cellId] = cell;
          }
        });
        collForEach(rowNonDefaulted, (cellId) => {
          if (!objHas(row, cellId)) {
            cellInvalid(tableId, rowId, cellId);
          }
        });
      },
    );
    return row;
  };
  const addDefaultsToValues = (values) => {
    if (hasValuesSchema) {
      collForEach(valuesDefaulted, (value, valueId) => {
        if (!objHas(values, valueId)) {
          values[valueId] = value;
        }
      });
      collForEach(valuesNonDefaulted, (valueId) => {
        if (!objHas(values, valueId)) {
          valueInvalid(valueId);
        }
      });
    }
    return values;
  };
  const setValidTablesSchema = (tablesSchema) =>
    mapMatch(
      tablesSchemaMap,
      tablesSchema,
      (_tablesSchema, tableId, tableSchema) => {
        const rowDefaulted = mapNew();
        const rowNonDefaulted = setNew();
        mapMatch(
          mapEnsure(tablesSchemaMap, tableId, mapNew),
          tableSchema,
          (tableSchemaMap, cellId, cellSchema) => {
            mapSet(tableSchemaMap, cellId, cellSchema);
            ifNotUndefined(
              cellSchema[DEFAULT],
              (def) => mapSet(rowDefaulted, cellId, def),
              () => setAdd(rowNonDefaulted, cellId),
            );
          },
        );
        mapSet(tablesSchemaRowCache, tableId, [rowDefaulted, rowNonDefaulted]);
      },
      (_tablesSchema, tableId) => {
        mapSet(tablesSchemaMap, tableId);
        mapSet(tablesSchemaRowCache, tableId);
      },
    );
  const setValidValuesSchema = (valuesSchema) =>
    mapMatch(
      valuesSchemaMap,
      valuesSchema,
      (_valuesSchema, valueId, valueSchema) => {
        mapSet(valuesSchemaMap, valueId, valueSchema);
        ifNotUndefined(
          valueSchema[DEFAULT],
          (def) => mapSet(valuesDefaulted, valueId, def),
          () => setAdd(valuesNonDefaulted, valueId),
        );
      },
      (_valuesSchema, valueId) => {
        mapSet(valuesSchemaMap, valueId);
        mapSet(valuesDefaulted, valueId);
        collDel(valuesNonDefaulted, valueId);
      },
    );
  const setOrDelTables = (tables) =>
    objIsEmpty(tables) ? delTables() : setTables(tables);
  const setOrDelCell = (
    tableId,
    rowId,
    cellId,
    cell,
    skipMiddleware,
    skipRowMiddleware,
  ) =>
    isUndefined(cell)
      ? delCell(tableId, rowId, cellId, true, skipMiddleware)
      : setCell(
          tableId,
          rowId,
          cellId,
          cell,
          skipMiddleware,
          skipRowMiddleware,
        );
  const setOrDelValues = (values) =>
    objIsEmpty(values) ? delValues() : setValues(values);
  const setOrDelValue = (valueId, value, skipMiddleware) =>
    isUndefined(value)
      ? delValue(valueId, skipMiddleware)
      : setValue(valueId, value, skipMiddleware);
  const setValidContent = (content) =>
    ifTransformed(
      content,
      () =>
        ifNotUndefined(
          middleware[0],
          (willSetContent) =>
            whileMutating(() => willSetContent(structuredClone(content))),
          () => content,
        ),
      ([tables, values]) => {
        (objIsEmpty(tables) ? delTables : setTables)(tables);
        (objIsEmpty(values) ? delValues : setValues)(values);
      },
      contentOrChangesIsEqual,
    );
  const setValidTables = (tables, forceDel) =>
    ifTransformed(
      tables,
      () =>
        forceDel
          ? tables
          : ifNotUndefined(
              middleware[1],
              (willSetTables) =>
                whileMutating(() => willSetTables(structuredClone(tables))),
              () => tables,
            ),
      (validTables) =>
        mapMatch(
          tablesMap,
          validTables,
          (_tables, tableId, table) => setValidTable(tableId, table),
          (_tables, tableId) => delValidTable(tableId),
        ),
      objIsEqual,
    );
  const setValidTable = (tableId, table, forceDel) =>
    ifTransformed(
      table,
      () =>
        forceDel
          ? table
          : ifNotUndefined(
              middleware[2],
              (willSetTable) =>
                whileMutating(() =>
                  willSetTable(tableId, structuredClone(table)),
                ),
              () => table,
            ),
      (validTable) =>
        mapMatch(
          mapEnsure(tablesMap, tableId, () => {
            tableIdsChanged(tableId, 1);
            mapSet(tablePoolFunctions, tableId, getPoolFunctions());
            mapSet(tableCellIds, tableId, mapNew());
            return mapNew();
          }),
          validTable,
          (tableMap, rowId, row) => setValidRow(tableId, tableMap, rowId, row),
          (tableMap, rowId) => delValidRow(tableId, tableMap, rowId),
        ),
      objIsEqual,
    );
  const setValidRow = (tableId, tableMap, rowId, row, forceDel) =>
    ifTransformed(
      row,
      () =>
        forceDel
          ? row
          : ifNotUndefined(
              middleware[3],
              (willSetRow) =>
                whileMutating(() =>
                  willSetRow(tableId, rowId, structuredClone(row)),
                ),
              () => row,
            ),
      (validRow) =>
        mapMatch(
          mapEnsure(tableMap, rowId, () => {
            rowIdsChanged(tableId, rowId, 1);
            return mapNew();
          }),
          validRow,
          (rowMap, cellId, cell) =>
            setValidCell(tableId, rowId, rowMap, cellId, cell),
          (rowMap, cellId) =>
            delValidCell(tableId, tableMap, rowId, rowMap, cellId, forceDel),
        ),
      objIsEqual,
    );
  const applyRowDirectly = (tableId, tableMap, rowId, row, skipMiddleware) => {
    mapMatch(
      mapEnsure(tableMap, rowId, () => {
        rowIdsChanged(tableId, rowId, 1);
        return mapNew();
      }),
      row,
      (rowMap, cellId, cell) =>
        ifNotUndefined(
          getValidatedCell(tableId, rowId, cellId, cell),
          (validCell) =>
            setValidCell(
              tableId,
              rowId,
              rowMap,
              cellId,
              validCell,
              skipMiddleware,
            ),
        ),
      (rowMap, cellId) =>
        delValidCell(tableId, tableMap, rowId, rowMap, cellId, true),
    );
  };
  const setValidCell = (tableId, rowId, rowMap, cellId, cell, skipMiddleware) =>
    ifTransformed(
      cell,
      () =>
        ifNotUndefined(
          skipMiddleware ? void 0 : middleware[4],
          (willSetCell) =>
            whileMutating(() => willSetCell(tableId, rowId, cellId, cell)),
          () => cell,
        ),
      (cell2) => {
        if (!collHas(rowMap, cellId)) {
          cellIdsChanged(tableId, rowId, cellId, 1);
        }
        const oldCell = mapGet(rowMap, cellId);
        if (cell2 !== oldCell) {
          cellChanged(tableId, rowId, cellId, oldCell, cell2);
          mapSet(rowMap, cellId, cell2);
        }
      },
    );
  const setCellIntoNewRow = (
    tableId,
    tableMap,
    rowId,
    cellId,
    validCell,
    skipMiddleware,
  ) =>
    ifNotUndefined(
      mapGet(tableMap, rowId),
      (rowMap) =>
        setValidCell(tableId, rowId, rowMap, cellId, validCell, skipMiddleware),
      () => {
        const rowMap = mapNew();
        mapSet(tableMap, rowId, rowMap);
        rowIdsChanged(tableId, rowId, 1);
        objMap(
          addDefaultsToRow({[cellId]: validCell}, tableId, rowId),
          (cell, cellId2) =>
            setValidCell(tableId, rowId, rowMap, cellId2, cell, skipMiddleware),
        );
      },
    );
  const setValidValues = (values, forceDel) =>
    ifTransformed(
      values,
      () =>
        forceDel
          ? values
          : ifNotUndefined(
              middleware[5],
              (willSetValues) =>
                whileMutating(() => willSetValues(structuredClone(values))),
              () => values,
            ),
      (validValues) =>
        mapMatch(
          valuesMap,
          validValues,
          (_valuesMap, valueId, value) => setValidValue(valueId, value),
          (_valuesMap, valueId) => delValidValue(valueId),
        ),
      objIsEqual,
    );
  const setValidValue = (valueId, value, skipMiddleware) =>
    ifTransformed(
      value,
      () =>
        ifNotUndefined(
          skipMiddleware ? void 0 : middleware[6],
          (willSetValue) => whileMutating(() => willSetValue(valueId, value)),
          () => value,
        ),
      (value2) => {
        if (!collHas(valuesMap, valueId)) {
          valueIdsChanged(valueId, 1);
        }
        const oldValue = mapGet(valuesMap, valueId);
        if (value2 !== oldValue) {
          valueChanged(valueId, oldValue, value2);
          mapSet(valuesMap, valueId, value2);
        }
      },
    );
  const getNewRowId = (tableId, reuse) => {
    const [getId] = mapGet(tablePoolFunctions, tableId);
    let rowId;
    do {
      rowId = getId(reuse);
    } while (collHas(mapGet(tablesMap, tableId), rowId));
    return rowId;
  };
  const getOrCreateTable = (tableId) =>
    mapEnsure(tablesMap, tableId, () => {
      tableIdsChanged(tableId, 1);
      mapSet(tablePoolFunctions, tableId, getPoolFunctions());
      mapSet(tableCellIds, tableId, mapNew());
      return mapNew();
    });
  const delValidTable = (tableId) => {
    if (whileMutating(() => middleware[8]?.(tableId)) ?? true) {
      return setValidTable(tableId, {}, true);
    }
    return mapGet(tablesMap, tableId);
  };
  const delValidRow = (tableId, tableMap, rowId) => {
    if (whileMutating(() => middleware[9]?.(tableId, rowId)) ?? true) {
      const [, releaseId] = mapGet(tablePoolFunctions, tableId);
      releaseId(rowId);
      setValidRow(tableId, tableMap, rowId, {}, true);
    }
  };
  const delValidCell = (
    tableId,
    table,
    rowId,
    row,
    cellId,
    forceDel,
    skipMiddleware,
  ) => {
    const defaultCell = mapGet(
      mapGet(tablesSchemaRowCache, tableId)?.[0],
      cellId,
    );
    if (!isUndefined(defaultCell) && !forceDel) {
      return setValidCell(tableId, rowId, row, cellId, defaultCell);
    }
    if (
      skipMiddleware ||
      (whileMutating(() => middleware[10]?.(tableId, rowId, cellId)) ?? true)
    ) {
      const delCell2 = (cellId2) => {
        cellChanged(tableId, rowId, cellId2, mapGet(row, cellId2));
        cellIdsChanged(tableId, rowId, cellId2, -1);
        mapSet(row, cellId2);
      };
      if (isUndefined(defaultCell)) {
        delCell2(cellId);
      } else {
        mapForEach(row, delCell2);
      }
      if (collIsEmpty(row)) {
        rowIdsChanged(tableId, rowId, -1);
        if (collIsEmpty(mapSet(table, rowId))) {
          tableIdsChanged(tableId, -1);
          mapSet(tablesMap, tableId);
          mapSet(tablePoolFunctions, tableId);
          mapSet(tableCellIds, tableId);
        }
      }
    }
  };
  const delValidValue = (valueId, skipMiddleware) => {
    const defaultValue = mapGet(valuesDefaulted, valueId);
    if (!isUndefined(defaultValue)) {
      return setValidValue(valueId, defaultValue);
    }
    if (
      skipMiddleware ||
      (whileMutating(() => middleware[12]?.(valueId)) ?? true)
    ) {
      valueChanged(valueId, mapGet(valuesMap, valueId));
      valueIdsChanged(valueId, -1);
      mapSet(valuesMap, valueId);
    }
  };
  const tableIdsChanged = (tableId, addedOrRemoved) =>
    idsChanged(changedTableIds, tableId, addedOrRemoved);
  const rowIdsChanged = (tableId, rowId, addedOrRemoved) =>
    idsChanged(
      mapEnsure(changedRowIds, tableId, mapNew),
      rowId,
      addedOrRemoved,
    ) &&
    mapSet(
      changedRowCount,
      tableId,
      mapEnsure(changedRowCount, tableId, () => 0) + addedOrRemoved,
    );
  const cellIdsChanged = (tableId, rowId, cellId, addedOrRemoved) => {
    const cellIds = mapGet(tableCellIds, tableId);
    const count = mapGet(cellIds, cellId) ?? 0;
    if (
      (count == 0 && addedOrRemoved == 1) ||
      (count == 1 && addedOrRemoved == -1)
    ) {
      idsChanged(
        mapEnsure(changedTableCellIds, tableId, mapNew),
        cellId,
        addedOrRemoved,
      );
    }
    mapSet(
      cellIds,
      cellId,
      count != -addedOrRemoved ? count + addedOrRemoved : void 0,
    );
    idsChanged(
      mapEnsure(mapEnsure(changedCellIds, tableId, mapNew), rowId, mapNew),
      cellId,
      addedOrRemoved,
    );
  };
  const cellChanged = (tableId, rowId, cellId, oldCell, newCell) => {
    mapEnsure(
      mapEnsure(mapEnsure(changedCells, tableId, mapNew), rowId, mapNew),
      cellId,
      () => [oldCell, 0],
    )[1] = newCell;
    internalListeners[3]?.(tableId, rowId, cellId, newCell, mutating);
  };
  const valueIdsChanged = (valueId, addedOrRemoved) =>
    idsChanged(changedValueIds, valueId, addedOrRemoved);
  const valueChanged = (valueId, oldValue, newValue) => {
    mapEnsure(changedValues, valueId, () => [oldValue, 0])[1] = newValue;
    internalListeners[4]?.(valueId, newValue, mutating);
  };
  const cellInvalid = (tableId, rowId, cellId, invalidCell, defaultedCell) => {
    arrayPush(
      mapEnsure(
        mapEnsure(mapEnsure(invalidCells, tableId, mapNew), rowId, mapNew),
        cellId,
        () => [],
      ),
      invalidCell,
    );
    return defaultedCell;
  };
  const valueInvalid = (valueId, invalidValue, defaultedValue) => {
    arrayPush(
      mapEnsure(invalidValues, valueId, () => []),
      invalidValue,
    );
    return defaultedValue;
  };
  const getCellChange = (tableId, rowId, cellId) =>
    ifNotUndefined(
      mapGet(mapGet(mapGet(changedCells, tableId), rowId), cellId),
      ([oldCell, newCell]) => [
        true,
        decodeIfJson(oldCell),
        decodeIfJson(newCell),
      ],
      () => [false, ...pairNew(getCell(tableId, rowId, cellId))],
    );
  const getValueChange = (valueId) =>
    ifNotUndefined(
      mapGet(changedValues, valueId),
      ([oldValue, newValue]) => [
        true,
        decodeIfJson(oldValue),
        decodeIfJson(newValue),
      ],
      () => [false, ...pairNew(getValue(valueId))],
    );
  const callInvalidCellListeners = (mutator) =>
    !collIsEmpty(invalidCells) && !collIsEmpty(invalidCellListeners[mutator])
      ? collForEach(
          mutator ? mapClone3(invalidCells) : invalidCells,
          (rows, tableId) =>
            collForEach(rows, (cells, rowId) =>
              collForEach(cells, (invalidCell, cellId) =>
                callListeners(
                  invalidCellListeners[mutator],
                  [tableId, rowId, cellId],
                  invalidCell,
                ),
              ),
            ),
        )
      : 0;
  const callInvalidValueListeners = (mutator) =>
    !collIsEmpty(invalidValues) && !collIsEmpty(invalidValueListeners[mutator])
      ? collForEach(
          mutator ? mapClone(invalidValues) : invalidValues,
          (invalidValue, valueId) =>
            callListeners(
              invalidValueListeners[mutator],
              [valueId],
              invalidValue,
            ),
        )
      : 0;
  const callIdsAndHasListenersIfChanged = (
    changedIds,
    idListeners,
    hasListeners,
    ids,
  ) => {
    if (!collIsEmpty(changedIds)) {
      callListeners(idListeners, ids, () => mapToObj(changedIds));
      mapForEach(changedIds, (changedId, changed) =>
        callListeners(hasListeners, [...(ids ?? []), changedId], changed == 1),
      );
      return 1;
    }
  };
  const clonedChangedCells = (changedCells2) =>
    mapClone(changedCells2, (map) =>
      mapClone(map, (map2) => mapClone(map2, pairClone)),
    );
  const callTabularListenersForChanges = (mutator) => {
    const hasHasTablesListeners = !collIsEmpty(hasTablesListeners[mutator]);
    const hasSortedRowIdListeners = !collIsEmpty(
      sortedRowIdsListeners[mutator],
    );
    const hasIdOrHasListeners = !(
      collIsEmpty(cellIdsListeners[mutator]) &&
      collIsEmpty(hasCellListeners[mutator]) &&
      collIsEmpty(rowIdsListeners[mutator]) &&
      collIsEmpty(hasRowListeners[mutator]) &&
      collIsEmpty(tableCellIdsListeners[mutator]) &&
      collIsEmpty(hasTableCellListeners[mutator]) &&
      collIsEmpty(rowCountListeners[mutator]) &&
      !hasSortedRowIdListeners &&
      collIsEmpty(tableIdsListeners[mutator]) &&
      collIsEmpty(hasTableListeners[mutator])
    );
    const hasOtherListeners = !(
      collIsEmpty(cellListeners[mutator]) &&
      collIsEmpty(rowListeners[mutator]) &&
      collIsEmpty(tableListeners[mutator]) &&
      collIsEmpty(tablesListeners[mutator])
    );
    if (hasHasTablesListeners || hasIdOrHasListeners || hasOtherListeners) {
      const changes = mutator
        ? [
            mapClone(changedTableIds),
            mapClone2(changedTableCellIds),
            mapClone(changedRowCount),
            mapClone2(changedRowIds),
            mapClone3(changedCellIds),
            clonedChangedCells(changedCells),
          ]
        : [
            changedTableIds,
            changedTableCellIds,
            changedRowCount,
            changedRowIds,
            changedCellIds,
            changedCells,
          ];
      if (hasHasTablesListeners) {
        const hasTablesNow = hasTables();
        if (hasTablesNow != hadTables) {
          callListeners(hasTablesListeners[mutator], void 0, hasTablesNow);
        }
      }
      if (hasIdOrHasListeners) {
        callIdsAndHasListenersIfChanged(
          changes[0],
          tableIdsListeners[mutator],
          hasTableListeners[mutator],
        );
        collForEach(changes[1], (changedIds, tableId) =>
          callIdsAndHasListenersIfChanged(
            changedIds,
            tableCellIdsListeners[mutator],
            hasTableCellListeners[mutator],
            [tableId],
          ),
        );
        collForEach(changes[2], (changedCount, tableId) => {
          if (changedCount != 0) {
            callListeners(
              rowCountListeners[mutator],
              [tableId],
              getRowCount(tableId),
            );
          }
        });
        const calledSortableTableIds = setNew();
        collForEach(changes[3], (changedIds, tableId) => {
          if (
            callIdsAndHasListenersIfChanged(
              changedIds,
              rowIdsListeners[mutator],
              hasRowListeners[mutator],
              [tableId],
            ) &&
            hasSortedRowIdListeners
          ) {
            callListeners(sortedRowIdsListeners[mutator], [tableId, null]);
            setAdd(calledSortableTableIds, tableId);
          }
        });
        if (hasSortedRowIdListeners) {
          collForEach(changes[5], (rows, tableId) => {
            if (!collHas(calledSortableTableIds, tableId)) {
              const sortableCellIds = setNew();
              collForEach(rows, (cells) =>
                collForEach(cells, ([oldCell, newCell], cellId) =>
                  newCell !== oldCell
                    ? setAdd(sortableCellIds, cellId)
                    : collDel(cells, cellId),
                ),
              );
              collForEach(sortableCellIds, (cellId) =>
                callListeners(sortedRowIdsListeners[mutator], [
                  tableId,
                  cellId,
                ]),
              );
            }
          });
        }
        collForEach(changes[4], (rowCellIds, tableId) =>
          collForEach(rowCellIds, (changedIds, rowId) =>
            callIdsAndHasListenersIfChanged(
              changedIds,
              cellIdsListeners[mutator],
              hasCellListeners[mutator],
              [tableId, rowId],
            ),
          ),
        );
      }
      if (hasOtherListeners) {
        let tablesChanged;
        collForEach(changes[5], (rows, tableId) => {
          let tableChanged;
          collForEach(rows, (cells, rowId) => {
            let rowChanged;
            collForEach(cells, ([oldCell, newCell], cellId) => {
              if (newCell !== oldCell) {
                callListeners(
                  cellListeners[mutator],
                  [tableId, rowId, cellId],
                  decodeIfJson(newCell),
                  decodeIfJson(oldCell),
                  getCellChange,
                );
                tablesChanged = tableChanged = rowChanged = 1;
              }
            });
            if (rowChanged) {
              callListeners(
                rowListeners[mutator],
                [tableId, rowId],
                getCellChange,
              );
            }
          });
          if (tableChanged) {
            callListeners(tableListeners[mutator], [tableId], getCellChange);
          }
        });
        if (tablesChanged) {
          callListeners(tablesListeners[mutator], void 0, getCellChange);
        }
      }
    }
  };
  const callValuesListenersForChanges = (mutator) => {
    const hasHasValuesListeners = !collIsEmpty(hasValuesListeners[mutator]);
    const hasIdOrHasListeners =
      !collIsEmpty(valueIdsListeners[mutator]) ||
      !collIsEmpty(hasValueListeners[mutator]);
    const hasOtherListeners =
      !collIsEmpty(valueListeners[mutator]) ||
      !collIsEmpty(valuesListeners[mutator]);
    if (hasHasValuesListeners || hasIdOrHasListeners || hasOtherListeners) {
      const changes = mutator
        ? [mapClone(changedValueIds), mapClone(changedValues, pairClone)]
        : [changedValueIds, changedValues];
      if (hasHasValuesListeners) {
        const hasValuesNow = hasValues();
        if (hasValuesNow != hadValues) {
          callListeners(hasValuesListeners[mutator], void 0, hasValuesNow);
        }
      }
      if (hasIdOrHasListeners) {
        callIdsAndHasListenersIfChanged(
          changes[0],
          valueIdsListeners[mutator],
          hasValueListeners[mutator],
        );
      }
      if (hasOtherListeners) {
        let valuesChanged;
        collForEach(changes[1], ([oldValue, newValue], valueId) => {
          if (newValue !== oldValue) {
            callListeners(
              valueListeners[mutator],
              [valueId],
              decodeIfJson(newValue),
              decodeIfJson(oldValue),
              getValueChange,
            );
            valuesChanged = 1;
          }
        });
        if (valuesChanged) {
          callListeners(valuesListeners[mutator], void 0, getValueChange);
        }
      }
    }
  };
  const fluentTransaction = (actions, ...args) => {
    transaction(() => actions(...arrayMap(args, id)));
    return store;
  };
  const addSortedRowIdsListenerImpl = (
    tableId,
    cellId,
    otherArgs,
    listener,
    mutator,
  ) => {
    let sortedRowIds = getSortedRowIds(tableId, cellId, ...otherArgs);
    return addListener(
      () => {
        const newSortedRowIds = getSortedRowIds(tableId, cellId, ...otherArgs);
        if (!arrayIsEqual(newSortedRowIds, sortedRowIds)) {
          sortedRowIds = newSortedRowIds;
          listener(store, tableId, cellId, ...otherArgs, sortedRowIds);
        }
      },
      sortedRowIdsListeners[mutator ? 1 : 0],
      [tableId, cellId],
      [getTableIds],
    );
  };
  const getTransactionChangesImpl = (encoded = false) => [
    mapToObj(
      changedCells,
      (table, tableId) =>
        mapGet(changedTableIds, tableId) === -1
          ? void 0
          : mapToObj(
              table,
              (row, rowId) =>
                mapGet(mapGet(changedRowIds, tableId), rowId) === -1
                  ? void 0
                  : mapToObj(
                      row,
                      ([, newCell]) =>
                        decodeIfJson(newCell, EMPTY_STRING, encoded),
                      (changedCell) => pairIsEqual(changedCell),
                    ),
              collIsEmpty,
              objIsEmpty,
            ),
      collIsEmpty,
      objIsEmpty,
    ),
    mapToObj(
      changedValues,
      ([, newValue]) => decodeIfJson(newValue, EMPTY_STRING, encoded),
      (changedValue) => pairIsEqual(changedValue),
    ),
    1,
  ];
  const getContent = () => [getTables(), getValues()];
  const getEncodedContent = () => [mapToObj3(tablesMap), mapToObj(valuesMap)];
  const getTables = () => mapToObj3(tablesMap, decodeIfJson);
  const getTableIds = () => mapKeys(tablesMap);
  const getTable = (tableId) =>
    mapToObj2(mapGet(tablesMap, id(tableId)), decodeIfJson);
  const getTableCellIds = (tableId) =>
    mapKeys(mapGet(tableCellIds, id(tableId)));
  const getRowCount = (tableId) => collSize(mapGet(tablesMap, id(tableId)));
  const getRowIds = (tableId) => mapKeys(mapGet(tablesMap, id(tableId)));
  const getSortedRowIds = (
    tableIdOrArgs,
    cellId,
    descending,
    offset = 0,
    limit,
  ) =>
    isObject(tableIdOrArgs)
      ? getSortedRowIds(
          tableIdOrArgs.tableId,
          tableIdOrArgs.cellId,
          tableIdOrArgs.descending,
          tableIdOrArgs.offset,
          tableIdOrArgs.limit,
        )
      : arrayMap(
          slice(
            arraySort(
              mapMap(mapGet(tablesMap, id(tableIdOrArgs)), (row, rowId) => [
                isUndefined(cellId) ? rowId : mapGet(row, id(cellId)),
                rowId,
              ]),
              ([cell1], [cell2]) =>
                defaultSorter(cell1, cell2) * (descending ? -1 : 1),
            ),
            offset,
            isUndefined(limit) ? limit : offset + limit,
          ),
          ([, rowId]) => rowId,
        );
  const getRow = (tableId, rowId) =>
    mapToObj(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), decodeIfJson);
  const getCellIds = (tableId, rowId) =>
    mapKeys(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)));
  const getCell = (tableId, rowId, cellId) =>
    decodeIfJson(
      mapGet(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), id(cellId)),
    );
  const getValues = () => mapToObj(valuesMap, decodeIfJson);
  const getValueIds = () => mapKeys(valuesMap);
  const getValue = (valueId) => decodeIfJson(mapGet(valuesMap, id(valueId)));
  const hasTables = () => !collIsEmpty(tablesMap);
  const hasTable = (tableId) => collHas(tablesMap, id(tableId));
  const hasTableCell = (tableId, cellId) =>
    collHas(mapGet(tableCellIds, id(tableId)), id(cellId));
  const hasRow = (tableId, rowId) =>
    collHas(mapGet(tablesMap, id(tableId)), id(rowId));
  const hasCell = (tableId, rowId, cellId) =>
    collHas(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), id(cellId));
  const hasValues = () => !collIsEmpty(valuesMap);
  const hasValue = (valueId) => collHas(valuesMap, id(valueId));
  const getTablesJson = () => jsonStringWithMap(tablesMap);
  const getValuesJson = () => jsonStringWithMap(valuesMap);
  const getJson = () => jsonStringWithMap([tablesMap, valuesMap]);
  const getTablesSchemaJson = () => jsonStringWithMap(tablesSchemaMap);
  const getValuesSchemaJson = () => jsonStringWithMap(valuesSchemaMap);
  const getSchemaJson = () =>
    jsonStringWithMap([tablesSchemaMap, valuesSchemaMap]);
  const setContent = (content) =>
    fluentTransaction(() => {
      const content2 = isFunction(content) ? content() : content;
      if (validateContent(content2)) {
        setValidContent(content2);
      }
    });
  const setTables = (tables) =>
    fluentTransaction(() =>
      validateTables(tables) ? setValidTables(tables) : 0,
    );
  const setTable = (tableId, table) =>
    fluentTransaction(
      (tableId2) =>
        validateTable(table, tableId2) ? setValidTable(tableId2, table) : 0,
      tableId,
    );
  const setRow = (tableId, rowId, row) =>
    fluentTransaction(
      (tableId2, rowId2) =>
        validateRow(tableId2, rowId2, row)
          ? setValidRow(tableId2, getOrCreateTable(tableId2), rowId2, row)
          : 0,
      tableId,
      rowId,
    );
  const addRow = (tableId, row, reuseRowIds = true) =>
    transaction(() => {
      let rowId = void 0;
      if (validateRow(tableId, rowId, row)) {
        tableId = id(tableId);
        setValidRow(
          tableId,
          getOrCreateTable(tableId),
          (rowId = getNewRowId(tableId, reuseRowIds ? 1 : 0)),
          row,
        );
      }
      return rowId;
    });
  const setPartialRow = (tableId, rowId, partialRow) =>
    fluentTransaction(
      (tableId2, rowId2) => {
        if (validateRow(tableId2, rowId2, partialRow, 1)) {
          const table = getOrCreateTable(tableId2);
          objMap(partialRow, (cell, cellId) =>
            setCellIntoNewRow(tableId2, table, rowId2, cellId, cell),
          );
        }
      },
      tableId,
      rowId,
    );
  const setCell = (
    tableId,
    rowId,
    cellId,
    cell,
    skipMiddleware,
    skipRowMiddleware,
  ) =>
    fluentTransaction(
      (tableId2, rowId2, cellId2) =>
        ifNotUndefined(
          getValidatedCell(
            tableId2,
            rowId2,
            cellId2,
            isFunction(cell) ? cell(getCell(tableId2, rowId2, cellId2)) : cell,
          ),
          (validCell) => {
            const tableMap = getOrCreateTable(tableId2);
            ifNotUndefined(
              skipMiddleware || skipRowMiddleware || !middleware[14]?.()
                ? void 0
                : middleware[3],
              (willSetRow) => {
                const existingRowMap = mapGet(tableMap, rowId2);
                const prospectiveRow = {
                  ...(existingRowMap ? mapToObj(existingRowMap) : {}),
                  [cellId2]: validCell,
                };
                ifNotUndefined(
                  whileMutating(() =>
                    willSetRow(
                      tableId2,
                      rowId2,
                      structuredClone(prospectiveRow),
                    ),
                  ),
                  (row) =>
                    applyRowDirectly(
                      tableId2,
                      tableMap,
                      rowId2,
                      row,
                      skipMiddleware,
                    ),
                );
              },
              () =>
                setCellIntoNewRow(
                  tableId2,
                  tableMap,
                  rowId2,
                  cellId2,
                  validCell,
                  skipMiddleware,
                ),
            );
          },
        ),
      tableId,
      rowId,
      cellId,
    );
  const setValues = (values) =>
    fluentTransaction(() =>
      validateValues(values) ? setValidValues(values) : 0,
    );
  const setPartialValues = (partialValues) =>
    fluentTransaction(() =>
      validateValues(partialValues, 1)
        ? objMap(partialValues, (value, valueId) =>
            setValidValue(valueId, value),
          )
        : 0,
    );
  const setValue = (valueId, value, skipMiddleware) =>
    fluentTransaction(
      (valueId2) =>
        ifNotUndefined(
          getValidatedValue(
            valueId2,
            isFunction(value) ? value(getValue(valueId2)) : value,
          ),
          (validValue) => setValidValue(valueId2, validValue, skipMiddleware),
        ),
      valueId,
    );
  const applyChanges = (changes) =>
    fluentTransaction(() =>
      ifTransformed(
        changes,
        () =>
          ifNotUndefined(
            middleware[13],
            (willApplyChanges) =>
              whileMutating(() => willApplyChanges(structuredClone(changes))),
            () => changes,
          ),
        (changes2) => {
          objMap(changes2[0], (table, tableId) =>
            isUndefined(table)
              ? delTable(tableId)
              : objMap(table, (row, rowId) =>
                  isUndefined(row)
                    ? delRow(tableId, rowId)
                    : objMap(row, (cell, cellId) =>
                        setOrDelCell(
                          tableId,
                          rowId,
                          cellId,
                          cell,
                          void 0,
                          true,
                        ),
                      ),
                ),
          );
          objMap(changes2[1], (value, valueId) =>
            setOrDelValue(valueId, value),
          );
        },
        contentOrChangesIsEqual,
      ),
    );
  const setTablesJson = (tablesJson) => {
    tryCatch(() => setOrDelTables(jsonParse(tablesJson)));
    return store;
  };
  const setValuesJson = (valuesJson) => {
    tryCatch(() => setOrDelValues(jsonParse(valuesJson)));
    return store;
  };
  const setJson = (tablesAndValuesJson) =>
    fluentTransaction(() =>
      tryCatch(
        () => {
          const [tables, values] = jsonParse(tablesAndValuesJson);
          setOrDelTables(tables);
          setOrDelValues(values);
        },
        () => setTablesJson(tablesAndValuesJson),
      ),
    );
  const setTablesSchema = (tablesSchema) =>
    fluentTransaction(() => {
      if ((hasTablesSchema = validateTablesSchema(tablesSchema))) {
        setValidTablesSchema(tablesSchema);
        if (!collIsEmpty(tablesMap)) {
          const tables = getTables();
          delTables();
          setTables(tables);
        }
      }
    });
  const setValuesSchema = (valuesSchema) =>
    fluentTransaction(() => {
      if ((hasValuesSchema = validateValuesSchema(valuesSchema))) {
        const values = getValues();
        delValuesSchema();
        delValues();
        hasValuesSchema = true;
        setValidValuesSchema(valuesSchema);
        setValues(values);
      }
    });
  const setSchema = (tablesSchema, valuesSchema) =>
    fluentTransaction(() => {
      setTablesSchema(tablesSchema);
      setValuesSchema(valuesSchema);
    });
  const delTables = () =>
    fluentTransaction(() =>
      (whileMutating(() => middleware[7]?.()) ?? true)
        ? setValidTables({}, true)
        : 0,
    );
  const delTable = (tableId) =>
    fluentTransaction(
      (tableId2) =>
        collHas(tablesMap, tableId2) ? delValidTable(tableId2) : 0,
      tableId,
    );
  const delRow = (tableId, rowId) =>
    fluentTransaction(
      (tableId2, rowId2) =>
        ifNotUndefined(mapGet(tablesMap, tableId2), (tableMap) =>
          collHas(tableMap, rowId2)
            ? delValidRow(tableId2, tableMap, rowId2)
            : 0,
        ),
      tableId,
      rowId,
    );
  const delCell = (tableId, rowId, cellId, forceDel, skipMiddleware) =>
    fluentTransaction(
      (tableId2, rowId2, cellId2) =>
        ifNotUndefined(mapGet(tablesMap, tableId2), (tableMap) =>
          ifNotUndefined(mapGet(tableMap, rowId2), (rowMap) =>
            collHas(rowMap, cellId2)
              ? delValidCell(
                  tableId2,
                  tableMap,
                  rowId2,
                  rowMap,
                  cellId2,
                  forceDel,
                  skipMiddleware,
                )
              : 0,
          ),
        ),
      tableId,
      rowId,
      cellId,
    );
  const delValues = () =>
    fluentTransaction(() =>
      (whileMutating(() => middleware[11]?.()) ?? true)
        ? setValidValues({}, true)
        : 0,
    );
  const delValue = (valueId, skipMiddleware) =>
    fluentTransaction(
      (valueId2) =>
        collHas(valuesMap, valueId2)
          ? delValidValue(valueId2, skipMiddleware)
          : 0,
      valueId,
    );
  const delTablesSchema = () =>
    fluentTransaction(() => {
      setValidTablesSchema({});
      hasTablesSchema = false;
    });
  const delValuesSchema = () =>
    fluentTransaction(() => {
      setValidValuesSchema({});
      hasValuesSchema = false;
    });
  const delSchema = () =>
    fluentTransaction(() => {
      delTablesSchema();
      delValuesSchema();
    });
  const transaction = (actions, doRollback) => {
    if (transactions != -1) {
      startTransaction();
      const result = actions();
      finishTransaction(doRollback);
      return result;
    }
  };
  const startTransaction = () => {
    if (transactions != -1) {
      transactions++;
    }
    if (transactions == 1) {
      internalListeners[0]?.();
      callListeners(startTransactionListeners);
    }
    return store;
  };
  const getTransactionChanges = () => getTransactionChangesImpl();
  const getEncodedTransactionChanges = () => getTransactionChangesImpl(true);
  const getTransactionLog = () => [
    !collIsEmpty(changedCells),
    !collIsEmpty(changedValues),
    mapToObj3(changedCells, pairClone, pairIsEqual),
    mapToObj3(invalidCells),
    mapToObj(changedValues, pairClone, pairIsEqual),
    mapToObj(invalidValues),
    mapToObj(changedTableIds),
    mapToObj2(changedRowIds),
    mapToObj3(changedCellIds),
    mapToObj(changedValueIds),
  ];
  const finishTransaction = (doRollback) => {
    if (transactions > 0) {
      transactions--;
      if (transactions == 0) {
        transactions = 1;
        whileMutating(() => {
          callInvalidCellListeners(1);
          if (!collIsEmpty(changedCells)) {
            callTabularListenersForChanges(1);
          }
          callInvalidValueListeners(1);
          if (!collIsEmpty(changedValues)) {
            callValuesListenersForChanges(1);
          }
        });
        if (doRollback?.(store)) {
          collForEach(changedCells, (table, tableId) =>
            collForEach(table, (row, rowId) =>
              collForEach(row, ([oldCell], cellId) =>
                setOrDelCell(tableId, rowId, cellId, oldCell, true),
              ),
            ),
          );
          collClear(changedCells);
          collForEach(changedValues, ([oldValue], valueId) =>
            setOrDelValue(valueId, oldValue, true),
          );
          collClear(changedValues);
        }
        callListeners(finishTransactionListeners[0], void 0);
        transactions = -1;
        callInvalidCellListeners(0);
        if (!collIsEmpty(changedCells)) {
          callTabularListenersForChanges(0);
        }
        callInvalidValueListeners(0);
        if (!collIsEmpty(changedValues)) {
          callValuesListenersForChanges(0);
        }
        internalListeners[1]?.();
        callListeners(finishTransactionListeners[1], void 0);
        internalListeners[2]?.();
        transactions = 0;
        hadTables = hasTables();
        hadValues = hasValues();
        arrayForEach(
          [
            changedTableIds,
            changedTableCellIds,
            changedRowCount,
            changedRowIds,
            changedCellIds,
            changedCells,
            invalidCells,
            changedValueIds,
            changedValues,
            invalidValues,
          ],
          collClear,
        );
      }
    }
    return store;
  };
  const forEachTable = (tableCallback) =>
    collForEach(tablesMap, (tableMap, tableId) =>
      tableCallback(tableId, (rowCallback) =>
        collForEach(tableMap, (rowMap, rowId) =>
          rowCallback(rowId, (cellCallback) =>
            mapForEach(rowMap, (cellId, cell) =>
              cellCallback(cellId, decodeIfJson(cell)),
            ),
          ),
        ),
      ),
    );
  const forEachTableCell = (tableId, tableCellCallback) =>
    mapForEach(mapGet(tableCellIds, id(tableId)), tableCellCallback);
  const forEachRow = (tableId, rowCallback) =>
    collForEach(mapGet(tablesMap, id(tableId)), (rowMap, rowId) =>
      rowCallback(rowId, (cellCallback) =>
        mapForEach(rowMap, (cellId, cell) =>
          cellCallback(cellId, decodeIfJson(cell)),
        ),
      ),
    );
  const forEachCell = (tableId, rowId, cellCallback) =>
    mapForEach(
      mapGet(mapGet(tablesMap, id(tableId)), id(rowId)),
      (cellId, cell) => cellCallback(cellId, decodeIfJson(cell)),
    );
  const forEachValue = (valueCallback) =>
    mapForEach(valuesMap, (valueId, value) =>
      valueCallback(valueId, decodeIfJson(value)),
    );
  const addSortedRowIdsListener = (
    tableIdOrArgs,
    cellIdOrListener,
    descendingOrMutator,
    offset,
    limit,
    listener,
    mutator,
  ) =>
    isObject(tableIdOrArgs)
      ? addSortedRowIdsListenerImpl(
          tableIdOrArgs.tableId,
          tableIdOrArgs.cellId,
          [
            tableIdOrArgs.descending ?? false,
            tableIdOrArgs.offset ?? 0,
            tableIdOrArgs.limit,
          ],
          cellIdOrListener,
          descendingOrMutator,
        )
      : addSortedRowIdsListenerImpl(
          tableIdOrArgs,
          cellIdOrListener,
          [descendingOrMutator, offset, limit],
          listener,
          mutator,
        );
  const addStartTransactionListener = (listener) =>
    addListener(listener, startTransactionListeners);
  const addWillFinishTransactionListener = (listener) =>
    addListener(listener, finishTransactionListeners[0]);
  const addDidFinishTransactionListener = (listener) =>
    addListener(listener, finishTransactionListeners[1]);
  const callListener = (listenerId) => {
    callListenerImpl(listenerId);
    return store;
  };
  const delListener = (listenerId) => {
    delListenerImpl(listenerId);
    return store;
  };
  const getListenerStats = () => ({
    hasTables: pairCollSize2(hasTablesListeners),
    tables: pairCollSize2(tablesListeners),
    tableIds: pairCollSize2(tableIdsListeners),
    hasTable: pairCollSize2(hasTableListeners),
    table: pairCollSize2(tableListeners),
    tableCellIds: pairCollSize2(tableCellIdsListeners),
    hasTableCell: pairCollSize2(hasTableCellListeners, collSize3),
    rowCount: pairCollSize2(rowCountListeners),
    rowIds: pairCollSize2(rowIdsListeners),
    sortedRowIds: pairCollSize2(sortedRowIdsListeners),
    hasRow: pairCollSize2(hasRowListeners, collSize3),
    row: pairCollSize2(rowListeners, collSize3),
    cellIds: pairCollSize2(cellIdsListeners, collSize3),
    hasCell: pairCollSize2(hasCellListeners, collSize4),
    cell: pairCollSize2(cellListeners, collSize4),
    invalidCell: pairCollSize2(invalidCellListeners, collSize4),
    hasValues: pairCollSize2(hasValuesListeners),
    values: pairCollSize2(valuesListeners),
    valueIds: pairCollSize2(valueIdsListeners),
    hasValue: pairCollSize2(hasValueListeners),
    value: pairCollSize2(valueListeners),
    invalidValue: pairCollSize2(invalidValueListeners),
    transaction:
      collSize2(startTransactionListeners) +
      pairCollSize2(finishTransactionListeners),
  });
  const setMiddleware = (
    willSetContent,
    willSetTables,
    willSetTable,
    willSetRow,
    willSetCell,
    willSetValues,
    willSetValue,
    willDelTables,
    willDelTable,
    willDelRow,
    willDelCell,
    willDelValues,
    willDelValue,
    willApplyChanges,
    hasWillSetRowCallbacks,
  ) =>
    (middleware = [
      willSetContent,
      willSetTables,
      willSetTable,
      willSetRow,
      willSetCell,
      willSetValues,
      willSetValue,
      willDelTables,
      willDelTable,
      willDelRow,
      willDelCell,
      willDelValues,
      willDelValue,
      willApplyChanges,
      hasWillSetRowCallbacks,
    ]);
  const setInternalListeners = (
    preStartTransaction,
    preFinishTransaction,
    postFinishTransaction,
    cellChanged2,
    valueChanged2,
  ) =>
    (internalListeners = [
      preStartTransaction,
      preFinishTransaction,
      postFinishTransaction,
      cellChanged2,
      valueChanged2,
    ]);
  const store = {
    getContent,
    getTables,
    getTableIds,
    getTable,
    getTableCellIds,
    getRowCount,
    getRowIds,
    getSortedRowIds,
    getRow,
    getCellIds,
    getCell,
    getValues,
    getValueIds,
    getValue,
    hasTables,
    hasTable,
    hasTableCell,
    hasRow,
    hasCell,
    hasValues,
    hasValue,
    getTablesJson,
    getValuesJson,
    getJson,
    getTablesSchemaJson,
    getValuesSchemaJson,
    getSchemaJson,
    hasTablesSchema: () => hasTablesSchema,
    hasValuesSchema: () => hasValuesSchema,
    setContent,
    setTables,
    setTable,
    setRow,
    addRow,
    setPartialRow,
    setCell,
    setValues,
    setPartialValues,
    setValue,
    applyChanges,
    setTablesJson,
    setValuesJson,
    setJson,
    setTablesSchema,
    setValuesSchema,
    setSchema,
    delTables,
    delTable,
    delRow,
    delCell,
    delValues,
    delValue,
    delTablesSchema,
    delValuesSchema,
    delSchema,
    transaction,
    startTransaction,
    getTransactionChanges,
    getTransactionLog,
    finishTransaction,
    forEachTable,
    forEachTableCell,
    forEachRow,
    forEachCell,
    forEachValue,
    addSortedRowIdsListener,
    addStartTransactionListener,
    addWillFinishTransactionListener,
    addDidFinishTransactionListener,
    callListener,
    delListener,
    getListenerStats,
    isMergeable: () => false,
    _: [
      createStore,
      addListener,
      callListeners,
      setInternalListeners,
      setMiddleware,
      setOrDelCell,
      setOrDelValue,
      getEncodedContent,
      getEncodedTransactionChanges,
    ],
  };
  objMap(
    {
      [HAS + TABLES]: [0, hasTablesListeners, [], () => [hasTables()]],
      [TABLES]: [0, tablesListeners],
      [TABLE_IDS]: [0, tableIdsListeners],
      [HAS + TABLE]: [
        1,
        hasTableListeners,
        [getTableIds],
        (ids) => [hasTable(...ids)],
      ],
      [TABLE]: [1, tableListeners, [getTableIds]],
      [TABLE + CELL_IDS]: [1, tableCellIdsListeners, [getTableIds]],
      [HAS + TABLE + CELL]: [
        2,
        hasTableCellListeners,
        [getTableIds, getTableCellIds],
        (ids) => [hasTableCell(...ids)],
      ],
      [ROW_COUNT]: [1, rowCountListeners, [getTableIds]],
      [ROW_IDS]: [1, rowIdsListeners, [getTableIds]],
      [HAS + ROW]: [
        2,
        hasRowListeners,
        [getTableIds, getRowIds],
        (ids) => [hasRow(...ids)],
      ],
      [ROW]: [2, rowListeners, [getTableIds, getRowIds]],
      [CELL_IDS]: [2, cellIdsListeners, [getTableIds, getRowIds]],
      [HAS + CELL]: [
        3,
        hasCellListeners,
        [getTableIds, getRowIds, getCellIds],
        (ids) => [hasCell(...ids)],
      ],
      [CELL]: [
        3,
        cellListeners,
        [getTableIds, getRowIds, getCellIds],
        (ids) => pairNew(getCell(...ids)),
      ],
      InvalidCell: [3, invalidCellListeners],
      [HAS + VALUES]: [0, hasValuesListeners, [], () => [hasValues()]],
      [VALUES]: [0, valuesListeners],
      [VALUE_IDS]: [0, valueIdsListeners],
      [HAS + VALUE]: [
        1,
        hasValueListeners,
        [getValueIds],
        (ids) => [hasValue(...ids)],
      ],
      [VALUE]: [
        1,
        valueListeners,
        [getValueIds],
        (ids) => pairNew(getValue(ids[0])),
      ],
      InvalidValue: [1, invalidValueListeners],
    },
    ([argumentCount, idSetNode, pathGetters, extraArgsGetter], listenable) => {
      store[ADD + listenable + LISTENER] = (...args) =>
        addListener(
          args[argumentCount],
          idSetNode[args[argumentCount + 1] ? 1 : 0],
          argumentCount > 0 ? slice(args, 0, argumentCount) : void 0,
          pathGetters,
          extraArgsGetter,
        );
    },
  );
  return objFreeze(store);
};

const LISTENER_ARGS = {
  HasTable: 1,
  Table: 1,
  TableCellIds: 1,
  HasTableCell: 2,
  RowCount: 1,
  RowIds: 1,
  SortedRowIds: 5,
  HasRow: 2,
  Row: 2,
  CellIds: 2,
  HasCell: 3,
  Cell: 3,
  HasValue: 1,
  Value: 1,
  InvalidCell: 3,
  InvalidValue: 1,
};
const newContentStampMap = (time = EMPTY_STRING) => [
  stampNewMap(time),
  stampNewMap(time),
];
const validateMergeableContent = (mergeableContent) =>
  isArray(mergeableContent) &&
  size(mergeableContent) == 2 &&
  stampValidate(mergeableContent[0], (tableStamps) =>
    objValidate(
      tableStamps,
      (tableStamp) =>
        stampValidate(tableStamp, (rowStamps) =>
          objValidate(
            rowStamps,
            (rowStamp) =>
              stampValidate(rowStamp, (cellStamps) =>
                objValidate(
                  cellStamps,
                  (cellStamp) =>
                    stampValidate(cellStamp, isCellOrValueOrUndefined),
                  void 0,
                  1,
                ),
              ),
            void 0,
            1,
          ),
        ),
      void 0,
      1,
    ),
  ) &&
  stampValidate(mergeableContent[1], (values) =>
    objValidate(
      values,
      (value) => stampValidate(value, isCellOrValueOrUndefined),
      void 0,
      1,
    ),
  );
const createMergeableStore = (uniqueId, getNow) => {
  let listeningToRawStoreChanges = 1;
  let contentStampMap = newContentStampMap();
  let defaultingContent = 0;
  let mutated = 0;
  const touchedCells = mapNew();
  const touchedValues = setNew();
  const [getNextHlc, seenHlc] = getHlcFunctions(uniqueId, getNow);
  const store = createStore();
  const disableListeningToRawStoreChanges = (actions) => {
    const wasListening = listeningToRawStoreChanges;
    listeningToRawStoreChanges = 0;
    actions();
    listeningToRawStoreChanges = wasListening;
    return mergeableStore;
  };
  const mergeContentOrChanges = (contentOrChanges, isContent = 0) => {
    const tablesChanges = {};
    const valuesChanges = {};
    const [
      [tablesObj, incomingTablesHlc = EMPTY_STRING, incomingTablesHash = 0],
      values,
    ] = contentOrChanges;
    const [tablesStampMap, valuesStampMap] = contentStampMap;
    const [tableStampMaps, oldTablesHlc, oldTablesHash] = tablesStampMap;
    let tablesHash = isContent ? incomingTablesHash : oldTablesHash;
    let tablesHlc = incomingTablesHlc;
    objForEach(
      tablesObj,
      (
        [rowsObj, incomingTableHlc = EMPTY_STRING, incomingTableHash = 0],
        tableId,
      ) => {
        const tableStampMap = mapEnsure(tableStampMaps, tableId, stampNewMap);
        const [rowStampMaps, oldTableHlc, oldTableHash] = tableStampMap;
        let tableHash = isContent ? incomingTableHash : oldTableHash;
        let tableHlc = incomingTableHlc;
        objForEach(rowsObj, (row, rowId) => {
          const [rowHlc, oldRowHash, rowHash] = mergeCellsOrValues(
            row,
            mapEnsure(rowStampMaps, rowId, stampNewMap),
            objEnsure(objEnsure(tablesChanges, tableId, objNew), rowId, objNew),
            isContent,
          );
          tableHash ^= isContent
            ? 0
            : addOrRemoveHash(
                oldRowHash ? getValueInValuesHash(rowId, oldRowHash) : 0,
                getValueInValuesHash(rowId, rowHash),
              );
          tableHlc = getLatestHlc(tableHlc, rowHlc);
        });
        tableHash ^= isContent
          ? 0
          : replaceHlcHash(oldTableHlc, incomingTableHlc);
        stampUpdate(tableStampMap, incomingTableHlc, tableHash);
        tablesHash ^= isContent
          ? 0
          : addOrRemoveHash(
              oldTableHash ? getValueInValuesHash(tableId, oldTableHash) : 0,
              getValueInValuesHash(tableId, tableStampMap[2]),
            );
        tablesHlc = getLatestHlc(tablesHlc, tableHlc);
      },
    );
    tablesHash ^= isContent
      ? 0
      : replaceHlcHash(oldTablesHlc, incomingTablesHlc);
    stampUpdate(tablesStampMap, incomingTablesHlc, tablesHash);
    const [valuesHlc] = mergeCellsOrValues(
      values,
      valuesStampMap,
      valuesChanges,
      isContent,
    );
    seenHlc(getLatestHlc(tablesHlc, valuesHlc));
    return [tablesChanges, valuesChanges, 1];
  };
  const mergeCellsOrValues = (
    things,
    thingsStampMap,
    thingsChanges,
    isContent,
  ) => {
    const [
      thingsObj,
      incomingThingsHlc = EMPTY_STRING,
      incomingThingsHash = 0,
    ] = things;
    const [thingStampMaps, oldThingsHlc, oldThingsHash] = thingsStampMap;
    let thingsHlc = incomingThingsHlc;
    let thingsHash = isContent ? incomingThingsHash : oldThingsHash;
    objForEach(
      thingsObj,
      ([thing, thingHlc = EMPTY_STRING, incomingThingHash = 0], thingId) => {
        const thingStampMap = mapEnsure(thingStampMaps, thingId, () => [
          void 0,
          EMPTY_STRING,
          0,
        ]);
        const [, oldThingHlc, oldThingHash] = thingStampMap;
        if (!oldThingHlc || thingHlc > oldThingHlc) {
          stampUpdate(
            thingStampMap,
            thingHlc,
            isContent ? incomingThingHash : getValueHash(thing, thingHlc),
          );
          thingStampMap[0] = thing;
          thingsChanges[thingId] = thing;
          thingsHash ^= isContent
            ? 0
            : addOrRemoveHash(
                getValueInValuesHash(thingId, oldThingHash),
                getValueInValuesHash(thingId, thingStampMap[2]),
              );
          thingsHlc = getLatestHlc(thingsHlc, thingHlc);
        }
      },
    );
    thingsHash ^= isContent
      ? 0
      : replaceHlcHash(oldThingsHlc, incomingThingsHlc);
    stampUpdate(thingsStampMap, incomingThingsHlc, thingsHash);
    return [thingsHlc, oldThingsHash, thingsStampMap[2]];
  };
  const preStartTransaction = noop;
  const preFinishTransaction = noop;
  const postFinishTransaction = () => {
    collClear(touchedCells);
    collClear(touchedValues);
  };
  const cellChanged = (tableId, rowId, cellId, newCell, mutating) => {
    setAdd(
      mapEnsure(mapEnsure(touchedCells, tableId, mapNew), rowId, setNew),
      cellId,
    );
    if (listeningToRawStoreChanges || mutating) {
      if (mutating) {
        mutated = 1;
      }
      mergeContentOrChanges([
        [
          {
            [tableId]: [
              {
                [rowId]: [
                  {
                    [cellId]: [
                      newCell,
                      defaultingContent ? EMPTY_STRING : getNextHlc(),
                    ],
                  },
                ],
              },
            ],
          },
        ],
        [{}],
        1,
      ]);
    }
  };
  const valueChanged = (valueId, newValue, mutating) => {
    setAdd(touchedValues, valueId);
    if (listeningToRawStoreChanges || mutating) {
      if (mutating) {
        mutated = 1;
      }
      mergeContentOrChanges([
        [{}],
        [
          {
            [valueId]: [
              newValue,
              defaultingContent ? EMPTY_STRING : getNextHlc(),
            ],
          },
        ],
        1,
      ]);
    }
  };
  const getMergeableContentImpl = (encoded = false) => [
    stampMapToObjWithHash(contentStampMap[0], (tableStampMap) =>
      stampMapToObjWithHash(tableStampMap, (rowStampMap) =>
        stampMapToObjWithHash(rowStampMap, ([cell, hlc, hash]) => [
          decodeIfJson(cell, EMPTY_STRING, encoded),
          hlc,
          hash,
        ]),
      ),
    ),
    stampMapToObjWithHash(contentStampMap[1], ([value, hlc, hash]) => [
      decodeIfJson(value, EMPTY_STRING, encoded),
      hlc,
      hash,
    ]),
  ];
  const getTransactionMergeableChangesImpl = (withHashes, encoded = false) => {
    const [
      [tableStampMaps, tablesHlc, tablesHash],
      [valueStampMaps, valuesHlc, valuesHash],
    ] = contentStampMap;
    const newStamp = withHashes ? stampNewWithHash : stampNew;
    const tablesObj = {};
    collForEach(touchedCells, (touchedTable, tableId) =>
      ifNotUndefined(
        mapGet(tableStampMaps, tableId),
        ([rowStampMaps, tableHlc, tableHash]) => {
          const tableObj = {};
          collForEach(touchedTable, (touchedRow, rowId) =>
            ifNotUndefined(
              mapGet(rowStampMaps, rowId),
              ([cellStampMaps, rowHlc, rowHash]) => {
                const rowObj = {};
                collForEach(touchedRow, (cellId) => {
                  ifNotUndefined(
                    mapGet(cellStampMaps, cellId),
                    ([cell, time, hash]) =>
                      (rowObj[cellId] = newStamp(
                        encoded ? cell : decodeIfJson(cell),
                        time,
                        hash,
                      )),
                  );
                });
                tableObj[rowId] = newStamp(rowObj, rowHlc, rowHash);
              },
            ),
          );
          tablesObj[tableId] = newStamp(tableObj, tableHlc, tableHash);
        },
      ),
    );
    const valuesObj = {};
    collForEach(touchedValues, (valueId) =>
      ifNotUndefined(
        mapGet(valueStampMaps, valueId),
        ([value, time, hash]) =>
          (valuesObj[valueId] = newStamp(
            encoded ? value : decodeIfJson(value),
            time,
            hash,
          )),
      ),
    );
    return [
      newStamp(tablesObj, tablesHlc, tablesHash),
      newStamp(valuesObj, valuesHlc, valuesHash),
      1,
    ];
  };
  const getMergeableContent = () => getMergeableContentImpl();
  const getEncodedMergeableContent = () => getMergeableContentImpl(true);
  const getMergeableContentHashes = () => [
    contentStampMap[0][2],
    contentStampMap[1][2],
  ];
  const getMergeableTableHashes = () =>
    mapToObj(contentStampMap[0][0], getStampHash);
  const getMergeableTableDiff = (otherTableHashes) => {
    const newTables = stampNewObj(contentStampMap[0][1]);
    const differingTableHashes = {};
    mapForEach(
      contentStampMap[0][0],
      (tableId, [tableStampMap, tableHlc, hash]) =>
        objHas(otherTableHashes, tableId)
          ? hash != otherTableHashes[tableId]
            ? (differingTableHashes[tableId] = hash)
            : 0
          : (newTables[0][tableId] = stampMapToObjWithoutHash(
              [tableStampMap, tableHlc],
              (rowStampMap) => stampMapToObjWithoutHash(rowStampMap),
            )),
    );
    return [newTables, differingTableHashes];
  };
  const getMergeableRowHashes = (otherTableHashes) => {
    const rowHashes = {};
    objForEach(otherTableHashes, (otherTableHash, tableId) =>
      ifNotUndefined(
        mapGet(contentStampMap[0][0], tableId),
        ([rowStampMaps, , tableHash]) =>
          tableHash != otherTableHash
            ? mapForEach(
                rowStampMaps,
                (rowId, [, , rowHash]) =>
                  (objEnsure(rowHashes, tableId, objNew)[rowId] = rowHash),
              )
            : 0,
      ),
    );
    return rowHashes;
  };
  const getMergeableRowDiff = (otherTableRowHashes) => {
    const newRows = stampNewObj(contentStampMap[0][1]);
    const differingRowHashes = {};
    objForEach(otherTableRowHashes, (otherRowHashes, tableId) =>
      mapForEach(
        mapGet(contentStampMap[0][0], tableId)?.[0],
        (rowId, [rowStampMap, rowHlc, hash]) =>
          objHas(otherRowHashes, rowId)
            ? hash !== otherRowHashes[rowId]
              ? (objEnsure(differingRowHashes, tableId, objNew)[rowId] = hash)
              : 0
            : (objEnsure(newRows[0], tableId, stampNewObj)[0][rowId] =
                stampMapToObjWithoutHash([rowStampMap, rowHlc])),
      ),
    );
    return [newRows, differingRowHashes];
  };
  const getMergeableCellHashes = (otherTableRowHashes) => {
    const cellHashes = {};
    objForEach(otherTableRowHashes, (otherRowHashes, tableId) =>
      ifNotUndefined(mapGet(contentStampMap[0][0], tableId), ([rowStampMaps]) =>
        objForEach(otherRowHashes, (otherRowHash, rowId) =>
          ifNotUndefined(
            mapGet(rowStampMaps, rowId),
            ([cellStampMaps, , rowHash]) =>
              rowHash !== otherRowHash
                ? mapForEach(
                    cellStampMaps,
                    (cellId, [, , cellHash]) =>
                      (objEnsure(
                        objEnsure(cellHashes, tableId, objNew),
                        rowId,
                        objNew,
                      )[cellId] = cellHash),
                  )
                : 0,
          ),
        ),
      ),
    );
    return cellHashes;
  };
  const getMergeableCellDiff = (otherTableRowCellHashes) => {
    const [[tableStampMaps, tablesHlc]] = contentStampMap;
    const tablesObj = {};
    objForEach(otherTableRowCellHashes, (otherRowCellHashes, tableId) =>
      objForEach(otherRowCellHashes, (otherCellHashes, rowId) =>
        ifNotUndefined(
          mapGet(tableStampMaps, tableId),
          ([rowStampMaps, tableHlc]) =>
            ifNotUndefined(
              mapGet(rowStampMaps, rowId),
              ([cellStampMaps, rowHlc]) =>
                mapForEach(cellStampMaps, (cellId, [cell, cellHlc, hash]) =>
                  hash !== otherCellHashes[cellId]
                    ? (objEnsure(
                        objEnsure(tablesObj, tableId, () =>
                          stampNewObj(tableHlc),
                        )[0],
                        rowId,
                        () => stampNewObj(rowHlc),
                      )[0][cellId] = [cell, cellHlc])
                    : 0,
                ),
            ),
        ),
      ),
    );
    return stampNew(tablesObj, tablesHlc);
  };
  const getMergeableValueHashes = () =>
    mapToObj(contentStampMap[1][0], getStampHash);
  const getMergeableValueDiff = (otherValueHashes) => {
    const [, [valueStampMaps, valuesHlc]] = contentStampMap;
    const values = mapToObj(
      valueStampMaps,
      stampClone,
      ([, , hash], valueId) => hash == otherValueHashes?.[valueId],
    );
    return stampNew(values, valuesHlc);
  };
  const setMergeableContent = (mergeableContent) =>
    disableListeningToRawStoreChanges(() =>
      validateMergeableContent(mergeableContent)
        ? store.transaction(() => {
            store.delTables().delValues();
            contentStampMap = newContentStampMap();
            store.applyChanges(mergeContentOrChanges(mergeableContent, 1));
          })
        : 0,
    );
  const setDefaultContent = (content) => {
    store.transaction(() => {
      defaultingContent = 1;
      store.setContent(content);
      defaultingContent = 0;
    });
    return mergeableStore;
  };
  const getTransactionMergeableChanges = (withHashes = false) =>
    getTransactionMergeableChangesImpl(withHashes);
  const getEncodedTransactionMergeableChanges = (withHashes) =>
    getTransactionMergeableChangesImpl(withHashes, true);
  const applyMergeableChanges = (mergeableChanges) =>
    disableListeningToRawStoreChanges(() =>
      store.applyChanges(mergeContentOrChanges(mergeableChanges)),
    );
  const merge = (mergeableStore2) => {
    const mergeableChanges = getMergeableContent();
    const mergeableChanges2 = mergeableStore2.getMergeableContent();
    mergeableStore2.applyMergeableChanges(mergeableChanges);
    return applyMergeableChanges(mergeableChanges2);
  };
  const hadMutated = () => {
    const result = mutated;
    mutated = 0;
    return result;
  };
  const mergeableStore = {
    getMergeableContent,
    getMergeableContentHashes,
    getMergeableTableHashes,
    getMergeableTableDiff,
    getMergeableRowHashes,
    getMergeableRowDiff,
    getMergeableCellHashes,
    getMergeableCellDiff,
    getMergeableValueHashes,
    getMergeableValueDiff,
    setMergeableContent,
    setDefaultContent,
    getTransactionMergeableChanges,
    applyMergeableChanges,
    merge,
    __: [
      hadMutated,
      getEncodedMergeableContent,
      getEncodedTransactionMergeableChanges,
    ],
  };
  store._[3](
    preStartTransaction,
    preFinishTransaction,
    postFinishTransaction,
    cellChanged,
    valueChanged,
  );
  objMap(
    store,
    (method, name) =>
      (mergeableStore[name] = // fluent methods
        strStartsWith(name, SET) ||
        strStartsWith(name, DEL) ||
        strStartsWith(name, 'apply') ||
        strEndsWith(name, TRANSACTION) ||
        name == 'call' + LISTENER ||
        name == 'use'
          ? (...args) => {
              method(...args);
              return mergeableStore;
            }
          : strStartsWith(name, ADD) && strEndsWith(name, LISTENER)
            ? (...args) => {
                const listenerArg = LISTENER_ARGS[slice(name, 3, -8)] ?? 0;
                const listener = args[listenerArg];
                args[listenerArg] = (_store, ...args2) =>
                  listener(mergeableStore, ...args2);
                return method(...args);
              }
            : name == 'isMergeable'
              ? () => true
              : method),
  );
  return objFreeze(mergeableStore);
};

export {createMergeableStore};
