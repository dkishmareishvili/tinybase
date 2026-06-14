import type {Component, JSXElement} from 'solid-js';
import type {Checkpoints} from '../../../checkpoints/with-schemas/index.d.ts';
import type {Callback, Id} from '../../../common/with-schemas/index.d.ts';
import type {Indexes} from '../../../indexes/with-schemas/index.d.ts';
import type {Metrics} from '../../../metrics/with-schemas/index.d.ts';
import type {
  Persister,
  Persists,
} from '../../../persisters/with-schemas/index.d.ts';
import type {Queries} from '../../../queries/with-schemas/index.d.ts';
import type {Relationships} from '../../../relationships/with-schemas/index.d.ts';
import type {
  OptionalSchemas,
  Store,
} from '../../../store/with-schemas/index.d.ts';
import type {Synchronizer} from '../../../synchronizers/with-schemas/index.d.ts';
import type {
  CellIdFromSchema,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../store/with-schemas/index.d.ts';
import type {
  CheckpointsOrCheckpointsId,
  IndexesOrIndexesId,
  MetricsOrMetricsId,
  QueriesOrQueriesId,
  RelationshipsOrRelationshipsId,
  StoreOrStoreId,
} from '../../ui/with-schemas/index.d.ts';

export type UndoOrRedoInformation = [boolean, Callback, Id | undefined, string];

export type GetId<Schemas extends OptionalSchemas, Parameter, Id> = (
  parameter: Parameter,
  store: Store<Schemas>,
) => Id;

export type ExtraProps = {[propName: string]: any};

export type TablesProps<Schemas extends OptionalSchemas> = {
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId<Schemas>;
  /**
 * A component for rendering each Table in the Store (to override the default
 * TableView component).
 * @category Props
 * @since v8.3.0
 */
  readonly tableComponent?: Component<TableProps<Schemas>>;
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

export type TableProps<
  Schemas extends OptionalSchemas,
  TableIds extends TableIdFromSchema<Schemas[0]> = TableIdFromSchema<
    Schemas[0]
  >,
> = TableIds extends infer TableId
  ? TableId extends TableIdFromSchema<Schemas[0]>
    ? {
        /**
 * The Id of the Table in the Store to be rendered.
 * @category Props
 * @since v8.3.0
 */
        readonly tableId: TableId;
        /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
        readonly store?: StoreOrStoreId<Schemas>;
        /**
 * A custom component for rendering each Row in the Table (to override the
 * default RowView component).
 * @category Props
 * @since v8.3.0
 */
        readonly rowComponent?: Component<RowProps<Schemas, TableId>>;
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
        readonly customCellIds?: CellIdFromSchema<Schemas[0], TableId>[];
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
      }
    : never
  : never;

export type SortedTableProps<
  Schemas extends OptionalSchemas,
  TableIds extends TableIdFromSchema<Schemas[0]> = TableIdFromSchema<
    Schemas[0]
  >,
> = TableIds extends infer TableId
  ? TableId extends TableIdFromSchema<Schemas[0]>
    ? {
        /**
 * The Id of the Table in the Store to be rendered.
 * @category Props
 * @since v8.3.0
 */
        readonly tableId: TableId;
        /**
 * The Id of the Cell whose values are used for the sorting. If omitted, the
 * view will sort the Row Id itself.
 * @category Props
 * @since v8.3.0
 */
        readonly cellId?: CellIdFromSchema<Schemas[0], TableId>;
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
        readonly store?: StoreOrStoreId<Schemas>;
        /**
 * A custom component for rendering each Row in the Table (to override the
 * default RowView component).
 * @category Props
 * @since v8.3.0
 */
        readonly rowComponent?: Component<RowProps<Schemas, TableId>>;
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
        readonly customCellIds?: CellIdFromSchema<Schemas[0], TableId>[];
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
      }
    : never
  : never;

export type RowProps<
  Schemas extends OptionalSchemas,
  TableIds extends TableIdFromSchema<Schemas[0]> = TableIdFromSchema<
    Schemas[0]
  >,
> = TableIds extends infer TableId
  ? TableId extends TableIdFromSchema<Schemas[0]>
    ? {
        /**
 * The Id of the Table in the Store.
 * @category Props
 * @since v8.3.0
 */
        readonly tableId: TableId;
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
        readonly store?: StoreOrStoreId<Schemas>;
        /**
 * A custom component for rendering each Cell in the Row (to override the
 * default CellView component).
 * @category Props
 * @since v8.3.0
 */
        readonly cellComponent?: Component<CellProps<Schemas, TableId>>;
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
        readonly customCellIds?: CellIdFromSchema<Schemas[0], TableId>[];
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
      }
    : never
  : never;

export type CellProps<
  Schemas extends OptionalSchemas,
  TableIds extends TableIdFromSchema<Schemas[0]> = TableIdFromSchema<
    Schemas[0]
  >,
> = TableIds extends infer TableId
  ? TableId extends TableIdFromSchema<Schemas[0]>
    ? CellPropsForTableIdAndCellId<
        Schemas,
        TableId,
        CellIdFromSchema<Schemas[0], TableId>
      >
    : never
  : never;

export type CellPropsForTableIdAndCellId<
  Schemas extends OptionalSchemas,
  TableId extends TableIdFromSchema<Schemas[0]>,
  CellId extends CellIdFromSchema<Schemas[0], TableId>,
> = {
  /**
 * The Id of the Table in the Store.
 * @category Props
 * @since v8.3.0
 */
  readonly tableId: TableId;
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
  readonly cellId: CellId;
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId<Schemas>;
  /**
 * Whether the component should also render the Id of the Cell to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

export type ValuesProps<Schemas extends OptionalSchemas> = {
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId<Schemas>;
  /**
 * A custom component for rendering each Value in the Store (to override the
 * default ValueView component).
 * @category Props
 * @since v8.3.0
 */
  readonly valueComponent?: Component<ValueProps<Schemas>>;
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

export type ValueProps<Schemas extends OptionalSchemas> = {
  /**
 * The Id of the Value in the Row to be rendered.
 * @category Props
 * @since v8.3.0
 */
  readonly valueId: ValueIdFromSchema<Schemas[1]>;
  /**
 * The Store to be accessed: omit for the default context Store, provide an Id
 * for a named context Store, or provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: StoreOrStoreId<Schemas>;
  /**
 * Whether the component should also render the Id of the Value to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

export type MetricProps<Schemas extends OptionalSchemas> = {
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
  readonly metrics?: MetricsOrMetricsId<Schemas>;
  /**
 * Whether the component should also render the Id of the Metric to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

export type IndexProps<Schemas extends OptionalSchemas> = {
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
  readonly indexes?: IndexesOrIndexesId<Schemas>;
  /**
 * A component for rendering each Slice in the Index.
 * @category Props
 * @since v8.3.0
 */
  readonly sliceComponent?: Component<SliceProps<Schemas>>;
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

export type SliceProps<Schemas extends OptionalSchemas> = {
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
  readonly indexes?: IndexesOrIndexesId<Schemas>;
  /**
 * A component for rendering each Row in the Index.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps<Schemas>>;
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

export type RemoteRowProps<Schemas extends OptionalSchemas> = {
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
  readonly relationships?: RelationshipsOrRelationshipsId<Schemas>;
  /**
 * A component for rendering each (remote, local, or linked) Row in the
 * Relationship.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps<Schemas>>;
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

export type LocalRowsProps<Schemas extends OptionalSchemas> = {
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
  readonly relationships?: RelationshipsOrRelationshipsId<Schemas>;
  /**
 * A component for rendering each (remote, local, or linked) Row in the
 * Relationship.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps<Schemas>>;
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

export type LinkedRowsProps<Schemas extends OptionalSchemas> = {
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
  readonly relationships?: RelationshipsOrRelationshipsId<Schemas>;
  /**
 * A component for rendering each (remote, local, or linked) Row in the
 * Relationship.
 * @category Props
 * @since v8.3.0
 */
  readonly rowComponent?: Component<RowProps<Schemas>>;
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

export type ResultTableProps<Schemas extends OptionalSchemas> = {
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
  readonly queries?: QueriesOrQueriesId<Schemas>;
  /**
 * A custom component for rendering each Row in the Table (to override the
 * default ResultRowView component).
 * @category Props
 * @since v8.3.0
 */
  readonly resultRowComponent?: Component<ResultRowProps<Schemas>>;
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

export type ResultSortedTableProps<Schemas extends OptionalSchemas> = {
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
  readonly queries?: QueriesOrQueriesId<Schemas>;
  /**
 * A custom component for rendering each Row in the Table (to override the
 * default ResultRowView component).
 * @category Props
 * @since v8.3.0
 */
  readonly resultRowComponent?: Component<ResultRowProps<Schemas>>;
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

export type ResultRowProps<Schemas extends OptionalSchemas> = {
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
  readonly queries?: QueriesOrQueriesId<Schemas>;
  /**
 * A custom component for rendering each Cell in the Row (to override the
 * default CellView component).
 * @category Props
 * @since v8.3.0
 */
  readonly resultCellComponent?: Component<ResultCellProps<Schemas>>;
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

export type ResultCellProps<Schemas extends OptionalSchemas> = {
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
  readonly queries?: QueriesOrQueriesId<Schemas>;
  /**
 * Whether the component should also render the Id of the Cell to assist with
 * debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

export type CheckpointProps<Schemas extends OptionalSchemas> = {
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
  readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
  /**
 * Whether the component should also render the Id of the checkpoint to assist
 * with debugging.
 * @category Props
 * @since v8.3.0
 */
  readonly debugIds?: boolean;
};

export type BackwardCheckpointsProps<Schemas extends OptionalSchemas> = {
  /**
 * The Checkpoints object to be accessed: omit for the default context
 * Checkpoints object, provide an Id for a named context Checkpoints object, or
 * provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
  /**
 * A component for rendering each checkpoint in the Checkpoints object.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointComponent?: Component<CheckpointProps<Schemas>>;
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

export type CurrentCheckpointProps<Schemas extends OptionalSchemas> = {
  /**
 * The Checkpoints object to be accessed: omit for the default context
 * Checkpoints object, provide an Id for a named context Checkpoints object, or
 * provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
  /**
 * A component for rendering each checkpoint in the Checkpoints object.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointComponent?: Component<CheckpointProps<Schemas>>;
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

export type ForwardCheckpointsProps<Schemas extends OptionalSchemas> = {
  /**
 * The Checkpoints object to be accessed: omit for the default context
 * Checkpoints object, provide an Id for a named context Checkpoints object, or
 * provide an explicit reference.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: CheckpointsOrCheckpointsId<Schemas>;
  /**
 * A component for rendering each checkpoint in the Checkpoints object.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointComponent?: Component<CheckpointProps<Schemas>>;
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

export type ProviderProps<Schemas extends OptionalSchemas> = {
  /**
 * A default single Store object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly store?: Store<Schemas>;
  /**
 * An object containing multiple Store objects that will be available within the
 * Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly storesById?: {[storeId: Id]: Store<Schemas>};
  /**
 * A default single Metrics object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly metrics?: Metrics<Schemas>;
  /**
 * An object containing multiple Metrics objects that will be available within
 * the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly metricsById?: {[metricsId: Id]: Metrics<Schemas>};
  /**
 * A default single Indexes object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly indexes?: Indexes<Schemas>;
  /**
 * An object containing multiple Indexes objects that will be available within
 * the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly indexesById?: {[indexesId: Id]: Indexes<Schemas>};
  /**
 * A default single Relationships object that will be available within the
 * Provider context.
 * @category Props
 * @since v8.3.0
 */
  readonly relationships?: Relationships<Schemas>;
  /**
 * An object containing multiple Relationships objects that will be available
 * within the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly relationshipsById?: {[relationshipsId: Id]: Relationships<Schemas>};
  /**
 * A default single Queries object that will be available within the Provider
 * context, since v2.0.
 * @category Props
 * @since v8.3.0
 */
  readonly queries?: Queries<Schemas>;
  /**
 * An object containing multiple Queries objects that will be available within
 * the Provider context by their Id, since v2.0.
 * @category Props
 * @since v8.3.0
 */
  readonly queriesById?: {[queriesId: Id]: Queries<Schemas>};
  /**
 * A default single Checkpoints object that will be available within the
 * Provider context.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpoints?: Checkpoints<Schemas>;
  /**
 * An object containing multiple Checkpoints objects that will be available
 * within the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly checkpointsById?: {[checkpointsId: Id]: Checkpoints<Schemas>};
  /**
 * A default single Persister object that will be available within the Provider
 * context.
 * @category Props
 * @since v8.3.0
 */
  readonly persister?: Persister<Schemas, Persists.StoreOrMergeableStore>;
  /**
 * An object containing multiple Persister objects that will be available within
 * the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly persistersById?: {
    [persisterId: Id]: Persister<Schemas, Persists.StoreOrMergeableStore>;
  };
  /**
 * A default single Synchronizer object that will be available within the
 * Provider context.
 * @category Props
 * @since v8.3.0
 */
  readonly synchronizer?: Synchronizer<Schemas>;
  /**
 * An object containing multiple Synchronizer objects that will be available
 * within the Provider context by their Id.
 * @category Props
 * @since v8.3.0
 */
  readonly synchronizersById?: {[synchronizerId: Id]: Synchronizer<Schemas>};
};

export type ComponentReturnType = JSXElement;
