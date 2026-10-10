import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import EditBlogPostForm from "./EditBlogPostForm";

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  tags: string[];
  author_name: string;
  pull_quote: string | null;
  pull_quote_attribution: string | null;
  is_published: boolean;
  show_on_home: boolean;
  published_at: string | null;
};

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await adminApiFetch<{ data: BlogPost }>(`/api/admin/blog-posts/${slug}`);

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">Edit Post</h1>
        <Link href="/admin/blog" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Blog
        </Link>
      </div>

      <EditBlogPostForm post={post} />
    </div>
  );
}
