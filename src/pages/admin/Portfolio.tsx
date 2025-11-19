import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { Portfolio } from "@/types/admin";
import { portfolioData } from "@/data/portfolioData";
import { PortfolioForm } from "@/components/admin/forms/PortfolioForm";
import { toast } from "sonner";

export default function PortfolioPage() {
  const [data, setData] = useState<Portfolio[]>(portfolioData);
  const [filteredData, setFilteredData] = useState<Portfolio[]>(portfolioData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const itemsPerPage = 5;

  const columns: Column<Portfolio>[] = [
    { key: "title", label: "Title", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "clientName", label: "Client", sortable: true },
    { 
      key: "featured", 
      label: "Featured", 
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.featured 
            ? "bg-primary/10 text-primary" 
            : "bg-muted text-muted-foreground"
        }`}>
          {item.featured ? "Yes" : "No"}
        </span>
      )
    },
    { key: "completionDate", label: "Completed", sortable: true },
  ];

  const handleSearch = (query: string) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (filter: string) => {
    if (filter === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.category === filter);
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const handleEdit = (item: Portfolio) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Portfolio) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setData(data.filter((d) => d.id !== item.id));
      setFilteredData(filteredData.filter((d) => d.id !== item.id));
      toast.success("Portfolio item deleted successfully");
    }
  };

  const handleSave = (portfolio: Partial<Portfolio>) => {
    if (editingItem) {
      const updated = data.map((item) =>
        item.id === editingItem.id ? { ...item, ...portfolio } : item
      );
      setData(updated);
      setFilteredData(updated);
      toast.success("Portfolio updated successfully");
    } else {
      const newItem = {
        ...portfolio,
        id: String(data.length + 1),
      } as Portfolio;
      setData([...data, newItem]);
      setFilteredData([...filteredData, newItem]);
      toast.success("Portfolio created successfully");
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterOptions = [
    { value: "Film", label: "Film" },
    { value: "Localization", label: "Localization" },
    { value: "Music Video", label: "Music Video" },
    { value: "Documentary", label: "Documentary" },
    { value: "Commercial", label: "Commercial" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-aos="fade-down">
        <div>
          <h2 className="text-3xl font-bold">Portfolio</h2>
          <p className="text-muted-foreground mt-1">Showcase your best work</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Portfolio Item
        </Button>
      </div>

      <div data-aos="fade-up">
        <SearchFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          filterOptions={filterOptions}
          placeholder="Search portfolio..."
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <DataTable
          data={paginatedData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          idKey="id"
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <PortfolioForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        initialData={editingItem}
      />
    </div>
  );
}
