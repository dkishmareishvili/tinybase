import {
  createContext,
  createEffect,
  createMemo,
  createRenderEffect,
  createSignal,
  onCleanup,
  untrack,
  useContext,
} from 'solid-js';
import {createComponent, memo, mergeProps} from 'solid-js/web';

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

const getValue = (value) => (isFunction(value) ? value() : value);
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

const TINYBASE_CONTEXT = TINYBASE + '_uisc';
const EMPTY_CONTEXT$1 = () => [];
const EMPTY_CONTEXT_VALUE = {value: EMPTY_CONTEXT$1};
const GLOBAL_CONTEXT = GLOBAL;
const Context = GLOBAL_CONTEXT[TINYBASE_CONTEXT]
  ? /* istanbul ignore next */
    GLOBAL_CONTEXT[TINYBASE_CONTEXT]
  : (GLOBAL_CONTEXT[TINYBASE_CONTEXT] = createContext(EMPTY_CONTEXT_VALUE));
const useThing = (id, offset) => {
  const contextValue = useContext(Context)?.value ?? EMPTY_CONTEXT$1;
  return () => {
    const resolvedContextValue = contextValue();
    const resolvedId = getValue(id);
    return isUndefined(resolvedId)
      ? resolvedContextValue[offset * 2]
      : isString(resolvedId)
        ? objGet(resolvedContextValue[offset * 2 + 1], resolvedId)
        : resolvedId;
  };
};
const useThings = (offset) => {
  const contextValue = useContext(Context)?.value ?? EMPTY_CONTEXT$1;
  return () => ({...contextValue()[offset * 2 + 1]});
};
const useThingOrThingById = (thingOrThingId, offset) => {
  const thing = useThing(thingOrThingId, offset);
  return () => {
    const resolvedThingOrThingId = getValue(thingOrThingId);
    return isUndefined(resolvedThingOrThingId) ||
      isString(resolvedThingOrThingId)
      ? thing()
      : resolvedThingOrThingId;
  };
};
const useProvideThing = (thingId, thing, offset) => {
  const contextValue = useContext(Context)?.value ?? EMPTY_CONTEXT$1;
  createRenderEffect(() => {
    const {16: addExtraThingById, 17: delExtraThingById} =
      untrack(contextValue);
    addExtraThingById?.(offset, thingId, thing);
    onCleanup(() => delExtraThingById?.(offset, thingId));
  });
};
const useThingIds = (offset) => {
  const contextValue = useContext(Context)?.value ?? EMPTY_CONTEXT$1;
  return () => objIds(contextValue()[offset * 2 + 1] ?? {});
};

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
const EMPTY_CONTEXT = () => [];
const Provider = (props) => {
  const parentValue = useContext(Context)?.value ?? EMPTY_CONTEXT;
  const [extraThingsById, setExtraThingsById] = createSignal(
    arrayNew(8, () => ({})),
  );
  const addExtraThingById = (thingOffset, id, thing) => {
    setExtraThingsById((extraThingsById2) =>
      objGet(extraThingsById2[thingOffset], id) == thing
        ? extraThingsById2
        : arrayWith(extraThingsById2, thingOffset, {
            ...extraThingsById2[thingOffset],
            [id]: thing,
          }),
    );
  };
  const delExtraThingById = (thingOffset, id) => {
    setExtraThingsById((extraThingsById2) =>
      !objHas(extraThingsById2[thingOffset], id)
        ? extraThingsById2
        : arrayWith(
            extraThingsById2,
            thingOffset,
            objDel(extraThingsById2[thingOffset], id),
          ),
    );
  };
  const contextValue = createMemo(() => [
    ...mergeParentThings(
      OFFSET_STORE,
      parentValue(),
      props.store,
      props.storesById,
      extraThingsById(),
    ),
    ...mergeParentThings(
      OFFSET_METRICS,
      parentValue(),
      props.metrics,
      props.metricsById,
      extraThingsById(),
    ),
    ...mergeParentThings(
      OFFSET_INDEXES,
      parentValue(),
      props.indexes,
      props.indexesById,
      extraThingsById(),
    ),
    ...mergeParentThings(
      OFFSET_RELATIONSHIPS,
      parentValue(),
      props.relationships,
      props.relationshipsById,
      extraThingsById(),
    ),
    ...mergeParentThings(
      OFFSET_QUERIES,
      parentValue(),
      props.queries,
      props.queriesById,
      extraThingsById(),
    ),
    ...mergeParentThings(
      OFFSET_CHECKPOINTS,
      parentValue(),
      props.checkpoints,
      props.checkpointsById,
      extraThingsById(),
    ),
    ...mergeParentThings(
      OFFSET_PERSISTER,
      parentValue(),
      props.persister,
      props.persistersById,
      extraThingsById(),
    ),
    ...mergeParentThings(
      OFFSET_SYNCHRONIZER,
      parentValue(),
      props.synchronizer,
      props.synchronizersById,
      extraThingsById(),
    ),
    addExtraThingById,
    delExtraThingById,
  ]);
  return createComponent(Context.Provider, {
    value: {
      value: contextValue,
    },
    get children() {
      return props.children;
    },
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
const IS_EQUALS = [
  objIsEqual,
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
];
const isEqual = (thing1, thing2) => thing1 === thing2;
const getThing = (thing) => (isFunction(thing) ? thing() : thing);
const EMPTY_LISTENER_ARG_GETTERS = [];
const useCreate = (store, create) => {
  const [thing, setThing] = createSignal();
  createEffect(() => {
    const resolvedStore = getThing(store);
    const newThing = resolvedStore ? create(resolvedStore) : void 0;
    setThing(() => newThing);
    onCleanup(() => newThing?.destroy?.());
  });
  return thing;
};
const addAndDelListener = (thing, listenable, ...args) => {
  const listenerId = thing?.[ADD + listenable + LISTENER]?.(...args);
  return () => thing?.delListener?.(listenerId);
};
const useListenable = (
  listenable,
  thing,
  returnType,
  listenerArgGetters = EMPTY_LISTENER_ARG_GETTERS,
) => {
  const [result, setResult] = createSignal(DEFAULTS[returnType]);
  const getListenerArguments = () => arrayMap(listenerArgGetters, getThing);
  const getResult = () =>
    getThing(thing)?.[
      (returnType == 6 /* Boolean */ ? _HAS : GET) + listenable
    ]?.(...getListenerArguments()) ?? DEFAULTS[returnType];
  const updateResult = () => {
    const nextResult = getResult();
    const prevResult = untrack(result);
    setResult(() =>
      !(IS_EQUALS[returnType] ?? isEqual)(nextResult, prevResult)
        ? nextResult
        : prevResult,
    );
  };
  createRenderEffect(() => {
    const resolvedThing = getThing(thing);
    const listenerArguments = getListenerArguments();
    updateResult();
    const cleanup = addAndDelListener(
      resolvedThing,
      (returnType == 6 /* Boolean */ ? HAS : EMPTY_STRING) + listenable,
      ...listenerArguments,
      updateResult,
    );
    onCleanup(cleanup);
  });
  return result;
};
const useListener = (
  listenable,
  thing,
  listener,
  preListenerArgGetters = EMPTY_LISTENER_ARG_GETTERS,
  ...postListenerArgGetters
) =>
  createRenderEffect(() => {
    const cleanup = addAndDelListener(
      getThing(thing),
      listenable,
      ...arrayMap(preListenerArgGetters, getThing),
      listener,
      ...arrayMap(postListenerArgGetters, getThing),
    );
    onCleanup(cleanup);
  });
const useSetCallback =
  (storeOrQueries, settable, get, then = getUndefined, methodPrefix, ...args) =>
  (parameter) =>
    ifNotUndefined(getThing(storeOrQueries), (obj) =>
      ifNotUndefined(get(parameter, obj), (thing) =>
        then(
          obj[methodPrefix + settable](
            ...argsOrGetArgs(args, obj, parameter),
            thing,
          ),
          thing,
        ),
      ),
    );
const useStoreSetCallback = (storeOrStoreId, settable, get, then, ...args) =>
  useSetCallback(
    useStoreOrStoreById(storeOrStoreId),
    settable,
    get,
    then,
    SET,
    ...args,
  );
const useQueriesSetCallback = (
  queriesOrQueriesId,
  settable,
  get,
  then,
  ...args
) =>
  useSetCallback(
    useQueriesOrQueriesById(queriesOrQueriesId),
    settable,
    get,
    then,
    EMPTY_STRING,
    ...args,
  );
const argsOrGetArgs = (args, store, parameter) =>
  arrayMap(args, (arg) =>
    isFunction(arg)
      ? arg.length == 0
        ? getThing(arg)
        : arg(parameter, store)
      : arg,
  );
const useDel = (storeOrStoreId, deletable, then = getUndefined, ...args) => {
  const store = useStoreOrStoreById(storeOrStoreId);
  return (parameter) => {
    const resolvedStore = getThing(store);
    ifNotUndefined(resolvedStore, (store2) =>
      then(store2[DEL + deletable](...argsOrGetArgs(args, store2, parameter))),
    );
  };
};
const useCheckpointAction = (checkpointsOrCheckpointsId, action, arg) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  return () => getThing(checkpoints)?.[action](arg);
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
  mutator,
  storeOrStoreId,
) =>
  useListener(
    SORTED_ROW_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId, cellId, descending, offset, limit],
    mutator,
  );
const useCreateStore = (create) => {
  const store = createMemo(create);
  return store;
};
const useStoreIds = () => useThingIds(OFFSET_STORE);
const useStore = (id) => useThing(id, OFFSET_STORE);
const useStores = () => useThings(OFFSET_STORE);
const useStoreOrStoreById = (storeOrStoreId) =>
  useThingOrThingById(storeOrStoreId, OFFSET_STORE);
const useProvideStore = (storeId, store) =>
  useProvideThing(storeId, store, OFFSET_STORE);
const useCreateMergeableStore = (create) => {
  const mergeableStore = createMemo(create);
  return mergeableStore;
};
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
  useSetTablesCallback(getArg, storeOrStoreId),
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
  useSetTableCallback(tableId, getArg, storeOrStoreId),
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
  isObject(tableIdOrArgs)
    ? useSortedRowIdsImpl(
        tableIdOrArgs.tableId,
        tableIdOrArgs.cellId,
        tableIdOrArgs.descending ?? false,
        tableIdOrArgs.offset ?? 0,
        tableIdOrArgs.limit,
        cellIdOrStoreOrStoreId,
      )
    : useSortedRowIdsImpl(
        tableIdOrArgs,
        cellIdOrStoreOrStoreId,
        descending,
        offset,
        limit,
        storeOrStoreId,
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
  useSetRowCallback(tableId, rowId, getArg, storeOrStoreId),
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
  useSetCellCallback(tableId, rowId, cellId, getArg, storeOrStoreId),
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
  useSetValuesCallback(getArg, storeOrStoreId),
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
  useSetValueCallback(valueId, getArg, storeOrStoreId),
];
const useSetTablesCallback = (getTables, storeOrStoreId, then) =>
  useStoreSetCallback(storeOrStoreId, TABLES, getTables, then);
const useSetTableCallback = (tableId, getTable, storeOrStoreId, then) =>
  useStoreSetCallback(storeOrStoreId, TABLE, getTable, then, tableId);
const useSetRowCallback = (tableId, rowId, getRow, storeOrStoreId, then) =>
  useStoreSetCallback(storeOrStoreId, ROW, getRow, then, tableId, rowId);
const useAddRowCallback = (
  tableId,
  getRow,
  storeOrStoreId,
  then = getUndefined,
  reuseRowIds = true,
) => {
  const store = useStoreOrStoreById(storeOrStoreId);
  return (parameter) =>
    ifNotUndefined(getThing(store), (resolvedStore) =>
      ifNotUndefined(getRow(parameter, resolvedStore), (row) =>
        then(
          resolvedStore.addRow(
            isFunction(tableId) ? tableId(parameter, resolvedStore) : tableId,
            row,
            reuseRowIds,
          ),
          resolvedStore,
          row,
        ),
      ),
    );
};
const useSetPartialRowCallback = (
  tableId,
  rowId,
  getPartialRow,
  storeOrStoreId,
  then,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    PARTIAL + ROW,
    getPartialRow,
    then,
    tableId,
    rowId,
  );
const useSetCellCallback = (
  tableId,
  rowId,
  cellId,
  getCell,
  storeOrStoreId,
  then,
) =>
  useStoreSetCallback(
    storeOrStoreId,
    CELL,
    getCell,
    then,
    tableId,
    rowId,
    cellId,
  );
const useSetValuesCallback = (getValues, storeOrStoreId, then) =>
  useStoreSetCallback(storeOrStoreId, VALUES, getValues, then);
const useSetPartialValuesCallback = (getPartialValues, storeOrStoreId, then) =>
  useStoreSetCallback(storeOrStoreId, PARTIAL + VALUES, getPartialValues, then);
const useSetValueCallback = (valueId, getValue, storeOrStoreId, then) =>
  useStoreSetCallback(storeOrStoreId, VALUE, getValue, then, valueId);
const useDelTablesCallback = (storeOrStoreId, then) =>
  useDel(storeOrStoreId, TABLES, then);
const useDelTableCallback = (tableId, storeOrStoreId, then) =>
  useDel(storeOrStoreId, TABLE, then, tableId);
const useDelRowCallback = (tableId, rowId, storeOrStoreId, then) =>
  useDel(storeOrStoreId, ROW, then, tableId, rowId);
const useDelCellCallback = (
  tableId,
  rowId,
  cellId,
  forceDel,
  storeOrStoreId,
  then,
) => useDel(storeOrStoreId, CELL, then, tableId, rowId, cellId, forceDel);
const useDelValuesCallback = (storeOrStoreId, then) =>
  useDel(storeOrStoreId, VALUES, then);
const useDelValueCallback = (valueId, storeOrStoreId, then) =>
  useDel(storeOrStoreId, VALUE, then, valueId);
const useHasTablesListener = (listener, mutator, storeOrStoreId) =>
  useListener(
    HAS + TABLES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [],
    mutator,
  );
const useTablesListener = (listener, mutator, storeOrStoreId) =>
  useListener(
    TABLES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    EMPTY_LISTENER_ARG_GETTERS,
    mutator,
  );
const useTableIdsListener = (listener, mutator, storeOrStoreId) =>
  useListener(
    TABLE_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    EMPTY_LISTENER_ARG_GETTERS,
    mutator,
  );
const useHasTableListener = (tableId, listener, mutator, storeOrStoreId) =>
  useListener(
    HAS + TABLE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId],
    mutator,
  );
