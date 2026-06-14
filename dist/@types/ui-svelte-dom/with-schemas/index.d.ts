/**
 * The ui-svelte-dom module of the TinyBase project provides components to make
 * it easy to create web-based reactive apps with Store objects.
 *
 * The components in this module use the Svelte DOM runtime and so are not
 * appropriate for environments like Svelte-native-like (although those in the
 * lower-level ui-svelte module are).
 * @see UI Components (Svelte) demos
 * @packageDocumentation
 * @module ui-svelte-dom
 * @since v4.1.0
 */
import type {Component} from 'svelte';
import type {
  CellIdFromSchema,
  TableIdFromSchema,
} from '../../_internal/store/with-schemas/index.d.ts';
import type {
  CellProps,
  CellPropsForTableIdAndCellId,
  ResultCellProps,
  RowProps,
  ValueProps,
} from '../../_internal/ui-react/with-schemas/index.d.ts';
import type {
  IndexesOrIndexesId,
  QueriesOrQueriesId,
  RelationshipsOrRelationshipsId,
  StoreOrStoreId,
} from '../../_internal/ui/with-schemas/index.d.ts';
import type {Id, Ids} from '../../common/with-schemas/index.d.ts';
import type {NoSchemas} from '../../store/index.d.ts';
import type {OptionalSchemas} from '../../store/with-schemas/index.d.ts';

/**
 * The CustomCell object is used to configure custom cell rendering in an HTML
 * table.
 * @category Configuration
 * @since v4.1.0
 */
export type CustomCell<
  Schemas extends OptionalSchemas,
  TableId extends TableIdFromSchema<Schemas[0]>,
  CellId extends CellIdFromSchema<Schemas[0], TableId>,
> = {
  /**
   * An optional string that will be used as the label at the top of the table
   * column for this Cell.
   * @category Prop
   * @since v4.1.0
   */
  label?: string;
  /**
   * An optional custom component for rendering each Cell in the Table (to
   * override the default CellView component).
   * @category Prop
   * @since v4.1.0
   */
  component?: Component<CellPropsForTableIdAndCellId<Schemas, TableId, CellId>>;
  /**
   * An optional function for generating extra props for each custom Cell
   * component based on Row and Cell Id.
   * @category Prop
   * @since v4.1.0
   */
  getComponentProps?: (rowId: Id, cellId: CellId) => {[prop: string]: any};
};

/**
 * The CustomResultCell object is used to configure custom cell rendering for
 * query results in an HTML table.
 * @category Configuration
 * @since v4.1.0
 */
export type CustomResultCell<Schemas extends OptionalSchemas> = {
  /**
   * An optional string that will be used as the label at the top of the table
   * column for this Cell.
   * @category Prop
   * @since v4.1.0
   */
  label?: string;
  /**
   * An optional custom component for rendering each Cell in the ResultTable (to
   * override the default ResultCellView component).
   * @category Prop
   * @since v4.1.0
   */
  component?: Component<ResultCellProps<Schemas>>;
  /**
   * An optional function for generating extra props for each custom Cell
   * component based on Row and Cell Id.
   * @category Prop
   * @since v4.1.0
   */
  getComponentProps?: (rowId: Id, cellId: Id) => {[prop: string]: any};
};

/**
 * The ExtraRowCell object is used to configure the rendering of extra cells in
 * an HTML table that's displaying a ResultTable or Table - before or after the
 * regular data cells.
 * @category Configuration
 * @since v6.6.0
 */
export type ExtraRowCell<
  Schemas extends OptionalSchemas,
  TableId extends TableIdFromSchema<Schemas[0]>,
> = {
  /**
   * A string that will be used as the label at the top of the column for this
   * Cell.
   * @category Prop
   * @since v6.6.0
   */
  label: string;
  /**
   * A custom component for rendering each extra Cell in the table, and which
   * will be passed props for the Row with which it is placed.
   * @category Prop
   * @since v6.6.0
   */
  component: Component<RowProps<Schemas, TableId>>;
};

/**
 * The ExtraValueCell object is used to configure the rendering of extra cells
 * in an HTML table that's displaying Values - before or after the regular data
 * cells.
 * @category Configuration
 * @since v6.6.0
 */
export type ExtraValueCell<Schemas extends OptionalSchemas> = {
  /**
   * A string that will be used as the label at the top of the column for this
   * Cell.
   * @category Prop
   * @since v6.6.0
   */
  label: string;
  /**
   * A custom component for rendering each extra Cell in the table, and which
   * will be passed props for the Value with which it is placed.
   * @category Prop
   * @since v6.6.0
   */
  component: Component<ValueProps<Schemas>>;
};

/**
 * HtmlTableProps props are used for components that will render in an HTML
 * table, such as the TableInHtmlTable component or SortedTableInHtmlTable
 * component.
 * @category Props
 * @since v4.1.0
 */
export type HtmlTableProps = {
  /**
   * A string className to use on the root of the resulting element.
   * @category Prop
   * @since v4.1.0
   */
  readonly className?: string;
  /**
   * Whether a header row should be rendered at the top of the table, defaulting
   * to `true`.
   * @category Prop
   * @since v4.1.0
   */
  readonly headerRow?: boolean;
  /**
   * Whether an Id column should be rendered on the left of the table,
   * defaulting to `true`.
   * @category Prop
   * @since v4.1.0
   */
  readonly idColumn?: boolean;
};

/**
 * TableInHtmlTableProps props are used for components that will render a Table
 * in an HTML table, such as the TableInHtmlTable component.
 * @category Props
 * @since v4.1.0
 */
export type TableInHtmlTableProps<
  Schemas extends OptionalSchemas,
  TableIds extends TableIdFromSchema<Schemas[0]> = TableIdFromSchema<
    Schemas[0]
  >,
> = TableIds extends infer TableId
  ? TableId extends TableIdFromSchema<Schemas[0]>
    ? {
        /**
   * The Id of the Table in the Store to be rendered.
   * @category Prop
   * @since v4.1.0
   */
        readonly tableId: TableId;
        /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Prop
   * @since v4.1.0
   */
        readonly store?: StoreOrStoreId<Schemas>;
        /**
   * Whether the Cells should be editable. This affects the default CellView
   * component (to use the EditableCellView component instead) but of course
   * will not affect custom Cell components if you have set them.
   * @category Prop
   * @since v4.1.0
   */
        readonly editable?: boolean;
        /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * Table's Cells in a given order. This can also be an object with the desired
   * Cell Ids as keys, and with a value that can either be a string label to
   * show in the column header, or a CustomCell object to further configure the
   * column.
   * @category Prop
   * @since v4.1.0
   */
        readonly customCells?:
          | CellIdFromSchema<Schemas[0], TableId>[]
          | {
              [CellId in CellIdFromSchema<Schemas[0], TableId>]?:
                | string
                | CustomCell<Schemas, TableId, CellId>;
            };
      }
    : never
  : never;

/**
 * SortedTableInHtmlTableProps props are used for components that will render a
 * sorted Table in an HTML table, such as the SortedTableInHtmlTable component.
 * @category Props
 * @since v4.1.0
 */
