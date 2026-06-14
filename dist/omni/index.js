import {DurableObject} from 'cloudflare:workers';
import {addDatabaseChangeListener} from 'expo-sqlite';
import {existsSync, watch, writeFileSync} from 'fs';
import {readFile, writeFile} from 'fs/promises';
import {Map as Map$1} from 'yjs';

const getTypeOf = (thing) => typeof thing;
const TINYBASE = 'tinybase';
const EMPTY_STRING = '';
const COMMA = ',';
const DOT = '.';
const STRING = getTypeOf(EMPTY_STRING);
const BOOLEAN = getTypeOf(true);
const NUMBER = getTypeOf(0);
const FUNCTION$1 = getTypeOf(getTypeOf);
const OBJECT = 'object';
const ARRAY = 'array';
const TRUE = 'true';
const TYPE = 'type';
const DEFAULT = 'default';
const ALLOW_NULL = 'allowNull';
const NULL = 'null';
const UTF8 = 'utf8';
const SUM = 'sum';
const AVG = 'avg';
const MIN = 'min';
const MAX = 'max';
const LISTENER = 'Listener';
const RESULT = 'Result';
const GET = 'get';
const SET = 'set';
const ADD = 'add';
const DEL = 'del';
const HAS = 'Has';
const IDS = 'Ids';
const TABLE$1 = 'Table';
const TABLES = TABLE$1 + 's';
const TABLE_IDS = TABLE$1 + IDS;
const ROW = 'Row';
const ROW_COUNT = ROW + 'Count';
const ROW_IDS = ROW + IDS;
const SORTED_ROW_IDS = 'Sorted' + ROW + IDS;
const CELL = 'Cell';
const CELL_IDS = CELL + IDS;
const VALUE = 'Value';
const VALUES = VALUE + 's';
const VALUE_IDS = VALUE + IDS;
const TRANSACTION = 'Transaction';
const OPEN = 'open';
const MESSAGE = 'message';
const ERROR = 'error';
const T = 't';
const V = 'v';
const UNDEFINED = '\uFFFC';
const JSON_PREFIX = '\uFFFD';
const id = (key) => EMPTY_STRING + key;
const strStartsWith = (str, prefix) => str.startsWith(prefix);
const strEndsWith = (str, suffix) => str.endsWith(suffix);
const strMatch = (str, regex) => str?.match(regex);
const strSplit = (str, separator = EMPTY_STRING, limit) =>
  str.split(separator, limit);
const strReplace = (str, searchValue, replaceValue) =>
  str.replace(searchValue, replaceValue);

const promise = Promise;
const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const GLOBAL = globalThis;
const WINDOW = GLOBAL.window;
const THOUSAND = 1e3;
const startInterval = (callback, sec, immediate) => {
  return setInterval(callback, sec * THOUSAND);
};
const stopInterval = clearInterval;
const startTimeout = (callback, sec = 0) =>
  setTimeout(callback, sec * THOUSAND);
const math = Math;
const mathMax = math.max;
const mathMin = math.min;
const mathFloor = math.floor;
const isFiniteNumber = isFinite;
const isInstanceOf = (thing, cls) => thing instanceof cls;
const isNullish = (thing) => thing == null;
const isUndefined = (thing) => thing === void 0;
const isNull = (thing) => thing === null;
const isTrue = (thing) => thing === true;
const isFalse = (thing) => thing === false;
const ifNotNullish = getIfNotFunction(isNullish);
const ifNotUndefined = getIfNotFunction(isUndefined);
const isTypeStringOrBoolean = (type) => type == STRING || type == BOOLEAN;
const isString = (thing) => getTypeOf(thing) == STRING;
const isFunction = (thing) => getTypeOf(thing) == FUNCTION$1;
const isArray = (thing) => Array.isArray(thing);
const slice = (arrayOrString, start, end) => arrayOrString.slice(start, end);
const size = (arrayOrString) => arrayOrString.length;
const test = (regex, subject) => regex.test(subject);
const getUndefined = () => void 0;
const noop = () => {};
const promiseNew = (resolver) => new promise(resolver);
const promiseAll = async (promises) => promise.all(promises);
const structuredClone = GLOBAL.structuredClone;
const errorNew = (message) => {
  throw new Error(message);
};
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
const arrayIsSorted = (array, sorter) =>
  arrayEvery(
    array,
    (value, index) => index == 0 || sorter(array[index - 1], value) <= 0,
  );
const arraySort = (array, sorter) => array.sort(sorter);
const arrayForEach = (array, cb) => array.forEach(cb);
const arrayJoin = (array, sep = EMPTY_STRING) => array.join(sep);
const arrayMap = (array, cb) => array.map(cb);
const arraySum = (array) => arrayReduce(array, (i, j) => i + j, 0);
const arrayIsEmpty = (array) => size(array) == 0;
const arrayReduce = (array, cb, initial) => array.reduce(cb, initial);
const arrayFilter = (array, cb) => array.filter(cb);
const arrayClear = (array, to) => array.splice(0, to);
const arrayPush = (array, ...values) => array.push(...values);
const arrayPop = (array) => array.pop();
const arrayUnshift = (array, ...values) => array.unshift(...values);
const arrayShift = (array) => array.shift();

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
const objMerge = (...objs) => object.assign({}, ...objs);
const objGet = (obj, id) => ifNotUndefined(obj, (obj2) => obj2[id]);
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
const objValues = (obj) => object.values(obj);
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

const setNew = (entryOrEntries) =>
  new Set(
    isArray(entryOrEntries) || isUndefined(entryOrEntries)
      ? entryOrEntries
      : [entryOrEntries],
  );
const setAdd = (set, value) => set?.add(value);

const getDefinableFunctions = (
  store,
  getDefaultThing,
  validateRowValue,
  addListener,
  callListeners,
) => {
  const hasRow = store.hasRow;
  const tableIds = mapNew();
  const things = mapNew();
  const thingIdListeners = mapNew();
  const allRowValues = mapNew();
  const allSortKeys = mapNew();
  const storeListenerIds = mapNew();
  const getStore = () => store;
  const getThingIds = () => mapKeys(tableIds);
  const forEachThing = (cb) => mapForEach(things, cb);
  const hasThing = (id) => collHas(things, id);
  const getTableId = (id) => mapGet(tableIds, id);
  const getThing = (id) => mapGet(things, id);
  const setThing = (id, thing) => mapSet(things, id, thing);
  const addStoreListeners = (id, ...listenerIds) => {
    const set = mapEnsure(storeListenerIds, id, setNew);
    arrayForEach(listenerIds, (listenerId) => setAdd(set, listenerId));
  };
  const delStoreListeners = (id) =>
    ifNotUndefined(mapGet(storeListenerIds, id), (allListenerIds) => {
      arrayForEach(collValues(allListenerIds), (listenerId) => {
        store.delListener(listenerId);
        collDel(allListenerIds, listenerId);
      });
      mapSet(storeListenerIds, id);
    });
  const setDefinition = (id, tableId) => {
    mapSet(tableIds, id, tableId);
    if (!collHas(things, id)) {
      mapSet(things, id, getDefaultThing());
      mapSet(allRowValues, id, mapNew());
      mapSet(allSortKeys, id, mapNew());
      callListeners(thingIdListeners);
    }
  };
  const setDefinitionAndListen = (
    id,
    tableId,
    onChanged,
    getRowValue,
    getSortKey,
  ) => {
    setDefinition(id, tableId);
    const changedRowValues = mapNew();
    const changedSortKeys = mapNew();
    const rowValues = mapGet(allRowValues, id);
    const sortKeys = mapGet(allSortKeys, id);
    const processRow = (rowId) => {
      const getCell = (cellId) => store.getCell(tableId, rowId, cellId);
      const oldRowValue = mapGet(rowValues, rowId);
      const newRowValue = hasRow(tableId, rowId)
        ? validateRowValue(getRowValue(getCell, rowId))
        : void 0;
      if (
        !(
          oldRowValue === newRowValue ||
          (isArray(oldRowValue) &&
            isArray(newRowValue) &&
            arrayIsEqual(oldRowValue, newRowValue))
        )
      ) {
        mapSet(changedRowValues, rowId, [oldRowValue, newRowValue]);
      }
      if (!isUndefined(getSortKey)) {
        const oldSortKey = mapGet(sortKeys, rowId);
        const newSortKey = hasRow(tableId, rowId)
          ? getSortKey(getCell, rowId)
          : void 0;
        if (oldSortKey != newSortKey) {
          mapSet(changedSortKeys, rowId, newSortKey);
        }
      }
    };
    const processTable = (force) => {
      onChanged(
        () => {
          collForEach(changedRowValues, ([, newRowValue], rowId) =>
            mapSet(rowValues, rowId, newRowValue),
          );
          collForEach(changedSortKeys, (newSortKey, rowId) =>
            mapSet(sortKeys, rowId, newSortKey),
          );
        },
        changedRowValues,
        changedSortKeys,
        rowValues,
        sortKeys,
        force,
      );
      collClear(changedRowValues);
      collClear(changedSortKeys);
    };
    mapForEach(rowValues, processRow);
    if (store.hasTable(tableId)) {
      arrayForEach(store.getRowIds(tableId), (rowId) => {
        if (!collHas(rowValues, rowId)) {
          processRow(rowId);
        }
      });
    }
    processTable(true);
    delStoreListeners(id);
    addStoreListeners(
      id,
      store.addRowListener(tableId, null, (_store, _tableId, rowId) =>
        processRow(rowId),
      ),
      store.addTableListener(tableId, () => processTable()),
    );
  };
  const delDefinition = (id) => {
    mapSet(tableIds, id);
    mapSet(things, id);
    mapSet(allRowValues, id);
    mapSet(allSortKeys, id);
    delStoreListeners(id);
    callListeners(thingIdListeners);
  };
  const addThingIdsListener = (listener) =>
    addListener(listener, thingIdListeners);
  const destroy = () => mapForEach(storeListenerIds, delDefinition);
  return [
    getStore,
    getThingIds,
    forEachThing,
    hasThing,
    getTableId,
    getThing,
    setThing,
    setDefinition,
    setDefinitionAndListen,
    delDefinition,
    addThingIdsListener,
    destroy,
  ];
};
const getRowCellFunction = (getRowCell, defaultCellValue) =>
  isString(getRowCell)
    ? (getCell) => getCell(getRowCell)
    : (getRowCell ?? (() => defaultCellValue ?? EMPTY_STRING));
const getCreateFunction = (getFunction, initFunction) => {
  const thingsByStore = /* @__PURE__ */ new WeakMap();
  return (store) => {
    if (!thingsByStore.has(store)) {
      thingsByStore.set(store, getFunction(store));
    }
    const thing = thingsByStore.get(store);
    initFunction?.(thing);
    return thing;
  };
};

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