const useTableListener = (tableId, listener, mutator, storeOrStoreId) =>
  useListener(
    TABLE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId],
    mutator,
  );
const useTableCellIdsListener = (tableId, listener, mutator, storeOrStoreId) =>
  useListener(
    TABLE + CELL_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId],
    mutator,
  );
const useHasTableCellListener = (
  tableId,
  cellId,
  listener,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + TABLE + CELL,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId, cellId],
    mutator,
  );
const useRowCountListener = (tableId, listener, mutator, storeOrStoreId) =>
  useListener(
    ROW_COUNT,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId],
    mutator,
  );
const useRowIdsListener = (tableId, listener, mutator, storeOrStoreId) =>
  useListener(
    ROW_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId],
    mutator,
  );
const useSortedRowIdsListener = (
  tableIdOrArgs,
  cellIdOrListener,
  descendingOrMutator,
  offsetOrStoreOrStoreId,
  limit,
  listener,
  mutator,
  storeOrStoreId,
) =>
  isObject(tableIdOrArgs)
    ? useSortedRowIdsListenerImpl(
        tableIdOrArgs.tableId,
        tableIdOrArgs.cellId,
        tableIdOrArgs.descending ?? false,
        tableIdOrArgs.offset ?? 0,
        tableIdOrArgs.limit,
        cellIdOrListener,
        descendingOrMutator,
        offsetOrStoreOrStoreId,
      )
    : useSortedRowIdsListenerImpl(
        tableIdOrArgs,
        cellIdOrListener,
        descendingOrMutator ?? false,
        offsetOrStoreOrStoreId ?? 0,
        limit,
        listener,
        mutator,
        storeOrStoreId,
      );
