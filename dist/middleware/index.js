const isUndefined = (thing) => thing === void 0;

const arrayEvery = (array, cb) => array.every(cb);
const arrayReduce = (array, cb, initial) => array.reduce(cb, initial);
const arrayPush = (array, ...values) => array.push(...values);

const object = Object;
const objFreeze = object.freeze;

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

export {createMiddleware};
