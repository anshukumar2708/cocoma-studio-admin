import { useState } from "react";
import { Plus } from "lucide-react";
import { Camera, Film, Languages, Music, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { toast } from "sonner";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { SolutionForm } from "@/components/admin/forms/SolutionForm";

const solutionsData = [
    {
        id: "1",
        title: "Visual Promotion",
        description:
            "Create stunning key art, trailers, and social media content that captures attention.",
        category: "Marketing",
        images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
        icon: Camera,
        features: [
            "Key Art Development",
            "Trailer & Teaser Editing",
            "Social Media Creatives",
        ],
        createdAt: "2024-01-15",
        status: "active",
    },
    {
        id: "2",
        title: "Post-Production",
        description:
            "Complete editing, sound design, color grading, and VFX for films and web series.",
        category: "Production",
        images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
        icon: Film,
        features: [
            "Film & Web Series Editing",
            "Sound Design & Mixing",
            "Color Grading / DI",
        ],
        createdAt: "2024-01-20",
        status: "active",
    },
    {
        id: "3",
        title: "Localisation Services",
        description:
            "Professional transcription, translation, subtitling, and dubbing in multiple languages.",
        category: "Localization",
        images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
        icon: Languages,
        features: [
            "Transcription & Translation",
            "Subtitling & Dubbing",
            "Multi-language Administration",
        ],
        createdAt: "2024-02-01",
        status: "active",
    },
    {
        id: "4",
        title: "Music Video Production",
        description:
            "End-to-end music video production, from concept to final delivery.",
        category: "Production",
        images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
        icon: Music,
        features: [
            "Music Video Editing",
            "Key Art Development",
            "Promo & Teaser Editing",
        ],
        createdAt: "2024-02-10",
        status: "active",
    },
    {
        id: "5",
        title: "Color Grading & DI",
        description:
            "Professional color correction and digital intermediate services for cinematic quality.",
        category: "Post-Production",
        images: ["https://images7.alphacoders.com/472/thumb-1920-472502.jpg"],
        icon: Palette,
        features: ["Color Correction", "Look Development", "HDR Mastering"],
        createdAt: "2024-02-15",
        status: "active",
    },
];

export default function Solutions() {
    const [data, setData] = useState(solutionsData);
    const [filteredData, setFilteredData] = useState(solutionsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const itemsPerPage = 5;

    const handleToggle = (id: string) => {
        const updated = data.map((item) =>
            item.id === id
                ? { ...item, status: item.status === "active" ? "inactive" : "active" }
                : item
        );
        setData(updated);
        setFilteredData(updated);
    };

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
            },
        },
        { key: "title", label: "Title", sortable: true },
        { key: "description", label: "Description", sortable: true },
        {
            key: "features",
            label: "Features",
            render: (item) => (
                <ul className="list-disc pl-4 text-sm text-gray-700">
                    {item.features.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (item) => (
                <StatusToggle
                    status={item.status}
                    onToggle={() => handleToggle(item.id)}
                />
            ),
        },
        {
            key: "createdAt",
            label: "Created",
            render: (item) => (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                    {item.createdAt}
                </span>
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
            setFilteredData(data.filter((item) => item.category === filter));
        }
        setCurrentPage(1);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item) => {
        if (confirm(`Delete solution "${item.title}"?`)) {
            const updated = data.filter((d) => d.id !== item.id);
            setData(updated);
            setFilteredData(updated);
            toast.success("Solution deleted successfully");
        }
    };

    const handleSave = (solution) => {
        if (editingItem) {
            const updated = data.map((item) =>
                item.id === editingItem.id ? { ...item, ...solution } : item
            );
            setData(updated);
            setFilteredData(updated);
            toast.success("Solution updated successfully");
        } else {
            const newSolution = {
                ...solution,
                id: String(data.length + 1),
                createdAt: new Date().toISOString().split("T")[0],
            };
            setData([...data, newSolution]);
            setFilteredData([...filteredData, newSolution]);
            toast.success("Solution created successfully");
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
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Solutions</h2>
                    <p className="text-muted-foreground">
                        Manage your solutions portfolio
                    </p>
                </div>
                <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Solution
                </Button>
            </div>

            <SearchFilter
                onSearch={handleSearch}
                onFilter={handleFilter}
                filterOptions={filterOptions}
                placeholder="Search solutions..."
            />

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
            <SolutionForm
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