const createCheckpoints = getCreateFunction(
  (store) => {
    let backwardIdsSize = 100;
    let currentId;
    let cellsDelta = mapNew();
    let valuesDelta = mapNew();
    let listening = 1;
    let nextCheckpointId;
    let checkpointsChanged;
    const checkpointIdsListeners = mapNew();
    const checkpointListeners = mapNew();
    const [addListener, callListeners, delListenerImpl] = getListenerFunctions(
      () => checkpoints,
    );
    const deltas = mapNew();
    const labels = mapNew();
    const backwardIds = [];
    const forwardIds = [];
    const updateStore = (oldOrNew, checkpointId) => {
      listening = 0;
      store.transaction(() => {
        const [cellsDelta2, valuesDelta2] = mapGet(deltas, checkpointId);
        collForEach(cellsDelta2, (table, tableId) =>
          collForEach(table, (row, rowId) =>
            collForEach(row, (oldNew, cellId) =>
              store._[5](tableId, rowId, cellId, oldNew[oldOrNew], true),
            ),
          ),
        );
        collForEach(valuesDelta2, (oldNew, valueId) =>
          store._[6](valueId, oldNew[oldOrNew], true),
        );
      });
      listening = 1;
    };
    const clearCheckpointId = (checkpointId) => {
      mapSet(deltas, checkpointId);
      mapSet(labels, checkpointId);
      callListeners(checkpointListeners, [checkpointId]);
    };
    const clearCheckpointIds = (checkpointIds, to) =>
      arrayForEach(
        arrayClear(checkpointIds, to ?? size(checkpointIds)),
        clearCheckpointId,
      );
    const trimBackwardsIds = () =>
      clearCheckpointIds(backwardIds, size(backwardIds) - backwardIdsSize);
    const storeChanged = () =>
      ifNotUndefined(currentId, () => {
        arrayPush(backwardIds, currentId);
        trimBackwardsIds();
        clearCheckpointIds(forwardIds);
        currentId = void 0;
        checkpointsChanged = 1;
      });
    const storeUnchanged = () => {
      currentId = arrayPop(backwardIds);
      checkpointsChanged = 1;
    };
    let cellListenerId;
    let valueListenerId;
    const addCheckpointImpl = (label = EMPTY_STRING) => {
      if (isUndefined(currentId)) {
        currentId = EMPTY_STRING + nextCheckpointId++;
        mapSet(deltas, currentId, [cellsDelta, valuesDelta]);
        setCheckpoint(currentId, label);
        cellsDelta = mapNew();
        valuesDelta = mapNew();
        checkpointsChanged = 1;
      }
      return currentId;
    };
    const goBackwardImpl = () => {
      if (!arrayIsEmpty(backwardIds)) {
        arrayUnshift(forwardIds, addCheckpointImpl());
        updateStore(0, currentId);
        currentId = arrayPop(backwardIds);
        checkpointsChanged = 1;
      }
    };
    const goForwardImpl = () => {
      if (!arrayIsEmpty(forwardIds)) {
        arrayPush(backwardIds, currentId);
        currentId = arrayShift(forwardIds);
        updateStore(1, currentId);
        checkpointsChanged = 1;
      }
    };
    const callListenersIfChanged = () => {
      if (checkpointsChanged) {
        callListeners(checkpointIdsListeners);
        checkpointsChanged = 0;
      }
    };
    const setSize = (size2) => {
      backwardIdsSize = size2;
      trimBackwardsIds();
      return checkpoints;
    };
    const addCheckpoint = (label) => {
      const id = addCheckpointImpl(label);
      callListenersIfChanged();
      return id;
    };
    const setCheckpoint = (checkpointId, label) => {
      if (
        hasCheckpoint(checkpointId) &&
        mapGet(labels, checkpointId) !== label
      ) {
        mapSet(labels, checkpointId, label);
        callListeners(checkpointListeners, [checkpointId]);
      }
      return checkpoints;
    };
    const getStore = () => store;
    const getCheckpointIds = () => [
      [...backwardIds],
      currentId,
      [...forwardIds],
    ];
    const forEachCheckpoint = (checkpointCallback) =>
      mapForEach(labels, checkpointCallback);
    const hasCheckpoint = (checkpointId) => collHas(deltas, checkpointId);
    const getCheckpoint = (checkpointId) => mapGet(labels, checkpointId);
    const goBackward = () => {
      goBackwardImpl();
      callListenersIfChanged();
      return checkpoints;
    };
    const goForward = () => {
      goForwardImpl();
      callListenersIfChanged();
      return checkpoints;
    };
    const goTo = (checkpointId) => {
      const action = arrayHas(backwardIds, checkpointId)
        ? goBackwardImpl
        : arrayHas(forwardIds, checkpointId)
          ? goForwardImpl
          : void 0;
      while (!isUndefined(action) && checkpointId != currentId) {
        action();
      }
      callListenersIfChanged();
      return checkpoints;
    };
    const addCheckpointIdsListener = (listener) =>
      addListener(listener, checkpointIdsListeners);
    const addCheckpointListener = (checkpointId, listener) =>
      addListener(listener, checkpointListeners, [checkpointId]);
    const delListener = (listenerId) => {
      delListenerImpl(listenerId);
      return checkpoints;
    };
    const clear = () => {
      clearCheckpointIds(backwardIds);
      clearCheckpointIds(forwardIds);
      if (!isUndefined(currentId)) {
        clearCheckpointId(currentId);
      }
      currentId = void 0;
      nextCheckpointId = 0;
      addCheckpoint();
      return checkpoints;
    };
    const clearForward = () => {
      if (!arrayIsEmpty(forwardIds)) {
        clearCheckpointIds(forwardIds);
        callListeners(checkpointIdsListeners);
      }
      return checkpoints;
    };
    const destroy = () => {
      store.delListener(cellListenerId);
      store.delListener(valueListenerId);
    };
    const getListenerStats = () => ({
      checkpointIds: collSize2(checkpointIdsListeners),
      checkpoint: collSize2(checkpointListeners),
    });
    const _registerListeners = () => {
      cellListenerId = store.addCellListener(
        null,
        null,
        null,
        (_store, tableId, rowId, cellId, newCell, oldCell) => {
          if (listening) {
            storeChanged();
            const table = mapEnsure(cellsDelta, tableId, mapNew);
            const row = mapEnsure(table, rowId, mapNew);
            const oldNew = mapEnsure(row, cellId, () => [oldCell, void 0]);
            oldNew[1] = newCell;
            if (
              oldNew[0] === newCell &&
              collIsEmpty(mapSet(row, cellId)) &&
              collIsEmpty(mapSet(table, rowId)) &&
              collIsEmpty(mapSet(cellsDelta, tableId))
            ) {
              storeUnchanged();
            }
            callListenersIfChanged();
          }
        },
      );
      valueListenerId = store.addValueListener(
        null,
        (_store, valueId, newValue, oldValue) => {
          if (listening) {
            storeChanged();
            const oldNew = mapEnsure(valuesDelta, valueId, () => [
              oldValue,
              void 0,
            ]);
            oldNew[1] = newValue;
            if (
              oldNew[0] === newValue &&
              collIsEmpty(mapSet(valuesDelta, valueId))
            ) {
              storeUnchanged();
            }
            callListenersIfChanged();
          }
        },
      );
    };
    const checkpoints = {
      setSize,
      addCheckpoint,
      setCheckpoint,
      getStore,
      getCheckpointIds,
      forEachCheckpoint,
      hasCheckpoint,
      getCheckpoint,
      goBackward,
      goForward,
      goTo,
      addCheckpointIdsListener,
      addCheckpointListener,
      delListener,
      clear,
      clearForward,
      destroy,
      getListenerStats,
      _registerListeners,
    };
    return objFreeze(checkpoints.clear());
  },
  (checkpoints) => checkpoints._registerListeners(),
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

const jsonString = JSON.stringify;
const jsonParse = JSON.parse;
const jsonStringWithMap = (obj) =>
  jsonString(obj, (_key, value) =>
    isInstanceOf(value, Map) ? object.fromEntries([...value]) : value,
  );
const jsonStringWithUndefined = (obj) =>
  jsonString(obj, (_key, value) => (isUndefined(value) ? UNDEFINED : value));
const jsonParseWithUndefined = (str) =>
  // JSON.parse reviver removes properties with undefined values
  replaceUndefinedString(jsonParse(str));
const replaceUndefinedString = (obj) =>
  obj === UNDEFINED
    ? void 0
    : isArray(obj)
      ? arrayMap(obj, replaceUndefinedString)
      : isObject(obj)
        ? objMap(obj, replaceUndefinedString)
        : obj;

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
const getValuesHash = (valueHashes) =>
  arrayReduce(
    objEntries(valueHashes),
    (valuesHash, [valueId, valueHash]) =>
      addOrRemoveHash(
        valuesHash,
        getValueInValuesHash(valueId, valueHash) ^
          getValueInValuesHash(valueId, 0),
        // legacy v5; remove in v7
      ),
    0,
    // legacy v5; valuesHlc in v7?
  );
const getValueInValuesHash = (valueId, valueHash) =>
  getHash(valueId + ':' + valueHash);
const getValueHash = (value, valueHlc) =>
  getHash(jsonStringWithMap(value ?? null) + ':' + valueHlc);
const getCellHash = getValueHash;
const getCellInRowHash = getValueInValuesHash;
const getRowHash = getValuesHash;
const getRowInTableHash = getValueInValuesHash;
const getTableHash = (rowHashes) =>
  // alias to getValuesHash in v7
  arrayReduce(
    objEntries(rowHashes),
    (valuesHash, [rowId, rowHash]) =>
      addOrRemoveHash(valuesHash, getValueInValuesHash(rowId, rowHash)),
    0,
    // legacy v5; rowHlc in v7?
  );
const getTableInTablesHash = getValueInValuesHash;
const getTablesHash = getTableHash;

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

const defaultSorter = (sortKey1, sortKey2) =>
  (sortKey1 ?? 0) < (sortKey2 ?? 0) ? -1 : 1;

const createIndexes = getCreateFunction((store) => {
  const sliceIdsListeners = mapNew();
  const sliceRowIdsListeners = mapNew();
  const [addListener, callListeners, delListenerImpl] = getListenerFunctions(
    () => indexes,
  );
  const [
    getStore,
    getIndexIds,
    forEachIndexImpl,
    hasIndex,
    getTableId,
    getIndex,
    setIndex,
    ,
    setDefinitionAndListen,
    delDefinition,
    addIndexIdsListener,
    destroy,
  ] = getDefinableFunctions(
    store,
    mapNew,
    (value) =>
      isUndefined(value)
        ? EMPTY_STRING
        : isArray(value)
          ? arrayMap(value, id)
          : id(value),
    addListener,
    callListeners,
  );
  const hasSlice = (indexId, sliceId) => collHas(getIndex(indexId), sliceId);
  const setIndexDefinition = (
    indexId,
    tableId,
    getSliceIdOrIds,
    getSortKey,
    sliceIdSorter,
    rowIdSorter = defaultSorter,
  ) => {
    const sliceIdArraySorter = isUndefined(sliceIdSorter)
      ? void 0
      : ([id1], [id2]) => sliceIdSorter(id1, id2);
    setDefinitionAndListen(
      indexId,
      tableId,
      (
        change,
        changedSliceIds,
        changedSortKeys,
        sliceIdOrIdsByRowId,
        sortKeys,
        force,
      ) => {
        let sliceIdsChanged = 0;
        const changedSlices = setNew();
        const unsortedSlices = setNew();
        const index = getIndex(indexId);
        collForEach(
          changedSliceIds,
          ([oldSliceIdOrIds, newSliceIdOrIds], rowId) => {
            const oldSliceIds = setNew(oldSliceIdOrIds);
            const newSliceIds = setNew(newSliceIdOrIds);
            collForEach(oldSliceIds, (oldSliceId) =>
              collDel(newSliceIds, oldSliceId)
                ? collDel(oldSliceIds, oldSliceId)
                : 0,
            );
            collForEach(oldSliceIds, (oldSliceId) => {
              setAdd(changedSlices, oldSliceId);
              ifNotUndefined(mapGet(index, oldSliceId), (oldSlice) => {
                collDel(oldSlice, rowId);
                if (collIsEmpty(oldSlice)) {
                  mapSet(index, oldSliceId);
                  sliceIdsChanged = 1;
                }
              });
            });
            collForEach(newSliceIds, (newSliceId) => {
              setAdd(changedSlices, newSliceId);
              if (!collHas(index, newSliceId)) {
                mapSet(index, newSliceId, setNew());
                sliceIdsChanged = 1;
              }
              setAdd(mapGet(index, newSliceId), rowId);
              if (!isUndefined(getSortKey)) {
                setAdd(unsortedSlices, newSliceId);
              }
            });
          },
        );
        change();
        if (!collIsEmpty(sortKeys)) {
          if (force) {
            mapForEach(index, (sliceId) => setAdd(unsortedSlices, sliceId));
          } else {
            mapForEach(changedSortKeys, (rowId) =>
              ifNotUndefined(
                mapGet(sliceIdOrIdsByRowId, rowId),
                (sliceIdOrIds) =>
                  arrayForEach(
                    isArray(sliceIdOrIds) ? sliceIdOrIds : [sliceIdOrIds],
                    (sliceId) => setAdd(unsortedSlices, sliceId),
                  ),
              ),
            );
          }
          collForEach(unsortedSlices, (sliceId) => {
            const rowIdArraySorter = (rowId1, rowId2) =>
              rowIdSorter(
                mapGet(sortKeys, rowId1),
                mapGet(sortKeys, rowId2),
                sliceId,
              );
            const sliceArray = [...mapGet(index, sliceId)];
            if (!arrayIsSorted(sliceArray, rowIdArraySorter)) {
              mapSet(
                index,
                sliceId,
                setNew(arraySort(sliceArray, rowIdArraySorter)),
              );
              setAdd(changedSlices, sliceId);
            }
          });
        }
        if (sliceIdsChanged || force) {
          if (!isUndefined(sliceIdArraySorter)) {
            const indexArray = [...index];
            if (!arrayIsSorted(indexArray, sliceIdArraySorter)) {
              setIndex(
                indexId,
                mapNew(arraySort(indexArray, sliceIdArraySorter)),
              );
              sliceIdsChanged = 1;
            }
          }
        }
        if (sliceIdsChanged) {
          callListeners(sliceIdsListeners, [indexId]);
        }
        collForEach(changedSlices, (sliceId) =>
          callListeners(sliceRowIdsListeners, [indexId, sliceId]),
        );
      },
      getRowCellFunction(getSliceIdOrIds),
      ifNotUndefined(getSortKey, getRowCellFunction),
    );
    return indexes;
  };
  const forEachIndex = (indexCallback) =>
    forEachIndexImpl((indexId, slices) =>
      indexCallback(indexId, (sliceCallback) =>
        forEachSliceImpl(indexId, sliceCallback, slices),
      ),
    );
  const forEachSlice = (indexId, sliceCallback) =>
    forEachSliceImpl(indexId, sliceCallback, getIndex(indexId));
  const forEachSliceImpl = (indexId, sliceCallback, slices) => {
    const tableId = getTableId(indexId);
    collForEach(slices, (rowIds, sliceId) =>
      sliceCallback(sliceId, (rowCallback) =>
        collForEach(rowIds, (rowId) =>
          rowCallback(rowId, (cellCallback) =>
            store.forEachCell(tableId, rowId, cellCallback),
          ),
        ),
      ),
    );
  };
  const delIndexDefinition = (indexId) => {
    delDefinition(indexId);
    return indexes;
  };
  const getSliceIds = (indexId) => mapKeys(getIndex(indexId));
  const getSliceRowIds = (indexId, sliceId) =>
    collValues(mapGet(getIndex(indexId), sliceId));
  const addSliceIdsListener = (indexId, listener) =>
    addListener(listener, sliceIdsListeners, [indexId]);
  const addSliceRowIdsListener = (indexId, sliceId, listener) =>
    addListener(listener, sliceRowIdsListeners, [indexId, sliceId]);
  const delListener = (listenerId) => {
    delListenerImpl(listenerId);
    return indexes;
  };
  const getListenerStats = () => ({
    sliceIds: collSize2(sliceIdsListeners),
    sliceRowIds: collSize3(sliceRowIdsListeners),
  });
  const indexes = {
    setIndexDefinition,
    delIndexDefinition,
    getStore,
    getIndexIds,
    forEachIndex,
    forEachSlice,
    hasIndex,
    hasSlice,
    getTableId,
    getSliceIds,
    getSliceRowIds,
    addIndexIdsListener,
    addSliceIdsListener,
    addSliceRowIdsListener,
    delListener,
    destroy,
    getListenerStats,
  };
  return objFreeze(indexes);
});

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
      [HAS + TABLE$1]: [
        1,
        hasTableListeners,
        [getTableIds],
        (ids) => [hasTable(...ids)],
      ],
      [TABLE$1]: [1, tableListeners, [getTableIds]],
      [TABLE$1 + CELL_IDS]: [1, tableCellIdsListeners, [getTableIds]],
      [HAS + TABLE$1 + CELL]: [
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

const numericAggregators = /* @__PURE__ */ mapNew([
  [
    AVG,
    [
      (numbers, length) => arraySum(numbers) / length,
      (metric, add, length) => metric + (add - metric) / (length + 1),
      (metric, remove, length) => metric + (metric - remove) / (length - 1),
      (metric, add, remove, length) => metric + (add - remove) / length,
    ],
  ],
  [
    MAX,
    [
      (numbers) => mathMax(...numbers),
      (metric, add) => mathMax(add, metric),
      (metric, remove) => (remove == metric ? void 0 : metric),
      (metric, add, remove) =>
        remove == metric ? void 0 : mathMax(add, metric),
    ],
  ],
  [
    MIN,
    [
      (numbers) => mathMin(...numbers),
      (metric, add) => mathMin(add, metric),
      (metric, remove) => (remove == metric ? void 0 : metric),
      (metric, add, remove) =>
        remove == metric ? void 0 : mathMin(add, metric),
    ],
  ],
  [
    SUM,
    [
      (numbers) => arraySum(numbers),
      (metric, add) => metric + add,
      (metric, remove) => metric - remove,
      (metric, add, remove) => metric - remove + add,
    ],
  ],
]);
const getAggregateValue = (
  aggregateValue,
  oldLength,
  newValues,
  changedValues,
  aggregators,
  force = false,
) => {
  if (collIsEmpty(newValues)) {
    return void 0;
  }
  const [aggregate, aggregateAdd, aggregateRemove, aggregateReplace] =
    aggregators;
  force ||= isUndefined(aggregateValue);
  collForEach(changedValues, ([oldValue, newValue]) => {
    if (!force) {
      aggregateValue = isUndefined(oldValue)
        ? aggregateAdd?.(aggregateValue, newValue, oldLength++)
        : isUndefined(newValue)
          ? aggregateRemove?.(aggregateValue, oldValue, oldLength--)
          : aggregateReplace?.(aggregateValue, newValue, oldValue, oldLength);
      force ||= isUndefined(aggregateValue);
    }
  });
  return force
    ? aggregate(collValues(newValues), collSize(newValues))
    : aggregateValue;
};

const createMetrics = getCreateFunction((store) => {
  const metricListeners = mapNew();
  const [addListener, callListeners, delListenerImpl] = getListenerFunctions(
    () => metrics,
  );
  const [
    getStore,
    getMetricIds,
    forEachMetric,
    hasMetric,
    getTableId,
    getMetric,
    setMetric,
    ,
    setDefinitionAndListen,
    delDefinition,
    addMetricIdsListener,
    destroy,
  ] = getDefinableFunctions(
    store,
    getUndefined,
    (value) =>
      isNaN(value) ||
      isUndefined(value) ||
      isTrue(value) ||
      isFalse(value) ||
      value === EMPTY_STRING
        ? void 0
        : value * 1,
    addListener,
    callListeners,
  );
  const setMetricDefinition = (
    metricId,
    tableId,
    aggregate,
    getNumber,
    aggregateAdd,
    aggregateRemove,
    aggregateReplace,
  ) => {
    const aggregators = isFunction(aggregate)
      ? [aggregate, aggregateAdd, aggregateRemove, aggregateReplace]
      : (mapGet(numericAggregators, aggregate) ??
        mapGet(numericAggregators, SUM));
    setDefinitionAndListen(
      metricId,
      tableId,
      (change, changedNumbers, _changedSortKeys, numbers, _sortKeys, force) => {
        const oldMetric = getMetric(metricId);
        const oldLength = collSize(numbers);
        force ||= isUndefined(oldMetric);
        change();
        let newMetric = getAggregateValue(
          oldMetric,
          oldLength,
          numbers,
          changedNumbers,
          aggregators,
          force,
        );
        if (!isFiniteNumber(newMetric)) {
          newMetric = void 0;
        }
        if (newMetric != oldMetric) {
          setMetric(metricId, newMetric);
          callListeners(metricListeners, [metricId], newMetric, oldMetric);
        }
      },
      getRowCellFunction(getNumber, 1),
    );
    return metrics;
  };
  const delMetricDefinition = (metricId) => {
    delDefinition(metricId);
    return metrics;
  };
  const addMetricListener = (metricId, listener) =>
    addListener(listener, metricListeners, [metricId]);
  const delListener = (listenerId) => {
    delListenerImpl(listenerId);
    return metrics;
  };
  const getListenerStats = () => ({
    metric: collSize2(metricListeners),
  });
  const metrics = {
    setMetricDefinition,
    delMetricDefinition,
    getStore,
    getMetricIds,
    forEachMetric,
    hasMetric,
    getTableId,
    getMetric,
    addMetricIdsListener,
    addMetricListener,
    delListener,
    destroy,
    getListenerStats,
  };
  return objFreeze(metrics);
});

const reduceCallbacks = (callbacks, thing, ...ids) =>
  arrayReduce(
    callbacks,
    (current, callback) =>
      isUndefined(current) ? current : callback(...ids, current),
    thing,
  );
const everyCallback = (callbacks, ...ids) =>
  arrayEvery(callbacks, (callback) => callback(...ids));
const createMiddleware = getCreateFunction((store) => {
  const fluent = (actions) => {
    actions();
    return middleware;
  };
  const addCallback = (callbacks) => (callback) =>
    fluent(() => arrayPush(callbacks, callback));
  const willSetContentCallbacks = [];
  const willSetTablesCallbacks = [];
  const willSetTableCallbacks = [];
  const willSetRowCallbacks = [];
  const willSetCellCallbacks = [];
  const willSetValuesCallbacks = [];
  const willSetValueCallbacks = [];
  const willDelTablesCallbacks = [];
  const willDelTableCallbacks = [];
  const willDelRowCallbacks = [];
  const willDelCellCallbacks = [];
  const willDelValuesCallbacks = [];
  const willDelValueCallbacks = [];
  const willApplyChangesCallbacks = [];
  const willSetContent = (content) =>
    reduceCallbacks(willSetContentCallbacks, content);
  const willSetTables = (tables) =>
    reduceCallbacks(willSetTablesCallbacks, tables);
  const willSetTable = (tableId, table) =>
    reduceCallbacks(willSetTableCallbacks, table, tableId);
  const willSetRow = (tableId, rowId, row) =>
    reduceCallbacks(willSetRowCallbacks, row, tableId, rowId);
  const willSetCell = (tableId, rowId, cellId, cell) =>
    reduceCallbacks(willSetCellCallbacks, cell, tableId, rowId, cellId);
  const willSetValues = (values) =>
    reduceCallbacks(willSetValuesCallbacks, values);
  const willSetValue = (valueId, value) =>
    reduceCallbacks(willSetValueCallbacks, value, valueId);
  const willDelTables = () => everyCallback(willDelTablesCallbacks);
  const willDelTable = (tableId) =>
    everyCallback(willDelTableCallbacks, tableId);
  const willDelRow = (tableId, rowId) =>
    everyCallback(willDelRowCallbacks, tableId, rowId);
  const willDelCell = (tableId, rowId, cellId) =>
    everyCallback(willDelCellCallbacks, tableId, rowId, cellId);
  const willDelValues = () => everyCallback(willDelValuesCallbacks);
  const willDelValue = (valueId) =>
    everyCallback(willDelValueCallbacks, valueId);
  const willApplyChanges = (changes) =>
    reduceCallbacks(willApplyChangesCallbacks, changes);
  const getStore = () => store;
  const addWillSetContentCallback = addCallback(willSetContentCallbacks);
  const addWillSetTablesCallback = addCallback(willSetTablesCallbacks);
  const addWillSetTableCallback = addCallback(willSetTableCallbacks);
  const addWillSetRowCallback = addCallback(willSetRowCallbacks);
  const addWillSetCellCallback = addCallback(willSetCellCallbacks);
  const addWillSetValuesCallback = addCallback(willSetValuesCallbacks);
  const addWillSetValueCallback = addCallback(willSetValueCallbacks);
  const addWillDelTablesCallback = addCallback(willDelTablesCallbacks);
  const addWillDelTableCallback = addCallback(willDelTableCallbacks);
  const addWillDelRowCallback = addCallback(willDelRowCallbacks);
  const addWillDelCellCallback = addCallback(willDelCellCallbacks);
  const addWillDelValuesCallback = addCallback(willDelValuesCallbacks);
  const addWillDelValueCallback = addCallback(willDelValueCallbacks);
  const addWillApplyChangesCallback = addCallback(willApplyChangesCallbacks);
  const destroy = () => {};
  const middleware = objFreeze({
    getStore,
    addWillSetContentCallback,
    addWillSetTablesCallback,
    addWillSetTableCallback,
    addWillSetRowCallback,
    addWillSetCellCallback,
    addWillSetValuesCallback,
    addWillSetValueCallback,
    addWillDelTablesCallback,
    addWillDelTableCallback,
    addWillDelRowCallback,
    addWillDelCellCallback,
    addWillDelValuesCallback,
    addWillDelValueCallback,
    addWillApplyChangesCallback,
    destroy,
  });
  store._[4](
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
    () => willSetRowCallbacks.length > 0,
  );
  return middleware;
});

const Status = {
  Idle: 0 /* Idle */,
  Loading: 1 /* Loading */,
  Saving: 2 /* Saving */,
};
const Persists = {
  StoreOnly: 1 /* StoreOnly */,
  MergeableStoreOnly: 2 /* MergeableStoreOnly */,
  StoreOrMergeableStore: 3 /* StoreOrMergeableStore */,
};
const scheduleRunning = mapNew();
const scheduleActions = mapNew();
const getStoreFunctions = (
  persist = 1 /* StoreOnly */,
  store,
  isSynchronizer,
) =>
  persist != 1 /* StoreOnly */ && store.isMergeable()
    ? [
        1,
        store.__[1],
        () => store.__[2](!isSynchronizer),
        ([[changedTables], [changedValues]]) =>
          !objIsEmpty(changedTables) || !objIsEmpty(changedValues),
        store.setDefaultContent,
      ]
    : persist != 2 /* MergeableStoreOnly */
      ? [
          0,
          store._[7],
          store._[8],
          ([changedTables, changedValues]) =>
            !objIsEmpty(changedTables) || !objIsEmpty(changedValues),
          store.setContent,
        ]
      : errorNew('Store type not supported by this Persister');
const createCustomPersister = (
  store,
  getPersisted,
  setPersisted,
  addPersisterListener,
  delPersisterListener,
  onIgnoredError,
  persist,
  extra = {},
  isSynchronizer = 0,
  scheduleId = [],
) => {
  let status = 0; /* Idle */
  let loads = 0;
  let saves = 0;
  let action;
  let autoLoadHandle;
  let autoSaveListenerId;
  mapEnsure(scheduleRunning, scheduleId, () => 0);
  mapEnsure(scheduleActions, scheduleId, () => []);
  const statusListeners = mapNew();
  const [
    isMergeableStore,
    getContent,
    getChanges,
    hasChanges,
    setDefaultContent,
  ] = getStoreFunctions(persist, store, isSynchronizer);
  const [addListener, callListeners, delListenerImpl] = getListenerFunctions(
    () => persister,
  );
  const setStatus = (newStatus) => {
    if (newStatus != status) {
      status = newStatus;
      callListeners(statusListeners, void 0, status);
    }
  };
  const run = async () => {
    /* istanbul ignore else */
    if (!mapGet(scheduleRunning, scheduleId)) {
      mapSet(scheduleRunning, scheduleId, 1);
      while (
        !isUndefined((action = arrayShift(mapGet(scheduleActions, scheduleId))))
      ) {
        await tryCatch(action, onIgnoredError);
      }
      mapSet(scheduleRunning, scheduleId, 0);
    }
  };
  const setContentOrChanges = (contentOrChanges) => {
    (isMergeableStore && isArray(contentOrChanges?.[0])
      ? contentOrChanges?.[2] === 1
        ? store.applyMergeableChanges
        : store.setMergeableContent
      : contentOrChanges?.[2] === 1
        ? store.applyChanges
        : store.setContent)(contentOrChanges);
  };
  const saveAfterMutated = async () => {
    if (isAutoSaving() && store.__?.[0]?.()) {
      await save();
    }
  };
  const load = async (initialContent) => {
    /* istanbul ignore else */
    if (status != 2 /* Saving */) {
      setStatus(1 /* Loading */);
      loads++;
      await schedule(async () => {
        await tryCatch(
          async () => {
            const content = await getPersisted();
            if (isArray(content)) {
              setContentOrChanges(content);
            } else if (initialContent) {
              setDefaultContent(initialContent);
            } else {
              errorNew(`Content is not an array: ${content}`);
            }
          },
          () => {
            if (initialContent) {
              setDefaultContent(initialContent);
            }
          },
        );
        setStatus(0 /* Idle */);
        await saveAfterMutated();
      });
    }
    return persister;
  };
  const startAutoLoad = async (initialContent) => {
    stopAutoLoad();
    await load(initialContent);
    await tryCatch(
      async () =>
        (autoLoadHandle = await addPersisterListener(
          async (content, changes) => {
            if (changes || content) {
              /* istanbul ignore else */
              if (status != 2 /* Saving */) {
                setStatus(1 /* Loading */);
                loads++;
                setContentOrChanges(changes ?? content);
                setStatus(0 /* Idle */);
                await saveAfterMutated();
              }
            } else {
              await load();
            }
          },
        )),
      onIgnoredError,
    );
    return persister;
  };
  const stopAutoLoad = async () => {
    if (autoLoadHandle) {
      await tryCatch(
        () => delPersisterListener(autoLoadHandle),
        onIgnoredError,
      );
      autoLoadHandle = void 0;
    }
    return persister;
  };
  const isAutoLoading = () => !isUndefined(autoLoadHandle);
  const save = async (changes) => {
    /* istanbul ignore else */
    if (status != 1 /* Loading */) {
      setStatus(2 /* Saving */);
      saves++;
      await schedule(async () => {
        await tryCatch(() => setPersisted(getContent, changes), onIgnoredError);
        setStatus(0 /* Idle */);
      });
    }
    return persister;
  };
  const startAutoSave = async () => {
    stopAutoSave();
    await save();
    autoSaveListenerId = store.addDidFinishTransactionListener(() => {
      const changes = getChanges();
      if (hasChanges(changes)) {
        save(changes);
      }
    });
    return persister;
  };
  const stopAutoSave = async () => {
    if (autoSaveListenerId) {
      store.delListener(autoSaveListenerId);
      autoSaveListenerId = void 0;
    }
    return persister;
  };
  const isAutoSaving = () => !isUndefined(autoSaveListenerId);
  const startAutoPersisting = async (
    initialContent,
    startSaveFirst = false,
  ) => {
    const [call1, call2] = startSaveFirst
      ? [startAutoSave, startAutoLoad]
      : [startAutoLoad, startAutoSave];
    await call1(initialContent);
    await call2(initialContent);
    return persister;
  };
  const stopAutoPersisting = async (stopSaveFirst = false) => {
    const [call1, call2] = stopSaveFirst
      ? [stopAutoSave, stopAutoLoad]
      : [stopAutoLoad, stopAutoSave];
    await call1();
    await call2();
    return persister;
  };
  const getStatus = () => status;
  const addStatusListener = (listener) =>
    addListener(listener, statusListeners);
  const delListener = (listenerId) => {
    delListenerImpl(listenerId);
    return store;
  };
  const schedule = async (...actions) => {
    arrayPush(mapGet(scheduleActions, scheduleId), ...actions);
    await run();
    return persister;
  };
  const getStore = () => store;
  const destroy = () => {
    arrayClear(mapGet(scheduleActions, scheduleId));
    return stopAutoPersisting();
  };
  const getStats = () => ({loads, saves});
  const persister = {
    load,
    startAutoLoad,
    stopAutoLoad,
    isAutoLoading,
    save,
    startAutoSave,
    stopAutoSave,
    isAutoSaving,
    startAutoPersisting,
    stopAutoPersisting,
    getStatus,
    addStatusListener,
    delListener,
    schedule,
    getStore,
    destroy,
    getStats,
    ...extra,
  };
  return objFreeze(persister);
};

const SINGLE_ROW_ID = '_';
const DEFAULT_ROW_ID_COLUMN_NAME = '_id';
const SELECT = 'SELECT';
const WHERE = 'WHERE';
const TABLE = 'TABLE';
const INSERT = 'INSERT';
const DELETE$1 = 'DELETE';
const UPDATE = 'UPDATE';
const ALTER_TABLE = 'ALTER ' + TABLE;
const FROM = 'FROM';
const DELETE_FROM = DELETE$1 + ' ' + FROM;
const SELECT_STAR_FROM = SELECT + '*' + FROM;
const PRAGMA = 'pragma_';
const DATA_VERSION = 'data_version';
const SCHEMA_VERSION = 'schema_version';
const PRAGMA_TABLE = 'pragma_table_';
const CREATE = 'CREATE ';
const CREATE_TABLE = CREATE + TABLE;
const OR_REPLACE = 'OR REPLACE ';
const FUNCTION = 'FUNCTION';
const TABLE_NAME_PLACEHOLDER = '$tableName';
const getWrappedCommand = (executeCommand, onSqlCommand) =>
  onSqlCommand
    ? async (sql, params) => {
        onSqlCommand(sql, params);
        return await executeCommand(sql, params);
      }
    : executeCommand;
const escapeId = (str) =>
  arrayJoin(
    arrayMap(strSplit(str, DOT), (part) => `"${strReplace(part, /"/g, '""')}"`),
    DOT,
  );
const escapeIds = (...ids) => escapeId(arrayJoin(ids, '_'));
const escapeColumnNames = (...columnNames) =>
  arrayJoin(arrayMap(columnNames, escapeId), COMMA);
const getPlaceholders = (array, offset = [1]) =>
  arrayJoin(
    arrayMap(array, () => '$' + offset[0]++),
    COMMA,
  );
const getWhereCondition = (tableName, condition = TRUE) =>
  WHERE +
  `(${strReplace(condition, TABLE_NAME_PLACEHOLDER, escapeId(tableName))})`;

const COLUMN_NAME = 'ColumnName';
const STORE = 'store';
const JSON$1 = 'json';
const STORE_TABLE_NAME = STORE + 'TableName';
const STORE_ID_COLUMN_NAME = STORE + 'Id' + COLUMN_NAME;
const STORE_COLUMN_NAME = STORE + COLUMN_NAME;
const AUTO_LOAD_INTERVAL_SECONDS = 'autoLoadIntervalSeconds';
const ROW_ID_COLUMN_NAME = 'rowId' + COLUMN_NAME;
const TABLE_ID = 'tableId';
const TABLE_NAME = 'tableName';
const DELETE_EMPTY_COLUMNS = 'deleteEmptyColumns';
const DELETE_EMPTY_TABLE = 'deleteEmptyTable';
const CONDITION = 'condition';
const DEFAULT_CONFIG = {
  mode: JSON$1,
  [AUTO_LOAD_INTERVAL_SECONDS]: 1,
};
const DEFAULT_TABULAR_VALUES_CONFIG = {
  load: 0,
  save: 0,
  [TABLE_NAME]: TINYBASE + '_values',
};
const getDefaultedConfig = (configOrStoreTableName) =>
  objMerge(
    DEFAULT_CONFIG,
    isString(configOrStoreTableName)
      ? {[STORE_TABLE_NAME]: configOrStoreTableName}
      : (configOrStoreTableName ?? {}),
  );
const getDefaultedTabularConfigMap = (
  configsObj,
  defaultObj,
  tableField,
  exclude,
  then,
) => {
  const configMap = mapNew();
  objMap(configsObj, (configObj, id) => {
    const defaultedConfig = slice(
      objValues(
        objMerge(
          defaultObj,
          isString(configObj) ? {[tableField]: configObj} : configObj,
        ),
      ),
      0,
      objSize(defaultObj),
    );
    if (!isNull(defaultedConfig[0]) && !exclude(id, defaultedConfig[0])) {
      then(id, defaultedConfig[0]);
      mapSet(configMap, id, defaultedConfig);
    }
  });
  return configMap;
};
const getConfigStructures = (configOrStoreTableName) => {
  const config = getDefaultedConfig(configOrStoreTableName);
  const autoLoadIntervalSeconds = config[AUTO_LOAD_INTERVAL_SECONDS];
  if (config.mode == JSON$1) {
    const storeTableName = config[STORE_TABLE_NAME] ?? TINYBASE;
    return [
      1,
      autoLoadIntervalSeconds,
      [
        storeTableName,
        config[STORE_ID_COLUMN_NAME] ?? DEFAULT_ROW_ID_COLUMN_NAME,
        config[STORE_COLUMN_NAME] ?? STORE,
      ],
      setNew(storeTableName),
    ];
  }
  const {tables: {load = {}, save = {}} = {}, values = {}} = config;
  const valuesConfig = slice(
    objValues(objMerge(DEFAULT_TABULAR_VALUES_CONFIG, values)),
    0,
    objSize(DEFAULT_TABULAR_VALUES_CONFIG),
  );
  const valuesTable = valuesConfig[2];
  const managedTableNames = setNew(valuesTable);
  const excludedTableNames = setNew(valuesTable);
  const tablesLoadConfig = getDefaultedTabularConfigMap(
    load,
    {
      [TABLE_ID]: null,
      [ROW_ID_COLUMN_NAME]: DEFAULT_ROW_ID_COLUMN_NAME,
      [CONDITION]: TRUE,
    },
    TABLE_ID,
    (tableName) => collHas(excludedTableNames, tableName),
    (tableName) => setAdd(managedTableNames, tableName),
  );
  const tablesSaveConfig = getDefaultedTabularConfigMap(
    save,
    {
      [TABLE_NAME]: null,
      [ROW_ID_COLUMN_NAME]: DEFAULT_ROW_ID_COLUMN_NAME,
      [DELETE_EMPTY_COLUMNS]: 0,
      [DELETE_EMPTY_TABLE]: 0,
      [CONDITION]: null,
    },
    TABLE_NAME,
    (_, tableName) => collHas(excludedTableNames, tableName),
    (_, tableName) => setAdd(managedTableNames, tableName),
  );
  mapForEach(
    tablesSaveConfig,
    (_, tableSaveConfig) =>
      (tableSaveConfig[4] ??=
        mapGet(tablesLoadConfig, tableSaveConfig[0])?.[2] ?? TRUE),
  );
  return [
    0,
    autoLoadIntervalSeconds,
    [tablesLoadConfig, tablesSaveConfig, valuesConfig],
    managedTableNames,
  ];
};

const getCommandFunctions = (
  databaseExecuteCommand,
  managedTableNames,
  querySchema,
  onIgnoredError,
  columnType,
  upsert = defaultUpsert,
  encode,
  decode,
) => {
  const schemaMap = mapNew();
  const canSelect = (tableName, rowIdColumnName) =>
    collHas(mapGet(schemaMap, tableName), rowIdColumnName);
  const refreshSchema = async () => {
    collClear(schemaMap);
    arrayMap(
      await querySchema(databaseExecuteCommand, managedTableNames),
      ({tn, cn}) => setAdd(mapEnsure(schemaMap, tn, setNew), cn),
    );
  };
  const loadTable = async (tableName, rowIdColumnName, condition) =>
    canSelect(tableName, rowIdColumnName)
      ? objNew(
          arrayFilter(
            arrayMap(
              await databaseExecuteCommand(
                SELECT_STAR_FROM +
                  escapeId(tableName) +
                  getWhereCondition(tableName, condition),
              ),
              (row) => [
                row[rowIdColumnName],
                decode
                  ? objMap(objDel(row, rowIdColumnName), decode)
                  : objDel(row, rowIdColumnName),
              ],
            ),
            ([rowId, row]) => !isUndefined(rowId) && !objIsEmpty(row),
          ),
        )
      : {};
  const saveTable = async (
    tableName,
    rowIdColumnName,
    content,
    deleteEmptyColumns,
    deleteEmptyTable,
    partial = false,
    condition = TRUE,
  ) => {
    const settingColumnNameSet = setNew();
    objMap(content ?? {}, (contentRow) =>
      arrayMap(objIds(contentRow ?? {}), (cellOrValueId) =>
        setAdd(settingColumnNameSet, cellOrValueId),
      ),
    );
    const settingColumnNames = collValues(settingColumnNameSet);
    if (
      !partial &&
      deleteEmptyTable &&
      condition == TRUE &&
      arrayIsEmpty(settingColumnNames) &&
      collHas(schemaMap, tableName)
    ) {
      await databaseExecuteCommand('DROP ' + TABLE + escapeId(tableName));
      mapSet(schemaMap, tableName);
      return;
    }
    const currentColumnNames = mapGet(schemaMap, tableName);
    const unaccountedColumnNames = setNew(collValues(currentColumnNames));
    if (!arrayIsEmpty(settingColumnNames)) {
      if (!collHas(schemaMap, tableName)) {
        await databaseExecuteCommand(
          CREATE_TABLE +
            escapeId(tableName) +
            `(${escapeId(rowIdColumnName)}${columnType} PRIMARY KEY${arrayJoin(
              arrayMap(
                settingColumnNames,
                (settingColumnName) =>
                  COMMA + escapeId(settingColumnName) + columnType,
              ),
            )});`,
        );
        mapSet(
          schemaMap,
          tableName,
          setNew([rowIdColumnName, ...settingColumnNames]),
        );
      } else {
        await promiseAll(
          arrayMap(
            [rowIdColumnName, ...settingColumnNames],
            async (settingColumnName, index) => {
              if (!collDel(unaccountedColumnNames, settingColumnName)) {
                await databaseExecuteCommand(
                  ALTER_TABLE +
                    escapeId(tableName) +
                    'ADD' +
                    escapeId(settingColumnName) +
                    columnType,
                );
                if (index == 0) {
                  await databaseExecuteCommand(
                    'CREATE UNIQUE INDEX pk ON ' +
                      escapeId(tableName) +
                      `(${escapeId(rowIdColumnName)})`,
                  );
                }
                setAdd(currentColumnNames, settingColumnName);
              }
            },
          ),
        );
      }
    }
    await promiseAll([
      ...(!partial && deleteEmptyColumns
        ? arrayMap(
            collValues(unaccountedColumnNames),
            async (unaccountedColumnName) => {
              if (unaccountedColumnName != rowIdColumnName) {
                await databaseExecuteCommand(
                  ALTER_TABLE +
                    escapeId(tableName) +
                    'DROP' +
                    escapeId(unaccountedColumnName),
                );
                collDel(currentColumnNames, unaccountedColumnName);
              }
            },
          )
        : []),
    ]);
    if (partial) {
      if (isUndefined(content)) {
        await databaseExecuteCommand(
          DELETE_FROM +
            escapeId(tableName) +
            getWhereCondition(tableName, condition),
        );
      } else {
        await promiseAll(
          objToArray(content, async (row, rowId) => {
            if (isUndefined(row)) {
              await databaseExecuteCommand(
                DELETE_FROM +
                  escapeId(tableName) +
                  getWhereCondition(tableName, condition) +
                  `AND(${escapeId(rowIdColumnName)}=$1)`,
                [rowId],
              );
            } else if (!arrayIsEmpty(settingColumnNames)) {
              await upsert(
                databaseExecuteCommand,
                tableName,
                rowIdColumnName,
                objIds(row),
                {
                  [rowId]: encode
                    ? arrayMap(objValues(row), encode)
                    : objValues(row),
                },
                currentColumnNames,
              );
            }
          }),
        );
      }
    } else {
      if (!arrayIsEmpty(settingColumnNames)) {
        const changingColumnNames = arrayFilter(
          collValues(mapGet(schemaMap, tableName)),
          (changingColumnName) => changingColumnName != rowIdColumnName,
        );
        const rows = {};
        const deleteRowIds = [];
        objMap(content ?? {}, (row, rowId) => {
          rows[rowId] = arrayMap(changingColumnNames, (cellId) =>
            encode ? encode(row?.[cellId]) : row?.[cellId],
          );
          arrayPush(deleteRowIds, rowId);
        });
        await upsert(
          databaseExecuteCommand,
          tableName,
          rowIdColumnName,
          changingColumnNames,
          rows,
        );
        await databaseExecuteCommand(
          DELETE_FROM +
            escapeId(tableName) +
            getWhereCondition(tableName, condition) + // eslint-disable-next-line max-len
            `AND${escapeId(rowIdColumnName)}NOT IN(${getPlaceholders(deleteRowIds)})`,
          deleteRowIds,
        );
      } else if (collHas(schemaMap, tableName)) {
        await databaseExecuteCommand(
          DELETE_FROM +
            escapeId(tableName) +
            getWhereCondition(tableName, condition),
        );
      }
    }
  };
  const transaction = async (actions) => {
    let result;
    await databaseExecuteCommand('BEGIN');
    await tryCatch(async () => (result = await actions()), onIgnoredError);
    await databaseExecuteCommand('END');
    return result;
  };
  return [refreshSchema, loadTable, saveTable, transaction];
};
const defaultUpsert = async (
  executeCommand,
  tableName,
  rowIdColumnName,
  changingColumnNames,
  rows,
) => {
  const offset = [1];
  await executeCommand(
    INSERT +
      ' INTO' +
      escapeId(tableName) +
      '(' +
      escapeColumnNames(rowIdColumnName, ...changingColumnNames) +
      ')VALUES' +
      arrayJoin(
        objToArray(
          rows,
          (row) =>
            '($' + offset[0]++ + ',' + getPlaceholders(row, offset) + ')',
        ),
        COMMA,
      ) +
      'ON CONFLICT(' +
      escapeId(rowIdColumnName) +
      `)DO ${UPDATE} SET` +
      arrayJoin(
        arrayMap(
          changingColumnNames,
          (columnName) =>
            escapeId(columnName) + '=excluded.' + escapeId(columnName),
        ),
        COMMA,
      ),
    objToArray(rows, (row, id) => [
      id,
      ...arrayMap(row, (value) => value ?? null),
    ]).flat(),
  );
};

const createJsonPersister = (
  store,
  executeCommand,
  addPersisterListener,
  delPersisterListener,
  onIgnoredError,
  extraDestroy,
  persist,
  [storeTableName, storeIdColumnName, storeColumnName],
  managedTableNames,
  querySchema,
  thing,
  getThing,
  columnType,
  upsert,
) => {
  const [refreshSchema, loadTable, saveTable, transaction] =
    getCommandFunctions(
      executeCommand,
      managedTableNames,
      querySchema,
      onIgnoredError,
      columnType,
      upsert,
    );
  const getPersisted = () =>
    transaction(async () => {
      await refreshSchema();
      return jsonParseWithUndefined(
        (await loadTable(storeTableName, storeIdColumnName))[SINGLE_ROW_ID]?.[
          storeColumnName
        ] ?? 'null',
      );
    });
  const setPersisted = (getContent) =>
    transaction(async () => {
      await refreshSchema();
      await saveTable(
        storeTableName,
        storeIdColumnName,
        {
          [SINGLE_ROW_ID]: {
            [storeColumnName]: jsonStringWithUndefined(getContent() ?? null),
          },
        },
        true,
        true,
      );
    });
  const destroy = async () => {
    await persister.stopAutoPersisting();
    extraDestroy();
    return persister;
  };
  const persister = createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    persist,
    {[getThing]: () => thing, destroy},
    0,
    thing,
  );
  return persister;
};

const createTabularPersister = (
  store,
  executeCommand,
  addPersisterListener,
  delPersisterListener,
  onIgnoredError,
  extraDestroy,
  persist,
  [
    tablesLoadConfig,
    tablesSaveConfig,
    [valuesLoad, valuesSave, valuesTableName],
  ],
  managedTableNames,
  querySchema,
  thing,
  getThing,
  columnType,
  upsert,
  encode,
  decode,
) => {
  const [refreshSchema, loadTable, saveTable, transaction] =
    getCommandFunctions(
      executeCommand,
      managedTableNames,
      querySchema,
      onIgnoredError,
      columnType,
      upsert,
      encode,
      decode,
    );
  const saveTables = (tables, partial) =>
    promiseAll(
      mapMap(
        tablesSaveConfig,
        async (
          [
            tableName,
            rowIdColumnName,
            deleteEmptyColumns,
            deleteEmptyTable,
            condition,
          ],
          tableId,
        ) => {
          if (!partial || objHas(tables, tableId)) {
            await saveTable(
              tableName,
              rowIdColumnName,
              tables[tableId],
              deleteEmptyColumns,
              deleteEmptyTable,
              partial,
              condition,
            );
          }
        },
      ),
    );
  const saveValues = async (values, partial) =>
    valuesSave
      ? await saveTable(
          valuesTableName,
          DEFAULT_ROW_ID_COLUMN_NAME,
          {[SINGLE_ROW_ID]: values},
          true,
          true,
          partial,
        )
      : null;
  const loadTables = async () =>
    objNew(
      arrayFilter(
        await promiseAll(
          mapMap(
            tablesLoadConfig,
            async ([tableId, rowIdColumnName, condition], tableName) => [
              tableId,
              await loadTable(tableName, rowIdColumnName, condition),
            ],
          ),
        ),
        (pair) => !objIsEmpty(pair[1]),
      ),
    );
  const loadValues = async () =>
    valuesLoad
      ? (await loadTable(valuesTableName, DEFAULT_ROW_ID_COLUMN_NAME))[
          SINGLE_ROW_ID
        ]
      : {};
  const getPersisted = () =>
    transaction(async () => {
      await refreshSchema();
      const tables = await loadTables();
      const values = await loadValues();
      return !objIsEmpty(tables) || !isUndefined(values)
        ? [tables, values]
        : void 0;
    });
  const setPersisted = (getContent, changes) =>
    transaction(async () => {
      await refreshSchema();
      if (!isUndefined(changes)) {
        await saveTables(changes[0], true);
        await saveValues(changes[1], true);
      } else {
        const [tables, values] = getContent();
        await saveTables(tables);
        await saveValues(values);
      }
    });
  const destroy = async () => {
    await persister.stopAutoPersisting();
    extraDestroy();
    return persister;
  };
  const persister = createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    persist,
    {[getThing]: () => thing, destroy},
    0,
    thing,
  );
  return persister;
};

