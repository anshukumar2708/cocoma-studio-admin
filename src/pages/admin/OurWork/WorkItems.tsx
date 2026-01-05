import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { WorkItemForm } from "@/components/admin/forms/OurWork/WorkItemForm";

interface IWorkItem {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    image: string;
    videoUrl: string;
    status: "active" | "inActive";
    createdAt: string;
}

const workItemData: IWorkItem[] = [
    {
        id: "work_001",
        title: "Action Thriller Trailer",
        slug: "action-thriller-trailer",
        description:
            "High-octane trailer editing that generated over 5 million views with powerful cuts, sound design, and cinematic pacing.",
        category: "Trailer Editing",
        image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        status: "active",
        createdAt: "2025-01-02",
    },

    {
        id: "work_002",
        title: "Visual Promotion Campaign",
        slug: "visual-promotion-campaign",
        description:
            "Creative visual promotions including teasers, posters, and social media creatives for digital and theatrical releases.",
        category: "Visual Promotion",
        image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        status: "active",
        createdAt: "2025-01-02",
    },

    {
        id: "work_003",
        title: "Multi-Language Film Localisation",
        slug: "multi-language-film-localisation",
        description:
            "Professional localisation including subtitling, dubbing, and translation for global film and OTT releases.",
        category: "Localisation Services",
        image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
        videoUrl: "https://www.youtube.com/watch?v=example3",
        status: "inActive",
        createdAt: "2025-01-02",
    },

    {
        id: "work_004",
        title: "Indie Music Video Production",
        slug: "indie-music-video-production",
        description:
            "Complete music video production covering concept development, editing, color grading, and final mastering.",
        category: "Music Video Production",
        image:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        videoUrl: "https://www.youtube.com/watch?v=example4",
        status: "inActive",
        createdAt: "2025-01-02",
    },
];

export default function WorkItems() {
    const [filteredData, setFilteredData] = useState<IWorkItem[]>(workItemData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IWorkItem | null>(null);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleToggle = (id: string) => {
        // toggle status logic
    };

    const columns: Column<IWorkItem>[] = [
        {
            key: "title",
            label: "Title",
            sortable: true,
        },
        {
            key: "description",
            label: "Description",
            render: (item) => (
                <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                </p>
            ),
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
        },
        {
            key: "image",
            label: "Image",
            render: (item) => (
                <img
                    src={item?.image}
                    className="w-16 rounded-md"
                />
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
                <p className="w-20">
                    {item?.createdAt}
                </p>
            ),
        },
    ];

    const FILTER_OPTION = [
        { value: "visual-promotion", label: "Visual Promotion" },
        { value: "post-production", label: "Post-Production" },
        { value: "localisation-services", label: "Localisation Services" },
        { value: "music-video-production", label: "Music Video Production" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Work Items</h2>
                    <p className="text-muted-foreground">
                        Manage your media work items and services
                    </p>
                </div>
                <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Work Item
                </Button>
            </div>

            {/* Search & Filter */}
            <SearchFilter
                onSearch={() => { }}
                onFilter={() => { }}
                filterOptions={FILTER_OPTION}
                placeholder="Search Work Item..."
            />

            {/* Table */}
            <DataTable
                data={paginatedData}
                columns={columns}
                onEdit={(item) => {
                    setEditingItem(item);
                    setIsFormOpen(true);
                }}
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

            {/* Form */}
            <WorkItemForm
                isOpen={isFormOpen}
                // initialData={editingItem}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                }}
                onSave={() => { }}
            />
        </div>
    );
}
