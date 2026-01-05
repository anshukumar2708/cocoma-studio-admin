import { useState } from "react";
import { Plus } from "lucide-react";
import { Film, Globe, Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { WorkCategoryForm } from "@/components/admin/forms/OurWork/WorkCategoryForm";

interface ICategory {
    id: string;
    icon: any;
    title: string;
    slug: string;
    status: string;
    createdAt: string;
}

const categoryData = [
    {
        id: "cat_001",
        icon: Film,
        title: "Film & Trailer Production",
        slug: "film-trailer-production",
        status: "active",
        createdAt: "2025-01-02",
    },
    {
        id: "cat_002",
        icon: Sparkles,
        title: "Post Production & VFX",
        slug: "post-production-vfx",
        status: "active",
        createdAt: "2025-01-02",
    },
    {
        id: "cat_003",
        icon: Globe,
        title: "Localization & Dubbing",
        slug: "localization-dubbing",
        status: "inActive",
        createdAt: "2025-01-02",
    },
    {
        id: "cat_004",
        icon: Music,
        title: "Music & Audio Production",
        slug: "music-audio-production",
        status: "inActive",
        createdAt: "2025-01-02",
    },
];


export default function WorkCategories() {
    const [filteredData, setFilteredData] = useState<ICategory[]>(categoryData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ICategory | null>(null);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleToggle = (id: string) => {
        // toggle logic here
    };

    const columns: Column<ICategory>[] = [
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
        {
            key: "title",
            label: "Title",
            sortable: true,
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
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
            sortable: true,
        },
    ];

    // const FILTER_OPTION = [
    //     { value: "visual-promotion", label: "Visual Promotion" },
    //     { value: "post-production", label: "Post-Production" },
    //     { value: "localisation-services", label: "Localisation Services" },
    //     { value: "music-video-production", label: "Music Video Production" },
    // ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Work Categories</h2>
                    <p className="text-muted-foreground">
                        Manage your Work Category offerings
                    </p>
                </div>
                <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Work Category
                </Button>
            </div>

            <SearchFilter
                onSearch={() => { }}
                onFilter={() => { }}
                // filterOptions={FILTER_OPTION}
                placeholder="Search Work Category..."
            />

            <DataTable
                data={paginatedData}
                columns={columns}
                onEdit={setEditingItem}
                onDelete={() => { }}
                idKey="id"
            />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <WorkCategoryForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                }}
                onSave={() => { }}
            />
        </div>
    );
}
