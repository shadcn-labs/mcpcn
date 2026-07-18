"use client";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  RefreshCw,
  Search,
  Share2,
} from "lucide-react";
import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ComponentProps, ImgHTMLAttributes, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

type TableRow = Record<string, unknown>;
type SelectionMode = "multi" | "none" | "single";

export interface TableColumn<T = TableRow> {
  accessor?: keyof T | string;
  align?: "center" | "left" | "right";
  header?: string;
  render?: (value: unknown, row: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T = TableRow> {
  actions?: {
    onCopy?: (selectedRows: T[]) => void;
    onDownload?: (selectedRows: T[]) => void;
    onRefresh?: () => void;
    onShare?: (selectedRows: T[]) => void;
  };
  appearance?: {
    compact?: boolean;
    displayMode?: "fullscreen" | "inline" | "pip";
    emptyMessage?: string;
    maxRows?: number;
    selectable?: SelectionMode;
    showActions?: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
    stickyHeader?: boolean;
  };
  children?: ReactNode;
  className?: string;
  control?: {
    loading?: boolean;
    selectedRows?: T[];
  };
  data?: {
    columns?: TableColumn<T>[];
    lastUpdated?: Date | string;
    rows?: T[];
    title?: string;
    titleImage?: string;
    totalRows?: number;
  };
}

interface TableContextValue {
  columns: TableColumn<TableRow>[];
  compact: boolean;
  currentPage: number;
  displayMode: "fullscreen" | "inline" | "pip";
  emptyMessage: string;
  lastUpdated?: Date | string;
  loading: boolean;
  maxRows: number;
  onCopy?: (selectedRows: TableRow[]) => void;
  onDownload?: (selectedRows: TableRow[]) => void;
  onRefresh?: () => void;
  onShare?: (selectedRows: TableRow[]) => void;
  pageCount: number;
  query: string;
  rows: TableRow[];
  selectable: SelectionMode;
  selectedIndexes: Set<number>;
  selectedRows: TableRow[];
  setCurrentPage: (page: number) => void;
  setQuery: (query: string) => void;
  setSort: (accessor: string) => void;
  showActions: boolean;
  showFooter: boolean;
  showHeader: boolean;
  sort: { accessor: string; direction: "asc" | "desc" } | null;
  stickyHeader: boolean;
  title?: string;
  titleImage?: string;
  toggleAll: () => void;
  toggleRow: (index: number) => void;
  totalRows?: number;
  visibleRows: TableRow[];
}

const TableContext = createContext<TableContextValue | null>(null);

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within Table");
  }
  return context;
};

const DEFAULT_COLUMNS: TableColumn<TableRow>[] = [
  { accessor: "name", header: "Name", sortable: true },
  { accessor: "email", header: "Email", sortable: true },
  { accessor: "status", header: "Status", sortable: true },
];

const DEFAULT_ROWS: TableRow[] = [
  { email: "john@example.com", name: "John Doe", status: "Active" },
  { email: "jane@example.com", name: "Jane Smith", status: "Pending" },
  { email: "bob@example.com", name: "Bob Johnson", status: "Active" },
];

const getValue = (row: TableRow, accessor: string) => {
  const keys = accessor.split(".");
  let value: unknown = row;
  for (const key of keys) {
    if (!(typeof value === "object" && value !== null)) {
      return;
    }
    value = Object.hasOwn(value, key)
      ? Object.getOwnPropertyDescriptor(value, key)?.value
      : undefined;
  }
  return value;
};

const formatValue = (value: unknown) => {
  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US").format(value);
  }
  return String(value ?? "");
};

const formatTimestamp = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleString("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  });
};

