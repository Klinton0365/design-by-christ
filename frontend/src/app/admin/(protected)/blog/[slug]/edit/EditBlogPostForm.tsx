"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import ImageField from "@/components/admin/ImageField";
import SubmitButton from "@/components/admin/SubmitButton";
import { updateBlogPostAction, type BlogPostFormState } from "../../actions";

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

const initialState: BlogPostFormState = { error: null };

function toDatetimeLocal(iso: string | null) {
  if (!iso) return "";
  return iso.slice(0, 16);
}

export default function EditBlogPostForm({ post }: { post: BlogPost }) {
  const updateWithSlug = updateBlogPostAction.bind(null, post.slug);
  const [state, formAction] = useActionState(updateWithSlug, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <TextField label="Title" name="title" defaultValue={post.title} required />
      <TextField label="Slug" name="slug" defaultValue={post.slug} required />
      <TextAreaField label="Excerpt" name="excerpt" defaultValue={post.excerpt} required rows={3} />
      <TextAreaField label="Body" name="body" defaultValue={post.body} required rows={10} />
      <ImageField label="Cover Image" name="cover_image" defaultImageUrl={post.cover_image_url} />
      <TextField label="Tags (comma separated)" name="tags" defaultValue={post.tags.join(", ")} />
      <TextField label="Author" name="author_name" defaultValue={post.author_name} />
      <TextField label="Pull Quote" name="pull_quote" defaultValue={post.pull_quote} />
      <TextField
        label="Pull Quote Attribution"
        name="pull_quote_attribution"
        defaultValue={post.pull_quote_attribution}
      />
      <TextField
        label="Published At"
        name="published_at"
        type="datetime-local"
        defaultValue={toDatetimeLocal(post.published_at)}
      />
      <CheckboxField label="Published" name="is_published" defaultChecked={post.is_published} />
      <CheckboxField label="Show on Homepage" name="show_on_home" defaultChecked={post.show_on_home} />

      <FormError error={state.error} />

      <SubmitButton>Save Changes</SubmitButton>
    </form>
  );
}
