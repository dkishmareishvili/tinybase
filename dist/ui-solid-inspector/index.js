import {
  createContext,
  createEffect,
  createMemo,
  createRenderEffect,
  createSignal,
  ErrorBoundary,
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
  setStyleProperty,
  template,
  use,
} from 'solid-js/web';
import {
  CellView,
  ResultCellView,
  useCell as useCell$1,
  useCreatePersister,
  useCreateStore,
  useDelCellCallback,
  useDelRowCallback,
  useDelTableCallback,
  useDelTablesCallback,
  useDelValueCallback,
  useDelValuesCallback,
  useHasCell,
  useHasTables,
  useHasValues,
  useIndexes,
  useIndexesIds,
  useIndexIds,
  useMetric,
  useMetricIds,
  useMetrics,
  useMetricsIds,
  useQueries,
  useQueriesIds,
  useQueryIds,
  useRelationshipIds,
  useRelationships,
  useRelationshipsIds,
  useSetCellCallback as useSetCellCallback$1,
  useSetRowCallback,
  useSetTableCallback,
  useSetValueCallback as useSetValueCallback$1,
  useSliceIds,
  useStore,
  useStoreIds,
  useStoreOrStoreById as useStoreOrStoreById$1,
  useTable,
  useTableCellIds as useTableCellIds$1,
  useTableIds,
  useValue as useValue$1,
  useValueIds as useValueIds$1,
  useValues,
  ValueView,
} from '../ui-solid/index.js';

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
const TYPE = 'type';
const DEFAULT = 'default';
const ALLOW_NULL = 'allowNull';
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
const SLICE = 'Slice';
const REMOTE_ROW_ID = 'Remote' + ROW + 'Id';
const CURRENT_TARGET = 'currentTarget';
const _VALUE = 'value';
const EXTRA = 'extra';
const UNDEFINED = '\uFFFC';
const JSON_PREFIX = '\uFFFD';
const id = (key) => EMPTY_STRING + key;
const strSplit = (str, separator = EMPTY_STRING, limit) =>
  str.split(separator, limit);

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const GLOBAL = globalThis;
const WINDOW = GLOBAL.window;
const math = Math;
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
const isFunction = (thing) => getTypeOf(thing) == FUNCTION;
const isArray = (thing) => Array.isArray(thing);
const slice = (arrayOrString, start, end) => arrayOrString.slice(start, end);
const size = (arrayOrString) => arrayOrString.length;
const test = (regex, subject) => regex.test(subject);
const getUndefined = () => void 0;
const getArg = (value) => value;
const structuredClone = GLOBAL.structuredClone;
const errorNew = (message) => {
  throw new Error(message);
};
const tryReturn = (tryF, catchReturn) => {
  try {
    return tryF();
  } catch {
    /* istanbul ignore next */
    return catchReturn;
  }
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
const arrayOrValueEqual = (value1, value2) =>
  isArray(value1) && isArray(value2)
    ? arrayIsEqual(value1, value2)
    : value1 === value2;
const arraySort = (array, sorter) => array.sort(sorter);
const arrayForEach = (array, cb) => array.forEach(cb);
const arrayJoin = (array, sep = EMPTY_STRING) => array.join(sep);
const arrayMap = (array, cb) => array.map(cb);
const arrayIsEmpty = (array) => size(array) == 0;
const arrayReduce = (array, cb, initial) => array.reduce(cb, initial);
const arrayClear = (array, to) => array.splice(0, to);
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

const UNIQUE_ID = 'tinybaseInspector';
const TITLE = 'TinyBase Inspector';
const POSITIONS = ['left', 'top', 'bottom', 'right', 'full'];
const STATE_TABLE = 'state';
const SORT_CELL = 'sort';
const OPEN_CELL = 'open';
const EDITABLE_CELL = 'editable';
const POSITION_VALUE = 'position';
const OPEN_VALUE = OPEN_CELL;
const NO_PROVIDED_OBJECTS_MESSAGE =
  'There are no Stores or other objects to inspect. Make sure you placed the Inspector inside a Provider component.';
const INSPECTOR_ERROR_MESSAGE =
  'Inspector error: please see console for details.';
const getInitialPosition = (position) => {
  const index = POSITIONS.indexOf(position);
  return index == -1 ? 1 : index;
};
const getUniqueId = (...args) => jsonStringWithMap(args);
const getNewIdFromSuggestedId = (suggestedId, has) => {
  let newId;
  let suffix = 0;
  while (
    has(
      (newId =
        suggestedId +
        (suffix > 0 ? ' (copy' + (suffix > 1 ? ' ' + suffix : '') + ')' : '')),
    )
  ) {
    suffix++;
  }
  return newId;
};
const sortedIdsMap = (ids, callback) => arrayMap(arraySort([...ids]), callback);

const requestInspectorIdleCallback = (callback) =>
  globalThis.requestIdleCallback?.(callback) ??
  setTimeout(
    () =>
      callback({
        didTimeout: false,
        timeRemaining: () => 0,
      }),
    0,
  );
const cancelInspectorIdleCallback = (id) =>
  globalThis.cancelIdleCallback?.(id) ?? clearTimeout(id);

var img =
  "data:image/svg+xml,%3csvg viewBox='0 0 680 680' xmlns='http://www.w3.org/2000/svg' style='width:680px%3bheight:680px'%3e %3cpath stroke='white' stroke-width='80' fill='none' d='M340 617a84 241 90 11.01 0zM131 475a94 254 70 10428-124 114 286 70 01-428 124zm0-140a94 254 70 10428-124 114 286 70 01-428 124zm-12-127a94 254 70 00306 38 90 260 90 01-306-38zm221 3a74 241 90 11.01 0z' /%3e %3cpath fill='%23d81b60' d='M131 475a94 254 70 10428-124 114 286 70 01-428 124zm0-140a94 254 70 10428-124 114 286 70 01-428 124z' /%3e %3cpath d='M249 619a94 240 90 00308-128 114 289 70 01-308 128zM119 208a94 254 70 00306 38 90 260 90 01-306-38zm221 3a74 241 90 11.01 0z' /%3e%3c/svg%3e";

const PRE_CSS = 'url("';
const POST_CSS = '")';
const getCssSvg = (path, color = 'white') => ({
  content:
    PRE_CSS +
    `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='${color}'><path d='${path}' /></svg>` +
    POST_CSS,
});
const VERTICAL_THIN = 'v560h120v-560h-120Z';
const VERTICAL_THICK = 'v560h360v-560h-360Z';
const HORIZONTAL_THIN = 'v120h560v-120h-560Z';
const HORIZONTAL_THICK = 'v360h560v-360h-560Z';
const LOGO_SVG = {content: PRE_CSS + img + POST_CSS};
const POSITIONS_SVG = arrayMap(
  [
    `M200-760${VERTICAL_THIN} M400-760${VERTICAL_THICK}`,
    `M200-760${HORIZONTAL_THIN} M200-560${HORIZONTAL_THICK}`,
    `M200-760${HORIZONTAL_THICK} M200-320${HORIZONTAL_THIN}`,
    `M200-760${VERTICAL_THICK} M640-760${VERTICAL_THIN}`,
  ],
  (path) =>
    getCssSvg(
      'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z' +
        path,
    ),
);
arrayPush(
  POSITIONS_SVG,
  getCssSvg(
    'M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z',
  ),
);
const CLOSE_SVG = getCssSvg(
  'm336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z',
);
const EDIT_SVG = getCssSvg(
  'M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z',
);
const DONE_SVG = getCssSvg(
  'm622-453-56-56 82-82-57-57-82 82-56-56 195-195q12-12 26.5-17.5T705-840q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L622-453ZM200-200h57l195-195-28-29-29-28-195 195v57ZM792-56 509-338 290-120H120v-169l219-219L56-792l57-57 736 736-57 57Zm-32-648-56-56 56 56Zm-169 56 57 57-57-57ZM424-424l-29-28 57 57-28-29Z',
);
const ADD_SVG = getCssSvg(
  'M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z',
);
const CLONE_SVG = getCssSvg(
  'M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z',
);
const DELETE_SVG = getCssSvg(
  'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z',
);
const OK_SVG = getCssSvg(
  'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  'rgb(127,255,127)',
);
const OK_SVG_DISABLED = getCssSvg(
  'm40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z',
  'rgb(255,255,127)',
);
const CANCEL_SVG = getCssSvg(
  'm336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  'rgb(255,127,127)',
);
const DOWN_SVG = getCssSvg(
  'M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z',
);
const RIGHT_SVG = getCssSvg(
  'M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z',
);

const SCROLLBAR = '*::-webkit-scrollbar';
const BACKGROUND = 'background';
const WIDTH = 'width';
const MAX_WIDTH = 'max-' + WIDTH;
const MIN_WIDTH = 'min-' + WIDTH;
const HEIGHT = 'height';
const BORDER = 'border';
const RADIUS = 'radius';
const BORDER_RADIUS = BORDER + '-' + RADIUS;
const PADDING = 'padding';
const MARGIN = 'margin';
const TOP = 'top';
const BOTTOM = 'bottom';
const LEFT = 'left';
const RIGHT = 'right';
const COLOR = 'color';
const POSITION = 'position';
const BOX_SHADOW = 'box-shadow';
const FONT_SIZE = 'font-size';
const DISPLAY = 'display';
const OVERFLOW = 'overflow';
const CURSOR = 'cursor';
const VERTICAL_ALIGN = 'vertical-align';
const TEXT_ALIGN = 'text-align';
const JUSTIFY_CONTENT = 'justify-content';
const WHITE_SPACE = 'white-space';
const TEXT_OVERFLOW = 'text-overflow';
const ALIGN_ITEMS = 'align-items';
const BACKDROP_FILTER = 'backdrop-filter';
const MARGIN_RIGHT = MARGIN + '-' + RIGHT;
const Z_INDEX = 'z-index';
const FIXED = 'fixed';
const REVERT = 'revert';
const UNSET = 'unset';
const NONE = 'none';
const FLEX = 'flex';
const POINTER = 'pointer';
const AUTO = 'auto';
const HIDDEN = 'hidden';
const NOWRAP = 'nowrap';
const oklch = (lPercent, remainder = '% 0.01 ' + cssVar('hue')) =>
  `oklch(${lPercent}${remainder})`;
const cssVar = (name) => `var(--${name})`;
const rem = (...rems) => `${rems.join('rem ')}rem`;
const px = (...pxs) => `${pxs.join('px ')}px`;
const vw = (vw2 = 100) => `${vw2}vw`;
const vh = (vh2 = 100) => `${vh2}vh`;
const APP_STYLESHEET = arrayJoin(
  objToArray(
    {
      '': {
        all: 'initial',
        [FONT_SIZE]: rem(0.75),
        [POSITION]: FIXED,
        [Z_INDEX]: 999999,
        'font-family': 'inter,sans-serif',
        '--bg': oklch(20),
        '--bg2': oklch(15),
        '--bg3': oklch(25),
        '--bg4': oklch(30),
        '--fg': oklch(85),
        '--fg2': oklch(60),
        ['--' + BORDER]: px(1) + ' solid ' + cssVar('bg4'),
        ['--' + BOX_SHADOW]: px(0, 1, 2, 0) + ' #0007',
      },
      '*': {all: REVERT},
      '*::before': {all: REVERT},
      '*::after': {all: REVERT},
      [SCROLLBAR]: {[WIDTH]: rem(0.5), [HEIGHT]: rem(0.5)},
      [SCROLLBAR + '-thumb']: {[BACKGROUND]: cssVar('bg4')},
      [SCROLLBAR + '-thumb:hover']: {[BACKGROUND]: cssVar('bg4')},
      [SCROLLBAR + '-corner']: {[BACKGROUND]: NONE},
      [SCROLLBAR + '-track']: {[BACKGROUND]: NONE},
      img: {
        [WIDTH]: rem(0.8),
        [HEIGHT]: rem(0.8),
        [VERTICAL_ALIGN]: 'text-' + BOTTOM,
        [CURSOR]: POINTER,
        [MARGIN]: px(-2.5, 2, -2.5, 0),
        [PADDING]: px(2),
        [BORDER]: cssVar(BORDER),
        [BACKGROUND]: cssVar('bg3'),
        [BOX_SHADOW]: cssVar(BOX_SHADOW),
        [BORDER_RADIUS]: rem(0.25),
      },
      'img.flat': {[BORDER]: NONE, [BACKGROUND]: NONE, [BOX_SHADOW]: NONE},
      // Nub
      '>img': {
        [PADDING]: rem(0.25),
        [BOTTOM]: 0,
        [RIGHT]: 0,
        [POSITION]: FIXED,
        [HEIGHT]: UNSET,
        [MARGIN]: 0,
        ...LOGO_SVG,
      },
      ...objNew(
        arrayMap(
          [
            {[BOTTOM]: 0, [LEFT]: 0},
            {[TOP]: 0, [RIGHT]: 0},
          ],
          (css, p) => [`>img[data-position='${p}']`, css],
        ),
      ),
      // Panel
      main: {
        [DISPLAY]: FLEX,
        [COLOR]: cssVar('fg'),
        [BACKGROUND]: cssVar('bg'),
        [OVERFLOW]: HIDDEN,
        [POSITION]: FIXED,
        [BOX_SHADOW]: cssVar(BOX_SHADOW),
        'flex-direction': 'column',
      },
      ...objNew(
        arrayMap(
          [
            {
              [BOTTOM]: 0,
              [LEFT]: 0,
              [WIDTH]: vw(35),
              [HEIGHT]: vh(),
              [BORDER + '-' + RIGHT]: cssVar(BORDER),
            },
            {
              [TOP]: 0,
              [RIGHT]: 0,
              [WIDTH]: vw(),
              [HEIGHT]: vh(30),
              [BORDER + '-' + BOTTOM]: cssVar(BORDER),
            },
            {
              [BOTTOM]: 0,
              [LEFT]: 0,
              [WIDTH]: vw(),
              [HEIGHT]: vh(30),
              [BORDER + '-' + TOP]: cssVar(BORDER),
            },
            {
              [TOP]: 0,
              [RIGHT]: 0,
              [WIDTH]: vw(35),
              [HEIGHT]: vh(),
              [BORDER + '-' + LEFT]: cssVar(BORDER),
            },
            {[TOP]: 0, [RIGHT]: 0, [WIDTH]: vw(), [HEIGHT]: vh()},
          ],
          (css, p) => [`main[data-position='${p}']`, css],
        ),
      ),
      // Header
      header: {
        [DISPLAY]: FLEX,
        [PADDING]: rem(0.5),
        [BOX_SHADOW]: cssVar(BOX_SHADOW),
        [BACKGROUND]: oklch(30, '% 0.008 var(--hue) / .5'),
        [WIDTH]: 'calc(100% - .5rem)',
        [POSITION]: 'absolute',
        [Z_INDEX]: 1,
        [BORDER + '-' + BOTTOM]: cssVar(BORDER),
        [ALIGN_ITEMS]: 'center',
        [BACKDROP_FILTER]: 'blur(4px)',
      },
      'header>img:nth-of-type(1)': {
        [HEIGHT]: rem(1),
        [WIDTH]: rem(1),
        ...LOGO_SVG,
      },
      'header>img:nth-of-type(6)': CLOSE_SVG,
      ...objNew(
        arrayMap(POSITIONS_SVG, (SVG, p) => [
          `header>img[data-id='${p}']`,
          SVG,
        ]),
      ),
      'header>span': {
        [OVERFLOW]: HIDDEN,
        [FLEX]: 1,
        'font-weight': 800,
        [WHITE_SPACE]: NOWRAP,
        [TEXT_OVERFLOW]: 'ellipsis',
      },
      // Body
      article: {[OVERFLOW]: AUTO, [FLEX]: 1, [PADDING + '-' + TOP]: rem(2)},
      details: {
        [MARGIN]: rem(0.5),
        [BORDER]: cssVar(BORDER),
        [BORDER_RADIUS]: rem(0.25),
      },
      summary: {
        [BACKGROUND]: cssVar('bg3'),
        [MARGIN]: px(-1),
        [BORDER]: cssVar(BORDER),
        [PADDING]: rem(0.25, 0.125),
        [DISPLAY]: FLEX,
        [BORDER_RADIUS]: rem(0.25),
        'user-select': NONE,
        [JUSTIFY_CONTENT]: 'space-between',
        [ALIGN_ITEMS]: 'center',
        [BACKDROP_FILTER]: 'blur(4px)',
      },
      'summary>span::before': {
        [DISPLAY]: 'inline-block',
        [VERTICAL_ALIGN]: 'sub',
        [MARGIN]: px(2),
        [WIDTH]: rem(1),
        [HEIGHT]: rem(1),
        ...RIGHT_SVG,
      },
      'details[open]>summary': {
        [BORDER + '-' + BOTTOM + '-' + LEFT + '-' + RADIUS]: 0,
        [BORDER + '-' + BOTTOM + '-' + RIGHT + '-' + RADIUS]: 0,
        [MARGIN + '-' + BOTTOM]: 0,
      },
      'details[open]>summary>span::before': DOWN_SVG,
      'details>summary img': {[DISPLAY]: NONE},
      'details[open]>summary img': {
        [DISPLAY]: UNSET,
        [MARGIN + '-' + LEFT]: rem(0.25),
      },
      'details>div': {[OVERFLOW]: AUTO},
      [`caption,#${UNIQUE_ID} p`]: {
        [COLOR]: cssVar('fg2'),
        [PADDING]: rem(0.25, 0.5),
        [TEXT_ALIGN]: LEFT,
        [MARGIN]: 0,
        [WHITE_SPACE]: NOWRAP,
      },
      'caption button': {
        [WIDTH]: rem(1.5),
        [BORDER]: NONE,
        [BACKGROUND]: NONE,
        [COLOR]: cssVar('fg'),
        [PADDING]: 0,
        [CURSOR]: POINTER,
      },
      'caption button[disabled]': {[COLOR]: cssVar('fg2')},
      '.actions': {
        [PADDING]: rem(0.75, 0.5),
        [MARGIN]: 0,
        [DISPLAY]: FLEX,
        [BORDER + '-' + TOP]: cssVar(BORDER),
        [JUSTIFY_CONTENT]: 'space-between',
      },
      // tables
      table: {
        [MIN_WIDTH]: '100%',
        'border-collapse': 'collapse',
        'table-layout': FIXED,
      },
      thead: {[BACKGROUND]: cssVar('bg')},
      [`th,#${UNIQUE_ID} td`]: {
        [OVERFLOW]: HIDDEN,
        [PADDING]: rem(0.25, 0.5),
        [MAX_WIDTH]: rem(20),
        [BORDER]: cssVar(BORDER),
        [TEXT_OVERFLOW]: 'ellipsis',
        [WHITE_SPACE]: NOWRAP,
        'border-width': px(1, 0, 0),
        [TEXT_ALIGN]: LEFT,
      },
      'th:first-child': {
        [WIDTH]: rem(3),
        [MIN_WIDTH]: rem(3),
        [MAX_WIDTH]: rem(3),
      },
      'th.sorted': {[BACKGROUND]: cssVar('bg3')},
      'td.extra': {[TEXT_ALIGN]: RIGHT},
      'tbody button': {
        [BACKGROUND]: NONE,
        [BORDER]: NONE,
        [FONT_SIZE]: 0,
        [WIDTH]: rem(0.8),
        [HEIGHT]: rem(0.8),
        [COLOR]: cssVar('fg2'),
        [MARGIN]: rem(0, 0.25, 0, -0.25),
        'line-height': rem(0.8),
      },
      'tbody button:first-letter': {[FONT_SIZE]: rem(0.8)},
      input: {
        [BACKGROUND]: cssVar('bg2'),
        [COLOR]: UNSET,
        [PADDING]: px(4),
        [BORDER]: 0,
        [MARGIN]: px(-4, 0),
        [FONT_SIZE]: UNSET,
        [MAX_WIDTH]: rem(6),
      },
      'input:focus': {'outline-width': 0},
      'input[type="number"]': {[WIDTH]: rem(3)},
      'input[type="checkbox"]': {[VERTICAL_ALIGN]: px(-2)},
      '.editableCell': {[DISPLAY]: 'inline-block', [MARGIN_RIGHT]: px(2)},
      'button.next': {[MARGIN_RIGHT]: rem(0.5)},
      'img.add': ADD_SVG,
      'img.clone': CLONE_SVG,
      'img.delete': DELETE_SVG,
      'img.done': DONE_SVG,
      'img.edit': EDIT_SVG,
      'img.ok': OK_SVG,
      'img.okDis': OK_SVG_DISABLED,
      'img.cancel': CANCEL_SVG,
      'span.warn': {[MARGIN]: rem(2, 0.25), [COLOR]: '#d81b60'},
    },
    (css, selector) =>
      `#${UNIQUE_ID} ${selector}{${arrayJoin(
        objToArray(css, (value, property) => `${property}:${value};`),
      )}}`,
  ),
);

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

const setNew = (entryOrEntries) =>
  new Set(
    isArray(entryOrEntries) || isUndefined(entryOrEntries)
      ? entryOrEntries
      : [entryOrEntries],
  );
const setAdd = (set, value) => set?.add(value);

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

const STORAGE = 'storage';
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
    WINDOW.addEventListener(STORAGE, storageListener);
    return storageListener;
  };
  const delPersisterListener = (storageListener) =>
    WINDOW.removeEventListener(STORAGE, storageListener);
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
const createSessionPersister = (store, storageName, onIgnoredError) =>
  createStoragePersister(store, storageName, sessionStorage, onIgnoredError);

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
const isJsonType = (type) => type == OBJECT || type == ARRAY;
const encodeIfJson = (value) =>
  isObject(value) || isArray(value) ? JSON_PREFIX + jsonString(value) : value;
