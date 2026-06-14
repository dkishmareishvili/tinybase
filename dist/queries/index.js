const getTypeOf = (thing) => typeof thing;
const EMPTY_STRING = '';
const STRING = getTypeOf(EMPTY_STRING);
const BOOLEAN = getTypeOf(true);
const NUMBER = getTypeOf(0);
const FUNCTION = getTypeOf(getTypeOf);
const OBJECT = 'object';
const ARRAY = 'array';
const NULL = 'null';
const SUM = 'sum';
const AVG = 'avg';
const MIN = 'min';
const MAX = 'max';
const LISTENER = 'Listener';
const RESULT = 'Result';
const GET = 'get';
const ADD = 'add';
const IDS = 'Ids';
const TABLE = 'Table';
const ROW = 'Row';
const ROW_COUNT = ROW + 'Count';
const ROW_IDS = ROW + IDS;
const SORTED_ROW_IDS = 'Sorted' + ROW + IDS;
const CELL = 'Cell';
const CELL_IDS = CELL + IDS;

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const math = Math;
const mathMax = math.max;
const mathMin = math.min;
const isFiniteNumber = isFinite;
const isNullish = (thing) => thing == null;
const isUndefined = (thing) => thing === void 0;
const isNull = (thing) => thing === null;
const isTrue = (thing) => thing === true;
const ifNotNullish = getIfNotFunction(isNullish);
const ifNotUndefined = getIfNotFunction(isUndefined);
const isTypeStringOrBoolean = (type) => type == STRING || type == BOOLEAN;
const isFunction = (thing) => getTypeOf(thing) == FUNCTION;
const isArray = (thing) => Array.isArray(thing);
const slice = (arrayOrString, start, end) => arrayOrString.slice(start, end);
const size = (arrayOrString) => arrayOrString.length;
const getUndefined = () => void 0;

const arrayEvery = (array, cb) => array.every(cb);
const arrayIsEqual = (array1, array2) =>
  size(array1) === size(array2) &&
  arrayEvery(array1, (value1, index) => array2[index] === value1);
const arrayForEach = (array, cb) => array.forEach(cb);
const arrayMap = (array, cb) => array.map(cb);
const arraySum = (array) => arrayReduce(array, (i, j) => i + j, 0);
const arrayIsEmpty = (array) => size(array) == 0;
const arrayReduce = (array, cb, initial) => array.reduce(cb, initial);
const arrayPush = (array, ...values) => array.push(...values);

const collSize = (coll) => coll?.size ?? 0;
const collHas = (coll, keyOrValue) => coll?.has(keyOrValue) ?? false;
const collIsEmpty = (coll) => isUndefined(coll) || collSize(coll) == 0;
const collValues = (coll) => [...(coll?.values() ?? [])];
const collClear = (coll) => coll.clear();
const collForEach = (coll, cb) => coll?.forEach(cb);
const collDel = (coll, keyOrValue) => coll?.delete(keyOrValue);

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
const objGet = (obj, id) => ifNotUndefined(obj, (obj2) => obj2[id]);
const objToArray = (obj, cb) =>
  arrayMap(objEntries(obj), ([id, value]) => cb(value, id));
const objMap = (obj, cb) =>
  objNew(objToArray(obj, (value, id) => [id, cb(value, id)]));
const objSize = (obj) => size(objIds(obj));
const objIsEmpty = (obj) => isObject(obj) && objSize(obj) == 0;

const map = Map;
const mapNew = (entries) => new map(entries);
const mapKeys = (map2) => [...(map2?.keys() ?? [])];
const mapGet = (map2, key) => map2?.get(key);
const mapForEach = (map2, cb) =>
  collForEach(map2, (value, key) => cb(key, value));
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
const getCreateFunction = (getFunction, initFunction) => {
  const thingsByStore = /* @__PURE__ */ new WeakMap();
  return (store) => {
    if (!thingsByStore.has(store)) {
      thingsByStore.set(store, getFunction(store));
    }
    const thing = thingsByStore.get(store);
    return thing;
  };
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
      [TABLE]: [2, 1],
      [TABLE + CELL_IDS]: [1, 1],
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

export {createQueries};
