import React from 'react';
import {jsx} from 'react/jsx-runtime';

const getTypeOf = (thing) => typeof thing;
const TINYBASE = 'tinybase';
const EMPTY_STRING = '';
const STRING = getTypeOf(EMPTY_STRING);
const FUNCTION = getTypeOf(getTypeOf);
const LISTENER = 'Listener';
const RESULT = 'Result';
const GET = 'get';
const SET = 'set';
const ADD = 'add';
const DEL = 'del';
const HAS = 'Has';
const _HAS = 'has';
const IDS = 'Ids';
const TABLE = 'Table';
const TABLES = TABLE + 's';
const TABLE_IDS = TABLE + IDS;
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
const PARTIAL = 'Partial';
const FINISH = 'Finish';
const STATUS = 'Status';
const METRIC = 'Metric';
const INDEX = 'Index';
const SLICE = 'Slice';
const RELATIONSHIP = 'Relationship';
const REMOTE_ROW_ID = 'Remote' + ROW + 'Id';
const LOCAL = 'Local';
const LINKED = 'Linked';
const QUERY = 'Query';
const CHECKPOINT = 'Checkpoint';

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const GLOBAL = globalThis;
const isNullish = (thing) => thing == null;
const isUndefined = (thing) => thing === void 0;
const ifNotNullish = getIfNotFunction(isNullish);
const ifNotUndefined = getIfNotFunction(isUndefined);
const isString = (thing) => getTypeOf(thing) == STRING;
const isFunction = (thing) => getTypeOf(thing) == FUNCTION;
const isArray = (thing) => Array.isArray(thing);
const size = (arrayOrString) => arrayOrString.length;
const getUndefined = () => void 0;
const getArg = (value) => value;

const arrayNew = (size2, cb) =>
  arrayMap(new Array(size2).fill(0), (_, index) => cb(index));
const arrayEvery = (array, cb) => array.every(cb);
const arrayIsEqual = (array1, array2) =>
  size(array1) === size(array2) &&
  arrayEvery(array1, (value1, index) => array2[index] === value1);
const arrayOrValueEqual = (value1, value2) =>
  isArray(value1) && isArray(value2)
    ? arrayIsEqual(value1, value2)
    : value1 === value2;
const arrayMap = (array, cb) => array.map(cb);
const arrayIsEmpty = (array) => size(array) == 0;
const arrayFilter = (array, cb) => array.filter(cb);
const arrayWith = (array, index, value) => array.with(index, value);

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
const objGet = (obj, id) => ifNotUndefined(obj, (obj2) => obj2[id]);
const objHas = (obj, id) => id in obj;
const objDel = (obj, id) => {
  delete obj[id];
  return obj;
};
const objSize = (obj) => size(objIds(obj));

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

const jsonString = JSON.stringify;

const {
  PureComponent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} = React;
const getProps = (getProps2, ...ids) =>
  isUndefined(getProps2) ? {} : getProps2(...ids);
const getRelationshipsStoreTableIds = (relationships, relationshipId) => [
  relationships,
  relationships?.getStore(),
  relationships?.getLocalTableId(relationshipId),
  relationships?.getRemoteTableId(relationshipId),
];
const getIndexStoreTableId = (indexes, indexId) => [
  indexes,
  indexes?.getStore(),
  indexes?.getTableId(indexId),
];

const TINYBASE_CONTEXT = TINYBASE + '_uirc';
const Context = GLOBAL[TINYBASE_CONTEXT]
  ? /* istanbul ignore next */
    GLOBAL[TINYBASE_CONTEXT]
  : (GLOBAL[TINYBASE_CONTEXT] = createContext([]));
const useThing = (id, offset) => {
  const contextValue = useContext(Context);
  return isUndefined(id)
    ? contextValue[offset * 2]
    : isString(id)
      ? objGet(contextValue[offset * 2 + 1], id)
      : id;
};
const useThings = (offset) => ({...useContext(Context)[offset * 2 + 1]});
const useThingOrThingById = (thingOrThingId, offset) => {
  const thing = useThing(thingOrThingId, offset);
  return isUndefined(thingOrThingId) || isString(thingOrThingId)
    ? thing
    : thingOrThingId;
};
const useProvideThing = (thingId, thing, offset) => {
  const {16: addExtraThingById, 17: delExtraThingById} = useContext(Context);
  useEffect(() => {
    addExtraThingById?.(offset, thingId, thing);
    return () => delExtraThingById?.(offset, thingId);
  }, [addExtraThingById, thingId, thing, offset, delExtraThingById]);
};
const useThingIds = (offset) =>
  objIds(useContext(Context)[offset * 2 + 1] ?? {});

const OFFSET_STORE = 0;
const OFFSET_METRICS = 1;
const OFFSET_INDEXES = 2;
const OFFSET_RELATIONSHIPS = 3;
const OFFSET_QUERIES = 4;
const OFFSET_CHECKPOINTS = 5;
const OFFSET_PERSISTER = 6;
const OFFSET_SYNCHRONIZER = 7;
const mergeParentThings = (
  offset,
  parentValue,
  defaultThing,
  thingsById,
  extraThingsById,
) => [
  defaultThing ?? parentValue[offset * 2],
  {
    ...parentValue[offset * 2 + 1],
    ...thingsById,
    ...extraThingsById[offset],
  },
];
const Provider = ({
  store,
  storesById,
  metrics,
  metricsById,
  indexes,
  indexesById,
  relationships,
  relationshipsById,
  queries,
  queriesById,
  checkpoints,
  checkpointsById,
  persister,
  persistersById,
  synchronizer,
  synchronizersById,
  children,
}) => {
  const parentValue = useContext(Context);
  const [extraThingsById, setExtraThingsById] = useState(() =>
    arrayNew(8, () => ({})),
  );
  const addExtraThingById = useCallback(
    (thingOffset, id, thing) =>
      setExtraThingsById((extraThingsById2) =>
        objGet(extraThingsById2[thingOffset], id) == thing
          ? extraThingsById2
          : arrayWith(extraThingsById2, thingOffset, {
              ...extraThingsById2[thingOffset],
              [id]: thing,
            }),
      ),
    [],
  );
  const delExtraThingById = useCallback(
    (thingOffset, id) =>
      setExtraThingsById((extraThingsById2) =>
        !objHas(extraThingsById2[thingOffset], id)
          ? extraThingsById2
          : arrayWith(
              extraThingsById2,
              thingOffset,
              objDel(extraThingsById2[thingOffset], id),
            ),
      ),
    [],
  );
  return /* @__PURE__ */ jsx(Context.Provider, {
    value: useMemo(
      () => [
        ...mergeParentThings(
          OFFSET_STORE,
          parentValue,
          store,
          storesById,
          extraThingsById,
        ),
        ...mergeParentThings(
          OFFSET_METRICS,
          parentValue,
          metrics,
          metricsById,
          extraThingsById,
        ),
        ...mergeParentThings(
          OFFSET_INDEXES,
          parentValue,
          indexes,
          indexesById,
          extraThingsById,
        ),
        ...mergeParentThings(
          OFFSET_RELATIONSHIPS,
          parentValue,
          relationships,
          relationshipsById,
          extraThingsById,
        ),
        ...mergeParentThings(
          OFFSET_QUERIES,
          parentValue,
          queries,
          queriesById,
          extraThingsById,
        ),
        ...mergeParentThings(
          OFFSET_CHECKPOINTS,
          parentValue,
          checkpoints,
          checkpointsById,
          extraThingsById,
        ),
        ...mergeParentThings(
          OFFSET_PERSISTER,
          parentValue,
          persister,
          persistersById,
          extraThingsById,
        ),
        ...mergeParentThings(
          OFFSET_SYNCHRONIZER,
          parentValue,
          synchronizer,
          synchronizersById,
          extraThingsById,
        ),
        addExtraThingById,
        delExtraThingById,
      ],
      [
        extraThingsById,
        store,
        storesById,
        metrics,
        metricsById,
        indexes,
        indexesById,
        relationships,
        relationshipsById,
        queries,
        queriesById,
        checkpoints,
        checkpointsById,
        persister,
        persistersById,
        synchronizer,
        synchronizersById,
        parentValue,
        addExtraThingById,
        delExtraThingById,
      ],
    ),
    children,
  });
};

