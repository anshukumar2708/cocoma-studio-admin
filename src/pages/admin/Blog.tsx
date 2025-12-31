import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { BlogPost } from "@/types/admin";
import { blogData } from "@/data/blogData";
import { toast } from "sonner";

export default function Blog() {
  const [data, setData] = useState<BlogPost[]>(blogData);
  const [filteredData, setFilteredData] = useState<BlogPost[]>(blogData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
  const itemsPerPage = 5;

  const columns: Column<BlogPost>[] = [
    { key: "title", label: "Title", sortable: true },
    { key: "author", label: "Author", sortable: true },
    { key: "category", label: "Category", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "published"
          ? "bg-success/10 text-success"
          : "bg-warning/10 text-warning"
          }`}>
          {item.status}
        </span>
      )
    },
    { key: "publishDate", label: "Published", sortable: true },
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
      const filtered = data.filter((item) => item.status === filter);
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const handleEdit = (item: BlogPost) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: BlogPost) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setData(data.filter((d) => d.id !== item.id));
      setFilteredData(filteredData.filter((d) => d.id !== item.id));
      toast.success("Blog post deleted successfully");
    }
  };

  const handleSave = (post: Partial<BlogPost>) => {
    if (editingItem) {
      const updated = data.map((item) =>
        item.id === editingItem.id ? { ...item, ...post } : item
      );
      setData(updated);
      setFilteredData(updated);
      toast.success("Blog post updated successfully");
    } else {
      const newPost = {
        ...post,
        id: String(data.length + 1),
      } as BlogPost;
      setData([...data, newPost]);
      setFilteredData([...filteredData, newPost]);
      toast.success("Blog post created successfully");
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
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-aos="fade-down">
        <div>
          <h2 className="text-3xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground mt-1">Manage your blog content</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Blog Post
        </Button>
      </div>

      <div data-aos="fade-up">
        <SearchFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          filterOptions={filterOptions}
          placeholder="Search blog posts..."
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

      {/* <BlogForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        initialData={editingItem}
      /> */}
    </div>
  );
}