export type SortedTableInHtmlTableProps<
  Schemas extends OptionalSchemas,
  TableIds extends TableIdFromSchema<Schemas[0]> = TableIdFromSchema<
    Schemas[0]
  >,
> = TableIds extends infer TableId
  ? TableId extends TableIdFromSchema<Schemas[0]>
    ? {
        /**
   * The Id of the Table in the Store to be rendered.
   * @category Prop
   * @since v4.1.0
   */
        readonly tableId: TableId;
        /**
   * The Id of the Cell whose values are used for the sorting. If omitted, the
   * view will sort the Row Id itself.
   * @category Prop
   * @since v4.1.0
   */
        readonly cellId?: CellIdFromSchema<Schemas[0], TableId>;
        /**
   * Whether the sorting should be in descending order.
   * @category Prop
   * @since v4.1.0
   */
        readonly descending?: boolean;
        /**
   * The number of Row Ids to skip for pagination purposes.
   * @category Prop
   * @since v4.1.0
   */
        readonly offset?: number;
        /**
   * The maximum number of Row Ids to return.
   * @category Prop
   * @since v4.1.0
   */
        readonly limit?: number;
        /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Prop
   * @since v4.1.0
   */
        readonly store?: StoreOrStoreId<Schemas>;
        /**
   * Whether the Cells should be editable. This affects the default CellView
   * component (to use the EditableCellView component instead) but of course
   * will not affect custom Cell components if you have set them.
   * @category Prop
   * @since v4.1.0
   */
        readonly editable?: boolean;
        /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * Table's Cells in a given order. This can also be an object with the desired
   * Cell Ids as keys, and with a value that can either be a string label to
   * show in the column header, or a CustomCell object to further configure the
   * column.
   * @category Prop
   * @since v4.1.0
   */
        readonly customCells?:
          | CellIdFromSchema<Schemas[0], TableId>[]
          | {
              [CellId in CellIdFromSchema<Schemas[0], TableId>]?:
                | string
                | CustomCell<Schemas, TableId, CellId>;
            };
        /**
   * Whether the table should be interactive such that clicking a header changes
   * the sorting and/or direction.
   * @category Prop
   * @since v4.1.0
   */
        readonly sortOnClick?: boolean;
        /**
   * Either `true` to show the default SortedTablePaginator for the Table, or
   * provide your own paginator component that takes SortedTablePaginatorProps.
   * @category Prop
   * @since v4.1.0
   */
        readonly paginator?: boolean | Component<SortedTablePaginatorProps>;
        /**
   * A function that is called whenever the sorting or pagination of the Table
   * is changed by the user, invoked with the sorted Cell Id, whether descending
   * or not, and the offset of the pagination.
   * @category Prop
   * @since v4.1.0
   */
        readonly onChange?: (
          sortAndOffset: [
            cellId: CellIdFromSchema<Schemas[0], TableId> | undefined,
            descending: boolean,
            offset: number,
          ],
        ) => void;
      }
    : never
  : never;

/**
 * ValuesInHtmlTableProps props are used for components that will render Values
 * in an HTML table, such as the ValuesInHtmlTable component.
 * @category Props
 * @since v4.1.0
 */
export type ValuesInHtmlTableProps<Schemas extends OptionalSchemas> = {
  /**
   * The Store to be accessed: omit for the default context Store, provide an Id
   * for a named context Store, or provide an explicit reference.
   * @category Prop
   * @since v4.1.0
   */
  readonly store?: StoreOrStoreId<Schemas>;
  /**
   * Whether the Values should be editable. This affects the default ValueView
   * component (to use the EditableValueView component instead) but of course
   * will not affect a custom valueComponent if you have set one.
   * @category Prop
   * @since v4.1.0
   */
  readonly editable?: boolean;
  /**
   * A custom component for rendering each Value in the Store (to override the
   * default ValueView component).
   * @category Prop
   * @since v4.1.0
   */
  readonly valueComponent?: Component<ValueProps<Schemas>>;
  /**
   * A function for generating extra props for each custom Value component based
   * on its Id.
   * @category Prop
   * @since v4.1.0
   */
  readonly getValueComponentProps?: (valueId: Id) => {[prop: string]: any};
};

/**
 * SliceInHtmlTableProps props are used for components that will render an Index
 * Slice in an HTML table, such as the SliceInHtmlTable component.
 * @category Props
 * @since v4.1.0
 */
export type SliceInHtmlTableProps<Schemas extends OptionalSchemas> = {
  /**
   * The Id of the Index in the Indexes object.
   * @category Prop
   * @since v4.1.0
   */
  readonly indexId: Id;
  /**
   * The Id of the Slice in the Index to be rendered.
   * @category Prop
   * @since v4.1.0
   */
  readonly sliceId: Id;
  /**
   * The Indexes object to be accessed: omit for the default context Indexes
   * object, provide an Id for a named context Indexes object, or provide an
   * explicit reference.
   * @category Prop
   * @since v4.1.0
   */
  readonly indexes?: IndexesOrIndexesId<Schemas>;
  /**
   * Whether the Cells should be editable. This affects the default CellView
   * component (to use the EditableCellView component instead) but of course
   * will not affect custom Cell components if you have set them.
   * @category Prop
   * @since v4.1.0
   */
  readonly editable?: boolean;
  /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * Slice's Cells in a given order. This can also be an object with the desired
   * Cell Ids as keys, and with a value that can either be a string label to
   * show in the column header, or a CustomCell object to further configure the
   * column.
   * @category Prop
   * @since v4.1.0
   */
  readonly customCells?:
    | Ids
    | {[cellId: Id]: string | CustomCell<NoSchemas, Id, Id>};
};

/**
 * RelationshipInHtmlTableProps props are used for components that will render
 * the contents of the two Tables linked by a Relationship as an HTML table,
 * such as the RelationshipInHtmlTable component.
 *
 * Note the use of dotted 'tableId.cellId' string pairs when specifying custom
 * rendering for the cells in this table, since Cells from both the
 * relationship's 'local' and 'remote' Table objects can be rendered and need to
 * be distinguished.
 * @category Props
 * @since v4.1.0
 */
export type RelationshipInHtmlTableProps<Schemas extends OptionalSchemas> = {
  /**
   * The Id of the relationship in the Relationships object for which the
   * relationship Table Rows will be rendered.
   * @category Prop
   * @since v4.1.0
   */
  readonly relationshipId: Id;
  /**
   * The Relationships object to be accessed: omit for the default context
   * Relationships object, provide an Id for a named context Relationships
   * object, or provide an explicit reference.
   * @category Prop
   * @since v4.1.0
   */
  readonly relationships?: RelationshipsOrRelationshipsId<Schemas>;
  /**
   * Whether the Cells should be editable. This affects the default CellView
   * component (to use the EditableCellView component instead) but of course
   * will not affect custom Cell components if you have set them.
   * @category Prop
   * @since v4.1.0
   */
  readonly editable?: boolean;
  /**
   * An optional list of dotted 'tableId.cellId' string pairs to use for
   * rendering a prescribed set of the relationship Tables' Cells in a given
   * order. This can also be an object with the desired 'tableId.cellId' string
   * pairs as keys, and with a value that can either be a string label to show
   * in the column header, or a CustomCell object to further configure the
   * column.
   * @category Prop
   * @since v4.1.0
   */
  readonly customCells?:
    | Ids
    | {[cellId: Id]: string | CustomCell<NoSchemas, Id, Id>};
};

