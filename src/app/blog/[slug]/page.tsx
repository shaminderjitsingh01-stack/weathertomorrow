import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeatherTicker from "@/components/WeatherTicker";
import LoginButton from "@/components/LoginButton";
import { getPostBySlug, getRelatedPosts, getAllSlugs } from "@/lib/blog";
import BlogTableOfContents from "@/components/BlogTableOfContents";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.weathertomorrow.app/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://www.weathertomorrow.app/blog/${post.slug}`,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "City Guide": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Weather Tips": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Seasonal: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

// Custom MDX components that generate headings with IDs for ToC linking
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => {
    const text = typeof props.children === "string" ? props.children : String(props.children);
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return <h2 id={id} {...props} />;
  },
  h3: (props: React.ComponentProps<"h3">) => {
    const text = typeof props.children === "string" ? props.children : String(props.children);
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return <h3 id={id} {...props} />;
  },
  a: (props: React.ComponentProps<"a">) => {
    const href = props.href || "";
    // Internal links
    if (href.startsWith("/")) {
      return <Link href={href} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">{props.children}</Link>;
    }
    // External links
    return <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2" />;
  },
  table: (props: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="text-left py-2 px-3 border-b border-white/10 text-white/60 font-semibold text-xs uppercase tracking-wider" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="py-2 px-3 border-b border-white/5 text-white/70" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const categoryColors = CATEGORY_COLORS[post.category] || "bg-white/10 text-white/60 border-white/10";

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Weather Tomorrow",
      url: "https://www.weathertomorrow.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Weather Tomorrow",
      url: "https://www.weathertomorrow.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.weathertomorrow.app/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen weather-default">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LoginButton />

      <Suspense fallback={null}>
        <WeatherTicker />
      </Suspense>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4">
        <Header subtitle="Blog" />

        {/* Back to blog */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/50 transition-colors font-semibold uppercase tracking-wider"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Articles
          </Link>
        </div>

        {/* Article header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryColors}`}>
              {post.category}
            </span>
            <span className="text-[10px] text-white/25 font-semibold">
              {post.readTime} min read
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-white/35 font-medium">
            {formatDate(post.date)}
          </p>
        </div>

        {/* Layout: article + optional ToC sidebar */}
        <div className="lg:flex lg:gap-8">
          {/* Main article */}
          <article className="flex-1 min-w-0">
            <div className="blog-prose">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* City link for city guides */}
            {post.city && (
              <div className="mt-8 card rounded-2xl p-5 text-center">
                <p className="text-sm text-white/40 mb-3">
                  Check tomorrow&apos;s live forecast
                </p>
                <Link
                  href={`/${post.city}`}
                  className="inline-block bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-bold transition-colors"
                >
                  View {post.city.charAt(0).toUpperCase() + post.city.slice(1).replace(/-/g, " ")} Weather
                </Link>
              </div>
            )}

            {/* Subscribe CTA */}
            <div className="mt-8 card-elevated rounded-2xl p-6 text-center">
              <h2 className="text-lg font-bold mb-2">Get tomorrow&apos;s forecast in your inbox</h2>
              <p className="text-sm text-white/40 mb-4 max-w-sm mx-auto">
                Free daily weather email. Choose your city, pick your time.
              </p>
              <Link
                href="/login"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-bold transition-colors"
              >
                Subscribe — Free
              </Link>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-10">
                <h2 className="section-label mb-4">Related Articles</h2>
                <div className="space-y-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="block card-interactive rounded-2xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${CATEGORY_COLORS[related.category] || "bg-white/10 text-white/60 border-white/10"}`}>
                          {related.category}
                        </span>
                        <span className="text-[10px] text-white/20 font-semibold">
                          {related.readTime} min
                        </span>
                      </div>
                      <h3 className="text-sm font-bold">{related.title}</h3>
                      <p className="text-xs text-white/35 mt-1 line-clamp-1">
                        {related.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Table of Contents — sidebar on desktop */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <BlogTableOfContents headings={headings} />
            </aside>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
