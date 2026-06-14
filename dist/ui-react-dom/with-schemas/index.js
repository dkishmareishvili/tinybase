import React from 'react';
import {Fragment, jsx, jsxs} from 'react/jsx-runtime';
import {CellView, ResultCellView, ValueView} from '../../ui-react/with-schemas/index.js';

const getTypeOf = (thing) => typeof thing;
const TINYBASE = 'tinybase';
const EMPTY_STRING = '';
const DOT = '.';
const STRING = getTypeOf(EMPTY_STRING);
const BOOLEAN = getTypeOf(true);
const NUMBER = getTypeOf(0);
const FUNCTION = getTypeOf(getTypeOf);
const OBJECT = 'object';
const ARRAY = 'array';
const NULL = 'null';
const LISTENER = 'Listener';
const RESULT = 'Result';
const GET = 'get';
const SET = 'set';
const ADD = 'add';
const HAS = 'Has';
const _HAS = 'has';
const IDS = 'Ids';
const TABLE = 'Table';
const ROW = 'Row';
const ROW_COUNT = ROW + 'Count';
const ROW_IDS = ROW + IDS;
const SORTED_ROW_IDS = 'Sorted' + ROW + IDS;
const CELL = 'Cell';
const CELL_IDS = CELL + IDS;
const VALUE = 'Value';
const VALUE_IDS = VALUE + IDS;
const SLICE = 'Slice';
const REMOTE_ROW_ID = 'Remote' + ROW + 'Id';
const CURRENT_TARGET = 'currentTarget';
const _VALUE = 'value';
const EXTRA = 'extra';
const strSplit = (str, separator = EMPTY_STRING, limit) =>
  str.split(separator, limit);

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const GLOBAL = globalThis;
const math = Math;
const mathMin = math.min;
const isFiniteNumber = isFinite;
const isNullish = (thing) => thing == null;
const isUndefined = (thing) => thing === void 0;
const isNull = (thing) => thing === null;
const isTrue = (thing) => thing === true;
const isFalse = (thing) => thing === false;
const ifNotNullish = getIfNotFunction(isNullish);
const ifNotUndefined = getIfNotFunction(isUndefined);
const isTypeStringOrBoolean = (type) => type == STRING || type == BOOLEAN;
const isString = (thing) => getTypeOf(thing) == STRING;
const isFunction = (thing) => getTypeOf(thing) == FUNCTION;
const isArray = (thing) => Array.isArray(thing);
const size = (arrayOrString) => arrayOrString.length;
const getUndefined = () => void 0;
const getArg = (value) => value;
const tryReturn = (tryF, catchReturn) => {
  try {
    return tryF();
  } catch {
    /* istanbul ignore next */
    return catchReturn;
  }
};

const arrayEvery = (array, cb) => array.every(cb);
const arrayIsEqual = (array1, array2) =>
  size(array1) === size(array2) &&
  arrayEvery(array1, (value1, index) => array2[index] === value1);
const arrayOrValueEqual = (value1, value2) =>
  isArray(value1) && isArray(value2)
    ? arrayIsEqual(value1, value2)
    : value1 === value2;
const arrayMap = (array, cb) => array.map(cb);
const arrayFilter = (array, cb) => array.filter(cb);

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
const objNew = (entries = []) => object.fromEntries(entries);
const objGet = (obj, id) => ifNotUndefined(obj, (obj2) => obj2[id]);
const objToArray = (obj, cb) =>
  arrayMap(objEntries(obj), ([id, value]) => cb(value, id));
const objMap = (obj, cb) =>
  objNew(objToArray(obj, (value, id) => [id, cb(value, id)]));
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
const jsonParse = JSON.parse;

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
const useThingOrThingById = (thingOrThingId, offset) => {
  const thing = useThing(thingOrThingId, offset);
  return isUndefined(thingOrThingId) || isString(thingOrThingId)
    ? thing
    : thingOrThingId;
};

const OFFSET_STORE = 0;
const OFFSET_INDEXES = 2;
const OFFSET_RELATIONSHIPS = 3;
const OFFSET_QUERIES = 4;

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
const argsOrGetArgs = (args, store, parameter) =>
  arrayMap(args, (arg) => (isFunction(arg) ? arg(parameter, store) : arg));
