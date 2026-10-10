import Link from "next/link";
import { adminApiFetch } from "@/lib/admin-api";
import DeleteButton from "@/components/admin/DeleteButton";
import ToggleHomeButton from "@/components/admin/ToggleHomeButton";
import { deleteBlogPostAction, toggleShowOnHomeAction } from "./actions";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  author_name: string;
  is_published: boolean;
  show_on_home: boolean;
  published_at: string | null;
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { dateStyle: "medium" });
}

export default async function AdminBlogPage() {
  const { data: posts } = await adminApiFetch<{ data: BlogPost[] }>("/api/admin/blog-posts");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-[32px] text-ivory">Blog</h1>
          <p className="font-body text-[16px] text-body">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center rounded-[18px] bg-gold px-6 py-3 font-body text-[15px] font-semibold text-white glow-gold transition-opacity hover:opacity-90"
        >
          New Post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-[20px] border border-border bg-surface">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-border font-body text-[14px] uppercase tracking-wide text-body">
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Author</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4">Homepage</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const boundDelete = deleteBlogPostAction.bind(null, post.slug);
              return (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-body text-[16px] text-ivory">{post.title}</td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">{post.author_name}</td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {post.is_published ? "Yes" : "No"}
                  </td>
                  <td className="px-5 py-4">
                    <ToggleHomeButton
                      slug={post.slug}
                      showOnHome={post.show_on_home}
                      action={toggleShowOnHomeAction}
                    />
                  </td>
                  <td className="px-5 py-4 font-body text-[15px] text-body">
                    {formatDate(post.published_at)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/blog/${post.slug}/edit`}
                        className="font-body text-[14px] text-gold hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={boundDelete} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
