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
import {
  addEventListener,
  className,
  createComponent,
  effect,
  insert,
  memo,
  mergeProps,
  setAttribute,
  template,
} from 'solid-js/web';
import {CellView, ResultCellView, ValueView} from '../../ui-solid/with-schemas/index.js';

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
const EMPTY_CONTEXT = () => [];
const EMPTY_CONTEXT_VALUE = {value: EMPTY_CONTEXT};
const GLOBAL_CONTEXT = GLOBAL;
const Context = GLOBAL_CONTEXT[TINYBASE_CONTEXT]
  ? /* istanbul ignore next */
    GLOBAL_CONTEXT[TINYBASE_CONTEXT]
  : (GLOBAL_CONTEXT[TINYBASE_CONTEXT] = createContext(EMPTY_CONTEXT_VALUE));
const useThing = (id, offset) => {
  const contextValue = useContext(Context)?.value ?? EMPTY_CONTEXT;
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
const argsOrGetArgs = (args, store, parameter) =>
  arrayMap(args, (arg) =>
    isFunction(arg)
      ? arg.length == 0
        ? getThing(arg)
        : arg(parameter, store)
      : arg,
  );
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
  useSetValueCallback(valueId, getArg, storeOrStoreId),
];
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
const useSetValueCallback = (valueId, getValue, storeOrStoreId, then) =>
  useStoreSetCallback(storeOrStoreId, VALUE, getValue, then, valueId);
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

const jsonString = JSON.stringify;
const jsonParse = JSON.parse;

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

const getStoreCellComponentProps = (store, tableId) => ({
  store,
  tableId,
});
const getQueriesCellComponentProps = (queries, queryId) => ({
  queries,
  queryId,
});
const getCallbackOrUndefined = (callback, test) => (test ? callback : void 0);
const getParams = (...args) => args;
const useCells = (defaultCellIds, customCells, defaultCellComponent) =>
  // eslint-disable-next-line solid/reactivity
  createMemo(() => {
    const customCellIds = getValue(customCells);
    const cellIds = getValue(customCellIds) ?? getValue(defaultCellIds);
    const component = defaultCellComponent();
    return objMap(
      isArray(cellIds)
        ? objNew(arrayMap(cellIds, (cellId) => [cellId, cellId]))
        : cellIds,
      (labelOrCustomCell, cellId) => ({
        ...{
          label: cellId,
          component,
        },
        ...(isString(labelOrCustomCell)
          ? {
              label: labelOrCustomCell,
            }
          : labelOrCustomCell),
      }),
    );
  });

var _tmpl$$4 = /*#__PURE__*/ template(`<td>`),
  _tmpl$2$4 = /*#__PURE__*/ template(`<th>`);
const UP_ARROW = '\u2191';
const DOWN_ARROW = '\u2193';
const EDITABLE = 'editable';
const extraRowCells = (extraRowCells2 = [], extraRowCellProps) =>
  arrayMap(getValue(extraRowCells2) ?? [], (extraRowCell) => {
    const Component = extraRowCell.component;
    return (() => {
      var _el$ = _tmpl$$4();
      className(_el$, EXTRA);
      insert(_el$, createComponent(Component, extraRowCellProps));
      return _el$;
    })();
  });
const extraHeaders = (extraCells = []) =>
  arrayMap(getValue(extraCells) ?? [], (extraCell) =>
    (() => {
      var _el$2 = _tmpl$2$4();
      className(_el$2, EXTRA);
      insert(_el$2, () => extraCell.label);
      return _el$2;
    })(),
  );

