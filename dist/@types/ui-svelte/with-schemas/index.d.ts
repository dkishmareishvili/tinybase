import type {Component, Snippet} from 'svelte';
import type {
  AllCellIdFromSchema,
  CellIdFromSchema,
  DefaultedValueFromSchema,
  NoInfer,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../_internal/store/with-schemas/index.d.ts';
import type {
  CheckpointsOrCheckpointsId,
  IndexesOrIndexesId,
  MetricsOrMetricsId,
  PersisterOrPersisterId,
  QueriesOrQueriesId,
  RelationshipsOrRelationshipsId,
  StoreOrStoreId,
  SynchronizerOrSynchronizerId,
} from '../../_internal/ui/with-schemas/index.d.ts';
import type {
  CheckpointIds,
  CheckpointIdsListener,
  CheckpointListener,
  Checkpoints,
} from '../../checkpoints/with-schemas/index.d.ts';
import type {Id, IdOrNull, Ids} from '../../common/with-schemas/index.d.ts';
import type {
  Indexes,
  SliceIdsListener,
  SliceRowIdsListener,
} from '../../indexes/with-schemas/index.d.ts';
import type {
  MetricListener,
  Metrics,
} from '../../metrics/with-schemas/index.d.ts';
import type {
  AnyPersister,
  Status,
  StatusListener,
} from '../../persisters/with-schemas/index.d.ts';
import type {
  ParamValueListener,
  ParamValuesListener,
  Queries,
  ResultCell,
  ResultCellIdsListener,
  ResultCellListener,
  ResultRow,
  ResultRowCountListener,
  ResultRowIdsListener,
  ResultRowListener,
  ResultSortedRowIdsListener,
  ResultTable,
  ResultTableCellIdsListener,
  ResultTableListener,
} from '../../queries/with-schemas/index.d.ts';
import type {
  LinkedRowIdsListener,
  LocalRowIdsListener,
  Relationships,
  RemoteRowIdListener,
} from '../../relationships/with-schemas/index.d.ts';
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
  OptionalSchemas,
  Row,
  RowCountListener,
  RowIdsListener,
  RowListener,
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
  Values,
  ValuesListener,
} from '../../store/with-schemas/index.d.ts';
import type {Synchronizer} from '../../synchronizers/with-schemas/index.d.ts';
import type {MaybeGetter} from '../index.d.ts';