const TABLE_CREATED = 'c';
const DATA_CHANGED = 'd';
const EVENT_REGEX = /^([cd]:)(.+)/;
const createCustomPostgreSqlPersister = (
  store,
  configOrStoreTableName,
  rawExecuteCommand,
  addChangeListener,
  delChangeListener,
  onSqlCommand,
  onIgnoredError,
  destroy,
  persist,
  thing,
  getThing = 'getDb',
) => {
  const executeCommand = getWrappedCommand(rawExecuteCommand, onSqlCommand);
  const [isJson, , defaultedConfig, managedTableNamesSet] = getConfigStructures(
    configOrStoreTableName,
  );
  const configHash =
    EMPTY_STRING + getHash(jsonStringWithUndefined(defaultedConfig));
  const channel = TINYBASE + '_' + configHash;
  const createFunction = async (
    name,
    body,
    returnPrefix = '',
    declarations = '',
  ) => {
    const escapedFunctionName = escapeIds(TINYBASE, name, configHash);
    await executeCommand(
      CREATE +
        OR_REPLACE +
        FUNCTION +
        escapedFunctionName +
        `()RETURNS ${returnPrefix}trigger AS $$ ${declarations}BEGIN ${body}END;$$ LANGUAGE plpgsql;`,
    );
    return escapedFunctionName;
  };
  const createTrigger = async (
    prefix,
    escapedTriggerName,
    body,
    escapedFunctionName,
  ) => {
    await executeCommand(
      CREATE +
        prefix +
        'TRIGGER' +
        escapedTriggerName +
        body +
        'EXECUTE ' +
        FUNCTION +
        escapedFunctionName +
        `()`,
    );
    return escapedTriggerName;
  };
  const notify = (message) => `PERFORM pg_notify('${channel}',${message});`;
  const when = (tableName, newOrOldOrBoth) =>
    isJson
      ? TRUE
      : newOrOldOrBoth === 2
        ? when(tableName, 0) + ' OR ' + when(tableName, 1)
        : strReplace(
            mapGet(defaultedConfig[0], tableName)?.[2] ?? TRUE,
            TABLE_NAME_PLACEHOLDER,
            newOrOldOrBoth == 0 ? 'NEW' : 'OLD',
          );
  const addDataChangedTriggers = (tableName, dataChangedFunction) =>
    promiseAll(
      arrayMap([INSERT, DELETE$1, UPDATE], (action, newOrOldOrBoth) =>
        createTrigger(
          OR_REPLACE,
          escapeIds(TINYBASE, DATA_CHANGED, configHash, tableName, action),
          `AFTER ${action} ON${escapeId(tableName)}FOR EACH ROW WHEN(${when(
            tableName,
            newOrOldOrBoth,
          )})`,
          dataChangedFunction,
        ),
      ),
    );
  const addPersisterListener = async (listener) => {
    const tableCreatedFunctionName = await createFunction(
      TABLE_CREATED,
      // eslint-disable-next-line max-len
      `FOR row IN SELECT object_identity FROM pg_event_trigger_ddl_commands()${WHERE} command_tag='${CREATE_TABLE}' LOOP ${notify(`'c:'||SPLIT_PART(row.object_identity,'.',2)`)}END LOOP;`,
      'event_',
      'DECLARE row record;',
    );
    await createTrigger(
      'EVENT ',
      escapeIds(TINYBASE, TABLE_CREATED, configHash),
      `ON ddl_command_end WHEN TAG IN('${CREATE_TABLE}')`,
      tableCreatedFunctionName,
    );
    const dataChangedFunctionName = await createFunction(
      DATA_CHANGED,
      notify(`'d:'||TG_TABLE_NAME`) + `RETURN NULL;`,
    );
    await promiseAll(
      arrayMap(collValues(managedTableNamesSet), async (tableName) => {
        await executeCommand(
          CREATE_TABLE +
            ` IF NOT EXISTS${escapeId(tableName)}("_id"text PRIMARY KEY)`,
        );
        return await addDataChangedTriggers(tableName, dataChangedFunctionName);
      }),
    );
    const listenerHandle = await addChangeListener(
      channel,
      (prefixAndTableName) =>
        ifNotUndefined(
          strMatch(prefixAndTableName, EVENT_REGEX),
          async ([, eventType, tableName]) => {
            if (collHas(managedTableNamesSet, tableName)) {
              if (eventType == 'c:') {
                await addDataChangedTriggers(
                  tableName,
                  dataChangedFunctionName,
                );
              }
              listener();
            }
          },
        ),
    );
    return [
      listenerHandle,
      [tableCreatedFunctionName, dataChangedFunctionName],
    ];
  };
  const delPersisterListener = async ([listenerHandle, functionNames]) => {
    delChangeListener(listenerHandle);
    await executeCommand(
      `DROP FUNCTION IF EXISTS${arrayJoin(functionNames, ',')}CASCADE`,
    );
  };
  return (isJson ? createJsonPersister : createTabularPersister)(
    store,
    executeCommand,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    destroy,
    persist,
    defaultedConfig,
    collValues(managedTableNamesSet),
    async (executeCommand2, managedTableNames) =>
      await executeCommand2(
        SELECT + // eslint-disable-next-line max-len
          ` table_name tn,column_name cn FROM information_schema.columns ${WHERE} table_schema='public'AND table_name IN(${getPlaceholders(managedTableNames)})`,
        managedTableNames,
      ),
    thing,
    getThing,
    'text',
    void 0,
    (cellOrValue) => jsonString(cellOrValue),
    (field) => jsonParse(field),
  );
};

