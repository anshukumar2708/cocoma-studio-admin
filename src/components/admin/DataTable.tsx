import { useState } from "react";
import { Edit, Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onAdd?: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  idKey: keyof T;
}

export function DataTable<T>({ data, columns, onAdd, onEdit, onDelete, idKey }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof T | string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc"
          ? { key, direction: "desc" }
          : null;
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key as keyof T];
    const bValue = b[sortConfig.key as keyof T];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className="font-semibold"
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-2 hover:text-primary transition-all duration-200"
                  >
                    {column.label}
                    {sortConfig?.key === column.key && (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={String(item[idKey])} className="hover:bg-primary/5 transition-colors duration-150">
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] || "-")}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {onAdd && <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onAdd(item)}
                    className="hover:bg-success/10 hover:text-success transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item)}
                    className="hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