/**
 * ResultTableInHtmlTableProps props are used for components that will render a
 * ResultTable in an HTML table, such as the ResultTableInHtmlTable component.
 * @category Props
 * @since v4.1.0
 */
export type ResultTableInHtmlTableProps<Schemas extends OptionalSchemas> = {
  /**
   * The Id of the query in the Queries object for which the ResultTable will be
   * rendered.
   * @category Prop
   * @since v4.1.0
   */
  readonly queryId: Id;
  /**
   * The Queries object to be accessed: omit for the default context Queries
   * object, provide an Id for a named context Queries object, or provide an
   * explicit reference.
   * @category Prop
   * @since v4.1.0
   */
  readonly queries?: QueriesOrQueriesId<Schemas>;
  /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * ResultTable's Cells in a given order. This can also be an object with the
   * desired Cell Ids as keys, and with a value that can either be a string
   * label to show in the column header, or a ResultCustomCell object to further
   * configure the column.
   * @category Prop
   * @since v4.1.0
   */
  readonly customCells?:
    | Ids
    | {[cellId: Id]: string | CustomResultCell<Schemas>};
};

/**
 * ResultSortedTableInHtmlTableProps props are used for components that will
 * render a sorted Table in an HTML table, such as the SortedTableInHtmlTable
 * component.
 * @category Props
 * @since v4.1.0
 */
export type ResultSortedTableInHtmlTableProps<Schemas extends OptionalSchemas> =
  {
    /**
   * The Id of the query in the Queries object for which the ResultTable will be
   * rendered.
   * @category Prop
   * @since v4.1.0
   */
    readonly queryId: Id;
    /**
   * The Id of the Cell whose values are used for the sorting. If omitted, the
   * view will sort the Row Id itself.
   * @category Prop
   * @since v4.1.0
   */
    readonly cellId?: Id;
    /**
   * Whether the sorting should be in descending order.
   * @category Prop
   * @since v4.1.0
   */
    readonly descending?: boolean;
    /**
   * The number of Row Ids to skip for pagination purposes.
   * @category Prop
   * @since v4.1.0
   */
    readonly offset?: number;
    /**
   * The maximum number of Row Ids to return.
   * @category Prop
   * @since v4.1.0
   */
    readonly limit?: number;
    /**
   * The Queries object to be accessed: omit for the default context Queries
   * object, provide an Id for a named context Queries object, or provide an
   * explicit reference.
   * @category Prop
   * @since v4.1.0
   */
    readonly queries?: QueriesOrQueriesId<Schemas>;
    /**
   * An optional list of Cell Ids to use for rendering a prescribed set of the
   * ResultTable's Cells in a given order. This can also be an object with the
   * desired Cell Ids as keys, and with a value that can either be a string
   * label to show in the column header, or a ResultCustomCell object to further
   * configure the column.
   * @category Prop
   * @since v4.1.0
   */
    readonly customCells?:
      | Ids
      | {[cellId: Id]: string | CustomResultCell<Schemas>};
    /**
   * Whether the table should be interactive such that clicking a header changes
   * the sorting and/or direction.
   * @category Prop
   * @since v4.1.0
   */
    readonly sortOnClick?: boolean;
    /**
   * Either `true` to show the default SortedTablePaginator for the ResultTable,
   * or provide your own paginator component that takes
   * SortedTablePaginatorProps.
   * @category Prop
   * @since v4.1.0
   */
    readonly paginator?: boolean | Component<SortedTablePaginatorProps>;
    /**
   * A function that is called whenever the sorting or pagination of the
   * ResultTable is changed by the user, invoked with the sorted Cell Id,
   * whether descending or not, and the offset of the pagination.
   * @category Prop
   * @since v4.1.0
   */
    readonly onChange?: (
      sortAndOffset: [
        cellId: Id | undefined,
        descending: boolean,
        offset: number,
      ],
    ) => void;
  };

/**
 * SortedTablePaginatorProps props are used for components that will be used as
 * a table paginator, such as the SortedTablePaginator component.
 * @category Props
 * @since v4.1.0
 */
export type SortedTablePaginatorProps = {
  /**
   * An event that will fire when the offset is updated, called with the new
   * offset.
   * @category Prop
   * @since v4.1.0
   */
  readonly onChange: (offset: number) => void;
  /**
   * The number of Row Ids to skip for pagination.
   * @category Prop
   * @since v4.1.0
   */
  readonly offset?: number;
  /**
   * The maximum number of Row Ids being returned.
   * @category Prop
   * @since v4.1.0
   */
  readonly limit?: number;
  /**
   * The total number of Row Ids in the paginated table.
   * @category Prop
   * @since v4.1.0
   */
  readonly total: number;
  /**
   * A noun to use in the pagination label for a single row, defaulting to
   * 'row'.
   * @category Prop
   * @since v4.1.0
   */
  readonly singular?: string;
  /**
   * A noun to use in the pagination label for multiple rows, defaulting to the
   * value of the singular noun suffixed with the letter 's'.
   * @category Prop
   * @since v4.1.0
   */
  readonly plural?: string;
};