const useHasRowListener = (tableId, rowId, listener, mutator, storeOrStoreId) =>
  useListener(
    HAS + ROW,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId, rowId],
    mutator,
  );
const useRowListener = (tableId, rowId, listener, mutator, storeOrStoreId) =>
  useListener(
    ROW,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId, rowId],
    mutator,
  );
const useCellIdsListener = (
  tableId,
  rowId,
  listener,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    CELL_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId, rowId],
    mutator,
  );
const useHasCellListener = (
  tableId,
  rowId,
  cellId,
  listener,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    HAS + CELL,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId, rowId, cellId],
    mutator,
  );
const useCellListener = (
  tableId,
  rowId,
  cellId,
  listener,
  mutator,
  storeOrStoreId,
) =>
  useListener(
    CELL,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [tableId, rowId, cellId],
    mutator,
  );
const useHasValuesListener = (listener, mutator, storeOrStoreId) =>
  useListener(
    HAS + VALUES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [],
    mutator,
  );
const useValuesListener = (listener, mutator, storeOrStoreId) =>
  useListener(
    VALUES,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    EMPTY_LISTENER_ARG_GETTERS,
    mutator,
  );
const useValueIdsListener = (listener, mutator, storeOrStoreId) =>
  useListener(
    VALUE_IDS,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    EMPTY_LISTENER_ARG_GETTERS,
    mutator,
  );