const isEncodedJson = (value) => isString(value) && value[0] == JSON_PREFIX;
const decodeIfJson = (raw, _id, encoded) =>
  !encoded && isEncodedJson(raw) ? jsonParse(slice(raw, 1)) : raw;
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

const defaultSorter = (sortKey1, sortKey2) =>
  (sortKey1 ?? 0) < (sortKey2 ?? 0) ? -1 : 1;

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

var _tmpl$$5 = /*#__PURE__*/ template(`<td>`),
  _tmpl$2$5 = /*#__PURE__*/ template(`<th>`);
const UP_ARROW = '\u2191';
const DOWN_ARROW = '\u2193';
const EDITABLE = 'editable';
const extraRowCells = (extraRowCells2 = [], extraRowCellProps) =>
  arrayMap(getValue(extraRowCells2) ?? [], (extraRowCell) => {
    const Component = extraRowCell.component;
    return (() => {
      var _el$ = _tmpl$$5();
      className(_el$, EXTRA);
      insert(_el$, createComponent(Component, extraRowCellProps));
      return _el$;
    })();
  });
const extraHeaders = (extraCells = []) =>
  arrayMap(getValue(extraCells) ?? [], (extraCell) =>
    (() => {
      var _el$2 = _tmpl$2$5();
      className(_el$2, EXTRA);
      insert(_el$2, () => extraCell.label);
      return _el$2;
    })(),
  );

