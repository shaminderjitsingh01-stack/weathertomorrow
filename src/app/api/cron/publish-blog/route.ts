import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllPosts, getAllSlugs } from "@/lib/blog";

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Revalidate the blog listing page
    revalidatePath("/blog");

    // Revalidate all published post pages (covers newly-live posts)
    const posts = getAllPosts();
    for (const post of posts) {
      revalidatePath(`/blog/${post.slug}`);
    }

    // Also revalidate the sitemap since it includes blog posts
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      message: "Blog revalidated",
      publishedPosts: posts.length,
      revalidatedPaths: posts.length + 2, // +listing +sitemap
    });
  } catch (error) {
    console.error("Blog publish cron error:", error);
    return NextResponse.json(
      { error: "Failed", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