const useHasValueListener = (valueId, listener, mutator, storeOrStoreId) =>
  useListener(
    HAS + VALUE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [valueId],
    mutator,
  );
const useValueListener = (valueId, listener, mutator, storeOrStoreId) =>
  useListener(
    VALUE,
    useStoreOrStoreById(storeOrStoreId),
    listener,
    [valueId],
    mutator,
  );
const useStartTransactionListener = (listener, storeOrStoreId) =>
  useListener(
    'Start' + TRANSACTION,
    useStoreOrStoreById(storeOrStoreId),
    listener,
  );
const useWillFinishTransactionListener = (listener, storeOrStoreId) =>
  useListener(
    'Will' + FINISH + TRANSACTION,
    useStoreOrStoreById(storeOrStoreId),
    listener,
  );
const useDidFinishTransactionListener = (listener, storeOrStoreId) =>
  useListener(
    'Did' + FINISH + TRANSACTION,
    useStoreOrStoreById(storeOrStoreId),
    listener,
  );
const useCreateMetrics = (store, create) => useCreate(store, create);
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
const useMetricListener = (metricId, listener, metricsOrMetricsId) =>
  useListener(METRIC, useMetricsOrMetricsById(metricsOrMetricsId), listener, [
    metricId,
  ]);
const useCreateIndexes = (store, create) => useCreate(store, create);
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
const useSliceIdsListener = (indexId, listener, indexesOrIndexesId) =>
  useListener(
    SLICE + IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    listener,
    [indexId],
  );