const createCustomSqlitePersister = (
  store,
  configOrStoreTableName,
  rawExecuteCommand,
  addChangeListener,
  delChangeListener,
  onSqlCommand,
  onIgnoredError,
  destroy,
  persist,
  thing,
  getThing = 'getDb',
  upsert,
) => {
  let dataVersion;
  let schemaVersion;
  let totalChanges;
  const executeCommand = getWrappedCommand(rawExecuteCommand, onSqlCommand);
  const [
    isJson,
    autoLoadIntervalSeconds,
    defaultedConfig,
    managedTableNamesSet,
  ] = getConfigStructures(configOrStoreTableName);
  const addPersisterListener = (listener) => {
    let interval;
    const startPolling = () =>
      (interval = startInterval(
        () =>
          tryCatch(async () => {
            const [{d, s, c}] = await executeCommand(
              SELECT + // eslint-disable-next-line max-len
                ` ${DATA_VERSION} d,${SCHEMA_VERSION} s,TOTAL_CHANGES() c FROM ${PRAGMA}${DATA_VERSION} JOIN ${PRAGMA}${SCHEMA_VERSION}`,
            );
            if (d != dataVersion || s != schemaVersion || c != totalChanges) {
              if (!isNullish(dataVersion)) {
                listener();
              }
              dataVersion = d;
              schemaVersion = s;
              totalChanges = c;
            }
          }),
        autoLoadIntervalSeconds,
      ));
    const stopPolling = () => {
      dataVersion = schemaVersion = totalChanges = null;
      stopInterval(interval);
    };
    const listeningHandle = addChangeListener((tableName) => {
      if (managedTableNamesSet.has(tableName)) {
        stopPolling();
        listener();
        startPolling();
      }
    });
    startPolling();
    return () => {
      stopPolling();
      delChangeListener(listeningHandle);
    };
  };
  const delPersisterListener = (stopPollingAndDelUpdateListener) =>
    stopPollingAndDelUpdateListener();
  return (isJson ? createJsonPersister : createTabularPersister)(
    store,
    executeCommand,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    destroy,
    persist,
    defaultedConfig,
    collValues(managedTableNamesSet),
    async (executeCommand2, managedTableNames) =>
      await executeCommand2(
        SELECT + // eslint-disable-next-line max-len
          ` t.name tn,c.name cn FROM ${PRAGMA_TABLE}list()t,${PRAGMA_TABLE}info(t.name)c ${WHERE} t.schema='main'AND t.type IN('table','view')AND t.name IN(${getPlaceholders(managedTableNames)})ORDER BY t.name,c.name`,
        managedTableNames,
      ),
    thing,
    getThing,
    EMPTY_STRING,
    upsert,
    (cellOrValue) =>
      isTrue(cellOrValue) ? 1 : isFalse(cellOrValue) ? 0 : cellOrValue,
    void 0,
  );
};

const ensureDocContent = (doc, docObjName) => {
  if (objIsEmpty(doc[docObjName])) {
    doc[docObjName] = {t: {}, v: {}};
  }
};
const getDocContent = (doc, docObjName) => [
  doc[docObjName].t,
  doc[docObjName].v,
];
const applyChangesToDoc = (doc, docObjName, getContent, changes) => {
  ensureDocContent(doc, docObjName);
  const [docTables, docValues] = getDocContent(doc, docObjName);
  const changesDidFail = () => {
    changesFailed = 1;
  };
  let changesFailed = 1;
  ifNotUndefined(changes, ([cellChanges, valueChanges]) => {
    changesFailed = 0;
    objMap(cellChanges, (table, tableId) =>
      changesFailed
        ? 0
        : isUndefined(table)
          ? objDel(docTables, tableId)
          : ifNotUndefined(
              docTables[tableId],
              (docTable) =>
                objMap(table, (row, rowId) =>
                  changesFailed
                    ? 0
                    : isUndefined(row)
                      ? objDel(docTable, rowId)
                      : ifNotUndefined(
                          objGet(docTable, rowId),
                          (docRow) =>
                            objMap(row, (cell, cellId) =>
                              isUndefined(cell)
                                ? objDel(docRow, cellId)
                                : (docRow[cellId] = cell),
                            ),
                          changesDidFail,
                        ),
                ),
              changesDidFail,
            ),
    );
    objMap(valueChanges, (value, valueId) =>
      changesFailed
        ? 0
        : isUndefined(value)
          ? objDel(docValues, valueId)
          : (docValues[valueId] = value),
    );
  });
  if (changesFailed) {
    const [tables, values] = getContent();
    docObjMatch(docTables, void 0, tables, (_, tableId, table) =>
      docObjMatch(docTables, tableId, table, (docTable, rowId, row) =>
        docObjMatch(docTable, rowId, row, (docRow, cellId, cell) => {
          if (objGet(docRow, cellId) !== cell) {
            docRow[cellId] = cell;
            return 1;
          }
        }),
      ),
    );
    docObjMatch(docValues, void 0, values, (_, valueId, value) => {
      if (objGet(docValues, valueId) !== value) {
        docValues[valueId] = value;
      }
    });
  }
};
const docObjMatch = (docObjOrParent, idInParent, obj, set) => {
  const docObj = isUndefined(idInParent)
    ? docObjOrParent
    : objEnsure(docObjOrParent, idInParent, () => ({}));
  let changed;
  objMap(obj, (value, id) => {
    if (set(docObj, id, value)) {
      changed = 1;
    }
  });
  objMap(docObj, (_, id) => {
    if (!objHas(obj, id)) {
      objDel(docObj, id);
      changed = 1;
    }
  });
  if (!isUndefined(idInParent) && objIsEmpty(docObj)) {
    objDel(docObjOrParent, idInParent);
  }
  return changed;
};
const createAutomergePersister = (
  store,
  docHandle,
  docObjName = TINYBASE,
  onIgnoredError,
) => {
  docHandle.change((doc) => objEnsure(doc, docObjName, objNew));
  const getPersisted = async () => {
    const doc = docHandle.doc();
    return objSize(doc?.[docObjName]) == 2
      ? getDocContent(doc, docObjName)
      : void 0;
  };
  const setPersisted = async (getContent, changes) =>
    docHandle.change((doc) =>
      applyChangesToDoc(doc, docObjName, getContent, changes),
    );
  const addPersisterListener = (listener) => {
    const observer = ({doc}) => listener(getDocContent(doc, docObjName));
    docHandle.on('change', observer);
    return observer;
  };
  const delPersisterListener = (observer) => {
    docHandle.removeListener('change', observer);
  };
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    1,
    // StoreOnly,
    {getDocHandle: () => docHandle},
  );
};

const STORAGE$1 = 'storage';
const createStoragePersister = (
  store,
  storageName,
  storage,
  onIgnoredError,
) => {
  const getPersisted = async () =>
    jsonParseWithUndefined(storage.getItem(storageName));
  const setPersisted = async (getContent) =>
    storage.setItem(storageName, jsonStringWithUndefined(getContent()));
  const addPersisterListener = (listener) => {
    const storageListener = (event) => {
      if (event.storageArea === storage && event.key === storageName) {
        tryCatch(
          () => listener(jsonParseWithUndefined(event.newValue)),
          listener,
        );
      }
    };
    WINDOW.addEventListener(STORAGE$1, storageListener);
    return storageListener;
  };
  const delPersisterListener = (storageListener) =>
    WINDOW.removeEventListener(STORAGE$1, storageListener);
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    3,
    // StoreOrMergeableStore,
    {getStorageName: () => storageName},
  );
};
const createLocalPersister = (store, storageName, onIgnoredError) =>
  createStoragePersister(store, storageName, localStorage, onIgnoredError);
const createSessionPersister = (store, storageName, onIgnoredError) =>
  createStoragePersister(store, storageName, sessionStorage, onIgnoredError);
const createOpfsPersister = (store, handle, onIgnoredError) => {
  const getPersisted = async () =>
    jsonParseWithUndefined(await (await handle.getFile()).text());
  const setPersisted = async (getContent) => {
    const writable = await handle.createWritable();
    await writable.write(jsonStringWithUndefined(getContent()));
    await writable.close();
  };
  const addPersisterListener = async (listener) => {
    const observer = new FileSystemObserver(() => listener());
    await observer.observe(handle);
    return observer;
  };
  const delPersisterListener = (observer) => observer?.disconnect();
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    3,
    // StoreOrMergeableStore,
    {getHandle: () => handle},
  );
};

const createCrSqliteWasmPersister = (
  store,
  db,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) => await db.execO(sql, params),
    (listener) => db.onUpdate((_, _2, tableName) => listener(tableName)),
    (removeListener) => removeListener(),
    onSqlCommand,
    onIgnoredError,
    noop,
    1,
    // StoreOnly,
    db,
  );

const stampNewObjectWithHash = () => stampNewWithHash({}, EMPTY_STRING, 0);
const createDurableObjectStoragePersister = (
  store,
  storage,
  storagePrefix = EMPTY_STRING,
  onIgnoredError,
) => {
  const constructKey = (type, ...ids) =>
    storagePrefix + type + slice(jsonStringWithUndefined(ids), 1, -1);
  const deconstructKey = (key) => {
    if (strStartsWith(key, storagePrefix)) {
      const type = slice(key, size(storagePrefix), size(storagePrefix) + 1);
      return type == T || type == V
        ? [type, ...JSON.parse('[' + slice(key, size(storagePrefix) + 1) + ']')]
        : void 0;
    }
  };
  const getPersisted = async () => {
    const tables = stampNewObjectWithHash();
    const values = stampNewObjectWithHash();
    (await storage.list({prefix: storagePrefix})).forEach(
      async ([zeroOrCellOrValue, time, hash], key) =>
        ifNotUndefined(deconstructKey(key), ([type, ...ids]) =>
          type == T
            ? ifNotUndefined(
                ids[0],
                (tableId) => {
                  const table = objEnsure(
                    tables[0],
                    tableId,
                    stampNewObjectWithHash,
                  );
                  ifNotUndefined(
                    ids[1],
                    (rowId) => {
                      const row = objEnsure(
                        table[0],
                        rowId,
                        stampNewObjectWithHash,
                      );
                      ifNotUndefined(
                        ids[2],
                        (cellId) =>
                          (row[0][cellId] = [zeroOrCellOrValue, time, hash]),
                        () => stampUpdate(row, time, hash),
                      );
                    },
                    () => stampUpdate(table, time, hash),
                  );
                },
                () => stampUpdate(tables, time, hash),
              )
            : type == V
              ? ifNotUndefined(
                  ids[0],
                  (valueId) =>
                    (values[0][valueId] = [zeroOrCellOrValue, time, hash]),
                  () => stampUpdate(values, time, hash),
                )
              : 0,
        ),
    );
    return objIsEmpty(tables[0]) && objIsEmpty(values[0])
      ? void 0
      : [tables, values];
  };
  const setPersisted = async (
    getContent,
    [
      [tablesObj, tablesHlc, tablesHash],
      [valuesObj, valuesHlc, valuesHash],
    ] = getContent(),
  ) => {
    const keysToSet = mapNew();
    mapSet(keysToSet, constructKey(T), [0, tablesHlc, tablesHash]);
    objForEach(tablesObj, ([tableObj, tableHlc, tableHash], tableId) => {
      mapSet(keysToSet, constructKey(T, tableId), [0, tableHlc, tableHash]);
      objForEach(tableObj, ([rowObj, rowHlc, rowHash], rowId) => {
        mapSet(keysToSet, constructKey(T, tableId, rowId), [
          0,
          rowHlc,
          rowHash,
        ]);
        objForEach(rowObj, (cellStamp, cellId) =>
          mapSet(keysToSet, constructKey(T, tableId, rowId, cellId), cellStamp),
        );
      });
    });
    mapSet(keysToSet, constructKey(V), [0, valuesHlc, valuesHash]);
    objForEach(valuesObj, (valueStamp, valueId) =>
      mapSet(keysToSet, constructKey(V, valueId), valueStamp),
    );
    await storage.put(mapToObj(keysToSet));
  };
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    noop,
    noop,
    onIgnoredError,
    2,
    // MergeableStoreOnly,
    {getStorage: () => storage},
  );
};

const createElectricSqlPersister = (
  store,
  electricClient,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, args = []) => await electricClient.db.raw({sql, args}),
    (listener) =>
      electricClient.notifier.subscribeToDataChanges((notification) =>
        arrayForEach(
          electricClient.notifier.alias(notification),
          ({tablename}) => listener(tablename),
        ),
      ),
    (unsubscribeFunction) => unsubscribeFunction(),
    onSqlCommand,
    onIgnoredError,
    noop,
    1,
    // StoreOnly,
    electricClient,
    'getElectricClient',
  );

const createExpoSqlitePersister = (
  store,
  db,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) => await db.getAllAsync(sql, params),
    (listener) =>
      addDatabaseChangeListener(({tableName}) => listener(tableName)),
    (subscription) => subscription.remove(),
    onSqlCommand,
    onIgnoredError,
    noop,
    3,
    // StoreOrMergeableStore,
    db,
  );

