import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AppDialog } from "../../AppDialog";

/* ================= TYPES ================= */

export interface ICategory {
    id?: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    category: string;
    createdAt?: string;
    status?: "active" | "inactive"; // ✅ fixed
}

interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ICategory) => void;
    initialData?: ICategory | null;
}

/* ================= COMPONENT ================= */

export function WorkItemForm({
    isOpen,
    onClose,
    onSave,
    initialData,
}: CategoryFormProps) {
    const [formData, setFormData] = useState<ICategory>({
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
        description: initialData?.description ?? "",
        image: initialData?.image ?? "",
        category: initialData?.category ?? "",
        status: initialData?.status ?? "active",
    });

    /* ---------- IMAGE UPLOAD (SINGLE) ---------- */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result) {
                setFormData({
                    ...formData,
                    image: reader.result as string,
                });
            }
        };

        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const removeImage = () => {
        setFormData({ ...formData, image: "" });
    };

    /* ---------- SUBMIT ---------- */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSave({
            ...formData,
            slug:
                formData.slug ||
                formData.title.toLowerCase().replace(/\s+/g, "-"),
            createdAt: initialData?.createdAt ?? new Date().toISOString(),
        });
    };

    return (
        <AppDialog
            open={isOpen}
            onClose={onClose}
            maxWidth="max-w-4xl"
            title={initialData ? "Update Work Item" : "Add Work Item"}
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
                            placeholder="action-thriller-trailer"
                        />
                    </div>
                </div>

                {/* CATEGORY + STATUS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label>Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) =>
                                setFormData({ ...formData, category: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="film">Film</SelectItem>
                                <SelectItem value="web-series">Web Series</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5 w-full">
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
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        required
                    />
                </div>

                {/* IMAGE */}
                <div className="space-y-2">
                    <Label>Image</Label>

                    {formData.image ? (
                        <div className="relative w-32 h-32">
                            <img
                                src={formData.image}
                                className="w-full h-full object-cover rounded-md border"
                            />
                            <button
                                type="button"
                                className="absolute -top-2 -right-2 bg-white border rounded-full p-1"
                                onClick={removeImage}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="w-32 h-32 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <span className="text-3xl text-gray-400">+</span>
                        </label>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? "Update Work Item" : "Create Work Item"}
                    </Button>
                </div>
            </form>
        </AppDialog>
    );
}