const useSliceRowIdsListener = (
  indexId,
  sliceId,
  listener,
  indexesOrIndexesId,
) =>
  useListener(
    SLICE + ROW_IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    listener,
    [indexId, sliceId],
  );
const useCreateRelationships = (store, create) => useCreate(store, create);
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
  relationshipsOrRelationshipsId,
) =>
  useListener(
    REMOTE_ROW_ID,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    listener,
    [relationshipId, localRowId],
  );
const useLocalRowIdsListener = (
  relationshipId,
  remoteRowId,
  listener,
  relationshipsOrRelationshipsId,
) =>
  useListener(
    LOCAL + ROW_IDS,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    listener,
    [relationshipId, remoteRowId],
  );
const useLinkedRowIdsListener = (
  relationshipId,
  firstRowId,
  listener,
  relationshipsOrRelationshipsId,
) =>
  useListener(
    LINKED + ROW_IDS,
    useRelationshipsOrRelationshipsById(relationshipsOrRelationshipsId),
    listener,
    [relationshipId, firstRowId],
  );
const useCreateQueries = (store, create) => useCreate(store, create);
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
const useResultTableListener = (queryId, listener, queriesOrQueriesId) =>
  useListener(
    RESULT + TABLE,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId],
  );
const useResultTableCellIdsListener = (queryId, listener, queriesOrQueriesId) =>
  useListener(
    RESULT + TABLE + CELL_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId],
  );
const useResultRowCountListener = (queryId, listener, queriesOrQueriesId) =>
  useListener(
    RESULT + ROW_COUNT,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId],
  );
const useResultRowIdsListener = (queryId, listener, queriesOrQueriesId) =>
  useListener(
    RESULT + ROW_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId],
  );
const useResultSortedRowIdsListener = (
  queryId,
  cellId,
  descending,
  offset,
  limit,
  listener,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + SORTED_ROW_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId, cellId, descending, offset, limit],
  );
const useResultRowListener = (queryId, rowId, listener, queriesOrQueriesId) =>
  useListener(
    RESULT + ROW,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId, rowId],
  );
const useResultCellIdsListener = (
  queryId,
  rowId,
  listener,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + CELL_IDS,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId, rowId],
  );
const useResultCellListener = (
  queryId,
  rowId,
  cellId,
  listener,
  queriesOrQueriesId,
) =>
  useListener(
    RESULT + CELL,
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
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
  useSetParamValuesCallback(queryId, getArg, queriesOrQueriesId),
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
  useSetParamValueCallback(queryId, paramId, getArg, queriesOrQueriesId),
];
const useParamValuesListener = (queryId, listener, queriesOrQueriesId) =>
  useListener(
    'ParamValues',
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId],
  );
const useParamValueListener = (
  queryId,
  paramId,
  listener,
  queriesOrQueriesId,
) =>
  useListener(
    'ParamValue',
    useQueriesOrQueriesById(queriesOrQueriesId),
    listener,
    [queryId, paramId],
  );
const useSetParamValueCallback = (
  queryId,
  paramId,
  getParamValue,
  queriesOrQueriesId,
  then,
) =>
  useQueriesSetCallback(
    queriesOrQueriesId,
    'setParamValue',
    getParamValue,
    then,
    queryId,
    paramId,
  );
const useSetParamValuesCallback = (
  queryId,
  getParamValues,
  queriesOrQueriesId,
  then,
) =>
  useQueriesSetCallback(
    queriesOrQueriesId,
    'setParamValues',
    getParamValues,
    then,
    queryId,
  );
const useCreateCheckpoints = (store, create) => useCreate(store, create);
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
  checkpointsOrCheckpointsId,
  then = getUndefined,
) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  return (parameter) =>
    ifNotUndefined(getThing(checkpoints), (resolvedCheckpoints) => {
      const label = getCheckpoint(parameter);
      then(
        resolvedCheckpoints.addCheckpoint(label),
        resolvedCheckpoints,
        label,
      );
    });
};
const useGoBackwardCallback = (checkpointsOrCheckpointsId) =>
  useCheckpointAction(checkpointsOrCheckpointsId, 'goBackward');
const useGoForwardCallback = (checkpointsOrCheckpointsId) =>
  useCheckpointAction(checkpointsOrCheckpointsId, 'goForward');
