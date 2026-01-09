import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { IBanner } from "@/types/admin";
import { toast } from "sonner";
import { BannerForm } from "@/components/admin/forms/BannerForm";
import { StatusToggle } from "@/components/admin/StatusToggle";
import axiosInstance from "@/lib/api/axiosInstance";
import { FormattedDate } from "@/lib/utils";
import UpdateStatusModel from "@/components/admin/UpdateStatusModel";

export default function Banner() {
    const [bannerData, setBannerData] = useState<IBanner[] | []>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [editingItem, setEditingItem] = useState<IBanner | null>(null);
    const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(bannerData?.length / itemsPerPage);


    useEffect(() => {
        const getBannerData = async () => {
            try {
                const response = await axiosInstance.get("/admin/banners");
                if (response) {
                    setBannerData(response?.data?.data);
                }
            } catch (error) {
                console.log(`Get Banner api fail ${error?.message}`);
            }
        };

        getBannerData();
    }, []);

    const columns: Column<IBanner>[] = [
        { key: "title", label: "Title", sortable: true },
        { key: "description", label: "Description", sortable: true },
        {
            key: "image",
            label: "Image",
            sortable: true,
            render: (item) => (
                <div className="flex justify-center">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-auto object-cover rounded-md border"
                        />
                    ) : (
                        <div className="w-12 h-12 flex items-center justify-center rounded-md border text-xs text-gray-400">
                            N/A
                        </div>
                    )}
                </div>
            )
        },
        {
            key: "page_type",
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
                    <p
                        className={`px-2 w-20 flex justify-center items-center py-1 rounded-full text-sm font-medium capitalize
          ${styles[item?.page_type] || "bg-muted text-muted-foreground"}
        `}
                    >
                        {item?.page_type}
                    </p>
                );
            },
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (item) => (
                <StatusToggle
                    status={item?.status}
                    onToggle={() => statusModelOpen(item)}
                />
            ),
        },
        { key: "display_order", label: "Display Order", sortable: true },
        {
            key: "created_at",
            label: "Created",
            sortable: true,
            render: (item: IBanner) => (
                <p className="px-2 py-1 w-24 flex justify-center items-center rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {FormattedDate(item?.created_at)}
                </p>
            ),
        }
    ];

    // Open model for update status 
    const statusModelOpen = (data: IBanner) => {
        setUpdateData(data)
        setIsStatusUpdateOpen(true);
    };


    const handleSearch = (query: string) => {

    };

    const handleFilter = (filter: string) => {

    };

    const handleEdit = (item: IBanner) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item: IBanner) => {
        toast.success("Banner deleted successfully");
    };

    const PAGE_TYPES = [
        { value: "home", label: "Home" },
        { value: "about", label: "About" },
        { value: "category", label: "Category" },
        { value: "contact", label: "Contact Us" },
    ];

    const updateStatus = async (status: string) => {
        try {
            setStatusUpdateLoading(true);
            const response = await axiosInstance.post(
                `admin/banners/${updateData?.id}`,
                { status: status }
            )
            console.log("update status", response?.data?.banner);
            if (response) {
                setBannerData((prev) =>
                    prev?.map((item: IBanner) =>
                        item.id === response?.data?.banner?.id
                            ? {
                                ...item,
                                status: response?.data?.banner?.status,
                            }
                            : item
                    )
                );
                toast.success("Banner status update successfully");
                setIsStatusUpdateOpen(false);
            }
        } catch (error) {
            console.log(`Banner status update fail ${error.message}`)
        } finally {
            setStatusUpdateLoading(false);
        }
    }

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
                    placeholder="Search Banner..."
                />
            </div>

            {bannerData?.length > 0 &&
                <div data-aos="fade-up" data-aos-delay="100">
                    <DataTable
                        data={bannerData}
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
                </div>}

            {/* Add & Update Banner Form */}
            <BannerForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                }}
                setBannerData={setBannerData}
                initialData={editingItem}
            />

            {/* Update Banner Status Model */}
            <UpdateStatusModel
                isOpen={isStatusUpdateOpen}
                onClose={() => {
                    setIsStatusUpdateOpen(false);
                }}
                initialStatus={updateData?.status}
                message={`Are you want to update ${updateData?.page_type} banner status from`}
                loading={statusUpdateLoading}
                onSubmit={updateStatus}
            />
        </div>
    );
}
