import { useState } from "react";
import { Plus, Film, Globe, Music, Sparkles, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { BlogCategoryForm } from "@/components/admin/forms/Blog/BlogCategoryForm";

/* =======================
   TYPES
======================= */
interface ICategory {
    id: string;
    icon: LucideIcon;
    title: string;
    slug: string;
    status: "active" | "inActive";
    createdAt: string;
}

/* =======================
   STATIC DATA
======================= */
const categoryData: ICategory[] = [
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

/* =======================
   COMPONENT
======================= */
export default function BlogCategories() {
    const [filteredData, setFilteredData] =
        useState<ICategory[]>(categoryData);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editingItem, setEditingItem] =
        useState<ICategory | null>(null);

    const itemsPerPage = 5;

    /* =======================
       PAGINATION
    ======================= */
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    /* =======================
       STATUS TOGGLE
    ======================= */
    const handleToggle = (id: string) => {
        setFilteredData((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        status:
                            item.status === "active" ? "inActive" : "active",
                    }
                    : item
            )
        );
    };

    /* =======================
       TABLE COLUMNS
    ======================= */
    const columns: Column<ICategory>[] = [
        {
            key: "icon",
            label: "Icon",
            sortable: false,
            render: (item: ICategory) => {
                const Icon = item.icon;
                return (
                    <div className="flex justify-center">
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
            render: (item: ICategory) => (
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

    /* =======================
       RENDER
    ======================= */
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Blog Categories</h2>
                    <p className="text-muted-foreground">
                        Manage your Blog Category offerings
                    </p>
                </div>

                <Button
                    className="gap-2"
                    onClick={() => setIsFormOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    Add Blog Category
                </Button>
            </div>

            {/* Search */}
            <SearchFilter
                onSearch={() => { }}
                onFilter={() => { }}
                placeholder="Search Blog Category..."
            />

            {/* Table */}
            <DataTable
                data={paginatedData}
                columns={columns}
                idKey="id"
                onEdit={(item) => setEditingItem(item)}
                onDelete={() => { }}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Form Modal */}
            <BlogCategoryForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                }}
                onSave={() => { }}
            // initialData={editingItem}
            />
        </div>
    );
}