const createFilePersister = (store, filePath, onIgnoredError) => {
  const getPersisted = async () =>
    jsonParseWithUndefined(await readFile(filePath, UTF8));
  const setPersisted = async (getContent) =>
    await writeFile(filePath, jsonStringWithUndefined(getContent()), UTF8);
  const addPersisterListener = (listener) => {
    if (!existsSync(filePath)) {
      writeFileSync(filePath, EMPTY_STRING, UTF8);
    }
    return watch(filePath, () => listener());
  };
  const delPersisterListener = (watcher) => watcher?.close();
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    3,
    // StoreOrMergeableStore,
    {getFilePath: () => filePath},
  );
};

const OBJECT_STORE_NAMES = [T, V];
const KEY_PATH = {keyPath: 'k'};
const objectStoreMatch = async (objectStore, obj) => {
  const actions = objToArray(obj, (v, k) =>
    execObjectStore(objectStore, 'put', {k, v}),
  );
  arrayMap(await execObjectStore(objectStore, 'getAllKeys'), (id) =>
    objHas(obj, id)
      ? 0
      : arrayPush(actions, execObjectStore(objectStore, 'delete', id)),
  );
  await promiseAll(actions);
};
const execObjectStore = async (objectStore, func, arg) =>
  promiseNew((resolve, reject) => {
    const request = objectStore[func](arg);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(`objectStore.${func} error`);
  });
const createIndexedDbPersister = (
  store,
  dbName,
  autoLoadIntervalSeconds = 1,
  onIgnoredError,
) => {
  const forObjectStores = async (forObjectStore, params = [], create = 0) =>
    promiseNew((resolve, reject) => {
      const request = (WINDOW ? WINDOW.indexedDB : indexedDB).open(
        dbName,
        create ? 2 : void 0,
      );
      request.onupgradeneeded = () =>
        create &&
        arrayMap(OBJECT_STORE_NAMES, (objectStoreName) =>
          tryCatch(() =>
            request.result.createObjectStore(objectStoreName, KEY_PATH),
          ),
        );
      request.onsuccess = () =>
        tryCatch(
          async () => {
            const transaction = request.result.transaction(
              OBJECT_STORE_NAMES,
              'readwrite',
            );
            const result = await promiseAll(
              arrayMap(OBJECT_STORE_NAMES, (objectStoreName, index) =>
                forObjectStore(
                  transaction.objectStore(objectStoreName),
                  params[index],
                ),
              ),
            );
            request.result.close();
            resolve(result);
          },
          (error) => {
            request.result.close();
            reject(error);
          },
        );
      request.onerror = () => reject('indexedDB.open error');
    });
  const getPersisted = async () =>
    await forObjectStores(async (objectStore) =>
      objNew(
        arrayMap(await execObjectStore(objectStore, 'getAll'), ({k, v}) => [
          k,
          v,
        ]),
      ),
    );
  const setPersisted = (getContent) =>
    forObjectStores(
      (objectStore, content) => objectStoreMatch(objectStore, content),
      getContent(),
      1,
    );
  const addPersisterListener = (listener) =>
    startInterval(listener, autoLoadIntervalSeconds);
  const delPersisterListener = (interval) => stopInterval(interval);
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    1,
    // StoreOnly,
    {getDbName: () => dbName},
  );
};

const createLibSqlPersister = (
  store,
  client,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, args = []) => (await client.execute({sql, args})).rows,
    () => noop,
    (unsubscribeFunction) => unsubscribeFunction(),
    onSqlCommand,
    onIgnoredError,
    noop,
    1,
    // StoreOnly,
    client,
    'getClient',
  );

const SET_CHANGES = 's';
const STORE_PATH = '/store';
const PUT = 'PUT';
const construct = (prefix, type, payload) =>
  prefix +
  type +
  (isString(payload) ? payload : jsonStringWithUndefined(payload));
const deconstruct = (prefix, message, stringified) => {
  const prefixSize = size(prefix);
  return strStartsWith(message, prefix)
    ? [
        message[prefixSize],
        (stringified ? jsonParseWithUndefined : String)(
          slice(message, prefixSize + 1),
        ),
      ]
    : void 0;
};

const createPartyKitPersister = (
  store,
  connection,
  configOrStoreProtocol,
  onIgnoredError,
) => {
  const {host, room} = connection.partySocketOptions;
  const {
    storeProtocol = 'https',
    storePath = STORE_PATH,
    messagePrefix = EMPTY_STRING,
  } = {
    ...(isString(configOrStoreProtocol)
      ? {storeProtocol: configOrStoreProtocol}
      : configOrStoreProtocol),
  };
  const storeUrl =
    storeProtocol +
    '://' +
    host +
    '/parties/' +
    connection.name +
    '/' +
    room +
    storePath;
  const getOrSetStore = async (content) =>
    await (
      await fetch(storeUrl, {
        ...(content ? {method: PUT, body: jsonStringWithMap(content)} : {}),
        mode: 'cors',
        cache: 'no-store',
      })
    ).json();
  const getPersisted = getOrSetStore;
  const setPersisted = async (getContent, changes) => {
    if (changes) {
      connection.send(construct(messagePrefix, SET_CHANGES, changes));
    } else {
      await getOrSetStore(getContent());
    }
  };
  const addPersisterListener = (listener) => {
    const messageListener = (event) =>
      ifNotUndefined(
        deconstruct(messagePrefix, event.data, 1),
        ([type, payload]) => {
          if (type == SET_CHANGES) {
            listener(void 0, payload);
          }
        },
      );
    connection.addEventListener(MESSAGE, messageListener);
    return messageListener;
  };
  const delPersisterListener = (messageListener) => {
    connection.removeEventListener(MESSAGE, messageListener);
  };
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    1,
    // StoreOnly,
    {getConnection: () => connection},
  );
};

const HAS_STORE = 'hasStore';
const RESPONSE_HEADERS = objNew(
  arrayMap(['Origin', 'Methods', 'Headers'], (suffix) => [
    'Access-Control-Allow-' + suffix,
    '*',
  ]),
);
const hasStoreInStorage = async (storage, storagePrefix = EMPTY_STRING) =>
  !!(await storage.get(storagePrefix + HAS_STORE));
const loadStoreFromStorage = async (storage, storagePrefix = EMPTY_STRING) => {
  const tables = {};
  const values = {};
  mapForEach(await storage.list(), (key, cellOrValue) =>
    ifNotUndefined(deconstruct(storagePrefix, key), ([type, ids]) => {
      if (type == T) {
        const [tableId, rowId, cellId] = jsonParse('[' + ids + ']');
        objEnsure(objEnsure(tables, tableId, objNew), rowId, objNew)[cellId] =
          cellOrValue;
      } else if (type == V) {
        values[ids] = cellOrValue;
      }
    }),
  );
  return [tables, values];
};
const broadcastChanges = async (server, changes, without) =>
  server.party.broadcast(
    construct(
      server.config.messagePrefix ?? EMPTY_STRING,
      SET_CHANGES,
      changes,
    ),
    without,
  );
const saveStore = async (that, changes, initialSave, requestOrConnection) => {
  const storage = that.party.storage;
  const storagePrefix = that.config.storagePrefix ?? EMPTY_STRING;
  const keysToSet = {
    [storagePrefix + HAS_STORE]: 1,
  };
  const keysToDel = [];
  const keyPrefixesToDel = [];
  await promiseAll(
    objToArray(changes[0], async (table, tableId) =>
      isUndefined(table)
        ? !initialSave &&
          (await that.canDelTable(tableId, requestOrConnection)) &&
          arrayUnshift(
            keyPrefixesToDel,
            constructStorageKey(storagePrefix, T, tableId),
          )
        : (await that.canSetTable(tableId, initialSave, requestOrConnection)) &&
          (await promiseAll(
            objToArray(table, async (row, rowId) =>
              isUndefined(row)
                ? !initialSave &&
                  (await that.canDelRow(tableId, rowId, requestOrConnection)) &&
                  arrayPush(
                    keyPrefixesToDel,
                    constructStorageKey(storagePrefix, T, tableId, rowId),
                  )
                : (await that.canSetRow(
                    tableId,
                    rowId,
                    initialSave,
                    requestOrConnection,
                  )) &&
                  (await promiseAll(
                    objToArray(row, async (cell, cellId) => {
                      const ids = [tableId, rowId, cellId];
                      const key = constructStorageKey(storagePrefix, T, ...ids);
                      if (isUndefined(cell)) {
                        if (
                          !initialSave &&
                          (await that.canDelCell(...ids, requestOrConnection))
                        ) {
                          arrayPush(keysToDel, key);
                        }
                      } else if (
                        await that.canSetCell(
                          ...ids,
                          cell,
                          initialSave,
                          requestOrConnection,
                          await storage.get(key),
                        )
                      ) {
                        keysToSet[key] = cell;
                      }
                    }),
                  )),
            ),
          )),
    ),
  );
  await promiseAll(
    objToArray(changes[1], async (value, valueId) => {
      const key = storagePrefix + V + valueId;
      if (isUndefined(value)) {
        if (
          !initialSave &&
          (await that.canDelValue(valueId, requestOrConnection))
        ) {
          arrayPush(keysToDel, key);
        }
      } else if (
        await that.canSetValue(
          valueId,
          value,
          initialSave,
          requestOrConnection,
          await storage.get(key),
        )
      ) {
        keysToSet[key] = value;
      }
    }),
  );
  if (!arrayIsEmpty(keyPrefixesToDel)) {
    mapForEach(await storage.list(), (key) =>
      arrayEvery(
        keyPrefixesToDel,
        (keyPrefixToDelete) =>
          !strStartsWith(key, keyPrefixToDelete) ||
          (arrayPush(keysToDel, key) && 0),
      ),
    );
  }
  await storage.delete(keysToDel);
  await storage.put(keysToSet);
};
const constructStorageKey = (storagePrefix, type, ...ids) =>
  construct(storagePrefix, type, slice(jsonStringWithMap(ids), 1, -1));
const createResponse$1 = async (that, status, body = null) =>
  new Response(body, {
    status,
    headers: that.config.responseHeaders,
  });
class TinyBasePartyKitServer {
  constructor(party) {
    this.party = party;
    this.config.storePath ??= STORE_PATH;
    this.config.messagePrefix ??= EMPTY_STRING;
    this.config.storagePrefix ??= EMPTY_STRING;
    this.config.responseHeaders ??= RESPONSE_HEADERS;
  }
  party;
  config = {};
  async onRequest(request) {
    const {
      party: {storage},
      config: {storePath = STORE_PATH, storagePrefix},
    } = this;
    if (new URL(request.url).pathname.endsWith(storePath)) {
      const hasExistingStore = await hasStoreInStorage(storage, storagePrefix);
      const text = await request.text();
      if (request.method == PUT) {
        if (hasExistingStore) {
          return createResponse$1(this, 205);
        }
        await saveStore(this, jsonParse(text), true, request);
        return createResponse$1(this, 201);
      }
      return createResponse$1(
        this,
        200,
        hasExistingStore
          ? jsonStringWithMap(
              await loadStoreFromStorage(storage, storagePrefix),
            )
          : EMPTY_STRING,
      );
    }
    return createResponse$1(this, 404);
  }
  async onMessage(message, connection) {
    const {
      config: {messagePrefix = EMPTY_STRING, storagePrefix},
    } = this;
    await ifNotUndefined(
      deconstruct(messagePrefix, message, 1),
      async ([type, payload]) => {
        if (
          type == SET_CHANGES &&
          (await hasStoreInStorage(this.party.storage, storagePrefix))
        ) {
          await saveStore(this, payload, false, connection);
          broadcastChanges(this, payload, [connection.id]);
        }
      },
    );
  }
  async canSetTable(_tableId, _initialSave, _requestOrConnection) {
    return true;
  }
  async canDelTable(_tableId, _connection) {
    return true;
  }
  async canSetRow(_tableId, _rowId, _initialSave, _requestOrConnection) {
    return true;
  }
  async canDelRow(_tableId, _rowId, _connection) {
    return true;
  }
  async canSetCell(
    _tableId,
    _rowId,
    _cellId,
    _cell,
    _initialSave,
    _requestOrConnection,
    _oldCell,
  ) {
    return true;
  }
  async canDelCell(_tableId, _rowId, _cellId, _connection) {
    return true;
  }
  async canSetValue(
    _valueId,
    _value,
    _initialSave,
    _requestOrConnection,
    _oldValue,
  ) {
    return true;
  }
  async canDelValue(_valueId, _connection) {
    return true;
  }
}

const createPglitePersister = async (
  store,
  pglite,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) => {
  return createCustomPostgreSqlPersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) => (await pglite.query(sql, params)).rows,
    (channel, listener) => pglite.listen(channel, listener),
    (unlisten) => tryCatch(unlisten, onIgnoredError),
    onSqlCommand,
    onIgnoredError,
    noop,
    3,
    // StoreOrMergeableStore,
    pglite,
    'getPglite',
  );
};

const createPostgresPersister = async (
  store,
  sql,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) => {
  const commandSql = await sql.reserve?.();
  return createCustomPostgreSqlPersister(
    store,
    configOrStoreTableName,
    commandSql?.unsafe,
    async (channel, listener) => sql.listen(channel, listener),
    (notifyListener) => tryCatch(notifyListener.unlisten, onIgnoredError),
    onSqlCommand,
    onIgnoredError,
    () => commandSql?.release?.(),
    3,
    // StoreOrMergeableStore,
    sql,
    'getSql',
  );
};

const createPowerSyncPersister = (
  store,
  powerSync,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) => {
  let tableListener;
  return createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) =>
      powerSync
        .execute(sql, params)
        .then((result) => result.rows?._array ?? []),
    (listener) => {
      const abortController = new AbortController();
      const onChange = powerSync.onChange({
        rawTableNames: true,
        signal: abortController.signal,
      });
      (async () => {
        for await (const update of onChange) {
          if (tableListener) {
            arrayMap(update.changedTables, tableListener);
          }
        }
      })();
      tableListener = listener;
      return abortController;
    },
    (abortController) => {
      tableListener = void 0;
      abortController.abort();
    },
    onSqlCommand,
    onIgnoredError,
    noop,
    1,
    // StoreOnly,
    powerSync,
    'getPowerSync',
    viewUpsert,
  );
};
const viewUpsert = async (
  executeCommand,
  tableName,
  rowIdColumnName,
  changingColumnNames,
  rows,
  currentColumnNames,
) => {
  const offset = [1];
  const changingColumnNamesSet = setNew(changingColumnNames);
  const unchangingColumnNames = currentColumnNames
    ? arrayFilter(
        [...currentColumnNames],
        (currentColumnName) =>
          currentColumnName != rowIdColumnName &&
          !collHas(changingColumnNamesSet, currentColumnName),
      )
    : [];
  if (!arrayIsEmpty(unchangingColumnNames)) {
    const ids = objIds(rows);
    const unchangingData = objNew(
      arrayMap(
        await executeCommand(
          SELECT +
            escapeColumnNames(rowIdColumnName, ...unchangingColumnNames) +
            FROM +
            escapeId(tableName) +
            WHERE +
            escapeId(rowIdColumnName) +
            'IN(' +
            getPlaceholders(ids) +
            ')',
          ids,
        ),
        (unchangingRow) => [unchangingRow[rowIdColumnName], unchangingRow],
      ),
    );
    arrayForEach(ids, (id) =>
      arrayPush(
        rows[id],
        ...arrayMap(
          unchangingColumnNames,
          (unchangingColumnName) =>
            unchangingData?.[id]?.[unchangingColumnName] ?? null,
        ),
      ),
    );
  }
  await executeCommand(
    INSERT +
      ' ' +
      OR_REPLACE +
      'INTO' +
      escapeId(tableName) +
      '(' +
      escapeColumnNames(
        rowIdColumnName,
        ...changingColumnNames,
        ...unchangingColumnNames,
      ) +
      ')VALUES' +
      arrayJoin(
        objToArray(
          rows,
          (row) =>
            '($' + offset[0]++ + ',' + getPlaceholders(row, offset) + ')',
        ),
        COMMA,
      ),
    objToArray(rows, (row, id) => [
      id,
      ...arrayMap(row, (value) => value ?? null),
    ]).flat(),
  );
};

const STORAGE = 'storage';
const createReactNativeMmkvPersister = (
  store,
  storage,
  storageName = STORAGE,
  onIgnoredError,
) => {
  const getPersisted = async () => {
    const data = storage.getString(storageName);
    const value = isUndefined(data) ? void 0 : JSON.parse(data);
    return Promise.resolve(value);
  };
  const setPersisted = async (getContent) => {
    const content = getContent();
    if (!isUndefined(content)) {
      storage.set(storageName, JSON.stringify(content));
    }
  };
  const addPersisterListener = (listener) =>
    storage.addOnValueChangedListener((key) => {
      if (key === storageName) {
        const value = storage.getString(storageName);
        if (value) {
          listener(JSON.parse(value));
        }
      }
    });
  const delPersisterListener = (storageListener) => {
    storageListener.remove();
  };
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    3,
    // StoreOrMergeableStore
    {getStorageName: () => storageName},
  );
};

const createReactNativeSqlitePersister = (
  store,
  db,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) =>
      (await db.executeSql(sql, params))[0].rows.raw(),
    noop,
    noop,
    onSqlCommand,
    onIgnoredError,
    noop,
    3,
    // StoreOrMergeableStore,
    db,
  );

const getETag = (response) => response.headers.get('ETag') ?? '';
const getIfNoneMatchHeaders = (lastEtag) =>
  lastEtag == '' ? void 0 : {'If-None-Match': lastEtag};
const createRemotePersister = (
  store,
  loadUrl,
  saveUrl,
  autoLoadIntervalSeconds = 5,
  onIgnoredError,
) => {
  let lastEtag = '';
  const getPersisted = async () => {
    const response = await fetch(loadUrl, {
      headers: getIfNoneMatchHeaders(lastEtag),
    });
    lastEtag = getETag(response);
    return jsonParse(await response.text());
  };
  const setPersisted = async (getContent) =>
    await fetch(saveUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: jsonStringWithMap(getContent()),
    });
  const addPersisterListener = (listener) =>
    startInterval(async () => {
      const response = await fetch(loadUrl, {
        method: 'HEAD',
        headers: getIfNoneMatchHeaders(lastEtag),
      });
      const currentEtag = getETag(response);
      if (currentEtag != lastEtag) {
        lastEtag = currentEtag;
        listener();
      }
    }, autoLoadIntervalSeconds);
  const delPersisterListener = (interval) => stopInterval(interval);
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    1,
    // StoreOnly,
    {getUrls: () => [loadUrl, saveUrl]},
  );
};

const createSqliteBunPersister = (
  store,
  db,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) => db.query(sql).all(...params),
    () => noop,
    (unsubscribeFunction) => unsubscribeFunction(),
    onSqlCommand,
    onIgnoredError,
    noop,
    3,
    // StoreOrMergeableStore,
    db,
  );

const createSqliteWasmPersister = (
  store,
  sqlite3,
  db,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) =>
      db
        .exec(sql, {bind: params, rowMode: 'object', returnValue: 'resultRows'})
        .map((row) => ({...row})),
    (listener) =>
      sqlite3.capi.sqlite3_update_hook(
        db,
        (_, _2, _3, tableName) => listener(tableName),
        0,
      ),
    () => sqlite3.capi.sqlite3_update_hook(db, noop, 0),
    onSqlCommand,
    onIgnoredError,
    noop,
    3,
    // StoreOrMergeableStore,
    db,
  );

const CHANGE = 'change';
const createSqlite3Persister = (
  store,
  db,
  configOrStoreTableName,
  onSqlCommand,
  onIgnoredError,
) =>
  createCustomSqlitePersister(
    store,
    configOrStoreTableName,
    async (sql, params = []) =>
      await promiseNew((resolve, reject) =>
        db.all(sql, params, (error, rows) =>
          error ? reject(error) : resolve(rows),
        ),
      ),
    (listener) => {
      const observer = (_, _2, tableName) => listener(tableName);
      db.on(CHANGE, observer);
      return observer;
    },
    (observer) => db.off(CHANGE, observer),
    onSqlCommand,
    onIgnoredError,
    noop,
    3,
    // StoreOrMergeableStore,
    db,
  );

