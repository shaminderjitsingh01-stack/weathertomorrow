import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "City Guide" | "Weather Tips" | "Seasonal";
  city?: string;
  readTime: number;
  content: string;
}

export type BlogPostMeta = Omit<BlogPost, "content">;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Check if a post's date has passed. Posts publish at midnight UTC = 8am SGT. */
function isPublished(dateStr: string): boolean {
  const publishTime = new Date(dateStr + "T00:00:00Z");
  return publishTime.getTime() <= Date.now();
}

function readAllPostMetas(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: data.slug as string,
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      category: data.category as BlogPost["category"],
      city: data.city as string | undefined,
      readTime: data.readTime as number,
    };
  });
}

export function getAllPosts(): BlogPostMeta[] {
  return readAllPostMetas()
    .filter((p) => isPublished(p.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    if (data.slug === slug) {
      if (!isPublished(data.date as string)) return null;
      return {
        slug: data.slug as string,
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        category: data.category as BlogPost["category"],
        city: data.city as string | undefined,
        readTime: data.readTime as number,
        content,
      };
    }
  }

  return null;
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

/** Returns all slugs including future posts — used by generateStaticParams for pre-building. */
export function getAllSlugs(): string[] {
  return readAllPostMetas().map((p) => p.slug);
}