const EMPTY_ARRAY = [];
const DEFAULTS = [
  {},
  [],
  [EMPTY_ARRAY, void 0, EMPTY_ARRAY],
  {},
  void 0,
  void 0,
  false,
  0,
];
const cellOrValueEqual = (thing1, thing2) =>
  thing1 === thing2 ||
  ((isObject(thing1) || isArray(thing1)) &&
    jsonString(thing1) === jsonString(thing2));
const IS_EQUALS = [
  (obj1, obj2) => objIsEqual(obj1, obj2, cellOrValueEqual),
  arrayIsEqual,
  (
    [backwardIds1, currentId1, forwardIds1],
    [backwardIds2, currentId2, forwardIds2],
  ) =>
    currentId1 === currentId2 &&
    arrayIsEqual(backwardIds1, backwardIds2) &&
    arrayIsEqual(forwardIds1, forwardIds2),
  (paramValues1, paramValues2) =>
    objIsEqual(paramValues1, paramValues2, arrayOrValueEqual),
  arrayOrValueEqual,
  cellOrValueEqual,
];
const isEqual = (thing1, thing2) => thing1 === thing2;
const useCreate = (store, create, createDeps = EMPTY_ARRAY) => {
  const [, rerender] = useState();
  const [thing, setThing] = useState();
  useEffect(
    () => {
      const newThing = store ? create(store) : void 0;
      setThing(newThing);
      rerender([]);
      return newThing?.destroy;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, ...createDeps],
  );
  return thing;
};
const addAndDelListener = (thing, listenable, ...args) => {
  const listenerId = thing?.[ADD + listenable + LISTENER]?.(...args);
  return () => thing?.delListener?.(listenerId);
};
const useListenable = (listenable, thing, returnType, args = EMPTY_ARRAY) => {
  const lastResultRef = useRef(DEFAULTS[returnType]);
  const getResult = useCallback(
    () => {
      const nextResult =
        thing?.[(returnType == 6 /* Boolean */ ? _HAS : GET) + listenable]?.(
          ...args,
        ) ?? DEFAULTS[returnType];
      return !(IS_EQUALS[returnType] ?? isEqual)(
        nextResult,
        lastResultRef.current,
      )
        ? (lastResultRef.current = nextResult)
        : lastResultRef.current;
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [thing, returnType, listenable, ...args],
  );
  const subscribe = useCallback(
    (listener) =>
      addAndDelListener(
        thing,
        (returnType == 6 /* Boolean */ ? HAS : EMPTY_STRING) + listenable,
        ...args,
        listener,
      ),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [thing, returnType, listenable, ...args],
  );
  return useSyncExternalStore(subscribe, getResult, getResult);
};
const useListener = (
  listenable,
  thing,
  listener,
  listenerDeps = EMPTY_ARRAY,
  preArgs = EMPTY_ARRAY,
  ...postArgs
) =>
  useLayoutEffect(
    () =>
      addAndDelListener(thing, listenable, ...preArgs, listener, ...postArgs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [thing, listenable, ...preArgs, ...listenerDeps, ...postArgs],
  );
const useSetCallback = (
  storeOrQueries,
  settable,
  get,
  getDeps = EMPTY_ARRAY,
  then = getUndefined,
  thenDeps = EMPTY_ARRAY,
  methodPrefix,
  ...args
) =>
  useCallback(
    (parameter) =>
      ifNotUndefined(storeOrQueries, (obj) =>
        ifNotUndefined(get(parameter, obj), (thing) =>
          then(
            obj[methodPrefix + settable](
              ...argsOrGetArgs(args, obj, parameter),
              thing,
            ),
            thing,
          ),
        ),
      ),
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      storeOrQueries,
      settable,
      ...getDeps,
      ...thenDeps,
      methodPrefix,
      ...nonFunctionDeps(args),
    ],
    /* eslint-enable react-hooks/exhaustive-deps */
  );
const useStoreSetCallback = (
  storeOrStoreId,
  settable,
  get,
  getDeps,
  then,
  thenDeps,
  ...args
) =>
  useSetCallback(
    useStoreOrStoreById(storeOrStoreId),
    settable,
    get,
    getDeps,
    then,
    thenDeps,
    SET,
    ...args,
  );
const useQueriesSetCallback = (
  queriesOrQueriesId,
  settable,
  get,
  getDeps,
  then,
  thenDeps,
  ...args
) =>
  useSetCallback(
    useQueriesOrQueriesById(queriesOrQueriesId),
    settable,
    get,
    getDeps,
    then,
    thenDeps,
    EMPTY_STRING,
    ...args,
  );
const argsOrGetArgs = (args, store, parameter) =>
  arrayMap(args, (arg) => (isFunction(arg) ? arg(parameter, store) : arg));
const nonFunctionDeps = (args) => arrayFilter(args, (arg) => !isFunction(arg));
const useDel = (
  storeOrStoreId,
  deletable,
  then = getUndefined,
  thenDeps = EMPTY_ARRAY,
  ...args
) => {
  const store = useStoreOrStoreById(storeOrStoreId);
  return useCallback(
    (parameter) =>
      then(store?.[DEL + deletable](...argsOrGetArgs(args, store, parameter))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, deletable, ...thenDeps, ...nonFunctionDeps(args)],
  );
};
const useCheckpointAction = (checkpointsOrCheckpointsId, action, arg) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  return useCallback(
    () => checkpoints?.[action](arg),
    [checkpoints, action, arg],
  );
};
const useSortedRowIdsImpl = (
  tableId,
  cellId,
  descending,
  offset,
  limit,
  storeOrStoreId,
) =>
  useListenable(
    SORTED_ROW_IDS,
    useStoreOrStoreById(storeOrStoreId),
    1 /* Array */,
    [tableId, cellId, descending, offset, limit],
  );
const useSortedRowIdsListenerImpl = (
  tableId,
  cellId,
  descending,
  offset,
  limit,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    SORTED_ROW_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId, cellId, descending, offset, limit],
    mutator,
  );
const useCreateStore = (create, createDeps = EMPTY_ARRAY) =>
  useMemo(create, createDeps);
const useStoreIds = () => useThingIds(OFFSET_STORE);
const useStore = (id) => useThing(id, OFFSET_STORE);
const useStores = () => useThings(OFFSET_STORE);
const useStoreOrStoreById = (storeOrStoreId) =>
  useThingOrThingById(storeOrStoreId, OFFSET_STORE);
const useProvideStore = (storeId, store) =>
  useProvideThing(storeId, store, OFFSET_STORE);
const useCreateMergeableStore = (create, createDeps = EMPTY_ARRAY) =>
  useMemo(create, createDeps);
const useHasTables = (storeOrStoreId) =>
  useListenable(
    TABLES,
    useStoreOrStoreById(storeOrStoreId),
    6 /* Boolean */,
    [],
  );
const useTables = (storeOrStoreId) =>
  useListenable(TABLES, useStoreOrStoreById(storeOrStoreId), 0 /* Object */);
