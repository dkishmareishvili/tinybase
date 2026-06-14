/**
 * The ui-solid module of the TinyBase project provides primitives and
 * components to make it easy to create reactive apps with Store objects in
 * Solid.
 *
 * The primitives in this module provide access to the data and structures
 * exposed by other modules in the project. As well as immediate access, most
 * return Solid Accessor functions and register listeners so components using
 * those primitives update selectively when data changes.
 *
 * The components in this module provide a further abstraction over those
 * primitives to ease the composition of user interfaces that use TinyBase.
 *
 * Unlike React hooks, the primitive signatures do not include dependency-list
 * parameters. Solid tracks reactive reads automatically, and the primitives
 * update when their Store data or accessor arguments change. Prefer passing
 * reactive values as accessor functions, such as `() => props.tableId`.
 * @see Building UIs With Solid guide
 * @see Building A UI With Metrics guide
 * @see Building A UI With Indexes guide
 * @see Building A UI With Relationships guide
 * @see Building A UI With Queries guide
 * @see Building A UI With Checkpoints guide
 * @packageDocumentation
 * @module ui-solid
 * @since v8.3.0
 */
import type {Accessor, Component, JSXElement} from 'solid-js';
import type {
  CheckpointIds,
  CheckpointIdsListener,
  CheckpointListener,
  Checkpoints,
} from '../checkpoints/index.d.ts';
import type {
  Callback,
  Id,
  IdOrNull,
  Ids,
  ParameterizedCallback,
} from '../common/index.d.ts';
import type {
  Indexes,
  SliceIdsListener,
  SliceRowIdsListener,
} from '../indexes/index.d.ts';
import type {MergeableStore} from '../mergeable-store/index.d.ts';
import type {MetricListener, Metrics} from '../metrics/index.d.ts';
import type {
  AnyPersister,
  PersistedStore,
  Persister,
  Persists,
  Status,
  StatusListener,
} from '../persisters/index.d.ts';
import type {
  ParamValue,
  ParamValueListener,
  ParamValues,
  ParamValuesListener,
  Queries,
  ResultCellIdsListener,
  ResultCellListener,
  ResultRowCountListener,
  ResultRowIdsListener,
  ResultRowListener,
  ResultSortedRowIdsListener,
  ResultTableCellIdsListener,
  ResultTableListener,
} from '../queries/index.d.ts';
import type {
  LinkedRowIdsListener,
  LocalRowIdsListener,
  Relationships,
  RemoteRowIdListener,
} from '../relationships/index.d.ts';
import type {
  Cell,
  CellIdsListener,
  CellListener,
  CellOrUndefined,
  HasCellListener,
  HasRowListener,
  HasTableCellListener,
  HasTableListener,
  HasTablesListener,
  HasValueListener,
  HasValuesListener,
  MapCell,
  MapValue,
  Row,
  RowCountListener,
  RowIdsListener,
  RowListener,
  SortedRowIdsArgs,
  SortedRowIdsListener,
  Store,
  Table,
  TableCellIdsListener,
  TableIdsListener,
  TableListener,
  Tables,
  TablesListener,
  TransactionListener,
  Value,
  ValueIdsListener,
  ValueListener,
  ValueOrUndefined,
  Values,
  ValuesListener,
} from '../store/index.d.ts';
import type {Synchronizer} from '../synchronizers/index.d.ts';

/**
 * The MaybeAccessor type represents a value that can be provided either as a
 * plain value or as a Solid Accessor function.
 *
 * Many ui-solid primitives accept Ids, Store references, and option values as
 * MaybeAccessor values. Passing an Accessor is the idiomatic way to connect a
 * primitive to changing component props or signals, such as `() =>
 * props.tableId`.
 *
 * When an Accessor is provided, its reactive reads are tracked so the primitive
 * updates when the Accessor value changes.
 * @category Identity
 * @since v8.3.0
 */
export type MaybeAccessor<Thing> = Thing | Accessor<Thing>;

/**
 * The StoreOrStoreId type is used when you need to refer to a Store in a Solid
 * primitive or component.
 *
 * In some simple cases you will already have a direct reference to the Store.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Store objects into a context that can be used throughout the app. In
 * this case you will want to refer to a Store by its Id in that context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Store or its Id.
 * @category Identity
 * @since v8.3.0
 */
export type StoreOrStoreId = Store | Id;

/**
 * The MetricsOrMetricsId type is used when you need to refer to a Metrics
 * object in a Solid primitive or component.
 *
 * In some simple cases you will already have a direct reference to the Metrics
 * object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Metrics objects into a context that can be used throughout the app.
 * In this case you will want to refer to a Metrics object by its Id in that
 * context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Metrics object or its
 * Id.
 * @category Identity
 * @since v8.3.0
 */
export type MetricsOrMetricsId = Metrics | Id;

/**
 * The IndexesOrIndexesId type is used when you need to refer to an Indexes
 * object in a Solid primitive or component.
 *
 * In some simple cases you will already have a direct reference to the Indexes
 * object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Indexes objects into a context that can be used throughout the app.
 * In this case you will want to refer to an Indexes object by its Id in that
 * context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Indexes object or its
 * Id.
 * @category Identity
 * @since v8.3.0
 */
export type IndexesOrIndexesId = Indexes | Id;

/**
 * The RelationshipsOrRelationshipsId type is used when you need to refer to a
 * Relationships object in a Solid primitive or component.
 *
 * In some simple cases you will already have a direct reference to the
 * Relationships object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Relationships objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Relationships object by its Id
 * in that context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Relationships object
 * or its Id.
 * @category Identity
 * @since v8.3.0
 */
export type RelationshipsOrRelationshipsId = Relationships | Id;

/**
 * The QueriesOrQueriesId type is used when you need to refer to a Queries
 * object in a Solid primitive or component.
 *
 * In some simple cases you will already have a direct reference to the Queries
 * object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Queries objects into a context that can be used throughout the app.
 * In this case you will want to refer to a Queries object by its Id in that
 * context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Queries object or its
 * Id.
 * @category Identity
 * @since v8.3.0
 */
export type QueriesOrQueriesId = Queries | Id;

/**
 * The CheckpointsOrCheckpointsId type is used when you need to refer to a
 * Checkpoints object in a Solid primitive or component.
 *
 * In some simple cases you will already have a direct reference to the
 * Checkpoints object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Checkpoints objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Checkpoints object by its Id in
 * that context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Checkpoints object or
 * its Id.
 * @category Identity
 * @since v8.3.0
 */
export type CheckpointsOrCheckpointsId = Checkpoints | Id;

/**
 * The PersisterOrPersisterId type is used when you need to refer to a Persister
 * object in a Solid primitive or component.
 *
 * In some simple cases you will already have a direct reference to the
 * Persister object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Persister objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Persister object by its Id in
 * that context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Persister or its Id.
 * @category Identity
 * @since v8.3.0
 */
export type PersisterOrPersisterId = AnyPersister | Id;

/**
 * The SynchronizerOrSynchronizerId type is used when you need to refer to a
 * Synchronizer object in a Solid primitive or component.
 *
 * In some simple cases you will already have a direct reference to the
 * Synchronizer object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Synchronizer objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Synchronizer object by its Id
 * in that context.
 *
 * Many primitives and components in this ui-solid module take this type as a
 * parameter or a prop, allowing you to pass in either the Synchronizer or its
 * Id.
 * @category Identity
 * @since v8.3.0
 */
export type SynchronizerOrSynchronizerId = Synchronizer | Id;

/**
 * The UndoOrRedoInformation type is an array that you can fetch from a
 * Checkpoints object that indicates if and how you can move the state of the
 * underlying Store forward or backward.
 *
 * This type is useful if you are building undo or redo buttons. See the
 * useUndoInformation primitive and the useRedoInformation primitive for more
 * details and examples.
 * @category Checkpoints
 * @since v8.3.0
 */
export type UndoOrRedoInformation = [boolean, Callback, Id | undefined, string];

/**
 * The GetId type describes a function which, when passed a parameter, will
 * return an Id.
 *
 * This type is used in primitives that create callbacks - like the
 * useSetTableCallback primitive or useSetRowCallback primitive - so that the Id
 * arguments of the object to set can also be dependent on the event or
 * parameter provided (as well as the object itself being set).
 * @category Identity
 * @since v8.3.0
 */
export type GetId<Parameter> = (parameter: Parameter, store: Store) => Id;

/**
 * The useCreateStore primitive is used to create a Store within a Solid
 * application with convenient ownership.
 *
 * It is possible to create a Store outside of the Solid app with the regular
 * createStore function and pass it in, but you may prefer to create it within
 * the app, perhaps inside the top-level component. The Store is created once in
 * the current reactive owner and is disposed with that owner.
 *
 * In Solid, changing values should be read inside the create function via
 * signals or other Accessors, rather than via a dependency list.
 * @param create A function for performing the creation of the Store, plus any
 * additional steps such as adding data or listeners, and returning it.
 * @returns A reference to the Store.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useCreateStore} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = useCreateStore(() =>
 *     createStore().setCell('pets', 'fido', 'species', 'dog'),
 *   );
 *   console.log(store().getCell('pets', 'fido', 'species'));
 *   // -> 'dog'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @essential Using Solid
 * @since v8.3.0
 */
export function useCreateStore(create: () => Store): Accessor<Store>;

/**
 * The useCreateMergeableStore primitive.
 * @category Store primitives
 * @since v8.3.0
 */
export function useCreateMergeableStore(
  create: () => MergeableStore,
): Accessor<MergeableStore>;

/**
 * The useStoreIds primitive is used to retrieve the Ids of all the named Store
 * objects present in the current Provider component context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useStoreIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useStoreIds();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useStoreIds(): Accessor<Ids>;

/**
 * The useStore primitive is used to get a reference to a Store from within a
 * Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Store (or a set of Store objects named by Id) that can
 * be easily accessed without having to be passed down as props through every
 * component.
 *
 * The useStore primitive lets you either get a reference to the default Store
 * (when called without a parameter), or one of the Store objects that are named
 * by Id (when called with an Id parameter).
 * @param id An optional Id for accessing a Store that was named with an Id in
 * the Provider.
 * @returns A reference to the Store (or `undefined` if not within a Provider
 * context, or if the requested Store does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useStore} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useStore();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useStore(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<Store | undefined>;

/**
 * The useStores primitive is used to get a reference to all the Store objects
 * named by Id within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Store (or a set of Store objects named by Id) that can
 * be easily accessed without having to be passed down as props through every
 * component.
 *
 * The useStores primitive lets you get a reference to the latter as an object.
 * @returns An object containing all the Store objects named by Id.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useStores} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useStores();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useStores(): Accessor<{[storeId: Id]: Store}>;

/**
 * The useStoreOrStoreById primitive is used to get a reference to a Store
 * object from within a Provider component context, _or_ have it passed directly
 * to this primitive.
 *
 * This is mostly of use when you are developing a component that needs a Store
 * object and which might have been passed in explicitly to the component or is
 * to be picked up from the context by Id (a common pattern for Store-based
 * components).
 *
 * This is unlikely to be used often. For most situations, you will want to use
 * the useStore primitive.
 * @param storeOrStoreId Either an Id for accessing a Store object that was
 * named with an Id in the Provider, or the Store object itself.
 * @returns A reference to the Store object (or `undefined` if not within a
 * Provider context, or if the requested Store object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useStoreOrStoreById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useStoreOrStoreById(store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useStoreOrStoreById(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Store | undefined>;

/**
 * The useProvideStore primitive is used to add a Store object by Id to a
 * Provider component, but imperatively from a component within it.
 *
 * Normally you will register a Store by Id in a context by using the
 * `storesById` prop of the top-level Provider component. This primitive,
 * however, lets you dynamically add a new Store to the context, from within a
 * descendent component. This is useful for applications where the set of Stores
 * is not known at the time of the first render of the root Provider.
 *
 * A Store added to the Provider context in this way will be available to other
 * components within the context (using the useStore primitive and so on). If
 * you use the same Id as an existing Store registration, the new one will take
 * priority over one provided by the `storesById` prop.
 *
 * Note that other components that consume a Store registered like this should
 * defend against it being undefined at first. On the first render, the other
 * component will likely not yet have completed the registration. In the example
 * below, we use the null-safe `useStore('petStore')?` to do this.
 * @param storeId The Id of the Store object to be registered with the Provider.
 * @param store The Store object to be registered.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useProvideStore} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useProvideStore('petStore', store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useProvideStore(storeId: Id, store: Store): void;

/**
 * The useHasTables primitive returns a boolean indicating whether any Table
 * objects exist in the Store, and registers a listener so that any changes to
 * that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useHasTables primitive lets you indicate which Store to get data for: omit
 * the optional parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Tables will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns Whether any Tables exist.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasTables} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasTables(store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasTables(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<boolean>;

/**
 * The useTables primitive returns a Tables object containing the tabular data
 * of a Store, and registers a listener so that any changes to that result will
 * cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useTables primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Tables will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns A Tables object containing the tabular data of the Store.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useTables} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
 *   const tables = useTables(store);
 *   console.log(JSON.stringify(tables()));
 *   // -> '{"pets":{"fido":{"species":"dog"}}}'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTables(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Tables>;

/**
 * The useTablesState primitive returns a Tables object and a function to set
 * it, following the same pattern as Solid's createSignal convention.
 *
 * This is a convenience primitive that combines the useTables and
 * useSetTablesCallback primitives. It's useful when you need both read and
 * write access to all Tables in a single component.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useTablesState primitive lets you indicate which Store to use: omit the
 * parameter for the default context Store, provide an Id for a named context
 * Store, or provide a Store explicitly by reference.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array containing the Tables object and a function to set it.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useTablesState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore();
 *   const [tables, setTables] = useTablesState(store);
 *   setTables({pets: {fido: {species: 'dog'}}});
 *   console.log(JSON.stringify(tables()));
 *   // -> '{"pets":{"fido":{"species":"dog"}}}'
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useTablesState(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): [Accessor<Tables>, (tables: Tables) => void];

/**
 * The useTableIds primitive returns the Ids of every Table in a Store, and
 * registers a listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useTableIds primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Table Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array of the Ids of every Table in the Store.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useTableIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setTables({
 *     pets: {fido: {species: 'dog'}},
 *     species: {dog: {price: 5}},
 *   });
 *   const tableIds = useTableIds(store);
 *   console.log(JSON.stringify(tableIds()));
 *   // -> '["pets","species"]'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTableIds(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Ids>;

/**
 * The useHasTable primitive returns a boolean indicating whether a given Table
 * exists in the Store, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useHasTable primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Table will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns Whether a Table with that Id exists.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useHasTable} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   const hasPets = useHasTable('pets', store);
 *   console.log(hasPets());
 *   // -> true
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasTable(
  tableId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<boolean>;

/**
 * The useTable primitive returns an object containing the data of a single
 * Table in a Store, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useTable primitive lets you indicate which Store to get data for: omit the
 * final optional parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Table will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An object containing the entire data of the Table.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useTable} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   const table = useTable('pets', store);
 *   console.log(JSON.stringify(table()));
 *   // -> '{"fido":{"species":"dog"}}'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTable(
  tableId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Table>;

/**
 * The useTableState primitive returns a Table and a function to set it,
 * following the same pattern as Solid's createSignal convention.
 *
 * This is a convenience primitive that combines the useTable and
 * useSetTableCallback primitives. It's useful when you need both read and write
 * access to a Table in a single component.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useTableState primitive lets you indicate which Store to use: omit the final
 * parameter for the default context Store, provide an Id for a named context
 * Store, or provide a Store explicitly by reference.
 * @param tableId The Id of the Table in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array containing the Table and a function to set it.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useTableState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore();
 *   const [table, setTable] = useTableState('pets', store);
 *   setTable({fido: {species: 'dog'}});
 *   console.log(JSON.stringify(table()));
 *   // -> '{"fido":{"species":"dog"}}'
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useTableState(
  tableId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): [Accessor<Table>, (table: Table) => void];

/**
 * The useTableCellIds primitive returns the Ids of every Cell used across the
 * whole Table, and registers a listener so that any changes to that result will
 * cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useTableCellIds primitive lets you indicate which Store to get data for: omit
 * the optional final parameter for the default context Store, provide an Id for
 * a named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Table Cell Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array of the Ids of every Cell used across the whole Table.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useTableCellIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useTableCellIds('pets', store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTableCellIds(
  tableId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Ids>;

/**
 * The useHasTableCell primitive returns a boolean indicating whether a given
 * Cell exists anywhere in a Table, not just in a specific Row, and registers a
 * listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useHasTableCell primitive lets you indicate which Store to get data for: omit
 * the optional parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Table will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param cellId The Id of the Cell in the Table.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns Whether a Cell with that Id exists anywhere in that Table.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasTableCell} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasTableCell('pets', 'species', store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasTableCell(
  tableId: MaybeAccessor<Id>,
  cellId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<boolean>;

/**
 * The useRowCount primitive returns the count of the Row objects in a given
 * Table, and registers a listener so that any changes to that result will cause
 * an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useRowCount primitive lets you indicate which Store to get data for: omit the
 * optional final parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the count of Row objects will cause an update. When the component containing
 * this primitive is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns The number of Row objects in the Table.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRowCount} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRowCount('pets', store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useRowCount(
  tableId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<number>;

/**
 * The useRowIds primitive returns the Ids of every Row in a given Table, and
 * registers a listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useRowIds primitive lets you indicate which Store to get data for: omit the
 * optional final parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Row Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array of the Ids of every Row in the Table.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setTable('pets', {
 *     fido: {species: 'dog'},
 *     felix: {species: 'cat'},
 *   });
 *   const rowIds = useRowIds('pets', store);
 *   console.log(JSON.stringify(rowIds()));
 *   // -> '["fido","felix"]'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useRowIds(
  tableId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Ids>;

/**
 * The useSortedRowIds primitive returns the sorted (and optionally, paginated)
 * Ids of every Row in a given Table, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useSortedRowIds primitive lets you indicate which Store to get data for: omit
 * the optional final parameter for the default context Store, provide an Id for
 * a named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the sorted Row Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param cellId The Id of the Cell whose values are used for the sorting, or
 * `undefined` to sort by the Row Id itself.
 * @param descending Whether the sorting should be in descending order.
 * @param offset The number of Row Ids to skip for pagination purposes, if any.
 * @param limit The maximum number of Row Ids to return, or `undefined` for all.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array of the sorted Ids of every Row in the Table.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useSortedRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setTable('pets', {
 *     fido: {sold: true},
 *     felix: {sold: false},
 *   });
 *   const rowIds = useSortedRowIds(
 *     'pets',
 *     'sold',
 *     false,
 *     0,
 *     undefined,
 *     store,
 *   );
 *   console.log(JSON.stringify(rowIds()));
 *   // -> '["felix","fido"]'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSortedRowIds(
  tableId: MaybeAccessor<Id>,
  cellId?: MaybeAccessor<Id | undefined>,
  descending?: MaybeAccessor<boolean | undefined>,
  offset?: MaybeAccessor<number | undefined>,
  limit?: MaybeAccessor<number | undefined>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Ids>;

/**
 * When called with an object as the first argument, the useSortedRowIds method
 * destructures it to make it easier to skip optional parameters.
 * @param args A SortedRowIdsArgs object containing the Id of the Table in the
 * Store, and optional `cellId`, `descending`, `offset`, and `limit` parameters.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array of the sorted Ids of every Row in the Table.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSortedRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSortedRowIds({tableId: 'pets', cellId: 'species'}, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSortedRowIds(
  args: SortedRowIdsArgs,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Ids>;

/**
 * The useHasRow primitive returns a boolean indicating whether a given Row
 * exists in the Store, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useHasRow primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Row will cause an update. When the component containing this primitive is
 * unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param rowId The Id of the Row in the Table.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns Whether a Row with that Id exists in that Table.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useHasRow} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   const hasFido = useHasRow('pets', 'fido', store);
 *   console.log(hasFido());
 *   // -> true
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasRow(
  tableId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<boolean>;

/**
 * The useRow primitive returns an object containing the data of a single Row in
 * a given Table, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useRow primitive lets you indicate which Store to get data for: omit the
 * final optional parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Row will cause an update. When the component containing this primitive is
 * unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param rowId The Id of the Row in the Table.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An object containing the entire data of the Row.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useRow} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setRow('pets', 'fido', {species: 'dog'});
 *   const row = useRow('pets', 'fido', store);
 *   console.log(JSON.stringify(row()));
 *   // -> '{"species":"dog"}'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @essential Using Solid
 * @since v8.3.0
 */