const TableSkeleton = ({ columns }: { columns: number }) => (
  <>
    {Array.from({ length: 3 }).map((_, row) => (
      <tr className="border-b last:border-0" key={row}>
        {Array.from({ length: columns }).map((__, column) => (
          <td className="px-3 py-3" key={column}>
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export const TableActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { onCopy, onDownload, onRefresh, onShare, selectedRows, showActions } =
    useTable();
  if (!(showActions || children)) {
    return null;
  }
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {children ?? (
        <>
          <Button
            aria-label="Copy"
            disabled={!onCopy}
            onClick={() => onCopy?.(selectedRows)}
            size="icon"
            variant="ghost"
          >
            <Copy className="size-4" />
          </Button>
          <Button
            aria-label="Download"
            disabled={!onDownload}
            onClick={() => onDownload?.(selectedRows)}
            size="icon"
            variant="ghost"
          >
            <Download className="size-4" />
          </Button>
          <Button
            aria-label="Share"
            disabled={!onShare}
            onClick={() => onShare?.(selectedRows)}
            size="icon"
            variant="ghost"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            aria-label="Refresh"
            disabled={!onRefresh}
            onClick={onRefresh}
            size="icon"
            variant="ghost"
          >
            <RefreshCw className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export const TableHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"header">) => {
  const { displayMode, query, setQuery, showHeader, title, titleImage } =
    useTable();
  if (!(showHeader || children)) {
    return null;
  }
  return (
    <header
      className={cn(
        "flex flex-col gap-3 border-b p-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex min-w-0 items-center gap-2">
            {titleImage && (
              <BlockImage
                alt=""
                className="size-7 rounded object-cover"
                src={titleImage}
              />
            )}
            {title && <h2 className="truncate font-semibold">{title}</h2>}
          </div>
          <div className="flex items-center gap-2">
            {displayMode === "fullscreen" && (
              <div className="relative min-w-52">
                <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-8"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search rows..."
                  value={query}
                />
              </div>
            )}
            <TableActions />
          </div>
        </>
      )}
    </header>
  );
};

const SelectionCell = ({ index }: { index: number }) => {
  const { selectedIndexes, toggleRow } = useTable();
  const selected = selectedIndexes.has(index);
  return (
    <td className="px-3 py-3">
      <button
        aria-label={selected ? "Deselect row" : "Select row"}
        className={cn(
          "flex size-4 items-center justify-center rounded border",
          selected
            ? "border-foreground bg-foreground text-background"
            : "border-border"
        )}
        onClick={(event) => {
          event.stopPropagation();
          toggleRow(index);
        }}
        type="button"
      >
        {selected && <Check className="size-3" />}
      </button>
    </td>
  );
};

const SortIndicator = ({ accessor }: { accessor: string }) => {
  const { sort } = useTable();
  if (sort?.accessor !== accessor) {
    return null;
  }
  return sort.direction === "asc" ? (
    <ChevronUp className="size-3.5" />
  ) : (
    <ChevronDown className="size-3.5" />
  );
};

export const TableGrid = ({ className, ...props }: ComponentProps<"div">) => {
  const {
    columns,
    compact,
    emptyMessage,
    loading,
    selectable,
    selectedIndexes,
    setSort,
    stickyHeader,
    toggleAll,
    toggleRow,
    visibleRows,
  } = useTable();
  const columnCount = columns.length + (selectable === "none" ? 0 : 1);
  return (
    <div className={cn("overflow-x-auto", className)} {...props}>
      <table className="w-full text-sm">
        <thead
          className={cn(
            "border-b bg-muted/40",
            stickyHeader && "sticky top-0 z-10"
          )}
        >
          <tr>
            {selectable !== "none" && (
              <th className="w-10 px-3 py-2 text-left">
                {selectable === "multi" && (
                  <button
                    aria-label="Select all rows"
                    onClick={toggleAll}
                    type="button"
                  >
                    <span className="block size-4 rounded border border-border" />
                  </button>
                )}
              </th>
            )}
            {columns.map((column) => {
              const accessor = String(column.accessor ?? "");
              return (
                <th
                  className={cn(
                    "px-3 py-2 font-medium text-muted-foreground",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.align !== "center" &&
                      column.align !== "right" &&
                      "text-left"
                  )}
                  key={accessor || column.header}
                  style={{ width: column.width }}
                >
                  <button
                    className={cn(
                      "inline-flex items-center gap-1",
                      column.sortable && "cursor-pointer hover:text-foreground"
                    )}
                    disabled={!column.sortable}
                    onClick={() => setSort(accessor)}
                    type="button"
                  >
                    {column.header}
                    <SortIndicator accessor={accessor} />
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading && <TableSkeleton columns={columnCount} />}
          {!loading && visibleRows.length === 0 && (
            <tr>
              <td
                className="px-3 py-8 text-center text-muted-foreground"
                colSpan={columnCount}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
          {!loading &&
            visibleRows.map((row, index) => (
              <tr
                aria-selected={selectedIndexes.has(index)}
                className={cn(
                  "border-b transition-colors last:border-0",
                  selectable !== "none" && "cursor-pointer hover:bg-muted/30",
                  selectedIndexes.has(index) && "bg-muted/30"
                )}
                key={index}
                onClick={() => toggleRow(index)}
              >
                {selectable !== "none" && <SelectionCell index={index} />}
                {columns.map((column, columnIndex) => {
                  const value = getValue(row, String(column.accessor ?? ""));
                  return (
                    <td
                      className={cn(
                        "px-3",
                        compact ? "py-2" : "py-3",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        columnIndex === 0 && "font-medium"
                      )}
                      key={String(column.accessor ?? columnIndex)}
                    >
                      {column.render
                        ? column.render(value, row, index)
                        : formatValue(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export const TableFooter = ({
  children,
  className,
  ...props
}: ComponentProps<"footer">) => {
  const {
    currentPage,
    displayMode,
    lastUpdated,
    maxRows,
    pageCount,
    rows,
    setCurrentPage,
    showFooter,
    totalRows,
  } = useTable();
  if (!(showFooter || children)) {
    return null;
  }
  const more = Math.max(0, (totalRows ?? rows.length) - maxRows);
  return (
    <footer
      className={cn(
        "flex items-center justify-between border-t px-3 py-2 text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span>
            {lastUpdated ? `Updated ${formatTimestamp(lastUpdated)}` : null}
            {displayMode !== "fullscreen" && more > 0
              ? ` · +${more} more`
              : null}
          </span>
          {displayMode === "fullscreen" && pageCount > 1 && (
            <div className="flex items-center gap-2">
              <Button
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                size="icon"
                variant="outline"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span>
                {currentPage} / {pageCount}
              </span>
              <Button
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage(currentPage + 1)}
                size="icon"
                variant="outline"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </footer>
  );
};

export const TableContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const useProcessedRows = (
  columns: TableColumn<TableRow>[],
  rows: TableRow[],
  query: string,
  sort: TableContextValue["sort"]
) =>
  useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = normalizedQuery
      ? rows.filter((row) =>
          columns.some((column) =>
            formatValue(getValue(row, String(column.accessor ?? "")))
              .toLowerCase()
              .includes(normalizedQuery)
          )
        )
      : rows;
    if (!sort) {
      return filtered;
    }
    return [...filtered].toSorted((left, right) => {
      const leftValue = getValue(left, sort.accessor);
      const rightValue = getValue(right, sort.accessor);
      const comparison = String(leftValue ?? "").localeCompare(
        String(rightValue ?? ""),
        undefined,
        { numeric: true }
      );
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [columns, query, rows, sort]);

const useTableSelection = (
  rows: TableRow[],
  visibleRows: TableRow[],
  selectable: SelectionMode
) => {
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(
    new Set()
  );
  const selectedRows = rows.filter((_, index) => selectedIndexes.has(index));
  const toggleRow = (index: number) => {
    if (selectable === "none") {
      return;
    }
    setSelectedIndexes((current) => {
      const next = new Set(selectable === "single" ? [] : current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };
  const toggleAll = () => {
    setSelectedIndexes((current) =>
      current.size === visibleRows.length
        ? new Set()
        : new Set(visibleRows.map((_, index) => index))
    );
  };
  return { selectedIndexes, selectedRows, toggleAll, toggleRow };
};

const resolveTableAppearance = (
  appearance: TableProps<TableRow>["appearance"]
) => ({
  compact: appearance?.compact ?? false,
  displayMode: appearance?.displayMode ?? "inline",
  emptyMessage: appearance?.emptyMessage ?? "No data available",
  maxRows: appearance?.maxRows ?? 5,
  selectable: appearance?.selectable ?? "none",
  showActions: appearance?.showActions ?? true,
  showFooter: appearance?.showFooter ?? true,
  showHeader: appearance?.showHeader ?? true,
  stickyHeader: appearance?.stickyHeader ?? false,
});

const resolveTableData = (data: TableProps<TableRow>["data"]) => ({
  columns: data?.columns ?? DEFAULT_COLUMNS,
  lastUpdated: data?.lastUpdated,
  rows: data?.rows ?? DEFAULT_ROWS,
  title: data?.title,
  titleImage: data?.titleImage,
  totalRows: data?.totalRows,
});

const TableRoot = ({
  actions,
  appearance,
  children,
  className,
  control,
  data,
}: TableProps<TableRow> & { children: React.ReactNode }) => {
  const {
    compact,
    displayMode,
    emptyMessage,
    maxRows,
    selectable,
    showActions,
    showFooter,
    showHeader,
    stickyHeader,
  } = resolveTableAppearance(appearance);
  const { columns, lastUpdated, rows, title, titleImage, totalRows } =
    resolveTableData(data);
  const rowsPerPage = 15;
  const [query, setQuery] = useState("");
  const [sort, setSortState] = useState<TableContextValue["sort"]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const processedRows = useProcessedRows(columns, rows, query, sort);

  const pageCount = Math.max(1, Math.ceil(processedRows.length / rowsPerPage));
  const visibleRows =
    displayMode === "fullscreen"
      ? processedRows.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        )
      : processedRows.slice(0, maxRows);
  const { selectedIndexes, selectedRows, toggleAll, toggleRow } =
    useTableSelection(rows, visibleRows, selectable);

  const context: TableContextValue = {
    columns,
    compact,
    currentPage,
    displayMode,
    emptyMessage,
    lastUpdated,
    loading: control?.loading ?? false,
    maxRows,
    onCopy: actions?.onCopy,
    onDownload: actions?.onDownload,
    onRefresh: actions?.onRefresh,
    onShare: actions?.onShare,
    pageCount,
    query,
    rows,
    selectable,
    selectedIndexes,
    selectedRows,
    setCurrentPage,
    setQuery,
    setSort: (accessor) =>
      setSortState((current) => ({
        accessor,
        direction:
          current?.accessor === accessor && current.direction === "asc"
            ? "desc"
            : "asc",
      })),
    showActions,
    showFooter,
    showHeader,
    sort,
    stickyHeader,
    title,
    titleImage,
    toggleAll,
    toggleRow,
    totalRows,
    visibleRows,
  };

  return (
    <TableContext.Provider value={context}>
      <div
        className={cn("overflow-hidden rounded-lg border bg-card", className)}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

export const Table = TableRoot;
