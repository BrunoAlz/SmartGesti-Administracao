import React, { useState, useMemo } from "react";
import { useCardClasses, useTextClasses, useIconClasses } from "../hooks";
import { cn } from "../theme-classes";
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Check,
  X
} from "lucide-react";

// ================================
// TIPOS
// ================================

interface Column<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
}

interface TableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((record: T) => string);
  rowSelection?: {
    selectedRowKeys: string[];
    selectedRows: T[];
    onChange: (selectedRowKeys: string[], selectedRows: T[]) => void;
    type?: "checkbox" | "radio";
  };
  onRow?: (record: T, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  align?: "left" | "center" | "right";
}

// ================================
// HOOK PARA GERENCIAR TABELA
// ================================

const useTable = <T = any>(
  data: T[],
  options: {
    initialSort?: { key: string; direction: "asc" | "desc" };
    initialFilters?: Record<string, any>;
    initialPageSize?: number;
  } = {}
) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | undefined>(options.initialSort);
  const [filters, setFilters] = useState(options.initialFilters || {});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(options.initialPageSize || 10);

  // Filtrar dados
  const filteredData = useMemo(() => {
    if (Object.keys(filters).length === 0) return data;
    
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = (item as any)[key];
        return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  }, [data, filters]);

  // Ordenar dados
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortConfig.key];
      const bValue = (b as any)[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginar dados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  // Funções
  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return prev.direction === "asc" 
          ? { key, direction: "desc" }
          : undefined;
      }
      return { key, direction: "asc" };
    });
  };

  const handleFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return {
    data: paginatedData,
    filteredData,
    sortedData,
    sortConfig,
    filters,
    currentPage,
    pageSize,
    totalPages: Math.ceil(filteredData.length / pageSize),
    totalItems: filteredData.length,
    handleSort,
    handleFilter,
    clearFilters,
    handlePageChange,
    handlePageSizeChange,
  };
};

// ================================
// COMPONENTE TABLE PRINCIPAL
// ================================