const nonFunctionDeps = (args) => arrayFilter(args, (arg) => !isFunction(arg));
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
const useStoreOrStoreById = (storeOrStoreId) =>
  useThingOrThingById(storeOrStoreId, OFFSET_STORE);
const useTableCellIds = (tableId, storeOrStoreId) =>
  useListenable(
    TABLE + CELL_IDS,
    useStoreOrStoreById(storeOrStoreId),
    1 /* Array */,
    [tableId],
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
const useValueIds = (storeOrStoreId) =>
  useListenable(VALUE_IDS, useStoreOrStoreById(storeOrStoreId), 1 /* Array */);
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
const useIndexesOrIndexesById = (indexesOrIndexesId) =>
  useThingOrThingById(indexesOrIndexesId, OFFSET_INDEXES);
const useSliceRowIds = (indexId, sliceId, indexesOrIndexesId) =>
  useListenable(
    SLICE + ROW_IDS,
    useIndexesOrIndexesById(indexesOrIndexesId),
    1 /* Array */,
    [indexId, sliceId],
  );
const useRelationshipsOrRelationshipsById = (relationshipsOrRelationshipsId) =>
  useThingOrThingById(relationshipsOrRelationshipsId, OFFSET_RELATIONSHIPS);
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
const useQueriesOrQueriesById = (queriesOrQueriesId) =>
  useThingOrThingById(queriesOrQueriesId, OFFSET_QUERIES);
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
const getTypeCase = (
  type,
  stringCase,
  numberCase,
  booleanCase,
  objectCase,
  arrayCase,
) =>
  type == STRING
    ? stringCase
    : type == NUMBER
      ? numberCase
      : type == BOOLEAN
        ? booleanCase
        : type == OBJECT
          ? objectCase
          : type == ARRAY
            ? arrayCase
            : null;

const useStoreCellComponentProps = (store, tableId) =>
  useMemo(() => ({store, tableId}), [store, tableId]);
const useQueriesCellComponentProps = (queries, queryId) =>
  useMemo(() => ({queries, queryId}), [queries, queryId]);
const useCallbackOrUndefined = (callback, deps, test) => {
  const returnCallback = useCallback(callback, deps);
  return test ? returnCallback : void 0;
};
const useParams = (...args) =>
  useMemo(
    () => args,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    args,
  );
const useCells = (defaultCellIds, customCells, defaultCellComponent) =>
  useMemo(() => {
    const cellIds = customCells ?? defaultCellIds;
    return objMap(
      isArray(cellIds)
        ? objNew(arrayMap(cellIds, (cellId) => [cellId, cellId]))
        : cellIds,
      (labelOrCustomCell, cellId) => ({
        ...{label: cellId, component: defaultCellComponent},
        ...(isString(labelOrCustomCell)
          ? {label: labelOrCustomCell}
          : labelOrCustomCell),
      }),
    );
  }, [customCells, defaultCellComponent, defaultCellIds]);

const UP_ARROW = '\u2191';
const DOWN_ARROW = '\u2193';
const EDITABLE = 'editable';
const extraRowCells = (extraRowCells2 = [], extraRowCellProps, after = 0) =>
  arrayMap(extraRowCells2, ({component: Component}, index) =>
    /* @__PURE__ */ jsx(
      'td',
      {
        className: EXTRA,
        children: /* @__PURE__ */ jsx(Component, {...extraRowCellProps}),
      },
      extraKey(index, after),
    ),
  );
const extraKey = (index, after) => (after ? '>' : '<') + index;
const extraHeaders = (extraCells = [], after = 0) =>
  arrayMap(extraCells, ({label}, index) =>
    /* @__PURE__ */ jsx(
      'th',
      {className: EXTRA, children: label},
      extraKey(index, after),
    ),
  );

const HtmlHeaderCell = ({
  cellId,
  sort: [sortCellId, sortDescending],
  label = cellId ?? EMPTY_STRING,
  onClick,
}) =>
  /* @__PURE__ */ jsxs('th', {
    onClick: useCallbackOrUndefined(
      () => onClick?.(cellId),
      [onClick, cellId],
      onClick,
    ),
    className:
      isUndefined(sortDescending) || sortCellId != cellId
        ? void 0
        : `sorted ${sortDescending ? 'de' : 'a'}scending`,
    children: [
      isUndefined(sortDescending) || sortCellId != cellId
        ? null
        : (sortDescending ? DOWN_ARROW : UP_ARROW) + ' ',
      label,
    ],
  });
const HtmlTable = ({
  className,
  headerRow,
  idColumn,
  params: [
    cells,
    cellComponentProps,
    rowIds,
    extraCellsBefore,
    extraCellsAfter,
    sortAndOffset,
    handleSort,
    paginatorComponent,
  ],
}) =>
  /* @__PURE__ */ jsxs('table', {
    className,
    children: [
      paginatorComponent
        ? /* @__PURE__ */ jsx('caption', {children: paginatorComponent})
        : null,
      headerRow === false
        ? null
        : /* @__PURE__ */ jsx('thead', {
            children: /* @__PURE__ */ jsxs('tr', {
              children: [
                extraHeaders(extraCellsBefore),
                idColumn === false
                  ? null
                  : /* @__PURE__ */ jsx(HtmlHeaderCell, {
                      sort: sortAndOffset ?? [],
                      label: 'Id',
                      onClick: handleSort,
                    }),
                objToArray(cells, ({label}, cellId) =>
                  /* @__PURE__ */ jsx(
                    HtmlHeaderCell,
                    {
                      cellId,
                      label,
                      sort: sortAndOffset ?? [],
                      onClick: handleSort,
                    },
                    cellId,
                  ),
                ),
                extraHeaders(extraCellsAfter, 1),
              ],
            }),
          }),
      /* @__PURE__ */ jsx('tbody', {
        children: arrayMap(rowIds, (rowId) => {
          const rowProps = {...cellComponentProps, rowId};
          return /* @__PURE__ */ jsxs(
            'tr',
            {
              children: [
                extraRowCells(extraCellsBefore, rowProps),
                isFalse(idColumn)
                  ? null
                  : /* @__PURE__ */ jsx('th', {title: rowId, children: rowId}),
                objToArray(
                  cells,
                  ({component: CellView, getComponentProps}, cellId) =>
                    /* @__PURE__ */ jsx(
                      'td',
                      {
                        children: /* @__PURE__ */ jsx(CellView, {
                          ...getProps(getComponentProps, rowId, cellId),
                          ...rowProps,
                          cellId,
                        }),
                      },
                      cellId,
                    ),
                ),
                extraRowCells(extraCellsAfter, rowProps, 1),
              ],
            },
            rowId,
          );
        }),
      }),
    ],
  });
const EditableThing = ({
  thing,
  onThingChange,
  className,
  hasSchema,
  showType = true,
}) => {
  const [thingType, setThingType] = useState();
  const [currentThing, setCurrentThing] = useState();
  const [stringThing, setStringThing] = useState();
  const [numberThing, setNumberThing] = useState();
  const [booleanThing, setBooleanThing] = useState();
  const [objectThing, setObjectThing] = useState('{}');
  const [arrayThing, setArrayThing] = useState('[]');
  const [objectClassName, setObjectClassName] = useState('');
  const [arrayClassName, setArrayClassName] = useState('');
  if (currentThing !== thing) {
    setThingType(getCellOrValueType(thing));
    setCurrentThing(thing);
    if (isObject(thing)) {
      setObjectThing(jsonString(thing));
    } else if (isArray(thing)) {
      setArrayThing(jsonString(thing));
    } else {
      setStringThing(String(thing));
      setNumberThing(Number(thing) || 0);
      setBooleanThing(Boolean(thing));
    }
  }
  const handleThingChange = useCallback(
    (thing2, setTypedThing) => {
      setTypedThing(thing2);
      setCurrentThing(thing2);
      onThingChange(thing2);
    },
    [onThingChange],
  );
  const handleJsonThingChange = useCallback(
    (value, setTypedThing, isThing, setTypedClassName) => {
      setTypedThing(value);
      try {
        const object = jsonParse(value);
        if (isThing(object)) {
          setCurrentThing(object);
          onThingChange(object);
          setTypedClassName('');
        }
      } catch {
        setTypedClassName('invalid');
      }
    },
    [onThingChange],
  );
  const handleTypeChange = useCallback(() => {
    if (!hasSchema?.()) {
      const nextType = getTypeCase(
        thingType,
        NUMBER,
        BOOLEAN,
        OBJECT,
        ARRAY,
        STRING,
      );
      const thing2 = getTypeCase(
        nextType,
        stringThing,
        numberThing,
        booleanThing,
        tryReturn(() => jsonParse(objectThing), {}),
        tryReturn(() => jsonParse(arrayThing), []),
      );
      setThingType(nextType);
      setCurrentThing(thing2);
      onThingChange(thing2);
    }
  }, [
    hasSchema,
    onThingChange,
    stringThing,
    numberThing,
    booleanThing,
    objectThing,
    arrayThing,
    thingType,
  ]);
  const widget = getTypeCase(
    thingType,
    /* @__PURE__ */ jsx(
      'input',
      {
        value: stringThing,
        onChange: useCallback(
          (event) =>
            handleThingChange(
              String(event[CURRENT_TARGET][_VALUE]),
              setStringThing,
            ),
          [handleThingChange],
        ),
      },
      thingType,
    ),
    /* @__PURE__ */ jsx(
      'input',
      {
        type: 'number',
        value: numberThing,
        onChange: useCallback(
          (event) =>
            handleThingChange(
              Number(event[CURRENT_TARGET][_VALUE] || 0),
              setNumberThing,
            ),
          [handleThingChange],
        ),
      },
      thingType,
    ),
    /* @__PURE__ */ jsx(
      'input',
      {
        type: 'checkbox',
        checked: booleanThing,
        onChange: useCallback(
          (event) =>
            handleThingChange(
              Boolean(event[CURRENT_TARGET].checked),
              setBooleanThing,
            ),
          [handleThingChange],
        ),
      },
      thingType,
    ),
    /* @__PURE__ */ jsx(
      'input',
      {
        value: objectThing,
        className: objectClassName,
        onChange: useCallback(
          (event) =>
            handleJsonThingChange(
              event[CURRENT_TARGET][_VALUE],
              setObjectThing,
              isObject,
              setObjectClassName,
            ),
          [handleJsonThingChange],
        ),
      },
      thingType,
    ),
    /* @__PURE__ */ jsx(
      'input',
      {
        value: arrayThing,
        className: arrayClassName,
        onChange: useCallback(
          (event) =>
            handleJsonThingChange(
              event[CURRENT_TARGET][_VALUE],
              setArrayThing,
              isArray,
              setArrayClassName,
            ),
          [handleJsonThingChange],
        ),
      },
      thingType,
    ),
  );
  return /* @__PURE__ */ jsxs('div', {
    className,
    children: [
      showType && widget
        ? /* @__PURE__ */ jsx('button', {
            title: thingType,
            className: thingType,
            onClick: handleTypeChange,
            children: thingType,
          })
        : null,
      widget,
    ],
  });
};

const EditableCellView = ({
  tableId,
  rowId,
  cellId,
  store,
  className,
  showType,
}) => {
  const [cell, setCell] = useCellState(tableId, rowId, cellId, store);
  return /* @__PURE__ */ jsx(EditableThing, {
    thing: cell,
    onThingChange: setCell,
    className: className ?? EDITABLE + CELL,
    showType,
    hasSchema: useStoreOrStoreById(store)?.hasTablesSchema,
  });
};

const EditableValueView = ({valueId, store, className, showType}) => {
  const [value, setValue] = useValueState(valueId, store);
  return /* @__PURE__ */ jsx(EditableThing, {
    thing: value,
    onThingChange: setValue,
    className: className ?? EDITABLE + VALUE,
    showType,
    hasSchema: useStoreOrStoreById(store)?.hasValuesSchema,
  });
};

const useDottedCellIds = (tableId, store) =>
  arrayMap(useTableCellIds(tableId, store), (cellId) => tableId + DOT + cellId);
const RelationshipInHtmlRow = ({
  localRowId,
  params: [
    idColumn,
    cells,
    localTableId,
    remoteTableId,
    relationshipId,
    relationships,
    store,
    extraCellsBefore,
    extraCellsAfter,
  ],
}) => {
  const remoteRowId = useRemoteRowId(relationshipId, localRowId, relationships);
  const rowProps = {
    tableId: localTableId ?? '',
    rowId: localRowId,
    store,
  };
  return /* @__PURE__ */ jsxs('tr', {
    children: [
      extraRowCells(extraCellsBefore, rowProps),
      isFalse(idColumn)
        ? null
        : /* @__PURE__ */ jsxs(Fragment, {
            children: [
              /* @__PURE__ */ jsx('th', {
                title: localRowId,
                children: localRowId,
              }),
              /* @__PURE__ */ jsx('th', {
                title: remoteRowId,
                children: remoteRowId,
              }),
            ],
          }),
      objToArray(
        cells,
        ({component: CellView2, getComponentProps}, compoundCellId) => {
          const [tableId, cellId] = strSplit(compoundCellId, DOT, 2);
          const rowId =
            tableId === localTableId
              ? localRowId
              : tableId === remoteTableId
                ? remoteRowId
                : void 0;
          return isUndefined(rowId)
            ? null
            : /* @__PURE__ */ jsx(
                'td',
                {
                  children: /* @__PURE__ */ jsx(CellView2, {
                    ...getProps(getComponentProps, rowId, cellId),
                    store,
                    tableId,
                    rowId,
                    cellId,
                  }),
                },
                compoundCellId,
              );
        },
      ),
      extraRowCells(extraCellsAfter, rowProps, 1),
    ],
  });
};
const RelationshipInHtmlTable = ({
  relationshipId,
  relationships,
  editable,
  customCells,
  extraCellsBefore,
  extraCellsAfter,
  className,
  headerRow,
  idColumn = true,
}) => {
  const [resolvedRelationships, store, localTableId, remoteTableId] =
    getRelationshipsStoreTableIds(
      useRelationshipsOrRelationshipsById(relationships),
      relationshipId,
    );
  const cells = useCells(
    [
      ...useDottedCellIds(localTableId, store),
      ...useDottedCellIds(remoteTableId, store),
    ],
    customCells,
    editable ? EditableCellView : CellView,
  );
  const params = useParams(
    idColumn,
    cells,
    localTableId,
    remoteTableId,
    relationshipId,
    resolvedRelationships,
    store,
    extraCellsBefore,
    extraCellsAfter,
  );
  return /* @__PURE__ */ jsxs('table', {
    className,
    children: [
      isFalse(headerRow)
        ? null
        : /* @__PURE__ */ jsx('thead', {
            children: /* @__PURE__ */ jsxs('tr', {
              children: [
                extraHeaders(extraCellsBefore),
                isFalse(idColumn)
                  ? null
                  : /* @__PURE__ */ jsxs(Fragment, {
                      children: [
                        /* @__PURE__ */ jsxs('th', {
                          children: [localTableId, '.Id'],
                        }),
                        /* @__PURE__ */ jsxs('th', {
                          children: [remoteTableId, '.Id'],
                        }),
                      ],
                    }),
                objToArray(cells, ({label}, cellId) =>
                  /* @__PURE__ */ jsx('th', {children: label}, cellId),
                ),
                extraHeaders(extraCellsAfter, 1),
              ],
            }),
          }),
      /* @__PURE__ */ jsx('tbody', {
        children: arrayMap(useRowIds(localTableId, store), (localRowId) =>
          /* @__PURE__ */ jsx(
            RelationshipInHtmlRow,
            {
              localRowId,
              params,
            },
            localRowId,
          ),
        ),
      }),
    ],
  });
};

const LEFT_ARROW = '\u2190';
const RIGHT_ARROW = '\u2192';
const useSortingAndPagination = (
  cellId,
  descending = false,
  sortOnClick,
  offset = 0,
  limit,
  total,
  paginator,
  onChange,
) => {
  const [[currentCellId, currentDescending, currentOffset], setState] =
    useState([cellId, descending, offset]);
  const setStateAndChange = useCallback(
    (sortAndOffset) => {
      setState(sortAndOffset);
      onChange?.(sortAndOffset);
    },
    [onChange],
  );
  const handleSort = useCallbackOrUndefined(
    (cellId2) =>
      setStateAndChange([
        cellId2,
        cellId2 == currentCellId ? !currentDescending : false,
        currentOffset,
      ]),
    [setStateAndChange, currentCellId, currentDescending, currentOffset],
    sortOnClick,
  );
  const handleChangeOffset = useCallback(
    (offset2) => setStateAndChange([currentCellId, currentDescending, offset2]),
    [setStateAndChange, currentCellId, currentDescending],
  );
  const PaginatorComponent = isTrue(paginator)
    ? SortedTablePaginator
    : paginator;
  return [
    [currentCellId, currentDescending, currentOffset],
    handleSort,
    useMemo(
      () =>
        isFalse(paginator)
          ? null
          : /* @__PURE__ */ jsx(PaginatorComponent, {
              offset: currentOffset,
              limit,
              total,
              onChange: handleChangeOffset,
            }),
      [
        paginator,
        PaginatorComponent,
        currentOffset,
        limit,
        total,
        handleChangeOffset,
      ],
    ),
  ];
};
const SortedTablePaginator = ({
  onChange,
  total,
  offset = 0,
  limit = total,
  singular = 'row',
  plural = singular + 's',
}) => {
  if (offset > total || offset < 0) {
    offset = 0;
    onChange(0);
  }
  const handlePrevClick = useCallbackOrUndefined(
    () => onChange(offset - limit),
    [onChange, offset, limit],
    offset > 0,
  );
  const handleNextClick = useCallbackOrUndefined(
    () => onChange(offset + limit),
    [onChange, offset, limit],
    offset + limit < total,
  );
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      total > limit &&
        /* @__PURE__ */ jsxs(Fragment, {
          children: [
            /* @__PURE__ */ jsx('button', {
              className: 'previous',
              disabled: offset == 0,
              onClick: handlePrevClick,
              children: LEFT_ARROW,
            }),
            /* @__PURE__ */ jsx('button', {
              className: 'next',
              disabled: offset + limit >= total,
              onClick: handleNextClick,
              children: RIGHT_ARROW,
            }),
            offset + 1,
            ' to ',
            mathMin(total, offset + limit),
            ' of ',
          ],
        }),
      total,
      ' ',
      total != 1 ? plural : singular,
    ],
  });
};