const DELETE = 'delete';
const getYContent = (yContent) => [yContent.get(T), yContent.get(V)];
const getChangesFromYDoc = (yContent, events) => {
  if (size(events) == 1 && arrayIsEmpty(events[0].path)) {
    return [yContent.get(T).toJSON(), yContent.get(V).toJSON(), 1];
  }
  const [yTables, yValues] = getYContent(yContent);
  const tables = {};
  const values = {};
  arrayForEach(events, ({path, changes: {keys}}) =>
    arrayShift(path) == T
      ? ifNotUndefined(
          arrayShift(path),
          (yTableId) => {
            const table = objEnsure(tables, yTableId, objNew);
            const yTable = yTables.get(yTableId);
            ifNotUndefined(
              arrayShift(path),
              (yRowId) => {
                const row = objEnsure(table, yRowId, objNew);
                const yRow = yTable.get(yRowId);
                mapForEach(
                  keys,
                  (cellId, {action}) =>
                    (row[cellId] =
                      action == DELETE ? void 0 : yRow.get(cellId)),
                );
              },
              () =>
                mapForEach(
                  keys,
                  (rowId, {action}) =>
                    (table[rowId] =
                      action == DELETE ? void 0 : yTable.get(rowId)?.toJSON()),
                ),
            );
          },
          () =>
            mapForEach(
              keys,
              (tableId, {action}) =>
                (tables[tableId] =
                  action == DELETE ? void 0 : yTables.get(tableId)?.toJSON()),
            ),
        )
      : mapForEach(
          keys,
          (valueId, {action}) =>
            (values[valueId] =
              action == DELETE ? void 0 : yValues.get(valueId)),
        ),
  );
  return [tables, values, 1];
};
const applyChangesToYDoc = (yContent, getContent, changes) => {
  if (!yContent.size) {
    yContent.set(T, new Map$1());
    yContent.set(V, new Map$1());
  }
  const [yTables, yValues] = getYContent(yContent);
  const changesDidFail = () => {
    changesFailed = 1;
  };
  let changesFailed = 1;
  ifNotUndefined(changes, ([cellChanges, valueChanges]) => {
    changesFailed = 0;
    objMap(cellChanges, (table, tableId) =>
      changesFailed
        ? 0
        : isUndefined(table)
          ? yTables.delete(tableId)
          : ifNotUndefined(
              yTables.get(tableId),
              (yTable) =>
                objMap(table, (row, rowId) =>
                  changesFailed
                    ? 0
                    : isUndefined(row)
                      ? yTable.delete(rowId)
                      : ifNotUndefined(
                          yTable.get(rowId),
                          (yRow) =>
                            objMap(row, (cell, cellId) =>
                              isUndefined(cell)
                                ? yRow.delete(cellId)
                                : yRow.set(cellId, cell),
                            ),
                          changesDidFail,
                        ),
                ),
              changesDidFail,
            ),
    );
    objMap(valueChanges, (value, valueId) =>
      changesFailed
        ? 0
        : isUndefined(value)
          ? yValues.delete(valueId)
          : yValues.set(valueId, value),
    );
  });
  if (changesFailed) {
    const [tables, values] = getContent();
    yMapMatch(yTables, void 0, tables, (_, tableId, table) =>
      yMapMatch(yTables, tableId, table, (yTable, rowId, row) =>
        yMapMatch(yTable, rowId, row, (yRow, cellId, cell) => {
          if (yRow.get(cellId) !== cell) {
            yRow.set(cellId, cell);
            return 1;
          }
        }),
      ),
    );
    yMapMatch(yValues, void 0, values, (_, valueId, value) => {
      if (yValues.get(valueId) !== value) {
        yValues.set(valueId, value);
      }
    });
  }
};
const yMapMatch = (yMapOrParent, idInParent, obj, set) => {
  const yMap = isUndefined(idInParent)
    ? yMapOrParent
    : (yMapOrParent.get(idInParent) ??
      yMapOrParent.set(idInParent, new Map$1()));
  let changed;
  objMap(obj, (value, id) => {
    if (set(yMap, id, value)) {
      changed = 1;
    }
  });
  yMap.forEach((_, id) => {
    if (!objHas(obj, id)) {
      yMap.delete(id);
      changed = 1;
    }
  });
  if (!isUndefined(idInParent) && !yMap.size) {
    yMapOrParent.delete(idInParent);
  }
  return changed;
};
const createYjsPersister = (
  store,
  yDoc,
  yMapName = TINYBASE,
  onIgnoredError,
) => {
  const yContent = yDoc.getMap(yMapName);
  const getPersisted = async () =>
    yContent.size
      ? [yContent.get(T).toJSON(), yContent.get(V).toJSON()]
      : void 0;
  const setPersisted = async (getContent, changes) =>
    yDoc.transact(() => applyChangesToYDoc(yContent, getContent, changes));
  const addPersisterListener = (listener) => {
    const observer = (events) =>
      listener(void 0, getChangesFromYDoc(yContent, events));
    yContent.observeDeep(observer);
    return observer;
  };
  const delPersisterListener = (observer) => {
    yContent.unobserveDeep(observer);
  };
  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    1,
    // StoreOnly,
    {getYDoc: () => yDoc},
  );
};

const PARAMS_TABLE = '_';
const PARAM_LISTENER_PREFIX = 'p';
const createQueries = getCreateFunction((store) => {
  const createStore = store._[0];
  const preStore = createStore();
  const paramStore = createStore();
  const resultStore = createStore();
  const resultStores = mapNew();
  const redefiningQueryIds = setNew();
  const routedResultListeners = mapNew();
  const routedResultListenerIds = mapNew();
  const resultListenerStats = {
    table: 0,
    tableCellIds: 0,
    rowCount: 0,
    rowIds: 0,
    sortedRowIds: 0,
    row: 0,
    cellIds: 0,
    cell: 0,
  };
  const preStoreListenerIds = mapNew();
  const sourceStoreListenerIds = mapNew();
  const {
    _: [, addListener, callListeners],
    delListener: delListenerImpl,
  } = resultStore;
  const [
    getStore,
    getQueryIds,
    forEachQuery,
    hasQuery,
    getTableId,
    getQueryArgs,
    setQueryArgs,
    setDefinition,
    ,
    delDefinition,
    addQueryIdsListenerImpl,
    destroyImpl,
  ] = getDefinableFunctions(
    store,
    () => [],
    getUndefined,
    addListener,
    callListeners,
  );
  const getResultStore = (queryId) =>
    mapEnsure(resultStores, queryId, createStore);
  const addPreStoreListener = (preStore2, queryId, ...listenerIds) =>
    arrayForEach(listenerIds, (listenerId) =>
      setAdd(
        mapEnsure(
          mapEnsure(preStoreListenerIds, queryId, mapNew),
          preStore2,
          setNew,
        ),
        listenerId,
      ),
    );
  const resetPreStores = (queryId) => {
    ifNotUndefined(
      mapGet(preStoreListenerIds, queryId),
      (queryPreStoreListenerIds) => {
        mapForEach(queryPreStoreListenerIds, (preStore2, listenerIds) =>
          collForEach(listenerIds, (listenerId) =>
            preStore2.delListener(listenerId),
          ),
        );
        collClear(queryPreStoreListenerIds);
      },
    );
    arrayForEach([getResultStore(queryId), preStore], (store2) =>
      store2.delTable(queryId),
    );
  };
  const addSourceStoreListeners = (
    sourceStore,
    queryId,
    andCall,
    ...listenerIds
  ) => {
    const listenerIdSet = mapEnsure(
      mapEnsure(sourceStoreListenerIds, queryId, mapNew),
      sourceStore,
      setNew,
    );
    arrayForEach(listenerIds, (listenerId) => {
      setAdd(listenerIdSet, listenerId);
      if (andCall) {
        sourceStore.callListener(listenerId);
      }
    });
    return listenerIds;
  };
  const delSourceStoreListeners = (queryId, sourceStore, listenerId) =>
    ifNotUndefined(
      mapGet(mapGet(sourceStoreListenerIds, queryId), sourceStore),
      (allListenerIds) => {
        sourceStore.delListener(listenerId);
        collDel(allListenerIds, listenerId);
        if (collIsEmpty(allListenerIds)) {
          mapSet(mapGet(sourceStoreListenerIds, queryId), sourceStore);
        }
      },
    );
  const resetSourceStores = (queryId) =>
    ifNotUndefined(mapGet(sourceStoreListenerIds, queryId), (queryStoreIds) => {
      mapForEach(queryStoreIds, (sourceStore, listenerIds) =>
        collForEach(listenerIds, (listenerId) =>
          sourceStore.delListener(listenerId),
        ),
      );
      collClear(queryStoreIds);
    });
  const synchronizeTransactions = (queryId, fromStore, toStore) =>
    addPreStoreListener(
      fromStore,
      queryId,
      fromStore.addStartTransactionListener(toStore.startTransaction),
      fromStore.addDidFinishTransactionListener(() =>
        toStore.finishTransaction(),
      ),
    );
  const setOrDelParamValues = (queryId, paramValues) =>
    (objIsEmpty(paramValues) ? paramStore.delRow : paramStore.setRow)(
      PARAMS_TABLE,
      queryId,
      {...paramValues},
    );
  const addRoutedResultListener = (stat, queryId, addStoreListener) => {
    const listenerId = addListener(getUndefined, routedResultListenerIds);
    const storeListenerIds = mapNew();
    const syncStoreListeners = () => {
      const queryIds = queryId == null ? getQueryIds() : [queryId];
      arrayForEach(queryIds, (queryId2) =>
        collHas(storeListenerIds, queryId2)
          ? 0
          : mapSet(storeListenerIds, queryId2, [
              getResultStore(queryId2),
              addStoreListener(getResultStore(queryId2), queryId2),
            ]),
      );
      mapForEach(storeListenerIds, (storeQueryId, [store2, storeListenerId]) =>
        (queryId == null && hasQuery(storeQueryId)) || storeQueryId == queryId
          ? 0
          : (() => {
              store2.delListener(storeListenerId);
              mapSet(storeListenerIds, storeQueryId);
            })(),
      );
    };
    syncStoreListeners();
    mapSet(routedResultListeners, listenerId, [
      stat,
      storeListenerIds,
      queryId == null ? addQueryIdsListenerImpl(syncStoreListeners) : void 0,
    ]);
    resultListenerStats[stat]++;
    return listenerId;
  };
  const setQueryDefinition = (
    queryId,
    tableIdOrAsQuery,
    tableIdOrBuild,
    buildOrParamValues,
    paramValuesIfSourceIsQuery = {},
  ) => {
    const [tableId, build, sourceIsQuery, paramValues] = isTrue(
      tableIdOrAsQuery,
    )
      ? [tableIdOrBuild, buildOrParamValues, 1, paramValuesIfSourceIsQuery]
      : [tableIdOrAsQuery, tableIdOrBuild, 0, buildOrParamValues ?? {}];
    ifNotUndefined(getQueryArgs(queryId), ([, listenerId]) =>
      paramStore.delListener(listenerId),
    );
    setDefinition(queryId, tableId);
    setQueryArgs(queryId, [
      build,
      paramStore.addRowListener(PARAMS_TABLE, queryId, () =>
        setQueryDefinitionImpl(queryId),
      ),
      sourceIsQuery,
    ]);
    setOrDelParamValues(queryId, paramValues);
    setQueryDefinitionImpl(queryId);
    return queries;
  };
  const setQueryDefinitionImpl = (queryId) =>
    getResultStore(queryId).transaction(() =>
      ifNotUndefined(getQueryArgs(queryId), ([build, , sourceIsQuery]) => {
        const tableId = getTableId(queryId);
        const rootStore = sourceIsQuery ? getResultStore(tableId) : store;
        const resultStore2 = getResultStore(queryId);
        const paramValues = getParamValues(queryId);
        setAdd(redefiningQueryIds, queryId);
        resetPreStores(queryId);
        resetSourceStores(queryId);
        const selectEntries = [];
        const joinEntries = [
          [void 0, [tableId, void 0, void 0, [], mapNew(), rootStore]],
        ];
        const wheres = [];
        const groupEntries = [];
        const havings = [];
        const param = (paramId) => objGet(paramValues, paramId);
        const select = (arg1, arg2, arg3) => {
          const joinedTableId = isTrue(arg1) ? arg2 : arg1;
          const joinedCellId = isTrue(arg1) ? arg3 : arg2;
          const selectEntry = isFunction(arg1)
            ? [size(selectEntries) + EMPTY_STRING, arg1]
            : isUndefined(joinedCellId)
              ? [arg1, (getTableCell) => getTableCell(arg1)]
              : [
                  joinedCellId,
                  (getTableCell) =>
                    isTrue(arg1)
                      ? getTableCell(true, joinedTableId, joinedCellId)
                      : getTableCell(joinedTableId, joinedCellId),
                ];
          arrayPush(selectEntries, selectEntry);
          return {
            as: (selectedCellId) => (selectEntry[0] = selectedCellId),
          };
        };
        const join = (arg1, arg2, arg3, arg4) => {
          const joinedTableId = isTrue(arg1) ? arg2 : arg1;
          const [fromJoinAlias, onArg] = isTrue(arg1)
            ? isUndefined(arg4) || isFunction(arg3)
              ? [void 0, arg3]
              : [arg3, arg4]
            : isUndefined(arg3) || isFunction(arg2)
              ? [void 0, arg2]
              : [arg2, arg3];
          const joinEntry = [
            joinedTableId,
            [
              joinedTableId,
              fromJoinAlias,
              isFunction(onArg) ? onArg : (getCell) => getCell(onArg),
              [],
              mapNew(),
              isTrue(arg1) ? getResultStore(joinedTableId) : store,
            ],
          ];
          arrayPush(joinEntries, joinEntry);
          return {as: (joinedTableId2) => (joinEntry[0] = joinedTableId2)};
        };
        const where = (arg1, arg2, arg3, arg4) =>
          arrayPush(
            wheres,
            isFunction(arg1)
              ? arg1
              : isTrue(arg1)
                ? (getTableCell) => getTableCell(true, arg2, arg3) === arg4
                : isUndefined(arg3)
                  ? (getTableCell) => getTableCell(arg1) === arg2
                  : (getTableCell) => getTableCell(arg1, arg2) === arg3,
          );
        const group = (
          selectedCellId,
          aggregate,
          aggregateAdd,
          aggregateRemove,
          aggregateReplace,
        ) => {
          const groupEntry = [
            selectedCellId,
            [
              selectedCellId,
              isFunction(aggregate)
                ? [aggregate, aggregateAdd, aggregateRemove, aggregateReplace]
                : (mapGet(numericAggregators, aggregate) ?? [
                    (_cells, length) => length,
                  ]),
            ],
          ];
          arrayPush(groupEntries, groupEntry);
          return {as: (groupedCellId) => (groupEntry[0] = groupedCellId)};
        };
        const having = (arg1, arg2) =>
          arrayPush(
            havings,
            isFunction(arg1)
              ? arg1
              : (getSelectedOrGroupedCell) =>
                  getSelectedOrGroupedCell(arg1) === arg2,
          );
        build({select, join, where, group, having, param});
        const selects = mapNew(selectEntries);
        if (collIsEmpty(selects)) {
          collDel(redefiningQueryIds, queryId);
          return queries;
        }
        const joins = mapNew(joinEntries);
        mapForEach(joins, (joinAlias, [, fromJoinAlias]) =>
          ifNotUndefined(mapGet(joins, fromJoinAlias), ({3: toJoinAliases2}) =>
            isUndefined(joinAlias) ? 0 : arrayPush(toJoinAliases2, joinAlias),
          ),
        );
        const groups = mapNew(groupEntries);
        let selectJoinWhereStore = preStore;
        if (collIsEmpty(groups) && arrayIsEmpty(havings)) {
          selectJoinWhereStore = resultStore2;
        } else {
          synchronizeTransactions(queryId, selectJoinWhereStore, resultStore2);
          const groupedSelectedCellIds = mapNew();
          mapForEach(groups, (groupedCellId, [selectedCellId, aggregators]) =>
            setAdd(mapEnsure(groupedSelectedCellIds, selectedCellId, setNew), [
              groupedCellId,
              aggregators,
            ]),
          );
          const groupBySelectedCellIds = setNew();
          mapForEach(selects, (selectedCellId) =>
            collHas(groupedSelectedCellIds, selectedCellId)
              ? 0
              : setAdd(groupBySelectedCellIds, selectedCellId),
          );
          const tree = mapNew();
          const writeGroupRow = (
            leaf,
            changedGroupedSelectedCells,
            selectedRowId,
            forceRemove,
          ) =>
            ifNotUndefined(
              leaf,
              ([selectedCells, selectedRowIds, groupRowId, groupRow]) => {
                mapForEach(
                  changedGroupedSelectedCells,
                  (selectedCellId, [newCell]) => {
                    const selectedCell = mapEnsure(
                      selectedCells,
                      selectedCellId,
                      mapNew,
                    );
                    const oldLeafCell = mapGet(selectedCell, selectedRowId);
                    const newLeafCell = forceRemove ? void 0 : newCell;
                    if (oldLeafCell !== newLeafCell) {
                      const oldNewSet = setNew([[oldLeafCell, newLeafCell]]);
                      const oldLength = collSize(selectedCell);
                      mapSet(selectedCell, selectedRowId, newLeafCell);
                      collForEach(
                        mapGet(groupedSelectedCellIds, selectedCellId),
                        ([groupedCellId, aggregators]) => {
                          const aggregateValue = getAggregateValue(
                            groupRow[groupedCellId],
                            oldLength,
                            selectedCell,
                            oldNewSet,
                            aggregators,
                          );
                          groupRow[groupedCellId] = isUndefined(
                            getCellOrValueType(aggregateValue),
                          )
                            ? void 0
                            : aggregateValue;
                        },
                      );
                    }
                  },
                );
                if (
                  collIsEmpty(selectedRowIds) ||
                  !arrayEvery(havings, (having2) =>
                    having2((cellId) => groupRow[cellId]),
                  )
                ) {
                  resultStore2.delRow(queryId, groupRowId);
                } else if (isUndefined(groupRowId)) {
                  leaf[2] = resultStore2.addRow(queryId, groupRow);
                } else {
                  resultStore2.setRow(queryId, groupRowId, groupRow);
                }
              },
            );
          addPreStoreListener(
            selectJoinWhereStore,
            queryId,
            selectJoinWhereStore.addRowListener(
              queryId,
              null,
              (_store, _tableId, selectedRowId, getCellChange) => {
                const oldPath = [];
                const newPath = [];
                const changedGroupedSelectedCells = mapNew();
                const rowExists = selectJoinWhereStore.hasRow(
                  queryId,
                  selectedRowId,
                );
                let changedLeaf = !rowExists;
                collForEach(groupBySelectedCellIds, (selectedCellId) => {
                  const [changed, oldCell, newCell] = getCellChange(
                    queryId,
                    selectedRowId,
                    selectedCellId,
                  );
                  arrayPush(oldPath, oldCell);
                  arrayPush(newPath, newCell);
                  changedLeaf ||= changed;
                });
                mapForEach(groupedSelectedCellIds, (selectedCellId) => {
                  const [changed, , newCell] = getCellChange(
                    queryId,
                    selectedRowId,
                    selectedCellId,
                  );
                  if (changedLeaf || changed) {
                    mapSet(changedGroupedSelectedCells, selectedCellId, [
                      newCell,
                    ]);
                  }
                });
                if (changedLeaf) {
                  writeGroupRow(
                    visitTree(tree, oldPath, void 0, ([, selectedRowIds]) => {
                      collDel(selectedRowIds, selectedRowId);
                      return collIsEmpty(selectedRowIds);
                    }),
                    changedGroupedSelectedCells,
                    selectedRowId,
                    1,
                  );
                }
                if (rowExists) {
                  writeGroupRow(
                    visitTree(
                      tree,
                      newPath,
                      () => {
                        const groupRow = {};
                        collForEach(
                          groupBySelectedCellIds,
                          (selectedCellId) =>
                            (groupRow[selectedCellId] =
                              selectJoinWhereStore.getCell(
                                queryId,
                                selectedRowId,
                                selectedCellId,
                              )),
                        );
                        return [mapNew(), setNew(), void 0, groupRow];
                      },
                      ([, selectedRowIds]) => {
                        setAdd(selectedRowIds, selectedRowId);
                      },
                    ),
                    changedGroupedSelectedCells,
                    selectedRowId,
                  );
                }
              },
            ),
          );
        }
        synchronizeTransactions(queryId, rootStore, selectJoinWhereStore);
        const writeSelectRow = (rootRowId) => {
          const getJoinCell = (arg1, arg2, arg3) => {
            const joinedTableId = isTrue(arg1) ? arg2 : arg1;
            const joinedCellId = isTrue(arg1) ? arg3 : arg2;
            if (isUndefined(joinedCellId)) {
              return rootStore.getCell(tableId, rootRowId, arg1);
            }
            if (joinedTableId === tableId && !isTrue(arg1)) {
              return rootStore.getCell(tableId, rootRowId, joinedCellId);
            }
            const join2 = mapGet(joins, joinedTableId);
            return isUndefined(join2)
              ? void 0
              : join2[5].getCell(
                  join2[0],
                  mapGet(join2[4], rootRowId)?.[0],
                  joinedCellId,
                );
          };
          selectJoinWhereStore.transaction(() =>
            arrayEvery(wheres, (where2) => where2(getJoinCell))
              ? mapForEach(selects, (asCellId, tableCellGetter) =>
                  selectJoinWhereStore._[5](
                    queryId,
                    rootRowId,
                    asCellId,
                    tableCellGetter(getJoinCell, rootRowId),
                  ),
                )
              : selectJoinWhereStore.delRow(queryId, rootRowId),
          );
        };
        const listenToTable = (
          rootRowId,
          sourceStore,
          tableId2,
          rowId,
          toJoinAliases2,
        ) => {
          const getCell = (cellId) =>
            sourceStore.getCell(tableId2, rowId, cellId);
          arrayForEach(toJoinAliases2, (joinAlias) => {
            const [
              realJoinedTableId,
              ,
              on,
              nextJoinAliases,
              remoteIdPairs,
              remoteSourceStore,
            ] = mapGet(joins, joinAlias);
            const remoteRowId = on?.(getCell, rootRowId);
            const previousRemote = mapGet(remoteIdPairs, rootRowId);
            const previousRemoteRowId = previousRemote?.[0];
            if (remoteRowId != previousRemoteRowId) {
              ifNotUndefined(
                previousRemote,
                ([, previousRemoteSourceStore, previousRemoteListenerId]) =>
                  delSourceStoreListeners(
                    queryId,
                    previousRemoteSourceStore,
                    previousRemoteListenerId,
                  ),
              );
              mapSet(
                remoteIdPairs,
                rootRowId,
                isUndefined(remoteRowId)
                  ? void 0
                  : [
                      remoteRowId,
                      remoteSourceStore,
                      ...addSourceStoreListeners(
                        remoteSourceStore,
                        queryId,
                        1,
                        remoteSourceStore.addRowListener(
                          realJoinedTableId,
                          remoteRowId,
                          () =>
                            listenToTable(
                              rootRowId,
                              remoteSourceStore,
                              realJoinedTableId,
                              remoteRowId,
                              nextJoinAliases,
                            ),
                        ),
                      ),
                    ],
              );
            }
          });
          writeSelectRow(rootRowId);
        };
        const {3: toJoinAliases} = mapGet(joins, void 0);
        const rootRowChanged = (sourceStore, _tableId, rootRowId) => {
          if (rootStore.hasRow(tableId, rootRowId)) {
            listenToTable(
              rootRowId,
              rootStore,
              tableId,
              rootRowId,
              toJoinAliases,
            );
          } else {
            selectJoinWhereStore.delRow(queryId, rootRowId);
            collForEach(joins, ({4: idsByRootRowId}) =>
              ifNotUndefined(
                mapGet(idsByRootRowId, rootRowId),
                ([, sourceStore2, listenerId]) => {
                  delSourceStoreListeners(queryId, sourceStore2, listenerId);
                  mapSet(idsByRootRowId, rootRowId);
                },
              ),
            );
          }
        };
        selectJoinWhereStore.transaction(() => {
          arrayForEach(rootStore.getRowIds(tableId), (rootRowId) =>
            rootRowChanged(rootStore, tableId, rootRowId),
          );
          addSourceStoreListeners(
            rootStore,
            queryId,
            0,
            rootStore.addRowListener(tableId, null, rootRowChanged),
          );
        });
        collDel(redefiningQueryIds, queryId);
        return queries;
      }),
    );
  const delQueryDefinition = (queryId) => {
    ifNotUndefined(getQueryArgs(queryId), ([, listenerId]) =>
      paramStore.delListener(listenerId),
    );
    paramStore.delRow(PARAMS_TABLE, queryId);
    resetPreStores(queryId);
    resetSourceStores(queryId);
    delDefinition(queryId);
    return queries;
  };
  const setParamValues = (queryId, paramValues) => {
    if (hasQuery(queryId)) {
      setOrDelParamValues(queryId, paramValues);
    }
    return queries;
  };
  const setParamValue = (queryId, paramId, value) => {
    if (hasQuery(queryId)) {
      paramStore.setCell(PARAMS_TABLE, queryId, paramId, value);
    }
    return queries;
  };
  const getParamValues = (queryId) => paramStore.getRow(PARAMS_TABLE, queryId);
  const getParamValue = (queryId, paramId) =>
    paramStore.getCell(PARAMS_TABLE, queryId, paramId);
  const addQueryIdsListener = (listener) =>
    addQueryIdsListenerImpl(() => listener(queries));
  const forEachResultTable = (tableCallback) =>
    forEachQuery((queryId) =>
      getResultStore(queryId).hasTable(queryId)
        ? tableCallback(queryId, (rowCallback) =>
            queries.forEachResultRow(queryId, rowCallback),
          )
        : 0,
    );
  const addParamValuesListener = (queryId, listener) =>
    PARAM_LISTENER_PREFIX +
    paramStore.addRowListener(
      PARAMS_TABLE,
      queryId,
      (_store, _tableId, queryId2) =>
        listener(queries, queryId2, getParamValues(queryId2)),
    );
  const addParamValueListener = (queryId, paramId, listener) =>
    PARAM_LISTENER_PREFIX +
    paramStore.addCellListener(
      PARAMS_TABLE,
      queryId,
      paramId,
      (_store, _tableId, queryId2, paramId2, paramValue) =>
        listener(queries, queryId2, paramId2, paramValue),
    );
  const delListener = (listenerId) => {
    const routedResultListener = mapGet(routedResultListeners, listenerId);
    if (listenerId[0] == PARAM_LISTENER_PREFIX) {
      paramStore.delListener(slice(listenerId, 1));
    } else if (!isUndefined(routedResultListener)) {
      const [stat, storeListenerIds, queryIdsListenerId] = routedResultListener;
      mapForEach(storeListenerIds, (_queryId, [store2, storeListenerId]) =>
        store2.delListener(storeListenerId),
      );
      ifNotUndefined(queryIdsListenerId, delListenerImpl);
      mapSet(routedResultListeners, listenerId);
      delListenerImpl(listenerId);
      resultListenerStats[stat]--;
    } else {
      delListenerImpl(listenerId);
    }
    return queries;
  };
  const getListenerStats = () => ({
    ...resultListenerStats,
    paramValues: paramStore.getListenerStats().row - size(getQueryIds()),
    paramValue: paramStore.getListenerStats().cell,
  });
  const destroy = () => {
    arrayForEach(getQueryIds(), delQueryDefinition);
    destroyImpl();
  };
  const queries = {
    setQueryDefinition,
    delQueryDefinition,
    getParamValues,
    getParamValue,
    setParamValues,
    setParamValue,
    getStore,
    getQueryIds,
    forEachQuery,
    hasQuery,
    getTableId,
    forEachResultTable,
    addQueryIdsListener,
    addParamValuesListener,
    addParamValueListener,
    delListener,
    destroy,
    getListenerStats,
  };
  const getListenerArgs = (args, argumentCount) =>
    argumentCount == 5
      ? [args[0], args[1] ?? void 0, args[2], args[3], args[4]]
      : slice(args, 0, argumentCount);
  const getResultListenerStat = (gettable) =>
    gettable[0].toLowerCase() + slice(gettable, 1);
  objMap(
    {
      [TABLE$1]: [2, 1],
      [TABLE$1 + CELL_IDS]: [1, 1],
      [ROW_COUNT]: [1, 1],
      [ROW_IDS]: [1, 1],
      [SORTED_ROW_IDS]: [1, 5],
      [ROW]: [3, 2],
      [CELL_IDS]: [1, 2],
      [CELL]: [3, 3],
    },
    ([prefixCount, argumentCount], gettable) => {
      arrayForEach(
        slice([GET, 'has', 'forEach'], 0, prefixCount),
        (prefix) =>
          (queries[prefix + RESULT + gettable] = (...args) =>
            getResultStore(args[0])[prefix + gettable](...args)),
      );
      queries[ADD + RESULT + gettable + LISTENER] = (...args) =>
        addRoutedResultListener(
          getResultListenerStat(gettable),
          args[0],
          (store2) =>
            store2[ADD + gettable + LISTENER](
              ...getListenerArgs(args, argumentCount),
              (_store, ...listenerArgs) =>
                args[argumentCount](queries, ...listenerArgs),
              true,
            ),
        );
    },
  );
  return objFreeze(queries);
});

