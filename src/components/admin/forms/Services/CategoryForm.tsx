import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppDialog } from "../../AppDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/lib/api/axiosInstance";

export interface ICategory {
    id?: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    icon?: string;
    features: string[];
    createdAt?: string;
    status?: "active" | "inactive";
    display_order: number | string;
}

interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: ICategory | null;
}

export function CategoryForm({
    isOpen,
    onClose,
    initialData,
}: CategoryFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ICategory>({
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
        description: initialData?.description ?? "",
        images: initialData?.images ?? [],
        icon: initialData?.icon ?? "",
        features: initialData?.features ?? [""],
        status: initialData?.status ?? "active",
        display_order: initialData?.display_order
    });

    const [imagesFile, setImagesFile] = useState<File[] | []>([]);
    const [iconFile, setIconFile] = useState<File | null>(null);

    /* ---------- IMAGE UPLOAD ---------- */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImagesFile((prev) => (
            [...prev, file]
        ));

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, URL.createObjectURL(file)]
        }))
    };

    const removeImage = (index: number) => {
        setImagesFile((prev) => prev.filter((_, i) => i !== index));

        setFormData((prev) => {
            const imageToRemove = prev.images[index];
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove);
            }

            return {
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
            };
        });
    };

    /* ---------- ICON UPLOAD ---------- */
    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIconFile(file);
        setFormData((prev) => ({
            ...prev,
            icon: URL.createObjectURL(file)
        }))
    };

    /* ---------- ICON REMOVE ---------- */
    const removeIcon = () => {
        setIconFile(null);
        setFormData((prev) => ({
            ...prev,
            icon: ""
        }))
    };

    /* ---------- FEATURES ---------- */
    const updateFeatures = (value: string, index: number) => {
        const updated = [...formData.features];
        updated[index] = value;
        setFormData({ ...formData, features: updated });
    };

    const addFeatures = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeatures = (index: number) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index),
        });
    };

    /* ---------- SUBMIT ---------- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.post("/admin/service_categories",
                {
                    ...formData,
                    images: imagesFile,
                    icon: iconFile
                }
            )
            if (response) {
                onClose();
            }
            console.log("Add Category", response);
        } catch (error) {
            console.log(`Add category fail ${error?.message}`)
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppDialog
            open={isOpen}
            onClose={onClose}
            maxWidth="max-w-4xl"
            title={initialData ? "Update Category" : "Add Category"}
        >
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* BASIC INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label>Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Slug</Label>
                        <Input
                            value={formData.slug}
                            onChange={(e) =>
                                setFormData({ ...formData, slug: e.target.value })
                            }
                            placeholder="post-production"
                        />
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                {/* ICON */}
                <div className="space-y-2">
                    <Label>Category Icon</Label>
                    <div className="flex gap-3 flex-wrap">
                        {formData?.icon ? (
                            <div className="relative w-24 h-24">
                                <img
                                    src={formData?.icon}
                                    className="w-full h-full object-cover rounded-md border"
                                />
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 bg-white border rounded-full p-1"
                                    onClick={removeIcon}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleIconChange}
                                />
                                <span className="text-3xl text-gray-400">+</span>
                            </label>
                        )}
                    </div>
                </div>

                {/* IMAGES */}
                <div className="space-y-2">
                    <Label>Gallery Images</Label>
                    <div className="flex gap-2 flex-wrap">
                        {formData?.images.map((img, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img
                                    src={img}
                                    className="w-full h-full object-cover rounded-md border"
                                />
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 bg-white border rounded-full p-1"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <span className="text-3xl text-gray-400">+</span>
                        </label>
                    </div>
                </div>

                {/* KEY POINTS */}
                <div className="space-y-3">
                    <Label>Key Points</Label>
                    {formData?.features?.map((point, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                value={point}
                                onChange={(e) =>
                                    updateFeatures(e.target.value, index)
                                }
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeFeatures(index)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addFeatures}>
                        + Add Key Point
                    </Button>
                </div>

                {/* STATUS  */}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label>Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: "active" | "inactive") =>
                                setFormData({ ...formData, status: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Display Order */}
                    <div className="space-y-1.5">
                        <Label>Display Order</Label>
                        <Input
                            type="number"
                            value={formData?.display_order ?? ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    display_order: (e.target.value),
                                })
                            }
                        />
                    </div>
                </div>

                {/* ---------- ACTIONS ---------- */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? loading ? "Update" : "Updating" : loading ? "Create" : "Creating"}
                    </Button>
                </div>
            </form>
        </AppDialog>
    );
}
