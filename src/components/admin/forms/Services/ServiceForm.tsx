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

export interface IService {
  id?: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  icon?: string;
  keyPoints: string[];
  createdAt?: string;
  status?: "active" | "inactive";
  serviceType?: string;
}

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IService) => void;
  initialData?: IService | null;
}

const SERVICE_OPTIONS = [
  { label: "Visual Promotion", value: "visual-promotion" },
  { label: "Post Production", value: "post-production" },
  { label: "Digital Marketing", value: "digital-marketing" },
  { label: "Brand Strategy", value: "brand-strategy" },
];

export function ServiceForm({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<IService>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    images: initialData?.images ?? [],
    icon: initialData?.icon ?? "",
    keyPoints: initialData?.keyPoints ?? [""],
    status: "active",
    serviceType: initialData?.serviceType ?? "",
  });

  const [images, setImages] = useState<string[]>(formData.images);
  const [iconPreview, setIconPreview] = useState<string>(formData.icon || "");

  /* ---------- MULTIPLE IMAGES ---------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const updated = [...images, reader.result as string];
        setImages(updated);
        setFormData({ ...formData, images: updated });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setFormData({ ...formData, images: updated });
  };

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
        formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    });
  };

  return (
    <AppDialog
      open={isOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
      title={initialData ? "Update Service" : "Add Service"}
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
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        {/* ---------- SERVICE + ICON ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Service Dropdown */}
          <div className="space-y-1.5">
            <Label>Service</Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) =>
                setFormData({ ...formData, serviceType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
        </div>

        {/* ---------- IMAGES ---------- */}
        <div className="space-y-1.5">
          <Label>Images</Label>
          <div className="flex gap-2 flex-wrap mt-1">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img}
                  className="w-full h-full object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-background border rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-3xl text-muted-foreground">+</span>
            </label>
          </div>
        </div>

        {/* ---------- KEY POINTS ---------- */}
        <div className="space-y-1.5">
          <Label>Key Points</Label>
          <div className="space-y-2">
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
            {initialData ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </form>

    </AppDialog>
  );
}