const useTablesState = (storeOrStoreId) => [
  useTables(storeOrStoreId),
  useSetTablesCallback(getArg, [], storeOrStoreId),
];
const useTableIds = (storeOrStoreId) =>
  useListenable(TABLE_IDS, useStoreOrStoreById(storeOrStoreId), 1 /* Array */);
const useHasTable = (tableId, storeOrStoreId) =>
  useListenable(TABLE, useStoreOrStoreById(storeOrStoreId), 6 /* Boolean */, [
    tableId,
  ]);
const useTable = (tableId, storeOrStoreId) =>
  useListenable(TABLE, useStoreOrStoreById(storeOrStoreId), 0 /* Object */, [
    tableId,
  ]);
const useTableState = (tableId, storeOrStoreId) => [
  useTable(tableId, storeOrStoreId),
  useSetTableCallback(tableId, getArg, [], storeOrStoreId),
];
const useTableCellIds = (tableId, storeOrStoreId) =>
  useListenable(
    TABLE + CELL_IDS,
    useStoreOrStoreById(storeOrStoreId),
    1 /* Array */,
    [tableId],
  );
const useHasTableCell = (tableId, cellId, storeOrStoreId) =>
  useListenable(
    TABLE + CELL,
    useStoreOrStoreById(storeOrStoreId),
    6 /* Boolean */,
    [tableId, cellId],
  );
const useRowCount = (tableId, storeOrStoreId) =>
  useListenable(
    ROW_COUNT,
    useStoreOrStoreById(storeOrStoreId),
    7 /* Number */,
    [tableId],
  );
const useRowIds = (tableId, storeOrStoreId) =>
  useListenable(ROW_IDS, useStoreOrStoreById(storeOrStoreId), 1 /* Array */, [
    tableId,
  ]);
const useSortedRowIds = (
  tableIdOrArgs,
  cellIdOrStoreOrStoreId,
  descending,
  offset,
  limit,
  storeOrStoreId,
) =>
  useSortedRowIdsImpl(
    ...(isObject(tableIdOrArgs)
      ? [
          tableIdOrArgs.tableId,
          tableIdOrArgs.cellId,
          tableIdOrArgs.descending ?? false,
          tableIdOrArgs.offset ?? 0,
          tableIdOrArgs.limit,
          cellIdOrStoreOrStoreId,
        ]
      : [
          tableIdOrArgs,
          cellIdOrStoreOrStoreId,
          descending,
          offset,
          limit,
          storeOrStoreId,
        ]),
  );
const useHasRow = (tableId, rowId, storeOrStoreId) =>
  useListenable(ROW, useStoreOrStoreById(storeOrStoreId), 6 /* Boolean */, [
    tableId,
    rowId,
  ]);
const useRow = (tableId, rowId, storeOrStoreId) =>
  useListenable(ROW, useStoreOrStoreById(storeOrStoreId), 0 /* Object */, [
    tableId,
    rowId,
  ]);
const useRowState = (tableId, rowId, storeOrStoreId) => [
  useRow(tableId, rowId, storeOrStoreId),
  useSetRowCallback(tableId, rowId, getArg, [], storeOrStoreId),
];
const useCellIds = (tableId, rowId, storeOrStoreId) =>
  useListenable(CELL_IDS, useStoreOrStoreById(storeOrStoreId), 1 /* Array */, [
    tableId,
    rowId,
  ]);
const useHasCell = (tableId, rowId, cellId, storeOrStoreId) =>
  useListenable(CELL, useStoreOrStoreById(storeOrStoreId), 6 /* Boolean */, [
    tableId,
    rowId,
    cellId,
  ]);
const useCell = (tableId, rowId, cellId, storeOrStoreId) =>
  useListenable(
    CELL,
    useStoreOrStoreById(storeOrStoreId),
    5 /* CellOrValue */,
    [tableId, rowId, cellId],
  );
const useCellState = (tableId, rowId, cellId, storeOrStoreId) => [
  useCell(tableId, rowId, cellId, storeOrStoreId),
  useSetCellCallback(tableId, rowId, cellId, getArg, [], storeOrStoreId),
];
const useHasValues = (storeOrStoreId) =>
  useListenable(
    VALUES,
    useStoreOrStoreById(storeOrStoreId),
    6 /* Boolean */,
    [],
  );
const useValues = (storeOrStoreId) =>
  useListenable(VALUES, useStoreOrStoreById(storeOrStoreId), 0 /* Object */);
const useValuesState = (storeOrStoreId) => [
  useValues(storeOrStoreId),
  useSetValuesCallback(getArg, [], storeOrStoreId),
];
const useValueIds = (storeOrStoreId) =>
  useListenable(VALUE_IDS, useStoreOrStoreById(storeOrStoreId), 1 /* Array */);
const useHasValue = (valueId, storeOrStoreId) =>
  useListenable(VALUE, useStoreOrStoreById(storeOrStoreId), 6 /* Boolean */, [
    valueId,
  ]);
const useValue = (valueId, storeOrStoreId) =>
  useListenable(
    VALUE,
    useStoreOrStoreById(storeOrStoreId),
    5 /* CellOrValue */,
    [valueId],
  );
const useValueState = (valueId, storeOrStoreId) => [
  useValue(valueId, storeOrStoreId),
  useSetValueCallback(valueId, getArg, [], storeOrStoreId),
];
const useSetTablesCallback = (
  getTables,
  getTablesDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    TABLES,
    getTables,
    getTablesDeps,
    then,
    thenDeps,
  );
const useSetTableCallback = (
  tableId,
  getTable,
  getTableDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    TABLE,
    getTable,
    getTableDeps,
    then,
    thenDeps,
    tableId,
  );
const useSetRowCallback = (
  tableId,
  rowId,
  getRow,
  getRowDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    ROW,
    getRow,
    getRowDeps,
    then,
    thenDeps,
    tableId,
    rowId,
  );
const useAddRowCallback = (
  tableId,
  getRow,
  getRowDeps = EMPTY_ARRAY,
  storeOrStoreId,
  then = getUndefined,
  thenDeps = EMPTY_ARRAY,
  reuseRowIds = true,
) => {
  const store = useStoreOrStoreById(storeOrStoreId);
  return useCallback(
    (parameter) =>
      ifNotUndefined(store, (store2) =>
        ifNotUndefined(getRow(parameter, store2), (row) =>
          then(
            store2.addRow(
              isFunction(tableId) ? tableId(parameter, store2) : tableId,
              row,
              reuseRowIds,
            ),
            store2,
            row,
          ),
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, tableId, ...getRowDeps, ...thenDeps, reuseRowIds],
  );
};
const useSetPartialRowCallback = (
  tableId,
  rowId,
  getPartialRow,
  getPartialRowDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    PARTIAL + ROW,
    getPartialRow,
    getPartialRowDeps,
    then,
    thenDeps,
    tableId,
    rowId,
  );
const useSetCellCallback = (
  tableId,
  rowId,
  cellId,
  getCell,
  getCellDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    CELL,
    getCell,
    getCellDeps,
    then,
    thenDeps,
    tableId,
    rowId,
    cellId,
  );
const useSetValuesCallback = (
  getValues,
  getValuesDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    VALUES,
    getValues,
    getValuesDeps,
    then,
    thenDeps,
  );
const useSetPartialValuesCallback = (
  getPartialValues,
  getPartialValuesDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    PARTIAL + VALUES,
    getPartialValues,
    getPartialValuesDeps,
    then,
    thenDeps,
  );
const useSetValueCallback = (
  valueId,
  getValue,
  getValueDeps,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    VALUE,
    getValue,
    getValueDeps,
    then,
    thenDeps,
    valueId,
  );
const useDelTablesCallback = (storeOrStoreId, then, thenDeps) =>
  useDel(storeOrStoreId, TABLES, then, thenDeps);
const useDelTableCallback = (tableId, storeOrStoreId, then, thenDeps) =>
  useDel(storeOrStoreId, TABLE, then, thenDeps, tableId);
const useDelRowCallback = (tableId, rowId, storeOrStoreId, then, thenDeps) =>
  useDel(storeOrStoreId, ROW, then, thenDeps, tableId, rowId);
const useDelCellCallback = (
  tableId,
  rowId,
  cellId,
  forceDel,
  storeOrStoreId,
  then,
  thenDeps,
) =>
  useDel(
    storeOrStoreId,
    CELL,
    then,
    thenDeps,
    tableId,
    rowId,
    cellId,
    forceDel,
  );
const useDelValuesCallback = (storeOrStoreId, then, thenDeps) =>
  useDel(storeOrStoreId, VALUES, then, thenDeps);
const useDelValueCallback = (valueId, storeOrStoreId, then, thenDeps) =>
  useDel(storeOrStoreId, VALUE, then, thenDeps, valueId);
const useHasTablesListener = (
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + TABLES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [],
    mutator,
  );
const useTablesListener = (listener, listenerDeps, mutator, storeOrStoreId) =>
  useListener(
    TABLES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    EMPTY_ARRAY,
    mutator,
  );
const useTableIdsListener = (listener, listenerDeps, mutator, storeOrStoreId) =>
  useListener(
    TABLE_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    EMPTY_ARRAY,
    mutator,
  );
const useHasTableListener = (
  tableId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + TABLE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId],
    mutator,
  );
