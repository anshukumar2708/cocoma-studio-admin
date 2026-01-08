export type IStatusType = "active" | "inActive";

export interface IBanner {
  id?: string;
  title: string;
  description: string;
  page_type: string;
  status: string;
  image?: string;
  display_order: number | string | null;
  created_at?: string;
  updated_at?: string;
}


export interface Portfolio {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  clientName: string;
  completionDate: string;
  tags: string[];
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  imageUrl: string;
  tags: string[];
  status: "draft" | "published";
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  imageUrl: string;
  bio: string;
  skills: string[];
  joinDate: string;
}

export interface Settings {
  id: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}
