export type ThemeMode = "light" | "dark" | "auto";
export type ReadingWidth = "compact" | "comfortable" | "wide"; // 640px, 720px, 800px
export type FontSizeLevel = "small" | "medium" | "large"; // 16px, 18px, 21px

export type ArticleCategory =
  | "Reflexões"
  | "Criatividade"
  | "Trabalho"
  | "Tecnologia"
  | "Comportamento"
  | "Livros"
  | "Vida pessoal";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  excerpt: string;
  coverImage?: string;
  coverImageCaption?: string;
  publishedAt: string; // e.g. "22 de julho de 2026"
  updatedAt?: string; // e.g. "23 de julho de 2026"
  readingTimeMinutes: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
  toc?: TocItem[];
  contentParagraphs?: {
    type: "paragraph" | "heading2" | "heading3" | "blockquote" | "list" | "image" | "authorNote" | "callout";
    id?: string;
    text?: string;
    items?: string[];
    imageUrl?: string;
    caption?: string;
  }[];
  relatedSlugs?: string[];
}

export interface CategoryInfo {
  name: ArticleCategory;
  description: string;
  count: number;
  iconName?: string;
}

export interface ArchiveYear {
  year: number;
  months: {
    monthName: string;
    articles: {
      title: string;
      slug: string;
      date: string;
      readingTimeMinutes: number;
      category: ArticleCategory;
    }[];
  }[];
}

export interface AuthorProfile {
  name: string;
  subtitle: string;
  bioParagraphs: string[];
  city: string;
  role: string;
  interests: string[];
  favoriteBooks: { title: string; author: string; year: string }[];
  currentProjects: string[];
  avatarUrl: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}