const useTableListener = (
  tableId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    TABLE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId],
    mutator,
  );
const useTableCellIdsListener = (
  tableId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    TABLE + CELL_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId],
    mutator,
  );
const useHasTableCellListener = (
  tableId,
  cellId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + TABLE + CELL,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId, cellId],
    mutator,
  );
const useRowCountListener = (
  tableId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    ROW_COUNT,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId],
    mutator,
  );
const useRowIdsListener = (
  tableId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    ROW_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId],
    mutator,
  );
const useSortedRowIdsListener = (
  tableIdOrArgs,
  cellIdOrListener,
  descendingOrListenerDeps,
  offsetOrMutator,
  limitOrStoreOrStoreId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useSortedRowIdsListenerImpl(
    ...(isObject(tableIdOrArgs)
      ? [
          tableIdOrArgs.tableId,
          tableIdOrArgs.cellId,
          tableIdOrArgs.descending ?? false,
          tableIdOrArgs.offset ?? 0,
          tableIdOrArgs.limit,
          cellIdOrListener,
          descendingOrListenerDeps,
          offsetOrMutator,
          limitOrStoreOrStoreId,
        ]
      : [
          tableIdOrArgs,
          cellIdOrListener,
          descendingOrListenerDeps,
          offsetOrMutator,
          limitOrStoreOrStoreId,
          listener,
          listenerDeps,
          mutator,
          storeOrStoreId,
        ]),
  );
const useHasRowListener = (
  tableId,
  rowId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + ROW,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId, rowId],
    mutator,
  );
const useRowListener = (
  tableId,
  rowId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    ROW,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId, rowId],
    mutator,
  );
const useCellIdsListener = (
  tableId,
  rowId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    CELL_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId, rowId],
    mutator,
  );
const useHasCellListener = (
  tableId,
  rowId,
  cellId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + CELL,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId, rowId, cellId],
    mutator,
  );
const useCellListener = (
  tableId,
  rowId,
  cellId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    CELL,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [tableId, rowId, cellId],
    mutator,
  );
const useHasValuesListener = (
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + VALUES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [],
    mutator,
  );
const useValuesListener = (listener, listenerDeps, mutator, storeOrStoreId) =>
  useListener(
    VALUES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    EMPTY_ARRAY,
    mutator,
  );
const useValueIdsListener = (listener, listenerDeps, mutator, storeOrStoreId) =>
  useListener(
    VALUE_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    EMPTY_ARRAY,
    mutator,
  );
const useHasValueListener = (
  valueId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + VALUE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [valueId],
    mutator,
  );
const useValueListener = (
  valueId,
  listener,
  listenerDeps,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    VALUE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
    [valueId],
    mutator,
  );
const useStartTransactionListener = (listener, listenerDeps, storeOrStoreId) =>
  useListener(
    'Start' + TRANSACTION,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
  );
const useWillFinishTransactionListener = (
  listener,
  listenerDeps,
  storeOrStoreId,
) =>
  useListener(
    'Will' + FINISH + TRANSACTION,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
  );
const useDidFinishTransactionListener = (
  listener,
  listenerDeps,
  storeOrStoreId,
) =>
  useListener(
    'Did' + FINISH + TRANSACTION,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    listenerDeps,
  );
const useCreateMetrics = (store, create, createDeps) =>
  useCreate(store, create, createDeps);
const useMetricsIds = () => useThingIds(OFFSET_METRICS);
const useMetrics = (id) => useThing(id, OFFSET_METRICS);
const useMetricsOrMetricsById = (metricsOrMetricsId) =>
  useThingOrThingById(metricsOrMetricsId, OFFSET_METRICS);
const useProvideMetrics = (metricsId, metrics) =>
  useProvideThing(metricsId, metrics, OFFSET_METRICS);
const useMetricIds = (metricsOrMetricsId) =>
  useListenable(
    METRIC + IDS,
    useMetricsOrMetricsById(metricsOrMetricsId),
    1 /* Array */,
  );
const useMetric = (metricId, metricsOrMetricsId) =>
  useListenable(
    METRIC,
    useMetricsOrMetricsById(metricsOrMetricsId),
    5 /* CellOrValue */,
    [metricId],
  );
const useMetricListener = (
  metricId,
  listener,
  listenerDeps,
  metricsOrMetricsId,
) =>
  useListener(
    METRIC,
    useMetricsOrMetricsById(metricsOrMetricsId),
    listener,
    listenerDeps,
    [metricId],
  );
const useCreateIndexes = (store, create, createDeps) =>
  useCreate(store, create, createDeps);
const useIndexesIds = () => useThingIds(OFFSET_INDEXES);
const useIndexes = (id) => useThing(id, OFFSET_INDEXES);
const useIndexesOrIndexesById = (indexesOrIndexesId) =>
  useThingOrThingById(indexesOrIndexesId, OFFSET_INDEXES);
const useProvideIndexes = (indexesId, indexes) =>
  useProvideThing(indexesId, indexes, OFFSET_INDEXES);
const useSliceIds = (indexId, indexesOrIndexesId) =>
  useListenable(
    SLICE + IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    1 /* Array */,
    [indexId],
  );
const useIndexIds = (indexesOrIndexesId) =>
  useListenable(
    INDEX + IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    1 /* Array */,
  );
const useSliceRowIds = (indexId, sliceId, indexesOrIndexesId) =>
  useListenable(
    SLICE + ROW_IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    1 /* Array */,
    [indexId, sliceId],
  );
const useSliceIdsListener = (
  indexId,
  listener,
  listenerDeps,
  indexesOrIndexesId,
) =>
  useListener(
    SLICE + IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    listener,
    listenerDeps,
    [indexId],
  );
const useSliceRowIdsListener = (
  indexId,
  sliceId,
  listener,
  listenerDeps,
  indexesOrIndexesId,
) =>
  useListener(
    SLICE + ROW_IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    listener,
    listenerDeps,
    [indexId, sliceId],
  );
const useCreateRelationships = (store, create, createDeps) =>
  useCreate(store, create, createDeps);