export type WithSchemas<Schemas extends OptionalSchemas> = {
  /**
 * The TableInHtmlTable component renders the contents of a single Table in a
 * Store as an HTML <table> element, and registers a listener so that any
 * changes to that result will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const TableInHtmlTable: Component<
 *   TableInHtmlTableProps & HtmlTableProps
 * >;
 * ```
 *
 * See the <TableInHtmlTable /> (Svelte) demo for this component in action:
 *
 * ![TableInHtmlTable example](https://tinybase.org/shots/tableinhtmltable-svelte-demo.png
 * "TableInHtmlTable example")
 *
 * The component's props identify which Table to render based on Table Id, and
 * Store (which is either the default context Store, a named context Store, or
 * by explicit reference).
 *
 * This component renders a Table by iterating over its Row objects. By default
 * the Cells are in turn rendered with the CellView component, but you can
 * override this behavior by providing a `component` for each Cell in the
 * `customCells` prop. You can pass additional props to that custom component
 * with the `getComponentProps` callback. See the CustomCell type for more
 * details.
 *
 * This component uses the useRowIds hook under the covers, which means that any
 * changes to the structure of the Table will cause a re-render.
 *
 * You can use the `headerRow` and `idColumn` props to control whether the Ids
 * appear in a <th> element at the top of the table, and the start of each row.
 * @param props The props for this component.
 * @returns A rendering of the Table in a <table> element.
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The TableInHtmlTable component within it then renders the Table in
 * a <table> element with a CSS class.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {TableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let store;
 * </script>
 *
 * <Provider {store}>
 *   <TableInHtmlTable tableId="pets" className="table" />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setTable('pets', {
 *   fido: {species: 'dog'},
 *   felix: {species: 'cat'},
 * });
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table class="table">
 *   <thead>
 *     <tr>
 *       <th>Id</th>
 *       <th>species</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="fido">fido</th>
 *       <td>dog</td>
 *     </tr>
 *     <tr>
 *       <th title="felix">felix</th>
 *       <td>cat</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The TableInHtmlTable component within it then renders the Table
 * with a custom component and a custom props callback for the `species` Cell.
 * The header row at the top of the table and the Id column at the start of
 * each row is removed.
 *
 * ```svelte file=FormattedCellView.svelte
 * <script>
 *   import {CellView} from 'tinybase/ui-svelte';
 *
 *   export let tableId;
 *   export let rowId;
 *   export let cellId;
 *   export let bold = false;
 * </script>
 *
 * {#if bold}<b>{rowId}</b>{:else}{rowId}{/if}:<CellView
 *   {tableId}
 *   {rowId}
 *   {cellId}
 * />
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {TableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *   import FormattedCellView from './FormattedCellView.svelte';
 *
 *   export let store;
 *
 *   const customCells = {
 *     species: {
 *       component: FormattedCellView,
 *       getComponentProps: (rowId) => ({bold: rowId == 'fido'}),
 *     },
 *   };
 * </script>
 *
 * <Provider {store}>
 *   <TableInHtmlTable
 *     tableId="pets"
 *     {customCells}
 *     headerRow={false}
 *     idColumn={false}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setTable('pets', {
 *   fido: {species: 'dog'},
 *   felix: {species: 'cat'},
 * });
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <tbody>
 *     <tr>
 *       <td><b>fido</b>:dog</td>
 *     </tr>
 *     <tr>
 *       <td>felix:cat</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Store components
 * @since v4.1.0
 */
  TableInHtmlTable: Component<TableInHtmlTableProps<Schemas> & HtmlTableProps>;

  /**
 * The SortedTableInHtmlTable component renders the contents of a single sorted
 * Table in a Store, as an HTML <table> element, and registers a listener so
 * that any changes to that result will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const SortedTableInHtmlTable: Component<
 *   SortedTableInHtmlTableProps & HtmlTableProps
 * >;
 * ```
 *
 * See the <SortedTableInHtmlTable /> (Svelte) demo for this component in
 * action:
 *
 * ![SortedTableInHtmlTable example](https://tinybase.org/shots/sortedtableinhtmltable-svelte-demo.png
 * "SortedTableInHtmlTable example")
 *
 * The component's props identify which Table to render based on Table Id, and
 * Store (which is either the default context Store, a named context Store, or
 * by explicit reference). It also takes a Cell Id to sort by and a boolean to
 * indicate that the sorting should be in descending order. The `offset` and
 * `limit` props are used to paginate results, but default to `0` and
 * `undefined` to return all available Row Ids if not specified.
 *
 * This component renders a ResultTable by iterating over its Row objects, in
 * the order dictated by the sort parameters. By default the Cells are in turn
 * rendered with the CellView component, but you can override this behavior by
 * providing a `component` for each Cell in the `customCells` prop. You can pass
 * additional props to that custom component with the `getComponentProps`
 * callback. See the CustomCell type for more details.
 *
 * This component uses the useSortedRowIds hook under the covers, which means
 * that any changes to the structure or sorting of the Table will cause a
 * re-render.
 *
 * You can use the `headerRow` and `idColumn` props to control whether the Ids
 * appear in a <th> element at the top of the table, and the start of each row.
 *
 * The `sortOnClick` prop makes the table's sorting interactive such that the
 * user can click on a column heading to sort by that column. The style classes
 * `sorted` and `ascending` (or `descending`) are added so that you can provide
 * hints to the user how the sorting is being applied.
 *
 * Provide a paginator component for the Table with the `paginator` prop. Set to
 * `true` to use the default SortedTablePaginator, or provide your own component
 * that accepts SortedTablePaginatorProps.
 *
 * Finally, the `onChange` prop lets you listen to a user's changes to the
 * Table's sorting or pagination.
 * @param props The props for this component.
 * @returns A rendering of the Table in a <table> element.
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The SortedTableInHtmlTable component within it then renders the
 * Table in a <table> element with a CSS class.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {SortedTableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let store;
 * </script>
 *
 * <Provider {store}>
 *   <SortedTableInHtmlTable
 *     tableId="pets"
 *     cellId="species"
 *     className="table"
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setTables({
 *   pets: {
 *     fido: {species: 'dog'},
 *     felix: {species: 'cat'},
 *   },
 * });
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table class="table">
 *   <thead>
 *     <tr>
 *       <th>Id</th>
 *       <th class="sorted ascending">↑ species</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="felix">felix</th>
 *       <td>cat</td>
 *     </tr>
 *     <tr>
 *       <th title="fido">fido</th>
 *       <td>dog</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The SortedTableInHtmlTable component within it then renders the
 * Table with a custom component and a custom props callback for the `species`
 * Cell. The header row at the top of the table and the Id column at the start
 * of each row is removed.
 *
 * ```svelte file=FormattedCellView.svelte
 * <script>
 *   import {CellView} from 'tinybase/ui-svelte';
 *
 *   export let tableId;
 *   export let rowId;
 *   export let cellId;
 *   export let bold = false;
 * </script>
 *
 * {#if bold}<b>{rowId}</b>{:else}{rowId}{/if}:<CellView
 *   {tableId}
 *   {rowId}
 *   {cellId}
 * />
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {SortedTableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *   import FormattedCellView from './FormattedCellView.svelte';
 *
 *   export let store;
 *
 *   const customCells = {
 *     species: {
 *       component: FormattedCellView,
 *       getComponentProps: (rowId) => ({bold: rowId == 'fido'}),
 *     },
 *   };
 * </script>
 *
 * <Provider {store}>
 *   <SortedTableInHtmlTable
 *     tableId="pets"
 *     cellId="species"
 *     {customCells}
 *     headerRow={false}
 *     idColumn={false}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setTables({
 *   pets: {
 *     fido: {species: 'dog'},
 *     felix: {species: 'cat'},
 *   },
 * });
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <tbody>
 *     <tr>
 *       <td>felix:cat</td>
 *     </tr>
 *     <tr>
 *       <td><b>fido</b>:dog</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Store components
 * @since v4.1.0
 */
  SortedTableInHtmlTable: Component<
    SortedTableInHtmlTableProps<Schemas> & HtmlTableProps
  >;

  /**
 * The ValuesInHtmlTable component renders the keyed value contents of a Store
 * as an HTML <table> element, and registers a listener so that any changes to
 * that result will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ValuesInHtmlTable: Component<
 *   ValuesInHtmlTableProps & HtmlTableProps
 * >;
 * ```
 *
 * See the <ValuesInHtmlTable /> (Svelte) demo for this component in action:
 *
 * ![ValuesInHtmlTable example](https://tinybase.org/shots/valuesinhtmltable-svelte-demo.png
 * "ValuesInHtmlTable example")
 *
 * The component's props identify which Row to render based on Table Id, Row Id,
 * and Store (which is either the default context Store, a named context Store,
 * or an explicit reference).
 *
 * This component renders a Store by iterating over its Value objects. By
 * default the Values are in turn rendered with the ValueView component, but you
 * can override this behavior by providing a `valueComponent` prop, a custom
 * component of your own that will render a Value based on ValueProps. You can
 * also pass additional props to your custom component with the
 * `getValueComponentProps` callback prop.
 *
 * This component uses the useValueIds hook under the covers, which means that
 * any changes to the structure of the Values in the Store will cause a
 * re-render.
 *
 * You can use the `headerRow` and `idColumn` props to control whether labels
 * and Ids appear in a <th> element at the top of the table, and the start of
 * each row.
 * @param props The props for this component.
 * @returns A rendering of the Values in a <table> element.
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The ValuesInHtmlTable component within it then renders the Values
 * in a <table> element with a CSS class.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {ValuesInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let store;
 * </script>
 *
 * <Provider {store}>
 *   <ValuesInHtmlTable className="values" />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table class="values">
 *   <thead>
 *     <tr>
 *       <th>Id</th>
 *       <th>Value</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="open">open</th>
 *       <td>true</td>
 *     </tr>
 *     <tr>
 *       <th title="employees">employees</th>
 *       <td>3</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The ValuesInHtmlTable component within it then renders the Values
 * with a custom component and a custom props callback. The header row at the
 * top of the table and the Id column at the start of each row is removed.
 *
 * ```svelte file=FormattedValueView.svelte
 * <script>
 *   import {ValueView} from 'tinybase/ui-svelte';
 *
 *   export let valueId;
 *   export let bold = false;
 * </script>
 *
 * {#if bold}<b>{valueId}</b>{:else}{valueId}{/if}: <ValueView {valueId} />
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {ValuesInHtmlTable} from 'tinybase/ui-svelte-dom';
 *   import FormattedValueView from './FormattedValueView.svelte';
 *
 *   export let store;
 *
 *   const getBoldProp = (valueId) => ({bold: valueId == 'open'});
 * </script>
 *
 * <Provider {store}>
 *   <ValuesInHtmlTable
 *     valueComponent={FormattedValueView}
 *     getValueComponentProps={getBoldProp}
 *     headerRow={false}
 *     idColumn={false}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setValues({open: true, employees: 3});
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <tbody>
 *     <tr><td><b>open</b>: true</td></tr>
 *     <tr><td>employees: 3</td></tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Store components
 * @since v4.1.0
 */
  ValuesInHtmlTable: Component<
    ValuesInHtmlTableProps<Schemas> & HtmlTableProps
  >;

  /**
 * The SliceInHtmlTable component renders the contents of a Slice as an HTML
 * <table> element, and registers a listener so that any changes to that result
 * will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const SliceInHtmlTable: Component<
 *   SliceInHtmlTableProps & HtmlTableProps
 * >;
 * ```
 *
 * See the <SliceInHtmlTable /> (Svelte) demo for this component in action:
 *
 * ![SliceInHtmlTable example](https://tinybase.org/shots/sliceinhtmltable-svelte-demo.png
 * "SliceInHtmlTable example")
 *
 * The component's props identify which Slice to render based on Index Id, Slice
 * Id, and Indexes object (which is either the default context Indexes object, a
 * named context Indexes object, or an explicit reference).
 *
 * This component renders a Slice by iterating over its Row objects. By default
 * the Cells are in turn rendered with the CellView component, but you can
 * override this behavior by providing a `component` for each Cell in the
 * `customCells` prop. You can pass additional props to that custom component
 * with the `getComponentProps` callback. See the CustomCell type for more
 * details.
 *
 * This component uses the useSliceRowIds hook under the covers, which means
 * that any changes to the structure of the Slice will cause a re-render.
 *
 * You can use the `headerRow` and `idColumn` props to control whether labels
 * and Ids appear in a <th> element at the top of the table, and the start of
 * each row.
 * @param props The props for this component.
 * @returns A rendering of the Slice in a <table> element.
 * @example
 * This example creates a Provider context into which a default Indexes object
 * is provided. The SliceInHtmlTable component within it then renders the Slice
 * in a <table> element with a CSS class.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {SliceInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let indexes;
 * </script>
 *
 * <Provider {indexes}>
 *   <SliceInHtmlTable indexId="bySpecies" sliceId="dog" className="slice" />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setTable('pets', {
 *   fido: {species: 'dog'},
 *   felix: {species: 'cat'},
 *   cujo: {species: 'dog'},
 * });
 * const indexes = createIndexes(store);
 * indexes.setIndexDefinition('bySpecies', 'pets', 'species');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table class="slice">
 *   <thead>
 *     <tr>
 *       <th>Id</th>
 *       <th>species</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="fido">fido</th>
 *       <td>dog</td>
 *     </tr>
 *     <tr>
 *       <th title="cujo">cujo</th>
 *       <td>dog</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @example
 * This example creates a Provider context into which a default Indexes object
 * is provided. The SliceInHtmlTable component within it then renders the Slice
 * with a custom component and a custom props callback for the `species` Cell.
 * The header row at the top of the table and the Id column at the start of
 * each row is removed.
 *
 * ```svelte file=FormattedCellView.svelte
 * <script>
 *   import {CellView} from 'tinybase/ui-svelte';
 *
 *   export let tableId;
 *   export let rowId;
 *   export let cellId;
 *   export let bold = false;
 * </script>
 *
 * {#if bold}<b>{rowId}</b>{:else}{rowId}{/if}:<CellView
 *   {tableId}
 *   {rowId}
 *   {cellId}
 * />
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {SliceInHtmlTable} from 'tinybase/ui-svelte-dom';
 *   import FormattedCellView from './FormattedCellView.svelte';
 *
 *   export let indexes;
 *
 *   const customCells = {
 *     species: {
 *       component: FormattedCellView,
 *       getComponentProps: (rowId) => ({bold: rowId == 'fido'}),
 *     },
 *   };
 * </script>
 *
 * <Provider {indexes}>
 *   <SliceInHtmlTable
 *     indexId="bySpecies"
 *     sliceId="dog"
 *     {customCells}
 *     headerRow={false}
 *     idColumn={false}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createIndexes, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setTable('pets', {
 *   fido: {species: 'dog', color: 'brown'},
 *   felix: {species: 'cat'},
 *   cujo: {species: 'dog'},
 * });
 * const indexes = createIndexes(store);
 * indexes.setIndexDefinition('bySpecies', 'pets', 'species');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {indexes}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <tbody>
 *     <tr>
 *       <td><b>fido</b>:</td>
 *     </tr>
 *     <tr>
 *       <td>cujo:</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Other components
 * @since v4.1.0
 */
  SliceInHtmlTable: Component<SliceInHtmlTableProps<Schemas> & HtmlTableProps>;

  /**
 * The RelationshipInHtmlTable component renders the contents of the two Tables
 * linked by a Relationship as an HTML <table> element, and registers a listener
 * so that any changes to that result will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const RelationshipInHtmlTable: Component<
 *   RelationshipInHtmlTableProps & HtmlTableProps
 * >;
 * ```
 *
 * See the <RelationshipInHtmlTable /> (Svelte) demo for this component in
 * action:
 *
 * ![RelationshipInHtmlTable example](https://tinybase.org/shots/relationshipinhtmltable-svelte-demo.png
 * "RelationshipInHtmlTable example")
 *
 * The component's props identify which Relationship to render based on
 * Relationship Id and Relationships object (which is either the default context
 * Relationships object, a named context Relationships object, or an explicit
 * reference).
 *
 * This component renders the two Table objects by iterating over their related
 * Row objects. By default the Cells are in turn rendered with the CellView
 * component, but you can override this behavior by providing a `component` for
 * each Cell in the `customCells` prop. You can pass additional props to that
 * custom component with the `getComponentProps` callback. See the CustomCell
 * type for more details.
 *
 * Note the use of dotted 'tableId.cellId' string pairs when specifying custom
 * rendering for the cells in this table, since Cells from both the
 * relationship's 'local' and 'remote' Table objects can be rendered and need to
 * be distinguished.
 *
 * This component uses the useRowIds and useRemoteRowId hooks under the covers,
 * which means that any changes to the structure of either Table resulting in a
 * change to the relationship will cause a re-render.
 *
 * You can use the `headerRow` and `idColumn` props to control whether labels
 * and Ids appear in a <th> element at the top of the table, and the start of
 * each row.
 * @param props The props for this component.
 * @returns A rendering of the two Tables linked by a Relationship in a
 * <table> element.
 * @example
 * This example creates a Provider context into which a default Relationships
 * object is provided. The RelationshipInHtmlTable component within it then
 * renders the two Tables linked by a relationship in a <table> element with a
 * CSS class. Note the dotted pairs that are used as column headings.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {RelationshipInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let relationships;
 * </script>
 *
 * <Provider {relationships}>
 *   <RelationshipInHtmlTable
 *     relationshipId="petSpecies"
 *     className="relationship"
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const relationships = createRelationships(
 *   createStore()
 *     .setTable('pets', {fido: {species: 'dog'}, cujo: {species: 'dog'}})
 *     .setTable('species', {wolf: {price: 10}, dog: {price: 5}}),
 * ).setRelationshipDefinition('petSpecies', 'pets', 'species', 'species');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table class="relationship">
 *   <thead>
 *     <tr>
 *       <th>pets.Id</th>
 *       <th>species.Id</th>
 *       <th>pets.species</th>
 *       <th>species.price</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="fido">fido</th>
 *       <th title="dog">dog</th>
 *       <td>dog</td>
 *       <td>5</td>
 *     </tr>
 *     <tr>
 *       <th title="cujo">cujo</th>
 *       <th title="dog">dog</th>
 *       <td>dog</td>
 *       <td>5</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @example
 * This example creates a Provider context into which a default Relationships
 * object is provided. The RelationshipInHtmlTable component within it then
 * renders the two Tables linked by a relationship with a custom component and
 * a custom props callback for the `species.price` Cell. The header row at the
 * top of the table and the Id column at the start of each row is removed.
 *
 * ```svelte file=FormattedCellView.svelte
 * <script>
 *   import {CellView} from 'tinybase/ui-svelte';
 *
 *   export let tableId;
 *   export let rowId;
 *   export let cellId;
 *   export let store;
 *   export let bold = false;
 * </script>
 *
 * {#if bold}<b>{rowId}</b>{:else}{rowId}{/if}:<CellView
 *   {tableId}
 *   {rowId}
 *   {cellId}
 *   {store}
 * />
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {RelationshipInHtmlTable} from 'tinybase/ui-svelte-dom';
 *   import FormattedCellView from './FormattedCellView.svelte';
 *
 *   export let relationships;
 *
 *   const customCells = {
 *     'species.price': {
 *       component: FormattedCellView,
 *       getComponentProps: (rowId) => ({bold: rowId == 'dog'}),
 *     },
 *   };
 * </script>
 *
 * <Provider {relationships}>
 *   <RelationshipInHtmlTable
 *     relationshipId="petSpecies"
 *     {customCells}
 *     idColumn={false}
 *     headerRow={false}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createRelationships, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const relationships = createRelationships(
 *   createStore()
 *     .setTable('pets', {fido: {species: 'dog'}, cujo: {species: 'wolf'}})
 *     .setTable('species', {wolf: {price: 10}, dog: {price: 5}}),
 * ).setRelationshipDefinition('petSpecies', 'pets', 'species', 'species');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {relationships}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <tbody>
 *     <tr>
 *       <td><b>dog</b>:5</td>
 *     </tr>
 *     <tr>
 *       <td>wolf:10</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Other components
 * @since v4.1.0
 */
  RelationshipInHtmlTable: Component<
    RelationshipInHtmlTableProps<Schemas> & HtmlTableProps
  >;

  /**
 * The ResultTableInHtmlTable component renders the contents of a single query's
 * ResultTable in a Queries object as an HTML <table> element, and registers a
 * listener so that any changes to that result will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ResultTableInHtmlTable: Component<
 *   ResultTableInHtmlTableProps & HtmlTableProps
 * >;
 * ```
 *
 * See the <ResultTableInHtmlTable /> (Svelte) demo for this component in
 * action:
 *
 * ![ResultTableInHtmlTable example](https://tinybase.org/shots/resulttableinhtmltable-svelte-demo.png
 * "ResultTableInHtmlTable example")
 *
 * The component's props identify which ResultTable to render based on query Id,
 * and Queries object (which is either the default context Queries object, a
 * named context Queries object, or by explicit reference).
 *
 * This component renders a ResultTable by iterating over its Row objects. By
 * default the Cells are in turn rendered with the CellView component, but you
 * can override this behavior by providing a `component` for each Cell in the
 * `customCells` prop. You can pass additional props to that custom component
 * with the `getComponentProps` callback. See the ResultCustomCell type for more
 * details.
 *
 * This component uses the useRowIds hook under the covers, which means that any
 * changes to the structure of the Table will cause a re-render.
 *
 * You can use the `headerRow` and `idColumn` props to control whether the Ids
 * appear in a <th> element at the top of the table, and the start of each row.
 * @param props The props for this component.
 * @returns A rendering of the ResultTable in a <table> element.
 * @example
 * This example creates a Provider context into which a default Queries object
 * is provided. The ResultTableInHtmlTable component within it then renders the
 * ResultTable in a <table> element with a CSS class.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {ResultTableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let queries;
 * </script>
 *
 * <Provider {queries}>
 *   <ResultTableInHtmlTable queryId="petColors" className="table" />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const queries = createQueries(
 *   createStore().setTable('pets', {
 *     fido: {species: 'dog', color: 'brown'},
 *     felix: {species: 'cat', color: 'black'},
 *   }),
 * ).setQueryDefinition('petColors', 'pets', ({select}) => select('color'));
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table class="table">
 *   <thead>
 *     <tr>
 *       <th>Id</th>
 *       <th>color</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="fido">fido</th>
 *       <td>brown</td>
 *     </tr>
 *     <tr>
 *       <th title="felix">felix</th>
 *       <td>black</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @example
 * This example creates a Provider context into which a default Queries object
 * is provided. The ResultTableInHtmlTable component within it then renders the
 * ResultTable with a custom component and a custom props callback for the
 * `color` Cell. The header row at the top of the table and the Id column at
 * the start of each row is removed.
 *
 * ```svelte file=FormattedResultCellView.svelte
 * <script>
 *   import {ResultCellView} from 'tinybase/ui-svelte';
 *
 *   export let queryId;
 *   export let rowId;
 *   export let cellId;
 *   export let bold = false;
 * </script>
 *
 * {#if bold}<b>{rowId}</b>{:else}{rowId}{/if}:<ResultCellView
 *   {queryId}
 *   {rowId}
 *   {cellId}
 * />
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {ResultTableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *   import FormattedResultCellView from './FormattedResultCellView.svelte';
 *
 *   export let queries;
 *
 *   const customCells = {
 *     color: {
 *       component: FormattedResultCellView,
 *       getComponentProps: (rowId) => ({bold: rowId == 'fido'}),
 *     },
 *   };
 * </script>
 *
 * <Provider {queries}>
 *   <ResultTableInHtmlTable
 *     queryId="petColors"
 *     {customCells}
 *     headerRow={false}
 *     idColumn={false}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const queries = createQueries(
 *   createStore().setTable('pets', {
 *     fido: {species: 'dog', color: 'brown'},
 *     felix: {species: 'cat', color: 'black'},
 *   }),
 * ).setQueryDefinition('petColors', 'pets', ({select}) => select('color'));
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <tbody>
 *     <tr>
 *       <td><b>fido</b>:brown</td>
 *     </tr>
 *     <tr>
 *       <td>felix:black</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Queries components
 * @since v4.1.0
 */
  ResultTableInHtmlTable: Component<
    ResultTableInHtmlTableProps<Schemas> & HtmlTableProps
  >;

  /**
 * The SortedTableInHtmlTable component renders the contents of a single query's
 * sorted ResultTable in a Queries object as an HTML <table> element, and
 * registers a listener so that any changes to that result will cause a
 * re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const ResultSortedTableInHtmlTable: Component<
 *   ResultSortedTableInHtmlTableProps & HtmlTableProps
 * >;
 * ```
 *
 * See the <ResultSortedTableInHtmlTable /> (Svelte) demo for this component in
 * action:
 *
 * ![ResultSortedTableInHtmlTable example](https://tinybase.org/shots/resultsortedtableinhtmltable-svelte-demo.png
 * "ResultSortedTableInHtmlTable example")
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
 * the order dictated by the sort parameters. By default the Cells are in turn
 * rendered with the CellView component, but you can override this behavior by
 * providing a `component` for each Cell in the `customCells` prop. You can pass
 * additional props to that custom component with the `getComponentProps`
 * callback. See the ResultCustomCell type for more details.
 *
 * This component uses the useSortedRowIds hook under the covers, which means
 * that any changes to the structure or sorting of the ResultTable will cause a
 * re-render.
 *
 * You can use the `headerRow` and `idColumn` props to control whether the Ids
 * appear in a <th> element at the top of the table, and the start of each row.
 *
 * The `sortOnClick` prop makes the table's sorting interactive such that the
 * user can click on a column heading to sort by that column. The style classes
 * `sorted` and `ascending` (or `descending`) are added so that you can provide
 * hints to the user how the sorting is being applied.
 *
 * Provide a paginator component for the ResultTable with the `paginator` prop.
 * Set to `true` to use the default SortedTablePaginator, or provide your own
 * component that accepts SortedTablePaginatorProps.
 *
 * Finally, the `onChange` prop lets you listen to a user's changes to the
 * ResultTable's sorting or pagination.
 * @param props The props for this component.
 * @returns A rendering of the ResultTable in a <table> element.
 * @example
 * This example creates a Provider context into which a default Queries object
 * is provided. The ResultSortedTableInHtmlTable component within it then
 * renders the ResultTable in a <table> element with a CSS class.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {ResultSortedTableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let queries;
 * </script>
 *
 * <Provider {queries}>
 *   <ResultSortedTableInHtmlTable
 *     queryId="petColors"
 *     cellId="color"
 *     className="table"
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const queries = createQueries(
 *   createStore().setTable('pets', {
 *     fido: {species: 'dog', color: 'brown'},
 *     felix: {species: 'cat', color: 'black'},
 *   }),
 * ).setQueryDefinition('petColors', 'pets', ({select}) => select('color'));
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table class="table">
 *   <thead>
 *     <tr>
 *       <th>Id</th>
 *       <th class="sorted ascending">↑ color</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="felix">felix</th>
 *       <td>black</td>
 *     </tr>
 *     <tr>
 *       <th title="fido">fido</th>
 *       <td>brown</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @example
 * This example creates a Provider context into which a default Queries object
 * is provided. The ResultSortedTableInHtmlTable component within it then
 * renders the ResultTable with a custom component and a custom props callback
 * for the `color` Cell. The header row at the top of the table and the Id
 * column at the start of each row is removed.
 *
 * ```svelte file=FormattedResultCellView.svelte
 * <script>
 *   import {ResultCellView} from 'tinybase/ui-svelte';
 *
 *   export let queryId;
 *   export let rowId;
 *   export let cellId;
 *   export let bold = false;
 * </script>
 *
 * {#if bold}<b>{rowId}</b>{:else}{rowId}{/if}:<ResultCellView
 *   {queryId}
 *   {rowId}
 *   {cellId}
 * />
 * ```
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {ResultSortedTableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *   import FormattedResultCellView from './FormattedResultCellView.svelte';
 *
 *   export let queries;
 *
 *   const customCells = {
 *     color: {
 *       component: FormattedResultCellView,
 *       getComponentProps: (rowId) => ({bold: rowId == 'fido'}),
 *     },
 *   };
 * </script>
 *
 * <Provider {queries}>
 *   <ResultSortedTableInHtmlTable
 *     queryId="petColors"
 *     cellId="color"
 *     {customCells}
 *     headerRow={false}
 *     idColumn={false}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createQueries, createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const queries = createQueries(
 *   createStore().setTable('pets', {
 *     fido: {species: 'dog', color: 'brown'},
 *     felix: {species: 'cat', color: 'black'},
 *   }),
 * ).setQueryDefinition('petColors', 'pets', ({select}) => select('color'));
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {queries}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <tbody>
 *     <tr>
 *       <td>felix:black</td>
 *     </tr>
 *     <tr>
 *       <td><b>fido</b>:brown</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Queries components
 * @since v4.1.0
 */
  ResultSortedTableInHtmlTable: Component<
    ResultSortedTableInHtmlTableProps<Schemas> & HtmlTableProps
  >;

  /**
 * The EditableCellView component renders the value of a single Cell in a way
 * that can be edited in a web browser, and registers a listener so that any
 * changes to that result will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const EditableCellView: Component<
 *   CellViewProps & {readonly className?: string; readonly showType?: boolean}
 * >;
 * ```
 *
 * See the <EditableCellView /> (Svelte) demo for this component in action:
 *
 * ![EditableCellView example](https://tinybase.org/shots/editablecellview-svelte-demo.png
 * "EditableCellView example")
 *
 * The component's props identify which Cell to render based on Table Id, Row
 * Id, Cell Id, and Store (which is either the default context Store, a named
 * context Store, or an explicit reference).
 *
 * A Cell contains a string, number, boolean, object or array (since v8.0) so
 * the value is rendered in an appropriate <input> tag, possibly as JSON and a
 * button lets the user cycle through the types.
 *
 * Set the `showType` prop to false to remove the ability for the user to see or
 * change the Cell type. They will also not be able to change the type if there
 * is a TablesSchema applied to the Store.
 *
 * This component uses the useCell hook under the covers, which means that any
 * changes to the specified Cell outside of this component will cause a
 * re-render.
 *
 * You can provide a custom className prop which well be used on the root of the
 * resulting element. If omitted the element's class will be `editableCell`. The
 * debugIds prop has no effect on this component.
 * @param props The props for this component.
 * @returns An editable rendering of the Cell.
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The EditableCellView component within it then renders an editable
 * Cell.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {EditableCellView} from 'tinybase/ui-svelte-dom';
 *
 *   export let store;
 * </script>
 *
 * <Provider {store}>
 *   <EditableCellView tableId="pets" rowId="fido" cellId="color" />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setCell('pets', 'fido', 'color', 'brown');
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <div class="editableCell">
 *   <button title="string" class="string">string</button>
 *   <input value="brown">
 * </div>
 * `;
 * ```
 * @category Store components
 * @since v4.1.0
 */
  EditableCellView: Component<
    CellProps<Schemas> & {
      className?: string;
      readonly showType?: boolean;
    }
  >;

  /**
 * The EditableValueView component renders the value of a single Value in a way
 * that can be edited in a web browser, and registers a listener so that any
 * changes to that result will cause a re-render.
 *
 * This has schema-based typing. The following is a simplified representation:
 *
 * ```ts override
 * export const EditableValueView: Component<
 *   ValueViewProps & {
 *     readonly className?: string;
 *     readonly showType?: boolean;
 *   }
 * >;
 * ```
 *
 * See the <EditableValueView /> (Svelte) demo for this component in action:
 *
 * ![EditableValueView example](https://tinybase.org/shots/editablevalueview-svelte-demo.png
 * "EditableValueView example")
 *
 * The component's props identify which Value to render based on Table Id, Row
 * Id, Value Id, and Store (which is either the default context Store, a named
 * context Store, or an explicit reference).
 *
 * A Value contains a string, number, boolean, object or array (since v8.0) so
 * the value is rendered in an appropriate <input> tag, possibly as JSON and a
 * button lets the user cycle through the types.
 *
 * Set the `showType` prop to false to remove the ability for the user to see or
 * change the Value type. They will also not be able to change the type if there
 * is a ValuesSchema applied to the Store.
 *
 * This component uses the useValue hook under the covers, which means that any
 * changes to the specified Value outside of this component will cause a
 * re-render.
 *
 * You can provide a custom className prop which well be used on the root of the
 * resulting element. If omitted the element's class will be `editableValue`.
 * The debugIds prop has no effect on this component.
 * @param props The props for this component.
 * @returns An editable rendering of the Value.
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The EditableValueView component within it then renders an editable
 * Value.
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {EditableValueView} from 'tinybase/ui-svelte-dom';
 *
 *   export let store;
 * </script>
 *
 * <Provider {store}>
 *   <EditableValueView valueId="employees" />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setValue('employees', 3);
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <div class="editableValue">
 *   <button title="number" class="number">number</button>
 *   <input type="number" value="3">
 * </div>
 * `;
 * ```
 * @category Store components
 * @since v4.1.0
 */
  EditableValueView: Component<
    ValueProps<Schemas> & {
      className?: string;
      readonly showType?: boolean;
    }
  >;

  /**
 * The SortedTablePaginator component renders a paginator for a sorted table.
 *
 * See the <SortedTableInHtmlTable /> (Svelte) demo for this component in
 * action:
 *
 * ![SortedTablePaginator example](https://tinybase.org/shots/sortedtablepaginator-svelte-demo.png
 * "SortedTablePaginator example")
 *
 * The component displays 'previous' and 'next' buttons for paging through the
 * Table if there are more Row Ids than fit in each page. The component will
 * also display a label that shows which Row Ids are being displayed.
 *
 * The component's props identify initial pagination settings, and it will fire
 * an event when the pagination changes.
 * @param props The props for this component.
 * @returns The rendering of a paginator control with a label, and next and
 * previous buttons, where appropriate.
 * @example
 * This example creates a Provider context into which a default Store is
 * provided. The SortedTableInHtmlTable component within it then renders the
 * Table in a <table> element with a SortedTablePaginator (the default).
 *
 * ```svelte file=App.svelte
 * <script>
 *   import {Provider} from 'tinybase/ui-svelte';
 *   import {SortedTableInHtmlTable} from 'tinybase/ui-svelte-dom';
 *
 *   export let store;
 * </script>
 *
 * <Provider {store}>
 *   <SortedTableInHtmlTable
 *     tableId="pets"
 *     cellId="species"
 *     limit={2}
 *     paginator={true}
 *   />
 * </Provider>
 * ```
 *
 * ```ts
 * import {flushSync, mount} from 'svelte';
 * import {createStore} from 'tinybase';
 * import App from './App.svelte';
 *
 * const store = createStore().setTables({
 *   pets: {
 *     fido: {species: 'dog'},
 *     felix: {species: 'cat'},
 *     cujo: {species: 'wolf'},
 *     lowly: {species: 'worm'},
 *     polly: {species: 'parrot'},
 *   },
 * });
 * const app = document.body.appendChild(document.createElement('div'));
 * flushSync(() => mount(App, {target: app, props: {store}}));
 * console.log(app.innerHTML);
 * // ->
 * `
 * <table>
 *   <caption>
 *     <button class="previous" disabled="">←</button>
 *     <button class="next">→</button>
 *     1 to 2 of 5 rows
 *   </caption>
 *   <thead>
 *     <tr>
 *       <th>Id</th>
 *       <th class="sorted ascending">↑ species</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th title="felix">felix</th>
 *       <td>cat</td>
 *     </tr>
 *     <tr>
 *       <th title="fido">fido</th>
 *       <td>dog</td>
 *     </tr>
 *   </tbody>
 * </table>
 * `;
 * ```
 * @category Store components
 * @since v4.1.0
 */
  SortedTablePaginator: Component<SortedTablePaginatorProps>;
};
