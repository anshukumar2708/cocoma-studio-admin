import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { Service } from "@/types/admin";
import { servicesData } from "@/data/servicesData";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";
import { toast } from "sonner";

export default function Services() {
  const [data, setData] = useState<Service[]>(servicesData);
  const [filteredData, setFilteredData] = useState<Service[]>(servicesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const itemsPerPage = 5;

  const columns: Column<Service>[] = [
    { key: "title", label: "Title", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === "active" 
            ? "bg-success/10 text-success" 
            : "bg-muted text-muted-foreground"
        }`}>
          {item.status}
        </span>
      )
    },
    { key: "createdAt", label: "Created", sortable: true },
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

  const handleEdit = (item: Service) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Service) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setData(data.filter((d) => d.id !== item.id));
      setFilteredData(filteredData.filter((d) => d.id !== item.id));
      toast.success("Service deleted successfully");
    }
  };

  const handleSave = (service: Partial<Service>) => {
    if (editingItem) {
      const updated = data.map((item) =>
        item.id === editingItem.id ? { ...item, ...service } : item
      );
      setData(updated);
      setFilteredData(updated);
      toast.success("Service updated successfully");
    } else {
      const newService = {
        ...service,
        id: String(data.length + 1),
        createdAt: new Date().toISOString().split("T")[0],
      } as Service;
      setData([...data, newService]);
      setFilteredData([...filteredData, newService]);
      toast.success("Service created successfully");
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
    { value: "Marketing", label: "Marketing" },
    { value: "Production", label: "Production" },
    { value: "Localization", label: "Localization" },
    { value: "Post-Production", label: "Post-Production" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-aos="fade-down">
        <div>
          <h2 className="text-3xl font-bold">Services</h2>
          <p className="text-muted-foreground mt-1">Manage your service offerings</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      <div data-aos="fade-up">
        <SearchFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          filterOptions={filterOptions}
          placeholder="Search services..."
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

      <ServiceForm
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