const useRelationshipsIds = () => useThingIds(OFFSET_RELATIONSHIPS);
const useRelationships = (id) => useThing(id, OFFSET_RELATIONSHIPS);
const useRelationshipsOrRelationshipsById = (relationshipsOrRelationshipsId) =>
  useThingOrThingById(relationshipsOrRelationshipsId, OFFSET_RELATIONSHIPS);
const useProvideRelationships = (relationshipsId, relationships) =>
  useProvideThing(relationshipsId, relationships, OFFSET_RELATIONSHIPS);
const useRelationshipIds = (relationshipsOrRelationshipsId) =>
  useListenable(
    RELATIONSHIP + IDS,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    1 /* Array */,
  );
const useRemoteRowId = (
  relationshipId,
  localRowId,
  relationshipsOrRelationshipsId,
) =>
  useListenable(
    REMOTE_ROW_ID,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    5 /* CellOrValue */,
    [relationshipId, localRowId],
  );
const useLocalRowIds = (
  relationshipId,
  remoteRowId,
  relationshipsOrRelationshipsId,
) =>
  useListenable(
    LOCAL + ROW_IDS,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    1 /* Array */,
    [relationshipId, remoteRowId],
  );
const useLinkedRowIds = (
  relationshipId,
  firstRowId,
  relationshipsOrRelationshipsId,
) =>
  useListenable(
    LINKED + ROW_IDS,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    1 /* Array */,
    [relationshipId, firstRowId],
  );
const useRemoteRowIdListener = (
  relationshipId,
  localRowId,
  listener,
  listenerDeps,
  relationshipsOrRelationshipsId,
) =>
  useListener(
    REMOTE_ROW_ID,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    listener,
    listenerDeps,
    [relationshipId, localRowId],
  );
const useLocalRowIdsListener = (
  relationshipId,
  remoteRowId,
  listener,
  listenerDeps,
  relationshipsOrRelationshipsId,
) =>
  useListener(
    LOCAL + ROW_IDS,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    listener,
    listenerDeps,
    [relationshipId, remoteRowId],
  );
const useLinkedRowIdsListener = (
  relationshipId,
  firstRowId,
  listener,
  listenerDeps,
  relationshipsOrRelationshipsId,
) =>
  useListener(
    LINKED + ROW_IDS,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    listener,
    listenerDeps,
    [relationshipId, firstRowId],
  );
const useCreateQueries = (store, create, createDeps) =>
  useCreate(store, create, createDeps);
const useQueriesIds = () => useThingIds(OFFSET_QUERIES);
const useQueries = (id) => useThing(id, OFFSET_QUERIES);
const useQueriesOrQueriesById = (queriesOrQueriesId) =>
  useThingOrThingById(queriesOrQueriesId, OFFSET_QUERIES);
const useProvideQueries = (queriesId, queries) =>
  useProvideThing(queriesId, queries, OFFSET_QUERIES);
const useQueryIds = (queriesOrQueriesId) =>
  useListenable(
    QUERY + IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    1 /* Array */,
  );
const useResultTable = (queryId, queriesOrQueriesId) =>
  useListenable(
    RESULT + TABLE,
    useQueriesOrQueriesById(queriesOrQueriesId),
    0 /* Object */,
    [queryId],
  );
const useResultTableCellIds = (queryId, queriesOrQueriesId) =>
  useListenable(
    RESULT + TABLE + CELL_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    1 /* Array */,
    [queryId],
  );
const useResultRowCount = (queryId, queriesOrQueriesId) =>
  useListenable(
    RESULT + ROW_COUNT,
    useQueriesOrQueriesById(queriesOrQueriesId),
    7 /* Number */,
    [queryId],
  );
const useResultRowIds = (queryId, queriesOrQueriesId) =>
  useListenable(
    RESULT + ROW_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    1 /* Array */,
    [queryId],
  );
const useResultSortedRowIds = (
  queryId,
  cellId,
  descending,
  offset = 0,
  limit,
  queriesOrQueriesId,
) =>
  useListenable(
    RESULT + SORTED_ROW_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    1 /* Array */,
    [queryId, cellId, descending, offset, limit],
  );
const useResultRow = (queryId, rowId, queriesOrQueriesId) =>
  useListenable(
    RESULT + ROW,
    useQueriesOrQueriesById(queriesOrQueriesId),
    0 /* Object */,
    [queryId, rowId],
  );
const useResultCellIds = (queryId, rowId, queriesOrQueriesId) =>
  useListenable(
    RESULT + CELL_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    1 /* Array */,
    [queryId, rowId],
  );
const useResultCell = (queryId, rowId, cellId, queriesOrQueriesId) =>
  useListenable(
    RESULT + CELL,
    useQueriesOrQueriesById(queriesOrQueriesId),
    5 /* CellOrValue */,
    [queryId, rowId, cellId],
  );
const useResultTableListener = (
  queryId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + TABLE,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId],
  );
const useResultTableCellIdsListener = (
  queryId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + TABLE + CELL_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId],
  );
const useResultRowCountListener = (
  queryId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + ROW_COUNT,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId],
  );
const useResultRowIdsListener = (
  queryId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + ROW_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId],
  );
const useResultSortedRowIdsListener = (
  queryId,
  cellId,
  descending,
  offset,
  limit,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + SORTED_ROW_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId, cellId, descending, offset, limit],
  );
const useResultRowListener = (
  queryId,
  rowId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + ROW,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId, rowId],
  );
const useResultCellIdsListener = (
  queryId,
  rowId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + CELL_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId, rowId],
  );
const useResultCellListener = (
  queryId,
  rowId,
  cellId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + CELL,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId, rowId, cellId],
  );
const useParamValues = (queryId, queriesOrQueriesId) =>
  useListenable(
    'ParamValues',
    useQueriesOrQueriesById(queriesOrQueriesId),
    3 /* ParamValues */,
    [queryId],
  );
const useParamValuesState = (queryId, queriesOrQueriesId) => [
  useParamValues(queryId, queriesOrQueriesId),
  useSetParamValuesCallback(queryId, getArg, [], queriesOrQueriesId),
];
const useParamValue = (queryId, paramId, queriesOrQueriesId) =>
  useListenable(
    'ParamValue',
    useQueriesOrQueriesById(queriesOrQueriesId),
    4 /* ParamValue */,
    [queryId, paramId],
  );
const useParamValueState = (queryId, paramId, queriesOrQueriesId) => [
  useParamValue(queryId, paramId, queriesOrQueriesId),
  useSetParamValueCallback(queryId, paramId, getArg, [], queriesOrQueriesId),
];
const useParamValuesListener = (
  queryId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    'ParamValues',
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId],
  );
const useParamValueListener = (
  queryId,
  paramId,
  listener,
  listenerDeps,
  queriesOrQueriesId,
) =>
  useListener(
    'ParamValue',
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    listenerDeps,
    [queryId, paramId],
  );
const useSetParamValueCallback = (
  queryId,
  paramId,
  getParamValue,
  getParamValueDeps,
  queriesOrQueriesId,
  then,
  thenDeps,
) =>
  useQueriesSetCallback(
    queriesOrQueriesId,
    'setParamValue',
    getParamValue,
    getParamValueDeps,
    then,
    thenDeps,
    queryId,
    paramId,
  );
const useSetParamValuesCallback = (
  queryId,
  getParamValues,
  getParamValuesDeps,
  queriesOrQueriesId,
  then,
  thenDeps,
) =>
  useQueriesSetCallback(
    queriesOrQueriesId,
    'setParamValues',
    getParamValues,
    getParamValuesDeps,
    then,
    thenDeps,
    queryId,
  );
const useCreateCheckpoints = (store, create, createDeps) =>
  useCreate(store, create, createDeps);