const useGoToCallback = (
  getCheckpointId,
  checkpointsOrCheckpointsId,
  then = getUndefined,
) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  return (parameter) =>
    ifNotUndefined(getThing(checkpoints), (resolvedCheckpoints) =>
      ifNotUndefined(getCheckpointId(parameter), (checkpointId) =>
        then(resolvedCheckpoints.goTo(checkpointId), checkpointId),
      ),
    );
};
const useUndoInformation = (checkpointsOrCheckpointsId) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  const [backwardIds, currentId] = getThing(useCheckpointIds(checkpoints));
  return [
    !arrayIsEmpty(backwardIds),
    useGoBackwardCallback(checkpoints),
    currentId,
    ifNotUndefined(currentId, (id) =>
      getThing(checkpoints)?.getCheckpoint(id),
    ) ?? EMPTY_STRING,
  ];
};
const useRedoInformation = (checkpointsOrCheckpointsId) => {
  const checkpoints = useCheckpointsOrCheckpointsById(
    checkpointsOrCheckpointsId,
  );
  const [, , [forwardId]] = getThing(useCheckpointIds(checkpoints));
  return [
    !isUndefined(forwardId),
    useGoForwardCallback(checkpoints),
    forwardId,
    ifNotUndefined(forwardId, (id) =>
      getThing(checkpoints)?.getCheckpoint(id),
    ) ?? EMPTY_STRING,
  ];
};
const useCheckpointIdsListener = (listener, checkpointsOrCheckpointsId) =>
  useListener(
    CHECKPOINT + IDS,
    useCheckpointsOrCheckpointsById(checkpointsOrCheckpointsId),
    listener,
  );
const useCheckpointListener = (
  checkpointId,
  listener,
  checkpointsOrCheckpointsId,
) =>
  useListener(
    CHECKPOINT,
    useCheckpointsOrCheckpointsById(checkpointsOrCheckpointsId),
    listener,
    [checkpointId],
  );