export function useRow(
  tableId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Row>;

/**
 * The useRowState primitive returns a Row and a function to set it, following
 * the same pattern as Solid's createSignal convention.
 *
 * This is a convenience primitive that combines the useRow and
 * useSetRowCallback primitives. It's useful when you need both read and write
 * access to a Row in a single component.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useRowState primitive lets you indicate which Store to use: omit the final
 * parameter for the default context Store, provide an Id for a named context
 * Store, or provide a Store explicitly by reference.
 * @param tableId The Id of the Table in the Store.
 * @param rowId The Id of the Row in the Table.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array containing the Row and a function to set it.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useRowState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore();
 *   const [row, setRow] = useRowState('pets', 'fido', store);
 *   setRow({species: 'dog'});
 *   console.log(JSON.stringify(row()));
 *   // -> '{"species":"dog"}'
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useRowState(
  tableId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): [Accessor<Row>, (row: Row) => void];

/**
 * The useCellIds primitive returns the Ids of every Cell in a given Row, in a
 * given Table, and registers a listener so that any changes to that result will
 * cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useCellIds primitive lets you indicate which Store to get data for: omit the
 * optional final parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Cell Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param rowId The Id of the Row in the Table.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array of the Ids of every Cell in the Row.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useCellIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setRow('pets', 'fido', {species: 'dog'});
 *   const cellIds = useCellIds('pets', 'fido', store);
 *   console.log(JSON.stringify(cellIds()));
 *   // -> '["species"]'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useCellIds(
  tableId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Ids>;

/**
 * The useHasCell primitive returns a boolean indicating whether a given Cell
 * exists in a given Row in a given Table, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useHasCell primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Cell will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param rowId The Id of the Row in the Table.
 * @param cellId The Id of the Cell in the Row.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns Whether a Cell with that Id exists in that Row in that Table.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useHasCell} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   const hasSpecies = useHasCell('pets', 'fido', 'species', store);
 *   console.log(hasSpecies());
 *   // -> true
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasCell(
  tableId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  cellId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<boolean>;

/**
 * The useCell primitive returns an object containing the value of a single Cell
 * in a given Row, in a given Table, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useCell primitive lets you indicate which Store to get data for: omit the
 * final optional parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Cell will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param tableId The Id of the Table in the Store.
 * @param rowId The Id of the Row in the Table.
 * @param cellId The Id of the Cell in the Row.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns The value of the Cell.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useCell} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   const species = useCell('pets', 'fido', 'species', store);
 *   console.log(species());
 *   // -> 'dog'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @essential Using Solid
 * @since v8.3.0
 */
export function useCell(
  tableId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  cellId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<CellOrUndefined>;

/**
 * The useCellState primitive returns a Cell from a Store and a callback to set
 * it, following the common Solid `useState` convention.
 *
 * This primitive is useful for creating components that read and write a Cell
 * in a single line, similar to how you would use Solid's `useState` primitive.
 *
 * The component this is used in will update when the Cell changes.
 * @param tableId The Id of the Table in the Store.
 * @param rowId The Id of the Row in the Table.
 * @param cellId The Id of the Cell in the Row.
 * @param storeOrStoreId The Store to get data from: omit for the default
 * context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @returns A tuple containing the current Cell and a setter callback that can
 * be called with a new Cell value.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useCellState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore();
 *   const [cell, setCell] = useCellState('pets', 'fido', 'species', store);
 *   setCell('dog');
 *   console.log(cell());
 *   // -> 'dog'
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useCellState(
  tableId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  cellId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): [Accessor<CellOrUndefined>, (cell: Cell) => void];

/**
 * The useHasValues primitive returns a boolean indicating whether any Values
 * exist in the Store, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useHasValues primitive lets you indicate which Store to get data for: omit
 * the optional parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Values will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns Whether any Values exist.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasValues} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasValues(store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasValues(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<boolean>;

/**
 * The useValues primitive returns a Values object containing the keyed value
 * data of a Store, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useValues primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Values will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns A Values object containing the keyed value data of the Store.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useValues} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setValues({open: true});
 *   const values = useValues(store);
 *   console.log(JSON.stringify(values()));
 *   // -> '{"open":true}'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useValues(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Values>;

/**
 * The useValuesState primitive returns a Values object and a function to set
 * it, following the same pattern as Solid's createSignal convention.
 *
 * This is a convenience primitive that combines the useValues and
 * useSetValuesCallback primitives. It's useful when you need both read and
 * write access to all Values in a single component.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useValuesState primitive lets you indicate which Store to use: omit the
 * parameter for the default context Store, provide an Id for a named context
 * Store, or provide a Store explicitly by reference.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array containing the Values object and a function to set it.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useValuesState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore();
 *   const [values, setValues] = useValuesState(store);
 *   setValues({open: true});
 *   console.log(JSON.stringify(values()));
 *   // -> '{"open":true}'
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useValuesState(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): [Accessor<Values>, (values: Values) => void];

/**
 * The useValueIds primitive returns the Ids of every Value in a Store, and
 * registers a listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useValueIds primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Value Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An array of the Ids of every Value in the Store.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useValueIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setValues({open: true, employees: 3});
 *   const valueIds = useValueIds(store);
 *   console.log(JSON.stringify(valueIds()));
 *   // -> '["open","employees"]'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useValueIds(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<Ids>;

/**
 * The useHasValue primitive returns a boolean indicating whether a given Value
 * exists in the Store, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useHasValue primitive lets you indicate which Store to get data for: omit the
 * optional parameter for the default context Store, provide an Id for a named
 * context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Value will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param valueId The Id of the Value in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns Whether a Value with that Id exists in the Store.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useHasValue} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setValue('open', true);
 *   const hasOpen = useHasValue('open', store);
 *   console.log(hasOpen());
 *   // -> true
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasValue(
  valueId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<boolean>;

/**
 * The useValue primitive returns an object containing the data of a single
 * Value in a Store, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Store or a set of Store objects named by Id. The
 * useValue primitive lets you indicate which Store to get data for: omit the
 * final optional parameter for the default context Store, provide an Id for a
 * named context Store, or provide a Store explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Value will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param valueId The Id of the Value in the Store.
 * @param storeOrStoreId The Store to be accessed: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @returns An object containing the entire data of the Value.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useValue} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setValue('open', true);
 *   const open = useValue('open', store);
 *   console.log(open());
 *   // -> true
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @essential Using Solid
 * @since v8.3.0
 */
export function useValue(
  valueId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): Accessor<ValueOrUndefined>;

/**
 * The useValueState primitive returns a Value from a Store and a callback to
 * set it, following the common Solid `useState` convention.
 *
 * This primitive is useful for creating components that read and write a Value
 * in a single line, similar to how you would use Solid's `useState` primitive.
 *
 * The component this is used in will update when the Value changes.
 * @param valueId The Id of the Value.
 * @param storeOrStoreId The Store to get data from: omit for the default
 * context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @returns A tuple containing the current Value and a setter callback that can
 * be called with a new Value.
 * @example
 * This example creates a Store, binds it to the primitive, and reads the
 * resulting Solid Accessor.
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useValueState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore();
 *   const [open, setOpen] = useValueState('open', store);
 *   setOpen(true);
 *   console.log(open());
 *   // -> true
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useValueState(
  valueId: MaybeAccessor<Id>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): [value: Accessor<ValueOrUndefined>, setValue: (value: Value) => void];

/**
 * The useSetTablesCallback primitive returns a parameterized callback that can
 * be used to set the tabular data of a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The first parameter is a function which will produce the Tables object that
 * will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param getTables A function which returns the Tables object that will be used
 * to update the Store, based on the parameter the callback will receive (and
 * which is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Tables used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetTablesCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetTablesCallback(() => ({pets: {fido: {species: 'dog'}}}), store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetTablesCallback<Parameter>(
  getTables: (parameter: Parameter, store: Store) => Tables,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, tables: Tables) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useSetTableCallback primitive returns a parameterized callback that can
 * be used to set the data of a single Table in a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The second parameter is a function which will produce the Table object that
 * will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param tableId The Id of the Table in the Store to set, or a GetId function
 * that will return it.
 * @param getTable A function which returns the Table object that will be used
 * to update the Store, based on the parameter the callback will receive (and
 * which is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Table used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetTableCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetTableCallback('pets', () => ({fido: {species: 'dog'}}), store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetTableCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  getTable: (parameter: Parameter, store: Store) => Table,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, table: Table) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useSetRowCallback primitive returns a parameterized callback that can be
 * used to set the data of a single Row in a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The third parameter is a function which will produce the Row object that will
 * then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param tableId The Id of the Table in the Store, or a GetId function that
 * will return it.
 * @param rowId The Id of the Row in the Table to set, or a GetId function that
 * will return it.
 * @param getRow A function which returns the Row object that will be used to
 * update the Store, based on the parameter the callback will receive (and which
 * is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Row used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetRowCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetRowCallback('pets', 'fido', () => ({species: 'dog'}), store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetRowCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  rowId: MaybeAccessor<Id> | GetId<Parameter>,
  getRow: (parameter: Parameter, store: Store) => Row,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, row: Row) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useAddRowCallback primitive returns a parameterized callback that can be
 * used to create a new Row in a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The second parameter is a function which will produce the Row object that
 * will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 *
 * The `reuseRowIds` parameter defaults to `true`, which means that if you
 * delete a Row and then add another, the Id will be re-used - unless you delete
 * the entire Table, in which case all Row Ids will reset. Otherwise, if you
 * specify `reuseRowIds` to be `false`, then the Id will be a monotonically
 * increasing string representation of an increasing integer, regardless of any
 * you may have previously deleted.
 * @param tableId The Id of the Table in the Store, or a GetId function that
 * will return it.
 * @param getRow A function which returns the Row object that will be used to
 * update the Store, based on the parameter the callback will receive (and which
 * is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with the new Row
 * Id, a reference to the Store, and the Row used in the update.
 * @param reuseRowIds Whether Ids should be recycled from previously deleted Row
 * objects, defaulting to `true`.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useAddRowCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useAddRowCallback('pets', () => ({species: 'hamster'}), store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useAddRowCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  getRow: (parameter: Parameter, store: Store) => Row,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (rowId: Id | undefined, store: Store, row: Row) => void,
  reuseRowIds?: boolean,
): ParameterizedCallback<Parameter>;

/**
 * The useSetPartialRowCallback primitive returns a parameterized callback that
 * can be used to set partial data of a single Row in the Store, leaving other
 * Cell values unaffected.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in Store. In this case, the parameter will likely be the
 * event, so that you can use data from it as part of the mutation.
 *
 * The third parameter is a function which will produce the partial Row object
 * that will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param tableId The Id of the Table in the Store, or a GetId function that
 * will return it.
 * @param rowId The Id of the Row in the Table to set, or a GetId function that
 * will return it.
 * @param getPartialRow A function which returns the partial Row object that
 * will be used to update the Store, based on the parameter the callback will
 * receive (and which is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Row used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetPartialRowCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetPartialRowCallback('pets', 'fido', () => ({sold: true}), store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetPartialRowCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  rowId: MaybeAccessor<Id> | GetId<Parameter>,
  getPartialRow: (parameter: Parameter, store: Store) => Row,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, partialRow: Row) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useSetCellCallback primitive returns a parameterized callback that can be
 * used to set the value of a single Cell in a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The fourth parameter is a function which will produce the Cell object that
 * will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param tableId The Id of the Table in the Store, or a GetId function that
 * will return it.
 * @param rowId The Id of the Row in the Table, or a GetId function that will
 * return it.
 * @param cellId The Id of the Cell in the Row to set, or a GetId function that
 * will return it.
 * @param getCell A function which returns the Cell value that will be used to
 * update the Store, or a MapCell function to update it, based on the parameter
 * the callback will receive (and which is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Cell value (or MapCell function) used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useCell, useSetCellCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'sold', false);
 *   const sold = useCell('pets', 'fido', 'sold', store);
 *   const sell = useSetCellCallback(
 *     'pets',
 *     'fido',
 *     'sold',
 *     () => true,
 *     store,
 *   );
 *   sell();
 *   console.log(sold());
 *   // -> true
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetCellCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  rowId: MaybeAccessor<Id> | GetId<Parameter>,
  cellId: MaybeAccessor<Id> | GetId<Parameter>,
  getCell: (parameter: Parameter, store: Store) => Cell | MapCell,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, cell: Cell | MapCell) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useSetValuesCallback primitive returns a parameterized callback that can
 * be used to set the keyed value data of a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The first parameter is a function which will produce the Values object that
 * will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param getValues A function which returns the Values object that will be used
 * to update the Store, based on the parameter the callback will receive (and
 * which is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Values used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetValuesCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetValuesCallback(() => ({open: false}), store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetValuesCallback<Parameter>(
  getValues: (parameter: Parameter, store: Store) => Values,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, values: Values) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useSetPartialValuesCallback primitive returns a parameterized callback
 * that can be used to set partial Values data in the Store, leaving other
 * Values unaffected.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The third parameter is a function which will produce the partial Values
 * object that will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param getPartialValues A function which returns the partial Values object
 * that will be used to update the Store, based on the parameter the callback
 * will receive (and which is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Values used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetPartialValuesCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetPartialValuesCallback(() => ({employees: 3}), store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetPartialValuesCallback<Parameter>(
  getPartialValues: (parameter: Parameter, store: Store) => Values,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, partialValues: Values) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useSetValueCallback primitive returns a parameterized callback that can
 * be used to set the data of a single Value in a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will mutate the data in the Store. In this case, the parameter will likely be
 * the event, so that you can use data from it as part of the mutation.
 *
 * The second parameter is a function which will produce the Value object that
 * will then be used to update the Store in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the mutation to
 * your application's undo stack.
 * @param valueId The Id of the Value in the Store to set, or a GetId function
 * that will return it.
 * @param getValue A function which returns the Value object that will be used
 * to update the Store, based on the parameter the callback will receive (and
 * which is most likely a DOM event).
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Store and the Value used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetValueCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetValueCallback('open', () => false, store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSetValueCallback<Parameter>(
  valueId: MaybeAccessor<Id> | GetId<Parameter>,
  getValue: (parameter: Parameter, store: Store) => Value | MapValue,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store, value: Value | MapValue) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useDelTablesCallback primitive returns a callback that can be used to
 * remove all of the tabular data in a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will delete data in the Store.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the deletion to
 * your application's undo stack.
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the deletion, with a reference
 * to the Store.
 * @returns A callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useDelTablesCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useDelTablesCallback(store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useDelTablesCallback(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store) => void,
): Callback;

/**
 * The useDelTableCallback primitive returns a parameterized callback that can
 * be used to remove a single Table from a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will delete data in the Store. In this case, the parameter will likely be the
 * event, so that you can use data from it as part of the deletion.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the deletion to
 * your application's undo stack.
 * @param tableId The Id of the Table in the Store to delete, or a GetId
 * function that will return it.
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the deletion, with a reference
 * to the Store.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useDelTableCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useDelTableCallback('species', store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useDelTableCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useDelRowCallback primitive returns a parameterized callback that can be
 * used to remove a single Row from a Table.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will delete data in the Store. In this case, the parameter will likely be the
 * event, so that you can use data from it as part of the deletion.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the deletion to
 * your application's undo stack.
 * @param tableId The Id of the Table in the Store, or a GetId function that
 * will return it.
 * @param rowId The Id of the Row in the Table to delete, or a GetId function
 * that will return it.
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the deletion, with a reference
 * to the Store.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useDelRowCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useDelRowCallback('pets', 'felix', store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useDelRowCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  rowId: MaybeAccessor<Id> | GetId<Parameter>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useDelCellCallback primitive returns a parameterized callback that can be
 * used to remove a single Cell from a Row.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will delete data in the Store. In this case, the parameter will likely be the
 * event, so that you can use data from it as part of the deletion.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the deletion to
 * your application's undo stack.
 * @param tableId The Id of the Table in the Store, or a GetId function that
 * will return it.
 * @param rowId The Id of the Row in the Table, or a GetId function that will
 * return it.
 * @param cellId The Id of the Cell in the Row to delete, or a GetId function
 * that will return it.
 * @param forceDel An optional flag to indicate that the whole Row should be
 * deleted, even if a TablesSchema provides a default value for this Cell.
 * Defaults to `false`.
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the deletion, with a reference
 * to the Store.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useDelCellCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useDelCellCallback('pets', 'fido', 'next', false, store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useDelCellCallback<Parameter>(
  tableId: MaybeAccessor<Id> | GetId<Parameter>,
  rowId: MaybeAccessor<Id> | GetId<Parameter>,
  cellId: MaybeAccessor<Id> | GetId<Parameter>,
  forceDel?: MaybeAccessor<boolean | undefined>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useDelValuesCallback primitive returns a callback that can be used to
 * remove all of the keyed value data in a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will delete data in a Store.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the deletion to
 * your application's undo stack.
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the deletion, with a reference
 * to the Store.
 * @returns A callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useDelValuesCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useDelValuesCallback(store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useDelValuesCallback(
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store) => void,
): Callback;

/**
 * The useDelValueCallback primitive returns a parameterized callback that can
 * be used to remove a single Value from a Store.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will delete data in the Store. In this case, the parameter will likely be the
 * event, so that you can use data from it as part of the deletion.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the Store has been updated. This is a useful place to call
 * the addCheckpoint method, for example, if you wish to add the deletion to
 * your application's undo stack.
 * @param valueId The Id of the Value in the Store to delete, or a GetId
 * function that will return it.
 * @param storeOrStoreId The Store to be updated: omit for the default context
 * Store, provide an Id for a named context Store, or provide an explicit
 * reference.
 * @param then A function which is called after the deletion, with a reference
 * to the Store.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useDelValueCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useDelValueCallback('open', store)();
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useDelValueCallback<Parameter>(
  valueId: MaybeAccessor<Id> | GetId<Parameter>,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
  then?: (store: Store) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useHasTablesListener primitive registers a listener function with the
 * Store that will be called when Tables as a whole are added to or removed from
 * the Store.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useHasTables primitive).
 *
 * Unlike the addHasTablesListener method, which returns a listener Id and
 * requires you to remove it manually, the useHasTablesListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Store will be deleted.
 * @param listener The function that will be called whenever Tables as a whole
 * are added or removed.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasTablesListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasTablesListener(() => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasTablesListener(
  listener: HasTablesListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useTablesListener primitive registers a listener function with a Store
 * that will be called whenever tabular data in it changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useTables primitive).
 *
 * Unlike the addTablesListener method, which returns a listener Id and requires
 * you to remove it manually, the useTablesListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param listener The function that will be called whenever tabular data in the
 * Store changes.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useTablesListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useTablesListener(() => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTablesListener(
  listener: TablesListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useTableIdsListener primitive registers a listener function with a Store
 * that will be called whenever the Table Ids in it change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useTableIds primitive).
 *
 * Unlike the addTableIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useTableIdsListener primitive manages
 * this you to remove it manually, the useTablesListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param listener The function that will be called whenever the Table Ids in
 * the Store change.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useTableIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useTableIdsListener(() => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTableIdsListener(
  listener: TableIdsListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useHasTableListener primitive registers a listener function with the
 * Store that will be called when a Table is added to or removed from the Store.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useHasTable primitive).
 *
 * You can either listen to a single Table (by specifying its Id as the method's
 * first parameter) or changes to any Table (by providing a `null` wildcard).
 *
 * Unlike the addHasTableListener method, which returns a listener Id and
 * requires you to remove it manually, the useHasTableListener primitive manages
 * this you to remove it manually, the useHasTableListener primitive manages
 * this lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the matching Table
 * is added or removed.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasTableListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasTableListener('pets', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasTableListener(
  tableId: MaybeAccessor<IdOrNull>,
  listener: HasTableListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useTableListener primitive registers a listener function with a Store
 * that will be called whenever data in a Table changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useTable primitive).
 *
 * You can either listen to a single Table (by specifying its Id as the method's
 * first parameter) or changes to any Table (by providing a `null` wildcard).
 *
 * Unlike the addTableListener method, which returns a listener Id and requires
 * you to remove it manually, the useTableListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever data in the Table
 * changes.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useTableListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useTableListener('pets', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTableListener(
  tableId: MaybeAccessor<IdOrNull>,
  listener: TableListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useTableCellIdsListener primitive registers a listener function with a
 * Store that will be called whenever the Cell Ids that appear anywhere in a
 * Table change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useTableCellIds primitive).
 *
 * You can either listen to a single Table (by specifying its Id as the method's
 * first parameter) or changes to any Table (by providing `null`).
 *
 * Unlike the addTableCellIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useTableCellIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Cell Ids that
 * appear anywhere in a Table change.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useTableCellIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useTableCellIdsListener('pets', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useTableCellIdsListener(
  tableId: MaybeAccessor<IdOrNull>,
  listener: TableCellIdsListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useHasTableCellListener primitive registers a listener function with the
 * Store that will be called when a Cell is added to or removed from anywhere in
 * a Table as a whole.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useHasTableCell primitive).
 *
 * You can either listen to a single Table Cell being added or removed (by
 * specifying the Table Id and Cell Id, as the method's first two parameters) or
 * changes to any Table Cell (by providing `null` wildcards).
 *
 * Unlike the addHasTableCellIds method, which returns a listener Id and
 * requires you to remove it manually, the useHasTableCellListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param cellId The Id of the Cell to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the matching Cell
 * is added to or removed from anywhere in the Table.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasTableCellListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasTableCellListener(
 *     'pets',
 *     'species',
 *     () => undefined,
 *     false,
 *     store,
 *   );
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasTableCellListener(
  tableId: MaybeAccessor<IdOrNull>,
  cellId: MaybeAccessor<IdOrNull>,
  listener: HasTableCellListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useRowCountListener primitive registers a listener function with a Store
 * that will be called whenever the count of the Row objects in a Table changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useRowCount primitive).
 *
 * You can either listen to a single Table (by specifying its Id as the method's
 * first parameter) or changes to any Table (by providing `null`).
 *
 * Unlike the addRowCountListener method, which returns a listener Id and
 * requires you to remove it manually, the useRowCountListener primitive manages
 * this you to remove it manually, the useRowCountListener primitive manages
 * this lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the count of the
 * Row objects in the Table changes.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRowCountListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRowCountListener('pets', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useRowCountListener(
  tableId: MaybeAccessor<IdOrNull>,
  listener: RowCountListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useRowIdsListener primitive registers a listener function with a Store
 * that will be called whenever the Row Ids in a Table change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useRowIds primitive).
 *
 * You can either listen to a single Table (by specifying its Id as the method's
 * first parameter) or changes to any Table (by providing `null`).
 *
 * Unlike the addRowIdsListener method, which returns a listener Id and requires
 * you to remove it manually, the useRowIdsListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Row Ids in the
 * Table change.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRowIdsListener('pets', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useRowIdsListener(
  tableId: MaybeAccessor<IdOrNull>,
  listener: RowIdsListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useSortedRowIdsListener primitive registers a listener function with a
 * Store that will be called whenever sorted (and optionally, paginated) Row Ids
 * in a Table change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useSortedRowIds primitive).
 *
 * Unlike the addSortedRowIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useSortedRowIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Store will be deleted.
 * @param tableId The Id of the Table in the Store.
 * @param cellId The Id of the Cell whose values are used for the sorting, or
 * `undefined` to sort by the Row Id itself.
 * @param descending Whether the sorting should be in descending order.
 * @param offset The number of Row Ids to skip for pagination purposes, if any.
 * @param limit The maximum number of Row Ids to return, or `undefined` for all.
 * @param listener The function that will be called whenever the sorted Row Ids
 * in the Table change.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSortedRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSortedRowIdsListener(
 *     'pets',
 *     'species',
 *     false,
 *     0,
 *     undefined,
 *     () => undefined,
 *     false,
 *     store,
 *   );
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSortedRowIdsListener(
  tableId: MaybeAccessor<Id>,
  cellId: MaybeAccessor<Id | undefined>,
  descending: MaybeAccessor<boolean>,
  offset: MaybeAccessor<number>,
  limit: MaybeAccessor<number | undefined>,
  listener: SortedRowIdsListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * When called with an object as the first argument, the useSortedRowIds method
 * destructures it to make it easier to skip optional parameters.
 * @param args A SortedRowIdsArgs object containing the Id of the Table in the
 * Store, and optional `cellId`, `descending`, `offset`, and `limit` parameters.
 * @param listener The function that will be called whenever the sorted Row Ids
 * in the Table change.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSortedRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSortedRowIdsListener(
 *     {tableId: 'pets', cellId: 'species'},
 *     () => undefined,
 *     false,
 *     store,
 *   );
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useSortedRowIdsListener(
  args: SortedRowIdsArgs,
  listener: SortedRowIdsListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useHasRowListener primitive registers a listener function with the Store
 * that will be called when a Row is added to or removed from the Store.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useHasRow primitive).
 *
 * You can either listen to a single Row being added or removed (by specifying
 * the Table Id and Row Id, as the method's first two parameters) or changes to
 * any Row (by providing `null` wildcards).
 *
 * Both, either, or neither of the `tableId` and `rowId` parameters can be
 * wildcarded with `null`. You can listen to a specific Row in a specific Table,
 * any Row in a specific Table, a specific Row in any Table, or any Row in any
 * Table.
 *
 * Unlike the addHasRowListener method, which returns a listener Id and requires
 * you to remove it manually, the useHasRowListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param rowId The Id of the Row to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the matching Row is
 * added or removed.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasRowListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasRowListener('pets', 'fido', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasRowListener(
  tableId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  listener: HasRowListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useRowListener primitive registers a listener function with a Store that
 * will be called whenever data in a Row changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useRow primitive).
 *
 * You can either listen to a single Row (by specifying the Table Id and Row Id
 * as the method's first two parameters) or changes to any Row (by providing
 * `null` wildcards).
 *
 * Both, either, or neither of the `tableId` and `rowId` parameters can be
 * wildcarded with `null`. You can listen to a specific Row in a specific Table,
 * any Row in a specific Table, a specific Row in any Table, or any Row in any
 * Table.
 *
 * Unlike the addRowListener method, which returns a listener Id and requires
 * you to remove it manually, the useRowListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param rowId The Id of the Row to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever data in the Row
 * changes.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRowListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRowListener('pets', 'fido', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useRowListener(
  tableId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  listener: RowListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useCellIdsListener primitive registers a listener function with a Store
 * that will be called whenever the Cell Ids in a Row change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useCellIds primitive).
 *
 * You can either listen to a single Row (by specifying the Table Id and Row Id
 * as the method's first two parameters) or changes to any Row (by providing
 * `null` wildcards).
 *
 * Both, either, or neither of the `tableId` and `rowId` parameters can be
 * wildcarded with `null`. You can listen to a specific Row in a specific Table,
 * any Row in a specific Table, a specific Row in any Table, or any Row in any
 * Table.
 *
 * Unlike the addCellIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useCellIdsListener primitive manages
 * this you to remove it manually, the useHasRowListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param rowId The Id of the Row to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Cell Ids in the
 * Row change.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCellIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCellIdsListener('pets', 'fido', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useCellIdsListener(
  tableId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  listener: CellIdsListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useHasCellListener primitive registers a listener function with the Store
 * that will be called when a Cell is added to or removed from the Store.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useHasCell primitive).
 *
 * You can either listen to a single Cell being added or removed (by specifying
 * the Table Id, Row Id, and Cell Id as the method's first three parameters) or
 * changes to any Cell (by providing `null` wildcards).
 *
 * All, some, or none of the `tableId`, `rowId`, and `cellId` parameters can be
 * wildcarded with `null`. You can listen to a specific Cell in a specific Row
 * in a specific Table, any Cell in any Row in any Table, for example - or every
 * other combination of wildcards.
 *
 * Unlike the addHasCellListener method, which returns a listener Id and
 * requires you to remove it manually, the useHasCellListener primitive manages
 * this you to remove it manually, the useHasCellListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param rowId The Id of the Row to listen to, or `null` as a wildcard.
 * @param cellId The Id of the Cell to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the matching Cell
 * is added or removed.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasCellListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasCellListener(
 *     'pets',
 *     'fido',
 *     'color',
 *     () => undefined,
 *     false,
 *     store,
 *   );
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasCellListener(
  tableId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  cellId: MaybeAccessor<IdOrNull>,
  listener: HasCellListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useCellListener primitive registers a listener function with a Store that
 * will be called whenever data in a Cell changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useCell primitive).
 *
 * You can either listen to a single Cell (by specifying the Table Id, Row Id,
 * and Cell Id as the method's first three parameters) or changes to any Cell
 * (by providing `null` wildcards).
 *
 * All, some, or none of the `tableId`, `rowId`, and `cellId` parameters can be
 * wildcarded with `null`. You can listen to a specific Cell in a specific Row
 * in a specific Table, any Cell in any Row in any Table, for example - or every
 * other combination of wildcards.
 *
 * Unlike the addCellListener method, which returns a listener Id and requires
 * you to remove it manually, the useCellListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param tableId The Id of the Table to listen to, or `null` as a wildcard.
 * @param rowId The Id of the Row to listen to, or `null` as a wildcard.
 * @param cellId The Id of the Cell to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever data in the Cell
 * changes.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {useCellListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   useCellListener(
 *     'pets',
 *     'fido',
 *     'species',
 *     (_store, _tableId, _rowId, _cellId, newCell) => console.log(newCell),
 *     false,
 *     store,
 *   );
 *   store.setCell('pets', 'fido', 'species', 'guide dog');
 *   // -> 'guide dog'
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useCellListener(
  tableId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  cellId: MaybeAccessor<IdOrNull>,
  listener: CellListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useHasValuesListener primitive registers a listener function with the
 * Store that will be called when Values as a whole are added to or removed from
 * the Store.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useHasValues primitive).
 *
 * Unlike the addHasValuesListener method, which returns a listener Id and
 * requires you to remove it manually, the useHasValuesListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Store will be deleted.
 * @param listener The function that will be called whenever Values as a whole
 * are added or removed.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasValuesListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasValuesListener(() => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasValuesListener(
  listener: HasValuesListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useValuesListener primitive registers a listener function with a Store
 * that will be called whenever keyed value data in it changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useValues primitive).
 *
 * Unlike the addValuesListener method, which returns a listener Id and requires
 * you to remove it manually, the useValuesListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param listener The function that will be called whenever keyed value data in
 * the Store changes.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useValuesListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useValuesListener(() => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useValuesListener(
  listener: ValuesListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useValueIdsListener primitive registers a listener function with a Store
 * that will be called whenever the Value Ids in it change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useValueIds primitive).
 *
 * Unlike the addValueIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useValueIdsListener primitive manages
 * this you to remove it manually, the useValuesListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param listener The function that will be called whenever the Value Ids in
 * the Store change.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useValueIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useValueIdsListener(() => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useValueIdsListener(
  listener: ValueIdsListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useHasValueListener primitive registers a listener function with the
 * Store that will be called when a Value is added to or removed from the Store.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useHasValue primitive).
 *
 * You can either listen to a single Value being added or removed (by specifying
 * the Value Id) or any Value being added or removed (by providing a `null`
 * wildcard).
 *
 * Unlike the addHasValueListener method, which returns a listener Id and
 * requires you to remove it manually, the useHasValueListener primitive manages
 * this you to remove it manually, the useHasValueListener primitive manages
 * this lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param valueId The Id of the Value to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the matching Value
 * is added or removed.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useHasValueListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useHasValueListener('open', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useHasValueListener(
  valueId: MaybeAccessor<IdOrNull>,
  listener: HasValueListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useValueListener primitive registers a listener function with a Store
 * that will be called whenever data in a Value changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useValue primitive).
 *
 * You can either listen to a single Value (by specifying its Id as the method's
 * first parameter) or changes to any Value (by providing a `null` wildcard).
 *
 * Unlike the addValueListener method, which returns a listener Id and requires
 * you to remove it manually, the useValueListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param valueId The Id of the Value to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever data in the Value
 * changes.
 * @param mutator An optional boolean that indicates that the listener mutates
 * Store data.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useValueListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useValueListener('open', () => undefined, false, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useValueListener(
  valueId: MaybeAccessor<IdOrNull>,
  listener: ValueListener,
  mutator?: boolean,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useStartTransactionListener primitive registers a listener function with
 * the Store that will be called at the start of a transaction.
 *
 * Unlike the addStartTransactionListener method, which returns a listener Id
 * and requires you to remove it manually, the useStartTransactionListener
 * primitive manages this lifecycle for you: when the listener changes (per its
 * you to remove it manually, the useValueListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Store will be deleted.
 * @param listener The function that will be called at the start of a
 * transaction.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useStartTransactionListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useStartTransactionListener(() => undefined, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useStartTransactionListener(
  listener: TransactionListener,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useWillFinishTransactionListener primitive registers a listener function
 * with a Store that will be called just before other non-mutating listeners are
 * called at the end of the transaction.
 *
 * Unlike the addWillFinishTransactionListener method, which returns a listener
 * Id and requires you to remove it manually, the
 * useWillFinishTransactionListener primitive manages this lifecycle for you:
 * when the component unmounts, the listener on the underlying Store will be
 * deleted.
 * @param listener The function that will be called before the end of a
 * transaction.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useWillFinishTransactionListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useWillFinishTransactionListener(() => undefined, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useWillFinishTransactionListener(
  listener: TransactionListener,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useDidFinishTransactionListener primitive registers a listener function
 * with a Store that will be called just after other non-mutating listeners are
 * called at the end of the transaction.
 *
 * Unlike the addDidFinishTransactionListener method, which returns a listener
 * Id and requires you to remove it manually, the
 * useDidFinishTransactionListener primitive manages this lifecycle for you:
 * when the component unmounts, the listener on the underlying Store will be
 * deleted.
 * @param listener The function that will be called after the end of a
 * transaction.
 * @param storeOrStoreId The Store to register the listener with: omit for the
 * default context Store, provide an Id for a named context Store, or provide an
 * explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useDidFinishTransactionListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useDidFinishTransactionListener(() => undefined, store);
 *   dispose();
 * });
 * ```
 * @category Store primitives
 * @since v8.3.0
 */
export function useDidFinishTransactionListener(
  listener: TransactionListener,
  storeOrStoreId?: MaybeAccessor<StoreOrStoreId | undefined>,
): void;

/**
 * The useCreateMetrics primitive is used to create a Metrics object within a
 * Solid application with convenient memoization.
 *
 * It is possible to create a Metrics object outside of the Solid app with the
 * regular createMetrics function and pass it in, but you may prefer to create
 * it within the app, perhaps inside the top-level component. To prevent a new
 * Metrics object being created every time the app renders or updates, since
 * v5.0 this primitive performs the creation in an effect. As a result it will
 * return `undefined` on the brief first render (or if the Store is not yet
 * defined), which you should defend against.
 *
 * This primitive ensures the Metrics object is destroyed whenever a new one is
 * created or the component is unmounted.
 * @param store A reference to the Store for which to create a new Metrics
 * object.
 * @param create A function for performing the creation steps of the Metrics
 * object for the Store, plus any additional steps such as adding definitions or
 * listeners, and returning it.
 * @returns A reference to the Metrics object.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCreateMetrics} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCreateMetrics(store, (store) => createMetrics(store));
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useCreateMetrics(
  store: MaybeAccessor<Store | undefined>,
  create: (store: Store) => Metrics,
): Accessor<Metrics | undefined>;

/**
 * The useMetricsIds primitive is used to retrieve the Ids of all the named
 * Metrics objects present in the current Provider component context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useMetricsIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useMetricsIds();
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useMetricsIds(): Accessor<Ids>;

/**
 * The useMetrics primitive is used to get a reference to a Metrics object from
 * within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Metrics object (or a set of Metrics objects named by
 * Id) that can be easily accessed without having to be passed down as props
 * through every component.
 *
 * The useMetrics primitive lets you either get a reference to the default
 * Metrics object (when called without a parameter), or one of the Metrics
 * objects that are named by Id (when called with an Id parameter).
 * @param id An optional Id for accessing a Metrics object that was named with
 * an Id in the Provider.
 * @returns A reference to the Metrics object (or `undefined` if not within a
 * Provider context, or if the requested Metrics object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useMetrics} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useMetrics();
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useMetrics(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<Metrics | undefined>;

/**
 * The useMetricsOrMetricsById primitive is used to get a reference to a Metrics
 * object from within a Provider component context, _or_ have it passed directly
 * to this primitive.
 *
 * This is mostly of use when you are developing a component that needs a
 * Metrics object and which might have been passed in explicitly to the
 * component or is to be picked up from the context by Id (a common pattern for
 * Metrics-based components).
 *
 * This primitive is unlikely to be used often. For most situations, you will
 * want to use the useMetrics primitive.
 * @param metricsOrMetricsId Either an Id for accessing a Metrics object that
 * was named with an Id in the Provider, or the Metrics object itself.
 * @returns A reference to the Metrics object (or `undefined` if not within a
 * Provider context, or if the requested Metrics object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useMetricsOrMetricsById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useMetricsOrMetricsById(metrics);
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useMetricsOrMetricsById(
  metricsOrMetricsId?: MaybeAccessor<MetricsOrMetricsId | undefined>,
): Accessor<Metrics | undefined>;

/**
 * The useProvideMetrics primitive is used to add a Metrics object by Id to a
 * Provider component, but imperatively from a component within it.
 *
 * Normally you will register a Metrics object by Id in a context by using the
 * `metricsById` prop of the top-level Provider component. This primitive,
 * however, lets you dynamically add a new Metrics object to the context, from
 * within a descendent component. This is useful for applications where the set
 * of Metrics objects is not known at the time of the first render of the root
 * Provider.
 *
 * A Metrics object added to the Provider context in this way will be available
 * to other components within the context (using the useMetrics primitive and so
 * on). If you use the same Id as an existing Metrics object registration, the
 * new one will take priority over one provided by the `metricsById` prop.
 * @param metricsId The Id of the Metrics object to be registered with the
 * Provider.
 * @param metrics The Metrics object to be registered.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createMetrics, createStore} from 'tinybase';
 * import {useProvideMetrics} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'color', 'brown');
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'petCount',
 *     'pets',
 *     'count',
 *   );
 *   useProvideMetrics('petMetrics', metrics);
 *   console.log(metrics.getMetric('petCount'));
 *   // -> 1
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useProvideMetrics(metricsId: Id, metrics: Metrics): void;

/**
 * The useMetricIds primitive gets an array of the Metric Ids registered with a
 * Metrics object, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Metrics object or a set of Metrics objects named by
 * Id. The useMetricIds primitive lets you indicate which Metrics object to get
 * data for: omit the optional final parameter for the default context Metrics
 * object, provide an Id for a named context Metrics object, or provide a
 * Metrics object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Metric Ids in the Metrics object will cause an update. When the component
 * containing this primitive is unmounted, the listener will be automatically
 * removed.
 * @param metricsOrMetricsId The Metrics object to be accessed: omit for the
 * default context Metrics object, provide an Id for a named context Metrics
 * object, or provide an explicit reference.
 * @returns The Metric Ids in the Metrics object, or an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useMetricIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useMetricIds(metrics);
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useMetricIds(
  metricsOrMetricsId?: MaybeAccessor<MetricsOrMetricsId | undefined>,
): Accessor<Ids>;

/**
 * The useMetric primitive gets the current value of a Metric, and registers a
 * listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Metrics object or a set of Metrics objects named by
 * Id. The useMetric primitive lets you indicate which Metrics object to get
 * data for: omit the optional final parameter for the default context Metrics
 * object, provide an Id for a named context Metrics object, or provide a
 * Metrics object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Metric will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param metricId The Id of the Metric.
 * @param metricsOrMetricsId The Metrics object to be accessed: omit for the
 * default context Metrics object, provide an Id for a named context Metrics
 * object, or provide an explicit reference.
 * @returns The numeric value of the Metric, or `undefined`.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useMetric} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useMetric('highestPrice', metrics);
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useMetric(
  metricId: MaybeAccessor<Id>,
  metricsOrMetricsId?: MaybeAccessor<MetricsOrMetricsId | undefined>,
): Accessor<number | undefined>;

/**
 * The useMetricListener primitive registers a listener function with the
 * Metrics object that will be called whenever the value of a specified Metric
 * changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useMetric primitive).
 *
 * You can either listen to a single Metric (by specifying the Metric Id as the
 * method's first parameter), or changes to any Metric (by providing a `null`
 * wildcard).
 *
 * Unlike the addMetricListener method, which returns a listener Id and requires
 * you to remove it manually, the useMetricListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Metrics object, will be deleted.
 * @param metricId The Id of the Metric to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Metric changes.
 * @param metricsOrMetricsId The Metrics object to register the listener with:
 * omit for the default context Metrics object, provide an Id for a named
 * context Metrics object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useMetricListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useMetricListener('highestPrice', () => undefined, metrics);
 *   dispose();
 * });
 * ```
 * @category Metrics primitives
 * @since v8.3.0
 */
export function useMetricListener(
  metricId: MaybeAccessor<IdOrNull>,
  listener: MetricListener,
  metricsOrMetricsId?: MaybeAccessor<MetricsOrMetricsId | undefined>,
): void;

/**
 * The useCreateIndexes primitive is used to create an Indexes object within a
 * Solid application with convenient memoization.
 *
 * It is possible to create an Indexes object outside of the Solid app with the
 * regular createIndexes function and pass it in, but you may prefer to create
 * it within the app, perhaps inside the top-level component. To prevent a new
 * Indexes object being created every time the app renders or updates, since
 * v5.0 this primitive performs the creation in an effect. As a result it will
 * return `undefined` on the brief first render (or if the Store is not yet
 * defined), which you should defend against.
 *
 * This primitive ensures the Indexes object is destroyed whenever a new one is
 * created or the component is unmounted.
 * @param store A reference to the Store for which to create a new Indexes
 * object.
 * @param create A function for performing the creation steps of the Indexes
 * object for the Store, plus any additional steps such as adding definitions or
 * listeners, and returning it.
 * @returns A reference to the Indexes object.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCreateIndexes} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCreateIndexes(store, (store) => createIndexes(store));
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useCreateIndexes(
  store: MaybeAccessor<Store | undefined>,
  create: (store: Store) => Indexes,
): Accessor<Indexes | undefined>;

/**
 * The useIndexesIds primitive is used to retrieve the Ids of all the named
 * Indexes objects present in the current Provider component context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useIndexesIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useIndexesIds();
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useIndexesIds(): Accessor<Ids>;

/**
 * The useIndexes primitive is used to get a reference to an Indexes object from
 * within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Indexes object (or a set of Indexes objects named by
 * Id) that can be easily accessed without having to be passed down as props
 * through every component.
 *
 * The useIndexes primitive lets you either get a reference to the default
 * Indexes object (when called without a parameter), or one of the Indexes
 * objects that are named by Id (when called with an Id parameter).
 * @param id An optional Id for accessing an Indexes object that was named with
 * an Id in the Provider.
 * @returns A reference to the Indexes object (or `undefined` if not within a
 * Provider context, or if the requested Indexes object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useIndexes} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useIndexes();
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useIndexes(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<Indexes | undefined>;

/**
 * The useIndexesOrIndexesById primitive is used to get a reference to an
 * Indexes object from within a Provider component context, _or_ have it passed
 * directly to this primitive.
 *
 * This is mostly of use when you are developing a component that needs an
 * Indexes object and which might have been passed in explicitly to the
 * component or is to be picked up from the context by Id (a common pattern for
 * Indexes-based components).
 *
 * This primitive is unlikely to be used often. For most situations, you will
 * want to use the useIndexes primitive.
 * @param indexesOrIndexesId Either an Id for accessing an Indexes object that
 * was named with an Id in the Provider, or the Indexes object itself.
 * @returns A reference to the Indexes object (or `undefined` if not within a
 * Provider context, or if the requested Indexes object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useIndexesOrIndexesById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useIndexesOrIndexesById(indexes);
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useIndexesOrIndexesById(
  indexesOrIndexesId?: MaybeAccessor<IndexesOrIndexesId | undefined>,
): Accessor<Indexes | undefined>;

/**
 * The useProvideIndexes primitive is used to add an Indexes object by Id to a
 * Provider component, but imperatively from a component within it.
 *
 * Normally you will register an Indexes object by Id in a context by using the
 * `indexesById` prop of the top-level Provider component. This primitive,
 * however, lets you dynamically add a new Indexes object to the context, from
 * within a descendent component. This is useful for applications where the set
 * of Indexes objects is not known at the time of the first render of the root
 * Provider.
 *
 * An Indexes object added to the Provider context in this way will be available
 * to other components within the context (using the useIndexes primitive and so
 * on). If you use the same Id as an existing Indexes object registration, the
 * new one will take priority over one provided by the `indexesById` prop.
 * @param indexesId The Id of the Indexes object to be registered with the
 * Provider.
 * @param indexes The Indexes object to be registered.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createIndexes, createStore} from 'tinybase';
 * import {useProvideIndexes} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'color', 'brown');
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'petsByColor',
 *     'pets',
 *     'color',
 *   );
 *   useProvideIndexes('petIndexes', indexes);
 *   console.log(JSON.stringify(indexes.getSliceIds('petsByColor')));
 *   // -> '["brown"]'
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useProvideIndexes(indexesId: Id, indexes: Indexes): void;

/**
 * The useIndexIds primitive gets an array of the Index Ids registered with an
 * Indexes object, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Indexes object or a set of Indexes objects named by
 * Id. The useIndexIds primitive lets you indicate which Indexes object to get
 * data for: omit the optional final parameter for the default context Indexes
 * object, provide an Id for a named context Indexes object, or provide an
 * Indexes object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Index Ids in the Indexes object will cause an update. When the component
 * containing this primitive is unmounted, the listener will be automatically
 * removed.
 * @param indexesOrIndexesId The Indexes object to be accessed: omit for the
 * default context Indexes object, provide an Id for a named context Indexes
 * object, or provide an explicit reference.
 * @returns The Index Ids in the Indexes object, or an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useIndexIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useIndexIds(indexes);
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useIndexIds(
  indexesOrIndexesId?: MaybeAccessor<IndexesOrIndexesId | undefined>,
): Accessor<Ids>;

/**
 * The useSliceIds primitive gets the list of Slice Ids in an Index, and
 * registers a listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Indexes object or a set of Indexes objects named by
 * Id. The useSliceIds primitive lets you indicate which Indexes object to get
 * data for: omit the optional final parameter for the default context Indexes
 * object, provide an Id for a named context Indexes object, or provide a
 * Indexes object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Slice Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param indexId The Id of the Index.
 * @param indexesOrIndexesId The Indexes object to be accessed: omit for the
 * default context Indexes object, provide an Id for a named context Indexes
 * object, or provide an explicit reference.
 * @returns The Slice Ids in the Index, or an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSliceIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSliceIds('bySpecies', indexes);
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useSliceIds(
  indexId: MaybeAccessor<Id>,
  indexesOrIndexesId?: MaybeAccessor<IndexesOrIndexesId | undefined>,
): Accessor<Ids>;

/**
 * The useSliceRowIds primitive gets the list of Row Ids in a given Slice, and
 * registers a listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Indexes object or a set of Indexes objects named by
 * Id. The useSliceRowIds primitive lets you indicate which Indexes object to
 * get data for: omit the optional final parameter for the default context
 * Indexes object, provide an Id for a named context Indexes object, or provide
 * an Indexes object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Row Ids in the Slice will cause an update. When the component containing
 * this primitive is unmounted, the listener will be automatically removed.
 * @param indexId The Id of the Index.
 * @param sliceId The Id of the Slice in the Index.
 * @param indexesOrIndexesId The Indexes object to be accessed: omit for the
 * default context Indexes object, provide an Id for a named context Indexes
 * object, or provide an explicit reference.
 * @returns The Row Ids in the Slice, or an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSliceRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSliceRowIds('bySpecies', 'dog', indexes);
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useSliceRowIds(
  indexId: MaybeAccessor<Id>,
  sliceId: MaybeAccessor<Id>,
  indexesOrIndexesId?: MaybeAccessor<IndexesOrIndexesId | undefined>,
): Accessor<Ids>;

/**
 * The useSliceIdsListener primitive registers a listener function with the
 * Indexes object that will be called whenever the Slice Ids in an Index change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useSliceIds primitive).
 *
 * You can either listen to a single Index (by specifying the Index Id as the
 * method's first parameter), or changes to any Index (by providing a `null`
 * wildcard).
 *
 * Unlike the addSliceIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useSliceIdsListener primitive manages
 * this you to remove it manually, the useWillFinisTransactionListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Indexes object will be deleted.
 * @param indexId The Id of the Index to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Slice Ids in
 * the Index change.
 * @param indexesOrIndexesId The Indexes object to register the listener with:
 * omit for the default context Indexes object, provide an Id for a named
 * context Indexes object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSliceIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSliceIdsListener('bySpecies', () => undefined, indexes);
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useSliceIdsListener(
  indexId: MaybeAccessor<IdOrNull>,
  listener: SliceIdsListener,
  indexesOrIndexesId?: MaybeAccessor<IndexesOrIndexesId | undefined>,
): void;

/**
 * The useSliceRowIdsListener primitive registers a listener function with the
 * Indexes object that will be called whenever the Row Ids in a Slice change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useSliceRowIds primitive).
 *
 * You can either listen to a single Slice (by specifying the Index Id and Slice
 * Id as the method's first two parameters), or changes to any Slice (by
 * providing `null` wildcards).
 *
 * Both, either, or neither of the `indexId` and `sliceId` parameters can be
 * wildcarded with `null`. You can listen to a specific Slice in a specific
 * Index, any Slice in a specific Index, a specific Slice in any Index, or any
 * Slice in any Index.
 *
 * Unlike the addSliceRowIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useSliceRowIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Indexes object will be deleted.
 * @param indexId The Id of the Index to listen to, or `null` as a wildcard.
 * @param sliceId The Id of the Slice to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Row Ids in the
 * Slice change.
 * @param indexesOrIndexesId The Indexes object to register the listener with:
 * omit for the default context Indexes object, provide an Id for a named
 * context Indexes object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSliceRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSliceRowIdsListener('bySpecies', 'dog', () => undefined, indexes);
 *   dispose();
 * });
 * ```
 * @category Indexes primitives
 * @since v8.3.0
 */
export function useSliceRowIdsListener(
  indexId: MaybeAccessor<IdOrNull>,
  sliceId: MaybeAccessor<IdOrNull>,
  listener: SliceRowIdsListener,
  indexesOrIndexesId?: MaybeAccessor<IndexesOrIndexesId | undefined>,
): void;

/**
 * The useCreateRelationships primitive is used to create a Relationships object
 * within a Solid application with convenient memoization.
 *
 * It is possible to create a Relationships object outside of the Solid app with
 * the regular createRelationships function and pass it in, but you may prefer
 * to create it within the app, perhaps inside the top-level component. To
 * prevent a new Relationships object being created every time the app renders
 * or updates, since v5.0 this primitive performs the creation in an effect. As
 * a result it will return `undefined` on the brief first render (or if the
 * Store is not yet defined), which you should defend against.
 *
 * This primitive ensures the Relationships object is destroyed whenever a new
 * one is created or the component is unmounted.
 * @param store A reference to the Store for which to create a new Relationships
 * object.
 * @param create An optional callback for performing post-creation steps on the
 * Relationships object, such as adding definitions or listeners.
 * @returns A reference to the Relationships object.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCreateRelationships} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCreateRelationships(store, (store) => createRelationships(store));
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useCreateRelationships(
  store: MaybeAccessor<Store | undefined>,
  create: (store: Store) => Relationships,
): Accessor<Relationships | undefined>;

/**
 * The useRelationshipsIds primitive is used to retrieve the Ids of all the
 * named Relationships objects present in the current Provider component
 * context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRelationshipsIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRelationshipsIds();
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useRelationshipsIds(): Accessor<Ids>;

/**
 * The useRelationships primitive is used to get a reference to a Relationships
 * object from within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Relationships object (or a set of Relationships objects
 * named by Id) that can be easily accessed without having to be passed down as
 * props through every component.
 *
 * The useRelationships primitive lets you either get a reference to the default
 * Relationships object (when called without a parameter), or one of the
 * Relationships objects that are named by Id (when called with an Id
 * parameter).
 * @param id An optional Id for accessing a Relationships object that was named
 * with an Id in the Provider.
 * @returns A reference to the Relationships object (or `undefined` if not
 * within a Provider context, or if the requested Relationships object does not
 * exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRelationships} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRelationships();
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useRelationships(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<Relationships | undefined>;

/**
 * The useRelationshipsOrRelationshipsById primitive is used to get a reference
 * to a Relationships object from within a Provider component context, _or_ have
 * it passed directly to this primitive.
 *
 * This is mostly of use when you are developing a component that needs a
 * Relationships object and which might have been passed in explicitly to the
 * component or is to be picked up from the context by Id (a common pattern for
 * Relationships-based components).
 *
 * This is unlikely to be used often. For most situations, you will want to use
 * the useRelationships primitive.
 * @param relationshipsOrRelationshipsId Either an Id for accessing a
 * Relationships object that was named with an Id in the Provider, or the
 * Relationships object itself.
 * @returns A reference to the Relationships object (or `undefined` if not
 * within a Provider context, or if the requested Relationships object does not
 * exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRelationshipsOrRelationshipsById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRelationshipsOrRelationshipsById(relationships);
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useRelationshipsOrRelationshipsById(
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): Accessor<Relationships | undefined>;

/**
 * The useProvideRelationships primitive is used to add a Relationships object
 * by Id to a Provider component, but imperatively from a component within it.
 *
 * Normally you will register a Relationships object by Id in a context by using
 * the `relationshipsById` prop of the top-level Provider component. This
 * primitive, however, lets you dynamically add a new Relationships object to
 * the context, from within a component. This is useful for applications where
 * the set of Relationships objects is not known at the time of the first render
 * of the root Provider.
 *
 * A Relationships object added to the Provider context in this way will be
 * available to other components within the context (using the useRelationships
 * primitive and so on). If you use the same Id as an existing Relationships
 * object registration, the new one will take priority over one provided by the
 * `relationshipsById` prop.
 * @param relationshipsId The Id of the Relationships object to be registered
 * with the Provider.
 * @param relationships The Relationships object to be registered.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createRelationships, createStore} from 'tinybase';
 * import {useProvideRelationships} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTable('pets', {fido: {species: 'dog'}})
 *     .setTable('species', {dog: {price: 5}});
 *   const relationships = createRelationships(
 *     store,
 *   ).setRelationshipDefinition('petSpecies', 'pets', 'species', 'species');
 *   useProvideRelationships('petRelationships', relationships);
 *   console.log(relationships.getRemoteRowId('petSpecies', 'fido'));
 *   // -> 'dog'
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useProvideRelationships(
  relationshipsId: Id,
  relationships: Relationships,
): void;

/**
 * The useRelationshipIds primitive gets an array of the Relationship Ids
 * registered with a Relationships object, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Relationships object or a set of Relationships
 * objects named by Id. The useRelationshipIds primitive lets you indicate which
 * Relationships object to get data for: omit the optional final parameter for
 * the default context Relationships object, provide an Id for a named context
 * Relationships object, or provide a Relationships object explicitly by
 * reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Relationship Ids in the Relationships object will cause an update. When
 * the component containing this primitive is unmounted, the listener will be
 * automatically removed.
 * @param relationshipsOrRelationshipsId The Relationships object to be
 * accessed: omit for the default context Relationships object, provide an Id
 * for a named context Relationships object, or provide an explicit reference.
 * @returns The Relationship Ids in the Relationships object, or an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRelationshipIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRelationshipIds(relationships);
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useRelationshipIds(
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): Accessor<Ids>;

/**
 * The useRemoteRowId primitive gets the remote Row Id for a given local Row in
 * a Relationship, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Relationships object or a set of Relationships
 * objects named by Id. The useRemoteRowId primitive lets you indicate which
 * Relationships object to get data for: omit the optional final parameter for
 * the default context Relationships object, provide an Id for a named context
 * Relationships object, or provide a Relationships object explicitly by
 * reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the remote Row Id will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param relationshipId The Id of the Relationship.
 * @param localRowId The Id of the local Row in the Relationship.
 * @param relationshipsOrRelationshipsId The Relationships object to be
 * accessed: omit for the default context Relationships object, provide an Id
 * for a named context Relationships object, or provide an explicit reference.
 * @returns The remote Row Id in the Relationship, or `undefined`.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRemoteRowId} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRemoteRowId('petSpecies', 'fido', relationships);
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useRemoteRowId(
  relationshipId: MaybeAccessor<Id>,
  localRowId: MaybeAccessor<Id>,
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): Accessor<Id | undefined>;

/**
 * The useLocalRowIds primitive gets the local Row Ids for a given remote Row in
 * a Relationship, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Relationships object or a set of Relationships
 * objects named by Id. The useLocalRowIds primitive lets you indicate which
 * Relationships object to get data for: omit the optional final parameter for
 * the default context Relationships object, provide an Id for a named context
 * Relationships object, or provide a Relationships object explicitly by
 * reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the local Row Id will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param relationshipId The Id of the Relationship.
 * @param remoteRowId The Id of the remote Row in the Relationship.
 * @param relationshipsOrRelationshipsId The Relationships object to be
 * accessed: omit for the default context Relationships object, provide an Id
 * for a named context Relationships object, or provide an explicit reference.
 * @returns The local Row Ids in the Relationship, or an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useLocalRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useLocalRowIds('petSpecies', 'dog', relationships);
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useLocalRowIds(
  relationshipId: MaybeAccessor<Id>,
  remoteRowId: MaybeAccessor<Id>,
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): Accessor<Ids>;

/**
 * The useLinkedRowIds primitive gets the linked Row Ids for a given Row in a
 * linked list Relationship, and registers a listener so that any changes to
 * that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Relationships object or a set of Relationships
 * objects named by Id. The useLinkedRowIds primitive lets you indicate which
 * Relationships object to get data for: omit the optional final parameter for
 * the default context Relationships object, provide an Id for a named context
 * Relationships object, or provide a Relationships object explicitly by
 * reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the linked Row Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param relationshipId The Id of the Relationship.
 * @param firstRowId The Id of the first Row in the linked list Relationship.
 * @param relationshipsOrRelationshipsId The Relationships object to be
 * accessed: omit for the default context Relationships object, provide an Id
 * for a named context Relationships object, or provide an explicit reference.
 * @returns The linked Row Ids in the Relationship.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useLinkedRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useLinkedRowIds('nextPet', 'fido', relationships);
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useLinkedRowIds(
  relationshipId: MaybeAccessor<Id>,
  firstRowId: MaybeAccessor<Id>,
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): Accessor<Ids>;

/**
 * The useRemoteRowIdListener primitive registers a listener function with the
 * Relationships object that will be called whenever a remote Row Id in a
 * Relationship changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useRemoteRowId primitive).
 *
 * You can either listen to a single local Row (by specifying the Relationship
 * Id and local Row Id as the method's first two parameters), or changes to any
 * local Row (by providing a `null` wildcards).
 *
 * Both, either, or neither of the `relationshipId` and `localRowId` parameters
 * can be wildcarded with `null`. You can listen to a specific local Row in a
 * specific Relationship, any local Row in a specific Relationship, a specific
 * local Row in any Relationship, or any local Row in any Relationship.
 *
 * Unlike the addRemoteRowIdListener method, which returns a listener Id and
 * requires you to remove it manually, the useRemoteRowIdListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Indexes object will be deleted.
 * @param relationshipId The Id of the Relationship to listen to, or `null` as a
 * wildcard.
 * @param localRowId The Id of the local Row to listen to, or `null` as a
 * wildcard.
 * @param listener The function that will be called whenever the remote Row Id
 * changes.
 * @param relationshipsOrRelationshipsId The Relationships object to register
 * the listener with: omit for the default context Relationships object, provide
 * an Id for a named context Relationships object, or provide an explicit
 * reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRemoteRowIdListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRemoteRowIdListener(
 *     'petSpecies',
 *     'fido',
 *     () => undefined,
 *     relationships,
 *   );
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useRemoteRowIdListener(
  relationshipId: MaybeAccessor<IdOrNull>,
  localRowId: MaybeAccessor<IdOrNull>,
  listener: RemoteRowIdListener,
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): void;

/**
 * The useLocalRowIdsListener primitive registers a listener function with the
 * Relationships object that will be called whenever the local Row Ids in a
 * Relationship change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useLocalRowIds primitive).
 *
 * You can either listen to a single local Row (by specifying the Relationship
 * Id and local Row Id as the method's first two parameters), or changes to any
 * local Row (by providing a `null` wildcards).
 *
 * Both, either, or neither of the `relationshipId` and `remoteRowId` parameters
 * can be wildcarded with `null`. You can listen to a specific remote Row in a
 * specific Relationship, any remote Row in a specific Relationship, a specific
 * remote Row in any Relationship, or any remote Row in any Relationship.
 *
 * Unlike the addLocalRowsIdListener method, which returns a listener Id and
 * requires you to remove it manually, the useLocalRowIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Indexes object will be deleted.
 * @param relationshipId The Id of the Relationship to listen to, or `null` as a
 * wildcard.
 * @param remoteRowId The Id of the remote Row to listen to, or `null` as a
 * wildcard.
 * @param listener The function that will be called whenever the local Row Ids
 * change.
 * @param relationshipsOrRelationshipsId The Relationships object to register
 * the listener with: omit for the default context Relationships object, provide
 * an Id for a named context Relationships object, or provide an explicit
 * reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useLocalRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useLocalRowIdsListener(
 *     'petSpecies',
 *     'dog',
 *     () => undefined,
 *     relationships,
 *   );
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useLocalRowIdsListener(
  relationshipId: MaybeAccessor<IdOrNull>,
  remoteRowId: MaybeAccessor<IdOrNull>,
  listener: LocalRowIdsListener,
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): void;

/**
 * The useLinkedRowIdsListener primitive registers a listener function with the
 * Relationships object that will be called whenever the linked Row Ids in a
 * Relationship change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useLinkedRowIds primitive).
 *
 * Unlike other listener registration methods, you cannot provide `null`
 * wildcards for the first two parameters of the useLinkedRowIdsListener method.
 * This prevents the prohibitive expense of tracking all the possible linked
 * lists (and partial linked lists within them) in a Store.
 *
 * Unlike the addLinkedRowsIdListener method, which returns a listener Id and
 * requires you to remove it manually, the useLinkedRowIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Indexes object will be deleted.
 * @param relationshipId The Id of the Relationship to listen to.
 * @param firstRowId The Id of the first Row of the linked list to listen to.
 * @param listener The function that will be called whenever the linked Row Ids
 * change.
 * @param relationshipsOrRelationshipsId The Relationships object to register
 * the listener with: omit for the default context Relationships object, provide
 * an Id for a named context Relationships object, or provide an explicit
 * reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useLinkedRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useLinkedRowIdsListener(
 *     'nextPet',
 *     'fido',
 *     () => undefined,
 *     relationships,
 *   );
 *   dispose();
 * });
 * ```
 * @category Relationships primitives
 * @since v8.3.0
 */
export function useLinkedRowIdsListener(
  relationshipId: MaybeAccessor<Id>,
  firstRowId: MaybeAccessor<Id>,
  listener: LinkedRowIdsListener,
  relationshipsOrRelationshipsId?: MaybeAccessor<
    RelationshipsOrRelationshipsId | undefined
  >,
): void;

/**
 * The useCreateQueries primitive is used to create a Queries object within a
 * Solid application with convenient memoization.
 *
 * It is possible to create a Queries object outside of the Solid app with the
 * regular createQueries function and pass it in, but you may prefer to create
 * it within the app, perhaps inside the top-level component. To prevent a new
 * Queries object being created every time the app renders or updates, since
 * v5.0 this primitive performs the creation in an effect. As a result it will
 * return `undefined` on the brief first render (or if the Store is not yet
 * defined), which you should defend against.
 *
 * This primitive ensures the Queries object is destroyed whenever a new one is
 * created or the component is unmounted.
 * @param store A reference to the Store for which to create a new Queries
 * object.
 * @param create An optional callback for performing post-creation steps on the
 * Queries object, such as adding definitions or listeners.
 * @returns A reference to the Queries object.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCreateQueries} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCreateQueries(store, (store) => createQueries(store));
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useCreateQueries(
  store: MaybeAccessor<Store | undefined>,
  create: (store: Store) => Queries,
): Accessor<Queries | undefined>;

/**
 * The useQueriesIds primitive is used to retrieve the Ids of all the named
 * Queries objects present in the current Provider component context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useQueriesIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useQueriesIds();
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useQueriesIds(): Accessor<Ids>;

/**
 * The useQueries primitive is used to get a reference to a Queries object from
 * within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Queries object (or a set of Queries objects named by
 * Id) that can be easily accessed without having to be passed down as props
 * through every component.
 *
 * The useQueries primitive lets you either get a reference to the default
 * Queries object (when called without a parameter), or one of the Queries
 * objects that are named by Id (when called with an Id parameter).
 * @param id An optional Id for accessing a Queries object that was named with
 * an Id in the Provider.
 * @returns A reference to the Queries object (or `undefined` if not within a
 * Provider context, or if the requested Queries object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useQueries} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useQueries();
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useQueries(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<Queries | undefined>;

/**
 * The useQueriesOrQueriesById primitive is used to get a reference to a Queries
 * object from within a Provider component context, _or_ have it passed directly
 * to this primitive.
 *
 * This is mostly of use when you are developing a component that needs a
 * Queries object and which might have been passed in explicitly to the
 * component or is to be picked up from the context by Id (a common pattern for
 * Queries-based components).
 *
 * This is unlikely to be used often. For most situations, you will want to use
 * the useQueries primitive.
 * @param queriesOrQueriesId Either an Id for accessing a Queries object that
 * was named with an Id in the Provider, or the Queries object itself.
 * @returns A reference to the Queries object (or `undefined` if not within a
 * Provider context, or if the requested Queries object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useQueriesOrQueriesById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useQueriesOrQueriesById(queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useQueriesOrQueriesById(
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Queries | undefined>;

/**
 * The useProvideQueries primitive is used to add a Queries object by Id to a
 * Provider component, but imperatively from a component within it.
 *
 * Normally you will register a Queries object by Id in a context by using the
 * `queriesById` prop of the top-level Provider component. This primitive,
 * however, lets you dynamically add a new Queries object to the context, from
 * within a component. This is useful for applications where the set of Queries
 * objects is not known at the time of the first render of the root Provider.
 *
 * A Queries object added to the Provider context in this way will be available
 * to other components within the context (using the useQueries primitive and so
 * on). If you use the same Id as an existing Queries object registration, the
 * new one will take priority over one provided by the `queriesById` prop.
 * @param queriesId The Id of the Queries object to be registered with the
 * Provider.
 * @param queries The Queries object to be registered.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createQueries, createStore} from 'tinybase';
 * import {useProvideQueries} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setRow('pets', 'fido', {
 *     color: 'brown',
 *     legs: 4,
 *   });
 *   const queries = createQueries(store).setQueryDefinition(
 *     'brownLegs',
 *     'pets',
 *     ({select, where}) => {
 *       select('legs');
 *       where('color', 'brown');
 *     },
 *   );
 *   useProvideQueries('petQueries', queries);
 *   console.log(JSON.stringify(queries.getResultTable('brownLegs')));
 *   // -> '{"fido":{"legs":4}}'
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useProvideQueries(queriesId: Id, queries: Queries): void;

/**
 * The useQueryIds primitive gets an array of the Query Ids registered with a
 * Queries object, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useQueryIds primitive lets you indicate which Queries object to get
 * data for: omit the optional final parameter for the default context Queries
 * object, provide an Id for a named context Queries object, or provide a
 * Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Query Ids in the Queries object will cause an update. When the component
 * containing this primitive is unmounted, the listener will be automatically
 * removed.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns The Query Ids in the Queries object, or an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useQueryIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useQueryIds(queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useQueryIds(
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Ids>;

/**
 * The useResultTable primitive returns an object containing the entire data of
 * the ResultTable of the given query, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultTable primitive lets you indicate which Queries object to
 * get data for: omit the final optional parameter for the default context
 * Queries object, provide an Id for a named context Queries object, or provide
 * a Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the query result will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns An object containing the entire data of the ResultTable.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultTable} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultTable('petColors', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultTable(
  queryId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Table>;

/**
 * The useResultTableCellIds primitive returns the Ids of every Cell used across
 * the whole ResultTable of the given query, and registers a listener so that
 * any changes to those Ids will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultTableCellIds primitive lets you indicate which Queries
 * object to get data for: omit the final optional parameter for the default
 * context Queries object, provide an Id for a named context Queries object, or
 * provide a Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the result Cell Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference. See the
 * addResultTableCellIdsListener method for more details.
 * @returns An array of the Ids of every Cell in the result of the query.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultTableCellIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultTableCellIds('petColors', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultTableCellIds(
  queryId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Ids>;

/**
 * The useResultRowCount primitive returns the count of the Row objects in the
 * ResultTable of the given query, and registers a listener so that any changes
 * to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultRowCount primitive lets you indicate which Queries object to
 * get data for: omit the final optional parameter for the default context
 * Queries object, provide an Id for a named context Queries object, or provide
 * a Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the count of ResultRow objects will cause an update. When the component
 * containing this primitive is unmounted, the listener will be automatically
 * removed.
 * @param queryId The Id of the query.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference. See the addResultRowCountListener
 * method for more details.
 * @returns The number of ResultRow objects in the ResultTable.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultRowCount} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultRowCount('petColors', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultRowCount(
  queryId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<number>;

/**
 * The useResultRowIds primitive returns the Ids of every Row in the ResultTable
 * of the given query, and registers a listener so that any changes to those Ids
 * will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultRowIds primitive lets you indicate which Queries object to
 * get data for: omit the final optional parameter for the default context
 * Queries object, provide an Id for a named context Queries object, or provide
 * a Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the result Row Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference. See the addResultRowIdsListener
 * method for more details.
 * @returns An array of the Ids of every Row in the result of the query.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultRowIds('petColors', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultRowIds(
  queryId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Ids>;

/**
 * The useResultSortedRowIds primitive returns the sorted (and optionally,
 * paginated) Ids of every Row in the ResultTable of the given query, and
 * registers a listener so that any changes to those Ids will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultSortedRowIds primitive lets you indicate which Queries
 * object to get data for: omit the final optional parameter for the default
 * context Queries object, provide an Id for a named context Queries object, or
 * provide a Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the sorted result Row Ids will cause an update. When the component containing
 * this primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query.
 * @param cellId The Id of the result Cell whose values are used for the
 * sorting, or `undefined` to sort by the result Row Id itself.
 * @param descending Whether the sorting should be in descending order.
 * @param offset The number of Row Ids to skip for pagination purposes, if any.
 * @param limit The maximum number of Row Ids to return, or `undefined` for all.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns An array of the Ids of every Row in the result of the query.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultSortedRowIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultSortedRowIds(
 *     'petColors',
 *     'color',
 *     false,
 *     0,
 *     undefined,
 *     queries,
 *   );
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultSortedRowIds(
  queryId: MaybeAccessor<Id>,
  cellId?: MaybeAccessor<Id | undefined>,
  descending?: MaybeAccessor<boolean | undefined>,
  offset?: MaybeAccessor<number | undefined>,
  limit?: MaybeAccessor<number | undefined>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Ids>;

/**
 * The useResultRow primitive returns an object containing the data of a single
 * Row in the ResultTable of the given query, and registers a listener so that
 * any changes to that Row will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultRow primitive lets you indicate which Queries object to get
 * data for: omit the final optional parameter for the default context Queries
 * object, provide an Id for a named context Queries object, or provide a
 * Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the result Row will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query.
 * @param rowId The Id of the Row in the ResultTable.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns An object containing the entire data of the Row in the ResultTable
 * of the query.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultRow} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultRow('petColors', 'fido', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultRow(
  queryId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Row>;

/**
 * The useResultCellIds primitive returns the Ids of every Cell in a given Row
 * in the ResultTable of the given query, and registers a listener so that any
 * changes to those Ids will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultCellIds primitive lets you indicate which Queries object to
 * get data for: omit the final optional parameter for the default context
 * Queries object, provide an Id for a named context Queries object, or provide
 * a Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the result Cell Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query.
 * @param rowId The Id of the Row in the ResultTable.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns An array of the Ids of every Cell in the Row in the result of the
 * query.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultCellIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultCellIds('petColors', 'fido', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultCellIds(
  queryId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Ids>;

/**
 * The useResultCell primitive returns the value of a single Cell in a given Row
 * in the ResultTable of the given query, and registers a listener so that any
 * changes to that value will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useResultCell primitive lets you indicate which Queries object to get
 * data for: omit the final optional parameter for the default context Queries
 * object, provide an Id for a named context Queries object, or provide a
 * Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the result Cell will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query.
 * @param rowId The Id of the Row in the ResultTable.
 * @param cellId The Id of the Cell in the Row.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns The value of the Cell, or `undefined`.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultCell} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultCell('petColors', 'fido', 'color', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultCell(
  queryId: MaybeAccessor<Id>,
  rowId: MaybeAccessor<Id>,
  cellId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<Cell | undefined>;

/**
 * The useResultTableListener primitive registers a listener function with a
 * Queries object that will be called whenever data in a ResultTable changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultTable primitive).
 *
 * You can either listen to a single ResultTable (by specifying a query Id as
 * the method's first parameter) or changes to any ResultTable (by providing a
 * `null` wildcard).
 *
 * Unlike the addResultTableListener method, which returns a listener Id and
 * requires you to remove it manually, the useResultTableListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever data in the
 * matching ResultTable changes.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultTableListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultTableListener('petColors', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultTableListener(
  queryId: MaybeAccessor<IdOrNull>,
  listener: ResultTableListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useResultTableCellIdsListener primitive registers a listener function
 * with a Queries object that will be called whenever the Cell Ids that appear
 * anywhere in a ResultTable change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultTableCellIds primitive).
 *
 * You can either listen to a single ResultTable (by specifying a query Id as
 * the method's first parameter) or changes to any ResultTable (by providing a
 * `null` wildcard).
 *
 * Unlike the addResultTableCellIdsListener method, which returns a listener Id
 * and requires you to remove it manually, the useResultTableCellIdsListener
 * primitive manages this lifecycle for you: when the listener changes (per its
 * you to remove it manually, the useResultTableCellIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Cell Ids that
 * appear anywhere in the ResultTable change.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultTableCellIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultTableCellIdsListener('petColors', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultTableCellIdsListener(
  queryId: MaybeAccessor<IdOrNull>,
  listener: ResultTableCellIdsListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useResultRowCountListener primitive registers a listener function with a
 * Queries object that will be called whenever the count of ResultRow objects in
 * a ResultTable changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultRowCount primitive).
 *
 * You can either listen to a single ResultTable (by specifying a query Id as
 * the method's first parameter) or changes to any ResultTable (by providing a
 * `null` wildcard).
 *
 * Unlike the addResultRowCountListener method, which returns a listener Id and
 * requires you to remove it manually, the useResultRowCountListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Row Ids in the
 * matching ResultTable change.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultRowCountListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultRowCountListener('petColors', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultRowCountListener(
  queryId: MaybeAccessor<IdOrNull>,
  listener: ResultRowCountListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useResultRowIdsListener primitive registers a listener function with a
 * Queries object that will be called whenever the Row Ids in a ResultTable
 * change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultRowIds primitive).
 *
 * You can either listen to a single ResultTable (by specifying a query Id as
 * the method's first parameter) or changes to any ResultTable (by providing a
 * `null` wildcard).
 *
 * Unlike the addResultRowIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useResultRowIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Row Ids in the
 * matching ResultTable change.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultRowIdsListener('petColors', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultRowIdsListener(
  queryId: MaybeAccessor<IdOrNull>,
  listener: ResultRowIdsListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useResultSortedRowIdsListener primitive registers a listener function
 * with a Queries object that will be called whenever the sorted (and
 * optionally, paginated) Row Ids in a ResultTable change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultSortedRowIds primitive).
 *
 * Unlike the addResultSortedRowIdsListener method, which returns a listener Id
 * and requires you to remove it manually, the useResultSortedRowIdsListener
 * primitive manages this lifecycle for you: when the listener changes (per its
 * you to remove it manually, the useResultSortedRowIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to.
 * @param cellId The Id of the Cell whose values are used for the sorting, or
 * `undefined` to sort by the Row Id itself.
 * @param descending Whether the sorting should be in descending order.
 * @param offset The number of Row Ids to skip for pagination purposes, if any.
 * @param limit The maximum number of Row Ids to return, or `undefined` for all.
 * @param listener The function that will be called whenever the Row Ids in the
 * matching ResultTable change.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultSortedRowIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultSortedRowIdsListener(
 *     'petColors',
 *     'color',
 *     false,
 *     0,
 *     undefined,
 *     () => undefined,
 *     queries,
 *   );
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultSortedRowIdsListener(
  queryId: MaybeAccessor<Id>,
  cellId: MaybeAccessor<Id | undefined>,
  descending: MaybeAccessor<boolean>,
  offset: MaybeAccessor<number>,
  limit: MaybeAccessor<number | undefined>,
  listener: ResultSortedRowIdsListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useResultRowListener primitive registers a listener function with a
 * Queries object that will be called whenever data in a result Row changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultRow primitive).
 *
 * You can either listen to a single result Row (by specifying a query Id and
 * Row Id as the method's first two parameters) or changes to any result Row (by
 * providing `null` wildcards).
 *
 * Both, either, or neither of the `queryId` and `rowId` parameters can be
 * wildcarded with `null`. You can listen to a specific result Row in a specific
 * query, any result Row in a specific query, a specific result Row in any
 * query, or any result Row in any query.
 *
 * Unlike the addResultRowListener method, which returns a listener Id and
 * requires you to remove it manually, the useResultRowListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param rowId The Id of the result Row to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever data in the
 * matching result Row changes.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultRowListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultRowListener('petColors', 'fido', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultRowListener(
  queryId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  listener: ResultRowListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useResultCellIdsListener primitive registers a listener function with a
 * Queries object that will be called whenever the Cell Ids in a result Row
 * change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultCellIds primitive).
 *
 * Both, either, or neither of the `queryId` and `rowId` parameters can be
 * wildcarded with `null`. You can listen to a specific result Row in a specific
 * query, any result Row in a specific query, a specific result Row in any
 * query, or any result Row in any query.
 *
 * Unlike the addResultCellIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useResultCellIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param rowId The Id of the result Row to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the Row Ids in the
 * matching ResultTable change.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultCellIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultCellIdsListener('petColors', 'fido', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultCellIdsListener(
  queryId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  listener: ResultCellIdsListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useResultCellListener primitive registers a listener function with a
 * Queries object that will be called whenever data in a Cell changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useResultCell primitive).
 *
 * You can either listen to a single Cell (by specifying the Table Id, Row Id,
 * and Cell Id as the method's first three parameters) or changes to any Cell
 * (by providing `null` wildcards).
 *
 * All, some, or none of the `queryId`, `rowId`, and `cellId` parameters can be
 * wildcarded with `null`. You can listen to a specific Cell in a specific
 * result Row in a specific query, any Cell in any result Row in any query, for
 * example - or every other combination of wildcards.
 *
 * Unlike the addResultCellListener method, which returns a listener Id and
 * requires you to remove it manually, the useResultCellListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param rowId The Id of the result Row to listen to, or `null` as a wildcard.
 * @param cellId The Id of the result Cell to listen to, or `null` as a
 * wildcard.
 * @param listener The function that will be called whenever data in the
 * matching result Cell changes.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useResultCellListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useResultCellListener(
 *     'petColors',
 *     'fido',
 *     'color',
 *     () => undefined,
 *     queries,
 *   );
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useResultCellListener(
  queryId: MaybeAccessor<IdOrNull>,
  rowId: MaybeAccessor<IdOrNull>,
  cellId: MaybeAccessor<IdOrNull>,
  listener: ResultCellListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useParamValues primitive returns an object containing all the parameter
 * values currently set for a query.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useParamValues primitive lets you indicate which Queries object to
 * get data for: omit the optional final parameter for the default context
 * Queries object, provide an Id for a named context Queries object, or provide
 * a Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the parameter values will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query to get parameter values for.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns An object containing all parameter values for the query, or
 * undefined if the query doesn't exist.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useParamValues} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useParamValues('petColors', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useParamValues(
  queryId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<ParamValues>;

/**
 * The useParamValuesState primitive returns an array containing all the
 * parameter values for a query, and a callback for changing them, providing an
 * easy way to bind a query's parameters to a user-controlled component.
 *
 * This is a convenience primitive that combines the useParamValues and
 * useSetParamValuesCallback primitives. It's useful when you need both read and
 * write access to query parameters in a single component.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useParamValuesState primitive lets you indicate which Queries object
 * to use: omit the final parameter for the default context Queries object,
 * provide an Id for a named context Queries object, or provide an explicit
 * reference.
 * @param queryId The Id of the query.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns An array containing the parameter values and a function to set them.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useParamValuesState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useParamValuesState('petColors', queries);
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useParamValuesState(
  queryId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): [Accessor<ParamValues>, (paramValues: ParamValues) => void];

/**
 * The useParamValue primitive returns the current value of a single parameter
 * in a query.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useParamValue primitive lets you indicate which Queries object to get
 * data for: omit the optional final parameter for the default context Queries
 * object, provide an Id for a named context Queries object, or provide a
 * Queries object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the parameter value will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param queryId The Id of the query to get the parameter value from.
 * @param paramId The Id of the parameter to get the value of.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns The value of the parameter, or undefined if it doesn't exist.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useParamValue} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useParamValue('petColors', 'species', queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useParamValue(
  queryId: MaybeAccessor<Id>,
  paramId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): Accessor<ParamValue | undefined>;

/**
 * The useParamValueState primitive returns a parameter value and a function to
 * set it, following the same pattern as Solid's createSignal convention.
 *
 * This is a convenience primitive that combines the useParamValue and
 * useSetParamValueCallback primitives. It's useful when you need both read and
 * write access to a query parameter in a single component.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Queries object or a set of Queries objects named by
 * Id. The useParamValueState primitive lets you indicate which Queries object
 * to use: omit the final parameter for the default context Queries object,
 * provide an Id for a named context Queries object, or provide an explicit
 * reference.
 * @param queryId The Id of the query.
 * @param paramId The Id of the parameter.
 * @param queriesOrQueriesId The Queries object to be accessed: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @returns An array containing the parameter value and a function to set it.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useParamValueState} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useParamValueState('petColors', 'species', queries);
 *   dispose();
 * });
 * ```
 * @category State primitives
 * @since v8.3.0
 */
export function useParamValueState(
  queryId: MaybeAccessor<Id>,
  paramId: MaybeAccessor<Id>,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): [Accessor<ParamValue | undefined>, (paramValue: ParamValue) => void];

/**
 * The useParamValuesListener primitive registers a listener function with a
 * Queries object that will be called whenever the parameter values for a query
 * change.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the values (which
 * is more easily done with the useParamValues primitive).
 *
 * Unlike the addParamValuesListener method, which returns a listener Id and
 * requires you to remove it manually, the useParamValuesListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the parameter
 * values for the query change.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useParamValuesListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useParamValuesListener('petColors', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useParamValuesListener(
  queryId: MaybeAccessor<IdOrNull>,
  listener: ParamValuesListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useParamValueListener primitive registers a listener function with a
 * Queries object that will be called whenever a single parameter value for a
 * query changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useParamValue primitive).
 *
 * You can either listen to a single parameter (by specifying the query Id and
 * parameter Id as the method's first two parameters) or changes to any
 * parameter (by providing `null` wildcards).
 *
 * Both the `queryId` and `paramId` parameters can be wildcarded with `null`.
 * You can listen to a specific parameter in a specific query, any parameter in
 * any query, for example - or every other combination of wildcards.
 *
 * Unlike the addParamValueListener method, which returns a listener Id and
 * requires you to remove it manually, the useParamValueListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Queries object will be deleted.
 * @param queryId The Id of the query to listen to, or `null` as a wildcard.
 * @param paramId The Id of the parameter to listen to, or `null` as a wildcard.
 * @param listener The function that will be called whenever the parameter value
 * changes.
 * @param queriesOrQueriesId The Queries object to register the listener with:
 * omit for the default context Queries object, provide an Id for a named
 * context Queries object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useParamValueListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useParamValueListener('petColors', 'species', () => undefined, queries);
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useParamValueListener(
  queryId: MaybeAccessor<IdOrNull>,
  paramId: MaybeAccessor<IdOrNull>,
  listener: ParamValueListener,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
): void;

/**
 * The useSetParamValueCallback primitive returns a parameterized callback that
 * can be used to set a single parameter value for a query.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will update query parameters based on user interaction. In this case, the
 * parameter will likely be the event, so that you can use data from it to
 * update the query parameter.
 *
 * The third parameter is a function which will produce the parameter value that
 * will then be used to update the query in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the query parameter has been updated.
 * @param queryId The Id of the query to update, or a GetId function that will
 * return it.
 * @param paramId The Id of the parameter to update, or a GetId function that
 * will return it.
 * @param getParamValue A function which returns the parameter value that will
 * be used to update the query, based on the parameter the callback will receive
 * (and which is most likely a DOM event).
 * @param queriesOrQueriesId The Queries object to be updated: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Queries object and the parameter value used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetParamValueCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetParamValueCallback('petColors', 'species', () => 'cat', queries)();
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useSetParamValueCallback<Parameter>(
  queryId: MaybeAccessor<Id> | GetId<Parameter>,
  paramId: MaybeAccessor<Id> | GetId<Parameter>,
  getParamValue: (parameter: Parameter, queries: Queries) => ParamValue,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
  then?: (queries: Queries, paramValue: ParamValue) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useSetParamValuesCallback primitive returns a parameterized callback that
 * can be used to set multiple parameter values for a query at once.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will update multiple query parameters based on user interaction. In this
 * case, the parameter will likely be the event, so that you can use data from
 * it to update the query parameters.
 *
 * The second parameter is a function which will produce the parameter values
 * object that will then be used to update the query in the callback.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the query parameters have been updated.
 * @param queryId The Id of the query to update, or a GetId function that will
 * return it.
 * @param getParamValues A function which returns the parameter values object
 * that will be used to update the query, based on the parameter the callback
 * will receive (and which is most likely a DOM event).
 * @param queriesOrQueriesId The Queries object to be updated: omit for the
 * default context Queries object, provide an Id for a named context Queries
 * object, or provide an explicit reference.
 * @param then A function which is called after the mutation, with a reference
 * to the Queries object and the parameter values used in the update.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetParamValuesCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetParamValuesCallback(
 *     'petColors',
 *     () => ({species: 'cat'}),
 *     queries,
 *   )();
 *   dispose();
 * });
 * ```
 * @category Queries primitives
 * @since v8.3.0
 */
export function useSetParamValuesCallback<Parameter>(
  queryId: MaybeAccessor<Id> | GetId<Parameter>,
  getParamValues: (parameter: Parameter, queries: Queries) => ParamValues,
  queriesOrQueriesId?: MaybeAccessor<QueriesOrQueriesId | undefined>,
  then?: (queries: Queries, paramValues: ParamValues) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useCreateCheckpoints primitive is used to create a Checkpoints object
 * within a Solid application with convenient memoization.
 *
 * It is possible to create a Checkpoints object outside of the Solid app with
 * the regular createCheckpoints function and pass it in, but you may prefer to
 * create it within the app, perhaps inside the top-level component. To prevent
 * a new Checkpoints object being created every time the app renders or updates,
 * since v5.0 this primitive performs the creation in an effect. As a result it
 * will return `undefined` on the brief first render (or if the Store is not yet
 * defined), which you should defend against.
 *
 * This primitive ensures the Checkpoints object is destroyed whenever a new one
 * is created or the component is unmounted.
 * @param store A reference to the Store for which to create a new Checkpoints
 * object.
 * @param create A function for performing the creation steps of the Checkpoints
 * object for the Store, plus any additional steps such as adding definitions or
 * listeners, and returning it.
 * @returns A reference to the Checkpoints object.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCreateCheckpoints} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCreateCheckpoints(store, (store) => createCheckpoints(store));
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCreateCheckpoints(
  store: MaybeAccessor<Store | undefined>,
  create: (store: Store) => Checkpoints,
): Accessor<Checkpoints | undefined>;

/**
 * The useCheckpointsIds primitive is used to retrieve the Ids of all the named
 * Checkpoints objects present in the current Provider component context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCheckpointsIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCheckpointsIds();
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCheckpointsIds(): Accessor<Ids>;

/**
 * The useCheckpoints primitive is used to get a reference to a Checkpoints
 * object from within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Checkpoints object (or a set of Checkpoints objects
 * named by Id) that can be easily accessed without having to be passed down as
 * props through every component.
 *
 * The useCheckpoints primitive lets you either get a reference to the default
 * Checkpoints object (when called without a parameter), or one of the
 * Checkpoints objects that are named by Id (when called with an Id parameter).
 * @param id An optional Id for accessing a Checkpoints object that was named
 * with an Id in the Provider.
 * @returns A reference to the Checkpoints object (or `undefined` if not within
 * a Provider context, or if the requested Checkpoints object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCheckpoints} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCheckpoints();
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCheckpoints(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<Checkpoints | undefined>;

/**
 * The useCheckpointsOrCheckpointsById primitive is used to get a reference to a
 * Checkpoints object from within a Provider component context, _or_ have it
 * passed directly to this primitive.
 *
 * This is mostly of use when you are developing a component that needs a
 * Checkpoints object and which might have been passed in explicitly to the
 * component or is to be picked up from the context by Id (a common pattern for
 * Checkpoints-based components).
 *
 * This is unlikely to be used often. For most situations, you will want to use
 * the useCheckpoints primitive.
 * @param checkpointsOrCheckpointsId Either an Id for accessing a Checkpoints
 * object that was named with an Id in the Provider, or the Checkpoints object
 * itself.
 * @returns A reference to the Checkpoints object (or `undefined` if not within
 * a Provider context, or if the requested Checkpoints object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCheckpointsOrCheckpointsById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCheckpointsOrCheckpointsById(checkpoints);
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCheckpointsOrCheckpointsById(
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): Accessor<Checkpoints | undefined>;

/**
 * The useProvideCheckpoints primitive is used to add a Checkpoints object by Id
 * to a Provider component, but imperatively from a component within it.
 *
 * Normally you will register a Checkpoints object by Id in a context by using
 * the `checkpointsById` prop of the top-level Provider component. This
 * primitive, however, lets you dynamically add a new Checkpoints object to the
 * context, from within a component. This is useful for applications where the
 * set of Checkpoints objects is not known at the time of the first render of
 * the root Provider.
 *
 * A Checkpoints object added to the Provider context in this way will be
 * available to other components within the context (using the useCheckpoints
 * primitive and so on). If you use the same Id as an existing Checkpoints
 * object registration, the new one will take priority over one provided by the
 * `checkpointsById` prop.
 * @param checkpointsId The Id of the Checkpoints object to be registered with
 * the Provider.
 * @param checkpoints The Checkpoints object to be registered.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import {useProvideCheckpoints} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'color', 'brown');
 *   const checkpoints = createCheckpoints(store);
 *   useProvideCheckpoints('petCheckpoints', checkpoints);
 *   console.log(JSON.stringify(checkpoints.getCheckpointIds()));
 *   // -> '[[],"0",[]]'
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useProvideCheckpoints(
  checkpointsId: Id,
  checkpoints: Checkpoints,
): void;

/**
 * The useCheckpointIds primitive returns an array of the checkpoint Ids being
 * managed by this Checkpoints object, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Checkpoints object or a set of Checkpoints objects
 * named by Id. The useCheckpointIds primitive lets you indicate which
 * Checkpoints object to get data for: omit the optional parameter for the
 * default context Checkpoints object, provide an Id for a named context
 * Checkpoints object, or provide a Checkpoints object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the checkpoint Ids will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param checkpointsOrCheckpointsId The Checkpoints object to be accessed: omit
 * for the default context Checkpoints object, provide an Id for a named context
 * Checkpoints object, or provide an explicit reference.
 * @returns A CheckpointIds array, containing the checkpoint Ids managed by this
 * Checkpoints object.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCheckpointIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCheckpointIds(checkpoints);
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCheckpointIds(
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): Accessor<CheckpointIds>;

/**
 * The useCheckpoint primitive returns the label for a checkpoint, and registers
 * a listener so that any changes to that result will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Checkpoints object or a set of Checkpoints objects
 * named by Id. The useCheckpoint primitive lets you indicate which Checkpoints
 * object to get data for: omit the optional final parameter for the default
 * context Checkpoints object, provide an Id for a named context Checkpoints
 * object, or provide a Checkpoints object explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the label will cause an update. When the component containing this primitive
 * is unmounted, the listener will be automatically removed.
 * @param checkpointId The Id of the checkpoint.
 * @param checkpointsOrCheckpointsId The Checkpoints object to be accessed: omit
 * for the default context Checkpoints object, provide an Id for a named context
 * Checkpoints object, or provide an explicit reference.
 * @returns A string label for the requested checkpoint, an empty string if it
 * was never set, or `undefined` if the checkpoint does not exist.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCheckpoint} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCheckpoint('0', checkpoints);
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCheckpoint(
  checkpointId: MaybeAccessor<Id>,
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): Accessor<string | undefined>;

/**
 * The useSetCheckpointCallback primitive returns a parameterized callback that
 * can be used to record a checkpoint of a Store into a Checkpoints object that
 * can be reverted to in the future.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will set the checkpoint. In this case, the parameter will likely be the
 * event, so that you can use data from it as the checkpoint label.
 *
 * The optional first parameter is a function which will produce the label that
 * will then be used to name the checkpoint.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the checkpoint has been set.
 * @param getCheckpoint An optional function which returns a string that will be
 * used to describe the actions leading up to this checkpoint, based on the
 * parameter the callback will receive (and which is most likely a DOM event).
 * @param checkpointsOrCheckpointsId The Checkpoints object to be updated: omit
 * for the default context Checkpoints object, provide an Id for a named context
 * Checkpoints object, or provide an explicit reference.
 * @param then A function which is called after the checkpoint is set, with the
 * new checkpoint Id, a reference to the Checkpoints object and the label
 * provided, if any.
 * @returns A parameterized callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSetCheckpointCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSetCheckpointCallback(() => 'saved', checkpoints)();
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useSetCheckpointCallback<Parameter>(
  getCheckpoint?: (parameter: Parameter) => string,
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
  then?: (
    checkpointId: MaybeAccessor<Id>,
    checkpoints: Checkpoints,
    label?: string,
  ) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useGoBackwardCallback primitive returns a callback that moves the state
 * of the underlying Store back to the previous checkpoint, effectively
 * performing an 'undo' on the Store data.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will go backward to the previous checkpoint - such as when clicking an undo
 * button.
 *
 * If there is no previous checkpoint to return to, this callback has no effect.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use to go
 * backward: omit for the default context Checkpoints object, provide an Id for
 * a named context Checkpoints object, or provide an explicit reference.
 * @returns A callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useGoBackwardCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useGoBackwardCallback(checkpoints)();
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useGoBackwardCallback(
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): Callback;

/**
 * The useGoForwardCallback primitive returns a callback that moves the state of
 * the underlying Store forwards to a future checkpoint, effectively performing
 * an 'redo' on the Store data.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will go forward to the next checkpoint - such as when clicking a redo button.
 *
 * If there is no future checkpoint to return to, this callback has no effect.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use to go
 * backward: omit for the default context Checkpoints object, provide an Id for
 * a named context Checkpoints object, or provide an explicit reference.
 * @returns A callback for subsequent use.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useGoForwardCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useGoForwardCallback(checkpoints)();
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useGoForwardCallback(
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): Callback;

/**
 * The useGoToCallback primitive returns a parameterized callback that can be
 * used to move the state of the underlying Store backwards or forwards to a
 * specified checkpoint.
 *
 * This primitive is useful, for example, when creating an event handler that
 * will move the checkpoint. In this case, the parameter will likely be the
 * event, so that you can use data from it as the checkpoint Id to move to.
 *
 * The optional first parameter is a function which will produce the label that
 * will then be used to name the checkpoint.
 *
 * For convenience, you can optionally provide a `then` function which will be
 * called just after the checkpoint has been set.
 * @param getCheckpointId A function which returns an Id that will be used to
 * indicate which checkpoint to move to, based on the parameter the callback
 * will receive (and which is most likely a DOM event).
 * @param checkpointsOrCheckpointsId The Checkpoints object to be updated: omit
 * for the default context Checkpoints object, provide an Id for a named context
 * Checkpoints object, or provide an explicit reference.
 * @param then A function which is called after the checkpoint is moved, with a
 * reference to the Checkpoints object and the checkpoint Id moved to.
 * @returns A parameterized callback for subsequent use. This parameter defaults
 * to an empty array.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useGoToCallback} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useGoToCallback(() => '0', checkpoints)();
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useGoToCallback<Parameter>(
  getCheckpointId: (parameter: Parameter) => Id,
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
  then?: (checkpoints: Checkpoints, checkpointId: Id) => void,
): ParameterizedCallback<Parameter>;

/**
 * The useUndoInformation primitive returns an UndoOrRedoInformation array that
 * indicates if and how you can move the state of the underlying Store backward
 * to the previous checkpoint.
 *
 * This primitive is useful if you are building an undo button: the information
 * contains whether an undo action is available (to enable the button), the
 * callback to perform the undo action, the current checkpoint Id that will be
 * undone, and its label, if available.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use to go
 * backward: omit for the default context Checkpoints object, provide an Id for
 * a named context Checkpoints object, or provide an explicit reference.
 * @returns UndoOrRedoInformation about if and how you can move the state of the
 * underlying Store backward.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useUndoInformation} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useUndoInformation(checkpoints);
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useUndoInformation(
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): UndoOrRedoInformation;

/**
 * The useRedoInformation primitive returns an UndoOrRedoInformation array that
 * indicates if and how you can move the state of the underlying Store forwards
 * to a future checkpoint.
 *
 * This primitive is useful if you are building a redo button: the information
 * contains whether a redo action is available (to enable the button), the
 * callback to perform the redo action, the checkpoint Id that will be redone,
 * and its label, if available.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use to go
 * backward: omit for the default context Checkpoints object, provide an Id for
 * a named context Checkpoints object, or provide an explicit reference.
 * @returns UndoOrRedoInformation about if and how you can move the state of the
 * underlying Store forward.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useRedoInformation} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useRedoInformation(checkpoints);
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useRedoInformation(
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): UndoOrRedoInformation;

/**
 * The useCheckpointIdsListener primitive registers a listener function with the
 * Checkpoints object that will be called whenever its set of checkpoints
 * changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useCheckpointIds primitive).
 *
 * Unlike the addCheckpointIdsListener method, which returns a listener Id and
 * requires you to remove it manually, the useCheckpointIdsListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Checkpoints object will be deleted.
 * @param listener The function that will be called whenever the checkpoints
 * change.
 * @param checkpointsOrCheckpointsId The Checkpoints object to register the
 * listener with: omit for the default context Checkpoints object, provide an Id
 * for a named context Checkpoints object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCheckpointIdsListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCheckpointIdsListener(() => undefined, checkpoints);
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCheckpointIdsListener(
  listener: CheckpointIdsListener,
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): void;

/**
 * The useCheckpointListener primitive registers a listener function with the
 * Checkpoints object that will be called whenever the label of a checkpoint
 * changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useCheckpoint primitive).
 *
 * You can either listen to a single checkpoint label (by specifying the
 * checkpoint Id as the method's first parameter), or changes to any checkpoint
 * label (by providing a `null` wildcard).
 *
 * Unlike the addCheckpointListener method, which returns a listener Id and
 * requires you to remove it manually, the useCheckpointListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Checkpoints object will be deleted.
 * @param checkpointId The Id of the checkpoint to listen to, or `null` as a
 * wildcard.
 * @param listener The function that will be called whenever the checkpoint
 * label changes.
 * @param checkpointsOrCheckpointsId The Checkpoints object to register the
 * listener with: omit for the default context Checkpoints object, provide an Id
 * for a named context Checkpoints object, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCheckpointListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCheckpointListener('0', () => undefined, checkpoints);
 *   dispose();
 * });
 * ```
 * @category Checkpoints primitives
 * @since v8.3.0
 */
export function useCheckpointListener(
  checkpointId: MaybeAccessor<IdOrNull>,
  listener: CheckpointListener,
  checkpointsOrCheckpointsId?: MaybeAccessor<
    CheckpointsOrCheckpointsId | undefined
  >,
): void;

/**
 * The useCreatePersister primitive is used to create a Persister within a Solid
 * application along with convenient memoization and callbacks.
 *
 * It is possible to create a Persister outside of the Solid app with the
 * regular createPersister function and pass it in, but you may prefer to create
 * it within the app, perhaps inside the top-level component. To prevent a new
 * Persister being created every time the app renders or updates, since v5.0 the
 * this primitive performs the creation in an effect.
 * @returns A reference to the Persister.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCreatePersister} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCreatePersister(undefined, async () => undefined);
 *   dispose();
 * });
 * ```
 * @category Persister primitives
 * @since v8.3.0
 */
export function useCreatePersister<
  Persist extends Persists,
  PersisterOrUndefined extends Persister<Persist> | undefined,
>(
  store: MaybeAccessor<PersistedStore<Persist> | undefined>,
  create: (
    store: PersistedStore<Persist>,
  ) => PersisterOrUndefined | Promise<PersisterOrUndefined>,
  then?: (persister: Persister<Persist>) => Promise<any>,
  destroy?: (persister: Persister<Persist>) => void,
): Accessor<PersisterOrUndefined | undefined>;

/**
 * The usePersisterIds primitive is used to retrieve the Ids of all the named
 * Persister objects present in the current Provider component context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {usePersisterIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   usePersisterIds();
 *   dispose();
 * });
 * ```
 * @category Persister primitives
 * @since v8.3.0
 */
export function usePersisterIds(): Accessor<Ids>;

/**
 * The usePersister primitive is used to get a reference to a Persister object
 * from within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Persister object (or a set of Persister objects named
 * by Id) that can be easily accessed without having to be passed down as props
 * through every component.
 *
 * The usePersister primitive lets you either get a reference to the default
 * Persister object (when called without a parameter), or one of the Persister
 * objects that are named by Id (when called with an Id parameter).
 * @param id An optional Id for accessing a Persister object that was named with
 * an Id in the Provider.
 * @returns A reference to the Persister object (or `undefined` if not within a
 * Provider context, or if the requested Persister object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {usePersister} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   usePersister();
 *   dispose();
 * });
 * ```
 * @category Persister primitives
 * @since v8.3.0
 */
export function usePersister(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<AnyPersister | undefined>;

/**
 * The usePersisterOrPersisterById primitive is used to get a reference to a
 * Persister object from within a Provider component context, _or_ have it
 * passed directly to this primitive.
 *
 * This is mostly of use when you are developing a component that needs a
 * Persister object and which might have been passed in explicitly to the
 * component or is to be picked up from the context by Id (a common pattern for
 * Persister-based components).
 *
 * This is unlikely to be used often. For most situations, you will want to use
 * the usePersister primitive.
 * @param persisterOrPersisterId Either an Id for accessing a Persister object
 * that was named with an Id in the Provider, or the Persister object itself.
 * @returns A reference to the Persister object (or `undefined` if not within a
 * Provider context, or if the requested Persister object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {usePersisterOrPersisterById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   usePersisterOrPersisterById();
 *   dispose();
 * });
 * ```
 * @category Persister primitives
 * @since v8.3.0
 */
export function usePersisterOrPersisterById(
  persisterOrPersisterId?: MaybeAccessor<PersisterOrPersisterId | undefined>,
): Accessor<AnyPersister | undefined>;

/**
 * The useProvidePersister primitive is used to add a Persister object by Id to
 * a Provider component, but imperatively from a component within it.
 *
 * Normally you will register a Persister object by Id in a context by using the
 * `persistersById` prop of the top-level Provider component. This primitive,
 * however, lets you dynamically add a new Persister object to the context, from
 * within a component. This is useful for applications where the set of
 * Persister objects is not known at the time of the first render of the root
 * Provider.
 *
 * A Persister object added to the Provider context in this way will be
 * available to other components within the context (using the usePersister
 * primitive and so on). If you use the same Id as an existing Persister object
 * registration, the new one will take priority over one provided by the
 * `persistersById` prop.
 * @param persisterId The Id of the Persister object to be registered with the
 * Provider.
 * @param persister The Persister object to be registered.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {createSessionPersister} from 'tinybase/persisters/persister-browser';
 * import {useProvidePersister} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'color', 'brown');
 *   const persister = createSessionPersister(store, 'pets');
 *   useProvidePersister('petPersister', persister);
 *   console.log(persister.getStatus());
 *   // -> 0
 *   persister.destroy();
 *   dispose();
 * });
 * ```
 * @category Persister primitives
 * @since v8.3.0
 */
export function useProvidePersister(
  persisterId: Id,
  persister: AnyPersister,
): void;

/**
 * The usePersisterStatus primitive returns a the status of a Persister, and
 * registers a listener so that any changes to it will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Persister or a set of Persister objects named by Id.
 * The usePersisterStatus primitive lets you indicate which Persister to get
 * data for: omit the optional parameter for the default context Persister,
 * provide an Id for a named context Persister, or provide a Persister
 * explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Persister status will cause an update. When the component containing this
 * primitive is unmounted, the listener will be automatically removed.
 * @param persisterOrPersisterId The Persister to be accessed: omit for the
 * default context Persister, provide an Id for a named context Persister, or
 * provide an explicit reference.
 * @returns The status of the Persister: 0 means idle, 1 means loading, and 2
 * means saving.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {usePersisterStatus} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   usePersisterStatus();
 *   dispose();
 * });
 * ```
 * @category Persister primitives
 * @since v8.3.0
 */
export function usePersisterStatus(
  persisterOrPersisterId?: MaybeAccessor<PersisterOrPersisterId | undefined>,
): Accessor<Status>;

/**
 * The usePersisterStatusListener primitive registers a listener function with
 * the Persister that will be called when its status changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the usePersisterStatus primitive).
 *
 * Unlike the addStatusListener method, which returns a listener Id and requires
 * you to remove it manually, the usePersisterStatusListener primitive manages
 * this you to remove it manually, the useStatusListener primitive manages this
 * lifecycle for you: when the component unmounts, the listener on the
 * underlying Persister will be deleted.
 * @param listener The function that will be called whenever the status of the
 * Persister changes.
 * @param persisterOrPersisterId The Persister to be accessed: omit for the
 * default context Persister, provide an Id for a named context Persister, or
 * provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {usePersisterStatusListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   usePersisterStatusListener(() => undefined);
 *   dispose();
 * });
 * ```
 * @category Persister primitives
 * @since v8.3.0
 */
export function usePersisterStatusListener(
  listener: StatusListener,
  persisterOrPersisterId?: MaybeAccessor<PersisterOrPersisterId | undefined>,
): void;

/**
 * The useCreateSynchronizer primitive is used to create a Synchronizer within a
 * Solid application along with convenient memoization and callbacks.
 *
 * It is possible to create a Synchronizer outside of the Solid app with the
 * regular createSynchronizer function and pass it in, but you may prefer to
 * create it within the app, perhaps inside the top-level component. To prevent
 * a new Synchronizer being created every time the app renders or updates, the
 * useCreateSynchronizer primitive performs the creation in an effect.
 *
 * If your asynchronous `create` function reads changing signals or Accessors,
 * Solid will track those reads in the current owner.
 *
 * The `create` function can return undefined, meaning that you can enable or
 * disable synchronization conditionally within this primitive. This is useful
 * for applications which might turn on or off their cloud synchronization or
 * collaboration features.
 *
 * This primitive ensures the Synchronizer object is destroyed whenever a new
 * one is created or the component is unmounted.
 * @param store A reference to the MergeableStore for which to create a new
 * Synchronizer object.
 * @param create An asynchronous function for performing the creation steps of
 * the Synchronizer object for the Store.
 * @param destroy An optional callback whenever the Synchronizer is destroyed
 * when its create function observes different reactive input.
 * @returns A reference to the Synchronizer.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useCreateSynchronizer} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useCreateSynchronizer(undefined, async () => undefined);
 *   dispose();
 * });
 * ```
 * @category Synchronizer primitives
 * @since v8.3.0
 */
export function useCreateSynchronizer<
  SynchronizerOrUndefined extends Synchronizer | undefined,
>(
  store: MaybeAccessor<MergeableStore | undefined>,
  create: (store: MergeableStore) => Promise<SynchronizerOrUndefined>,
  destroy?: (synchronizer: Synchronizer) => void,
): Accessor<SynchronizerOrUndefined | undefined>;

/**
 * The useSynchronizerIds primitive is used to retrieve the Ids of all the named
 * Synchronizer objects present in the current Provider component context.
 * @returns A list of the Ids in the context.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSynchronizerIds} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSynchronizerIds();
 *   dispose();
 * });
 * ```
 * @category Synchronizer primitives
 * @since v8.3.0
 */
export function useSynchronizerIds(): Accessor<Ids>;

/**
 * The useSynchronizer primitive is used to get a reference to a Synchronizer
 * object from within a Provider component context.
 *
 * A Provider component is used to wrap part of an application in a context. It
 * can contain a default Synchronizer object (or a set of Synchronizer objects
 * named by Id) that can be easily accessed without having to be passed down as
 * props through every component.
 *
 * The useSynchronizer primitive lets you either get a reference to the default
 * Synchronizer object (when called without a parameter), or one of the
 * Synchronizer objects that are named by Id (when called with an Id parameter).
 * @param id An optional Id for accessing a Synchronizer object that was named
 * with an Id in the Provider.
 * @returns A reference to the Synchronizer object (or `undefined` if not within
 * a Provider context, or if the requested Synchronizer object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSynchronizer} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSynchronizer();
 *   dispose();
 * });
 * ```
 * @category Synchronizer primitives
 * @since v8.3.0
 */
export function useSynchronizer(
  id?: MaybeAccessor<Id | undefined>,
): Accessor<Synchronizer | undefined>;

/**
 * The useSynchronizerOrSynchronizerById primitive is used to get a reference to
 * a Synchronizer object from within a Provider component context, _or_ have it
 * passed directly to this primitive.
 *
 * This is mostly of use when you are developing a component that needs a
 * Synchronizer object and which might have been passed in explicitly to the
 * component or is to be picked up from the context by Id (a common pattern for
 * Synchronizer-based components).
 *
 * This is unlikely to be used often. For most situations, you will want to use
 * the useSynchronizer primitive.
 * @param synchronizerOrSynchronizerId Either an Id for accessing a Synchronizer
 * object that was named with an Id in the Provider, or the Synchronizer object
 * itself.
 * @returns A reference to the Synchronizer object (or `undefined` if not within
 * a Provider context, or if the requested Synchronizer object does not exist).
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSynchronizerOrSynchronizerById} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSynchronizerOrSynchronizerById();
 *   dispose();
 * });
 * ```
 * @category Synchronizer primitives
 * @since v8.3.0
 */
export function useSynchronizerOrSynchronizerById(
  synchronizerOrSynchronizerId?: MaybeAccessor<
    SynchronizerOrSynchronizerId | undefined
  >,
): Accessor<Synchronizer | undefined>;

/**
 * The useProvideSynchronizer primitive is used to add a Synchronizer object by
 * Id to a Provider component, but imperatively from a component within it.
 *
 * Normally you will register a Synchronizer object by Id in a context by using
 * the `synchronizersById` prop of the top-level Provider component. This
 * primitive, however, lets you dynamically add a new Synchronizer object to the
 * context, from within a component. This is useful for applications where the
 * set of Synchronizer objects is not known at the time of the first render of
 * the root Provider.
 *
 * A Synchronizer object added to the Provider context in this way will be
 * available to other components within the context (using the useSynchronizer
 * primitive and so on). If you use the same Id as an existing Synchronizer
 * object registration, the new one will take priority over one provided by the
 * `synchronizersById` prop.
 * @param synchronizerId The Id of the Synchronizer object to be registered with
 * the Provider.
 * @param synchronizer The Synchronizer object to be registered.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createMergeableStore} from 'tinybase';
 * import {createLocalSynchronizer} from 'tinybase/synchronizers/synchronizer-local';
 * import {useProvideSynchronizer} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createMergeableStore().setCell(
 *     'pets',
 *     'fido',
 *     'color',
 *     'brown',
 *   );
 *   const synchronizer = createLocalSynchronizer(store);
 *   useProvideSynchronizer('petSynchronizer', synchronizer);
 *   console.log(synchronizer.getStatus());
 *   // -> 0
 *   synchronizer.destroy();
 *   dispose();
 * });
 * ```
 * @category Synchronizer primitives
 * @since v8.3.0
 */
export function useProvideSynchronizer(
  synchronizerId: Id,
  synchronizer: Synchronizer,
): void;

/**
 * The useSynchronizerStatus primitive returns a the status of a Synchronizer,
 * and registers a listener so that any changes to it will cause an update.
 *
 * A Provider component is used to wrap part of an application in a context, and
 * it can contain a default Synchronizer or a set of Synchronizer objects named
 * by Id. The useSynchronizerStatus primitive lets you indicate which
 * Synchronizer to get data for: omit the optional parameter for the default
 * context Synchronizer, provide an Id for a named context Synchronizer, or
 * provide a Synchronizer explicitly by reference.
 *
 * When first rendered, this primitive will create a listener so that changes to
 * the Synchronizer status will cause an update. When the component containing
 * this primitive is unmounted, the listener will be automatically removed.
 * @param synchronizerOrSynchronizerId The Synchronizer to be accessed: omit for
 * the default context Synchronizer, provide an Id for a named context
 * Synchronizer, or provide an explicit reference.
 * @returns The status of the Synchronizer: 0 means idle, 1 means loading, and 2
 * means saving.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSynchronizerStatus} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSynchronizerStatus();
 *   dispose();
 * });
 * ```
 * @category Synchronizer primitives
 * @since v8.3.0
 */
export function useSynchronizerStatus(
  synchronizerOrSynchronizerId?: MaybeAccessor<
    SynchronizerOrSynchronizerId | undefined
  >,
): Accessor<Status>;

/**
 * The useSynchronizerStatusListener primitive registers a listener function
 * with the Synchronizer that will be called when its status changes.
 *
 * This primitive is useful for situations where a component needs to register
 * its own specific listener to do more than simply tracking the value (which is
 * more easily done with the useSynchronizerStatus primitive).
 *
 * Unlike the addStatusListener method, which returns a listener Id and requires
 * you to remove it manually, the useSynchronizerStatusListener primitive
 * manages this lifecycle for you: when the component unmounts, the listener on
 * the underlying Synchronizer will be deleted.
 * @param listener The function that will be called whenever the status of the
 * Synchronizer changes.
 * @param synchronizerOrSynchronizerId The Synchronizer to be accessed: omit for
 * the default context Synchronizer, provide an Id for a named context
 * Synchronizer, or provide an explicit reference.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {useSynchronizerStatusListener} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   useSynchronizerStatusListener(() => undefined);
 *   dispose();
 * });
 * ```
 * @category Synchronizer primitives
 * @since v8.3.0
 */
export function useSynchronizerStatusListener(
  listener: StatusListener,
  synchronizerOrSynchronizerId?: MaybeAccessor<
    SynchronizerOrSynchronizerId | undefined
  >,
): void;

/**
 * The ExtraProps type represents a set of arbitrary additional props.
 * @category Props
 * @since v8.3.0
 */
export type ExtraProps = {[propName: string]: any};

/**
 * TablesProps props are used for components that refer to all the Tables in a
 * Store, such as the TablesView component.
 * @category Props
 * @since v8.3.0
 */
export type TablesProps = {
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId;
  /**
 * A component for rendering each Table in the Store (to override the default
 * TableView component).
 * @category Props
 * @since v8.3.0
 */
  readonly tableComponent?: Component<TableProps>;
  /**
 * A custom function for generating extra props for each Table component based
 * on its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getTableComponentProps?: (tableId: Id) => ExtraProps;
  /**
 * A component or string to separate each Table component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Ids of each Table, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * TableProps props are used for components that refer to a single Table in a
 * Store, such as the TableView component.
 * @category Props
 * @since v8.3.0
 */
export type TableProps = {
  /**
 * The Id of the Table in the Store to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly tableId: Id;
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId;
  /**
 * A custom component for rendering each Row in the Table (to override the
 * default RowView component).
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps>;
  /**
 * A function for generating extra props for each custom Row component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * An optional list of Cell Ids to use for rendering a prescribed set of the
 * Table's Cells in a given order.
 * @category Props
 * @since v8.3.0
 */
  readonly customCellIds?: Ids;
  /**
 * A component or string to separate each Row component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Table, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * SortedTableProps props are used for components that refer to a single sorted
 * Table in a Store, such as the SortedTableView component.
 * @category Props
 * @since v8.3.0
 */
export type SortedTableProps = {
  /**
 * The Id of the Table in the Store to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly tableId: Id;
  /**
 * The Id of the Cell whose values are used for the sorting. If omitted, the
 * view will sort the Row Id itself.
 * @category Props
 * @since v8.3.0
 */
  readonly cellId?: Id;
  /**
 * Whether the sorting should be in descending order.
 * @category Props
 * @since v8.3.0
 */
  readonly descending?: boolean;
  /**
 * The number of Row Ids to skip for pagination purposes.
 * @category Props
 * @since v8.3.0
 */
  readonly offset?: number;
  /**
 * The maximum number of Row Ids to return.
 * @category Props
 * @since v8.3.0
 */
  readonly limit?: number;
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId;
  /**
 * A custom component for rendering each Row in the Table (to override the
 * default RowView component).
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps>;
  /**
 * A function for generating extra props for each custom Row component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * An optional list of Cell Ids to use for rendering a prescribed set of the
 * sorted Table's Cells in a given order.
 * @category Props
 * @since v8.3.0
 */
  readonly customCellIds?: Ids;
  /**
 * A component or string to separate each Row component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Table, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * RowProps props are used for components that refer to a single Row in a Table,
 * such as the RowView component.
 * @category Props
 * @since v8.3.0
 */
export type RowProps = {
  /**
 * The Id of the Table in the Store.
 * @category Props
 * @since v8.3.0
 */
  readonly tableId: Id;
  /**
 * The Id of the Row in the Table to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly rowId: Id;
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId;
  /**
 * A custom component for rendering each Cell in the Row (to override the
 * default CellView component).
 * @category Props
 * @since v8.3.0
 */
  readonly cellComponent?: Component<CellProps>;
  /**
 * A function for generating extra props for each custom Cell component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getCellComponentProps?: (cellId: Id) => ExtraProps;
  /**
 * An optional list of Cell Ids to use for rendering a prescribed set of the
 * Row's Cells in a given order.
 * @category Props
 * @since v8.3.0
 */
  readonly customCellIds?: Ids;
  /**
 * A component or string to separate each Cell component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Row, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * CellProps props are used for components that refer to a single Cell in a Row,
 * such as the CellView component.
 * @category Props
 * @since v8.3.0
 */
export type CellProps = {
  /**
 * The Id of the Table in the Store.
 * @category Props
 * @since v8.3.0
 */
  readonly tableId: Id;
  /**
 * The Id of the Row in the Table.
 * @category Props
 * @since v8.3.0
 */
  readonly rowId: Id;
  /**
 * The Id of the Cell in the Row to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly cellId: Id;
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId;
  /**
 * Whether the component should also render the Id of the Cell to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ValuesProps props are used for components that refer to all the Values in a
 * Store, such as the ValuesView component.
 * @category Props
 * @since v8.3.0
 */
export type ValuesProps = {
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId;
  /**
 * A custom component for rendering each Value in the Store (to override the
 * default ValueView component).
 * @category Props
 * @since v8.3.0
 */
  readonly valueComponent?: Component<ValueProps>;
  /**
 * A function for generating extra props for each custom Value component based
 * on its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getValueComponentProps?: (valueId: Id) => ExtraProps;
  /**
 * A component or string to separate each Value component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Ids of each Value to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ValueProps props are used for components that refer to a single Value in a
 * Row, such as the ValueView component.
 * @category Props
 * @since v8.3.0
 */
export type ValueProps = {
  /**
 * The Id of the Value in the Row to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly valueId: Id;
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId;
  /**
 * Whether the component should also render the Id of the Value to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * MetricProps props are used for components that refer to a single Metric in a
 * Metrics object, such as the MetricView component.
 * @category Props
 * @since v8.3.0
 */
export type MetricProps = {
  /**
 * The Id of the Metric in the Metrics object to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly metricId: Id;
  /**
 * The Metrics object to be accessed: omit for the default context Metrics
 * object, provide an Id for a named context Metrics object, or provide an
 * explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly metrics?: MetricsOrMetricsId;
  /**
 * Whether the component should also render the Id of the Metric to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * IndexProps props are used for components that refer to a single Index in an
 * Indexes object, such as the IndexView component.
 * @category Props
 * @since v8.3.0
 */
export type IndexProps = {
  /**
 * The Id of the Index in the Indexes object to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly indexId: Id;
  /**
 * The Indexes object to be accessed: omit for the default context Indexes
 * object, provide an Id for a named context Indexes object, or provide an
 * explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly indexes?: IndexesOrIndexesId;
  /**
 * A component for rendering each Slice in the Index.
 * @category Props
 * @since v8.3.0
 */
  readonly sliceComponent?: Component<SliceProps>;
  /**
 * A function for generating extra props for each Slice component based on its
 * Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getSliceComponentProps?: (sliceId: Id) => ExtraProps;
  /**
 * A component or string to separate each Slice component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Index, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * SliceProps props are used for components that refer to a single Slice in an
 * Index object, such as the SliceView component.
 * @category Props
 * @since v8.3.0
 */
export type SliceProps = {
  /**
 * The Id of the Index in the Indexes object.
 * @category Props
 * @since v8.3.0
 */
  readonly indexId: Id;
  /**
 * The Id of the Slice in the Index to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly sliceId: Id;
  /**
 * The Indexes object to be accessed: omit for the default context Indexes
 * object, provide an Id for a named context Indexes object, or provide an
 * explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly indexes?: IndexesOrIndexesId;
  /**
 * A component for rendering each Row in the Index.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps>;
  /**
 * A function for generating extra props for each Row component based on its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * A component or string to separate each Row component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Slice, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * RemoteRowProps props are used for components that refer to a single
 * Relationship in a Relationships object, and where you want to render a remote
 * Row based on a local Row, such as in the RemoteRowView component.
 * @category Props
 * @since v8.3.0
 */
export type RemoteRowProps = {
  /**
 * The Id of the Relationship in the Relationships object.
 * @category Props
 * @since v8.3.0
 */
  readonly relationshipId: Id;
  /**
 * The Id of the local Row for which to render the remote Row.
 * @category Props
 * @since v8.3.0
 */
  readonly localRowId: Id;
  /**
 * The Relationships object to be accessed: omit for the default context
 * Relationships object, provide an Id for a named context Relationships object,
 * or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly relationships?: RelationshipsOrRelationshipsId;
  /**
 * A component for rendering each (remote, local, or linked) Row in the
 * Relationship.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps>;
  /**
 * A function for generating extra props for each Row component based on its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * Whether the component should also render the Id of the Row in the
 * Relationship, and its descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * LocalRowsProps props are used for components that refer to a single
 * Relationship in a Relationships object, and where you want to render local
 * Rows based on a remote Row, such as the LocalRowsView component.
 * @category Props
 * @since v8.3.0
 */
export type LocalRowsProps = {
  /**
 * The Id of the Relationship in the Relationships object.
 * @category Props
 * @since v8.3.0
 */
  readonly relationshipId: Id;
  /**
 * The Id of the remote Row for which to render the local Rows.
 * @category Props
 * @since v8.3.0
 */
  readonly remoteRowId: Id;
  /**
 * The Relationships object to be accessed: omit for the default context
 * Relationships object, provide an Id for a named context Relationships object,
 * or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly relationships?: RelationshipsOrRelationshipsId;
  /**
 * A component for rendering each (remote, local, or linked) Row in the
 * Relationship.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps>;
  /**
 * A function for generating extra props for each Row component based on its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * A component or string to separate each Row component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Row in the
 * Relationship, and its descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * LinkedRowsProps props are used for components that refer to a single
 * Relationship in a Relationships object, and where you want to render a linked
 * list of Rows starting from a first Row, such as the LinkedRowsView component.
 * @category Props
 * @since v8.3.0
 */
export type LinkedRowsProps = {
  /**
 * The Id of the Relationship in the Relationships object.
 * @category Props
 * @since v8.3.0
 */
  readonly relationshipId: Id;
  /**
 * The Id of the first Row in the linked list Relationship.
 * @category Props
 * @since v8.3.0
 */
  readonly firstRowId: Id;
  /**
 * The Relationships object to be accessed: omit for the default context
 * Relationships object, provide an Id for a named context Relationships object,
 * or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly relationships?: RelationshipsOrRelationshipsId;
  /**
 * A component for rendering each (remote, local, or linked) Row in the
 * Relationship.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps>;
  /**
 * A function for generating extra props for each Row component based on its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * A component or string to separate each Row component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Row in the
 * Relationship, and its descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ResultTableProps props are used for components that refer to a single query
 * ResultTable, such as the ResultTableView component.
 * @category Props
 * @since v8.3.0
 */
export type ResultTableProps = {
  /**
 * The Id of the query in the Queries object for which the ResultTable will be
 * rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly queryId: Id;
  /**
 * The Queries object to be accessed: omit for the default context Queries
 * object, provide an Id for a named context Queries object, or provide an
 * explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly queries?: QueriesOrQueriesId;
  /**
 * A custom component for rendering each Row in the Table (to override the
 * default ResultRowView component).
 * @category Props
 * @since v8.3.0
 */
  readonly resultRowComponent?: Component<ResultRowProps>;
  /**
 * A function for generating extra props for each custom Row component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getResultRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * A component or string to separate each Row component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the query, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ResultSortedTableProps props are used for components that refer to a single
 * sorted query ResultTable, such as the ResultSortedTableView component.
 * @category Props
 * @since v8.3.0
 */
export type ResultSortedTableProps = {
  /**
 * The Id of the query in the Queries object for which the sorted ResultTable
 * will be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly queryId: Id;
  /**
 * The Id of the Cell whose values are used for the sorting. If omitted, the
 * view will sort the Row Id itself.
 * @category Props
 * @since v8.3.0
 */
  readonly cellId?: Id;
  /**
 * Whether the sorting should be in descending order.
 * @category Props
 * @since v8.3.0
 */
  readonly descending?: boolean;
  /**
 * The number of Row Ids to skip for pagination purposes.
 * @category Props
 * @since v8.3.0
 */
  readonly offset?: number;
  /**
 * The maximum number of Row Ids to return.
 * @category Props
 * @since v8.3.0
 */
  readonly limit?: number;
  /**
 * The Queries object to be accessed: omit for the default context Queries
 * object, provide an Id for a named context Queries object, or provide an
 * explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly queries?: QueriesOrQueriesId;
  /**
 * A custom component for rendering each Row in the Table (to override the
 * default ResultRowView component).
 * @category Props
 * @since v8.3.0
 */
  readonly resultRowComponent?: Component<ResultRowProps>;
  /**
 * A function for generating extra props for each custom Row component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getResultRowComponentProps?: (rowId: Id) => ExtraProps;
  /**
 * A component or string to separate each Row component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the query, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ResultRowProps props are used for components that refer to a single Row in a
 * query ResultTable, such as the ResultRowView component.
 * @category Props
 * @since v8.3.0
 */
export type ResultRowProps = {
  /**
 * The Id of the query in the Queries object for which the ResultTable will be
 * rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly queryId: Id;
  /**
 * The Id of the Row in the ResultTable to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly rowId: Id;
  /**
 * The Queries object to be accessed: omit for the default context Queries
 * object, provide an Id for a named context Queries object, or provide an
 * explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly queries?: QueriesOrQueriesId;
  /**
 * A custom component for rendering each Cell in the Row (to override the
 * default CellView component).
 * @category Props
 * @since v8.3.0
 */
  readonly resultCellComponent?: Component<ResultCellProps>;
  /**
 * A function for generating extra props for each custom Cell component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getResultCellComponentProps?: (cellId: Id) => ExtraProps;
  /**
 * A component or string to separate each Cell component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Id of the Row, and its
 * descendent objects, to assist with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ResultRowProps props are used for components that refer to a single Cell in a
 * Row of a ResultTable, such as the ResultCellView component.
 * @category Props
 * @since v8.3.0
 */
export type ResultCellProps = {
  /**
 * The Id of the query in the Queries object for which the ResultTable will be
 * rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly queryId: Id;
  /**
 * The Id of the Row in the Table.
 * @category Props
 * @since v8.3.0
 */
  readonly rowId: Id;
  /**
 * The Id of the Cell in the Row to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly cellId: Id;
  /**
 * The Queries object to be accessed: omit for the default context Queries
 * object, provide an Id for a named context Queries object, or provide an
 * explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly queries?: QueriesOrQueriesId;
  /**
 * Whether the component should also render the Id of the Cell to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * CheckpointProps props are used for components that refer to a single
 * checkpoint in a Checkpoints object, such as the CheckpointView component.
 * @category Props
 * @since v8.3.0
 */
export type CheckpointProps = {
  /**
 * The Id of the checkpoint in the Checkpoints object.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointId: Id;
  /**
 * The Checkpoints object to be accessed: omit for the default context
 * Checkpoints object, provide an Id for a named context Checkpoints object, or
 * provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: CheckpointsOrCheckpointsId;
  /**
 * Whether the component should also render the Id of the checkpoint to assist
 * with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * BackwardCheckpointsProps props are used for components that refer to a list
 * of previous checkpoints in a Checkpoints object, such as the
 * BackwardCheckpointsView component.
 * @category Props
 * @since v8.3.0
 */
export type BackwardCheckpointsProps = {
  /**
 * The Checkpoints object to be accessed: omit for the default context
 * Checkpoints object, provide an Id for a named context Checkpoints object, or
 * provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: CheckpointsOrCheckpointsId;
  /**
 * A component for rendering each checkpoint in the Checkpoints object.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointComponent?: Component<CheckpointProps>;
  /**
 * A function for generating extra props for each checkpoint component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getCheckpointComponentProps?: (checkpointId: Id) => ExtraProps;
  /**
 * A component or string to separate each Checkpoint component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Ids of the checkpoints to assist
 * with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * CurrentCheckpointsProps props are used for components that refer to the
 * current checkpoints in a Checkpoints object, such as the
 * BackwardCheckpointsView component.
 * @category Props
 * @since v8.3.0
 */
export type CurrentCheckpointProps = {
  /**
 * The Checkpoints object to be accessed: omit for the default context
 * Checkpoints object, provide an Id for a named context Checkpoints object, or
 * provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: CheckpointsOrCheckpointsId;
  /**
 * A component for rendering each checkpoint in the Checkpoints object.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointComponent?: Component<CheckpointProps>;
  /**
 * A function for generating extra props for each checkpoint component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getCheckpointComponentProps?: (checkpointId: Id) => ExtraProps;
  /**
 * Whether the component should also render the Ids of the checkpoints to assist
 * with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ForwardCheckpointsProps props are used for components that refer to a list of
 * future checkpoints in a Checkpoints object, such as the
 * ForwardCheckpointsView component.
 * @category Props
 * @since v8.3.0
 */
export type ForwardCheckpointsProps = {
  /**
 * The Checkpoints object to be accessed: omit for the default context
 * Checkpoints object, provide an Id for a named context Checkpoints object, or
 * provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: CheckpointsOrCheckpointsId;
  /**
 * A component for rendering each checkpoint in the Checkpoints object.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointComponent?: Component<CheckpointProps>;
  /**
 * A function for generating extra props for each checkpoint component based on
 * its Id.
 * @category Props
 * @since v8.3.0
 */
  readonly getCheckpointComponentProps?: (checkpointId: Id) => ExtraProps;
  /**
 * A component or string to separate each Checkpoint component.
 * @category Props
 * @since v8.3.0
 */
  readonly separator?: JSXElement | string;
  /**
 * Whether the component should also render the Ids of the checkpoints to assist
 * with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

/**
 * ProviderProps props are used with the Provider component, so that Store
 * Metrics, Indexes, Relationships, Queries, and Checkpoints objects can be
 * passed into the context of an application and used throughout.
 *
 * One of each type of object can be provided as a default within the context.
 * Additionally, multiple of each type of object can be provided in an Id-keyed
 * map to the `___ById` props.
 * @category Props
 * @since v8.3.0
 */
export type ProviderProps = {
  /**
 * A default single Store object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: Store;
  /**
 * An object containing multiple Store objects that will be available within the
 * Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly storesById?: {[storeId: Id]: Store};
  /**
 * A default single Metrics object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly metrics?: Metrics;
  /**
 * An object containing multiple Metrics objects that will be available within
 * the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly metricsById?: {[metricsId: Id]: Metrics};
  /**
 * A default single Indexes object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly indexes?: Indexes;
  /**
 * An object containing multiple Indexes objects that will be available within
 * the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly indexesById?: {[indexesId: Id]: Indexes};
  /**
 * A default single Relationships object that will be available within the
 * Provider context.
 * @category Props
 * @since v8.3.0
 */
  readonly relationships?: Relationships;
  /**
 * An object containing multiple Relationships objects that will be available
 * within the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly relationshipsById?: {[relationshipsId: Id]: Relationships};
  /**
 * A default single Queries object that will be available within the Provider
 * context, since v2.0.
 * @category Props
 * @since v8.3.0
 */
  readonly queries?: Queries;
  /**
 * An object containing multiple Queries objects that will be available within
 * the Provider context by their Id, since v2.0.
 * @category Props
 * @since v8.3.0
 */
  readonly queriesById?: {[queriesId: Id]: Queries};
  /**
 * A default single Checkpoints object that will be available within the
 * Provider context.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: Checkpoints;
  /**
 * An object containing multiple Checkpoints objects that will be available
 * within the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointsById?: {[checkpointsId: Id]: Checkpoints};
  /**
 * A default single Persister object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly persister?: AnyPersister;
  /**
 * An object containing multiple Persister objects that will be available within
 * the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly persistersById?: {
    [persisterId: Id]: AnyPersister;
  };
  /**
 * A default single Synchronizer object that will be available within the
 * Provider context.
 * @category Props
 * @since v8.3.0
 */
  readonly synchronizer?: Synchronizer;
  /**
 * An object containing multiple Synchronizer objects that will be available
 * within the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly synchronizersById?: {[synchronizerId: Id]: Synchronizer};
};

/**
 * ComponentReturnType is a simple alias for what a Solid component can return:
 * either a SolidElement, or `null` for an empty component.
 * @category Component
 * @since v8.3.0
 */
export type ComponentReturnType = JSXElement;

/**
 * The Provider component is used to wrap part of an application in a context
 * that provides default objects to be used by primitives and components within.
 *
 * Store, Metrics, Indexes, Relationships, Queries, Checkpoints, Persister, and
 * Synchronizer objects can be passed into the context of an application and
 * used throughout. One of each type of object can be provided as a default
 * within the context. Additionally, multiple of each type of object can be
 * provided in an Id-keyed map to the `___ById` props.
 *
 * Provider contexts can be nested and the objects passed in will be merged. For
 * example, if an outer context contains a default Metrics object and an inner
 * context contains only a default Store, both the Metrics objects and the Store
 * will be visible within the inner context. If the outer context contains a
 * Store named by Id and the inner context contains a Store named by a different
 * Id, both will be visible within the inner context.
 * @param props The props for this component.
 * @returns A rendering of the child components.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {Provider} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   const provider = Provider({store, children: 'content'});
 *   console.log(typeof provider);
 *   // -> 'function'
 *   dispose();
 * });
 * ```
 * @category Context components
 * @essential Using Solid
 * @since v8.3.0
 */
export function Provider(
  props: ProviderProps & {children: JSXElement},
): ComponentReturnType;

/**
 * The CellView component renders the value of a single Cell in a given Row, in
 * a given Table, and registers a listener so that any changes to that result
 * will cause an update.
 *
 * The component's props identify which Cell to render based on Table Id, Row
 * Id, Cell Id, and Store (which is either the default context Store, a named
 * context Store, or an explicit reference).
 *
 * A Cell contains a string, number, or boolean, so the value is rendered
 * directly without further decoration. You can create your own CellView-like
 * component to customize the way that a Cell is rendered: see the RowView
 * component for more details.
 *
 * This component uses the useCell primitive under the covers, which means that
 * any changes to the specified Cell will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Cell, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {CellView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   CellView({tableId: 'pets', rowId: 'fido', cellId: 'color', store});
 *   dispose();
 * });
 * ```
 * @category Store components
 * @since v8.3.0
 */
export function CellView(props: CellProps): ComponentReturnType;

/**
 * The RowView component renders the contents of a single Row in a given Table,
 * and registers a listener so that any changes to that result will cause a
 * update.
 *
 * The component's props identify which Row to render based on Table Id, Row Id,
 * and Store (which is either the default context Store, a named context Store,
 * or an explicit reference).
 *
 * This component renders a Row by iterating over its Cell values. By default
 * these are in turn rendered with the CellView component, but you can override
 * this behavior by providing a `cellComponent` prop, a custom component of your
 * own that will render a Cell based on CellProps. You can also pass additional
 * props to your custom component with the `getCellComponentProps` callback
 * prop.
 *
 * You can create your own RowView-like component to customize the way that a
 * Row is rendered: see the TableView component for more details.
 *
 * Since v4.1.0, you can use the `customCellIds` prop if you want to render a
 * prescribed set of the Row's Cells in a given order. Otherwise, this component
 * uses the useCellIds primitive under the covers, which means that any changes
 * to the structure of the Row will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Row, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {RowView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   RowView({tableId: 'pets', rowId: 'fido', store});
 *   dispose();
 * });
 * ```
 * @category Store components
 * @since v8.3.0
 */
export function RowView(props: RowProps): ComponentReturnType;

/**
 * The SortedTableView component renders the contents of a single sorted Table
 * in a Store, and registers a listener so that any changes to that result will
 * cause an update.
 *
 * The component's props identify which Table to render based on Table Id, and
 * Store (which is either the default context Store, a named context Store, or
 * by explicit reference). It also takes a Cell Id to sort by and a boolean to
 * indicate that the sorting should be in descending order. The `offset` and
 * `limit` props are used to paginate results, but default to `0` and
 * `undefined` to return all available Row Ids if not specified.
 *
 * This component renders a Table by iterating over its Row objects, in the
 * order dictated by the sort parameters. By default these are in turn rendered
 * with the RowView component, but you can override this behavior by providing a
 * `rowComponent` prop, a custom component of your own that will render a Row
 * based on RowProps. You can also pass additional props to your custom
 * component with the `getRowComponentProps` callback prop.
 *
 * This component uses the useSortedRowIds primitive under the covers, which
 * means that any changes to the structure or sorting of the Table will cause a
 * update.
 *
 * Since v4.1.0, you can use the `customCellIds` prop if you want to render a
 * prescribed set of the Table's Cells in a given order for each Row.
 * @param props The props for this component.
 * @returns A rendering of the Table, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {SortedTableView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   SortedTableView({tableId: 'pets', cellId: 'species', store});
 *   dispose();
 * });
 * ```
 * @category Store components
 * @since v8.3.0
 */
export function SortedTableView(props: SortedTableProps): ComponentReturnType;

/**
 * The TableView component renders the contents of a single Table in a Store,
 * and registers a listener so that any changes to that result will cause a
 * update.
 *
 * The component's props identify which Table to render based on Table Id, and
 * Store (which is either the default context Store, a named context Store, or
 * by explicit reference).
 *
 * This component renders a Table by iterating over its Row objects. By default
 * these are in turn rendered with the RowView component, but you can override
 * this behavior by providing a `rowComponent` prop, a custom component of your
 * own that will render a Row based on RowProps. You can also pass additional
 * props to your custom component with the `getRowComponentProps` callback prop.
 *
 * You can create your own TableView-like component to customize the way that a
 * Table is rendered: see the TablesView component for more details.
 *
 * This component uses the useRowIds primitive under the covers, which means
 * that any changes to the structure of the Table will cause an update.
 *
 * Since v4.1.0, you can use the `customCellIds` prop if you want to render a
 * prescribed set of the Table's Cells in a given order for each Row.
 * @param props The props for this component.
 * @returns A rendering of the Table, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {TableView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   TableView({tableId: 'pets', store});
 *   dispose();
 * });
 * ```
 * @category Store components
 * @since v8.3.0
 */
export function TableView(props: TableProps): ComponentReturnType;

/**
 * The TablesView component renders the tabular contents of a Store, and
 * registers a listener so that any changes to that result will cause an update.
 *
 * The component's props can identify which Store to render - either the default
 * context Store, a named context Store, or an explicit reference.
 *
 * This component renders a Store by iterating over its Table objects. By
 * default these are in turn rendered with the TableView component, but you can
 * override this behavior by providing a `tableComponent` prop, a custom
 * component of your own that will render a Table based on TableProps. You can
 * also pass additional props to your custom component with the
 * `getTableComponentProps` callback prop.
 *
 * This component uses the useTableIds primitive under the covers, which means
 * that any changes to the structure of the Store will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Store, or nothing, if not present.
 * @example
 * ```js
 * import {createRoot} from 'solid-js';
 * import {createStore} from 'tinybase';
 * import {TablesView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 *   const view = TablesView({store, debugIds: true});
 *   console.log(typeof view);
 *   // -> 'function'
 *   dispose();
 * });
 * ```
 * @category Store components
 * @since v8.3.0
 */
export function TablesView(props: TablesProps): ComponentReturnType;

/**
 * The ValueView component renders the value of a single Value, and registers a
 * listener so that any changes to that result will cause an update.
 *
 * The component's props identify which Value to render based on Value Id and
 * Store (which is either the default context Store, a named context Store, or
 * an explicit reference).
 *
 * A Value contains a string, number, or boolean, so the value is rendered
 * directly without further decoration. You can create your own ValueView-like
 * component to customize the way that a Value is rendered: see the ValuesView
 * component for more details.
 *
 * This component uses the useValue primitive under the covers, which means that
 * any changes to the specified Value will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Value, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {ValueView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   ValueView({valueId: 'open', store});
 *   dispose();
 * });
 * ```
 * @category Store components
 * @since v8.3.0
 */
export function ValueView(props: ValueProps): ComponentReturnType;

/**
 * The ValuesView component renders the keyed value contents of a Store, and
 * registers a listener so that any changes to that result will cause an update.
 *
 * The component's props can identify which Store to render - either the default
 * context Store, a named context Store, or an explicit reference.
 *
 * This component renders a Store by iterating over its Value objects. By
 * default these are in turn rendered with the ValueView component, but you can
 * override this behavior by providing a `valueComponent` prop, a custom
 * component of your own that will render a Value based on ValueProps. You can
 * also pass additional props to your custom component with the
 * `getValueComponentProps` callback prop.
 *
 * This component uses the useValueIds primitive under the covers, which means
 * that any changes to the Values in the Store will cause an update.
 *
 * This component uses the useValueIds primitive under the covers, which means
 * that any changes to the Store's Values will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Values, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {ValuesView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   ValuesView({store});
 *   dispose();
 * });
 * ```
 * @category Store components
 * @since v8.3.0
 */
export function ValuesView(props: ValuesProps): ComponentReturnType;

/**
 * The MetricView component renders the current value of a Metric, and registers
 * a listener so that any changes to that result will cause an update.
 *
 * The component's props can identify which Metrics object to get data for: omit
 * the optional final parameter for the default context Metrics object, provide
 * an Id for a named context Metrics object, or by explicit reference.
 *
 * This component uses the useMetric primitive under the covers, which means
 * that any changes to the Metric will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Metric, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {MetricView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   MetricView({metricId: 'highestPrice', metrics});
 *   dispose();
 * });
 * ```
 * @category Metrics components
 * @since v8.3.0
 */
export function MetricView(props: MetricProps): ComponentReturnType;

/**
 * The SliceView component renders the contents of a Slice, and registers a
 * listener so that any changes to that result will cause an update.
 *
 * The component's props identify which Slice to render based on Index Id, Slice
 * Id, and Indexes object (which is either the default context Indexes object, a
 * named context Indexes object, or an explicit reference).
 *
 * This component renders a Slice by iterating over its Row objects. By default
 * these are in turn rendered with the RowView component, but you can override
 * this behavior by providing a `rowComponent` prop, a custom component of your
 * own that will render a Row based on RowProps. You can also pass additional
 * props to your custom component with the `getRowComponentProps` callback prop.
 *
 * This component uses the useSliceRowIds primitive under the covers, which
 * means that any changes to the structure of the Slice will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Slice, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {SliceView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   SliceView({indexId: 'bySpecies', sliceId: 'dog', indexes});
 *   dispose();
 * });
 * ```
 * @category Indexes components
 * @since v8.3.0
 */
export function SliceView(props: SliceProps): ComponentReturnType;

/**
 * The IndexView component renders the contents of a Index, and registers a
 * listener so that any changes to that result will cause an update.
 *
 * The component's props identify which Index to render based on Index Id, and
 * Indexes object (which is either the default context Indexes object, a named
 * context Indexes object, or an explicit reference).
 *
 * This component renders a Index by iterating over its Slice objects. By
 * default these are in turn rendered with the SliceView component, but you can
 * override this behavior by providing a `sliceComponent` prop, a custom
 * component of your own that will render a Slice based on SliceProps. You can
 * also pass additional props to your custom component with the
 * `getSliceComponentProps` callback prop.
 *
 * This component uses the useSliceIds primitive under the covers, which means
 * that any changes to the structure of the Index will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the Index, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {IndexView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   IndexView({indexId: 'bySpecies', indexes});
 *   dispose();
 * });
 * ```
 * @category Indexes components
 * @since v8.3.0
 */
export function IndexView(props: IndexProps): ComponentReturnType;

/**
 * The RemoteRowView component renders the remote Row Id for a given local Row
 * in a Relationship, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * The component's props identify which remote Row to render based on
 * Relationship Id, local Row Id, and Relationships object (which is either the
 * default context Relationships object, a named context Relationships object,
 * or an explicit reference).
 *
 * By default the remote Row is rendered with the RowView component, but you can
 * override this behavior by providing a `rowComponent` prop, a custom component
 * of your own that will render the Row based on RowProps. You can also pass
 * additional props to your custom component with the `getRowComponentProps`
 * callback prop.
 *
 * This component uses the useRemoteRowId primitive under the covers, which
 * means that any changes to the remote Row Id in the Relationship will cause a
 * update.
 * @param props The props for this component.
 * @returns A rendering of the remote Row, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {RemoteRowView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   RemoteRowView({
 *     relationshipId: 'petSpecies',
 *     localRowId: 'fido',
 *     relationships,
 *   });
 *   dispose();
 * });
 * ```
 * @category Relationships components
 * @since v8.3.0
 */
export function RemoteRowView(props: RemoteRowProps): ComponentReturnType;

/**
 * The LocalRowsView component renders the local Row objects for a given remote
 * Row in a Relationship, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * The component's props identify which local Rows to render based on
 * Relationship Id, remote Row Id, and Relationships object (which is either the
 * default context Relationships object, a named context Relationships object,
 * or an explicit reference).
 *
 * By default the local Rows are rendered with the RowView component, but you
 * can override this behavior by providing a `rowComponent` prop, a custom
 * component of your own that will render the Row based on RowProps. You can
 * also pass additional props to your custom component with the
 * `getRowComponentProps` callback prop.
 *
 * This component uses the useLocalRowIds primitive under the covers, which
 * means that any changes to the local Row Ids in the Relationship will cause a
 * update.
 * @param props The props for this component.
 * @returns A rendering of the local Row objects, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {LocalRowsView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   LocalRowsView({
 *     relationshipId: 'petSpecies',
 *     remoteRowId: 'dog',
 *     relationships,
 *   });
 *   dispose();
 * });
 * ```
 * @category Relationships components
 * @since v8.3.0
 */
export function LocalRowsView(props: LocalRowsProps): ComponentReturnType;

/**
 * The LinkedRowsView component renders the local Row objects for a given remote
 * Row in a Relationship, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * The component's props identify which local Rows to render based on
 * Relationship Id, remote Row Id, and Relationships object (which is either the
 * default context Relationships object, a named context Relationships object,
 * or an explicit reference).
 *
 * By default the local Rows are rendered with the RowView component, but you
 * can override this behavior by providing a `rowComponent` prop, a custom
 * component of your own that will render the Row based on RowProps. You can
 * also pass additional props to your custom component with the
 * `getRowComponentProps` callback prop.
 *
 * This component uses the useLocalRowIds primitive under the covers, which
 * means that any changes to the local Row Ids in the Relationship will cause a
 * update.
 * @param props The props for this component.
 * @returns A rendering of the local Row objects, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {LinkedRowsView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   LinkedRowsView({
 *     relationshipId: 'nextPet',
 *     firstRowId: 'fido',
 *     relationships,
 *   });
 *   dispose();
 * });
 * ```
 * @category Relationships components
 * @since v8.3.0
 */
export function LinkedRowsView(props: LinkedRowsProps): ComponentReturnType;

/**
 * The ResultCellView component renders the value of a single Cell in a given
 * Row, in a given query's ResultTable, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * The component's props identify which Cell to render based on query Id, Row
 * Id, Cell Id, and Queries object (which is either the default context Queries
 * object, a named context Queries object, or an explicit reference).
 *
 * A Cell contains a string, number, or boolean, so the value is rendered
 * directly without further decoration. You can create your own
 * ResultCellView-like component to customize the way that a Cell is rendered:
 * see the ResultRowView component for more details.
 *
 * This component uses the useResultCell primitive under the covers, which means
 * that any changes to the specified Cell will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the result Cell, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {ResultCellView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   ResultCellView({
 *     queryId: 'petColors',
 *     rowId: 'fido',
 *     cellId: 'color',
 *     queries,
 *   });
 *   dispose();
 * });
 * ```
 * @category Queries components
 * @since v8.3.0
 */
export function ResultCellView(props: ResultCellProps): ComponentReturnType;

/**
 * The ResultRowView component renders the contents of a single Row in a given
 * query's ResultTable, and registers a listener so that any changes to that
 * result will cause an update.
 *
 * The component's props identify which Row to render based on query Id, Row Id,
 * and Queries object (which is either the default context Queries object, a
 * named context Queries object, or an explicit reference).
 *
 * This component renders a Row by iterating over its Cell values. By default
 * these are in turn rendered with the ResultCellView component, but you can
 * override this behavior by providing a `resultCellComponent` prop, a custom
 * component of your own that will render a Cell based on ResultCellProps. You
 * can also pass additional props to your custom component with the
 * `getResultCellComponentProps` callback prop.
 *
 * You can create your own ResultRowView-like component to customize the way
 * that a result Row is rendered: see the ResultTableView component for more
 * details.
 *
 * This component uses the useResultCellIds primitive under the covers, which
 * means that any changes to the structure of the result Row will cause an
 * update.
 * @param props The props for this component.
 * @returns A rendering of the result Row, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {ResultRowView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   ResultRowView({queryId: 'petColors', rowId: 'fido', queries});
 *   dispose();
 * });
 * ```
 * @category Queries components
 * @since v8.3.0
 */
export function ResultRowView(props: ResultRowProps): ComponentReturnType;

/**
 * The ResultSortedTableView component renders the contents of a single query's
 * sorted ResultTable in a Queries object, and registers a listener so that any
 * changes to that result will cause an update.
 *
 * The component's props identify which ResultTable to render based on query Id,
 * and Queries object (which is either the default context Queries object, a
 * named context Queries object, or by explicit reference). It also takes a Cell
 * Id to sort by and a boolean to indicate that the sorting should be in
 * descending order. The `offset` and `limit` props are used to paginate
 * results, but default to `0` and `undefined` to return all available Row Ids
 * if not specified.
 *
 * This component renders a ResultTable by iterating over its Row objects, in
 * the order dictated by the sort parameters. By default these are in turn
 * rendered with the ResultRowView component, but you can override this behavior
 * by providing a `resultRowComponent` prop, a custom component of your own that
 * will render a Row based on ResultRowProps. You can also pass additional props
 * to your custom component with the `getResultRowComponentProps` callback prop.
 *
 * This component uses the useResultSortedRowIds primitive under the covers,
 * which means that any changes to the structure or sorting of the ResultTable
 * will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the ResultTable, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {ResultSortedTableView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   ResultSortedTableView({queryId: 'petColors', cellId: 'color', queries});
 *   dispose();
 * });
 * ```
 * @category Queries components
 * @since v8.3.0
 */
export function ResultSortedTableView(
  props: ResultSortedTableProps,
): ComponentReturnType;

/**
 * The ResultTableView component renders the contents of a single query's
 * ResultTable in a Queries object, and registers a listener so that any changes
 * to that result will cause an update.
 *
 * The component's props identify which ResultTable to render based on query Id,
 * and Queries object (which is either the default context Queries object, a
 * named context Queries object, or by explicit reference).
 *
 * This component renders a ResultTable by iterating over its Row objects. By
 * default these are in turn rendered with the ResultRowView component, but you
 * can override this behavior by providing a `resultRowComponent` prop, a custom
 * component of your own that will render a Row based on ResultRowProps. You can
 * also pass additional props to your custom component with the
 * `getResultRowComponentProps` callback prop.
 *
 * This component uses the useResultRowIds primitive under the covers, which
 * means that any changes to the structure of the ResultTable will cause an
 * update.
 * @param props The props for this component.
 * @returns A rendering of the ResultTable, or nothing, if not present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {ResultTableView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   ResultTableView({queryId: 'petColors', queries});
 *   dispose();
 * });
 * ```
 * @category Queries components
 * @since v8.3.0
 */
export function ResultTableView(props: ResultTableProps): ComponentReturnType;

/**
 * The CheckpointView component simply renders the label of a checkpoint.
 *
 * The component's props identify which checkpoint to render based on Checkpoint
 * Id and Checkpoints object (which is either the default context Checkpoints
 * object, a named context Checkpoints object, or an explicit reference).
 *
 * The primary purpose of this component is to render multiple checkpoints in a
 * BackwardCheckpointsView component or ForwardCheckpointsView component.
 *
 * This component uses the useCheckpoint primitive under the covers, which means
 * that any changes to the local Row Ids in the Relationship will cause an
 * update.
 * @param props The props for this component.
 * @returns A rendering of the checkpoint: its label if present, or Id.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {CheckpointView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   CheckpointView({checkpointId: '0', checkpoints});
 *   dispose();
 * });
 * ```
 * @category Checkpoints components
 * @since v8.3.0
 */
export function CheckpointView(props: CheckpointProps): ComponentReturnType;

/**
 * The BackwardCheckpointsView component renders a list of previous checkpoints
 * that the underlying Store can go back to.
 *
 * The component's props identify which previous checkpoints to render based on
 * the Checkpoints object (which is either the default context Checkpoints
 * object, a named context Checkpoints object, or an explicit reference).
 *
 * This component renders a list by iterating over each checkpoints. By default
 * these are in turn rendered with the CheckpointView component, but you can
 * override this behavior by providing a `checkpointComponent` prop, a custom
 * component of your own that will render a checkpoint based on CheckpointProps.
 * You can also pass additional props to your custom component with the
 * `getCheckpointComponentProps` callback prop.
 *
 * This component uses the useCheckpointIds primitive under the covers, which
 * means that any changes to the checkpoint Ids in the Checkpoints object will
 * cause an update.
 * @param props The props for this component.
 * @returns A rendering of the previous checkpoints, if present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {BackwardCheckpointsView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   BackwardCheckpointsView({checkpoints});
 *   dispose();
 * });
 * ```
 * @category Checkpoints components
 * @since v8.3.0
 */
export function BackwardCheckpointsView(
  props: BackwardCheckpointsProps,
): ComponentReturnType;

/**
 * The CurrentCheckpointView component renders the current checkpoint that the
 * underlying Store is currently on.
 *
 * The component's props identify which current checkpoint to render based on
 * the Checkpoints object (which is either the default context Checkpoints
 * object, a named context Checkpoints object, or an explicit reference).
 *
 * By default the current checkpoint is rendered with the CheckpointView
 * component, but you can override this behavior by providing a
 * `checkpointComponent` prop, a custom component of your own that will render a
 * checkpoint based on CheckpointProps. You can also pass additional props to
 * your custom component with the `getCheckpointComponentProps` callback prop.
 *
 * This component uses the useCheckpointIds primitive under the covers, which
 * means that any changes to the current checkpoint Id in the Checkpoints object
 * will cause an update.
 * @param props The props for this component.
 * @returns A rendering of the current checkpoint, if present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {CurrentCheckpointView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   CurrentCheckpointView({checkpoints});
 *   dispose();
 * });
 * ```
 * @category Checkpoints components
 * @since v8.3.0
 */
export function CurrentCheckpointView(
  props: CurrentCheckpointProps,
): ComponentReturnType;

/**
 * The ForwardCheckpointsView component renders a list of future checkpoints
 * that the underlying Store can go forwards to.
 *
 * The component's props identify which future checkpoints to render based on
 * the Checkpoints object (which is either the default context Checkpoints
 * object, a named context Checkpoints object, or an explicit reference).
 *
 * This component renders a list by iterating over each checkpoints. By default
 * these are in turn rendered with the CheckpointView component, but you can
 * override this behavior by providing a `checkpointComponent` prop, a custom
 * component of your own that will render a checkpoint based on CheckpointProps.
 * You can also pass additional props to your custom component with the
 * `getCheckpointComponentProps` callback prop.
 *
 * This component uses the useCheckpointIds primitive under the covers, which
 * means that any changes to the checkpoint Ids in the Checkpoints object will
 * cause an update.
 * @param props The props for this component.
 * @returns A rendering of the future checkpoints, if present.
 * @example
 * This example creates the TinyBase objects needed by the Solid primitive or
 * component and calls it from within a reactive root.
 *
 * ```js
 * import {createRoot} from 'solid-js';
 * import {
 *   createCheckpoints,
 *   createIndexes,
 *   createMetrics,
 *   createQueries,
 *   createRelationships,
 *   createStore,
 * } from 'tinybase';
 * import {ForwardCheckpointsView} from 'tinybase/ui-solid';
 *
 * createRoot((dispose) => {
 *   const store = createStore()
 *     .setTables({
 *       pets: {
 *         fido: {species: 'dog', color: 'brown', next: 'felix'},
 *         felix: {species: 'cat', color: 'black'},
 *       },
 *       species: {dog: {price: 5}, cat: {price: 4}},
 *     })
 *     .setValues({open: true});
 *   const metrics = createMetrics(store).setMetricDefinition(
 *     'highestPrice',
 *     'species',
 *     'max',
 *     'price',
 *   );
 *   const indexes = createIndexes(store).setIndexDefinition(
 *     'bySpecies',
 *     'pets',
 *     'species',
 *   );
 *   const relationships = createRelationships(store)
 *     .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *     .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 *   const queries = createQueries(store).setQueryDefinition(
 *     'petColors',
 *     'pets',
 *     ({select, where, param}) => {
 *       select('color');
 *       where((getCell) => getCell('species') == param('species'));
 *     },
 *     {species: 'dog'},
 *   );
 *   const checkpoints = createCheckpoints(store);
 *   store.setCell('pets', 'fido', 'color', 'walnut');
 *   checkpoints.setCheckpoint('updated color');
 *   metrics.getMetric('highestPrice');
 *   indexes.getSliceIds('bySpecies');
 *   relationships.getRemoteRowId('petSpecies', 'fido');
 *   queries.getResultRowIds('petColors');
 *   ForwardCheckpointsView({checkpoints});
 *   dispose();
 * });
 * ```
 * @category Checkpoints components
 * @since v8.3.0
 */
export function ForwardCheckpointsView(
  props: ForwardCheckpointsProps,
): ComponentReturnType;
