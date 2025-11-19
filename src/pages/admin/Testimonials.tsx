import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { Testimonial } from "@/types/admin";
import { testimonialsData } from "@/data/testimonialsData";
import { TestimonialForm } from "@/components/admin/forms/TestimonialForm";
import { toast } from "sonner";
import { Star } from "lucide-react";

export default function Testimonials() {
  const [data, setData] = useState<Testimonial[]>(testimonialsData);
  const [filteredData, setFilteredData] = useState<Testimonial[]>(testimonialsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const itemsPerPage = 5;

  const columns: Column<Testimonial>[] = [
    { key: "clientName", label: "Client", sortable: true },
    { key: "company", label: "Company", sortable: true },
    { 
      key: "rating", 
      label: "Rating", 
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span>{item.rating}</span>
        </div>
      )
    },
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
    { key: "createdAt", label: "Date", sortable: true },
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

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Testimonial) => {
    if (confirm(`Are you sure you want to delete testimonial from "${item.clientName}"?`)) {
      setData(data.filter((d) => d.id !== item.id));
      setFilteredData(filteredData.filter((d) => d.id !== item.id));
      toast.success("Testimonial deleted successfully");
    }
  };

  const handleSave = (testimonial: Partial<Testimonial>) => {
    if (editingItem) {
      const updated = data.map((item) =>
        item.id === editingItem.id ? { ...item, ...testimonial } : item
      );
      setData(updated);
      setFilteredData(updated);
      toast.success("Testimonial updated successfully");
    } else {
      const newItem = {
        ...testimonial,
        id: String(data.length + 1),
        createdAt: new Date().toISOString().split("T")[0],
      } as Testimonial;
      setData([...data, newItem]);
      setFilteredData([...filteredData, newItem]);
      toast.success("Testimonial created successfully");
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-aos="fade-down">
        <div>
          <h2 className="text-3xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground mt-1">Client feedback and reviews</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      <div data-aos="fade-up">
        <SearchFilter
          onSearch={handleSearch}
          placeholder="Search testimonials..."
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

      <TestimonialForm
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