const useCreatePersister = (store, create, then, destroy) => {
  const [persister, setPersister] = createSignal();
  createEffect(() => {
    let current = true;
    let createdPersister;
    const destroyPersister = (persister2) => {
      persister2.destroy();
      destroy?.(persister2);
    };
    (async () => {
      const resolvedStore = getThing(store);
      createdPersister = resolvedStore ? await create(resolvedStore) : void 0;
      if (!current) {
        if (createdPersister) {
          destroyPersister(createdPersister);
        }
        return;
      }
      setPersister(() => createdPersister);
      if (createdPersister && then) {
        await then(createdPersister);
      }
    })();
    onCleanup(() => {
      current = false;
      setPersister(() => void 0);
      if (createdPersister) {
        destroyPersister(createdPersister);
      }
    });
  });
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
const usePersisterStatusListener = (listener, persisterOrPersisterId) =>
  useListener(
    STATUS,
    usePersisterOrPersisterById(persisterOrPersisterId),
    listener,
    [],
  );
const useCreateSynchronizer = (store, create, destroy) => {
  const [synchronizer, setSynchronizer] = createSignal();
  createEffect(() => {
    let current = true;
    let createdSynchronizer;
    const destroySynchronizer = (synchronizer2) => {
      synchronizer2.destroy();
      destroy?.(synchronizer2);
    };
    (async () => {
      const resolvedStore = getThing(store);
      createdSynchronizer = resolvedStore
        ? await create(resolvedStore)
        : void 0;
      if (!current) {
        if (createdSynchronizer) {
          destroySynchronizer(createdSynchronizer);
        }
        return;
      }
      setSynchronizer(() => createdSynchronizer);
    })();
    onCleanup(() => {
      current = false;
      setSynchronizer(() => void 0);
      if (createdSynchronizer) {
        destroySynchronizer(createdSynchronizer);
      }
    });
  });
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
  synchronizerOrSynchronizerId,
) =>
  useListener(
    STATUS,
    useSynchronizerOrSynchronizerById(synchronizerOrSynchronizerId),
    listener,
    [],
  );

const wrap = (children, separator, encloseWithId, id) => {
  const separated =
    isUndefined(separator) || !isArray(children)
      ? children
      : arrayMap(children, (child, c) => (c > 0 ? [separator, child] : child));
  return encloseWithId ? [id, ':{', separated, '}'] : separated;
};

const CheckpointView = (props) => {
  const checkpoint = useCheckpoint(
    () => props.checkpointId,
    () => props.checkpoints,
  );
  return memo(() =>
    wrap(
      getValue(checkpoint) ?? EMPTY_STRING,
      void 0,
      props.debugIds,
      props.checkpointId,
    ),
  );
};

const ResultCellView = (props) => {
  const resultCell = useResultCell(
    () => props.queryId,
    () => props.rowId,
    () => props.cellId,
    () => props.queries,
  );
  return memo(() =>
    wrap(
      EMPTY_STRING + (getValue(resultCell) ?? EMPTY_STRING),
      void 0,
      props.debugIds,
      props.cellId,
    ),
  );
};

const ResultRowView = (props) => {
  const resultCellIds = useResultCellIds(
    () => props.queryId,
    () => props.rowId,
    () => props.queries,
  );
  const content = () => {
    const ResultCell = props.resultCellComponent ?? ResultCellView;
    return wrap(
      arrayMap(getValue(resultCellIds), (cellId) =>
        createComponent(
          ResultCell,
          mergeProps(
            () => getProps(props.getResultCellComponentProps, cellId),
            {
              get queryId() {
                return props.queryId;
              },
              get rowId() {
                return props.rowId;
              },
              cellId: cellId,
              get queries() {
                return props.queries;
              },
              get debugIds() {
                return props.debugIds;
              },
            },
          ),
        ),
      ),
      props.separator,
      props.debugIds,
      props.rowId,
    );
  };
  return memo(content);
};

const CellView = (props) => {
  const cell = useCell(
    () => props.tableId,
    () => props.rowId,
    () => props.cellId,
    () => props.store,
  );
  return memo(() =>
    wrap(
      EMPTY_STRING + (getValue(cell) ?? EMPTY_STRING),
      void 0,
      props.debugIds,
      props.cellId,
    ),
  );
};

const useCustomOrDefaultCellIds = (customCellIds, tableId, rowId, store) => {
  const defaultCellIds = useCellIds(tableId, rowId, store);
  return () => getValue(customCellIds) ?? getValue(defaultCellIds);
};

const RowView = (props) => {
  const cellIds = useCustomOrDefaultCellIds(
    () => props.customCellIds,
    () => props.tableId,
    () => props.rowId,
    () => props.store,
  );
  const content = () => {
    const Cell = props.cellComponent ?? CellView;
    return wrap(
      arrayMap(getValue(cellIds), (cellId) =>
        createComponent(
          Cell,
          mergeProps(() => getProps(props.getCellComponentProps, cellId), {
            get tableId() {
              return props.tableId;
            },
            get rowId() {
              return props.rowId;
            },
            cellId: cellId,
            get store() {
              return props.store;
            },
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
      props.debugIds,
      props.rowId,
    );
  };
  return memo(content);
};

const tableView = (props, rowIds) => {
  const content = () => {
    const Row = props.rowComponent ?? RowView;
    return wrap(
      arrayMap(getValue(rowIds), (rowId) =>
        createComponent(
          Row,
          mergeProps(() => getProps(props.getRowComponentProps, rowId), {
            get tableId() {
              return props.tableId;
            },
            rowId: rowId,
            get customCellIds() {
              return props.customCellIds;
            },
            get store() {
              return props.store;
            },
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
      props.debugIds,
      props.tableId,
    );
  };
  return memo(content);
};
const resultTableView = (props, rowIds) => {
  const content = () => {
    const ResultRow = props.resultRowComponent ?? ResultRowView;
    return wrap(
      arrayMap(getValue(rowIds), (rowId) =>
        createComponent(
          ResultRow,
          mergeProps(() => getProps(props.getResultRowComponentProps, rowId), {
            get queryId() {
              return props.queryId;
            },
            rowId: rowId,
            get queries() {
              return props.queries;
            },
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
      props.debugIds,
      props.queryId,
    );
  };
  return memo(content);
};
const useComponentPerRow = (props, getRowIdsHook, rowId) => {
  const resolvedRelationships = useRelationshipsOrRelationshipsById(
    () => props.relationships,
  );
  const rowIds = getRowIdsHook(
    () => props.relationshipId,
    rowId,
    resolvedRelationships,
  );
  const content = () => {
    const Row = props.rowComponent ?? RowView;
    const [_relationship, store, localTableId] = getRelationshipsStoreTableIds(
      getValue(resolvedRelationships),
      props.relationshipId,
    );
    return wrap(
      arrayMap(getValue(rowIds), (localRowId) =>
        createComponent(
          Row,
          mergeProps(() => getProps(props.getRowComponentProps, localRowId), {
            tableId: localTableId,
            rowId: localRowId,
            store: store,
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
      props.debugIds,
      getValue(rowId),
    );
  };
  return memo(content);
};
const getUseCheckpointView = (getCheckpoints) => (props) => {
  const resolvedCheckpoints = useCheckpointsOrCheckpointsById(
    () => props.checkpoints,
  );
  const checkpointIds = useCheckpointIds(resolvedCheckpoints);
  const content = () => {
    const Checkpoint = props.checkpointComponent ?? CheckpointView;
    return wrap(
      arrayMap(getCheckpoints(getValue(checkpointIds)), (checkpointId) =>
        createComponent(
          Checkpoint,
          mergeProps(
            () => getProps(props.getCheckpointComponentProps, checkpointId),
            {
              get checkpoints() {
                return getValue(resolvedCheckpoints);
              },
              checkpointId: checkpointId,
              get debugIds() {
                return props.debugIds;
              },
            },
          ),
        ),
      ),
      props.separator,
    );
  };
  return memo(content);
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

const SliceView = (props) => {
  const resolvedIndexes = useIndexesOrIndexesById(() => props.indexes);
  const rowIds = useSliceRowIds(
    () => props.indexId,
    () => props.sliceId,
    resolvedIndexes,
  );
  const content = () => {
    const Row = props.rowComponent ?? RowView;
    const [_indexesValue, store, tableId] = getIndexStoreTableId(
      getValue(resolvedIndexes),
      props.indexId,
    );
    return wrap(
      arrayMap(getValue(rowIds), (rowId) =>
        createComponent(
          Row,
          mergeProps(() => getProps(props.getRowComponentProps, rowId), {
            tableId: tableId,
            rowId: rowId,
            store: store,
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
      props.debugIds,
      props.sliceId,
    );
  };
  return memo(content);
};

const IndexView = (props) => {
  const sliceIds = useSliceIds(
    () => props.indexId,
    () => props.indexes,
  );
  const content = () => {
    const Slice = props.sliceComponent ?? SliceView;
    return wrap(
      arrayMap(getValue(sliceIds), (sliceId) =>
        createComponent(
          Slice,
          mergeProps(() => getProps(props.getSliceComponentProps, sliceId), {
            get indexId() {
              return props.indexId;
            },
            sliceId: sliceId,
            get indexes() {
              return props.indexes;
            },
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
      props.debugIds,
      props.indexId,
    );
  };
  return memo(content);
};

const LinkedRowsView = (props) =>
  useComponentPerRow(props, useLinkedRowIds, () => props.firstRowId);

const LocalRowsView = (props) =>
  useComponentPerRow(props, useLocalRowIds, () => props.remoteRowId);

const MetricView = (props) => {
  const metric = useMetric(
    () => props.metricId,
    () => props.metrics,
  );
  return memo(() =>
    wrap(
      getValue(metric) ?? EMPTY_STRING,
      void 0,
      props.debugIds,
      props.metricId,
    ),
  );
};

const RemoteRowView = (props) => {
  const resolvedRelationships = useRelationshipsOrRelationshipsById(
    () => props.relationships,
  );
  const rowId = useRemoteRowId(
    () => props.relationshipId,
    () => props.localRowId,
    resolvedRelationships,
  );
  const content = () => {
    const Row = props.rowComponent ?? RowView;
    const [_relationshipsValue, store, , remoteTableId] =
      getRelationshipsStoreTableIds(
        getValue(resolvedRelationships),
        props.relationshipId,
      );
    const remoteRowId = getValue(rowId);
    return wrap(
      isUndefined(remoteTableId) || isUndefined(remoteRowId)
        ? null
        : createComponent(
            Row,
            mergeProps(
              () => getProps(props.getRowComponentProps, remoteRowId),
              {
                tableId: remoteTableId,
                rowId: remoteRowId,
                store: store,
                get debugIds() {
                  return props.debugIds;
                },
              },
            ),
          ),
      void 0,
      props.debugIds,
      props.localRowId,
    );
  };
  return memo(content);
};

const ResultSortedTableView = (props) =>
  resultTableView(
    props,
    useResultSortedRowIds(
      () => props.queryId,
      () => props.cellId,
      () => props.descending,
      () => props.offset,
      () => props.limit,
      () => props.queries,
    ),
  );

const ResultTableView = (props) =>
  resultTableView(
    props,
    useResultRowIds(
      () => props.queryId,
      () => props.queries,
    ),
  );

const SortedTableView = (props) =>
  tableView(
    props,
    useSortedRowIds(
      () => props.tableId,
      () => props.cellId,
      () => props.descending,
      () => props.offset,
      () => props.limit,
      () => props.store,
    ),
  );

const TableView = (props) =>
  tableView(
    props,
    useRowIds(
      () => props.tableId,
      () => props.store,
    ),
  );

const TablesView = (props) => {
  const tableIds = useTableIds(() => props.store);
  const content = () => {
    const Table = props.tableComponent ?? TableView;
    return wrap(
      arrayMap(getValue(tableIds), (tableId) =>
        createComponent(
          Table,
          mergeProps(() => getProps(props.getTableComponentProps, tableId), {
            tableId: tableId,
            get store() {
              return props.store;
            },
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
    );
  };
  return memo(content);
};

const ValueView = (props) => {
  const value = useValue(
    () => props.valueId,
    () => props.store,
  );
  return memo(() =>
    wrap(
      EMPTY_STRING + (getValue(value) ?? EMPTY_STRING),
      void 0,
      props.debugIds,
      props.valueId,
    ),
  );
};

const ValuesView = (props) => {
  const valueIds = useValueIds(() => props.store);
  const content = () => {
    const Value = props.valueComponent ?? ValueView;
    return wrap(
      arrayMap(getValue(valueIds), (valueId) =>
        createComponent(
          Value,
          mergeProps(() => getProps(props.getValueComponentProps, valueId), {
            valueId: valueId,
            get store() {
              return props.store;
            },
            get debugIds() {
              return props.debugIds;
            },
          }),
        ),
      ),
      props.separator,
    );
  };
  return memo(content);
};

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