const ResultSortedTableInHtmlTable = ({
  queryId,
  cellId,
  descending,
  offset,
  limit,
  queries,
  sortOnClick,
  paginator = false,
  customCells,
  extraCellsBefore,
  extraCellsAfter,
  onChange,
  ...props
}) => {
  const [sortAndOffset, handleSort, paginatorComponent] =
    useSortingAndPagination(
      cellId,
      descending,
      sortOnClick,
      offset,
      limit,
      useResultRowCount(queryId, queries),
      paginator,
      onChange,
    );
  return /* @__PURE__ */ jsx(HtmlTable, {
    ...props,
    params: useParams(
      useCells(
        useResultTableCellIds(queryId, queries),
        customCells,
        ResultCellView,
      ),
      useQueriesCellComponentProps(queries, queryId),
      useResultSortedRowIds(queryId, ...sortAndOffset, limit, queries),
      extraCellsBefore,
      extraCellsAfter,
      sortAndOffset,
      handleSort,
      paginatorComponent,
    ),
  });
};

const ResultTableInHtmlTable = ({
  queryId,
  queries,
  customCells,
  extraCellsBefore,
  extraCellsAfter,
  ...props
}) =>
  /* @__PURE__ */ jsx(HtmlTable, {
    ...props,
    params: useParams(
      useCells(
        useResultTableCellIds(queryId, queries),
        customCells,
        ResultCellView,
      ),
      useQueriesCellComponentProps(queries, queryId),
      useResultRowIds(queryId, queries),
      extraCellsBefore,
      extraCellsAfter,
    ),
  });