const Table = <T = any>({
  data,
  columns,
  loading = false,
  pagination,
  rowKey = "id" as keyof T,
  rowSelection,
  onRow,
  size = "md",
  bordered = false,
  striped = true,
  hoverable = true,
  className,
}: TableProps<T>) => {
  const cardClasses = useCardClasses();
  const textClasses = useTextClasses("primary");
  const iconClasses = useIconClasses("primary");

  // Classes de tamanho
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Classes de estilo
  const styleClasses = {
    bordered: bordered ? "border border-gray-200 dark:border-white/10" : "",
    striped: striped ? "even:bg-gray-50 dark:even:bg-white/5" : "",
    hoverable: hoverable ? "hover:bg-gray-100 dark:hover:bg-white/10" : "",
  };

  // Gerar chave da linha
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return String((record as any)[rowKey] || index);
  };

  // Renderizar célula
  const renderCell = (column: Column<T>, record: T, index: number) => {
    if (column.render) {
      return column.render((record as any)[column.dataIndex!], record, index);
    }
    return (record as any)[column.dataIndex!];
  };

  // Renderizar cabeçalho da coluna
  const renderHeader = (column: Column<T>) => {
    return (
      <th
        key={column.key}
        className={cn(
          "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
          column.align === "center" && "text-center",
          column.align === "right" && "text-right",
          column.sortable && "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5",
          column.fixed === "left" && "sticky left-0 bg-white dark:bg-gray-800 z-10",
          column.fixed === "right" && "sticky right-0 bg-white dark:bg-gray-800 z-10"
        )}
        onClick={column.sortable ? () => console.log("Sort:", column.key) : undefined}
      >
        <div className="flex items-center gap-2">
          <span>{column.title}</span>
          {column.sortable && (
            <div className="flex flex-col">
              <ChevronUp className="w-3 h-3" />
              <ChevronDown className="w-3 h-3" />
            </div>
          )}
        </div>
      </th>
    );
  };

  return (
    <div className={cn("overflow-hidden rounded-lg", cardClasses, className)}>
      <div className="overflow-x-auto">
        <table className={cn("min-w-full divide-y divide-gray-200 dark:divide-white/10", sizeClasses[size])}>
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              {rowSelection && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <input
                    type={rowSelection.type === "radio" ? "radio" : "checkbox"}
                    className="rounded border-gray-300 dark:border-gray-600"
                    checked={rowSelection.selectedRowKeys.length === data.length}
                    onChange={(e) => {
                      if (rowSelection.type === "radio") return;
                      const allKeys = data.map((record, index) => getRowKey(record, index));
                      if (e.target.checked) {
                        rowSelection.onChange(allKeys, data);
                      } else {
                        rowSelection.onChange([], []);
                      }
                    }}
                  />
                </th>
              )}
              {columns.map(renderHeader)}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-white/10">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Carregando...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Nenhum dado encontrado
                </td>
              </tr>
            ) : (
              data.map((record, index) => {
                const key = getRowKey(record, index);
                const rowProps = onRow?.(record, index) || {};
                const isSelected = rowSelection?.selectedRowKeys.includes(key);

                return (
                  <tr
                    key={key}
                    className={cn(
                      styleClasses.striped,
                      styleClasses.hoverable,
                      isSelected && "bg-blue-50 dark:bg-blue-500/20",
                      rowProps.className
                    )}
                    onClick={rowProps.onClick}
                    onDoubleClick={rowProps.onDoubleClick}
                  >
                    {rowSelection && (
                      <td className="px-4 py-3">
                        <input
                          type={rowSelection.type === "radio" ? "radio" : "checkbox"}
                          className="rounded border-gray-300 dark:border-gray-600"
                          checked={isSelected}
                          onChange={(e) => {
                            if (rowSelection.type === "radio") {
                              rowSelection.onChange([key], [record]);
                            } else {
                              const newKeys = e.target.checked
                                ? [...rowSelection.selectedRowKeys, key]
                                : rowSelection.selectedRowKeys.filter(k => k !== key);
                              const newRows = e.target.checked
                                ? [...rowSelection.selectedRows, record]
                                : rowSelection.selectedRows.filter(r => getRowKey(r, 0) !== key);
                              rowSelection.onChange(newKeys, newRows);
                            }
                          }}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3 whitespace-nowrap",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
                          column.fixed === "left" && "sticky left-0 bg-white dark:bg-gray-800 z-10",
                          column.fixed === "right" && "sticky right-0 bg-white dark:bg-gray-800 z-10"
                        )}
                        style={{ width: column.width }}
                      >
                        {renderCell(column, record, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ================================
// COMPONENTE PAGINAÇÃO
// ================================

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = true,
  showQuickJumper = false,
  className,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const textClasses = useTextClasses("secondary");

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (current >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-between px-4 py-3", className)}>
      <div className={cn("text-sm", textClasses)}>
        Mostrando {((current - 1) * pageSize) + 1} a {Math.min(current * pageSize, total)} de {total} resultados
      </div>
      
      <div className="flex items-center gap-2">
        {showSizeChanger && (
          <select
            value={pageSize}
            onChange={(e) => onChange(1, Number(e.target.value))}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
          >
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
            <option value={100}>100 por página</option>
          </select>
        )}
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChange(current - 1, pageSize)}
            disabled={current === 1}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/10"
          >
            Anterior
          </button>
          
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onChange(page, pageSize)}
              disabled={typeof page !== "number"}
              className={cn(
                "px-3 py-1 text-sm border rounded",
                page === current
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-white/10",
                typeof page !== "number" && "cursor-default"
              )}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onChange(current + 1, pageSize)}
            disabled={current === totalPages}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/10"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

// ================================
// COMPONENTE FILTROS
// ================================

interface TableFiltersProps {
  columns: Column[];
  filters: Record<string, any>;
  onFilter: (key: string, value: any) => void;
  onClearFilters: () => void;
  className?: string;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  columns,
  filters,
  onFilter,
  onClearFilters,
  className,
}) => {
  const filterableColumns = columns.filter(col => col.filterable);

  if (filterableColumns.length === 0) return null;

  return (
    <div className={cn("p-4 border-b border-gray-200 dark:border-white/10", className)}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filtros:
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {filterableColumns.map(column => (
            <input
              key={column.key}
              type="text"
              placeholder={`Filtrar por ${column.title.toLowerCase()}`}
              value={filters[column.key] || ""}
              onChange={(e) => onFilter(column.key, e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          
          <button
            onClick={onClearFilters}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

// ================================
// COMPONENTE AÇÕES DA LINHA
// ================================

interface RowActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  className?: string;
}

const RowActions: React.FC<RowActionsProps> = ({
  onView,
  onEdit,
  onDelete,
  onMore,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {onView && (
        <button
          onClick={onView}
          className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title="Visualizar"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}
      
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          title="Editar"
        >
          <Edit className="w-4 h-4" />
        </button>
      )}
      
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          title="Excluir"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      
      {onMore && (
        <button
          onClick={onMore}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          title="Mais ações"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ================================
// EXPORTS
// ================================

export default Table;
export {
  Table,
  Pagination,
  TableFilters,
  RowActions,
  useTable,
};
