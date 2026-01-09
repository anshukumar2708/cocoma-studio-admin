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
import { IBanner } from "@/types/admin";
import axiosInstance from "@/lib/api/axiosInstance";

interface IBannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IBanner | null;
  setBannerData: React.Dispatch<React.SetStateAction<[] | IBanner[]>>;
}

const menuItems = [
  { value: "home", label: "Home" },
  { value: "about", label: "About Us" },
  { value: "service", label: "Services" },
  { value: "work", label: "Our Work" },
  { value: "solutions", label: "Solutions" },
  { value: "blog", label: "Blog" },
];

export function BannerForm({
  isOpen,
  onClose,
  setBannerData,
  initialData,
}: IBannerFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IBanner>({
    title: "",
    description: "",
    image: "",
    page_type: "",
    status: "active",
    display_order: null,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ---------------- Populate form on update ---------------- */
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData?.title,
        description: initialData?.description,
        page_type: initialData?.page_type,
        status: initialData?.status,
        display_order: initialData?.display_order ?? null,
      });

      if (initialData?.image) {
        setImagePreview(initialData?.image);
      }
    }
  }, [initialData, isOpen]);

  /* ---------------- Image Change ---------------- */
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

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formPayload = new FormData();

      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("page_type", formData.page_type);
      formPayload.append("status", String(formData.status));

      if (formData.display_order !== null) {
        formPayload.append(
          "display_order",
          String(formData.display_order)
        );
      }

      if (imageFile) {
        formPayload.append("image", imageFile);
      }

      const response = initialData
        ? await axiosInstance.post(
          `admin/banners/${initialData?.id}`,
          formPayload
        )
        : await axiosInstance.post(
          "admin/banners",
          formPayload
        );

      if (response) {
        if (initialData && isOpen) {
          setBannerData((prev) =>
            prev?.map((item: IBanner) =>
              item.id === response?.data?.banner?.id
                ? { ...item, ...response?.data?.banner }
                : item
            )
          );
        } else {
          setBannerData((prev) => [
            response?.data?.banner,
            ...(prev ?? []),
          ]);
        }

      }
      onClose();
    } catch (error) {
      console.error(
        "Banner Error",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };


  const onCloseModel = () => {
    onClose();
    setFormData((prev) => ({
      ...prev,
      title: "",
      description: "",
      image: "",
      page_type: "",
      status: "active",
      display_order: null,
    }))
    setImagePreview(null);
  }

  /* ---------------- UI ---------------- */
  return (
    <AppDialog
      open={isOpen}
      onClose={onCloseModel}
      title={initialData ? "Update Banner" : "Add New Banner"}
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

        {/* Image */}
        <div className="space-y-2">
          <Label>Banner Image</Label>

          {!imagePreview ? (
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-md border"
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

        {/* Page, Status, Order */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Page Type */}
          <div className="space-y-1.5">
            <Label>Page Type</Label>
            <Select
              value={formData.page_type}
              onValueChange={(value) =>
                setFormData({ ...formData, page_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Page" />
              </SelectTrigger>
              <SelectContent>
                {menuItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">InActive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Display Order */}
          <div className="space-y-1.5">
            <Label>Display Order</Label>
            <Input
              type="number"
              value={formData.display_order ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  display_order: (e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? loading ? "Updating" : "Update" : loading ? "Creating" : "Create"}
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}
