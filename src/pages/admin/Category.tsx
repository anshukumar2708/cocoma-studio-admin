import { useState } from "react";
import { Plus } from "lucide-react";
import { Film, Globe, Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { CategoryForm } from "@/components/admin/forms/CategoryForm";

interface ICategory {
    id: string;
    icon: any;
    title: string;
    slug: string;
    description: string;
    images: string[];
    keyPoints: string[];
    createdAt: string;
}

const categoryData = [
    {
        id: "cat_001",
        icon: Film,
        title: "Visual Promotion",
        slug: "visual-promotion",
        description:
            "Create stunning key art, trailers, and social media content that captures attention. Create stunning key art, trailers, and social media content that captures attention. Create stunning key art, trailers, and social media content that captures attention.",
        images: [
            "https://img.freepik.com/free-photo/beautiful-blooming-flowers-spring-season_23-2150790292.jpg?t=st=1767336474~exp=1767340074~hmac=018b5516e70e1dc354cbec15cbd3f0fb5d345751c13834d124844f4cef398ab2",
        ],
        keyPoints: [
            "Key Art Development",
            "Trailer & Teaser Editing",
            "Social Media Creatives",
        ],
        createdAt: "2025-01-02",
    },
    {
        id: "cat_002",
        icon: Sparkles,
        title: "Post-Production",
        slug: "post-production",
        description:
            "Complete editing, sound design, color grading, and VFX for films and web series. Create stunning key art, trailers, and social media content that captures attention. Create stunning key art, trailers, and social media content that captures attention.",
        images: [],
        keyPoints: [
            "Film & Web Series Editing",
            "Sound Design & Mixing",
            "Color Grading / DI",
        ],
        createdAt: "2025-01-02",
    },
    {
        id: "cat_003",
        icon: Globe,
        title: "Localisation Services",
        slug: "localisation-services",
        description:
            "Professional transcription, translation, subtitling, and dubbing in multiple languages. Create stunning key art, trailers, and social media content that captures attention. Create stunning key art, trailers, and social media content that captures attention.",
        images: [],
        keyPoints: [
            "Transcription & Translation",
            "Subtitling & Dubbing",
            "Multi-language Administration",
        ],
        createdAt: "2025-01-02",
    },
    {
        id: "cat_004",
        icon: Music,
        title: "Music Video Production",
        slug: "music-video-production",
        description:
            "End-to-end music video production, from concept to final delivery. Create stunning key art, trailers, and social media content that captures attention. Create stunning key art, trailers, and social media content that captures attention.",
        images: [],
        keyPoints: [
            "Music Video Editing",
            "Key Art Development",
            "Promo & Teaser Editing",
        ],
        createdAt: "2025-01-0",
    },
];


export default function Category() {
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

    const columns: Column<ICategory>[] = [
        {
            key: "icon",
            label: "Icon",
            sortable: false,
            render: (item: ICategory) => {
                const Icon = item.icon;
                return (
                    <div className="flex items-center justify-center">
                        <Icon className="w-8 h-8 text-gray-700" />
                    </div>
                );
            }
        },
        {
            key: "title",
            label: "Title",
            sortable: true,
            render: (item: ICategory) => (
                <p className="font-medium min-w-24 text-gray-900">
                    {item.title}
                </p>
            ),
        },
        {
            key: "description",
            label: "Description",
            sortable: true,
            render: (item: ICategory) => (
                <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                </p>
            ),
        },
        {
            key: "image",
            label: "Images",
            render: (item: ICategory) => (
                <div className="flex gap-2">
                    {item?.images?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${item.title}-${index}`}
                            className="w-16 h-auto object-cover rounded-md"
                        />
                    ))}
                </div>
            ),
        },
        {
            key: "keyPoints",
            label: "Key Points",
            sortable: false,
            render: (item: ICategory) => (
                <ul className="list-disc pl-4 text-sm text-gray-700 min-w-32">
                    {item.keyPoints?.map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            ),
        },
        {
            key: "createdAt",
            label: "Created",
            sortable: true,
            render: (item: ICategory) => (
                <p className="px-2 py-1 w-fit min-w-20 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.createdAt}
                </p>
            ),
        },
    ];


    const handleSearch = (query: string) => {

    };

    const handleFilter = (filter: string) => {

    };

    const handleEdit = (item: ICategory) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: ICategory) => {

    };

    const handleSave = (banner: Partial<ICategory>) => {

    };

    const FILTER_OPTION = [
        { value: "visual-promotion", label: "Visual Promotion" },
        { value: "post-production", label: "Post-Production" },
        { value: "localisation-services", label: "Localisation Services" },
        { value: "music-video-production", label: "Music Video Production" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-aos="fade-down">
                <div>
                    <h2 className="text-3xl font-bold">Categories</h2>
                    <p className="text-muted-foreground mt-1">Manage your Banner offerings</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Category
                </Button>
            </div>

            <div data-aos="fade-up">
                <SearchFilter
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    filterOptions={FILTER_OPTION}
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

            <CategoryForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
}