const SliceInHtmlTable = ({
  indexId,
  sliceId,
  indexes,
  editable,
  customCells,
  extraCellsBefore,
  extraCellsAfter,
  ...props
}) => {
  const [resolvedIndexes, store, tableId] = getIndexStoreTableId(
    useIndexesOrIndexesById(indexes),
    indexId,
  );
  return /* @__PURE__ */ jsx(HtmlTable, {
    ...props,
    params: useParams(
      useCells(
        useTableCellIds(tableId, store),
        customCells,
        editable ? EditableCellView : CellView,
      ),
      useStoreCellComponentProps(store, tableId),
      useSliceRowIds(indexId, sliceId, resolvedIndexes),
      extraCellsBefore,
      extraCellsAfter,
    ),
  });
};

const SortedTableInHtmlTable = ({
  tableId,
  cellId,
  descending,
  offset,
  limit,
  store,
  editable,
  sortOnClick,
  paginator = false,
  onChange,
  customCells,
  extraCellsBefore,
  extraCellsAfter,
  ...props
}) => {
  const [sortAndOffset, handleSort, paginatorComponent] =
    useSortingAndPagination(
      cellId,
      descending,
      sortOnClick,
      offset,
      limit,
      useRowCount(tableId, store),
      paginator,
      onChange,
    );
  return /* @__PURE__ */ jsx(HtmlTable, {
    ...props,
    params: useParams(
      useCells(
        useTableCellIds(tableId, store),
        customCells,
        editable ? EditableCellView : CellView,
      ),
      useStoreCellComponentProps(store, tableId),
      useSortedRowIds(tableId, ...sortAndOffset, limit, store),
      extraCellsBefore,
      extraCellsAfter,
      sortAndOffset,
      handleSort,
      paginatorComponent,
    ),
  });
};