var _tmpl$$4 = /*#__PURE__*/ template(`<th>`),
  _tmpl$2$4 = /*#__PURE__*/ template(`<table><tbody>`),
  _tmpl$3$3 = /*#__PURE__*/ template(`<caption>`),
  _tmpl$4$3 = /*#__PURE__*/ template(`<thead><tr>`),
  _tmpl$5$3 = /*#__PURE__*/ template(`<tr>`),
  _tmpl$6$3 = /*#__PURE__*/ template(`<td>`),
  _tmpl$7$1 = /*#__PURE__*/ template(`<input>`),
  _tmpl$8$1 = /*#__PURE__*/ template(`<input type=number>`),
  _tmpl$9$1 = /*#__PURE__*/ template(`<input type=checkbox>`),
  _tmpl$0$1 = /*#__PURE__*/ template(`<div>`),
  _tmpl$1$1 = /*#__PURE__*/ template(`<button>`);
const HtmlHeaderCell = (props) => {
  const sortDescending = props.sort[1];
  const cellId = props.cellId;
  return (() => {
    var _el$ = _tmpl$$4();
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
      var _el$2 = _tmpl$2$4(),
        _el$3 = _el$2.firstChild;
      insert(
        _el$2,
        paginator
          ? (() => {
              var _el$4 = _tmpl$3$3();
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
                  var _el$5 = _tmpl$4$3(),
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
            var _el$7 = _tmpl$5$3();
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
                        var _el$8 = _tmpl$$4();
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
                      var _el$9 = _tmpl$6$3();
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
        var _el$0 = _tmpl$7$1();
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
        var _el$1 = _tmpl$8$1();
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
        var _el$10 = _tmpl$9$1();
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
        var _el$11 = _tmpl$7$1();
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
        var _el$12 = _tmpl$7$1();
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
      var _el$13 = _tmpl$0$1();
      insert(
        _el$13,
        (() => {
          var _c$4 = memo(() => !!(props.showType !== false && currentWidget));
          return () =>
            _c$4()
              ? (() => {
                  var _el$14 = _tmpl$1$1();
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

var _tmpl$$3 = /*#__PURE__*/ template(`<tr>`),
  _tmpl$2$3 = /*#__PURE__*/ template(`<th>`),
  _tmpl$3$2 = /*#__PURE__*/ template(`<td>`),
  _tmpl$4$2 = /*#__PURE__*/ template(`<table><tbody>`),
  _tmpl$5$2 = /*#__PURE__*/ template(`<thead><tr>`),
  _tmpl$6$2 = /*#__PURE__*/ template(`<th>.Id`);
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
    var _el$ = _tmpl$$3();
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
                  var _el$2 = _tmpl$2$3();
                  insert(_el$2, () => props.localRowId);
                  effect(() => setAttribute(_el$2, 'title', props.localRowId));
                  return _el$2;
                })(),
                (() => {
                  var _el$3 = _tmpl$2$3();
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
                  var _el$4 = _tmpl$3$2();
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
      var _el$5 = _tmpl$4$2(),
        _el$6 = _el$5.firstChild;
      insert(
        _el$5,
        (() => {
          var _c$2 = memo(() => !!isFalse(props.headerRow));
          return () =>
            _c$2()
              ? null
              : (() => {
                  var _el$7 = _tmpl$5$2(),
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
                                var _el$9 = _tmpl$6$2(),
                                  _el$0 = _el$9.firstChild;
                                insert(_el$9, localTableId, _el$0);
                                return _el$9;
                              })(),
                              (() => {
                                var _el$1 = _tmpl$6$2(),
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
                          var _el$11 = _tmpl$2$3();
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

var _tmpl$$2 = /*#__PURE__*/ template(`<button class=previous>←`),
  _tmpl$2$2 = /*#__PURE__*/ template(`<button class=next>→`);
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
              var _el$ = _tmpl$$2();
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
              var _el$2 = _tmpl$2$2();
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

var _tmpl$$1 = /*#__PURE__*/ template(`<td>`),
  _tmpl$2$1 = /*#__PURE__*/ template(`<table><tbody>`),
  _tmpl$3$1 = /*#__PURE__*/ template(`<thead><tr><th>`),
  _tmpl$4$1 = /*#__PURE__*/ template(`<th>Id`),
  _tmpl$5$1 = /*#__PURE__*/ template(`<tr><td>`),
  _tmpl$6$1 = /*#__PURE__*/ template(`<th>`);
const extraValueCells = (extraValueCells2 = [], extraValueCellProps) =>
  arrayMap(getValue(extraValueCells2) ?? [], (extraValueCell) => {
    const Component = extraValueCell.component;
    return (() => {
      var _el$ = _tmpl$$1();
      className(_el$, EXTRA);
      insert(_el$, createComponent(Component, extraValueCellProps));
      return _el$;
    })();
  });
const ValuesInHtmlTable = (props) => {
  const valueIds = useValueIds(() => props.store);
  return (() => {
    var _el$2 = _tmpl$2$1(),
      _el$3 = _el$2.firstChild;
    insert(
      _el$2,
      (() => {
        var _c$ = memo(() => props.headerRow === false);
        return () =>
          _c$()
            ? null
            : (() => {
                var _el$4 = _tmpl$3$1(),
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
                    return () => (_c$2() ? null : _tmpl$4$1());
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
          var _el$8 = _tmpl$5$1(),
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
                      var _el$0 = _tmpl$6$1();
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

var _tmpl$ = /*#__PURE__*/ template(
    `<details><summary><span></span></summary><div>`,
  ),
  _tmpl$2 = /*#__PURE__*/ template(`<img>`),
  _tmpl$3 = /*#__PURE__*/ template(`<img title=Cancel class=cancel>`),
  _tmpl$4 = /*#__PURE__*/ template(`<input type=text autofocus>`),
  _tmpl$5 = /*#__PURE__*/ template(`<img title=Confirm class=ok>`),
  _tmpl$6 = /*#__PURE__*/ template(`<div class=actions><div></div><div>`),
  _tmpl$7 = /*#__PURE__*/ template(`<p>No values.`),
  _tmpl$8 = /*#__PURE__*/ template(`<p>No tables.`),
  _tmpl$9 = /*#__PURE__*/ template(`<tr><th></th><td></td><td>`),
  _tmpl$0 = /*#__PURE__*/ template(
    `<table><thead><tr><th>Metric Id</th><th>Table Id</th><th>Metric</th></tr></thead><tbody>`,
  ),
  _tmpl$1 = /*#__PURE__*/ template(
    `<header><img class=flat><span></span><img class=flat title=Close>`,
  ),
  _tmpl$10 = /*#__PURE__*/ template(`<span class=warn>`),
  _tmpl$11 = /*#__PURE__*/ template(`<article>`),
  _tmpl$12 = /*#__PURE__*/ template(`<main>`),
  _tmpl$13 = /*#__PURE__*/ template(`<style>`),
  _tmpl$14 = /*#__PURE__*/ template(`<aside>`);
const useEditable = (uniqueId, s) => {
  const storedEditable = useCell$1(STATE_TABLE, uniqueId, EDITABLE_CELL, s);
  const [editable, setEditable] = createSignal(false);
  createEffect(() => setEditable(!!storedEditable()));
  return [
    editable,
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextEditable = !editable();
      setEditable(nextEditable);
      s.setCell(STATE_TABLE, uniqueId, EDITABLE_CELL, nextEditable);
    },
  ];
};
const useHasTableCallback = (storeOrStoreId) => {
  const store = useStoreOrStoreById$1(storeOrStoreId);
  return (tableId) => store()?.hasTable(tableId) ?? false;
};
const useHasRowCallback = (storeOrStoreId, tableId) => {
  const store = useStoreOrStoreById$1(storeOrStoreId);
  return (rowId) => store()?.hasRow(tableId, rowId) ?? false;
};
const useHasValueCallback = (storeOrStoreId) => {
  const store = useStoreOrStoreById$1(storeOrStoreId);
  return (valueId) => store()?.hasValue(valueId) ?? false;
};
const Details = (props) => {
  const open2 = useCell$1(STATE_TABLE, props.uniqueId, OPEN_CELL, props.s);
  const handleToggle = (event) =>
    props.s.setCell(
      STATE_TABLE,
      props.uniqueId,
      OPEN_CELL,
      event.currentTarget.open,
    );
  return (() => {
    var _el$ = _tmpl$(),
      _el$2 = _el$.firstChild,
      _el$3 = _el$2.firstChild,
      _el$4 = _el$2.nextSibling;
    _el$.addEventListener('toggle', handleToggle);
    insert(_el$3, () => props.title);
    insert(
      _el$2,
      (() => {
        var _c$ = memo(() => !!props.handleEditable);
        return () =>
          _c$()
            ? (() => {
                var _el$5 = _tmpl$2();
                addEventListener(_el$5, 'click', props.handleEditable);
                effect(
                  (_p$) => {
                    var _v$ = props.editable?.() ? 'done' : 'edit',
                      _v$2 = props.editable?.() ? 'Done editing' : 'Edit';
                    _v$ !== _p$.e && className(_el$5, (_p$.e = _v$));
                    _v$2 !== _p$.t &&
                      setAttribute(_el$5, 'title', (_p$.t = _v$2));
                    return _p$;
                  },
                  {
                    e: undefined,
                    t: undefined,
                  },
                );
                return _el$5;
              })()
            : EMPTY_STRING;
      })(),
      null,
    );
    insert(_el$4, () => props.children);
    effect(() => (_el$.open = !!open2()));
    return _el$;
  })();
};
const ConfirmableActions = (props) => {
  const [confirming, setConfirming] = createSignal();
  const handleDone = () => setConfirming(void 0);
  createEffect(() => {
    if (!isUndefined(confirming())) {
      const handleKeyDown = (event) => {
        if (!isUndefined(confirming()) && event.key == 'Escape') {
          event.preventDefault();
          handleDone();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
    }
  });
  const content = () => {
    const confirmingIndex = confirming();
    const Component = isUndefined(confirmingIndex)
      ? void 0
      : props.actions[confirmingIndex][2];
    return memo(() =>
      Component
        ? [
            memo(() =>
              Component({
                ...props,
                onDone: handleDone,
              }),
            ),
            (() => {
              var _el$6 = _tmpl$3();
              _el$6.addEventListener('click', handleDone);
              return _el$6;
            })(),
          ]
        : arrayMap(props.actions, ([icon, title], index) =>
            (() => {
              var _el$7 = _tmpl$2();
              _el$7.addEventListener('click', () => setConfirming(index));
              setAttribute(_el$7, 'title', title);
              className(_el$7, icon);
              return _el$7;
            })(),
          ),
    );
  };
  return memo(content);
};
const NewId = (props) => {
  const [newId, setNewId] = createSignal(props.suggestedId);
  const [newIdOk, setNewIdOk] = createSignal(true);
  const [previousSuggestedId, setPreviousSuggestedNewId] = createSignal(
    props.suggestedId,
  );
  const handleNewIdChange = (event) => {
    const id = event.currentTarget.value;
    setNewId(id);
    setNewIdOk(!props.has(id));
  };
  const handleClick = () => {
    const id = newId();
    if (props.has(id)) {
      setNewIdOk(false);
    } else {
      props.set(id);
      props.onDone();
    }
  };
  const handleKeyDown = (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      handleClick();
    }
  };
  createEffect(() => {
    if (props.suggestedId != previousSuggestedId()) {
      setNewId(props.suggestedId);
      setPreviousSuggestedNewId(props.suggestedId);
    }
  });
  return [
    memo(() => (props.prompt ?? 'New Id') + ': '),
    (() => {
      var _el$8 = _tmpl$4();
      _el$8.addEventListener('keydown', handleKeyDown);
      _el$8.addEventListener('input', handleNewIdChange);
      effect(() => (_el$8.value = newId()));
      return _el$8;
    })(),
    ' ',
    (() => {
      var _el$9 = _tmpl$2();
      _el$9.addEventListener('click', handleClick);
      effect(
        (_p$) => {
          var _v$3 = newIdOk() ? 'Confirm' : 'Id already exists',
            _v$4 = newIdOk() ? 'ok' : 'okDis';
          _v$3 !== _p$.e && setAttribute(_el$9, 'title', (_p$.e = _v$3));
          _v$4 !== _p$.t && className(_el$9, (_p$.t = _v$4));
          return _p$;
        },
        {
          e: undefined,
          t: undefined,
        },
      );
      return _el$9;
    })(),
  ];
};
const Delete = (props) => {
  const handleKeyDown = (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      props.onClick();
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  return [
    memo(() => (props.prompt ?? 'Delete') + '? '),
    (() => {
      var _el$0 = _tmpl$5();
      addEventListener(_el$0, 'click', props.onClick);
      return _el$0;
    })(),
  ];
};
const Actions = (props) =>
  (() => {
    var _el$1 = _tmpl$6(),
      _el$10 = _el$1.firstChild,
      _el$11 = _el$10.nextSibling;
    insert(_el$10, () => props.left);
    insert(_el$11, () => props.right);
    return _el$1;
  })();
const AddTable = (props) => {
  const has = useHasTableCallback(props.store);
  return NewId({
    onDone: props.onDone,
    suggestedId: getNewIdFromSuggestedId('table', has),
    has,
    set: useSetTableCallback(
      (newId) => newId,
      () => ({
        row: {
          cell: '',
        },
      }),
      props.store,
    ),
    prompt: 'Add table',
  });
};
const DeleteTables = (props) =>
  Delete({
    onClick: useDelTablesCallback(props.store, props.onDone),
    prompt: 'Delete all tables',
  });
const TablesActions = (props) =>
  Actions({
    left: ConfirmableActions({
      actions: [['add', 'Add table', AddTable]],
      store: props.store,
    }),
    right: useHasTables(props.store)()
      ? ConfirmableActions({
          actions: [['delete', 'Delete all tables', DeleteTables]],
          store: props.store,
        })
      : EMPTY_STRING,
  });
const AddRow = (props) => {
  const has = useHasRowCallback(props.store, props.tableId);
  return NewId({
    onDone: props.onDone,
    suggestedId: getNewIdFromSuggestedId('row', has),
    has,
    set: useSetRowCallback(
      props.tableId,
      (newId) => newId,
      (_, store) =>
        objNew(
          arrayMap(store.getTableCellIds(props.tableId), (cellId) => [
            cellId,
            '',
          ]),
        ),
    ),
    prompt: 'Add row',
  });
};
const CloneTable = (props) => {
  const store = useStoreOrStoreById$1(props.store)();
  const has = useHasTableCallback(store);
  return NewId({
    onDone: props.onDone,
    suggestedId: getNewIdFromSuggestedId(props.tableId, has),
    has,
    set: useSetTableCallback(
      (tableId) => tableId,
      (_, store2) => store2.getTable(props.tableId),
      store,
    ),
    prompt: 'Clone table to',
  });
};
const DeleteTable = (props) =>
  Delete({
    onClick: useDelTableCallback(props.tableId, props.store, props.onDone),
    prompt: 'Delete table',
  });
const TableActions1 = (props) =>
  ConfirmableActions({
    actions: [['add', 'Add row', AddRow]],
    store: props.store,
    tableId: props.tableId,
  });
const TableActions2 = (props) =>
  ConfirmableActions({
    actions: [
      ['clone', 'Clone table', CloneTable],
      ['delete', 'Delete table', DeleteTable],
    ],
    store: props.store,
    tableId: props.tableId,
  });
const AddCell = (props) => {
  const store = useStoreOrStoreById$1(props.store)();
  const has = (cellId) =>
    store?.hasCell(props.tableId, props.rowId, cellId) ?? false;
  return NewId({
    onDone: props.onDone,
    suggestedId: getNewIdFromSuggestedId('cell', has),
    has,
    set: useSetCellCallback$1(
      props.tableId,
      props.rowId,
      (newId) => newId,
      () => '',
      store,
    ),
    prompt: 'Add cell',
  });
};
const CloneRow = (props) => {
  const store = useStoreOrStoreById$1(props.store)();
  const has = useHasRowCallback(store, props.tableId);
  return NewId({
    onDone: props.onDone,
    suggestedId: getNewIdFromSuggestedId(props.rowId, has),
    has,
    set: useSetRowCallback(
      props.tableId,
      (newId) => newId,
      (_, store2) => store2.getRow(props.tableId, props.rowId),
      store,
    ),
    prompt: 'Clone row to',
  });
};
const DeleteRow = (props) =>
  Delete({
    onClick: useDelRowCallback(
      props.tableId,
      props.rowId,
      props.store,
      props.onDone,
    ),
    prompt: 'Delete row',
  });
const RowActions = (props) =>
  ConfirmableActions({
    actions: [
      ['add', 'Add cell', AddCell],
      ['clone', 'Clone row', CloneRow],
      ['delete', 'Delete row', DeleteRow],
    ],
    store: props.store,
    tableId: props.tableId,
    rowId: props.rowId,
  });
const CellDelete = (props) =>
  Delete({
    onClick: useDelCellCallback(
      props.tableId,
      props.rowId,
      props.cellId,
      true,
      props.store,
      props.onDone,
    ),
    prompt: 'Delete cell',
  });
const CellActions = (props) =>
  ConfirmableActions({
    actions: [['delete', 'Delete cell', CellDelete]],
    store: props.store,
    tableId: props.tableId,
    rowId: props.rowId,
    cellId: props.cellId,
  });
const AddValue = (props) => {
  const has = useHasValueCallback(props.store);
  return NewId({
    onDone: props.onDone,
    suggestedId: getNewIdFromSuggestedId('value', has),
    has,
    set: useSetValueCallback$1(
      (newId) => newId,
      () => '',
      props.store,
    ),
    prompt: 'Add value',
  });
};
const DeleteValues = (props) =>
  Delete({
    onClick: useDelValuesCallback(props.store, props.onDone),
    prompt: 'Delete all values',
  });
const ValuesActions = (props) =>
  Actions({
    left: ConfirmableActions({
      actions: [['add', 'Add value', AddValue]],
      store: props.store,
    }),
    right: useHasValues(props.store)()
      ? ConfirmableActions({
          actions: [['delete', 'Delete all values', DeleteValues]],
          store: props.store,
        })
      : EMPTY_STRING,
  });
const CloneValue = (props) => {
  const has = useHasValueCallback(props.store);
  return NewId({
    onDone: props.onDone,
    suggestedId: getNewIdFromSuggestedId(props.valueId, has),
    has,
    set: useSetValueCallback$1(
      (newId) => newId,
      (_, store) => store.getValue(props.valueId) ?? '',
      props.store,
    ),
    prompt: 'Clone value to',
  });
};
const DeleteValue = (props) =>
  Delete({
    onClick: useDelValueCallback(props.valueId, props.store, props.onDone),
    prompt: 'Delete value',
  });
const ValueActions = (props) =>
  ConfirmableActions({
    actions: [
      ['clone', 'Clone value', CloneValue],
      ['delete', 'Delete value', DeleteValue],
    ],
    store: props.store,
    valueId: props.valueId,
  });
const valueActions = [
  {
    label: '',
    component: ValueActions,
  },
];
const rowActions = [
  {
    label: '',
    component: RowActions,
  },
];
const EditableCellViewWithActions = (props) => [
  createComponent(EditableCellView, props),
  memo(() =>
    memo(
      () =>
        !!useHasCell(props.tableId, props.rowId, props.cellId, props.store)(),
    )()
      ? createComponent(CellActions, props)
      : EMPTY_STRING,
  ),
];
const ValuesView = (props) => {
  const uniqueId = getUniqueId('v', props.storeId);
  const [editable, handleEditable] = useEditable(uniqueId, props.s);
  const valueIds = useValueIds$1(props.store);
  return Details({
    uniqueId,
    title: VALUES,
    editable,
    handleEditable,
    s: props.s,
    get children() {
      return [
        memo(() =>
          memo(() => !!arrayIsEmpty(valueIds()))()
            ? _tmpl$7()
            : createComponent(ValuesInHtmlTable, {
                get store() {
                  return props.store;
                },
                get editable() {
                  return editable();
                },
                extraCellsAfter: () => (editable() ? valueActions : []),
              }),
        ),
        memo(() =>
          memo(() => !!editable())()
            ? createComponent(ValuesActions, {
                get store() {
                  return props.store;
                },
              })
            : EMPTY_STRING,
        ),
      ];
    },
  });
};
const TableView = (props) => {
  const uniqueId = getUniqueId('t', props.storeId, props.tableId);
  const sort = useCell$1(STATE_TABLE, uniqueId, SORT_CELL, props.s);
  const handleChange = useSetCellCallback$1(
    STATE_TABLE,
    uniqueId,
    SORT_CELL,
    jsonStringWithMap,
    props.s,
  );
  const [editable, handleEditable] = useEditable(uniqueId, props.s);
  const cellIds = useTableCellIds$1(props.tableId, props.store);
  return Details({
    uniqueId,
    title: TABLE + ': ' + props.tableId,
    editable,
    handleEditable,
    s: props.s,
    get children() {
      const [cellId, descending, offset] = jsonParse(sort() ?? '[]');
      return [
        createComponent(SortedTableInHtmlTable, {
          get tableId() {
            return props.tableId;
          },
          get store() {
            return props.store;
          },
          cellId: cellId,
          descending: descending,
          offset: offset,
          limit: 10,
          paginator: true,
          sortOnClick: true,
          onChange: handleChange,
          get editable() {
            return editable();
          },
          extraCellsAfter: () => (editable() ? rowActions : []),
          customCells: () => {
            const CellComponent = editable()
              ? EditableCellViewWithActions
              : CellView;
            return objNew(
              arrayMap(cellIds(), (cellId2) => [
                cellId2,
                {
                  label: cellId2,
                  component: CellComponent,
                },
              ]),
            );
          },
        }),
        memo(() =>
          memo(() => !!editable())()
            ? (() => {
                var _el$13 = _tmpl$6(),
                  _el$14 = _el$13.firstChild,
                  _el$15 = _el$14.nextSibling;
                insert(
                  _el$14,
                  createComponent(TableActions1, {
                    get tableId() {
                      return props.tableId;
                    },
                    get store() {
                      return props.store;
                    },
                  }),
                );
                insert(
                  _el$15,
                  createComponent(TableActions2, {
                    get tableId() {
                      return props.tableId;
                    },
                    get store() {
                      return props.store;
                    },
                  }),
                );
                return _el$13;
              })()
            : EMPTY_STRING,
        ),
      ];
    },
  });
};
const TablesView = (props) => {
  const uniqueId = getUniqueId('ts', props.storeId);
  const [editable, handleEditable] = useEditable(uniqueId, props.s);
  const tableIds = useTableIds(props.store);
  return Details({
    uniqueId,
    title: TABLES,
    editable,
    handleEditable,
    s: props.s,
    get children() {
      return [
        memo(() =>
          memo(() => !!arrayIsEmpty(tableIds()))()
            ? _tmpl$8()
            : sortedIdsMap(tableIds(), (tableId) =>
                createComponent(TableView, {
                  get store() {
                    return props.store;
                  },
                  get storeId() {
                    return props.storeId;
                  },
                  tableId: tableId,
                  get s() {
                    return props.s;
                  },
                }),
              ),
        ),
        memo(() =>
          memo(() => !!editable())()
            ? createComponent(TablesActions, {
                get store() {
                  return props.store;
                },
              })
            : EMPTY_STRING,
        ),
      ];
    },
  });
};
const StoreView = (props) => {
  const store = useStore(props.storeId);
  return memo(() =>
    memo(() => !!isUndefined(store()))()
      ? EMPTY_STRING
      : createComponent(Details, {
          get uniqueId() {
            return getUniqueId('s', props.storeId);
          },
          get title() {
            return (
              (store().isMergeable() ? 'Mergeable' : '') +
              'Store: ' +
              (props.storeId ?? DEFAULT)
            );
          },
          get s() {
            return props.s;
          },
          get children() {
            return [
              createComponent(ValuesView, {
                get storeId() {
                  return props.storeId;
                },
                get store() {
                  return store();
                },
                get s() {
                  return props.s;
                },
              }),
              createComponent(TablesView, {
                get storeId() {
                  return props.storeId;
                },
                get store() {
                  return store();
                },
                get s() {
                  return props.s;
                },
              }),
            ];
          },
        }),
  );
};
const MetricRow = (props) =>
  (() => {
    var _el$17 = _tmpl$9(),
      _el$18 = _el$17.firstChild,
      _el$19 = _el$18.nextSibling,
      _el$20 = _el$19.nextSibling;
    insert(_el$18, () => props.metricId);
    insert(_el$19, () => props.metrics?.getTableId(props.metricId));
    insert(_el$20, () => useMetric(props.metricId, props.metrics)());
    effect(() => setAttribute(_el$18, 'title', props.metricId));
    return _el$17;
  })();
const MetricsView = (props) => {
  const metrics = useMetrics(props.metricsId);
  const metricIds = useMetricIds(metrics);
  return memo(() =>
    memo(() => !!isUndefined(metrics()))()
      ? EMPTY_STRING
      : createComponent(Details, {
          get uniqueId() {
            return getUniqueId('m', props.metricsId);
          },
          get title() {
            return 'Metrics: ' + (props.metricsId ?? DEFAULT);
          },
          get s() {
            return props.s;
          },
          get children() {
            return memo(() => !!arrayIsEmpty(metricIds()))()
              ? 'No metrics defined'
              : (() => {
                  var _el$21 = _tmpl$0(),
                    _el$22 = _el$21.firstChild,
                    _el$23 = _el$22.nextSibling;
                  insert(_el$23, () =>
                    arrayMap(metricIds(), (metricId) =>
                      createComponent(MetricRow, {
                        get metrics() {
                          return metrics();
                        },
                        metricId: metricId,
                      }),
                    ),
                  );
                  return _el$21;
                })();
          },
        }),
  );
};
const SliceView = (props) => {
  const uniqueId = getUniqueId(
    'i',
    props.indexesId,
    props.indexId,
    props.sliceId,
  );
  const [editable, handleEditable] = useEditable(uniqueId, props.s);
  return Details({
    uniqueId,
    title: 'Slice: ' + props.sliceId,
    editable,
    handleEditable,
    s: props.s,
    get children() {
      return createComponent(SliceInHtmlTable, {
        get sliceId() {
          return props.sliceId;
        },
        get indexId() {
          return props.indexId;
        },
        get indexes() {
          return props.indexes;
        },
        get editable() {
          return editable();
        },
      });
    },
  });
};
const IndexView = (props) =>
  createComponent(Details, {
    get uniqueId() {
      return getUniqueId('i', props.indexesId, props.indexId);
    },
    get title() {
      return 'Index: ' + props.indexId;
    },
    get s() {
      return props.s;
    },
    get children() {
      return arrayMap(useSliceIds(props.indexId, props.indexes)(), (sliceId) =>
        createComponent(SliceView, {
          get indexes() {
            return props.indexes;
          },
          get indexesId() {
            return props.indexesId;
          },
          get indexId() {
            return props.indexId;
          },
          sliceId: sliceId,
          get s() {
            return props.s;
          },
        }),
      );
    },
  });
const IndexesView = (props) => {
  const indexes = useIndexes(props.indexesId);
  const indexIds = useIndexIds(indexes);
  return memo(() =>
    memo(() => !!isUndefined(indexes()))()
      ? EMPTY_STRING
      : createComponent(Details, {
          get uniqueId() {
            return getUniqueId('i', props.indexesId);
          },
          get title() {
            return 'Indexes: ' + (props.indexesId ?? DEFAULT);
          },
          get s() {
            return props.s;
          },
          get children() {
            return memo(() => !!arrayIsEmpty(indexIds()))()
              ? 'No indexes defined'
              : sortedIdsMap(indexIds(), (indexId) =>
                  createComponent(IndexView, {
                    get indexes() {
                      return indexes();
                    },
                    get indexesId() {
                      return props.indexesId;
                    },
                    indexId: indexId,
                    get s() {
                      return props.s;
                    },
                  }),
                );
          },
        }),
  );
};
const QueryView = (props) => {
  const uniqueId = getUniqueId('q', props.queriesId, props.queryId);
  const sort = useCell$1(STATE_TABLE, uniqueId, SORT_CELL, props.s);
  const sortProps = createMemo(() => jsonParse(sort() ?? '[]'));
  const handleChange = useSetCellCallback$1(
    STATE_TABLE,
    uniqueId,
    SORT_CELL,
    jsonStringWithMap,
    props.s,
  );
  return createComponent(Details, {
    uniqueId: uniqueId,
    get title() {
      return 'Query: ' + props.queryId;
    },
    get s() {
      return props.s;
    },
    get children() {
      return createComponent(ResultSortedTableInHtmlTable, {
        get queryId() {
          return props.queryId;
        },
        get queries() {
          return props.queries;
        },
        get cellId() {
          return sortProps()[0];
        },
        get descending() {
          return sortProps()[1];
        },
        get offset() {
          return sortProps()[2];
        },
        limit: 10,
        paginator: true,
        sortOnClick: true,
        onChange: handleChange,
      });
    },
  });
};
const QueriesView = (props) => {
  const queries = useQueries(props.queriesId);
  const queryIds = useQueryIds(queries);
  return memo(() =>
    memo(() => !!isUndefined(queries()))()
      ? EMPTY_STRING
      : createComponent(Details, {
          get uniqueId() {
            return getUniqueId('q', props.queriesId);
          },
          get title() {
            return 'Queries: ' + (props.queriesId ?? DEFAULT);
          },
          get s() {
            return props.s;
          },
          get children() {
            return memo(() => !!arrayIsEmpty(queryIds()))()
              ? 'No queries defined'
              : sortedIdsMap(queryIds(), (queryId) =>
                  createComponent(QueryView, {
                    get queries() {
                      return queries();
                    },
                    get queriesId() {
                      return props.queriesId;
                    },
                    queryId: queryId,
                    get s() {
                      return props.s;
                    },
                  }),
                );
          },
        }),
  );
};
const RelationshipView = (props) => {
  const uniqueId = getUniqueId(
    'r',
    props.relationshipsId,
    props.relationshipId,
  );
  const [editable, handleEditable] = useEditable(uniqueId, props.s);
  return Details({
    uniqueId,
    title: 'Relationship: ' + props.relationshipId,
    editable,
    handleEditable,
    s: props.s,
    get children() {
      return createComponent(RelationshipInHtmlTable, {
        get relationshipId() {
          return props.relationshipId;
        },
        get relationships() {
          return props.relationships;
        },
        get editable() {
          return editable();
        },
      });
    },
  });
};
const RelationshipsView = (props) => {
  const relationships = useRelationships(props.relationshipsId);
  const relationshipIds = useRelationshipIds(relationships);
  return memo(() =>
    memo(() => !!isUndefined(relationships()))()
      ? EMPTY_STRING
      : createComponent(Details, {
          get uniqueId() {
            return getUniqueId('r', props.relationshipsId);
          },
          get title() {
            return 'Relationships: ' + (props.relationshipsId ?? DEFAULT);
          },
          get s() {
            return props.s;
          },
          get children() {
            return memo(() => !!arrayIsEmpty(relationshipIds()))()
              ? 'No relationships defined'
              : sortedIdsMap(relationshipIds(), (relationshipId) =>
                  createComponent(RelationshipView, {
                    get relationships() {
                      return relationships();
                    },
                    get relationshipsId() {
                      return props.relationshipsId;
                    },
                    relationshipId: relationshipId,
                    get s() {
                      return props.s;
                    },
                  }),
                );
          },
        }),
  );
};
const Header = (props) => {
  const position = useValue$1(POSITION_VALUE, props.s);
  const handleClick = () => open('https://tinybase.org', '_blank');
  const handleClose = () => props.s.setValue(OPEN_VALUE, false);
  const handleDock = (event) =>
    props.s.setValue(POSITION_VALUE, Number(event.currentTarget.dataset.id));
  return (() => {
    var _el$24 = _tmpl$1(),
      _el$25 = _el$24.firstChild,
      _el$26 = _el$25.nextSibling,
      _el$27 = _el$26.nextSibling;
    _el$25.addEventListener('click', handleClick);
    setAttribute(_el$25, 'title', TITLE);
    insert(_el$26, TITLE);
    insert(
      _el$24,
      () =>
        arrayMap(POSITIONS, (name, p) =>
          p == (position() ?? 1)
            ? EMPTY_STRING
            : (() => {
                var _el$28 = _tmpl$2();
                _el$28.addEventListener('click', handleDock);
                setAttribute(_el$28, 'data-id', p);
                setAttribute(_el$28, 'title', 'Dock to ' + name);
                return _el$28;
              })(),
        ),
      _el$27,
    );
    _el$27.addEventListener('click', handleClose);
    return _el$24;
  })();
};
const Nub = (props) => {
  const position = useValue$1(POSITION_VALUE, props.s);
  const open2 = useValue$1(OPEN_VALUE, props.s);
  const handleOpen = () => props.s.setValue(OPEN_VALUE, true);
  return memo(() =>
    memo(() => !!open2())()
      ? EMPTY_STRING
      : (() => {
          var _el$29 = _tmpl$2();
          _el$29.addEventListener('click', handleOpen);
          setAttribute(_el$29, 'title', TITLE);
          effect(() => setAttribute(_el$29, 'data-position', position() ?? 1));
          return _el$29;
        })(),
  );
};
const Body = (props) => {
  let article;
  let idleCallback = 0;
  const [scrolled, setScrolled] = createSignal(false);
  const state = useTable(STATE_TABLE, props.s);
  const scrollValues = useValues(props.s);
  createEffect(() => {
    const {scrollLeft, scrollTop} = scrollValues();
    if (article && !scrolled()) {
      const observer = new MutationObserver(() => {
        if (
          article &&
          article.scrollWidth >= mathFloor(scrollLeft) + article.clientWidth &&
          article.scrollHeight >= mathFloor(scrollTop) + article.clientHeight
        ) {
          article.scrollTo(scrollLeft, scrollTop);
        }
      });
      observer.observe(article, {
        childList: true,
        subtree: true,
      });
      onCleanup(() => observer.disconnect());
    }
  });
  const handleScroll = (event) => {
    const {scrollLeft, scrollTop} = event.currentTarget;
    cancelInspectorIdleCallback(idleCallback);
    idleCallback = requestInspectorIdleCallback(() => {
      setScrolled(true);
      props.s.setPartialValues({
        scrollLeft,
        scrollTop,
      });
    });
  };
  const store = useStore();
  const storeIds = useStoreIds();
  const metrics = useMetrics();
  const metricsIds = useMetricsIds();
  const indexes = useIndexes();
  const indexesIds = useIndexesIds();
  const relationships = useRelationships();
  const relationshipsIds = useRelationshipsIds();
  const queries = useQueries();
  const queriesIds = useQueriesIds();
  return memo(() =>
    memo(
      () =>
        !!(
          state() &&
          isUndefined(store()) &&
          arrayIsEmpty(storeIds()) &&
          isUndefined(metrics()) &&
          arrayIsEmpty(metricsIds()) &&
          isUndefined(indexes()) &&
          arrayIsEmpty(indexesIds()) &&
          isUndefined(relationships()) &&
          arrayIsEmpty(relationshipsIds()) &&
          isUndefined(queries()) &&
          arrayIsEmpty(queriesIds())
        ),
    )()
      ? (() => {
          var _el$30 = _tmpl$10();
          insert(_el$30, NO_PROVIDED_OBJECTS_MESSAGE);
          return _el$30;
        })()
      : (() => {
          var _el$31 = _tmpl$11();
          _el$31.addEventListener('scroll', handleScroll);
          var _ref$ = article;
          typeof _ref$ === 'function' ? use(_ref$, _el$31) : (article = _el$31);
          insert(
            _el$31,
            createComponent(StoreView, {
              get s() {
                return props.s;
              },
            }),
            null,
          );
          insert(
            _el$31,
            () =>
              arrayMap(storeIds(), (storeId) =>
                createComponent(StoreView, {
                  storeId: storeId,
                  get s() {
                    return props.s;
                  },
                }),
              ),
            null,
          );
          insert(
            _el$31,
            createComponent(MetricsView, {
              get s() {
                return props.s;
              },
            }),
            null,
          );
          insert(
            _el$31,
            () =>
              arrayMap(metricsIds(), (metricsId) =>
                createComponent(MetricsView, {
                  metricsId: metricsId,
                  get s() {
                    return props.s;
                  },
                }),
              ),
            null,
          );
          insert(
            _el$31,
            createComponent(IndexesView, {
              get s() {
                return props.s;
              },
            }),
            null,
          );
          insert(
            _el$31,
            () =>
              arrayMap(indexesIds(), (indexesId) =>
                createComponent(IndexesView, {
                  indexesId: indexesId,
                  get s() {
                    return props.s;
                  },
                }),
              ),
            null,
          );
          insert(
            _el$31,
            createComponent(RelationshipsView, {
              get s() {
                return props.s;
              },
            }),
            null,
          );
          insert(
            _el$31,
            () =>
              arrayMap(relationshipsIds(), (relationshipsId) =>
                createComponent(RelationshipsView, {
                  relationshipsId: relationshipsId,
                  get s() {
                    return props.s;
                  },
                }),
              ),
            null,
          );
          insert(
            _el$31,
            createComponent(QueriesView, {
              get s() {
                return props.s;
              },
            }),
            null,
          );
          insert(
            _el$31,
            () =>
              arrayMap(queriesIds(), (queriesId) =>
                createComponent(QueriesView, {
                  queriesId: queriesId,
                  get s() {
                    return props.s;
                  },
                }),
              ),
            null,
          );
          return _el$31;
        })(),
  );
};
const Panel = (props) => {
  const position = useValue$1(POSITION_VALUE, props.s);
  const open2 = useValue$1(OPEN_VALUE, props.s);
  return memo(() =>
    memo(() => !!open2())()
      ? (() => {
          var _el$32 = _tmpl$12();
          insert(
            _el$32,
            createComponent(Header, {
              get s() {
                return props.s;
              },
            }),
            null,
          );
          insert(
            _el$32,
            createComponent(ErrorBoundary, {
              get fallback() {
                return (() => {
                  var _el$33 = _tmpl$10();
                  insert(_el$33, INSPECTOR_ERROR_MESSAGE);
                  return _el$33;
                })();
              },
              get children() {
                return createComponent(Body, {
                  get s() {
                    return props.s;
                  },
                });
              },
            }),
            null,
          );
          effect(() => setAttribute(_el$32, 'data-position', position() ?? 1));
          return _el$32;
        })()
      : EMPTY_STRING,
  );
};
const Inspector = (props) => {
  const position = props.position ?? 'right';
  const open2 = props.open ?? false;
  const values = {
    position: getInitialPosition(position),
    open: !!open2,
  };
  const s = useCreateStore(createStore);
  const [ready, setReady] = createSignal(false);
  useCreatePersister(
    s,
    (s2) => createSessionPersister(s2, UNIQUE_ID),
    async (persister) => {
      await persister.load([{}, values]);
      await persister.startAutoSave();
      setReady(true);
    },
    (persister) => persister.destroy(),
  );
  return [
    memo(() =>
      memo(() => !!ready())()
        ? (() => {
            var _el$35 = _tmpl$14();
            setAttribute(_el$35, 'id', UNIQUE_ID);
            insert(
              _el$35,
              createComponent(Nub, {
                get s() {
                  return s();
                },
              }),
              null,
            );
            insert(
              _el$35,
              createComponent(Panel, {
                get s() {
                  return s();
                },
              }),
              null,
            );
            effect((_$p) =>
              setStyleProperty(_el$35, '--hue', props.hue ?? 270),
            );
            return _el$35;
          })()
        : EMPTY_STRING,
    ),
    (() => {
      var _el$34 = _tmpl$13();
      insert(_el$34, APP_STYLESHEET);
      return _el$34;
    })(),
  ];
};

export {Inspector};
