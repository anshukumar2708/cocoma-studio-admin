import { IBanner } from "@/types/admin";

export const bannerData: IBanner[] = [
  {
    id: "1",
    title: "Visual Promotion",
    description:
      "Create stunning key art, trailers, and social media content that captures attention.",
    pageType: "home",
    image: "visual-promotion.jpg",
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    title: "Post-Production",
    description:
      "Complete editing, sound design, color grading, and VFX for films and web series.",
    pageType: "about",
    image: "post-production.jpg",
    createdAt: "2024-01-20",
    status: "active",
  },
  {
    id: "3",
    title: "Localisation Services",
    description:
      "Professional transcription, translation, subtitling, and dubbing in multiple languages.",
    pageType: "service",
    image: "localisation-services.jpg",
    createdAt: "2024-02-01",
    status: "active",
  },
  {
    id: "4",
    title: "Music Video Production",
    description:
      "End-to-end music video production, from concept to final delivery.",
    pageType: "work",
    image: "music-video-production.jpg",
    createdAt: "2024-02-10",
    status: "active",
  },
  {
    id: "5",
    title: "Color Grading & DI",
    description:
      "Professional color correction and digital intermediate services for cinematic quality.",
    pageType: "solutions",
    image: "color-grading-di.jpg",
    createdAt: "2024-02-15",
    status: "inActive",
    },
    {
    id: "5",
    title: "Color Grading & DI",
    description:
      "Professional color correction and digital intermediate services for cinematic quality.",
    pageType: "blog",
    image: "color-grading-di.jpg",
    createdAt: "2024-02-15",
    status: "active",
  },
];