const TableInHtmlTable = ({
  tableId,
  store,
  editable,
  customCells,
  extraCellsBefore,
  extraCellsAfter,
  ...props
}) =>
  /* @__PURE__ */ jsx(HtmlTable, {
    ...props,
    params: useParams(
      useCells(
        useTableCellIds(tableId, store),
        customCells,
        editable ? EditableCellView : CellView,
      ),
      useStoreCellComponentProps(store, tableId),
      useRowIds(tableId, store),
      extraCellsBefore,
      extraCellsAfter,
    ),
  });

const extraValueCells = (
  extraValueCells2 = [],
  extraValueCellProps,
  after = 0,
) =>
  arrayMap(extraValueCells2, ({component: Component}, index) =>
    /* @__PURE__ */ jsx(
      'td',
      {
        className: EXTRA,
        children: /* @__PURE__ */ jsx(Component, {...extraValueCellProps}),
      },
      extraKey(index, after),
    ),
  );
const ValuesInHtmlTable = ({
  store,
  editable = false,
  valueComponent: Value = editable ? EditableValueView : ValueView,
  getValueComponentProps,
  extraCellsBefore,
  extraCellsAfter,
  className,
  headerRow,
  idColumn,
}) =>
  /* @__PURE__ */ jsxs('table', {
    className,
    children: [
      headerRow === false
        ? null
        : /* @__PURE__ */ jsx('thead', {
            children: /* @__PURE__ */ jsxs('tr', {
              children: [
                extraHeaders(extraCellsBefore),
                idColumn === false
                  ? null
                  : /* @__PURE__ */ jsx('th', {children: 'Id'}),
                /* @__PURE__ */ jsx('th', {children: VALUE}),
                extraHeaders(extraCellsAfter, 1),
              ],
            }),
          }),
      /* @__PURE__ */ jsx('tbody', {
        children: arrayMap(useValueIds(store), (valueId) => {
          const valueProps = {valueId, store};
          return /* @__PURE__ */ jsxs(
            'tr',
            {
              children: [
                extraValueCells(extraCellsBefore, valueProps),
                isFalse(idColumn)
                  ? null
                  : /* @__PURE__ */ jsx('th', {
                      title: valueId,
                      children: valueId,
                    }),
                /* @__PURE__ */ jsx('td', {
                  children: /* @__PURE__ */ jsx(Value, {
                    ...getProps(getValueComponentProps, valueId),
                    ...valueProps,
                  }),
                }),
                extraValueCells(extraCellsAfter, valueProps, 1),
              ],
            },
            valueId,
          );
        }),
      }),
    ],
  });

export {
  EditableCellView,
  EditableValueView,
  RelationshipInHtmlRow,
  RelationshipInHtmlTable,
  ResultSortedTableInHtmlTable,
  ResultTableInHtmlTable,
  SliceInHtmlTable,
  SortedTableInHtmlTable,
  SortedTablePaginator,
  TableInHtmlTable,
  useSortingAndPagination,
  ValuesInHtmlTable,
};
