import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter?: (filter: string) => void;
  filterOptions?: FilterOption[];
  placeholder?: string;
}

export function SearchFilter({
  onSearch,
  onFilter,
  filterOptions,
  placeholder = "Search...",
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {filterOptions && onFilter && (
        <Select onValueChange={onFilter}>
          <SelectTrigger className="sm:w-[200px]">
            <Filter className="w-4 h-4" />
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {filterOptions?.map((option) => (
              <SelectItem key={option?.value} value={option?.value}>
                {option?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