const useCheckpointsIds = () => useThingIds(OFFSET_CHECKPOINTS);
const useCheckpoints = (id) => useThing(id, OFFSET_CHECKPOINTS);
const useCheckpointsOrCheckpointsById = (checkpointsOrCheckpointsId) =>
  useThingOrThingById(checkpointsOrCheckpointsId, OFFSET_CHECKPOINTS);
const useProvideCheckpoints = (checkpointsId, checkpoints) =>
  useProvideThing(checkpointsId, checkpoints, OFFSET_CHECKPOINTS);
const useCheckpointIds = (checkpointsOrCheckpointsId) =>
  useListenable(
    CHECKPOINT + IDS,
    useCheckpointsOrCheckpointsById(checkpointsOrCheckpointsId),
    2 /* Checkpoints */,
  );
const useCheckpoint = (checkpointId, checkpointsOrCheckpointsId) =>
  useListenable(
    CHECKPOINT,
    useCheckpointsOrCheckpointsById(checkpointsOrCheckpointsId),
    5 /* CellOrValue */,
    [checkpointId],
  );
const useSetCheckpointCallback = (
  getCheckpoint = getUndefined,
  getCheckpointDeps = EMPTY_ARRAY,
  checkpointsOrCheckpointsId,
  then = getUndefined,
  thenDeps = EMPTY_ARRAY,
) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  return useCallback(
    (parameter) =>
      ifNotUndefined(checkpoints, (checkpoints2) => {
        const label = getCheckpoint(parameter);
        then(checkpoints2.addCheckpoint(label), checkpoints2, label);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkpoints, ...getCheckpointDeps, ...thenDeps],
  );
};
const useGoBackwardCallback = (checkpointsOrCheckpointsId) =>
  useCheckpointAction(checkpointsOrCheckpointsId, 'goBackward');
const useGoForwardCallback = (checkpointsOrCheckpointsId) =>
  useCheckpointAction(checkpointsOrCheckpointsId, 'goForward');
const useGoToCallback = (
  getCheckpointId,
  getCheckpointIdDeps = EMPTY_ARRAY,
  checkpointsOrCheckpointsId,
  then = getUndefined,
  thenDeps = EMPTY_ARRAY,
) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  return useCallback(
    (parameter) =>
      ifNotUndefined(checkpoints, (checkpoints2) =>
        ifNotUndefined(getCheckpointId(parameter), (checkpointId) =>
          then(checkpoints2.goTo(checkpointId), checkpointId),
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkpoints, ...getCheckpointIdDeps, ...thenDeps],
  );
};
const useUndoInformation = (checkpointsOrCheckpointsId) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  const [backwardIds, currentId] = useCheckpointIds(checkpoints);
  return [
    !arrayIsEmpty(backwardIds),
    useGoBackwardCallback(checkpoints),
    currentId,
    ifNotUndefined(currentId, (id) => checkpoints?.getCheckpoint(id)) ??
      EMPTY_STRING,
  ];
};
const useRedoInformation = (checkpointsOrCheckpointsId) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  const [, , [forwardId]] = useCheckpointIds(checkpoints);
  return [
    !isUndefined(forwardId),
    useGoForwardCallback(checkpoints),
    forwardId,
    ifNotUndefined(forwardId, (id) => checkpoints?.getCheckpoint(id)) ??
      EMPTY_STRING,
  ];
};
const useCheckpointIdsListener = (
  listener,
  listenerDeps,
  checkpointsOrCheckpointsId,
) =>
  useListener(
    CHECKPOINT + IDS,
    useCheckpointsOrCheckpointsById(checkpointsOrCheckpointsId),
    listener,
    listenerDeps,
  );
const useCheckpointListener = (
  checkpointId,
  listener,
  listenerDeps,
  checkpointsOrCheckpointsId,
) =>
  useListener(
    CHECKPOINT,
    useCheckpointsOrCheckpointsById(checkpointsOrCheckpointsId),
    listener,
    listenerDeps,
    [checkpointId],
  );
