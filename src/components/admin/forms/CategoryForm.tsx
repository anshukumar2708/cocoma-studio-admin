import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppDialog } from "../AppDialog";

export interface ICategory {
    id?: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    icon?: string;
    keyPoints: string[];
    createdAt?: string;
    status?: "active" | "inactive";
}

interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ICategory) => void;
    initialData?: ICategory | null;
}

export function CategoryForm({
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

    const [images, setImages] = useState<string[]>(formData.images);
    const [iconPreview, setIconPreview] = useState<string>(formData.icon || "");

    /* ---------- MULTIPLE IMAGES UPLOAD ---------- */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                setImages([...images, reader.result as string]);
                setFormData({ ...formData, images: [...images, reader.result as string] });
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        setFormData({ ...formData, images: newImages });
    };

    /* ---------- SINGLE ICON UPLOAD ---------- */
    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                setIconPreview(reader.result as string);
                setFormData({ ...formData, icon: reader.result as string });
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const removeIcon = () => {
        setIconPreview("");
        setFormData({ ...formData, icon: "" });
    };

    /* ---------- KEY POINTS ---------- */
    const updateKeyPoint = (value: string, index: number) => {
        const updated = [...formData.keyPoints];
        updated[index] = value;
        setFormData({ ...formData, keyPoints: updated });
    };

    const addKeyPoint = () => {
        setFormData({ ...formData, keyPoints: [...formData.keyPoints, ""] });
    };

    const removeKeyPoint = (index: number) => {
        setFormData({
            ...formData,
            keyPoints: formData.keyPoints.filter((_, i) => i !== index),
        });
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
            title={initialData ? "Update Category" : "Add Category"}
        >
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* ---------- BASIC INFO ---------- */}
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

                {/* ---------- DESCRIPTION ---------- */}
                <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        required
                    />
                </div>

                {/* ---------- ICON UPLOAD ---------- */}
                <div className="space-y-2">
                    <Label>Icon</Label>
                    <div className="flex items-center gap-2 flex-wrap">
                        {iconPreview ? (
                            <div className="relative w-24 h-24">
                                <img
                                    src={iconPreview}
                                    className="w-full h-full object-cover rounded-md border"
                                />
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 bg-white hover:bg-primary border rounded-full p-1"
                                    onClick={removeIcon}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-100">
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

                {/* ---------- MULTIPLE IMAGES ---------- */}
                <div className="space-y-2">
                    <Label>Images</Label>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {images.map((img, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img
                                    src={img}
                                    className="w-full h-full object-cover rounded-md border"
                                />
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 bg-white hover:bg-primary border rounded-full p-1"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        {/* Plus button always at the end */}
                        <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-100">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <span className="text-3xl font-bold text-gray-400">+</span>
                        </label>
                    </div>
                </div>

                {/* ---------- KEY POINTS ---------- */}
                <div className="space-y-2">
                    <Label>Key Points</Label>
                    {formData.keyPoints.map((point, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                value={point}
                                onChange={(e) => updateKeyPoint(e.target.value, index)}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeKeyPoint(index)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addKeyPoint}>
                        + Add Key Point
                    </Button>
                </div>

                {/* ---------- ACTIONS ---------- */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">{initialData ? "Update" : "Create"}</Button>
                </div>
            </form>
        </AppDialog>
    );
}
