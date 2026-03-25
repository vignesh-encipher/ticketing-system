"use client";

import { useMemo, memo } from "react";
import { Table, TableProps, Skeleton } from "antd";
import type { ColumnsType } from "antd/es/table";

interface TableComponentProps<T = any> {
  /**
   * Table columns configuration
   */
  columns: ColumnsType<T>;
  /**
   * Table data source
   */
  dataSource: T[];
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Custom row key function or string
   * @default "id"
   */
  rowKey?: string | ((record: T) => string);
  /**
   * Additional Ant Design Table props
   */
  tableProps?: Omit<TableProps<T>, "columns" | "dataSource" | "loading" | "rowKey">;
}

/**
 * Reusable Table Component - Simple wrapper around Ant Design Table
 * 
 * All data fetching and state management should be handled in the parent component.
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { title: 'Name', dataIndex: 'name', key: 'name' },
 *   { title: 'Email', dataIndex: 'email', key: 'email' },
 * ];
 * 
 * const [data, setData] = useState([]);
 * const [loading, setLoading] = useState(false);
 * 
 * useEffect(() => {
 *   // Fetch data in parent
 *   fetchData();
 * }, []);
 * 
 * <TableComponent 
 *   columns={columns} 
 *   dataSource={data}
 *   loading={loading}
 * />
 * ```
 */
const TableComponent = <T extends Record<string, any> = any>({
  columns,
  dataSource,
  loading = false,
  rowKey = "id",
  tableProps,
}: TableComponentProps<T>) => {
  // Memoize skeleton configuration
  const skeletonConfig = useMemo(
    () => ({
      active: true,
      paragraph: { rows: 8 },
      title: true,
    }),
    []
  );

  // Memoize table props to prevent unnecessary re-renders
  const memoizedTableProps = useMemo(
    () => ({
      ...tableProps,
      columns,
      dataSource,
      loading,
      rowKey,
      pagination: tableProps?.pagination === false ? false : ({
        pageSize: 10,
        showSizeChanger: false,
        showTotal: (total: number, range: [number, number]) => (
          <span className="text-gray-500 text-[11px] uppercase tracking-widest font-extrabold flex items-center">
            Showing&nbsp;<strong className="text-gray-900 font-black">{range[0]}-{range[1]}</strong>&nbsp;of&nbsp;<strong className="text-gray-900 font-black">{total}</strong>&nbsp;items
          </span>
        ),
        itemRender: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', originalElement: React.ReactNode) => {
          if (type === 'prev') return <span>{"<"}</span>;
          if (type === 'next') return <span>{">"}</span>;
          if (type === 'jump-prev' || type === 'jump-next') return <span className="text-gray-400 font-medium tracking-widest leading-none block pb-2">...</span>;
          return originalElement;
        },
        ...(typeof tableProps?.pagination === 'object' ? tableProps.pagination : {}),
      } as any),
      className: `custom-table ${tableProps?.className || ""}`,
    }),
    [columns, dataSource, loading, rowKey, tableProps]
  );

  // Show skeleton loader while loading and no data
  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <Skeleton {...skeletonConfig} />
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Table<T> {...memoizedTableProps} />
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(TableComponent) as typeof TableComponent;