export type WithSchemas<Schemas extends OptionalSchemas> = {
  /**
 * The MaybeGetter type represents a value that can be provided either as a
 * plain value or as a reactive getter function.
 *
 * When a getter function is provided to a reactive function, its internal
 * `$effect` will re-run whenever the getter's reactive dependencies change.
 * This is the mechanism that makes Svelte 5 props reactive in these functions.
 * @category Identity
 * @since v8.1.0
 */
  MaybeGetter: <T>(t: T) => T | (() => T);

  /**
 * The StoreOrStoreId type is used when you need to refer to a Store in a
 * ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * Store | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the Store.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Store objects into a context that can be used throughout the app. In
 * this case you will want to refer to a Store by its Id in that context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Store or its Id.
 * @category Identity
 * @since v8.1.0
 */
  StoreOrStoreId: StoreOrStoreId<Schemas>;

  /**
 * The MetricsOrMetricsId type is used when you need to refer to a Metrics
 * object in a ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * Metrics | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the Metrics
 * object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Metrics objects into a context that can be used throughout the app.
 * In this case you will want to refer to a Metrics object by its Id in that
 * context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Metrics object or its
 * Id.
 * @category Identity
 * @since v8.1.0
 */
  MetricsOrMetricsId: MetricsOrMetricsId<Schemas>;

  /**
 * The IndexesOrIndexesId type is used when you need to refer to an Indexes
 * object in a ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * Indexes | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the Indexes
 * object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Indexes objects into a context that can be used throughout the app.
 * In this case you will want to refer to an Indexes object by its Id in that
 * context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Indexes object or its
 * Id.
 * @category Identity
 * @since v8.1.0
 */
  IndexesOrIndexesId: IndexesOrIndexesId<Schemas>;

  /**
 * The RelationshipsOrRelationshipsId type is used when you need to refer to a
 * Relationships object in a ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * Relationships | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the
 * Relationships object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Relationships objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Relationships object by its Id
 * in that context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Relationships object
 * or its Id.
 * @category Identity
 * @since v8.1.0
 */
  RelationshipsOrRelationshipsId: RelationshipsOrRelationshipsId<Schemas>;

  /**
 * The QueriesOrQueriesId type is used when you need to refer to a Queries
 * object in a ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * Queries | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the Queries
 * object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Queries objects into a context that can be used throughout the app.
 * In this case you will want to refer to a Queries object by its Id in that
 * context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Queries object or its
 * Id.
 * @category Identity
 * @since v8.1.0
 */
  QueriesOrQueriesId: QueriesOrQueriesId<Schemas>;

  /**
 * The CheckpointsOrCheckpointsId type is used when you need to refer to a
 * Checkpoints object in a ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * Checkpoints | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the
 * Checkpoints object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Checkpoints objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Checkpoints object by its Id in
 * that context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Checkpoints object or
 * its Id.
 * @category Identity
 * @since v8.1.0
 */
  CheckpointsOrCheckpointsId: CheckpointsOrCheckpointsId<Schemas>;

  /**
 * The PersisterOrPersisterId type is used when you need to refer to a Persister
 * object in a ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * AnyPersister | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the
 * Persister object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Persister objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Persister object by its Id in
 * that context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Persister or its Id.
 * @category Identity
 * @since v8.1.0
 */
  PersisterOrPersisterId: PersisterOrPersisterId<Schemas>;

  /**
 * The SynchronizerOrSynchronizerId type is used when you need to refer to a
 * Synchronizer object in a ui-svelte function or component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * Synchronizer | Id;
 * ```
 *
 * In some simple cases you will already have a direct reference to the
 * Synchronizer object.
 *
 * This module also includes a Provider component that can be used to wrap
 * multiple Synchronizer objects into a context that can be used throughout the
 * app. In this case you will want to refer to a Synchronizer object by its Id
 * in that context.
 *
 * Many functions and components in this ui-svelte module take this type as a
 * parameter or a prop, allowing you to pass in either the Synchronizer or its
 * Id.
 * @category Identity
 * @since v8.1.0
 */
  SynchronizerOrSynchronizerId: SynchronizerOrSynchronizerId<Schemas>;

  /**
 * ProviderProps props are used with the Provider component, so that Store,
 * Metrics, Indexes, Relationships, Queries, Checkpoints, Persisters, and
 * Synchronizers can be passed into the context of a Svelte 5 application and
 * used throughout.
 *
 * One of each type of object can be provided as a default within the context.
 * Additionally, multiple of each type of object can be provided in an Id-keyed
 * map to the `___ById` props.
 * @category Props
 * @since v8.1.0
 */
  ProviderProps: {
    /**
   * A default single Store object that will be available within the Provider
   * context.
   * @category Prop
   * @since v8.1.0
   */
    readonly store?: Store<Schemas>;
    /**
   * An object containing multiple Store objects that will be available within
   * the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly storesById?: {readonly [id: Id]: Store<Schemas>};
    /**
   * A default single Metrics object that will be available within the Provider
   * context.
   * @category Prop
   * @since v8.1.0
   */
    readonly metrics?: Metrics<Schemas>;
    /**
   * An object containing multiple Metrics objects that will be available within
   * the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly metricsById?: {readonly [id: Id]: Metrics<Schemas>};
    /**
   * A default single Indexes object that will be available within the Provider
   * context.
   * @category Prop
   * @since v8.1.0
   */
    readonly indexes?: Indexes<Schemas>;
    /**
   * An object containing multiple Indexes objects that will be available within
   * the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly indexesById?: {readonly [id: Id]: Indexes<Schemas>};
    /**
   * A default single Relationships object that will be available within the
   * Provider context.
   * @category Prop
   * @since v8.1.0
   */
    readonly relationships?: Relationships<Schemas>;
    /**
   * An object containing multiple Relationships objects that will be available
   * within the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly relationshipsById?: {readonly [id: Id]: Relationships<Schemas>};
    /**
   * A default single Queries object that will be available within the Provider
   * context.
   * @category Prop
   * @since v8.1.0
   */
    readonly queries?: Queries<Schemas>;
    /**
   * An object containing multiple Queries objects that will be available within
   * the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly queriesById?: {readonly [id: Id]: Queries<Schemas>};
    /**
   * A default single Checkpoints object that will be available within the
   * Provider context.
   * @category Prop
   * @since v8.1.0
   */
    readonly checkpoints?: Checkpoints<Schemas>;
    /**
   * An object containing multiple Checkpoints objects that will be available
   * within the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly checkpointsById?: {readonly [id: Id]: Checkpoints<Schemas>};
    /**
   * A default single Persister object that will be available within the
   * Provider context.
   * @category Prop
   * @since v8.1.0
   */
    readonly persister?: AnyPersister<Schemas>;
    /**
   * An object containing multiple Persister objects that will be available
   * within the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly persistersById?: {readonly [id: Id]: AnyPersister<Schemas>};
    /**
   * A default single Synchronizer object that will be available within the
   * Provider context.
   * @category Prop
   * @since v8.1.0
   */
    readonly synchronizer?: Synchronizer<Schemas>;
    /**
   * An object containing multiple Synchronizer objects that will be available
   * within the Provider context by their Id.
   * @category Prop
   * @since v8.1.0
   */
    readonly synchronizersById?: {readonly [id: Id]: Synchronizer<Schemas>};
    readonly children: Snippet;
  };

  /**
 * CellViewProps props are used for components that refer to a single Cell in a
 * Row, such as the CellView component.
 * @category Props
 * @since v8.1.0
 */
  CellViewProps: {
    /**
   * The Id of the Table in the Store.
   * @category Props
   * @since v8.1.0
   */
    readonly tableId: TableIdFromSchema<Schemas[0]>;
    /**
   * The Id of the Row in the Table.
   * @category Props
   * @since v8.1.0
   */
    readonly rowId: Id;
    /**
   * The Id of the Cell in the Row to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly cellId: AllCellIdFromSchema<Schemas[0]>;
    /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly store?: StoreOrStoreId<Schemas>;
    /**
   * Whether the component should also render the Id of the Cell to assist with
   * debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
  };

  /**
 * ValueViewProps props are used for components that refer to a single Value in
 * a Store, such as the ValueView component.
 * @category Props
 * @since v8.1.0
 */
  ValueViewProps: {
    /**
   * The Id of the Value in the Store to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly valueId: ValueIdFromSchema<Schemas[1]>;
    /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly store?: StoreOrStoreId<Schemas>;
    /**
   * Whether the component should also render the Id of the Value to assist with
   * debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
  };

  /**
 * MetricViewProps props are used for components that refer to a single Metric
 * in a Metrics object, such as the MetricView component.
 * @category Props
 * @since v8.1.0
 */
  MetricViewProps: {
    /**
   * The Id of the Metric in the Metrics object to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly metricId: Id;
    /**
   * The Metrics object to be accessed: omit for the default context Metrics
   * object, provide an Id for a named context Metrics object, or provide an
   * explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly metrics?: MetricsOrMetricsId<Schemas>;
    /**
   * Whether the component should also render the Id of the Metric to assist
   * with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
  };

  /**
 * CheckpointViewProps props are used for components that refer to a single
 * checkpoint in a Checkpoints object, such as the CheckpointView component.
 * @category Props
 * @since v8.1.0
 */
  CheckpointViewProps: {
    /**
   * The Id of the checkpoint in the Checkpoints object.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpointId: Id;
    /**
   * The Checkpoints object to be accessed: omit for the default context
   * Checkpoints object, provide an Id for a named context Checkpoints object,
   * or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
    /**
   * Whether the component should also render the Id of the checkpoint to assist
   * with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
  };

  /**
 * RowViewProps props are used for components that refer to a single Row in a
 * Table, such as the RowView component.
 * @category Props
 * @since v8.1.0
 */
  RowViewProps: {
    /**
   * The Id of the Table in the Store.
   * @category Props
   * @since v8.1.0
   */
    readonly tableId: TableIdFromSchema<Schemas[0]>;
    /**
   * The Id of the Row in the Table to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly rowId: Id;
    /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly store?: StoreOrStoreId<Schemas>;
    /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * Row's Cells in a given order.
   * @category Props
   * @since v8.1.0
   */
    readonly customCellIds?: Ids;
    /**
   * A component or string to separate each rendered Cell.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Row, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Cell in the Row, to override the default
   * CellView component.
   * @category Props
   * @since v8.1.0
   */
    readonly cell?: Snippet<[cellId: AllCellIdFromSchema<Schemas[0]>]>;
  };

  /**
 * TableViewProps props are used for components that refer to a single Table in
 * a Store, such as the TableView component.
 * @category Props
 * @since v8.1.0
 */
  TableViewProps: {
    /**
   * The Id of the Table in the Store to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly tableId: TableIdFromSchema<Schemas[0]>;
    /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly store?: StoreOrStoreId<Schemas>;
    /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * Table's Cells in a given order for each Row.
   * @category Props
   * @since v8.1.0
   */
    readonly customCellIds?: Ids;
    /**
   * A component or string to separate each rendered Row.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Table, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Row in the Table, to override the default
   * RowView component.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * SortedTableViewProps props are used for components that refer to a single
 * sorted Table in a Store, such as the SortedTableView component.
 * @category Props
 * @since v8.1.0
 */
  SortedTableViewProps: {
    /**
   * The Id of the Table in the Store to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly tableId: TableIdFromSchema<Schemas[0]>;
    /**
   * The Id of the Cell whose values are used for sorting. If omitted, the view
   * will sort the Row Id itself.
   * @category Props
   * @since v8.1.0
   */
    readonly cellId?: AllCellIdFromSchema<Schemas[0]>;
    /**
   * Whether the sorting should be in descending order.
   * @category Props
   * @since v8.1.0
   */
    readonly descending?: boolean;
    /**
   * The number of Row Ids to skip for pagination purposes.
   * @category Props
   * @since v8.1.0
   */
    readonly offset?: number;
    /**
   * The maximum number of Row Ids to return.
   * @category Props
   * @since v8.1.0
   */
    readonly limit?: number;
    /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly store?: StoreOrStoreId<Schemas>;
    /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * sorted Table's Cells in a given order.
   * @category Props
   * @since v8.1.0
   */
    readonly customCellIds?: Ids;
    /**
   * A component or string to separate each rendered Row.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Table, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Row in the sorted Table, to override the
   * default RowView component.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * TablesViewProps props are used for components that refer to all the Tables in
 * a Store, such as the TablesView component.
 * @category Props
 * @since v8.1.0
 */
  TablesViewProps: {
    /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly store?: StoreOrStoreId<Schemas>;
    /**
   * A component or string to separate each rendered Table.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Ids of each Table, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Table in the Store, to override the default
   * TableView component.
   * @category Props
   * @since v8.1.0
   */
    readonly table?: Snippet<[tableId: TableIdFromSchema<Schemas[0]>]>;
  };

  /**
 * ValuesViewProps props are used for components that refer to all the Values in
 * a Store, such as the ValuesView component.
 * @category Props
 * @since v8.1.0
 */
  ValuesViewProps: {
    /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly store?: StoreOrStoreId<Schemas>;
    /**
   * A component or string to separate each rendered Value.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Ids of each Value to assist
   * with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Value in the Store, to override the default
   * ValueView component.
   * @category Props
   * @since v8.1.0
   */
    readonly value?: Snippet<[valueId: ValueIdFromSchema<Schemas[1]>]>;
  };

  /**
 * IndexViewProps props are used for components that refer to a single Index in
 * an Indexes object, such as the IndexView component.
 * @category Props
 * @since v8.1.0
 */
  IndexViewProps: {
    /**
   * The Id of the Index in the Indexes object to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly indexId: Id;
    /**
   * The Indexes object to be accessed: omit for the default context Indexes
   * object, provide an Id for a named context Indexes object, or provide an
   * explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly indexes?: IndexesOrIndexesId<Schemas>;
    /**
   * A component or string to separate each rendered Slice.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Index, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Slice in the Index.
   * @category Props
   * @since v8.1.0
   */
    readonly slice?: Snippet<[sliceId: Id]>;
  };

  /**
 * SliceViewProps props are used for components that refer to a single Slice in
 * an Index object, such as the SliceView component.
 * @category Props
 * @since v8.1.0
 */
  SliceViewProps: {
    /**
   * The Id of the Index in the Indexes object.
   * @category Props
   * @since v8.1.0
   */
    readonly indexId: Id;
    /**
   * The Id of the Slice in the Index to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly sliceId: Id;
    /**
   * The Indexes object to be accessed: omit for the default context Indexes
   * object, provide an Id for a named context Indexes object, or provide an
   * explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly indexes?: IndexesOrIndexesId<Schemas>;
    /**
   * A component or string to separate each rendered Row.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Slice, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Row in the Slice, to override the default
   * RowView component.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * RemoteRowViewProps props are used for components that refer to a single
 * Relationship in a Relationships object, and where you want to render a remote
 * Row based on a local Row, such as in the RemoteRowView component.
 * @category Props
 * @since v8.1.0
 */
  RemoteRowViewProps: {
    /**
   * The Id of the Relationship in the Relationships object.
   * @category Props
   * @since v8.1.0
   */
    readonly relationshipId: Id;
    /**
   * The Id of the local Row for which to render the remote Row.
   * @category Props
   * @since v8.1.0
   */
    readonly localRowId: Id;
    /**
   * The Relationships object to be accessed: omit for the default context
   * Relationships object, provide an Id for a named context Relationships
   * object, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly relationships?: RelationshipsOrRelationshipsId<Schemas>;
    /**
   * Whether the component should also render the Id of the Row in the
   * Relationship, and its descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each (remote, local, or linked) Row in the
   * Relationship.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * LocalRowsViewProps props are used for components that refer to a single
 * Relationship in a Relationships object, and where you want to render local
 * Rows based on a remote Row, such as the LocalRowsView component.
 * @category Props
 * @since v8.1.0
 */
  LocalRowsViewProps: {
    /**
   * The Id of the Relationship in the Relationships object.
   * @category Props
   * @since v8.1.0
   */
    readonly relationshipId: Id;
    /**
   * The Id of the remote Row for which to render the local Rows.
   * @category Props
   * @since v8.1.0
   */
    readonly remoteRowId: Id;
    /**
   * The Relationships object to be accessed: omit for the default context
   * Relationships object, provide an Id for a named context Relationships
   * object, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly relationships?: RelationshipsOrRelationshipsId<Schemas>;
    /**
   * A component or string to separate each rendered Row.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Row in the
   * Relationship, and its descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each (remote, local, or linked) Row in the
   * Relationship.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * LinkedRowsViewProps props are used for components that refer to a single
 * Relationship in a Relationships object, and where you want to render a linked
 * list of Rows starting from a first Row, such as the LinkedRowsView component.
 * @category Props
 * @since v8.1.0
 */
  LinkedRowsViewProps: {
    /**
   * The Id of the Relationship in the Relationships object.
   * @category Props
   * @since v8.1.0
   */
    readonly relationshipId: Id;
    /**
   * The Id of the first Row in the linked list Relationship.
   * @category Props
   * @since v8.1.0
   */
    readonly firstRowId: Id;
    /**
   * The Relationships object to be accessed: omit for the default context
   * Relationships object, provide an Id for a named context Relationships
   * object, or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly relationships?: RelationshipsOrRelationshipsId<Schemas>;
    /**
   * A component or string to separate each rendered Row.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Row in the
   * Relationship, and its descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each (remote, local, or linked) Row in the
   * Relationship.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * ResultCellViewProps props are used for components that refer to a single Cell
 * in a Row of a query ResultTable, such as the ResultCellView component.
 * @category Props
 * @since v8.1.0
 */
  ResultCellViewProps: {
    /**
   * The Id of the query in the Queries object for which the ResultTable will be
   * rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly queryId: Id;
    /**
   * The Id of the Row in the ResultTable.
   * @category Props
   * @since v8.1.0
   */
    readonly rowId: Id;
    /**
   * The Id of the Cell in the Row to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly cellId: Id;
    /**
   * The Queries object to be accessed: omit for the default context Queries
   * object, provide an Id for a named context Queries object, or provide an
   * explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly queries?: QueriesOrQueriesId<Schemas>;
    /**
   * Whether the component should also render the Id of the Cell to assist with
   * debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
  };

  /**
 * ResultRowViewProps props are used for components that refer to a single Row
 * in a query ResultTable, such as the ResultRowView component.
 * @category Props
 * @since v8.1.0
 */
  ResultRowViewProps: {
    /**
   * The Id of the query in the Queries object for which the ResultTable will be
   * rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly queryId: Id;
    /**
   * The Id of the Row in the ResultTable to be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly rowId: Id;
    /**
   * The Queries object to be accessed: omit for the default context Queries
   * object, provide an Id for a named context Queries object, or provide an
   * explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly queries?: QueriesOrQueriesId<Schemas>;
    /**
   * A component or string to separate each rendered Cell.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the Row, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Cell in the Row, to override the default
   * ResultCellView component.
   * @category Props
   * @since v8.1.0
   */
    readonly cell?: Snippet<[cellId: Id]>;
  };

  /**
 * ResultTableViewProps props are used for components that refer to a single
 * query ResultTable, such as the ResultTableView component.
 * @category Props
 * @since v8.1.0
 */
  ResultTableViewProps: {
    /**
   * The Id of the query in the Queries object for which the ResultTable will be
   * rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly queryId: Id;
    /**
   * The Queries object to be accessed: omit for the default context Queries
   * object, provide an Id for a named context Queries object, or provide an
   * explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly queries?: QueriesOrQueriesId<Schemas>;
    /**
   * A component or string to separate each rendered Row.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the query, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Row in the Table, to override the default
   * ResultRowView component.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * ResultSortedTableViewProps props are used for components that refer to a
 * single sorted query ResultTable, such as the ResultSortedTableView component.
 * @category Props
 * @since v8.1.0
 */
  ResultSortedTableViewProps: {
    /**
   * The Id of the query in the Queries object for which the sorted ResultTable
   * will be rendered.
   * @category Props
   * @since v8.1.0
   */
    readonly queryId: Id;
    /**
   * The Id of the Cell whose values are used for sorting. If omitted, the view
   * will sort the Row Id itself.
   * @category Props
   * @since v8.1.0
   */
    readonly cellId?: Id;
    /**
   * Whether the sorting should be in descending order.
   * @category Props
   * @since v8.1.0
   */
    readonly descending?: boolean;
    /**
   * The number of Row Ids to skip for pagination purposes.
   * @category Props
   * @since v8.1.0
   */
    readonly offset?: number;
    /**
   * The maximum number of Row Ids to return.
   * @category Props
   * @since v8.1.0
   */
    readonly limit?: number;
    /**
   * The Queries object to be accessed: omit for the default context Queries
   * object, provide an Id for a named context Queries object, or provide an
   * explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly queries?: QueriesOrQueriesId<Schemas>;
    /**
   * A component or string to separate each rendered Row.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Id of the query, and its
   * descendent objects, to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each Row in the Table, to override the default
   * ResultRowView component.
   * @category Props
   * @since v8.1.0
   */
    readonly row?: Snippet<[rowId: Id]>;
  };

  /**
 * BackwardCheckpointsViewProps props are used for components that refer to a
 * list of previous checkpoints in a Checkpoints object, such as the
 * BackwardCheckpointsView component.
 * @category Props
 * @since v8.1.0
 */
  BackwardCheckpointsViewProps: {
    /**
   * The Checkpoints object to be accessed: omit for the default context
   * Checkpoints object, provide an Id for a named context Checkpoints object,
   * or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
    /**
   * A component or string to separate each rendered checkpoint.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Ids of the checkpoints to
   * assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each checkpoint in the Checkpoints object.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpoint?: Snippet<[checkpointId: Id]>;
  };

  /**
 * ForwardCheckpointsViewProps props are used for components that refer to a
 * list of future checkpoints in a Checkpoints object, such as the
 * ForwardCheckpointsView component.
 * @category Props
 * @since v8.1.0
 */
  ForwardCheckpointsViewProps: {
    /**
   * The Checkpoints object to be accessed: omit for the default context
   * Checkpoints object, provide an Id for a named context Checkpoints object,
   * or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
    /**
   * A component or string to separate each rendered checkpoint.
   * @category Props
   * @since v8.1.0
   */
    readonly separator?: Snippet<[]>;
    /**
   * Whether the component should also render the Ids of the checkpoints to
   * assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering each checkpoint in the Checkpoints object.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpoint?: Snippet<[checkpointId: Id]>;
  };

  /**
 * CurrentCheckpointViewProps props are used for components that refer to the
 * current checkpoint in a Checkpoints object, such as the CurrentCheckpointView
 * component.
 * @category Props
 * @since v8.1.0
 */
  CurrentCheckpointViewProps: {
    /**
   * The Checkpoints object to be accessed: omit for the default context
   * Checkpoints object, provide an Id for a named context Checkpoints object,
   * or provide an explicit reference.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
    /**
   * Whether the component should also render the Id of the current checkpoint
   * to assist with debugging.
   * @category Props
   * @since v8.1.0
   */
    readonly debugIds?: boolean;
    /**
   * A snippet for rendering the current checkpoint in the Checkpoints object.
   * @category Props
   * @since v8.1.0
   */
    readonly checkpoint?: Snippet<[checkpointId: Id]>;
  };

  /**
 * The Provider component wraps part of an application to make TinyBase objects
 * available throughout its component subtree via Svelte context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const Provider: Component<ProviderProps>;
 * ```
 *
 * Store objects, Metrics, Indexes, Relationships, Queries, Checkpoints,
 * Persisters, and Synchronizers can all be provided both as single defaults and
 * as named instances in a `*ById` map.
 *
 * Provider components can be nested and their contexts are merged, so outer
 * defaults and named instances remain visible unless a nearer Provider replaces
 * them.
 * @param props The props for this component.
 * @example
 * This example creates a Provider context with a default Store.
 *
 * ```ts
 * // In a .svelte file:
 * // <Provider store={createStore()}>
 * //   <App />
 * // </Provider>
 * ```
 * @category Component
 * @since v8.1.0
 */
  Provider: Component<WithSchemas<Schemas>['ProviderProps']>;

  /**
 * The CellView component renders the value of a single Cell in a given Row in a
 * given Table, and registers a listener so that any changes to that result will
 * cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the Cell, or nothing if not present.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const CellView: Component<CellViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {CellView} from 'tinybase/ui-svelte';
 *
 *   export let store;
 * </script>
 *
 * <CellView tableId="pets" rowId="fido" cellId="species" {store} />
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Component
 * @since v8.1.0
 */
  CellView: Component<WithSchemas<Schemas>['CellViewProps']>;

  /**
 * The ValueView component renders the value of a single Value in a Store, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 * @param props The props for this component.
 * @returns A rendering of the Value, or nothing if not present.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ValueView: Component<ValueViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {ValueView} from 'tinybase/ui-svelte';
 *
 *   export let store;
 * </script>
 *
 * <ValueView valueId="open" {store} />
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Component
 * @since v8.1.0
 */
  ValueView: Component<WithSchemas<Schemas>['ValueViewProps']>;

  /**
 * The RowView component renders the contents of a single Row in a given Table,
 * and registers a listener so that any changes to that result will cause a
 * re-render.
 * @param props The props for this component.
 * @returns A rendering of the Row, or nothing if not present.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const RowView: Component<RowViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {RowView} from 'tinybase/ui-svelte';
 *
 *   export let store;
 * </script>
 *
 * <RowView tableId="pets" rowId="fido" {store} customCellIds={['species']} />
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Component
 * @since v8.1.0
 */
  RowView: Component<WithSchemas<Schemas>['RowViewProps']>;

  /**
 * The TableView component renders the contents of a single Table, and registers
 * a listener so that any changes to that result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the Table.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const TableView: Component<TableViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {TableView} from 'tinybase/ui-svelte';
 *
 *   export let store;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <TableView tableId="pets" {store} {separator}>
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </TableView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'fido felix'
 * ```
 * @category Component
 * @since v8.1.0
 */
  TableView: Component<WithSchemas<Schemas>['TableViewProps']>;

  /**
 * The SortedTableView component renders the contents of a single Table in a
 * sorted order, and registers a listener so that any changes to that result
 * will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the sorted Table.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const SortedTableView: Component<SortedTableViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {SortedTableView} from 'tinybase/ui-svelte';
 *
 *   export let store;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <SortedTableView tableId="pets" cellId="sold" {store} {separator}>
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </SortedTableView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'fido felix'
 * ```
 * @category Component
 * @since v8.1.0
 */
  SortedTableView: Component<WithSchemas<Schemas>['SortedTableViewProps']>;

  /**
 * The TablesView component renders the contents of all Tables in a Store, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 * @param props The props for this component.
 * @returns A rendering of all Tables.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const TablesView: Component<TablesViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {TablesView} from 'tinybase/ui-svelte';
 *
 *   export let store;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <TablesView {store} {separator}>
 *   {#snippet table(tableId)}{tableId}{/snippet}
 * </TablesView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'pets species'
 * ```
 * @category Component
 * @since v8.1.0
 */
  TablesView: Component<WithSchemas<Schemas>['TablesViewProps']>;

  /**
 * The ValuesView component renders all Values in a Store, and registers a
 * listener so that any changes to that result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of all Values.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ValuesView: Component<ValuesViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {ValuesView} from 'tinybase/ui-svelte';
 *
 *   export let store;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <ValuesView {store} {separator}>
 *   {#snippet value(valueId)}{valueId}{/snippet}
 * </ValuesView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'open employees'
 * ```
 * @category Component
 * @since v8.1.0
 */
  ValuesView: Component<WithSchemas<Schemas>['ValuesViewProps']>;

  /**
 * The MetricView component renders the value of a named Metric in a Metrics
 * object, and registers a listener so that any changes to that result will
 * cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the Metric value.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const MetricView: Component<MetricViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {MetricView} from 'tinybase/ui-svelte';
 *
 *   export let metrics;
 * </script>
 *
 * <MetricView metricId="petCount" {metrics} />
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'petCount',
 *   'pets',
 *   'count',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * console.log(app.textContent);
 * // -> '2'
 * ```
 * @category Component
 * @since v8.1.0
 */
  MetricView: Component<WithSchemas<Schemas>['MetricViewProps']>;

  /**
 * The IndexView component renders the slices in a named Index, and registers a
 * listener so that any changes to that result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the slices.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const IndexView: Component<IndexViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {IndexView} from 'tinybase/ui-svelte';
 *
 *   export let indexes;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <IndexView indexId="bySpecies" {indexes} {separator}>
 *   {#snippet slice(sliceId)}{sliceId}{/snippet}
 * </IndexView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> 'dog cat'
 * ```
 * @category Component
 * @since v8.1.0
 */
  IndexView: Component<WithSchemas<Schemas>['IndexViewProps']>;

  /**
 * The SliceView component renders the Row Ids in a named Slice in an Index, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 * @param props The props for this component.
 * @returns A rendering of the Rows in the Slice.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const SliceView: Component<SliceViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {SliceView} from 'tinybase/ui-svelte';
 *
 *   export let indexes;
 * </script>
 *
 * <SliceView indexId="bySpecies" sliceId="dog" {indexes}>
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </SliceView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> 'fido'
 * ```
 * @category Component
 * @since v8.1.0
 */
  SliceView: Component<WithSchemas<Schemas>['SliceViewProps']>;

  /**
 * The RemoteRowView component renders the remote Row Id for a given local Row
 * in a Relationship, and registers a listener so that any changes to that
 * result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the remote Row.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const RemoteRowView: Component<RemoteRowViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {RemoteRowView} from 'tinybase/ui-svelte';
 *
 *   export let relationships;
 * </script>
 *
 * <RemoteRowView relationshipId="petSpecies" localRowId="fido" {relationships}>
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </RemoteRowView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store).setRelationshipDefinition(
 *   'petSpecies',
 *   'pets',
 *   'species',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Component
 * @since v8.1.0
 */
  RemoteRowView: Component<WithSchemas<Schemas>['RemoteRowViewProps']>;

  /**
 * The LocalRowsView component renders the local Row Ids for a given remote Row
 * in a Relationship, and registers a listener so that any changes to that
 * result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the local Row Ids.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const LocalRowsView: Component<LocalRowsViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {LocalRowsView} from 'tinybase/ui-svelte';
 *
 *   export let relationships;
 * </script>
 *
 * <LocalRowsView relationshipId="petSpecies" remoteRowId="dog" {relationships}>
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </LocalRowsView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store).setRelationshipDefinition(
 *   'petSpecies',
 *   'pets',
 *   'species',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> 'fido'
 * ```
 * @category Component
 * @since v8.1.0
 */
  LocalRowsView: Component<WithSchemas<Schemas>['LocalRowsViewProps']>;

  /**
 * The LinkedRowsView component renders the Rows in a linked list Relationship,
 * and registers a listener so that any changes to that result will cause a
 * re-render.
 * @param props The props for this component.
 * @returns A rendering of the linked Row Ids.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const LinkedRowsView: Component<LinkedRowsViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {LinkedRowsView} from 'tinybase/ui-svelte';
 *
 *   export let relationships;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <LinkedRowsView
 *   relationshipId="nextPet"
 *   firstRowId="fido"
 *   {relationships}
 *   {separator}
 * >
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </LinkedRowsView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store).setRelationshipDefinition(
 *   'nextPet',
 *   'pets',
 *   'pets',
 *   'next',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> 'fido felix'
 * ```
 * @category Component
 * @since v8.1.0
 */
  LinkedRowsView: Component<WithSchemas<Schemas>['LinkedRowsViewProps']>;

  /**
 * The ResultCellView component renders the value of a single Cell in a given
 * Result Row in a given Result Table of a Queries object, and registers a
 * listener so that any changes to that result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the result Cell.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ResultCellView: Component<ResultCellViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {ResultCellView} from 'tinybase/ui-svelte';
 *
 *   export let queries;
 * </script>
 *
 * <ResultCellView queryId="petColors" rowId="fido" cellId="color" {queries} />
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> 'brown'
 * ```
 * @category Component
 * @since v8.1.0
 */
  ResultCellView: Component<WithSchemas<Schemas>['ResultCellViewProps']>;

  /**
 * The ResultRowView component renders the contents of a single Result Row in a
 * given Result Table, and registers a listener so that any changes to that
 * result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the result Row.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ResultRowView: Component<ResultRowViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {ResultRowView} from 'tinybase/ui-svelte';
 *
 *   export let queries;
 * </script>
 *
 * <ResultRowView queryId="petColors" rowId="fido" {queries}>
 *   {#snippet cell(cellId)}{cellId}{/snippet}
 * </ResultRowView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> 'color'
 * ```
 * @category Component
 * @since v8.1.0
 */
  ResultRowView: Component<WithSchemas<Schemas>['ResultRowViewProps']>;

  /**
 * The ResultTableView component renders the contents of a single Result Table
 * in a Queries object, and registers a listener so that any changes to that
 * result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the result Table.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ResultTableView: Component<ResultTableViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {ResultTableView} from 'tinybase/ui-svelte';
 *
 *   export let queries;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <ResultTableView queryId="petColors" {queries} {separator}>
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </ResultTableView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> 'fido felix'
 * ```
 * @category Component
 * @since v8.1.0
 */
  ResultTableView: Component<WithSchemas<Schemas>['ResultTableViewProps']>;

  /**
 * The ResultSortedTableView component renders the contents of a single sorted
 * Result Table in a Queries object, and registers a listener so that any
 * changes to that result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the sorted result Table.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ResultSortedTableView: Component<ResultSortedTableViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {ResultSortedTableView} from 'tinybase/ui-svelte';
 *
 *   export let queries;
 * </script>
 *
 * {#snippet separator()}{' '}{/snippet}
 * <ResultSortedTableView
 *   queryId="petColors"
 *   cellId="color"
 *   {queries}
 *   {separator}
 * >
 *   {#snippet row(rowId)}{rowId}{/snippet}
 * </ResultSortedTableView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> 'felix fido'
 * ```
 * @category Component
 * @since v8.1.0
 */
  ResultSortedTableView: Component<
    WithSchemas<Schemas>['ResultSortedTableViewProps']
  >;

  /**
 * The CheckpointView component renders the label of a checkpoint in a
 * Checkpoints object, and registers a listener so that any changes to that
 * result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the checkpoint label.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const CheckpointView: Component<CheckpointViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {CheckpointView} from 'tinybase/ui-svelte';
 *
 *   export let checkpoints;
 * </script>
 *
 * <CheckpointView checkpointId="0" {checkpoints} />
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> ''
 * ```
 * @category Component
 * @since v8.1.0
 */
  CheckpointView: Component<WithSchemas<Schemas>['CheckpointViewProps']>;

  /**
 * The BackwardCheckpointsView component renders the list of checkpoint Ids that
 * represent backward checkpoints in a Checkpoints object, and registers a
 * listener so that any changes to that result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the backward checkpoint Ids.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const BackwardCheckpointsView: Component<BackwardCheckpointsViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {BackwardCheckpointsView} from 'tinybase/ui-svelte';
 *
 *   export let checkpoints;
 * </script>
 *
 * <BackwardCheckpointsView {checkpoints}>
 *   {#snippet checkpoint(checkpointId)}{checkpointId}{/snippet}
 * </BackwardCheckpointsView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> ''
 * ```
 * @category Component
 * @since v8.1.0
 */
  BackwardCheckpointsView: Component<
    WithSchemas<Schemas>['BackwardCheckpointsViewProps']
  >;

  /**
 * The ForwardCheckpointsView component renders the list of checkpoint Ids that
 * represent forward checkpoints in a Checkpoints object, and registers a
 * listener so that any changes to that result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the forward checkpoint Ids.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ForwardCheckpointsView: Component<ForwardCheckpointsViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {ForwardCheckpointsView} from 'tinybase/ui-svelte';
 *
 *   export let checkpoints;
 * </script>
 *
 * <ForwardCheckpointsView {checkpoints}>
 *   {#snippet checkpoint(checkpointId)}{checkpointId}{/snippet}
 * </ForwardCheckpointsView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> ''
 * ```
 * @category Component
 * @since v8.1.0
 */
  ForwardCheckpointsView: Component<
    WithSchemas<Schemas>['ForwardCheckpointsViewProps']
  >;

  /**
 * The CurrentCheckpointView component renders the current checkpoint in a
 * Checkpoints object, and registers a listener so that any changes to that
 * result will cause a re-render.
 * @param props The props for this component.
 * @returns A rendering of the current checkpoint.
 * @example
 * This example creates TinyBase objects outside the component and renders
 * the Svelte component with them.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const CurrentCheckpointView: Component<CurrentCheckpointViewProps>;
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {CurrentCheckpointView} from 'tinybase/ui-svelte';
 *
 *   export let checkpoints;
 * </script>
 *
 * <CurrentCheckpointView {checkpoints}>
 *   {#snippet checkpoint(checkpointId)}{checkpointId}{/snippet}
 * </CurrentCheckpointView>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> '0'
 * ```
 * @category Component
 * @since v8.1.0
 */
  CurrentCheckpointView: Component<
    WithSchemas<Schemas>['CurrentCheckpointViewProps']
  >;

  /**
 * The hasTables function returns a reactive object indicating whether any
 * Tables exist in the Store, and registers a listener so that any changes to
 * that result will update `current`.
 * @param storeOrStoreId The Store to use, or its Id in a Provider context.
 * @returns A reactive object with a `current` boolean property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * hasTables(
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {
 *   readonly current: boolean;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {hasTables} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = hasTables(store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  hasTables: (
    storeOrStoreId?: MaybeGetter<StoreOrStoreId<Schemas> | undefined>,
  ) => {
    readonly current: boolean;
  };

  /**
 * The getTables function returns a reactive object reflecting the Tables in the
 * Store, and registers a listener so that any changes to those Tables will
 * update `current`.
 * @param storeOrStoreId The Store to use, or its Id in a Provider context.
 * @returns A reactive object with a `current` Tables property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getTables(
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {
 *   readonly current: Tables;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getTables} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getTables(store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // ->
 * `
 * {
 *   "pets":{
 *     "fido":{
 *       "species":"dog",
 *       "color":"brown",
 *       "sold":false,
 *       "next":"felix"
 *     },
 *     "felix":{
 *       "species":"cat",
 *       "color":"black",
 *       "sold":true
 *     }
 *   },
 *   "species":{
 *     "dog":{
 *       "price":5
 *     },
 *     "cat":{
 *       "price":4
 *     }
 *   }
 * }
 * `;
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getTables: (
    storeOrStoreId?: MaybeGetter<StoreOrStoreId<Schemas> | undefined>,
  ) => {
    readonly current: Tables<Schemas[0]>;
  };

  /**
 * The getTableIds function returns a reactive object reflecting the Ids of the
 * Tables in a Store, and registers a listener so that any changes to those Ids
 * will update `current`.
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getTableIds(
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {
 *   readonly current: Ids;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getTableIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getTableIds(store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '["pets","species"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getTableIds: (storeOrStoreId?: StoreOrStoreId<Schemas>) => {
    readonly current: TableIdFromSchema<Schemas[0]>[];
  };

  /**
 * The hasTable function returns a reactive object indicating whether a Table
 * exists in the Store, and registers a listener so that any changes to that
 * result will update `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` boolean property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * hasTable(
 *   tableId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: boolean};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {hasTable} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = hasTable('pets', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  hasTable: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: MaybeGetter<TableId>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: boolean};

  /**
 * The getTable function returns a reactive object reflecting a Table in a
 * Store, and registers a listener so that any changes to that Table will update
 * `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Table property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getTable(
 *   tableId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: Table};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getTable} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getTable('pets', store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // ->
 * `
 * {
 *   "fido":{
 *     "species":"dog",
 *     "color":"brown",
 *     "sold":false,
 *     "next":"felix"
 *   },
 *   "felix":{
 *     "species":"cat",
 *     "color":"black",
 *     "sold":true
 *   }
 * }
 * `;
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getTable: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: MaybeGetter<TableId>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: Table<Schemas[0], TableId>};

  /**
 * The getTableCellIds function returns a reactive object reflecting the Ids of
 * all Cells used across a Table, and registers a listener so that any changes
 * to those Ids will update `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getTableCellIds(
 *   tableId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getTableCellIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getTableCellIds('pets', store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '["species","color","sold","next"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getTableCellIds: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: MaybeGetter<TableId>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: CellIdFromSchema<Schemas[0], TableId>[]};

  /**
 * The hasTableCell function returns a reactive object indicating whether a
 * particular Cell is used anywhere in a Table, and registers a listener so that
 * any changes to that result will update `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param cellId The Id of the Cell (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` boolean property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * hasTableCell(
 *   tableId: MaybeGetter<Id>,
 *   cellId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: boolean};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {hasTableCell} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = hasTableCell('pets', 'species', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  hasTableCell: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: MaybeGetter<TableId>,
    cellId: MaybeGetter<CellIdFromSchema<Schemas[0], TableId>>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: boolean};

  /**
 * The getRowCount function returns a reactive object reflecting the number of
 * Rows in a Table, and registers a listener so that any changes will update
 * `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` number property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getRowCount(
 *   tableId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: number};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRowCount} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getRowCount('pets', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '2'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRowCount: (
    tableId: MaybeGetter<TableIdFromSchema<Schemas[0]>>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: number};

  /**
 * The getRowIds function returns a reactive object reflecting the Ids of the
 * Rows in a Table, and registers a listener so that any changes will update
 * `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getRowIds(
 *   tableId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRowIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getRowIds('pets', store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '["fido","felix"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRowIds: (
    tableId: MaybeGetter<TableIdFromSchema<Schemas[0]>>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getSortedRowIds function returns a reactive object reflecting the sorted
 * Row Ids in a Table, and registers a listener so that any changes will update
 * `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param cellId The Id of the Cell to sort by (or a getter returning it).
 * @param descending Whether to sort descending (or a getter returning it).
 * @param offset The starting Row offset (or a getter returning it).
 * @param limit The maximum number of Rows to return (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getSortedRowIds(
 *   tableId: MaybeGetter<Id>,
 *   cellId?: MaybeGetter<Id | undefined>,
 *   descending?: MaybeGetter<boolean>,
 *   offset?: MaybeGetter<number>,
 *   limit?: MaybeGetter<number | undefined>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getSortedRowIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getSortedRowIds('pets', 'sold', false, 0, undefined, store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '["fido","felix"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getSortedRowIds: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: MaybeGetter<TableId>,
    cellId?: MaybeGetter<CellIdFromSchema<Schemas[0], TableId> | undefined>,
    descending?: MaybeGetter<boolean>,
    offset?: MaybeGetter<number>,
    limit?: MaybeGetter<number | undefined>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The hasRow function returns a reactive object indicating whether a Row exists
 * in a Table, and registers a listener so that any changes to that result will
 * update `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` boolean property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * hasRow(
 *   tableId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: boolean};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {hasRow} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = hasRow('pets', 'fido', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  hasRow: (
    tableId: MaybeGetter<TableIdFromSchema<Schemas[0]>>,
    rowId: MaybeGetter<Id>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: boolean};

  /**
 * The getRow function returns a reactive object reflecting a Row in a Table,
 * and registers a listener so that any changes to that Row will update
 * `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Row property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getRow(
 *   tableId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: Row};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRow} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getRow('pets', 'fido', store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '{"species":"dog","color":"brown","sold":false,"next":"felix"}'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRow: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: MaybeGetter<TableId>,
    rowId: MaybeGetter<Id>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: Row<Schemas[0], TableId>};

  /**
 * The getCellIds function returns a reactive object reflecting the Ids of the
 * Cells in a Row, and registers a listener so that any changes will update
 * `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getCellIds(
 *   tableId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getCellIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getCellIds('pets', 'fido', store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '["species","color","sold","next"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getCellIds: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: MaybeGetter<TableId>,
    rowId: MaybeGetter<Id>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: CellIdFromSchema<Schemas[0], TableId>[]};

  /**
 * The hasCell function returns a reactive object indicating whether a Cell
 * exists in a Row in a Table, and registers a listener so that any changes to
 * that result will update `current`.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param cellId The Id of the Cell (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` boolean property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * hasCell(
 *   tableId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   cellId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: boolean};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {hasCell} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = hasCell('pets', 'fido', 'species', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  hasCell: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellId extends CellIdFromSchema<Schemas[0], TableId>,
  >(
    tableId: MaybeGetter<TableId>,
    rowId: MaybeGetter<Id>,
    cellId: MaybeGetter<CellId>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: boolean};

  /**
 * The getCell function returns a reactive object reflecting the value of a Cell
 * in a Row in a Table, and registers a listener so that any changes to that
 * Cell will update `current`.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getCell(
 *   tableId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   cellId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {get current(): CellOrUndefined; set current(v: Cell)};
 * ```
 *
 * Since Cells are mutable leaf values in a Store, the returned object's
 * `current` property can also be assigned to write back to the Store.
 * @param tableId The Id of the Table (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param cellId The Id of the Cell (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with gettable and settable `current`.
 * @example
 * This example uses the getCell function to display a Cell value reactively.
 *
 * ```ts
 * // In a .svelte file:
 * // const store = createStore().setCell('pets', 'cat', 'name', 'Fido');
 * // const name = getCell('pets', 'cat', 'name', store);
 * // $: console.log(name.current); // 'Fido'
 * ```
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getCell} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getCell('pets', 'fido', 'species', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getCell: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellId extends CellIdFromSchema<Schemas[0], TableId>,
  >(
    tableId: MaybeGetter<TableId>,
    rowId: MaybeGetter<Id>,
    cellId: MaybeGetter<CellId>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {
    get current(): NoInfer<CellOrUndefined<Schemas[0], TableId, CellId>>;
    set current(v: Cell<Schemas[0], TableId, CellId>);
  };

  /**
 * The hasValues function returns a reactive object indicating whether any
 * Values exist in the Store, and registers a listener so that any changes to
 * that result will update `current`.
 * @param storeOrStoreId The Store to use, or its Id in a Provider context.
 * @returns A reactive object with a `current` boolean property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * hasValues(
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {
 *   readonly current: boolean;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {hasValues} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = hasValues(store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  hasValues: (
    storeOrStoreId?: MaybeGetter<StoreOrStoreId<Schemas> | undefined>,
  ) => {
    readonly current: boolean;
  };

  /**
 * The getValues function returns a reactive object reflecting the Values in the
 * Store, and registers a listener so that any changes will update `current`.
 * @param storeOrStoreId The Store to use, or its Id in a Provider context.
 * @returns A reactive object with a `current` Values property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getValues(
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {
 *   readonly current: Values;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getValues} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getValues(store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '{"open":true,"employees":3}'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getValues: (
    storeOrStoreId?: MaybeGetter<StoreOrStoreId<Schemas> | undefined>,
  ) => {
    readonly current: Values<Schemas[1]>;
  };

  /**
 * The getValueIds function returns a reactive object reflecting the Ids of the
 * Values in a Store, and registers a listener so that any changes will update
 * `current`.
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getValueIds(
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {
 *   readonly current: Ids;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getValueIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getValueIds(store);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '["open","employees"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getValueIds: (storeOrStoreId?: StoreOrStoreId<Schemas>) => {
    readonly current: ValueIdFromSchema<Schemas[1]>[];
  };

  /**
 * The hasValue function returns a reactive object indicating whether a Value
 * exists in the Store, and registers a listener so that any changes to that
 * result will update `current`.
 * @param valueId The Id of the Value (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with a `current` boolean property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * hasValue(
 *   valueId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {readonly current: boolean};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {hasValue} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = hasValue('open', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  hasValue: <ValueId extends ValueIdFromSchema<Schemas[1]>>(
    valueId: MaybeGetter<ValueId>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {readonly current: boolean};

  /**
 * The getValue function returns a reactive object reflecting the value of a
 * Value in a Store, and registers a listener so that any changes to that Value
 * will update `current`.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getValue(
 *   valueId: MaybeGetter<Id>,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): {get current(): ValueOrUndefined; set current(v: Value)};
 * ```
 *
 * Since Values are mutable leaf values in a Store, the returned object's
 * `current` property can also be assigned to write back to the Store.
 * @param valueId The Id of the Value (or a getter returning it).
 * @param storeOrStoreId The Store to use (plain value or getter), or its Id.
 * @returns A reactive object with gettable and settable `current`.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getValue} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   const result = getValue('open', store);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'true'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getValue: <ValueId extends ValueIdFromSchema<Schemas[1]>>(
    valueId: MaybeGetter<ValueId>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => {
    get current(): NoInfer<DefaultedValueFromSchema<Schemas[1], ValueId>>;
    set current(v: Value<Schemas[1], ValueId>);
  };

  /**
 * The getStore function returns the default Store from the current Provider
 * context (or a named Store if an Id is provided).
 * @param id An optional Id of a named Store in the Provider context.
 * @returns The Store, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getStore(id?: Id): Store | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getStore} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getStore()?.getCell('pets', 'fido', 'species')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {store} = $props();
 * </script>
 *
 * <Provider {store}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getStore: (id?: Id) => Store<Schemas> | undefined;

  /**
 * The resolveStore function is used to get a reference to a Store object from a
 * Provider context, or have it passed directly.
 * @param storeOrStoreId The Store, its Id, or a getter returning either.
 * @returns A getter function returning the Store, or `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolveStore(
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): () => Store | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolveStore, getStoreIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {resolveStore('petStore')()?.getCell('pets', 'fido', 'species')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {store} = $props();
 * </script>
 *
 * <Provider storesById={{petStore: store}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolveStore: (
    storeOrStoreId?: MaybeGetter<StoreOrStoreId<Schemas> | undefined>,
  ) => () => Store<Schemas> | undefined;

  /**
 * The getStoreIds function returns a reactive object with the Ids of all Stores
 * registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getStoreIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getStoreIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {store} = $props();
 * </script>
 *
 * <Provider storesById={{petStore: store}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.textContent);
 * // -> '["petStore"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getStoreIds: () => {readonly current: Ids};

  /**
 * The getMetrics function returns the default Metrics object from the current
 * Provider context (or a named one if an Id is provided).
 * @param id An optional Id of a named Metrics object in the Provider context.
 * @returns The Metrics object, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getMetrics(id?: Id): Metrics | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getMetrics} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getMetrics()?.getMetric('petCount')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {metrics} = $props();
 * </script>
 *
 * <Provider {metrics}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'petCount',
 *   'pets',
 *   'count',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * console.log(app.textContent);
 * // -> '1'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getMetrics: (id?: Id) => Metrics<Schemas> | undefined;

  /**
 * The resolveMetrics function is used to get a reference to a Metrics object
 * from a Provider context, or have it passed directly.
 * @param metricsOrMetricsId The Metrics object, its Id, or a getter returning
 * either.
 * @returns A getter function returning the Metrics object, or `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolveMetrics(
 *   metricsOrMetricsId?: MaybeGetter<MetricsOrMetricsId | undefined>,
 * ): () => Metrics | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolveMetrics, getMetricsIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {resolveMetrics('petMetrics')()?.getMetric('petCount')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {metrics} = $props();
 * </script>
 *
 * <Provider metricsById={{petMetrics: metrics}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'petCount',
 *   'pets',
 *   'count',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * console.log(app.textContent);
 * // -> '1'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolveMetrics: (
    metricsOrMetricsId?: MaybeGetter<MetricsOrMetricsId<Schemas> | undefined>,
  ) => () => Metrics<Schemas> | undefined;

  /**
 * The getMetricsIds function returns a reactive object with the Ids of all
 * Metrics objects registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getMetricsIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getMetricsIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {metrics} = $props();
 * </script>
 *
 * <Provider metricsById={{petMetrics: metrics}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'petCount',
 *   'pets',
 *   'count',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * console.log(app.textContent);
 * // -> '["petMetrics"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getMetricsIds: () => {readonly current: Ids};

  /**
 * The getMetricIds function returns a reactive object reflecting the Ids of the
 * Metrics in a Metrics object, and registers a listener so that any changes
 * will update `current`.
 * @param metricsOrMetricsId The Metrics object to use, or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getMetricIds(
 *   metricsOrMetricsId?: MaybeGetter<MetricsOrMetricsId | undefined>,
 * ): {
 *   readonly current: Ids;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getMetricIds} from 'tinybase/ui-svelte';
 *
 *   let {metrics} = $props();
 *
 *   const result = getMetricIds(metrics);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'speciesPrice',
 *   'species',
 *   'sum',
 *   'price',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * console.log(app.textContent);
 * // -> '["speciesPrice"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getMetricIds: (
    metricsOrMetricsId?: MaybeGetter<MetricsOrMetricsId<Schemas> | undefined>,
  ) => {
    readonly current: Ids;
  };

  /**
 * The getMetric function returns a reactive object reflecting the value of a
 * named Metric in a Metrics object, and registers a listener so that any
 * changes to that Metric will update `current`.
 * @param metricId The Id of the Metric (or a getter returning it).
 * @param metricsOrMetricsId The Metrics object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` number | undefined property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getMetric(
 *   metricId: MaybeGetter<Id>,
 *   metricsOrMetricsId?: MaybeGetter<MetricsOrMetricsId | undefined>,
 * ): {readonly current: number | undefined};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getMetric} from 'tinybase/ui-svelte';
 *
 *   let {metrics} = $props();
 *
 *   const result = getMetric('speciesPrice', metrics);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'speciesPrice',
 *   'species',
 *   'sum',
 *   'price',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * console.log(app.textContent);
 * // -> '9'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getMetric: (
    metricId: MaybeGetter<Id>,
    metricsOrMetricsId?: MetricsOrMetricsId<Schemas>,
  ) => {readonly current: number | undefined};

  /**
 * The getIndexes function returns the default Indexes object from the current
 * Provider context (or a named one if an Id is provided).
 * @param id An optional Id of a named Indexes object in the Provider context.
 * @returns The Indexes object, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getIndexes(id?: Id): Indexes | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getIndexes} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getIndexes()?.getSliceRowIds('bySpecies', 'dog')?.join(',')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {indexes} = $props();
 * </script>
 *
 * <Provider {indexes}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> 'fido'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getIndexes: (id?: Id) => Indexes<Schemas> | undefined;

  /**
 * The resolveIndexes function is used to get a reference to an Indexes object
 * from a Provider context, or have it passed directly.
 * @param indexesOrIndexesId The Indexes object, its Id, or a getter returning
 * either.
 * @returns A getter function returning the Indexes object, or `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolveIndexes(
 *   indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId | undefined>,
 * ): () => Indexes | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolveIndexes, getIndexesIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {resolveIndexes('petIndexes')()
 *   ?.getSliceRowIds('bySpecies', 'dog')
 *   ?.join(',')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {indexes} = $props();
 * </script>
 *
 * <Provider indexesById={{petIndexes: indexes}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> 'fido'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolveIndexes: (
    indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId<Schemas> | undefined>,
  ) => () => Indexes<Schemas> | undefined;

  /**
 * The getIndexStoreTableId function returns the Store and table Id for a given
 * Indexes object and index Id.
 * @param indexesOrId The Indexes object, its Id, or a getter returning either.
 * @param indexId The Id of the index, or a getter returning it.
 * @returns An object with `store` and `tableId` getter properties.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getIndexStoreTableId(
 *   indexesOrId: MaybeGetter<IndexesOrIndexesId | undefined>,
 *   indexId: MaybeGetter<Id>,
 * ): {readonly store: Store | undefined; readonly tableId: Id | undefined};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getIndexStoreTableId} from 'tinybase/ui-svelte';
 *
 *   let {indexes} = $props();
 *
 *   const result = getIndexStoreTableId(indexes, 'bySpecies');
 * </script>
 *
 * {result.tableId}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> 'pets'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getIndexStoreTableId: (
    indexesOrId: MaybeGetter<IndexesOrIndexesId<Schemas> | undefined>,
    indexId: MaybeGetter<Id>,
  ) => {
    readonly store: Store<Schemas> | undefined;
    readonly tableId: Id | undefined;
  };

  /**
 * The getIndexesIds function returns a reactive object with the Ids of all
 * Indexes objects registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getIndexesIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getIndexesIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {indexes} = $props();
 * </script>
 *
 * <Provider indexesById={{petIndexes: indexes}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> '["petIndexes"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getIndexesIds: () => {readonly current: Ids};

  /**
 * The getIndexIds function returns a reactive object reflecting the Ids of the
 * Indexes in an Indexes object, and registers a listener so that any changes
 * will update `current`.
 * @param indexesOrIndexesId The Indexes object to use, or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getIndexIds(
 *   indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId | undefined>,
 * ): {
 *   readonly current: Ids;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getIndexIds} from 'tinybase/ui-svelte';
 *
 *   let {indexes} = $props();
 *
 *   const result = getIndexIds(indexes);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> '["bySpecies"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getIndexIds: (
    indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId<Schemas> | undefined>,
  ) => {
    readonly current: Ids;
  };

  /**
 * The getSliceIds function returns a reactive object reflecting the Ids of the
 * Slices in an Index, and registers a listener so that any changes will update
 * `current`.
 * @param indexId The Id of the Index (or a getter returning it).
 * @param indexesOrIndexesId The Indexes object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getSliceIds(
 *   indexId: MaybeGetter<Id>,
 *   indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getSliceIds} from 'tinybase/ui-svelte';
 *
 *   let {indexes} = $props();
 *
 *   const result = getSliceIds('bySpecies', indexes);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> '["dog","cat"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getSliceIds: (
    indexId: MaybeGetter<Id>,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getSliceRowIds function returns a reactive object reflecting the Ids of
 * the Rows in a Slice, and registers a listener so that any changes will update
 * `current`.
 * @param indexId The Id of the Index (or a getter returning it).
 * @param sliceId The Id of the Slice (or a getter returning it).
 * @param indexesOrIndexesId The Indexes object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getSliceRowIds(
 *   indexId: MaybeGetter<Id>,
 *   sliceId: MaybeGetter<Id>,
 *   indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getSliceRowIds} from 'tinybase/ui-svelte';
 *
 *   let {indexes} = $props();
 *
 *   const result = getSliceRowIds('bySpecies', 'dog', indexes);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.textContent);
 * // -> '["fido"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getSliceRowIds: (
    indexId: MaybeGetter<Id>,
    sliceId: MaybeGetter<Id>,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getQueries function returns the default Queries object from the current
 * Provider context (or a named one if an Id is provided).
 * @param id An optional Id of a named Queries object in the Provider context.
 * @returns The Queries object, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getQueries(id?: Id): Queries | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getQueries} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getQueries()?.getResultCell('petSpecies', 'fido', 'species')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {queries} = $props();
 * </script>
 *
 * <Provider {queries}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const queries = createQueries(store).setQueryDefinition(
 *   'petSpecies',
 *   'pets',
 *   ({select}) => select('species'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getQueries: (id?: Id) => Queries<Schemas> | undefined;

  /**
 * The resolveQueries function is used to get a reference to a Queries object
 * from a Provider context, or have it passed directly.
 * @param queriesOrQueriesId The Queries object, its Id, or a getter returning
 * either.
 * @returns A getter function returning the Queries object, or `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolveQueries(
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): () => Queries | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolveQueries, getQueriesIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {resolveQueries('petQueries')()?.getResultCell(
 *   'petSpecies',
 *   'fido',
 *   'species',
 * )}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {queries} = $props();
 * </script>
 *
 * <Provider queriesById={{petQueries: queries}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const queries = createQueries(store).setQueryDefinition(
 *   'petSpecies',
 *   'pets',
 *   ({select}) => select('species'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolveQueries: (
    queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId<Schemas> | undefined>,
  ) => () => Queries<Schemas> | undefined;

  /**
 * The getQueriesIds function returns a reactive object with the Ids of all
 * Queries objects registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getQueriesIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getQueriesIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {queries} = $props();
 * </script>
 *
 * <Provider queriesById={{petQueries: queries}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const queries = createQueries(store).setQueryDefinition(
 *   'petSpecies',
 *   'pets',
 *   ({select}) => select('species'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '["petQueries"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getQueriesIds: () => {readonly current: Ids};

  /**
 * The getQueryIds function returns a reactive object reflecting the Ids of the
 * Queries in a Queries object, and registers a listener so that any changes
 * will update `current`.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getQueryIds(
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {
 *   readonly current: Ids;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getQueryIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getQueryIds(queries);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '["petColors"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getQueryIds: (
    queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId<Schemas> | undefined>,
  ) => {
    readonly current: Ids;
  };

  /**
 * The getResultTable function returns a reactive object reflecting a result
 * Table in a Queries object, and registers a listener so that any changes to
 * that result will update `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Table property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultTable(
 *   queryId: MaybeGetter<Id>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: Table};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultTable} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultTable('petColors', queries);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '{"fido":{"color":"brown"},"felix":{"color":"black"}}'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultTable: (
    queryId: MaybeGetter<Id>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: ResultTable};

  /**
 * The getResultTableCellIds function returns a reactive object reflecting the
 * Ids of all Cells used across a result Table, and registers a listener so that
 * any changes will update `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultTableCellIds(
 *   queryId: MaybeGetter<Id>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultTableCellIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultTableCellIds('petColors', queries);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '["color"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultTableCellIds: (
    queryId: MaybeGetter<Id>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getResultRowCount function returns a reactive object reflecting the
 * number of Rows in a result Table, and registers a listener so that any
 * changes will update `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` number property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultRowCount(
 *   queryId: MaybeGetter<Id>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: number};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultRowCount} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultRowCount('petColors', queries);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '2'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultRowCount: (
    queryId: MaybeGetter<Id>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: number};

  /**
 * The getResultRowIds function returns a reactive object reflecting the Ids of
 * the Rows in a result Table, and registers a listener so that any changes will
 * update `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultRowIds(
 *   queryId: MaybeGetter<Id>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultRowIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultRowIds('petColors', queries);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '["fido","felix"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultRowIds: (
    queryId: MaybeGetter<Id>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getResultSortedRowIds function returns a reactive object reflecting the
 * sorted Row Ids in a result Table, and registers a listener so that any
 * changes will update `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param cellId The Id of the Cell to sort by (or a getter returning it).
 * @param descending Whether to sort descending (or a getter returning it).
 * @param offset The starting Row offset (or a getter returning it).
 * @param limit The maximum number of Rows (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultSortedRowIds(
 *   queryId: MaybeGetter<Id>,
 *   cellId?: MaybeGetter<Id | undefined>,
 *   descending?: MaybeGetter<boolean>,
 *   offset?: MaybeGetter<number>,
 *   limit?: MaybeGetter<number | undefined>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultSortedRowIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultSortedRowIds(
 * 'petColors', 'color', false, 0, undefined, queries);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '["felix","fido"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultSortedRowIds: (
    queryId: MaybeGetter<Id>,
    cellId?: MaybeGetter<Id | undefined>,
    descending?: MaybeGetter<boolean>,
    offset?: MaybeGetter<number>,
    limit?: MaybeGetter<number | undefined>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getResultRow function returns a reactive object reflecting a result Row
 * in a result Table, and registers a listener so that any changes will update
 * `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Row property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultRow(
 *   queryId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: Row};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultRow} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultRow('petColors', 'fido', queries);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '{"color":"brown"}'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultRow: (
    queryId: MaybeGetter<Id>,
    rowId: MaybeGetter<Id>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: ResultRow};

  /**
 * The getResultCellIds function returns a reactive object reflecting the Ids of
 * the Cells in a result Row, and registers a listener so that any changes will
 * update `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultCellIds(
 *   queryId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultCellIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultCellIds('petColors', 'fido', queries);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> '["color"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultCellIds: (
    queryId: MaybeGetter<Id>,
    rowId: MaybeGetter<Id>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getResultCell function returns a reactive object reflecting the value of
 * a Cell in a result Row, and registers a listener so that any changes will
 * update `current`.
 * @param queryId The Id of the Query (or a getter returning it).
 * @param rowId The Id of the Row (or a getter returning it).
 * @param cellId The Id of the Cell (or a getter returning it).
 * @param queriesOrQueriesId The Queries object to use (plain or getter), or its
 * Id.
 * @returns A reactive object with a `current` Cell | undefined property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getResultCell(
 *   queryId: MaybeGetter<Id>,
 *   rowId: MaybeGetter<Id>,
 *   cellId: MaybeGetter<Id>,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): {readonly current: CellOrUndefined};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getResultCell} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   const result = getResultCell('petColors', 'fido', 'color', queries);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.textContent);
 * // -> 'brown'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getResultCell: (
    queryId: MaybeGetter<Id>,
    rowId: MaybeGetter<Id>,
    cellId: MaybeGetter<Id>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => {readonly current: ResultCell | undefined};

  /**
 * The getRelationships function returns the default Relationships object from
 * the current Provider context (or a named one if an Id is provided).
 * @param id An optional Id of a named Relationships object in the Provider
 * context.
 * @returns The Relationships object, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getRelationships(id?: Id): Relationships | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRelationships} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getRelationships()?.getRemoteRowId('petSpecies', 'fido')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {relationships} = $props();
 * </script>
 *
 * <Provider {relationships}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const relationships = createRelationships(store).setRelationshipDefinition(
 *   'petSpecies',
 *   'pets',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRelationships: (id?: Id) => Relationships<Schemas> | undefined;

  /**
 * The resolveRelationships function is used to get a reference to a
 * Relationships object from a Provider context, or have it passed directly.
 * @param relationshipsOrRelationshipsId The Relationships object, its Id, or a
 * getter returning either.
 * @returns A getter function returning the Relationships object, or
 * `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolveRelationships(
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): () => Relationships | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolveRelationships, getRelationshipsIds}
 * from 'tinybase/ui-svelte';
 * </script>
 *
 * {resolveRelationships('petRelationships')()
 * ?.getRemoteRowId('petSpecies', 'fido')}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {relationships} = $props();
 * </script>
 *
 * <Provider relationshipsById={{petRelationships: relationships}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const relationships = createRelationships(store).setRelationshipDefinition(
 *   'petSpecies',
 *   'pets',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolveRelationships: (
    relationshipsOrRelationshipsId?: MaybeGetter<
      RelationshipsOrRelationshipsId<Schemas> | undefined
    >,
  ) => () => Relationships<Schemas> | undefined;

  /**
 * The getRelationshipsStoreTableIds function returns the Store, local table Id,
 * and remote table Id for a given Relationships object and relationship Id.
 * @param relationshipsOrId The Relationships object, its Id, or a getter
 * returning either.
 * @param relationshipId The Id of the relationship, or a getter returning it.
 * @returns An object with `store`, `localTableId`, and `remoteTableId` getter
 * properties.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getRelationshipsStoreTableIds(
 *   relationshipsOrId: MaybeGetter<RelationshipsOrRelationshipsId | undefined>,
 *   relationshipId: MaybeGetter<Id>,
 * ): {
 *   readonly store: Store | undefined;
 *   readonly localTableId: Id | undefined;
 *   readonly remoteTableId: Id | undefined;
 * };
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRelationshipsStoreTableIds} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *
 *   const result = getRelationshipsStoreTableIds(relationships, 'petSpecies');
 * </script>
 *
 * {result.localTableId + ':' + result.remoteTableId}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> 'pets:species'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRelationshipsStoreTableIds: (
    relationshipsOrId: MaybeGetter<
      RelationshipsOrRelationshipsId<Schemas> | undefined
    >,
    relationshipId: MaybeGetter<Id>,
  ) => {
    readonly store: Store<Schemas> | undefined;
    readonly localTableId: Id | undefined;
    readonly remoteTableId: Id | undefined;
  };

  /**
 * The getRelationshipsIds function returns a reactive object with the Ids of
 * all Relationships objects registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRelationshipsIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getRelationshipsIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {relationships} = $props();
 * </script>
 *
 * <Provider relationshipsById={{petRelationships: relationships}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const relationships = createRelationships(store).setRelationshipDefinition(
 *   'petSpecies',
 *   'pets',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> '["petRelationships"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRelationshipsIds: () => {readonly current: Ids};

  /**
 * The getRelationshipIds function returns a reactive object reflecting the Ids
 * of the Relationships in a Relationships object, and registers a listener so
 * that any changes will update `current`.
 * @param relationshipsOrRelationshipsId The Relationships object to use, or its
 * Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getRelationshipIds(
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRelationshipIds} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *
 *   const result = getRelationshipIds(relationships);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> '["petSpecies","nextPet"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRelationshipIds: (
    relationshipsOrRelationshipsId?: MaybeGetter<
      RelationshipsOrRelationshipsId<Schemas> | undefined
    >,
  ) => {readonly current: Ids};

  /**
 * The getRemoteRowId function returns a reactive object reflecting the remote
 * Row Id for a given local Row in a Relationship, and registers a listener so
 * that any changes will update `current`.
 * @param relationshipId The Id of the Relationship (or a getter returning it).
 * @param localRowId The Id of the local Row (or a getter returning it).
 * @param relationshipsOrRelationshipsId The Relationships object to use (plain
 * or getter), or its Id.
 * @returns A reactive object with a `current` Id | undefined property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getRemoteRowId(
 *   relationshipId: MaybeGetter<Id>,
 *   localRowId: MaybeGetter<Id>,
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): {readonly current: Id | undefined};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRemoteRowId} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *
 *   const result = getRemoteRowId('petSpecies', 'fido', relationships);
 * </script>
 *
 * {result.current}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> 'dog'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getRemoteRowId: (
    relationshipId: MaybeGetter<Id>,
    localRowId: MaybeGetter<Id>,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => {readonly current: Id | undefined};

  /**
 * The getLocalRowIds function returns a reactive object reflecting the local
 * Row Ids for a given remote Row in a Relationship, and registers a listener so
 * that any changes will update `current`.
 * @param relationshipId The Id of the Relationship (or a getter returning it).
 * @param remoteRowId The Id of the remote Row (or a getter returning it).
 * @param relationshipsOrRelationshipsId The Relationships object to use (plain
 * or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getLocalRowIds(
 *   relationshipId: MaybeGetter<Id>,
 *   remoteRowId: MaybeGetter<Id>,
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getLocalRowIds} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *
 *   const result = getLocalRowIds('petSpecies', 'dog', relationships);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> '["fido"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getLocalRowIds: (
    relationshipId: MaybeGetter<Id>,
    remoteRowId: MaybeGetter<Id>,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getLinkedRowIds function returns a reactive object reflecting the linked
 * Row Ids in a Relationship, and registers a listener so that any changes will
 * update `current`.
 * @param relationshipId The Id of the Relationship (or a getter returning it).
 * @param firstRowId The Id of the first Row (or a getter returning it).
 * @param relationshipsOrRelationshipsId The Relationships object to use (plain
 * or getter), or its Id.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getLinkedRowIds(
 *   relationshipId: MaybeGetter<Id>,
 *   firstRowId: MaybeGetter<Id>,
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): {readonly current: Ids};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getLinkedRowIds} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *
 *   const result = getLinkedRowIds('nextPet', 'fido', relationships);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.textContent);
 * // -> '["fido","felix"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getLinkedRowIds: (
    relationshipId: MaybeGetter<Id>,
    firstRowId: MaybeGetter<Id>,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => {readonly current: Ids};

  /**
 * The getCheckpoints function returns the default Checkpoints object from the
 * current Provider context (or a named one if an Id is provided).
 * @param id An optional Id of a named Checkpoints object in the Provider
 * context.
 * @returns The Checkpoints object, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getCheckpoints(id?: Id): Checkpoints | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getCheckpoints} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getCheckpoints()?.getCheckpointIds())}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {checkpoints} = $props();
 * </script>
 *
 * <Provider {checkpoints}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> '[[],"0",[]]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getCheckpoints: (id?: Id) => Checkpoints<Schemas> | undefined;

  /**
 * The resolveCheckpoints function is used to get a reference to a Checkpoints
 * object from a Provider context, or have it passed directly.
 * @param checkpointsOrCheckpointsId The Checkpoints object, its Id, or a getter
 * returning either.
 * @returns A getter function returning the Checkpoints object, or `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolveCheckpoints(
 *   checkpointsOrCheckpointsId?: MaybeGetter<
 *     CheckpointsOrCheckpointsId | undefined
 *   >,
 * ): () => Checkpoints | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolveCheckpoints, getCheckpointsIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(resolveCheckpoints('petCheckpoints')()?.getCheckpointIds())}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {checkpoints} = $props();
 * </script>
 *
 * <Provider checkpointsById={{petCheckpoints: checkpoints}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> '[[],"0",[]]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolveCheckpoints: (
    checkpointsOrCheckpointsId?: MaybeGetter<
      CheckpointsOrCheckpointsId<Schemas> | undefined
    >,
  ) => () => Checkpoints<Schemas> | undefined;

  /**
 * The getCheckpointsIds function returns a reactive object with the Ids of all
 * Checkpoints objects registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getCheckpointsIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getCheckpointsIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {checkpoints} = $props();
 * </script>
 *
 * <Provider checkpointsById={{petCheckpoints: checkpoints}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> '["petCheckpoints"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getCheckpointsIds: () => {readonly current: Ids};

  /**
 * The getCheckpointIds function returns a reactive object reflecting the
 * CheckpointIds (backward, current, forward) in a Checkpoints object, and
 * registers a listener so that any changes will update `current`.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use (plain or
 * getter), or its Id.
 * @returns A reactive object with a `current` CheckpointIds property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getCheckpointIds(
 *   checkpointsOrCheckpointsId?: MaybeGetter<
 *     CheckpointsOrCheckpointsId | undefined
 *   >,
 * ): {readonly current: CheckpointIds};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getCheckpointIds} from 'tinybase/ui-svelte';
 *
 *   let {checkpoints} = $props();
 *
 *   const result = getCheckpointIds(checkpoints);
 * </script>
 *
 * {JSON.stringify(result.current)}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> '[[],"0",[]]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getCheckpointIds: (
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => {readonly current: CheckpointIds};

  /**
 * The getCheckpoint function returns a reactive object reflecting the label of
 * a checkpoint, and registers a listener so that any changes will update
 * `current`.
 * @param checkpointId The Id of the checkpoint (or a getter returning it).
 * @param checkpointsOrCheckpointsId The Checkpoints object to use (plain or
 * getter), or its Id.
 * @returns A reactive object with a `current` string | undefined property.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getCheckpoint(
 *   checkpointId: MaybeGetter<Id>,
 *   checkpointsOrCheckpointsId?: MaybeGetter<
 *     CheckpointsOrCheckpointsId | undefined
 *   >,
 * ): {readonly current: string | undefined};
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getCheckpoint} from 'tinybase/ui-svelte';
 *
 *   let {checkpoints} = $props();
 *
 *   const result = getCheckpoint('0', checkpoints);
 * </script>
 *
 * {result.current ?? ''}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> ''
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getCheckpoint: (
    checkpointId: MaybeGetter<Id>,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => {readonly current: string | undefined};

  /**
 * The createGoBackwardCallback function returns a callback function that, when
 * called, moves the Checkpoints object backward to the previous checkpoint.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use, or its Id.
 * @returns A callback function.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * createGoBackwardCallback(
 *   checkpointsOrCheckpointsId?: MaybeGetter<
 *     CheckpointsOrCheckpointsId | undefined
 *   >,
 * ): () => void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {createGoBackwardCallback} from 'tinybase/ui-svelte';
 *
 *   let {checkpoints} = $props();
 *
 *   const goBackward = createGoBackwardCallback(checkpoints);
 *   goBackward();
 * </script>
 *
 * {'done'}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> 'done'
 * ```
 * @category Callback
 * @since v8.1.0
 */
  createGoBackwardCallback: (
    checkpointsOrCheckpointsId?: MaybeGetter<
      CheckpointsOrCheckpointsId<Schemas> | undefined
    >,
  ) => () => void;

  /**
 * The createGoForwardCallback function returns a callback function that, when
 * called, moves the Checkpoints object forward to the next checkpoint.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use, or its Id.
 * @returns A callback function.
 * @example
 * This example passes a TinyBase object into a Svelte component and reads
 * the reactive object's `current` property.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * createGoForwardCallback(
 *   checkpointsOrCheckpointsId?: MaybeGetter<
 *     CheckpointsOrCheckpointsId | undefined
 *   >,
 * ): () => void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {createGoForwardCallback} from 'tinybase/ui-svelte';
 *
 *   let {checkpoints} = $props();
 *
 *   const goForward = createGoForwardCallback(checkpoints);
 *   goForward();
 * </script>
 *
 * {'done'}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * console.log(app.textContent);
 * // -> 'done'
 * ```
 * @category Callback
 * @since v8.1.0
 */
  createGoForwardCallback: (
    checkpointsOrCheckpointsId?: MaybeGetter<
      CheckpointsOrCheckpointsId<Schemas> | undefined
    >,
  ) => () => void;

  /**
 * The getPersister function returns the default Persister from the current
 * Provider context (or a named one if an Id is provided).
 * @param id An optional Id of a named Persister in the Provider context.
 * @returns The Persister, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getPersister(id?: Id): AnyPersister | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getPersister} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getPersister()?.getStatus()}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {persister} = $props();
 * </script>
 *
 * <Provider {persister}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import {createCustomPersister} from 'tinybase/persisters';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const persister = createCustomPersister(
 *   store,
 *   async () => undefined,
 *   async () => {},
 *   () => undefined,
 *   () => {},
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {persister}}));
 * console.log(app.textContent);
 * // -> '0'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getPersister: (id?: Id) => AnyPersister<Schemas> | undefined;

  /**
 * The resolvePersister function is used to get a reference to a Persister
 * object from a Provider context, or have it passed directly.
 * @param persisterOrPersisterId The Persister object, its Id, or a getter
 * returning either.
 * @returns A getter function returning the Persister object, or `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolvePersister(
 *   persisterOrPersisterId?: MaybeGetter<PersisterOrPersisterId | undefined>,
 * ): () => AnyPersister | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolvePersister, getPersisterIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {resolvePersister('petPersister')()?.getStatus()}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {persister} = $props();
 * </script>
 *
 * <Provider persistersById={{petPersister: persister}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import {createCustomPersister} from 'tinybase/persisters';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const persister = createCustomPersister(
 *   store,
 *   async () => undefined,
 *   async () => {},
 *   () => undefined,
 *   () => {},
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {persister}}));
 * console.log(app.textContent);
 * // -> '0'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolvePersister: (
    persisterOrPersisterId?: MaybeGetter<
      PersisterOrPersisterId<Schemas> | undefined
    >,
  ) => () => AnyPersister<Schemas> | undefined;

  /**
 * The getPersisterIds function returns a reactive object with the Ids of all
 * Persisters registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getPersisterIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getPersisterIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {persister} = $props();
 * </script>
 *
 * <Provider persistersById={{petPersister: persister}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import {createCustomPersister} from 'tinybase/persisters';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const persister = createCustomPersister(
 *   store,
 *   async () => undefined,
 *   async () => {},
 *   () => undefined,
 *   () => {},
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {persister}}));
 * console.log(app.textContent);
 * // -> '["petPersister"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getPersisterIds: () => {readonly current: Ids};

  /**
 * The getPersisterStatus function returns a reactive object reflecting the
 * status of a Persister, and registers a listener so that any changes will
 * update `current`.
 * @param persisterOrPersisterId The Persister to use, or its Id.
 * @returns A reactive object with a `current` Status property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getPersisterStatus(
 *   persisterOrPersisterId?: MaybeGetter<PersisterOrPersisterId | undefined>,
 * ): {readonly current: Status};
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getPersisterStatus} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getPersisterStatus().current}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {persister} = $props();
 * </script>
 *
 * <Provider {persister}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import {createCustomPersister} from 'tinybase/persisters';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const persister = createCustomPersister(
 *   store,
 *   async () => undefined,
 *   async () => {},
 *   () => undefined,
 *   () => {},
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {persister}}));
 * console.log(app.textContent);
 * // -> '0'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getPersisterStatus: (
    persisterOrPersisterId?: MaybeGetter<
      PersisterOrPersisterId<Schemas> | undefined
    >,
  ) => {
    readonly current: Status;
  };

  /**
 * The getSynchronizer function returns the default Synchronizer from the
 * current Provider context (or a named one if an Id is provided).
 * @param id An optional Id of a named Synchronizer in the Provider context.
 * @returns The Synchronizer, or `undefined` if not found.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getSynchronizer(id?: Id): Synchronizer | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getSynchronizer} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getSynchronizer()?.getStatus()}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {synchronizer} = $props();
 * </script>
 *
 * <Provider {synchronizer}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMergeableStore} from 'tinybase';
 * import {createLocalSynchronizer} from 'tinybase/synchronizers/synchronizer-local';
 * import App from './App.svelte';
 *
 * const synchronizer = createLocalSynchronizer(createMergeableStore());
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {synchronizer}}));
 * console.log(app.textContent);
 * // -> '0'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getSynchronizer: (id?: Id) => Synchronizer<Schemas> | undefined;

  /**
 * The resolveSynchronizer function is used to get a reference to a Synchronizer
 * object from a Provider context, or have it passed directly.
 * @param synchronizerOrSynchronizerId The Synchronizer object, its Id, or a
 * getter returning either.
 * @returns A getter function returning the Synchronizer object, or `undefined`.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * resolveSynchronizer(
 *   synchronizerOrSynchronizerId?: MaybeGetter<
 *     SynchronizerOrSynchronizerId | undefined
 *   >,
 * ): () => Synchronizer | undefined;
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {resolveSynchronizer, getSynchronizerIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {resolveSynchronizer('petSynchronizer')()?.getStatus()}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {synchronizer} = $props();
 * </script>
 *
 * <Provider synchronizersById={{petSynchronizer: synchronizer}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMergeableStore} from 'tinybase';
 * import {createLocalSynchronizer} from 'tinybase/synchronizers/synchronizer-local';
 * import App from './App.svelte';
 *
 * const synchronizer = createLocalSynchronizer(createMergeableStore());
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {synchronizer}}));
 * console.log(app.textContent);
 * // -> '0'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  resolveSynchronizer: (
    synchronizerOrSynchronizerId?: MaybeGetter<
      SynchronizerOrSynchronizerId<Schemas> | undefined
    >,
  ) => () => Synchronizer<Schemas> | undefined;

  /**
 * The getSynchronizerIds function returns a reactive object with the Ids of all
 * Synchronizers registered in the current Provider context.
 * @returns A reactive object with a `current` Ids property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getSynchronizerIds} from 'tinybase/ui-svelte';
 * </script>
 *
 * {JSON.stringify(getSynchronizerIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {synchronizer} = $props();
 * </script>
 *
 * <Provider synchronizersById={{petSynchronizer: synchronizer}}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMergeableStore} from 'tinybase';
 * import {createLocalSynchronizer} from 'tinybase/synchronizers/synchronizer-local';
 * import App from './App.svelte';
 *
 * const synchronizer = createLocalSynchronizer(createMergeableStore());
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {synchronizer}}));
 * console.log(app.textContent);
 * // -> '["petSynchronizer"]'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getSynchronizerIds: () => {readonly current: Ids};

  /**
 * The getSynchronizerStatus function returns a reactive object reflecting the
 * status of a Synchronizer, and registers a listener so that any changes will
 * update `current`.
 * @param synchronizerOrSynchronizerId The Synchronizer to use, or its Id.
 * @returns A reactive object with a `current` Status property.
 * @example
 * This example reads a TinyBase object from Svelte context inside a child
 * component.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * getSynchronizerStatus(
 *   synchronizerOrSynchronizerId?: MaybeGetter<
 *     SynchronizerOrSynchronizerId | undefined
 *   >,
 * ): {readonly current: Status};
 * ```
 *
 * ```svelte file=Child.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getSynchronizerStatus} from 'tinybase/ui-svelte';
 * </script>
 *
 * {getSynchronizerStatus().current}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Child from './Child.svelte';
 *
 *   let {synchronizer} = $props();
 * </script>
 *
 * <Provider {synchronizer}>
 *   <Child />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMergeableStore} from 'tinybase';
 * import {createLocalSynchronizer} from 'tinybase/synchronizers/synchronizer-local';
 * import App from './App.svelte';
 *
 * const synchronizer = createLocalSynchronizer(createMergeableStore());
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {synchronizer}}));
 * console.log(app.textContent);
 * // -> '0'
 * ```
 * @category Getter
 * @since v8.1.0
 */
  getSynchronizerStatus: (
    synchronizerOrSynchronizerId?: MaybeGetter<
      SynchronizerOrSynchronizerId<Schemas> | undefined
    >,
  ) => {readonly current: Status};

  /**
 * The onHasTables function registers a listener that is called whenever any
 * Tables are added to or removed from the Store. The listener is tied to the
 * component's `$effect` lifecycle and is removed when the component unmounts.
 * @param listener The function to call when table presence changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onHasTables(
 *   listener: HasTablesListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onHasTables} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onHasTables(() => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.delTables();
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onHasTables: (
    listener: HasTablesListener<Schemas>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onTables function registers a listener that is called whenever tabular
 * data in the Store changes.
 * @param listener The function to call when Tables change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onTables(
 *   listener: TablesListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onTables} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onTables(() => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'felix', 'color', 'white');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onTables: (
    listener: TablesListener<Schemas>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onTableIds function registers a listener that is called whenever the set
 * of Table Ids in the Store changes.
 * @param listener The function to call when Table Ids change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onTableIds(
 *   listener: TableIdsListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onTableIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onTableIds(() => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setTable('owners', {alice: {name: 'Alice'}});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onTableIds: (
    listener: TableIdsListener<Schemas>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onHasTable function registers a listener that is called whenever a
 * specified Table is added to or removed from the Store.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param listener The function to call when the Table changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onHasTable(
 *   tableId: MaybeGetter<IdOrNull>,
 *   listener: HasTableListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onHasTable} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onHasTable('pets', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.delTable('pets');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onHasTable: <TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null>(
    tableId: MaybeGetter<TableIdOrNull>,
    listener: HasTableListener<Schemas, TableIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onTable function registers a listener that is called whenever data in a
 * specified Table changes.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param listener The function to call when the Table changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onTable(
 *   tableId: MaybeGetter<IdOrNull>,
 *   listener: TableListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onTable} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onTable('pets', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'color', 'white');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onTable: <TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null>(
    tableId: MaybeGetter<TableIdOrNull>,
    listener: TableListener<Schemas, TableIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onTableCellIds function registers a listener that is called whenever the
 * Cell Ids used across a Table change.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param listener The function to call when Cell Ids change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onTableCellIds(
 *   tableId: MaybeGetter<IdOrNull>,
 *   listener: TableCellIdsListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onTableCellIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onTableCellIds('pets', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'age', 4);
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onTableCellIds: <TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null>(
    tableId: MaybeGetter<TableIdOrNull>,
    listener: TableCellIdsListener<Schemas, TableIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onHasTableCell function registers a listener that is called whenever a
 * specified Cell Id is added to or removed from across a Table.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param cellId The Id of the Cell to listen to, or `null` to listen to any
 * Cell Id.
 * @param listener The function to call when the Cell Id changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onHasTableCell(
 *   tableId: MaybeGetter<IdOrNull>,
 *   cellId: MaybeGetter<IdOrNull>,
 *   listener: HasTableCellListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onHasTableCell} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onHasTableCell('pets', 'age', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'age', 4);
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onHasTableCell: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    CellIdOrNull extends
      | (TableIdOrNull extends TableIdFromSchema<Schemas[0]>
          ? CellIdFromSchema<Schemas[0], TableIdOrNull>
          : AllCellIdFromSchema<Schemas[0]>)
      | null,
  >(
    tableId: MaybeGetter<TableIdOrNull>,
    cellId: MaybeGetter<CellIdOrNull>,
    listener: HasTableCellListener<Schemas, TableIdOrNull, CellIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onRowCount function registers a listener that is called whenever the
 * count of Rows in a Table changes.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param listener The function to call when the Row count changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onRowCount(
 *   tableId: MaybeGetter<IdOrNull>,
 *   listener: RowCountListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onRowCount} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onRowCount('pets', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {species: 'dog'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onRowCount: <TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null>(
    tableId: MaybeGetter<TableIdOrNull>,
    listener: RowCountListener<Schemas, TableIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onRowIds function registers a listener that is called whenever the Row
 * Ids in a Table change.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param listener The function to call when Row Ids change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onRowIds(
 *   tableId: MaybeGetter<IdOrNull>,
 *   listener: RowIdsListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onRowIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onRowIds('pets', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {species: 'dog'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onRowIds: <TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null>(
    tableId: MaybeGetter<TableIdOrNull>,
    listener: RowIdsListener<Schemas, TableIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onSortedRowIds function registers a listener that is called whenever the
 * sorted Row Ids in a Table change.
 * @param tableId The Id of the Table to listen to.
 * @param cellId The Id of the Cell to sort by, or `undefined` for default
 * order.
 * @param descending Whether to sort descending.
 * @param offset The index of the first Row to include.
 * @param limit The maximum number of Rows to include, or `undefined` for all.
 * @param listener The function to call when sorted Row Ids change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onSortedRowIds(
 *   tableId: MaybeGetter<Id>,
 *   cellId: MaybeGetter<Id | undefined>,
 *   descending: MaybeGetter<boolean>,
 *   offset: MaybeGetter<number>,
 *   limit: MaybeGetter<number | undefined>,
 *   listener: SortedRowIdsListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onSortedRowIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onSortedRowIds('pets', 'species', false, 0, undefined, () =>
 *  (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {species: 'wolf'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onSortedRowIds: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellIdOrUndefined extends CellIdFromSchema<Schemas[0], TableId> | undefined,
  >(
    tableId: MaybeGetter<TableId>,
    cellId: MaybeGetter<CellIdOrUndefined>,
    descending: MaybeGetter<boolean>,
    offset: MaybeGetter<number>,
    limit: MaybeGetter<number | undefined>,
    listener: SortedRowIdsListener<Schemas, TableId, CellIdOrUndefined>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onHasRow function registers a listener that is called whenever a
 * specified Row is added to or removed from a Table.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param rowId The Id of the Row to listen to, or `null` to listen to any Row.
 * @param listener The function to call when the Row changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onHasRow(
 *   tableId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   listener: HasRowListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onHasRow} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onHasRow('pets', 'fido', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.delRow('pets', 'fido');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onHasRow: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
  >(
    tableId: MaybeGetter<TableIdOrNull>,
    rowId: MaybeGetter<RowIdOrNull>,
    listener: HasRowListener<Schemas, TableIdOrNull, RowIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onRow function registers a listener that is called whenever data in a
 * specified Row changes.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param rowId The Id of the Row to listen to, or `null` to listen to any Row.
 * @param listener The function to call when the Row changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onRow(
 *   tableId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   listener: RowListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onRow} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onRow('pets', 'fido', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'color', 'white');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onRow: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
  >(
    tableId: MaybeGetter<TableIdOrNull>,
    rowId: MaybeGetter<RowIdOrNull>,
    listener: RowListener<Schemas, TableIdOrNull, RowIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onCellIds function registers a listener that is called whenever the Cell
 * Ids in a Row change.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param rowId The Id of the Row to listen to, or `null` to listen to any Row.
 * @param listener The function to call when Cell Ids change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onCellIds(
 *   tableId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   listener: CellIdsListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onCellIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onCellIds('pets', 'fido', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'age', 4);
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onCellIds: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
  >(
    tableId: MaybeGetter<TableIdOrNull>,
    rowId: MaybeGetter<RowIdOrNull>,
    listener: CellIdsListener<Schemas, TableIdOrNull, RowIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onHasCell function registers a listener that is called whenever a
 * specified Cell is added to or removed from a Row.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param rowId The Id of the Row to listen to, or `null` to listen to any Row.
 * @param cellId The Id of the Cell to listen to, or `null` to listen to any
 * Cell.
 * @param listener The function to call when the Cell changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onHasCell(
 *   tableId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   cellId: MaybeGetter<IdOrNull>,
 *   listener: HasCellListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onHasCell} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onHasCell('pets', 'fido', 'species', () => (seen = 'changed'),
 * false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.delCell('pets', 'fido', 'species');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onHasCell: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
    CellIdOrNull extends
      | (TableIdOrNull extends TableIdFromSchema<Schemas[0]>
          ? CellIdFromSchema<Schemas[0], TableIdOrNull>
          : AllCellIdFromSchema<Schemas[0]>)
      | null,
  >(
    tableId: MaybeGetter<TableIdOrNull>,
    rowId: MaybeGetter<RowIdOrNull>,
    cellId: MaybeGetter<CellIdOrNull>,
    listener: HasCellListener<
      Schemas,
      TableIdOrNull,
      RowIdOrNull,
      CellIdOrNull
    >,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onCell function registers a listener that is called whenever the value of
 * a specified Cell changes.
 * @param tableId The Id of the Table to listen to, or `null` to listen to any
 * Table.
 * @param rowId The Id of the Row to listen to, or `null` to listen to any Row.
 * @param cellId The Id of the Cell to listen to, or `null` to listen to any
 * Cell.
 * @param listener The function to call when the Cell changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onCell(
 *   tableId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   cellId: MaybeGetter<IdOrNull>,
 *   listener: CellListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onCell} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onCell('pets', 'fido', 'species', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'species', 'guide dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onCell: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
    CellIdOrNull extends
      | (TableIdOrNull extends TableIdFromSchema<Schemas[0]>
          ? CellIdFromSchema<Schemas[0], TableIdOrNull>
          : AllCellIdFromSchema<Schemas[0]>)
      | null,
  >(
    tableId: MaybeGetter<TableIdOrNull>,
    rowId: MaybeGetter<RowIdOrNull>,
    cellId: MaybeGetter<CellIdOrNull>,
    listener: CellListener<Schemas, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onHasValues function registers a listener that is called whenever any
 * Values are added to or removed from the Store.
 * @param listener The function to call when value presence changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onHasValues(
 *   listener: HasValuesListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onHasValues} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onHasValues(() => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.delValues();
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onHasValues: (
    listener: HasValuesListener<Schemas>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onValues function registers a listener that is called whenever any Values
 * in the Store change.
 * @param listener The function to call when Values change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onValues(
 *   listener: ValuesListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onValues} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onValues(() => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setValue('open', false);
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onValues: (
    listener: ValuesListener<Schemas>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onValueIds function registers a listener that is called whenever the
 * Value Ids in the Store change.
 * @param listener The function to call when Value Ids change.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onValueIds(
 *   listener: ValueIdsListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onValueIds} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onValueIds(() => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setValue('rating', 5);
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onValueIds: (
    listener: ValueIdsListener<Schemas>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onHasValue function registers a listener that is called whenever a
 * specified Value is added to or removed from the Store.
 * @param valueId The Id of the Value to listen to, or `null` to listen to any
 * Value.
 * @param listener The function to call when the Value changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onHasValue(
 *   valueId: MaybeGetter<IdOrNull>,
 *   listener: HasValueListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onHasValue} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onHasValue('open', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.delValue('open');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onHasValue: <ValueIdOrNull extends ValueIdFromSchema<Schemas[1]> | null>(
    valueId: MaybeGetter<ValueIdOrNull>,
    listener: HasValueListener<Schemas, ValueIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onValue function registers a listener that is called whenever the value
 * of a specified Value changes.
 * @param valueId The Id of the Value to listen to, or `null` to listen to any
 * Value.
 * @param listener The function to call when the Value changes.
 * @param mutator An optional boolean indicating the listener mutates Store
 * data.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onValue(
 *   valueId: MaybeGetter<IdOrNull>,
 *   listener: ValueListener,
 *   mutator?: boolean,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onValue} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onValue('open', () => (seen = 'changed'), false, store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setValue('open', false);
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onValue: <ValueIdOrNull extends ValueIdFromSchema<Schemas[1]> | null>(
    valueId: MaybeGetter<ValueIdOrNull>,
    listener: ValueListener<Schemas, ValueIdOrNull>,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onStartTransaction function registers a listener that is called at the
 * start of every Store transaction.
 * @param listener The function to call at transaction start.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onStartTransaction(
 *   listener: TransactionListener,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onStartTransaction} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onStartTransaction(() => (seen = 'changed'), store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'species', 'guide dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onStartTransaction: (
    listener: TransactionListener<Schemas>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onWillFinishTransaction function registers a listener called just before
 * a Store transaction completes.
 * @param listener The function to call before transaction end.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onWillFinishTransaction(
 *   listener: TransactionListener,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onWillFinishTransaction} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onWillFinishTransaction(() => (seen = 'changed'), store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'species', 'guide dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onWillFinishTransaction: (
    listener: TransactionListener<Schemas>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onDidFinishTransaction function registers a listener called just after a
 * Store transaction completes.
 * @param listener The function to call after transaction end.
 * @param storeOrStoreId The Store to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onDidFinishTransaction(
 *   listener: TransactionListener,
 *   storeOrStoreId?: MaybeGetter<StoreOrStoreId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onDidFinishTransaction} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *   let seen = $state('');
 *
 *   onDidFinishTransaction(() => (seen = 'changed'), store);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'species', 'guide dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onDidFinishTransaction: (
    listener: TransactionListener<Schemas>,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /**
 * The onMetric function registers a listener that is called whenever a
 * specified Metric value changes.
 * @param metricId The Id of the Metric to listen to, or `null` to listen to any
 * Metric.
 * @param listener The function to call when the Metric changes.
 * @param metricsOrMetricsId The Metrics object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onMetric(
 *   metricId: MaybeGetter<IdOrNull>,
 *   listener: MetricListener,
 *   metricsOrMetricsId?: MaybeGetter<MetricsOrMetricsId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onMetric} from 'tinybase/ui-svelte';
 *
 *   let {metrics} = $props();
 *   let seen = $state('');
 *
 *   onMetric('petCount', () => (seen = 'changed'), metrics);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'petCount',
 *   'pets',
 *   'count',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {species: 'dog'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onMetric: (
    metricId: MaybeGetter<IdOrNull>,
    listener: MetricListener<Schemas>,
    metricsOrMetricsId?: MetricsOrMetricsId<Schemas>,
  ) => void;

  /**
 * The onSliceIds function registers a listener that is called whenever the
 * Slice Ids in an Index change.
 * @param indexId The Id of the Index to listen to, or `null` to listen to any
 * Index.
 * @param listener The function to call when Slice Ids change.
 * @param indexesOrIndexesId The Indexes object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onSliceIds(
 *   indexId: MaybeGetter<IdOrNull>,
 *   listener: SliceIdsListener,
 *   indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onSliceIds} from 'tinybase/ui-svelte';
 *
 *   let {indexes} = $props();
 *   let seen = $state('');
 *
 *   onSliceIds('bySpecies', () => (seen = 'changed'), indexes);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * flushSync(() => {
 *   store.setCell('pets', 'rex', 'species', 'lizard');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onSliceIds: (
    indexId: MaybeGetter<IdOrNull>,
    listener: SliceIdsListener<Schemas>,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => void;

  /**
 * The onSliceRowIds function registers a listener that is called whenever the
 * Row Ids in a Slice change.
 * @param indexId The Id of the Index to listen to, or `null` to listen to any
 * Index.
 * @param sliceId The Id of the Slice to listen to, or `null` to listen to any
 * Slice.
 * @param listener The function to call when Slice Row Ids change.
 * @param indexesOrIndexesId The Indexes object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onSliceRowIds(
 *   indexId: MaybeGetter<IdOrNull>,
 *   sliceId: MaybeGetter<IdOrNull>,
 *   listener: SliceRowIdsListener,
 *   indexesOrIndexesId?: MaybeGetter<IndexesOrIndexesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onSliceRowIds} from 'tinybase/ui-svelte';
 *
 *   let {indexes} = $props();
 *   let seen = $state('');
 *
 *   onSliceRowIds('bySpecies', 'dog', () => (seen = 'changed'), indexes);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * flushSync(() => {
 *   store.setCell('pets', 'felix', 'species', 'dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onSliceRowIds: (
    indexId: MaybeGetter<IdOrNull>,
    sliceId: MaybeGetter<IdOrNull>,
    listener: SliceRowIdsListener<Schemas>,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => void;

  /**
 * The onRemoteRowId function registers a listener that is called whenever the
 * remote Row Id for a local Row changes.
 * @param relationshipId The Id of the Relationship, or `null` to listen to any
 * Relationship.
 * @param localRowId The Id of the local Row, or `null` to listen to any local
 * Row.
 * @param listener The function to call when the remote Row Id changes.
 * @param relationshipsOrRelationshipsId The Relationships object to use, or its
 * Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onRemoteRowId(
 *   relationshipId: MaybeGetter<IdOrNull>,
 *   localRowId: MaybeGetter<IdOrNull>,
 *   listener: RemoteRowIdListener,
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onRemoteRowId} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *   let seen = $state('');
 *
 *   onRemoteRowId('petSpecies', 'fido',
 *  () => (seen = 'changed'), relationships);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'species', 'cat');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onRemoteRowId: (
    relationshipId: MaybeGetter<IdOrNull>,
    localRowId: MaybeGetter<IdOrNull>,
    listener: RemoteRowIdListener<Schemas>,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => void;

  /**
 * The onLocalRowIds function registers a listener that is called whenever the
 * local Row Ids for a remote Row change.
 * @param relationshipId The Id of the Relationship, or `null` to listen to any
 * Relationship.
 * @param remoteRowId The Id of the remote Row, or `null` to listen to any
 * remote Row.
 * @param listener The function to call when local Row Ids change.
 * @param relationshipsOrRelationshipsId The Relationships object to use, or its
 * Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onLocalRowIds(
 *   relationshipId: MaybeGetter<IdOrNull>,
 *   remoteRowId: MaybeGetter<IdOrNull>,
 *   listener: LocalRowIdsListener,
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onLocalRowIds} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *   let seen = $state('');
 *
 *   onLocalRowIds('petSpecies', 'dog',
 *  () => (seen = 'changed'), relationships);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * flushSync(() => {
 *   store.setCell('pets', 'felix', 'species', 'dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onLocalRowIds: (
    relationshipId: MaybeGetter<IdOrNull>,
    remoteRowId: MaybeGetter<IdOrNull>,
    listener: LocalRowIdsListener<Schemas>,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => void;

  /**
 * The onLinkedRowIds function registers a listener that is called whenever the
 * linked Row Ids for a first Row change.
 * @param relationshipId The Id of the Relationship.
 * @param firstRowId The Id of the first Row.
 * @param listener The function to call when linked Row Ids change.
 * @param relationshipsOrRelationshipsId The Relationships object to use, or its
 * Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onLinkedRowIds(
 *   relationshipId: MaybeGetter<Id>,
 *   firstRowId: MaybeGetter<Id>,
 *   listener: LinkedRowIdsListener,
 *   relationshipsOrRelationshipsId?: MaybeGetter<
 *     RelationshipsOrRelationshipsId | undefined
 *   >,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onLinkedRowIds} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *   let seen = $state('');
 *
 *   onLinkedRowIds('nextPet', 'fido', () => (seen = 'changed'), relationships);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const relationships = createRelationships(store)
 *   .setRelationshipDefinition('petSpecies', 'pets', 'species', 'species')
 *   .setRelationshipDefinition('nextPet', 'pets', 'pets', 'next');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'next', 'rex');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onLinkedRowIds: (
    relationshipId: MaybeGetter<Id>,
    firstRowId: MaybeGetter<Id>,
    listener: LinkedRowIdsListener<Schemas>,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => void;

  /**
 * The onResultTable function registers a listener that is called whenever the
 * result Table of a query changes.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param listener The function to call when the result Table changes.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultTable(
 *   queryId: MaybeGetter<IdOrNull>,
 *   listener: ResultTableListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultTable} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultTable('petColors', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {color: 'gray'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultTable: (
    queryId: MaybeGetter<IdOrNull>,
    listener: ResultTableListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onResultTableCellIds function registers a listener that is called
 * whenever the Cell Ids across a result Table change.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param listener The function to call when Cell Ids change.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultTableCellIds(
 *   queryId: MaybeGetter<IdOrNull>,
 *   listener: ResultTableCellIdsListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultTableCellIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultTableCellIds('petColors', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   queries.setQueryDefinition('petColors', 'pets', ({select}) => {
 *     select('color');
 *     select('species');
 *   });
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultTableCellIds: (
    queryId: MaybeGetter<IdOrNull>,
    listener: ResultTableCellIdsListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onResultRowCount function registers a listener that is called whenever
 * the count of result Rows changes.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param listener The function to call when the count changes.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultRowCount(
 *   queryId: MaybeGetter<IdOrNull>,
 *   listener: ResultRowCountListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultRowCount} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultRowCount('petColors', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {color: 'gray'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultRowCount: (
    queryId: MaybeGetter<IdOrNull>,
    listener: ResultRowCountListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onResultRowIds function registers a listener that is called whenever the
 * result Row Ids of a query change.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param listener The function to call when result Row Ids change.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultRowIds(
 *   queryId: MaybeGetter<IdOrNull>,
 *   listener: ResultRowIdsListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultRowIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultRowIds('petColors', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {color: 'gray'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultRowIds: (
    queryId: MaybeGetter<IdOrNull>,
    listener: ResultRowIdsListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onResultSortedRowIds function registers a listener that is called
 * whenever the sorted result Row Ids change.
 * @param queryId The Id of the query to listen to.
 * @param cellId The Id of the Cell to sort by, or `undefined` for default
 * order.
 * @param descending Whether to sort descending.
 * @param offset The index of the first Row to include.
 * @param limit The maximum number of Rows to include, or `undefined` for all.
 * @param listener The function to call when sorted Row Ids change.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultSortedRowIds(
 *   queryId: MaybeGetter<Id>,
 *   cellId: MaybeGetter<Id | undefined>,
 *   descending: MaybeGetter<boolean>,
 *   offset: MaybeGetter<number>,
 *   limit: MaybeGetter<number | undefined>,
 *   listener: ResultSortedRowIdsListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultSortedRowIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultSortedRowIds('petColors', 'color', false, 0,
 * undefined, () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   store.setRow('pets', 'cujo', {color: 'gray'});
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultSortedRowIds: (
    queryId: MaybeGetter<Id>,
    cellId: MaybeGetter<Id | undefined>,
    descending: MaybeGetter<boolean>,
    offset: MaybeGetter<number>,
    limit: MaybeGetter<number | undefined>,
    listener: ResultSortedRowIdsListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onResultRow function registers a listener that is called whenever a
 * result Row changes.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param rowId The Id of the result Row to listen to, or `null` to listen to
 * any result Row.
 * @param listener The function to call when the result Row changes.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultRow(
 *   queryId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   listener: ResultRowListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultRow} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultRow('petColors', 'fido', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'color', 'white');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultRow: (
    queryId: MaybeGetter<IdOrNull>,
    rowId: MaybeGetter<IdOrNull>,
    listener: ResultRowListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onResultCellIds function registers a listener that is called whenever the
 * Cell Ids in a result Row change.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param rowId The Id of the result Row to listen to, or `null` to listen to
 * any result Row.
 * @param listener The function to call when Cell Ids change.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultCellIds(
 *   queryId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   listener: ResultCellIdsListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultCellIds} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultCellIds('petColors', 'fido', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   queries.setQueryDefinition('petColors', 'pets', ({select}) => {
 *     select('color');
 *     select('species');
 *   });
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultCellIds: (
    queryId: MaybeGetter<IdOrNull>,
    rowId: MaybeGetter<IdOrNull>,
    listener: ResultCellIdsListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onResultCell function registers a listener that is called whenever the
 * value of a result Cell changes.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param rowId The Id of the result Row to listen to, or `null` to listen to
 * any result Row.
 * @param cellId The Id of the result Cell to listen to, or `null` to listen to
 * any result Cell.
 * @param listener The function to call when the result Cell changes.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onResultCell(
 *   queryId: MaybeGetter<IdOrNull>,
 *   rowId: MaybeGetter<IdOrNull>,
 *   cellId: MaybeGetter<IdOrNull>,
 *   listener: ResultCellListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onResultCell} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onResultCell('petColors', 'fido', 'color',
 *  () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'color', 'white');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onResultCell: (
    queryId: MaybeGetter<IdOrNull>,
    rowId: MaybeGetter<IdOrNull>,
    cellId: MaybeGetter<IdOrNull>,
    listener: ResultCellListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onParamValues function registers a listener that is called whenever the
 * parameter values for a query change.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param listener The function to call when parameter values change.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onParamValues(
 *   queryId: MaybeGetter<IdOrNull>,
 *   listener: ParamValuesListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onParamValues} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onParamValues('petColors', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   queries.setParamValue('petColors', 'species', 'dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onParamValues: (
    queryId: MaybeGetter<IdOrNull>,
    listener: ParamValuesListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onParamValue function registers a listener that is called whenever a
 * specific parameter value for a query changes.
 * @param queryId The Id of the query to listen to, or `null` to listen to any
 * query.
 * @param paramId The Id of the parameter to listen to, or `null` to listen to
 * any parameter.
 * @param listener The function to call when the parameter value changes.
 * @param queriesOrQueriesId The Queries object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onParamValue(
 *   queryId: MaybeGetter<IdOrNull>,
 *   paramId: MaybeGetter<IdOrNull>,
 *   listener: ParamValueListener,
 *   queriesOrQueriesId?: MaybeGetter<QueriesOrQueriesId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onParamValue} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *   let seen = $state('');
 *
 *   onParamValue('petColors', 'species', () => (seen = 'changed'), queries);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const queries = createQueries(store).setQueryDefinition(
 *   'petColors',
 *   'pets',
 *   ({select}) => select('color'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync(() => {
 *   queries.setParamValue('petColors', 'species', 'dog');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onParamValue: (
    queryId: MaybeGetter<IdOrNull>,
    paramId: MaybeGetter<IdOrNull>,
    listener: ParamValueListener<Schemas>,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /**
 * The onCheckpointIds function registers a listener that is called whenever the
 * Checkpoint Ids change.
 * @param listener The function to call when Checkpoint Ids change.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onCheckpointIds(
 *   listener: CheckpointIdsListener,
 *   checkpointsOrCheckpointsId?: MaybeGetter<
 *     CheckpointsOrCheckpointsId | undefined
 *   >,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onCheckpointIds} from 'tinybase/ui-svelte';
 *
 *   let {checkpoints} = $props();
 *   let seen = $state('');
 *
 *   onCheckpointIds(() => (seen = 'changed'), checkpoints);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'species', 'guide dog');
 *   checkpoints.addCheckpoint('saved');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onCheckpointIds: (
    listener: CheckpointIdsListener<Schemas>,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => void;

  /**
 * The onCheckpoint function registers a listener that is called whenever the
 * label of a specified Checkpoint changes.
 * @param checkpointId The Id of the Checkpoint to listen to, or `null` to
 * listen to any Checkpoint.
 * @param listener The function to call when the Checkpoint label changes.
 * @param checkpointsOrCheckpointsId The Checkpoints object to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onCheckpoint(
 *   checkpointId: MaybeGetter<IdOrNull>,
 *   listener: CheckpointListener,
 *   checkpointsOrCheckpointsId?: MaybeGetter<
 *     CheckpointsOrCheckpointsId | undefined
 *   >,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onCheckpoint} from 'tinybase/ui-svelte';
 *
 *   let {checkpoints} = $props();
 *   let seen = $state('');
 *
 *   onCheckpoint(null, () => (seen = 'changed'), checkpoints);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * flushSync(() => {
 *   store.setCell('pets', 'fido', 'species', 'guide dog');
 *   checkpoints.addCheckpoint('saved');
 * });
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onCheckpoint: (
    checkpointId: MaybeGetter<IdOrNull>,
    listener: CheckpointListener<Schemas>,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => void;

  /**
 * The onPersisterStatus function registers a listener that is called whenever
 * the status of a Persister changes.
 * @param listener The function to call when the status changes.
 * @param persisterOrPersisterId The Persister to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onPersisterStatus(
 *   listener: StatusListener,
 *   persisterOrPersisterId?: MaybeGetter<PersisterOrPersisterId | undefined>,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onPersisterStatus} from 'tinybase/ui-svelte';
 *
 *   let {persister} = $props();
 *   let seen = $state('');
 *
 *   onPersisterStatus(() => (seen = 'changed'), persister);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import {createCustomPersister} from 'tinybase/persisters';
 * import App from './App.svelte';
 *
 * const store = createStore()
 *   .setTables({
 *     pets: {
 *       fido: {species: 'dog', color: 'brown', sold: false, next: 'felix'},
 *       felix: {species: 'cat', color: 'black', sold: true},
 *     },
 *     species: {dog: {price: 5}, cat: {price: 4}},
 *   })
 *   .setValues({open: true, employees: 3});
 * const persister = createCustomPersister(
 *   store,
 *   async () => undefined,
 *   async () => {},
 *   () => undefined,
 *   () => {},
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {persister}}));
 * await persister.save();
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onPersisterStatus: (
    listener: StatusListener<Schemas>,
    persisterOrPersisterId?: MaybeGetter<
      PersisterOrPersisterId<Schemas> | undefined
    >,
  ) => void;

  /**
 * The onSynchronizerStatus function registers a listener that is called
 * whenever the status of a Synchronizer changes.
 * @param listener The function to call when the status changes.
 * @param synchronizerOrSynchronizerId The Synchronizer to use, or its Id.
 * @example
 * This example registers a Svelte listener and responds to a TinyBase change.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * onSynchronizerStatus(
 *   listener: StatusListener,
 *   synchronizerOrSynchronizerId?: MaybeGetter<
 *     SynchronizerOrSynchronizerId | undefined
 *   >,
 * ): void;
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {onSynchronizerStatus} from 'tinybase/ui-svelte';
 *
 *   let {synchronizer} = $props();
 *   let seen = $state('');
 *
 *   onSynchronizerStatus(() => (seen = 'changed'), synchronizer);
 * </script>
 *
 * {seen}
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMergeableStore} from 'tinybase';
 * import {createLocalSynchronizer} from 'tinybase/synchronizers/synchronizer-local';
 * import App from './App.svelte';
 *
 * const store = createMergeableStore();
 * const synchronizer = createLocalSynchronizer(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {synchronizer}}));
 * await synchronizer.save();
 * flushSync();
 * console.log(app.textContent);
 * // -> 'changed'
 * ```
 * @category Listener
 * @since v8.1.0
 */
  onSynchronizerStatus: (
    listener: StatusListener<Schemas>,
    synchronizerOrSynchronizerId?: MaybeGetter<
      SynchronizerOrSynchronizerId<Schemas> | undefined
    >,
  ) => void;

  /**
 * The provideStore function registers a Store with a given Id into the current
 * Provider context, making it available to all descendant components.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * provideStore(storeId: Id, store: Store): void;
 * ```
 *
 * The provideStore function must be called inside a Svelte component's
 * `<script>` block that is a descendant of a Provider component.
 * @param storeId The Id to register the Store under.
 * @param store The Store to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {provideStore} from 'tinybase/ui-svelte';
 *
 *   let {store} = $props();
 *
 *   provideStore('registered', store);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getStoreIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getStoreIds();
 * </script>
 *
 * {JSON.stringify(getStoreIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {store} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {store} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  provideStore: (storeId: Id, store: Store<Schemas>) => void;

  /**
 * The provideMetrics function registers a Metrics object with a given Id into
 * the current Provider context.
 * @param metricsId The Id to register the Metrics object under.
 * @param metrics The Metrics object to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * provideMetrics(metricsId: Id, metrics: Metrics): void;
 * ```
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {provideMetrics} from 'tinybase/ui-svelte';
 *
 *   let {metrics} = $props();
 *
 *   provideMetrics('registered', metrics);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getMetricsIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getMetricsIds();
 * </script>
 *
 * {JSON.stringify(getMetricsIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {metrics} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {metrics} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMetrics, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const metrics = createMetrics(store).setMetricDefinition(
 *   'petCount',
 *   'pets',
 *   'count',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {metrics}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  provideMetrics: (metricsId: Id, metrics: Metrics<Schemas>) => void;

  /**
 * The provideIndexes function registers an Indexes object with a given Id into
 * the current Provider context.
 * @param indexesId The Id to register the Indexes object under.
 * @param indexes The Indexes object to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * provideIndexes(indexesId: Id, indexes: Indexes): void;
 * ```
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {provideIndexes} from 'tinybase/ui-svelte';
 *
 *   let {indexes} = $props();
 *
 *   provideIndexes('registered', indexes);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getIndexesIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getIndexesIds();
 * </script>
 *
 * {JSON.stringify(getIndexesIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {indexes} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {indexes} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const indexes = createIndexes(store).setIndexDefinition(
 *   'bySpecies',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  provideIndexes: (indexesId: Id, indexes: Indexes<Schemas>) => void;

  /**
 * The provideRelationships function registers a Relationships object with a
 * given Id into the current Provider context.
 * @param relationshipsId The Id to register the Relationships object under.
 * @param relationships The Relationships object to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * provideRelationships(
 *   relationshipsId: Id,
 *   relationships: Relationships,
 * ): void;
 * ```
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {provideRelationships} from 'tinybase/ui-svelte';
 *
 *   let {relationships} = $props();
 *
 *   provideRelationships('registered', relationships);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getRelationshipsIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getRelationshipsIds();
 * </script>
 *
 * {JSON.stringify(getRelationshipsIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {relationships} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {relationships} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const relationships = createRelationships(store).setRelationshipDefinition(
 *   'petSpecies',
 *   'pets',
 *   'pets',
 *   'species',
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  provideRelationships: (
    relationshipsId: Id,
    relationships: Relationships<Schemas>,
  ) => void;

  /**
 * The provideQueries function registers a Queries object with a given Id into
 * the current Provider context.
 * @param queriesId The Id to register the Queries object under.
 * @param queries The Queries object to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * provideQueries(queriesId: Id, queries: Queries): void;
 * ```
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {provideQueries} from 'tinybase/ui-svelte';
 *
 *   let {queries} = $props();
 *
 *   provideQueries('registered', queries);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getQueriesIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getQueriesIds();
 * </script>
 *
 * {JSON.stringify(getQueriesIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {queries} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {queries} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const queries = createQueries(store).setQueryDefinition(
 *   'petSpecies',
 *   'pets',
 *   ({select}) => select('species'),
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  provideQueries: (queriesId: Id, queries: Queries<Schemas>) => void;

  /**
 * The provideCheckpoints function registers a Checkpoints object with a given
 * Id into the current Provider context.
 * @param checkpointsId The Id to register the Checkpoints object under.
 * @param checkpoints The Checkpoints object to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * provideCheckpoints(
 *   checkpointsId: Id,
 *   checkpoints: Checkpoints,
 * ): void;
 * ```
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {provideCheckpoints} from 'tinybase/ui-svelte';
 *
 *   let {checkpoints} = $props();
 *
 *   provideCheckpoints('registered', checkpoints);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getCheckpointsIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getCheckpointsIds();
 * </script>
 *
 * {JSON.stringify(getCheckpointsIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {checkpoints} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {checkpoints} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createCheckpoints, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const checkpoints = createCheckpoints(store);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {checkpoints}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  provideCheckpoints: (
    checkpointsId: Id,
    checkpoints: Checkpoints<Schemas>,
  ) => void;

  /**
 * The providePersister function registers a Persister with a given Id into the
 * current Provider context.
 * @param persisterId The Id to register the Persister under.
 * @param persister The Persister to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * providePersister(
 *   persisterId: Id,
 *   persister: AnyPersister,
 * ): void;
 * ```
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {providePersister} from 'tinybase/ui-svelte';
 *
 *   let {persister} = $props();
 *
 *   providePersister('registered', persister);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getPersisterIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getPersisterIds();
 * </script>
 *
 * {JSON.stringify(getPersisterIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {persister} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {persister} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import {createCustomPersister} from 'tinybase/persisters';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'species', 'dog');
 * const persister = createCustomPersister(
 *   store,
 *   async () => undefined,
 *   async () => {},
 *   () => undefined,
 *   () => {},
 * );
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {persister}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  providePersister: (persisterId: Id, persister: AnyPersister<Schemas>) => void;

  /**
 * The provideSynchronizer function registers a Synchronizer with a given Id
 * into the current Provider context.
 * @param synchronizerId The Id to register the Synchronizer under.
 * @param synchronizer The Synchronizer to register.
 * @example
 * This example registers a TinyBase object dynamically in a Provider context.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * provideSynchronizer(
 *   synchronizerId: Id,
 *   synchronizer: Synchronizer,
 * ): void;
 * ```
 *
 * ```svelte file=Registrar.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {provideSynchronizer} from 'tinybase/ui-svelte';
 *
 *   let {synchronizer} = $props();
 *
 *   provideSynchronizer('registered', synchronizer);
 * </script>
 * ```
 *
 * ```svelte file=Reader.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {getSynchronizerIds} from 'tinybase/ui-svelte';
 *
 *   const ids = getSynchronizerIds();
 * </script>
 *
 * {JSON.stringify(getSynchronizerIds().current)}
 * ```
 *
 * ```svelte file=App.svelte
 * <svelte:options runes={true} />
 *
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import Reader from './Reader.svelte';
 *   import Registrar from './Registrar.svelte';
 *
 *   let {synchronizer} = $props();
 * </script>
 *
 * <Provider>
 *   <Registrar {synchronizer} />
 *   <Reader />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createMergeableStore} from 'tinybase';
 * import {createLocalSynchronizer} from 'tinybase/synchronizers/synchronizer-local';
 * import App from './App.svelte';
 *
 * const synchronizer = createLocalSynchronizer(createMergeableStore());
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {synchronizer}}));
 * flushSync();
 * console.log(app.textContent);
 * // -> ' ["registered"]'
 * ```
 * @category Provider
 * @since v8.1.0
 */
  provideSynchronizer: (
    synchronizerId: Id,
    synchronizer: Synchronizer<Schemas>,
  ) => void;
};