const createRelationships = getCreateFunction((store) => {
  const remoteTableIds = mapNew();
  const remoteRowIdListeners = mapNew();
  const localRowIdsListeners = mapNew();
  const linkedRowIdsListeners = mapNew();
  const [addListener, callListeners, delListenerImpl] = getListenerFunctions(
    () => relationships,
  );
  const [
    getStore,
    getRelationshipIds,
    forEachRelationshipImpl,
    hasRelationship,
    getLocalTableId,
    getRelationship,
    ,
    ,
    setDefinitionAndListen,
    delDefinition,
    addRelationshipIdsListener,
    destroy,
  ] = getDefinableFunctions(
    store,
    () => [mapNew(), mapNew(), mapNew(), mapNew()],
    (value) => (isUndefined(value) ? void 0 : value + EMPTY_STRING),
    addListener,
    callListeners,
  );
  const getLinkedRowIdsCache = (relationshipId, firstRowId, skipCache) =>
    ifNotUndefined(
      getRelationship(relationshipId),
      ([remoteRows, , linkedRowsCache]) => {
        if (!collHas(linkedRowsCache, firstRowId)) {
          const linkedRows = setNew();
          if (
            getLocalTableId(relationshipId) != getRemoteTableId(relationshipId)
          ) {
            setAdd(linkedRows, firstRowId);
          } else {
            let rowId = firstRowId;
            while (!isUndefined(rowId) && !collHas(linkedRows, rowId)) {
              setAdd(linkedRows, rowId);
              rowId = mapGet(remoteRows, rowId);
            }
          }
          if (skipCache) {
            return linkedRows;
          }
          mapSet(linkedRowsCache, firstRowId, linkedRows);
        }
        return mapGet(linkedRowsCache, firstRowId);
      },
    );
  const delLinkedRowIdsCache = (relationshipId, firstRowId) =>
    ifNotUndefined(getRelationship(relationshipId), ([, , linkedRowsCache]) =>
      mapSet(linkedRowsCache, firstRowId),
    );
  const setRelationshipDefinition = (
    relationshipId,
    localTableId,
    remoteTableId,
    getRemoteRowId2,
  ) => {
    mapSet(remoteTableIds, relationshipId, remoteTableId);
    setDefinitionAndListen(
      relationshipId,
      localTableId,
      (change, changedRemoteRowIds) => {
        const changedLocalRows = setNew();
        const changedRemoteRows = setNew();
        const changedLinkedRows = setNew();
        const [localRows, remoteRows] = getRelationship(relationshipId);
        collForEach(
          changedRemoteRowIds,
          ([oldRemoteRowId, newRemoteRowId], localRowId) => {
            if (!isUndefined(oldRemoteRowId)) {
              setAdd(changedRemoteRows, oldRemoteRowId);
              ifNotUndefined(
                mapGet(remoteRows, oldRemoteRowId),
                (oldRemoteRow) => {
                  collDel(oldRemoteRow, localRowId);
                  if (collIsEmpty(oldRemoteRow)) {
                    mapSet(remoteRows, oldRemoteRowId);
                  }
                },
              );
            }
            if (!isUndefined(newRemoteRowId)) {
              setAdd(changedRemoteRows, newRemoteRowId);
              if (!collHas(remoteRows, newRemoteRowId)) {
                mapSet(remoteRows, newRemoteRowId, setNew());
              }
              setAdd(mapGet(remoteRows, newRemoteRowId), localRowId);
            }
            setAdd(changedLocalRows, localRowId);
            mapSet(localRows, localRowId, newRemoteRowId);
            mapForEach(
              mapGet(linkedRowIdsListeners, relationshipId),
              (firstRowId) => {
                if (
                  collHas(
                    getLinkedRowIdsCache(relationshipId, firstRowId),
                    localRowId,
                  )
                ) {
                  setAdd(changedLinkedRows, firstRowId);
                }
              },
            );
          },
        );
        change();
        collForEach(changedLocalRows, (localRowId) =>
          callListeners(remoteRowIdListeners, [relationshipId, localRowId]),
        );
        collForEach(changedRemoteRows, (remoteRowId) =>
          callListeners(localRowIdsListeners, [relationshipId, remoteRowId]),
        );
        collForEach(changedLinkedRows, (firstRowId) => {
          delLinkedRowIdsCache(relationshipId, firstRowId);
          callListeners(linkedRowIdsListeners, [relationshipId, firstRowId]);
        });
      },
      getRowCellFunction(getRemoteRowId2),
    );
    return relationships;
  };
  const forEachRelationship = (relationshipCallback) =>
    forEachRelationshipImpl((relationshipId) =>
      relationshipCallback(relationshipId, (rowCallback) =>
        store.forEachRow(getLocalTableId(relationshipId), rowCallback),
      ),
    );
  const delRelationshipDefinition = (relationshipId) => {
    mapSet(remoteTableIds, relationshipId);
    delDefinition(relationshipId);
    return relationships;
  };
  const getRemoteTableId = (relationshipId) =>
    mapGet(remoteTableIds, relationshipId);
  const getRemoteRowId = (relationshipId, localRowId) =>
    mapGet(getRelationship(relationshipId)?.[0], localRowId);
  const getLocalRowIds = (relationshipId, remoteRowId) =>
    collValues(mapGet(getRelationship(relationshipId)?.[1], remoteRowId));
  const getLinkedRowIds = (relationshipId, firstRowId) =>
    isUndefined(getRelationship(relationshipId))
      ? [firstRowId]
      : collValues(getLinkedRowIdsCache(relationshipId, firstRowId, true));
  const addRemoteRowIdListener = (relationshipId, localRowId, listener) =>
    addListener(listener, remoteRowIdListeners, [relationshipId, localRowId]);
  const addLocalRowIdsListener = (relationshipId, remoteRowId, listener) =>
    addListener(listener, localRowIdsListeners, [relationshipId, remoteRowId]);
  const addLinkedRowIdsListener = (relationshipId, firstRowId, listener) => {
    getLinkedRowIdsCache(relationshipId, firstRowId);
    return addListener(listener, linkedRowIdsListeners, [
      relationshipId,
      firstRowId,
    ]);
  };
  const delListener = (listenerId) => {
    delLinkedRowIdsCache(...(delListenerImpl(listenerId) ?? []));
    return relationships;
  };
  const getListenerStats = () => ({
    remoteRowId: collSize3(remoteRowIdListeners),
    localRowIds: collSize3(localRowIdsListeners),
    linkedRowIds: collSize3(linkedRowIdsListeners),
  });
  const relationships = {
    setRelationshipDefinition,
    delRelationshipDefinition,
    getStore,
    getRelationshipIds,
    forEachRelationship,
    hasRelationship,
    getLocalTableId,
    getRemoteTableId,
    getRemoteRowId,
    getLocalRowIds,
    getLinkedRowIds,
    addRelationshipIdsListener,
    addRemoteRowIdListener,
    addLocalRowIdsListener,
    addLinkedRowIdsListener,
    delListener,
    destroy,
    getListenerStats,
  };
  return objFreeze(relationships);
});

const Message = {
  Response: 0 /* Response */,
  GetContentHashes: 1 /* GetContentHashes */,
  ContentHashes: 2 /* ContentHashes */,
  ContentDiff: 3 /* ContentDiff */,
  GetTableDiff: 4 /* GetTableDiff */,
  GetRowDiff: 5 /* GetRowDiff */,
  GetCellDiff: 6 /* GetCellDiff */,
  GetValueDiff: 7 /* GetValueDiff */,
};
const createCustomSynchronizer = (
  store,
  send,
  registerReceive,
  extraDestroy,
  requestTimeoutSeconds,
  onSend,
  onReceive,
  onIgnoredError,
  extra = {},
) => {
  let syncing = 0;
  let persisterListener;
  let sends = 0;
  let receives = 0;
  const pendingRequests = mapNew();
  const getTransactionId = () => getUniqueId(11);
  const sendImpl = (toClientId, requestId, message, body) => {
    sends++;
    onSend?.(toClientId, requestId, message, body);
    send(toClientId, requestId, message, body);
  };
  const request = async (toClientId, message, body, transactionId) =>
    promiseNew((resolve, reject) => {
      const requestId = transactionId + DOT + getUniqueId(4);
      const timeout = startTimeout(() => {
        collDel(pendingRequests, requestId);
        reject(
          `No response from ${toClientId ?? 'anyone'} to ${requestId}, ` +
            message,
        );
      }, requestTimeoutSeconds);
      mapSet(pendingRequests, requestId, [
        toClientId,
        (response, fromClientId) => {
          clearTimeout(timeout);
          collDel(pendingRequests, requestId);
          resolve([response, fromClientId, transactionId]);
        },
      ]);
      sendImpl(toClientId, requestId, message, body);
    });
  const mergeTablesStamps = (tablesStamp, [tableStamps2, tablesTime2]) => {
    objForEach(tableStamps2, ([rowStamps2, tableTime2], tableId) => {
      const tableStamp = objEnsure(tablesStamp[0], tableId, stampNewObj);
      objForEach(rowStamps2, ([cellStamps2, rowTime2], rowId) => {
        const rowStamp = objEnsure(tableStamp[0], rowId, stampNewObj);
        objForEach(
          cellStamps2,
          ([cell2, cellTime2], cellId) =>
            (rowStamp[0][cellId] = stampNew(cell2, cellTime2)),
        );
        rowStamp[1] = getLatestHlc(rowStamp[1], rowTime2);
      });
      tableStamp[1] = getLatestHlc(tableStamp[1], tableTime2);
    });
    tablesStamp[1] = getLatestHlc(tablesStamp[1], tablesTime2);
  };
  const getChangesFromOtherStore = (
    otherClientId = null,
    otherContentHashes,
    transactionId = getTransactionId(),
  ) =>
    tryCatch(async () => {
      if (isUndefined(otherContentHashes)) {
        [otherContentHashes, otherClientId, transactionId] = await request(
          null,
          1 /* GetContentHashes */,
          EMPTY_STRING,
          transactionId,
        );
      }
      const [otherTablesHash, otherValuesHash] = otherContentHashes;
      const [tablesHash, valuesHash] = store.getMergeableContentHashes();
      let tablesChanges = stampNewObj();
      if (tablesHash != otherTablesHash) {
        const [newTables, differentTableHashes] = (
          await request(
            otherClientId,
            4 /* GetTableDiff */,
            store.getMergeableTableHashes(),
            transactionId,
          )
        )[0];
        tablesChanges = newTables;
        if (!objIsEmpty(differentTableHashes)) {
          const [newRows, differentRowHashes] = (
            await request(
              otherClientId,
              5 /* GetRowDiff */,
              store.getMergeableRowHashes(differentTableHashes),
              transactionId,
            )
          )[0];
          mergeTablesStamps(tablesChanges, newRows);
          if (!objIsEmpty(differentRowHashes)) {
            const newCells = (
              await request(
                otherClientId,
                6 /* GetCellDiff */,
                store.getMergeableCellHashes(differentRowHashes),
                transactionId,
              )
            )[0];
            mergeTablesStamps(tablesChanges, newCells);
          }
        }
      }
      return [
        tablesChanges,
        valuesHash == otherValuesHash
          ? stampNewObj()
          : (
              await request(
                otherClientId,
                7 /* GetValueDiff */,
                store.getMergeableValueHashes(),
                transactionId,
              )
            )[0],
        1,
      ];
    }, onIgnoredError);
  const getPersisted = async () => {
    const changes = await getChangesFromOtherStore();
    return changes && (!objIsEmpty(changes[0][0]) || !objIsEmpty(changes[1][0]))
      ? changes
      : void 0;
  };
  const setPersisted = async (_getContent, changes) =>
    changes
      ? sendImpl(null, getTransactionId(), 3 /* ContentDiff */, changes)
      : sendImpl(
          null,
          getTransactionId(),
          2 /* ContentHashes */,
          store.getMergeableContentHashes(),
        );
  const addPersisterListener = (listener) => (persisterListener = listener);
  const delPersisterListener = () => (persisterListener = void 0);
  const startSync = async (initialContent) => {
    syncing = 1;
    return await persister.startAutoPersisting(initialContent);
  };
  const stopSync = async () => {
    syncing = 0;
    await persister.stopAutoPersisting();
    return persister;
  };
  const destroy = async () => {
    await persister.stopSync();
    extraDestroy();
    return persister;
  };
  const getSynchronizerStats = () => ({sends, receives});
  const persister = createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    2,
    // MergeableStoreOnly
    {startSync, stopSync, destroy, getSynchronizerStats, ...extra},
    1,
  );
  registerReceive((fromClientId, transactionOrRequestId, message, body) => {
    const isAutoLoading = syncing || persister.isAutoLoading();
    receives++;
    onReceive?.(fromClientId, transactionOrRequestId, message, body);
    if (message == 0 /* Response */) {
      ifNotUndefined(
        mapGet(pendingRequests, transactionOrRequestId),
        ([toClientId, handleResponse]) =>
          isNull(toClientId) || toClientId == fromClientId
            ? handleResponse(body, fromClientId)
            : /* istanbul ignore next */
              0,
      );
    } else if (message == 2 /* ContentHashes */ && isAutoLoading) {
      getChangesFromOtherStore(
        fromClientId,
        body,
        transactionOrRequestId ?? void 0,
      )
        .then((changes) => {
          persisterListener?.(void 0, changes);
        })
        .catch(onIgnoredError);
    } else if (message == 3 /* ContentDiff */ && isAutoLoading) {
      persisterListener?.(void 0, body);
    } else {
      ifNotUndefined(
        message == 1 /* GetContentHashes */ &&
          (syncing || persister.isAutoSaving())
          ? store.getMergeableContentHashes()
          : message == 4 /* GetTableDiff */
            ? store.getMergeableTableDiff(body)
            : message == 5 /* GetRowDiff */
              ? store.getMergeableRowDiff(body)
              : message == 6 /* GetCellDiff */
                ? store.getMergeableCellDiff(body)
                : message == 7 /* GetValueDiff */
                  ? store.getMergeableValueDiff(body)
                  : void 0,
        (response) => {
          sendImpl(
            fromClientId,
            transactionOrRequestId,
            0 /* Response */,
            response,
          );
        },
      );
    }
  });
  return persister;
};

