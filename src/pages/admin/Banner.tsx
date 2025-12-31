import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { IBanner } from "@/types/admin";
import { toast } from "sonner";
import { BannerForm } from "@/components/admin/forms/BannerForm";
import { bannerData } from "@/data/bannerData";
import { Switch } from "@/components/ui/switch";

export default function Banner() {
    const [data, setData] = useState<IBanner[]>(bannerData);
    const [filteredData, setFilteredData] = useState<IBanner[]>(bannerData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IBanner | null>(null);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const handleToggle = (id: string) => {
        // Update the main data state
        const updatedData = data?.map((item) =>
            item?.id === id
                ? { ...item, status: item.status === "active" ? "inActive" : "active" }
                : item
        );
        setData(updatedData);

        // Also update filteredData if a filter is active
        const updatedFiltered = filteredData?.map((item) =>
            item.id === id
                ? { ...item, status: item.status === "active" ? "inActive" : "active" }
                : item
        );
        setFilteredData(updatedFiltered);
    };

    const columns: Column<IBanner>[] = [
        { key: "title", label: "Title", sortable: true },
        { key: "description", label: "Description", sortable: true },
        {
            key: "pageType",
            label: "Page Type",
            sortable: true,
            render: (item) => {
                const styles: Record<string, string> = {
                    home: "bg-blue-100 text-blue-700",
                    about: "bg-purple-100 text-purple-700",
                    service: "bg-pink-100 text-pink-700",
                    work: "bg-yellow-100 text-yellow-800",
                    solutions: "bg-indigo-100 text-indigo-700",
                    blog: "bg-green-100 text-green-700",
                };

                return (
                    <span
                        className={`px-2 py-1 rounded-full text-sm font-medium capitalize
          ${styles[item.pageType] || "bg-muted text-muted-foreground"}
        `}
                    >
                        {item.pageType}
                    </span>
                );
            },
        }
        ,
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (item) => (
                <div className="flex justify-center items-center gap-2">
                    <span
                        className={`px-2 py-1 w-[75px] text-center rounded-full text-sm font-medium capitalize ${item.status === "active"
                            ? "bg-success/10 text-success"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {item.status}
                    </span>
                    <Switch
                        checked={item.status === "active"}
                        onCheckedChange={() => handleToggle(item.id)}
                    />
                </div>
            ),
        },
        {
            key: "createdAt",
            label: "Created",
            sortable: true,
            render: (item: IBanner) => (
                <p className="px-2 py-1 w-20 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.createdAt}
                </p>
            ),
        }
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
            const filtered = data.filter((item) => item.pageType === filter);
            setFilteredData(filtered);
        }
        setCurrentPage(1);
    };

    const handleEdit = (item: IBanner) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: IBanner) => {
        if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
            setData(data.filter((d) => d.id !== item.id));
            setFilteredData(filteredData.filter((d) => d.id !== item.id));
            toast.success("Service deleted successfully");
        }
    };

    const handleSave = (banner: Partial<IBanner>) => {
        if (editingItem) {
            const updated = data.map((item) =>
                item.id === editingItem.id ? { ...item, ...banner } : item
            );
            setData(updated);
            setFilteredData(updated);
            toast.success("Service updated successfully");
        } else {
            const newService = {
                ...banner,
                id: String(data.length + 1),
                createdAt: new Date().toISOString().split("T")[0],
            } as IBanner;
            setData([...data, newService]);
            setFilteredData([...filteredData, newService]);
            toast.success("Service created successfully");
        }
        setIsFormOpen(false);
        setEditingItem(null);
    };



    const PAGE_TYPES = [
        { value: "home", label: "Home" },
        { value: "about", label: "About" },
        { value: "category", label: "Category" },
        { value: "contact", label: "Contact Us" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-aos="fade-down">
                <div>
                    <h2 className="text-3xl font-bold">Banner</h2>
                    <p className="text-muted-foreground mt-1">Manage your Banner offerings</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Banner
                </Button>
            </div>

            <div data-aos="fade-up">
                <SearchFilter
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    filterOptions={PAGE_TYPES}
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

            <BannerForm
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
