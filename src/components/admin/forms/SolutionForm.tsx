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
import { AppDialog } from "../AppDialog";

/* ================= TYPES ================= */

export interface ISolution {
    id?: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    icon?: string;
    keyPoints: string[];
    createdAt?: string;
    status?: "active" | "inactive";
    solutionType?: string;
}

interface SolutionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ISolution) => void;
    initialData?: ISolution | null;
}

/* ================= OPTIONS ================= */

const SOLUTION_OPTIONS = [
    { label: "Visual Promotion", value: "visual-promotion" },
    { label: "Post Production", value: "post-production" },
    { label: "Digital Marketing", value: "digital-marketing" },
    { label: "Brand Strategy", value: "brand-strategy" },
];

/* ================= COMPONENT ================= */

export function SolutionForm({
    isOpen,
    onClose,
    onSave,
    initialData,
}: SolutionFormProps) {
    const [formData, setFormData] = useState<ISolution>({
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
        description: initialData?.description ?? "",
        images: initialData?.images ?? [],
        icon: initialData?.icon ?? "",
        keyPoints: initialData?.keyPoints ?? [""],
        status: "active",
        solutionType: initialData?.solutionType ?? "",
    });

    const [images, setImages] = useState<string[]>(formData.images);
    const [iconPreview, setIconPreview] = useState<string>(formData.icon || "");


    /* ---------- ICON ---------- */
    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const reader = new FileReader();
        reader.onload = () => {
            setIconPreview(reader.result as string);
            setFormData({ ...formData, icon: reader.result as string });
        };
        reader.readAsDataURL(e.target.files[0]);
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
            title={initialData ? "Update Solution" : "Add Solution"}
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
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                {/* ---------- SOLUTION + ICON ---------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Icon Upload */}
                    <div className="space-y-1.5">
                        <Label>Icon</Label>
                        <div className="flex gap-2 mt-1">
                            {iconPreview ? (
                                <div className="relative w-24 h-24">
                                    <img
                                        src={iconPreview}
                                        className="w-full h-full object-cover rounded-md border"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeIcon}
                                        className="absolute -top-2 -right-2 bg-background border rounded-full p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleIconChange}
                                    />
                                    <span className="text-3xl text-muted-foreground">+</span>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Solution Dropdown */}
                    <div className="space-y-1.5">
                        <Label>Status</Label>
                        <Select
                            value={formData.solutionType}
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    solutionType: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select solution" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">
                                    Active
                                </SelectItem>
                                <SelectItem value="InActive">
                                    InActive
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* ---------- KEY POINTS ---------- */}
                <div className="space-y-1.5">
                    <Label>Features</Label>
                    <div className="space-y-2">
                        {formData.keyPoints.map((point, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={point}
                                    onChange={(e) =>
                                        updateKeyPoint(e.target.value, index)
                                    }
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
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        onClick={addKeyPoint}
                    >
                        + Add Key Point
                    </Button>
                </div>

                {/* ---------- ACTIONS ---------- */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </AppDialog>
    );
}