const createBroadcastChannelSynchronizer = (
  store,
  channelName,
  onSend,
  onReceive,
  onIgnoredError,
) => {
  const clientId = getUniqueId();
  const channel = new BroadcastChannel(channelName);
  const send = (toClientId, requestId, message, body) =>
    channel.postMessage([clientId, toClientId, requestId, message, body]);
  const registerReceive = (receive) => {
    channel.onmessage = ({
      data: [fromClientId, toClientId, requestId, message, body],
    }) =>
      isNull(toClientId) || toClientId == clientId
        ? receive(fromClientId, requestId, message, body)
        : 0;
  };
  const destroy = () => {
    channel.close();
  };
  return createCustomSynchronizer(
    store,
    send,
    registerReceive,
    destroy,
    0.01,
    onSend,
    onReceive,
    onIgnoredError,
    {getChannelName: () => channelName},
  );
};

const clients = mapNew();
const createLocalSynchronizer = (store, onSend, onReceive, onIgnoredError) => {
  const clientId = getUniqueId();
  const send = (toClientId, requestId, message, body) =>
    startTimeout(() =>
      isNull(toClientId)
        ? mapForEach(clients, (otherClientId, receive) =>
            otherClientId != clientId
              ? receive(clientId, requestId, message, body)
              : 0,
          )
        : mapGet(clients, toClientId)?.(clientId, requestId, message, body),
    );
  const registerReceive = (receive) => {
    mapSet(clients, clientId, receive);
  };
  const destroy = () => {
    collDel(clients, clientId);
  };
  return createCustomSynchronizer(
    store,
    send,
    registerReceive,
    destroy,
    0.01,
    onSend,
    onReceive,
    onIgnoredError,
  );
};

const MESSAGE_SEPARATOR = '\n';
const ifPayloadValid = (payload, then) => {
  const splitAt = payload.indexOf(MESSAGE_SEPARATOR);
  if (splitAt !== -1) {
    then(slice(payload, 0, splitAt), slice(payload, splitAt + 1));
  }
};
const receivePayload = (payload, receive) =>
  ifPayloadValid(payload, (fromClientId, remainder) =>
    receive(fromClientId, ...jsonParseWithUndefined(remainder)),
  );
const createPayload = (toClientId, ...args) =>
  createRawPayload(toClientId ?? EMPTY_STRING, jsonStringWithUndefined(args));
const createRawPayload = (clientId, remainder) =>
  clientId + MESSAGE_SEPARATOR + remainder;

const createWsSynchronizer = async (
  store,
  webSocket,
  requestTimeoutSeconds = 1,
  onSend,
  onReceive,
  onIgnoredError,
) => {
  const addEventListener = (event, handler) => {
    webSocket.addEventListener(event, handler);
    return () => webSocket.removeEventListener(event, handler);
  };
  const registerReceive = (receive) =>
    addEventListener(MESSAGE, ({data}) =>
      receivePayload(data.toString(UTF8), receive),
    );
  const send = (toClientId, ...args) =>
    webSocket.send(createPayload(toClientId, ...args));
  const destroy = () => {
    webSocket.close();
  };
  const synchronizer = createCustomSynchronizer(
    store,
    send,
    registerReceive,
    destroy,
    requestTimeoutSeconds,
    onSend,
    onReceive,
    onIgnoredError,
    {getWebSocket: () => webSocket},
  );
  return promiseNew((resolve) => {
    if (webSocket.readyState != webSocket.OPEN) {
      const onAttempt = (error) => {
        if (error) {
          onIgnoredError?.(error);
        }
        removeOpenListener();
        removeErrorListener();
        resolve(synchronizer);
      };
      const removeOpenListener = addEventListener(OPEN, () => onAttempt());
      const removeErrorListener = addEventListener(ERROR, onAttempt);
    } else {
      resolve(synchronizer);
    }
  });
};

const PATH_REGEX$2 = /\/([^?]*)/;
const SERVER_CLIENT_ID$1 = 'S';
const getPathId = (request) =>
  strMatch(new URL(request.url).pathname, PATH_REGEX$2)?.[1] ?? EMPTY_STRING;
const getClientId = (request) =>
  request.headers.get('upgrade')?.toLowerCase() == 'websocket'
    ? request.headers.get('sec-websocket-key')
    : null;
const createResponse = (status, webSocket = null, body = null) =>
  new Response(body, {status, webSocket});
const createUpgradeRequiredResponse = () =>
  createResponse(426, null, 'Upgrade required');
class WsServerDurableObject extends DurableObject {
  // @ts-expect-error See blockConcurrencyWhile
  #serverClientSend;
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx.blockConcurrencyWhile(
      async () =>
        await ifNotUndefined(
          await this.createPersister(),
          async (persister) => {
            const synchronizer = createCustomSynchronizer(
              persister.getStore(),
              (toClientId, requestId, message, body) =>
                this.#handleMessage(
                  SERVER_CLIENT_ID$1,
                  createPayload(toClientId, requestId, message, body),
                ),
              (receive) =>
                (this.#serverClientSend = (payload) =>
                  receivePayload(payload, receive)),
              noop,
              1,
            );
            await persister.load();
            await persister.startAutoSave();
            startTimeout(synchronizer.startSync);
          },
        ),
    );
  }
  fetch(request) {
    const pathId = getPathId(request);
    return ifNotUndefined(
      getClientId(request),
      (clientId) => {
        const [webSocket, client] = objValues(new WebSocketPair());
        if (arrayIsEmpty(this.#getClients())) {
          this.onPathId(pathId, 1);
        }
        this.ctx.acceptWebSocket(client, [clientId, pathId]);
        this.onClientId(pathId, clientId, 1);
        client.send(createPayload(SERVER_CLIENT_ID$1, null, 1, EMPTY_STRING));
        return createResponse(101, webSocket);
      },
      createUpgradeRequiredResponse,
    );
  }
  webSocketMessage(client, message) {
    ifNotUndefined(this.ctx.getTags(client)[0], (clientId) =>
      this.#handleMessage(clientId, message.toString(), client),
    );
  }
  webSocketClose(client) {
    const [clientId, pathId] = this.ctx.getTags(client);
    this.onClientId(pathId, clientId, -1);
    if (size(this.#getClients()) == 1) {
      this.onPathId(pathId, -1);
    }
  }
  // --
  #handleMessage(fromClientId, message, fromClient) {
    ifPayloadValid(message.toString(), (toClientId, remainder) => {
      const forwardedPayload = createRawPayload(fromClientId, remainder);
      this.onMessage(fromClientId, toClientId, remainder);
      if (toClientId == EMPTY_STRING) {
        if (fromClientId != SERVER_CLIENT_ID$1) {
          this.#serverClientSend?.(forwardedPayload);
        }
        arrayForEach(this.#getClients(), (otherClient) => {
          if (otherClient != fromClient) {
            otherClient.send(forwardedPayload);
          }
        });
      } else if (toClientId == SERVER_CLIENT_ID$1) {
        this.#serverClientSend?.(forwardedPayload);
      } else if (toClientId != fromClientId) {
        this.#getClients(toClientId)[0]?.send(forwardedPayload);
      }
    });
  }
  #getClients(tag) {
    return this.ctx.getWebSockets(tag);
  }
  // --
  createPersister() {
    return void 0;
  }
  getPathId() {
    return this.ctx.getTags(this.#getClients()[0])?.[1];
  }
  getClientIds() {
    return arrayMap(
      this.#getClients(),
      (client) => this.ctx.getTags(client)[0],
    );
  }
  onPathId(_pathId, _addedOrRemoved) {}
  onClientId(_pathId, _clientId, _addedOrRemoved) {}
  onMessage(_fromClientId, _toClientId, _remainder) {}
}
const getWsServerDurableObjectFetch = (namespace) => (request, env) =>
  getClientId(request)
    ? env[namespace]
        .get(env[namespace].idFromName(getPathId(request)))
        .fetch(request)
    : createUpgradeRequiredResponse();

const PATH_REGEX$1 = /\/([^?]*)/;
const createWsServerSimple = (webSocketServer) => {
  const clientsByPath = mapNew();
  webSocketServer.on('connection', (client, request) =>
    ifNotUndefined(strMatch(request.url, PATH_REGEX$1), ([, pathId]) =>
      ifNotUndefined(request.headers['sec-websocket-key'], async (clientId) => {
        const clients = mapEnsure(clientsByPath, pathId, mapNew);
        mapSet(clients, clientId, client);
        client.on(MESSAGE, (data) =>
          ifPayloadValid(data.toString(UTF8), (toClientId, remainder) => {
            const forwardedPayload = createRawPayload(clientId, remainder);
            if (toClientId === EMPTY_STRING) {
              mapForEach(clients, (otherClientId, otherClient) =>
                otherClientId !== clientId
                  ? otherClient.send(forwardedPayload)
                  : 0,
              );
            } else {
              mapGet(clients, toClientId)?.send(forwardedPayload);
            }
          }),
        );
        client.on('close', () => {
          collDel(clients, clientId);
          if (collIsEmpty(clients)) {
            collDel(clientsByPath, pathId);
          }
        });
      }),
    ),
  );
  const getWebSocketServer = () => webSocketServer;
  const destroy = async () => {
    collClear(clientsByPath);
    webSocketServer.close();
  };
  const wsServerSimple = {
    getWebSocketServer,
    destroy,
  };
  return objFreeze(wsServerSimple);
};

const PATH_REGEX = /\/([^?]*)/;
const SERVER_CLIENT_ID = 'S';
const createWsServer = (
  webSocketServer,
  createPersisterForPath,
  onIgnoredError,
) => {
  const pathIdListeners = mapNew();
  const clientIdListeners = mapNew();
  const clientsByPath = mapNew();
  const serverClientsByPath = mapNew();
  const [addListener, callListeners, delListenerImpl] = getListenerFunctions(
    () => wsServer,
  );
  const configureServerClient = async (serverClient, pathId, clients) =>
    ifNotUndefined(
      await createPersisterForPath?.(pathId),
      (persisterMaybeThen) => {
        serverClient[0 /* State */] = 1;
        serverClient[1 /* Persister */] = isArray(persisterMaybeThen)
          ? persisterMaybeThen[0]
          : persisterMaybeThen;
        const messageHandler = getMessageHandler(
          SERVER_CLIENT_ID,
          clients,
          serverClient,
        );
        serverClient[2 /* Synchronizer */] = createCustomSynchronizer(
          serverClient[1 /* Persister */].getStore(),
          (toClientId, requestId, message, body) =>
            messageHandler(createPayload(toClientId, requestId, message, body)),
          (receive) =>
            (serverClient[3 /* Send */] = (payload) =>
              receivePayload(payload, receive)),
          noop,
          1,
          void 0,
          void 0,
          onIgnoredError,
        );
        serverClient[4 /* Buffer */] = [];
        serverClient[5 /* Then */] = isArray(persisterMaybeThen)
          ? persisterMaybeThen[1]
          : (_) => 0;
      },
    );
  const startServerClient = async (serverClient) => {
    serverClient[0 /* State */] = 2 /* Starting */;
    await serverClient[1 /* Persister */].schedule(
      serverClient[1 /* Persister */].startAutoLoad,
      serverClient[1 /* Persister */].startAutoSave,
      serverClient[2 /* Synchronizer */].startSync,
    );
    serverClient[5 /* Then */](serverClient[1 /* Persister */].getStore());
    serverClient[0 /* State */] = 0 /* Ready */;
  };
  const stopServerClient = async (serverClient) => {
    await serverClient[1 /* Persister */]?.destroy();
    await serverClient[2 /* Synchronizer */]?.destroy();
  };
  const getMessageHandler = (clientId, clients, serverClient) => (payload) =>
    ifPayloadValid(payload, (toClientId, remainder) => {
      const forwardedPayload = createRawPayload(clientId, remainder);
      if (toClientId === EMPTY_STRING) {
        if (clientId !== SERVER_CLIENT_ID) {
          serverClient[3 /* Send */]?.(forwardedPayload);
        }
        mapForEach(clients, (otherClientId, otherClient) =>
          otherClientId !== clientId ? otherClient.send(forwardedPayload) : 0,
        );
      } else if (toClientId === SERVER_CLIENT_ID) {
        serverClient[3 /* Send */]?.(forwardedPayload);
      } else {
        mapGet(clients, toClientId)?.send(forwardedPayload);
      }
    });
  webSocketServer.on('connection', (client, request) =>
    ifNotUndefined(strMatch(request.url, PATH_REGEX), ([, pathId]) =>
      ifNotUndefined(request.headers['sec-websocket-key'], async (clientId) => {
        const clients = mapEnsure(clientsByPath, pathId, mapNew);
        const serverClient = mapEnsure(serverClientsByPath, pathId, () => [
          0 /* Ready */,
        ]);
        const messageHandler = getMessageHandler(
          clientId,
          clients,
          serverClient,
        );
        if (collIsEmpty(clients)) {
          callListeners(pathIdListeners, void 0, pathId, 1);
          await configureServerClient(serverClient, pathId, clients);
        }
        mapSet(clients, clientId, client);
        callListeners(clientIdListeners, [pathId], clientId, 1);
        client.on(MESSAGE, (data) => {
          const payload = data.toString(UTF8);
          if (serverClient[0 /* State */] == 0 /* Ready */) {
            messageHandler(payload);
          } else {
            arrayPush(serverClient[4 /* Buffer */], payload);
          }
        });
        if (serverClient[0 /* State */] == 1 /* Configured */) {
          await startServerClient(serverClient);
          arrayForEach(serverClient[4 /* Buffer */], messageHandler);
          serverClient[4 /* Buffer */] = [];
        }
        client.on('close', async () => {
          collDel(clients, clientId);
          callListeners(clientIdListeners, [pathId], clientId, -1);
          if (collIsEmpty(clients)) {
            await stopServerClient(serverClient);
            collDel(serverClientsByPath, pathId);
            collDel(clientsByPath, pathId);
            callListeners(pathIdListeners, void 0, pathId, -1);
          }
        });
        if (onIgnoredError) {
          client.on(ERROR, onIgnoredError);
        }
      }),
    ),
  );
  if (onIgnoredError) {
    webSocketServer.on(ERROR, onIgnoredError);
  }
  const getWebSocketServer = () => webSocketServer;
  const getPathIds = () => mapKeys(clientsByPath);
  const getClientIds = (pathId) => mapKeys(mapGet(clientsByPath, pathId));
  const addPathIdsListener = (listener) =>
    addListener(listener, pathIdListeners);
  const addClientIdsListener = (pathId, listener) =>
    addListener(listener, clientIdListeners, [pathId]);
  const delListener = (listenerId) => {
    delListenerImpl(listenerId);
    return wsServer;
  };
  const getStats = () => ({
    paths: collSize(clientsByPath),
    clients: collSize2(clientsByPath),
  });
  const destroy = async () => {
    collClear(clientsByPath);
    await promiseAll(mapMap(serverClientsByPath, stopServerClient));
    webSocketServer.close();
  };
  const wsServer = {
    getWebSocketServer,
    getPathIds,
    getClientIds,
    addPathIdsListener,
    addClientIdsListener,
    delListener,
    getStats,
    destroy,
  };
  return objFreeze(wsServer);
};

export {
  addOrRemoveHash,
  broadcastChanges,
  createAutomergePersister,
  createBroadcastChannelSynchronizer,
  createCheckpoints,
  createCrSqliteWasmPersister,
  createCustomPersister,
  createCustomPostgreSqlPersister,
  createCustomSqlitePersister,
  createCustomSynchronizer,
  createDurableObjectStoragePersister,
  createElectricSqlPersister,
  createExpoSqlitePersister,
  createFilePersister,
  createIndexedDbPersister,
  createIndexes,
  createLibSqlPersister,
  createLocalPersister,
  createLocalSynchronizer,
  createMergeableStore,
  createMetrics,
  createMiddleware,
  createOpfsPersister,
  createPartyKitPersister,
  createPglitePersister,
  createPostgresPersister,
  createPowerSyncPersister,
  createQueries,
  createReactNativeMmkvPersister,
  createReactNativeSqlitePersister,
  createRelationships,
  createRemotePersister,
  createSessionPersister,
  createSqlite3Persister,
  createSqliteBunPersister,
  createSqliteWasmPersister,
  createStore,
  createWsServer,
  createWsServerSimple,
  createWsSynchronizer,
  createYjsPersister,
  defaultSorter,
  getCellHash,
  getCellInRowHash,
  getHash,
  getHlcFunctions,
  getRowHash,
  getRowInTableHash,
  getTableHash,
  getTableInTablesHash,
  getTablesHash,
  getUniqueId,
  getValueHash,
  getValueInValuesHash,
  getValuesHash,
  getWsServerDurableObjectFetch,
  hasStoreInStorage,
  loadStoreFromStorage,
  Message,
  objectStoreMatch,
  Persists,
  Status,
  TinyBasePartyKitServer,
  WsServerDurableObject,
};
