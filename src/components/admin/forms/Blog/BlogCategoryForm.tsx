import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppDialog } from "../../AppDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface ICategory {
    id?: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    icon?: string;
    keyPoints: string[];
    createdAt?: string;
    status?: "active" | "inActive";
}

interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ICategory) => void;
    initialData?: ICategory | null;
}

export function BlogCategoryForm({
    isOpen,
    onClose,
    onSave,
    initialData,
}: CategoryFormProps) {
    const [formData, setFormData] = useState<ICategory>({
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
        description: initialData?.description ?? "",
        images: initialData?.images ?? [],
        icon: initialData?.icon ?? "",
        keyPoints: initialData?.keyPoints ?? [""],
        status: "active",
    });
    const [iconPreview, setIconPreview] = useState<string>(formData.icon || "");

    /* ---------- ICON UPLOAD ---------- */
    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                setIconPreview(reader.result as string);
                setFormData({ ...formData, icon: reader.result as string });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        e.target.value = "";
    };

    const removeIcon = () => {
        setIconPreview("");
        setFormData({ ...formData, icon: "" });
    };

    /* ---------- SUBMIT ---------- */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            slug:
                formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
            createdAt: initialData?.createdAt ?? new Date().toISOString(),
        });
    };

    return (
        <AppDialog
            open={isOpen}
            onClose={onClose}
            maxWidth="max-w-4xl"
            title={initialData ? "Update Blog Category" : "Add Blog Category"}
        >
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* ---------- BASIC INFO ---------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label>Blog Category Title</Label>
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

                {/* ---------- ICON ---------- */}
                <div className="space-y-2">
                    <Label>Blog Category Icon</Label>
                    <div className="flex gap-2 flex-wrap">
                        {iconPreview ? (
                            <div className="relative w-24 h-24">
                                <img
                                    src={iconPreview}
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
                                <span className="text-3xl font-bold text-gray-400">+</span>
                            </label>
                        )}
                    </div>
                </div>

                {/* STATUS  */}
                <div className="space-y-1.5 max-w-xs">
                    <Label>Status</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(value: "active" | "inActive") =>
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


                {/* ---------- ACTIONS ---------- */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? "Update Blog Category" : "Add Blog Category"}
                    </Button>
                </div>
            </form>
        </AppDialog>
    );
}