var _tmpl$$3 = /*#__PURE__*/ template(`<th>`),
  _tmpl$2$3 = /*#__PURE__*/ template(`<table><tbody>`),
  _tmpl$3$2 = /*#__PURE__*/ template(`<caption>`),
  _tmpl$4$2 = /*#__PURE__*/ template(`<thead><tr>`),
  _tmpl$5$2 = /*#__PURE__*/ template(`<tr>`),
  _tmpl$6$2 = /*#__PURE__*/ template(`<td>`),
  _tmpl$7 = /*#__PURE__*/ template(`<input>`),
  _tmpl$8 = /*#__PURE__*/ template(`<input type=number>`),
  _tmpl$9 = /*#__PURE__*/ template(`<input type=checkbox>`),
  _tmpl$0 = /*#__PURE__*/ template(`<div>`),
  _tmpl$1 = /*#__PURE__*/ template(`<button>`);
const HtmlHeaderCell = (props) => {
  const sortDescending = props.sort[1];
  const cellId = props.cellId;
  return (() => {
    var _el$ = _tmpl$$3();
    addEventListener(
      _el$,
      'click',
      getCallbackOrUndefined(() => props.onClick?.(cellId), props.onClick),
    );
    insert(
      _el$,
      () =>
        isUndefined(sortDescending) || props.sort[0] != cellId
          ? null
          : (sortDescending ? DOWN_ARROW : UP_ARROW) + ' ',
      null,
    );
    insert(_el$, () => props.label ?? cellId ?? EMPTY_STRING, null);
    effect(() =>
      className(
        _el$,
        isUndefined(sortDescending) || props.sort[0] != cellId
          ? void 0
          : `sorted ${sortDescending ? 'de' : 'a'}scending`,
      ),
    );
    return _el$;
  })();
};
const HtmlTable = (props) => {
  const content = () => {
    const [
      cells,
      cellComponentProps,
      rowIds,
      extraCellsBefore,
      extraCellsAfter,
      sortAndOffset,
      handleSort,
      paginatorComponent,
    ] = props.params;
    const sort = sortAndOffset == null ? [] : getValue(sortAndOffset);
    const paginator = getValue(paginatorComponent);
    return (() => {
      var _el$2 = _tmpl$2$3(),
        _el$3 = _el$2.firstChild;
      insert(
        _el$2,
        paginator
          ? (() => {
              var _el$4 = _tmpl$3$2();
              insert(_el$4, paginator);
              return _el$4;
            })()
          : null,
        _el$3,
      );
      insert(
        _el$2,
        (() => {
          var _c$ = memo(() => props.headerRow === false);
          return () =>
            _c$()
              ? null
              : (() => {
                  var _el$5 = _tmpl$4$2(),
                    _el$6 = _el$5.firstChild;
                  insert(_el$6, () => extraHeaders(extraCellsBefore), null);
                  insert(
                    _el$6,
                    (() => {
                      var _c$2 = memo(() => props.idColumn === false);
                      return () =>
                        _c$2()
                          ? null
                          : HtmlHeaderCell({
                              sort,
                              label: 'Id',
                              onClick: handleSort,
                            });
                    })(),
                    null,
                  );
                  insert(
                    _el$6,
                    () =>
                      objToArray(getValue(cells), ({label}, cellId) =>
                        HtmlHeaderCell({
                          cellId,
                          label,
                          sort,
                          onClick: handleSort,
                        }),
                      ),
                    null,
                  );
                  insert(_el$6, () => extraHeaders(extraCellsAfter), null);
                  return _el$5;
                })();
        })(),
        _el$3,
      );
      insert(_el$3, () =>
        arrayMap(getValue(rowIds), (rowId) => {
          const rowProps = {
            ...cellComponentProps,
            rowId,
          };
          return (() => {
            var _el$7 = _tmpl$5$2();
            insert(
              _el$7,
              () => extraRowCells(extraCellsBefore, rowProps),
              null,
            );
            insert(
              _el$7,
              (() => {
                var _c$3 = memo(() => !!isFalse(props.idColumn));
                return () =>
                  _c$3()
                    ? null
                    : (() => {
                        var _el$8 = _tmpl$$3();
                        setAttribute(_el$8, 'title', rowId);
                        insert(_el$8, rowId);
                        return _el$8;
                      })();
              })(),
              null,
            );
            insert(
              _el$7,
              () =>
                objToArray(
                  getValue(cells),
                  ({component: CellView, getComponentProps}, cellId) =>
                    (() => {
                      var _el$9 = _tmpl$6$2();
                      insert(
                        _el$9,
                        createComponent(
                          CellView,
                          mergeProps(
                            () => getProps(getComponentProps, rowId, cellId),
                            rowProps,
                            {
                              cellId: cellId,
                            },
                          ),
                        ),
                      );
                      return _el$9;
                    })(),
                ),
              null,
            );
            insert(_el$7, () => extraRowCells(extraCellsAfter, rowProps), null);
            return _el$7;
          })();
        }),
      );
      effect(() => className(_el$2, props.className));
      return _el$2;
    })();
  };
  return memo(content);
};
const EditableThing = (props) => {
  const [thingType, setThingType] = createSignal();
  const [currentThing, setCurrentThing] = createSignal();
  const [stringThing, setStringThing] = createSignal();
  const [numberThing, setNumberThing] = createSignal();
  const [booleanThing, setBooleanThing] = createSignal();
  const [objectThing, setObjectThing] = createSignal('{}');
  const [arrayThing, setArrayThing] = createSignal('[]');
  const [objectClassName, setObjectClassName] = createSignal('');
  const [arrayClassName, setArrayClassName] = createSignal('');
  createRenderEffect(() => {
    const thing = props.thing;
    if (untrack(currentThing) !== thing) {
      setThingType(getCellOrValueType(thing));
      setCurrentThing(() => thing);
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
  });
  const handleThingChange = (thing, setTypedThing) => {
    setTypedThing(thing);
    setCurrentThing(() => thing);
    props.onThingChange(thing);
  };
  const handleJsonThingChange = (
    value,
    setTypedThing,
    isThing,
    setTypedClassName,
  ) => {
    setTypedThing(value);
    try {
      const object = jsonParse(value);
      if (isThing(object)) {
        setCurrentThing(() => object);
        props.onThingChange(object);
        setTypedClassName('');
      }
    } catch {
      setTypedClassName('invalid');
    }
  };
  const handleTypeChange = () => {
    if (!props.hasSchema?.()) {
      const nextType = getTypeCase(
        thingType(),
        NUMBER,
        BOOLEAN,
        OBJECT,
        ARRAY,
        STRING,
      );
      const thing = getTypeCase(
        nextType,
        stringThing(),
        numberThing(),
        booleanThing(),
        tryReturn(() => jsonParse(objectThing()), {}),
        tryReturn(() => jsonParse(arrayThing()), []),
      );
      setThingType(nextType);
      setCurrentThing(() => thing);
      props.onThingChange(thing);
    }
  };
  const widget = () =>
    getTypeCase(
      thingType(),
      (() => {
        var _el$0 = _tmpl$7();
        _el$0.addEventListener('input', (event) =>
          handleThingChange(
            String(event[CURRENT_TARGET][_VALUE]),
            setStringThing,
          ),
        );
        effect(() => (_el$0.value = stringThing()));
        return _el$0;
      })(),
      (() => {
        var _el$1 = _tmpl$8();
        _el$1.addEventListener('input', (event) =>
          handleThingChange(
            Number(event[CURRENT_TARGET][_VALUE] || 0),
            setNumberThing,
          ),
        );
        effect(() => (_el$1.value = numberThing()));
        return _el$1;
      })(),
      (() => {
        var _el$10 = _tmpl$9();
        _el$10.addEventListener('input', (event) =>
          handleThingChange(
            Boolean(event[CURRENT_TARGET].checked),
            setBooleanThing,
          ),
        );
        effect(() => (_el$10.checked = booleanThing()));
        return _el$10;
      })(),
      (() => {
        var _el$11 = _tmpl$7();
        _el$11.addEventListener('input', (event) =>
          handleJsonThingChange(
            event[CURRENT_TARGET][_VALUE],
            setObjectThing,
            isObject,
            setObjectClassName,
          ),
        );
        effect(() => className(_el$11, objectClassName()));
        effect(() => (_el$11.value = objectThing()));
        return _el$11;
      })(),
      (() => {
        var _el$12 = _tmpl$7();
        _el$12.addEventListener('input', (event) =>
          handleJsonThingChange(
            event[CURRENT_TARGET][_VALUE],
            setArrayThing,
            isArray,
            setArrayClassName,
          ),
        );
        effect(() => className(_el$12, arrayClassName()));
        effect(() => (_el$12.value = arrayThing()));
        return _el$12;
      })(),
    );
  const content = () => {
    const currentWidget = widget();
    return (() => {
      var _el$13 = _tmpl$0();
      insert(
        _el$13,
        (() => {
          var _c$4 = memo(() => !!(props.showType !== false && currentWidget));
          return () =>
            _c$4()
              ? (() => {
                  var _el$14 = _tmpl$1();
                  _el$14.addEventListener('click', handleTypeChange);
                  insert(_el$14, thingType);
                  effect(
                    (_p$) => {
                      var _v$ = thingType(),
                        _v$2 = thingType();
                      _v$ !== _p$.e &&
                        setAttribute(_el$14, 'title', (_p$.e = _v$));
                      _v$2 !== _p$.t && className(_el$14, (_p$.t = _v$2));
                      return _p$;
                    },
                    {
                      e: undefined,
                      t: undefined,
                    },
                  );
                  return _el$14;
                })()
              : null;
        })(),
        null,
      );
      insert(_el$13, currentWidget, null);
      effect(() => className(_el$13, props.class));
      return _el$13;
    })();
  };
  return memo(content);
};

const EditableCellView = (props) => {
  const [cell, setCell] = useCellState(
    () => props.tableId,
    () => props.rowId,
    () => props.cellId,
    () => props.store,
  );
  const store = useStoreOrStoreById(() => props.store);
  return EditableThing({
    get thing() {
      return cell();
    },
    onThingChange: setCell,
    class: props.className ?? EDITABLE + CELL,
    showType: props.showType,
    hasSchema: () => !!store()?.hasTablesSchema(),
  });
};

const EditableValueView = (props) => {
  const [value, setValue] = useValueState(
    () => props.valueId,
    () => props.store,
  );
  const store = useStoreOrStoreById(() => props.store);
  return EditableThing({
    get thing() {
      return value();
    },
    onThingChange: setValue,
    class: props.className ?? EDITABLE + VALUE,
    showType: props.showType,
    hasSchema: () => !!store()?.hasValuesSchema(),
  });
};

var _tmpl$$2 = /*#__PURE__*/ template(`<tr>`),
  _tmpl$2$2 = /*#__PURE__*/ template(`<th>`),
  _tmpl$3$1 = /*#__PURE__*/ template(`<td>`),
  _tmpl$4$1 = /*#__PURE__*/ template(`<table><tbody>`),
  _tmpl$5$1 = /*#__PURE__*/ template(`<thead><tr>`),
  _tmpl$6$1 = /*#__PURE__*/ template(`<th>.Id`);
const useDottedCellIds = (tableId, store) => {
  const cellIds = useTableCellIds(
    () => getValue(tableId),
    () => getValue(store),
  );
  const dottedCellIds = createMemo(() =>
    arrayMap(cellIds(), (cellId) => getValue(tableId) + DOT + cellId),
  );
  return dottedCellIds;
};
const RelationshipInHtmlRow = (props) => {
  const [
    idColumn,
    cells,
    localTableId,
    remoteTableId,
    relationshipId,
    relationships,
    store,
    extraCellsBefore,
    extraCellsAfter,
  ] = props.params;
  const remoteRowId = useRemoteRowId(
    () => relationshipId,
    () => props.localRowId,
    () => relationships,
  );
  const rowProps = {
    tableId: localTableId ?? '',
    rowId: props.localRowId,
    store,
  };
  return (() => {
    var _el$ = _tmpl$$2();
    insert(_el$, () => extraRowCells(extraCellsBefore, rowProps), null);
    insert(
      _el$,
      (() => {
        var _c$ = memo(() => !!isFalse(idColumn));
        return () =>
          _c$()
            ? null
            : [
                (() => {
                  var _el$2 = _tmpl$2$2();
                  insert(_el$2, () => props.localRowId);
                  effect(() => setAttribute(_el$2, 'title', props.localRowId));
                  return _el$2;
                })(),
                (() => {
                  var _el$3 = _tmpl$2$2();
                  insert(_el$3, remoteRowId);
                  effect(() => setAttribute(_el$3, 'title', remoteRowId()));
                  return _el$3;
                })(),
              ];
      })(),
      null,
    );
    insert(
      _el$,
      () =>
        objToArray(
          getValue(cells),
          ({component: CellView2, getComponentProps}, compoundCellId) => {
            const [tableId, cellId] = strSplit(compoundCellId, DOT, 2);
            const rowId =
              tableId === localTableId
                ? props.localRowId
                : tableId === remoteTableId
                  ? remoteRowId()
                  : void 0;
            return isUndefined(rowId)
              ? null
              : (() => {
                  var _el$4 = _tmpl$3$1();
                  insert(
                    _el$4,
                    createComponent(
                      CellView2,
                      mergeProps(
                        () => getProps(getComponentProps, rowId, cellId),
                        {
                          store: store,
                          tableId: tableId,
                          rowId: rowId,
                          cellId: cellId,
                        },
                      ),
                    ),
                  );
                  return _el$4;
                })();
          },
        ),
      null,
    );
    insert(_el$, () => extraRowCells(extraCellsAfter, rowProps), null);
    return _el$;
  })();
};
const RelationshipInHtmlTable = (props) => {
  const resolvedRelationships = useRelationshipsOrRelationshipsById(
    () => props.relationships,
  );
  const details = createMemo(() =>
    getRelationshipsStoreTableIds(
      resolvedRelationships(),
      props.relationshipId,
    ),
  );
  const localCellIds = useDottedCellIds(
    () => details()[2],
    () => details()[1],
  );
  const remoteCellIds = useDottedCellIds(
    () => details()[3],
    () => details()[1],
  );
  const cellIds = createMemo(() => [...localCellIds(), ...remoteCellIds()]);
  const cells = useCells(
    cellIds,
    () => props.customCells,
    () => (props.editable ? EditableCellView : CellView),
  );
  const rowIds = useRowIds(
    () => details()[2],
    () => details()[1],
  );
  const content = () => {
    const [relationships, store, localTableId, remoteTableId] = details();
    const params = getParams(
      props.idColumn ?? true,
      cells,
      localTableId,
      remoteTableId,
      props.relationshipId,
      relationships,
      store,
      props.extraCellsBefore,
      props.extraCellsAfter,
    );
    return (() => {
      var _el$5 = _tmpl$4$1(),
        _el$6 = _el$5.firstChild;
      insert(
        _el$5,
        (() => {
          var _c$2 = memo(() => !!isFalse(props.headerRow));
          return () =>
            _c$2()
              ? null
              : (() => {
                  var _el$7 = _tmpl$5$1(),
                    _el$8 = _el$7.firstChild;
                  insert(
                    _el$8,
                    () => extraHeaders(props.extraCellsBefore),
                    null,
                  );
                  insert(
                    _el$8,
                    (() => {
                      var _c$3 = memo(() => !!isFalse(props.idColumn));
                      return () =>
                        _c$3()
                          ? null
                          : [
                              (() => {
                                var _el$9 = _tmpl$6$1(),
                                  _el$0 = _el$9.firstChild;
                                insert(_el$9, localTableId, _el$0);
                                return _el$9;
                              })(),
                              (() => {
                                var _el$1 = _tmpl$6$1(),
                                  _el$10 = _el$1.firstChild;
                                insert(_el$1, remoteTableId, _el$10);
                                return _el$1;
                              })(),
                            ];
                    })(),
                    null,
                  );
                  insert(
                    _el$8,
                    () =>
                      objToArray(cells(), (cell) =>
                        (() => {
                          var _el$11 = _tmpl$2$2();
                          insert(_el$11, () => cell.label);
                          return _el$11;
                        })(),
                      ),
                    null,
                  );
                  insert(
                    _el$8,
                    () => extraHeaders(props.extraCellsAfter),
                    null,
                  );
                  return _el$7;
                })();
        })(),
        _el$6,
      );
      insert(_el$6, () =>
        arrayMap(rowIds(), (localRowId) =>
          RelationshipInHtmlRow({
            localRowId,
            params,
          }),
        ),
      );
      effect(() => className(_el$5, props.className));
      return _el$5;
    })();
  };
  return memo(content);
};

var _tmpl$$1 = /*#__PURE__*/ template(`<button class=previous>←`),
  _tmpl$2$1 = /*#__PURE__*/ template(`<button class=next>→`);
const useSortingAndPagination = (
  cellId,
  descending,
  sortOnClick,
  offset,
  limit,
  total,
  paginator,
  onChange,
) => {
  const [sortAndOffset, setSortAndOffset] = createSignal([
    getValue(cellId),
    !!getValue(descending),
    getValue(offset) ?? 0,
  ]);
  createEffect(() =>
    setSortAndOffset([
      getValue(cellId),
      !!getValue(descending),
      getValue(offset) ?? 0,
    ]),
  );
  const setStateAndChange = (sortAndOffset2) => {
    setSortAndOffset(sortAndOffset2);
    getValue(onChange)?.(sortAndOffset2);
  };
  const handleSort = (cellId2) => {
    if (getValue(sortOnClick)) {
      const [currentCellId, currentDescending, currentOffset] = sortAndOffset();
      setStateAndChange([
        cellId2,
        cellId2 == currentCellId ? !currentDescending : false,
        currentOffset,
      ]);
    }
  };
  const handleChangeOffset = (offset2) => {
    const [currentCellId, currentDescending] = sortAndOffset();
    setStateAndChange([currentCellId, currentDescending, offset2]);
  };
  const paginatorComponent = createMemo(() => {
    const resolvedPaginator = getValue(paginator);
    const [_, __, currentOffset] = sortAndOffset();
    const PaginatorComponent = isTrue(resolvedPaginator)
      ? SortedTablePaginator
      : resolvedPaginator;
    return isFalse(resolvedPaginator)
      ? null
      : createComponent(PaginatorComponent, {
          offset: currentOffset,
          get limit() {
            return getValue(limit);
          },
          get total() {
            return getValue(total);
          },
          onChange: handleChangeOffset,
        });
  });
  return [sortAndOffset, handleSort, paginatorComponent];
};
const SortedTablePaginator = (props) => {
  const content = () => {
    let offset = props.offset ?? 0;
    const limit = props.limit ?? props.total;
    if (offset > props.total || offset < 0) {
      offset = 0;
      props.onChange(0);
    }
    const singular = props.singular ?? 'row';
    const plural = props.plural ?? singular + 's';
    return [
      memo(
        () =>
          memo(() => props.total > limit)() && [
            (() => {
              var _el$ = _tmpl$$1();
              addEventListener(
                _el$,
                'click',
                getCallbackOrUndefined(
                  () => props.onChange(offset - limit),
                  offset > 0,
                ),
              );
              _el$.disabled = offset == 0;
              return _el$;
            })(),
            (() => {
              var _el$2 = _tmpl$2$1();
              addEventListener(
                _el$2,
                'click',
                getCallbackOrUndefined(
                  () => props.onChange(offset + limit),
                  offset + limit < props.total,
                ),
              );
              effect(() => (_el$2.disabled = offset + limit >= props.total));
              return _el$2;
            })(),
            offset + 1,
            ' to ',
            memo(() => mathMin(props.total, offset + limit)),
            ' of ',
          ],
      ),
      memo(() => props.total),
      ' ',
      memo(() => (props.total != 1 ? plural : singular)),
    ];
  };
  return memo(content);
};

const ResultSortedTableInHtmlTable = (props) => {
  const [sortAndOffset, handleSort, paginatorComponent] =
    useSortingAndPagination(
      () => props.cellId,
      () => props.descending,
      () => props.sortOnClick,
      () => props.offset,
      () => props.limit,
      useResultRowCount(
        () => props.queryId,
        () => props.queries,
      ),
      () => props.paginator ?? false,
      () => props.onChange,
    );
  return HtmlTable({
    ...props,
    params: getParams(
      useCells(
        useResultTableCellIds(
          () => props.queryId,
          () => props.queries,
        ),
        () => props.customCells,
        () => ResultCellView,
      ),
      getQueriesCellComponentProps(props.queries, props.queryId),
      useResultSortedRowIds(
        () => props.queryId,
        () => sortAndOffset()[0],
        () => sortAndOffset()[1],
        () => sortAndOffset()[2],
        () => props.limit,
        () => props.queries,
      ),
      props.extraCellsBefore,
      props.extraCellsAfter,
      sortAndOffset,
      handleSort,
      paginatorComponent,
    ),
  });
};

const ResultTableInHtmlTable = (props) =>
  HtmlTable({
    ...props,
    params: getParams(
      useCells(
        useResultTableCellIds(
          () => props.queryId,
          () => props.queries,
        ),
        () => props.customCells,
        () => ResultCellView,
      ),
      getQueriesCellComponentProps(props.queries, props.queryId),
      useResultRowIds(
        () => props.queryId,
        () => props.queries,
      ),
      props.extraCellsBefore,
      props.extraCellsAfter,
    ),
  });

const SliceInHtmlTable = (props) => {
  const resolvedIndexes = useIndexesOrIndexesById(() => props.indexes);
  const details = createMemo(() =>
    getIndexStoreTableId(resolvedIndexes(), props.indexId),
  );
  return HtmlTable({
    ...props,
    params: getParams(
      useCells(
        useTableCellIds(
          () => details()[2],
          () => details()[1],
        ),
        props.customCells,
        () => (props.editable ? EditableCellView : CellView),
      ),
      getStoreCellComponentProps(details()[1], details()[2]),
      useSliceRowIds(
        () => props.indexId,
        () => props.sliceId,
        resolvedIndexes,
      ),
      props.extraCellsBefore,
      props.extraCellsAfter,
    ),
  });
};

const SortedTableInHtmlTable = (props) => {
  const [sortAndOffset, handleSort, paginatorComponent] =
    useSortingAndPagination(
      () => props.cellId,
      () => props.descending,
      () => props.sortOnClick,
      () => props.offset,
      () => props.limit,
      useRowCount(
        () => props.tableId,
        () => props.store,
      ),
      () => props.paginator ?? false,
      () => props.onChange,
    );
  return HtmlTable({
    ...props,
    params: getParams(
      useCells(
        useTableCellIds(
          () => props.tableId,
          () => props.store,
        ),
        () => props.customCells,
        () => (props.editable === true ? EditableCellView : CellView),
      ),
      getStoreCellComponentProps(props.store, props.tableId),
      useSortedRowIds(
        () => props.tableId,
        () => sortAndOffset()[0],
        () => sortAndOffset()[1],
        () => sortAndOffset()[2],
        () => props.limit,
        () => props.store,
      ),
      props.extraCellsBefore,
      props.extraCellsAfter,
      sortAndOffset,
      handleSort,
      paginatorComponent,
    ),
  });
};

const TableInHtmlTable = (props) =>
  HtmlTable({
    ...props,
    params: getParams(
      useCells(
        useTableCellIds(
          () => props.tableId,
          () => props.store,
        ),
        () => props.customCells,
        () => (props.editable ? EditableCellView : CellView),
      ),
      getStoreCellComponentProps(props.store, props.tableId),
      useRowIds(
        () => props.tableId,
        () => props.store,
      ),
      props.extraCellsBefore,
      props.extraCellsAfter,
    ),
  });

var _tmpl$ = /*#__PURE__*/ template(`<td>`),
  _tmpl$2 = /*#__PURE__*/ template(`<table><tbody>`),
  _tmpl$3 = /*#__PURE__*/ template(`<thead><tr><th>`),
  _tmpl$4 = /*#__PURE__*/ template(`<th>Id`),
  _tmpl$5 = /*#__PURE__*/ template(`<tr><td>`),
  _tmpl$6 = /*#__PURE__*/ template(`<th>`);
const extraValueCells = (extraValueCells2 = [], extraValueCellProps) =>
  arrayMap(getValue(extraValueCells2) ?? [], (extraValueCell) => {
    const Component = extraValueCell.component;
    return (() => {
      var _el$ = _tmpl$();
      className(_el$, EXTRA);
      insert(_el$, createComponent(Component, extraValueCellProps));
      return _el$;
    })();
  });
const ValuesInHtmlTable = (props) => {
  const valueIds = useValueIds(() => props.store);
  return (() => {
    var _el$2 = _tmpl$2(),
      _el$3 = _el$2.firstChild;
    insert(
      _el$2,
      (() => {
        var _c$ = memo(() => props.headerRow === false);
        return () =>
          _c$()
            ? null
            : (() => {
                var _el$4 = _tmpl$3(),
                  _el$5 = _el$4.firstChild,
                  _el$6 = _el$5.firstChild;
                insert(
                  _el$5,
                  () => extraHeaders(props.extraCellsBefore),
                  _el$6,
                );
                insert(
                  _el$5,
                  (() => {
                    var _c$2 = memo(() => props.idColumn === false);
                    return () => (_c$2() ? null : _tmpl$4());
                  })(),
                  _el$6,
                );
                insert(_el$6, VALUE);
                insert(_el$5, () => extraHeaders(props.extraCellsAfter), null);
                return _el$4;
              })();
      })(),
      _el$3,
    );
    insert(_el$3, () =>
      arrayMap(valueIds(), (valueId) => {
        const valueProps = {
          valueId,
          store: props.store,
        };
        const Value =
          props.valueComponent ??
          (getValue(props.editable) === true ? EditableValueView : ValueView);
        return (() => {
          var _el$8 = _tmpl$5(),
            _el$9 = _el$8.firstChild;
          insert(
            _el$8,
            () => extraValueCells(props.extraCellsBefore, valueProps),
            _el$9,
          );
          insert(
            _el$8,
            (() => {
              var _c$3 = memo(() => !!isFalse(props.idColumn));
              return () =>
                _c$3()
                  ? null
                  : (() => {
                      var _el$0 = _tmpl$6();
                      setAttribute(_el$0, 'title', valueId);
                      insert(_el$0, valueId);
                      return _el$0;
                    })();
            })(),
            _el$9,
          );
          insert(
            _el$9,
            createComponent(
              Value,
              mergeProps(
                () => getProps(props.getValueComponentProps, valueId),
                valueProps,
              ),
            ),
          );
          insert(
            _el$8,
            () => extraValueCells(props.extraCellsAfter, valueProps),
            null,
          );
          return _el$8;
        })();
      }),
    );
    effect(() => className(_el$2, props.className));
    return _el$2;
  })();
};

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
