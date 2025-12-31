import { useEffect, useState } from "react";
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
import { IBanner, IStatusType } from "@/types/admin";



interface IBannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IBanner) => void;
  initialData?: IBanner | null;
}

export function BannerForm({
  isOpen,
  onClose,
  onSave,
  initialData,
}: IBannerFormProps) {
  const [formData, setFormData] = useState<IBanner>({
    title: "",
    description: "",
    pageType: "home",
    status: "active",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Populate form in edit mode
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        pageType: initialData.pageType,
        status: initialData.status,
      });

      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const banner: IBanner = {
      ...formData,
      image: imagePreview ?? undefined,
    };

    onSave(banner);
  };

  return (
    <AppDialog
      open={isOpen}
      onClose={onClose}
      title={initialData ? "Update Blog" : "Add New Blog"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
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

        {/* Description */}
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

        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Banner Image</Label>

          {!imagePreview ? (
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          ) : (
            <div className="relative w-full max-w-sm">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-md border-2 border-gray-300"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Page + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Page */}
          <div className="space-y-1.5">
            <Label>Page</Label>
            <Select
              value={formData.pageType}
              onValueChange={(value: string) =>
                setFormData({ ...formData, pageType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="about">About</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="contact">Contact Us</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: IStatusType) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            {initialData ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}