const useCreatePersister = (
  store,
  create,
  createDeps = EMPTY_ARRAY,
  then,
  thenDeps = EMPTY_ARRAY,
  destroy,
  destroyDeps = EMPTY_ARRAY,
) => {
  const [, rerender] = useState();
  const [persister, setPersister] = useState();
  useEffect(
    () => {
      (async () => {
        const persister2 = store ? await create(store) : void 0;
        setPersister(persister2);
        if (persister2 && then) {
          (async () => {
            await then(persister2);
            rerender([]);
          })();
        }
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, ...createDeps, ...thenDeps],
  );
  useEffect(
    () => () => {
      if (persister) {
        persister.destroy();
        destroy?.(persister);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [persister, ...destroyDeps],
  );
  return persister;
};
const usePersisterIds = () => useThingIds(OFFSET_PERSISTER);
const usePersister = (id) => useThing(id, OFFSET_PERSISTER);
const usePersisterOrPersisterById = (persisterOrPersisterId) =>
  useThingOrThingById(persisterOrPersisterId, OFFSET_PERSISTER);
const useProvidePersister = (persisterId, persister) =>
  useProvideThing(persisterId, persister, OFFSET_PERSISTER);
const usePersisterStatus = (persisterOrPersisterId) =>
  useListenable(
    STATUS,
    usePersisterOrPersisterById(persisterOrPersisterId),
    7 /* Number */,
    [],
  );
const usePersisterStatusListener = (
  listener,
  listenerDeps,
  persisterOrPersisterId,
) =>
  useListener(
    STATUS,
    usePersisterOrPersisterById(persisterOrPersisterId),
    listener,
    listenerDeps,
    [],
  );
const useCreateSynchronizer = (
  store,
  create,
  createDeps = EMPTY_ARRAY,
  destroy,
  destroyDeps = EMPTY_ARRAY,
) => {
  const [synchronizer, setSynchronizer] = useState();
  useEffect(
    () => {
      (async () => {
        const synchronizer2 = store ? await create(store) : void 0;
        setSynchronizer(synchronizer2);
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, ...createDeps],
  );
  useEffect(
    () => () => {
      if (synchronizer) {
        synchronizer.destroy();
        destroy?.(synchronizer);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [synchronizer, ...destroyDeps],
  );
  return synchronizer;
};
const useSynchronizerIds = () => useThingIds(OFFSET_SYNCHRONIZER);
const useSynchronizer = (id) => useThing(id, OFFSET_SYNCHRONIZER);
const useSynchronizerOrSynchronizerById = (synchronizerOrSynchronizerId) =>
  useThingOrThingById(synchronizerOrSynchronizerId, OFFSET_SYNCHRONIZER);
const useProvideSynchronizer = (persisterId, persister) =>
  useProvideThing(persisterId, persister, OFFSET_SYNCHRONIZER);
const useSynchronizerStatus = (synchronizerOrSynchronizerId) =>
  useListenable(
    STATUS,
    useSynchronizerOrSynchronizerById(synchronizerOrSynchronizerId),
    7 /* Number */,
    [],
  );
const useSynchronizerStatusListener = (
  listener,
  listenerDeps,
  synchronizerOrSynchronizerId,
) =>
  useListener(
    STATUS,
    useSynchronizerOrSynchronizerById(synchronizerOrSynchronizerId),
    listener,
    listenerDeps,
    [],
  );

const Wrap = ({children, separator, debugIds, id}) => {
  const separated =
    isUndefined(separator) || !isArray(children)
      ? children
      : arrayMap(children, (child, c) => (c > 0 ? [separator, child] : child));
  return debugIds && !isUndefined(id) ? [id, ':{', separated, '}'] : separated;
};

const CheckpointView = ({checkpoints, checkpointId, debugIds}) =>
  /* @__PURE__ */ jsx(Wrap, {
    debugIds,
    id: checkpointId,
    children: useCheckpoint(checkpointId, checkpoints) ?? EMPTY_STRING,
  });

const ResultCellView = ({queryId, rowId, cellId, queries, debugIds}) =>
  /* @__PURE__ */ jsx(Wrap, {
    debugIds,
    id: cellId,
    children:
      EMPTY_STRING +
      (useResultCell(queryId, rowId, cellId, queries) ?? EMPTY_STRING),
  });

const ResultRowView = ({
  queryId,
  rowId,
  queries,
  resultCellComponent: ResultCell = ResultCellView,
  getResultCellComponentProps,
  separator,
  debugIds,
}) =>
  /* @__PURE__ */ jsx(Wrap, {
    separator,
    debugIds,
    id: rowId,
    children: arrayMap(useResultCellIds(queryId, rowId, queries), (cellId) =>
      /* @__PURE__ */ jsx(
        ResultCell,
        {
          ...getProps(getResultCellComponentProps, cellId),
          queryId,
          rowId,
          cellId,
          queries,
          debugIds,
        },
        cellId,
      ),
    ),
  });

const CellView = ({tableId, rowId, cellId, store, debugIds}) =>
  /* @__PURE__ */ jsx(Wrap, {
    debugIds,
    id: cellId,
    children:
      EMPTY_STRING + (useCell(tableId, rowId, cellId, store) ?? EMPTY_STRING),
  });

const useCustomOrDefaultCellIds = (customCellIds, tableId, rowId, store) => {
  const defaultCellIds = useCellIds(tableId, rowId, store);
  return customCellIds ?? defaultCellIds;
};

const RowView = ({
  tableId,
  rowId,
  store,
  cellComponent: Cell = CellView,
  getCellComponentProps,
  customCellIds,
  separator,
  debugIds,
}) =>
  /* @__PURE__ */ jsx(Wrap, {
    separator,
    debugIds,
    id: rowId,
    children: arrayMap(
      useCustomOrDefaultCellIds(customCellIds, tableId, rowId, store),
      (cellId) =>
        /* @__PURE__ */ jsx(
          Cell,
          {
            ...getProps(getCellComponentProps, cellId),
            tableId,
            rowId,
            cellId,
            store,
            debugIds,
          },
          cellId,
        ),
    ),
  });

const tableView = (
  {
    tableId,
    store,
    rowComponent: Row = RowView,
    getRowComponentProps,
    customCellIds,
    separator,
    debugIds,
  },
  rowIds,
) =>
  /* @__PURE__ */ jsx(Wrap, {
    separator,
    debugIds,
    id: tableId,
    children: arrayMap(rowIds, (rowId) =>
      /* @__PURE__ */ jsx(
        Row,
        {
          ...getProps(getRowComponentProps, rowId),
          tableId,
          rowId,
          customCellIds,
          store,
          debugIds,
        },
        rowId,
      ),
    ),
  });
const resultTableView = (
  {
    queryId,
    queries,
    resultRowComponent: ResultRow = ResultRowView,
    getResultRowComponentProps,
    separator,
    debugIds,
  },
  rowIds,
) =>
  /* @__PURE__ */ jsx(Wrap, {
    separator,
    debugIds,
    id: queryId,
    children: arrayMap(rowIds, (rowId) =>
      /* @__PURE__ */ jsx(
        ResultRow,
        {
          ...getProps(getResultRowComponentProps, rowId),
          queryId,
          rowId,
          queries,
          debugIds,
        },
        rowId,
      ),
    ),
  });
const useComponentPerRow = (
  {
    relationshipId,
    relationships,
    rowComponent: Row = RowView,
    getRowComponentProps,
    separator,
    debugIds,
  },
  getRowIdsHook,
  rowId,
) => {
  const [resolvedRelationships, store, localTableId] =
    getRelationshipsStoreTableIds(
      useRelationshipsOrRelationshipsById(relationships),
      relationshipId,
    );
  const rowIds = getRowIdsHook(relationshipId, rowId, resolvedRelationships);
  return /* @__PURE__ */ jsx(Wrap, {
    separator,
    debugIds,
    id: rowId,
    children: arrayMap(rowIds, (rowId2) =>
      /* @__PURE__ */ jsx(
        Row,
        {
          ...getProps(getRowComponentProps, rowId2),
          tableId: localTableId,
          rowId: rowId2,
          store,
          debugIds,
        },
        rowId2,
      ),
    ),
  });
};
const getUseCheckpointView =
  (getCheckpoints) =>
  ({
    checkpoints,
    checkpointComponent: Checkpoint = CheckpointView,
    getCheckpointComponentProps,
    separator,
    debugIds,
  }) => {
    const resolvedCheckpoints = useCheckpointsOrCheckpointsById(checkpoints);
    return /* @__PURE__ */ jsx(Wrap, {
      separator,
      children: arrayMap(
        getCheckpoints(useCheckpointIds(resolvedCheckpoints)),
        (checkpointId) =>
          /* @__PURE__ */ jsx(
            Checkpoint,
            {
              ...getProps(getCheckpointComponentProps, checkpointId),
              checkpoints: resolvedCheckpoints,
              checkpointId,
              debugIds,
            },
            checkpointId,
          ),
      ),
    });
  };

const BackwardCheckpointsView = getUseCheckpointView(
  (checkpointIds) => checkpointIds[0],
);

const CurrentCheckpointView = getUseCheckpointView((checkpointIds) =>
  isNullish(checkpointIds[1]) ? [] : [checkpointIds[1]],
);

const ForwardCheckpointsView = getUseCheckpointView(
  (checkpointIds) => checkpointIds[2],
);

const SliceView = ({
  indexId,
  sliceId,
  indexes,
  rowComponent: Row = RowView,
  getRowComponentProps,
  separator,
  debugIds,
}) => {
  const [resolvedIndexes, store, tableId] = getIndexStoreTableId(
    useIndexesOrIndexesById(indexes),
    indexId,
  );
  const rowIds = useSliceRowIds(indexId, sliceId, resolvedIndexes);
  return /* @__PURE__ */ jsx(Wrap, {
    separator,
    debugIds,
    id: sliceId,
    children: arrayMap(rowIds, (rowId) =>
      /* @__PURE__ */ jsx(
        Row,
        {
          ...getProps(getRowComponentProps, rowId),
          tableId,
          rowId,
          store,
          debugIds,
        },
        rowId,
      ),
    ),
  });
};

const IndexView = ({
  indexId,
  indexes,
  sliceComponent: Slice = SliceView,
  getSliceComponentProps,
  separator,
  debugIds,
}) =>
  /* @__PURE__ */ jsx(Wrap, {
    separator,
    debugIds,
    id: indexId,
    children: arrayMap(useSliceIds(indexId, indexes), (sliceId) =>
      /* @__PURE__ */ jsx(
        Slice,
        {
          ...getProps(getSliceComponentProps, sliceId),
          indexId,
          sliceId,
          indexes,
          debugIds,
        },
        sliceId,
      ),
    ),
  });

const LinkedRowsView = (props) =>
  useComponentPerRow(props, useLinkedRowIds, props.firstRowId);

const LocalRowsView = (props) =>
  useComponentPerRow(props, useLocalRowIds, props.remoteRowId);

const MetricView = ({metricId, metrics, debugIds}) =>
  /* @__PURE__ */ jsx(Wrap, {
    debugIds,
    id: metricId,
    children: useMetric(metricId, metrics) ?? EMPTY_STRING,
  });

const RemoteRowView = ({
  relationshipId,
  localRowId,
  relationships,
  rowComponent: Row = RowView,
  getRowComponentProps,
  debugIds,
}) => {
  const [resolvedRelationships, store, , remoteTableId] =
    getRelationshipsStoreTableIds(
      useRelationshipsOrRelationshipsById(relationships),
      relationshipId,
    );
  const rowId = useRemoteRowId(
    relationshipId,
    localRowId,
    resolvedRelationships,
  );
  return /* @__PURE__ */ jsx(Wrap, {
    debugIds,
    id: localRowId,
    children:
      isUndefined(remoteTableId) || isUndefined(rowId)
        ? null
        : /* @__PURE__ */ jsx(
            Row,
            {
              ...getProps(getRowComponentProps, rowId),
              tableId: remoteTableId,
              rowId,
              store,
              debugIds,
            },
            rowId,
          ),
  });
};

const ResultSortedTableView = ({cellId, descending, offset, limit, ...props}) =>
  resultTableView(
    props,
    useResultSortedRowIds(
      props.queryId,
      cellId,
      descending,
      offset,
      limit,
      props.queries,
    ),
  );

const ResultTableView = (props) =>
  resultTableView(props, useResultRowIds(props.queryId, props.queries));

const SortedTableView = ({cellId, descending, offset, limit, ...props}) =>
  tableView(
    props,
    useSortedRowIds(
      props.tableId,
      cellId,
      descending,
      offset,
      limit,
      props.store,
    ),
  );

const TableView = (props) =>
  tableView(props, useRowIds(props.tableId, props.store));

const TablesView = ({
  store,
  tableComponent: Table = TableView,
  getTableComponentProps,
  separator,
  debugIds,
}) =>
  /* @__PURE__ */ jsx(Wrap, {
    separator,
    children: arrayMap(useTableIds(store), (tableId) =>
      /* @__PURE__ */ jsx(
        Table,
        {
          ...getProps(getTableComponentProps, tableId),
          tableId,
          store,
          debugIds,
        },
        tableId,
      ),
    ),
  });

const ValueView = ({valueId, store, debugIds}) =>
  /* @__PURE__ */ jsx(Wrap, {
    debugIds,
    id: valueId,
    children: EMPTY_STRING + (useValue(valueId, store) ?? EMPTY_STRING),
  });

const ValuesView = ({
  store,
  valueComponent: Value = ValueView,
  getValueComponentProps,
  separator,
  debugIds,
}) =>
  /* @__PURE__ */ jsx(Wrap, {
    separator,
    children: arrayMap(useValueIds(store), (valueId) =>
      /* @__PURE__ */ jsx(
        Value,
        {
          ...getProps(getValueComponentProps, valueId),
          valueId,
          store,
          debugIds,
        },
        valueId,
      ),
    ),
  });

export {
  BackwardCheckpointsView,
  CellView,
  CheckpointView,
  CurrentCheckpointView,
  ForwardCheckpointsView,
  IndexView,
  LinkedRowsView,
  LocalRowsView,
  MetricView,
  OFFSET_CHECKPOINTS,
  OFFSET_INDEXES,
  OFFSET_METRICS,
  OFFSET_PERSISTER,
  OFFSET_QUERIES,
  OFFSET_RELATIONSHIPS,
  OFFSET_STORE,
  OFFSET_SYNCHRONIZER,
  Provider,
  RemoteRowView,
  ResultCellView,
  ResultRowView,
  ResultSortedTableView,
  ResultTableView,
  RowView,
  SliceView,
  SortedTableView,
  TablesView,
  TableView,
  useAddRowCallback,
  useCell,
  useCellIds,
  useCellIdsListener,
  useCellListener,
  useCellState,
  useCheckpoint,
  useCheckpointIds,
  useCheckpointIdsListener,
  useCheckpointListener,
  useCheckpoints,
  useCheckpointsIds,
  useCheckpointsOrCheckpointsById,
  useCreateCheckpoints,
  useCreateIndexes,
  useCreateMergeableStore,
  useCreateMetrics,
  useCreatePersister,
  useCreateQueries,
  useCreateRelationships,
  useCreateStore,
  useCreateSynchronizer,
  useDelCellCallback,
  useDelRowCallback,
  useDelTableCallback,
  useDelTablesCallback,
  useDelValueCallback,
  useDelValuesCallback,
  useDidFinishTransactionListener,
  useGoBackwardCallback,
  useGoForwardCallback,
  useGoToCallback,
  useHasCell,
  useHasCellListener,
  useHasRow,
  useHasRowListener,
  useHasTable,
  useHasTableCell,
  useHasTableCellListener,
  useHasTableListener,
  useHasTables,
  useHasTablesListener,
  useHasValue,
  useHasValueListener,
  useHasValues,
  useHasValuesListener,
  useIndexes,
  useIndexesIds,
  useIndexesOrIndexesById,
  useIndexIds,
  useLinkedRowIds,
  useLinkedRowIdsListener,
  useLocalRowIds,
  useLocalRowIdsListener,
  useMetric,
  useMetricIds,
  useMetricListener,
  useMetrics,
  useMetricsIds,
  useMetricsOrMetricsById,
  useParamValue,
  useParamValueListener,
  useParamValues,
  useParamValuesListener,
  useParamValuesState,
  useParamValueState,
  usePersister,
  usePersisterIds,
  usePersisterOrPersisterById,
  usePersisterStatus,
  usePersisterStatusListener,
  useProvideCheckpoints,
  useProvideIndexes,
  useProvideMetrics,
  useProvidePersister,
  useProvideQueries,
  useProvideRelationships,
  useProvideStore,
  useProvideSynchronizer,
  useQueries,
  useQueriesIds,
  useQueriesOrQueriesById,
  useQueryIds,
  useRedoInformation,
  useRelationshipIds,
  useRelationships,
  useRelationshipsIds,
  useRelationshipsOrRelationshipsById,
  useRemoteRowId,
  useRemoteRowIdListener,
  useResultCell,
  useResultCellIds,
  useResultCellIdsListener,
  useResultCellListener,
  useResultRow,
  useResultRowCount,
  useResultRowCountListener,
  useResultRowIds,
  useResultRowIdsListener,
  useResultRowListener,
  useResultSortedRowIds,
  useResultSortedRowIdsListener,
  useResultTable,
  useResultTableCellIds,
  useResultTableCellIdsListener,
  useResultTableListener,
  useRow,
  useRowCount,
  useRowCountListener,
  useRowIds,
  useRowIdsListener,
  useRowListener,
  useRowState,
  useSetCellCallback,
  useSetCheckpointCallback,
  useSetParamValueCallback,
  useSetParamValuesCallback,
  useSetPartialRowCallback,
  useSetPartialValuesCallback,
  useSetRowCallback,
  useSetTableCallback,
  useSetTablesCallback,
  useSetValueCallback,
  useSetValuesCallback,
  useSliceIds,
  useSliceIdsListener,
  useSliceRowIds,
  useSliceRowIdsListener,
  useSortedRowIds,
  useSortedRowIdsListener,
  useSortedRowIdsListenerImpl,
  useStartTransactionListener,
  useStore,
  useStoreIds,
  useStoreOrStoreById,
  useStores,
  useSynchronizer,
  useSynchronizerIds,
  useSynchronizerOrSynchronizerById,
  useSynchronizerStatus,
  useSynchronizerStatusListener,
  useTable,
  useTableCellIds,
  useTableCellIdsListener,
  useTableIds,
  useTableIdsListener,
  useTableListener,
  useTables,
  useTablesListener,
  useTablesState,
  useTableState,
  useUndoInformation,
  useValue,
  useValueIds,
  useValueIdsListener,
  useValueListener,
  useValues,
  useValuesListener,
  useValuesState,
  useValueState,
  useWillFinishTransactionListener,
  ValuesView,
  ValueView,
};
