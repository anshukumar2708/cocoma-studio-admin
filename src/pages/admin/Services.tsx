import { useState } from "react";
import { Images, Plus } from "lucide-react";
import { Camera, Film, Languages, Music, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";
import { toast } from "sonner";
import { StatusToggle } from "@/components/admin/StatusToggle";


const servicesData = [
  {
    id: "1",
    title: "Visual Promotion",
    description: "Create stunning key art, trailers, and social media content that captures attention.",
    category: "Marketing",
    images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
    icon: Camera,
    features: ["Key Art Development", "Trailer & Teaser Editing", "Social Media Creatives"],
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    title: "Post-Production",
    description: "Complete editing, sound design, color grading, and VFX for films and web series.",
    category: "Production",
    images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
    icon: Film,
    features: ["Film & Web Series Editing", "Sound Design & Mixing", "Color Grading / DI"],
    createdAt: "2024-01-20",
    status: "active",
  },
  {
    id: "3",
    title: "Localisation Services",
    description: "Professional transcription, translation, subtitling, and dubbing in multiple languages.",
    category: "Localization",
    images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
    icon: Languages,
    features: ["Transcription & Translation", "Subtitling & Dubbing", "Multi-language Administration"],
    createdAt: "2024-02-01",
    status: "active",
  },
  {
    id: "4",
    title: "Music Video Production",
    description: "End-to-end music video production, from concept to final delivery.",
    category: "Production",
    images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
    icon: Music,
    features: ["Music Video Editing", "Key Art Development", "Promo & Teaser Editing"],
    createdAt: "2024-02-10",
    status: "active",
  },
  {
    id: "5",
    title: "Color Grading & DI",
    description: "Professional color correction and digital intermediate services for cinematic quality.",
    category: "Post-Production",
    images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
    icon: Palette,
    features: ["Color Correction", "Look Development", "HDR Mastering"],
    createdAt: "2024-02-15",
    status: "active",
  },
];

export default function Services() {
  const [data, setData] = useState(servicesData);
  const [filteredData, setFilteredData] = useState(servicesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const itemsPerPage = 5;


  const handleToggle = (id: string) => {

  }

  const columns = [
    {
      key: "icon",
      label: "Icon",
      sortable: false,
      render: (item) => {
        const Icon = item.icon;
        return (
          <div className="flex items-center justify-center">
            <Icon className="w-8 h-8 text-gray-700" />
          </div>
        );
      }
    },
    { key: "title", label: "Title", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "category", label: "Category", sortable: true },
    {
      key: "image",
      label: "Images",
      render: (item) => (
        <div className="flex gap-2">
          <img
            src={item?.images[0]}
            alt="service-image"
            className="w-16 h-auto object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      key: "features",
      label: "Features",
      sortable: false,
      render: (item) => (
        <ul className="list-disc pl-4 text-sm text-gray-700 min-w-32">
          {item?.features?.map((point: string, index: number) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => (
        <StatusToggle
          status={item?.status}
          onToggle={() => handleToggle(item?.id)}
        />
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (item) => (
        <p className="px-2 py-1 w-fit min-w-20 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {item?.createdAt}
        </p>
      ),
    },
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

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setData(data.filter((d) => d.id !== item.id));
      setFilteredData(filteredData.filter((d) => d.id !== item.id));
      toast.success("Service deleted successfully");
    }
  };

  const handleSave = (service) => {
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
      };
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
