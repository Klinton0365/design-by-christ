"use client";

import { useActionState } from "react";
import Link from "next/link";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import ImageField from "@/components/admin/ImageField";
import SubmitButton from "@/components/admin/SubmitButton";
import { createBlogPostAction, type BlogPostFormState } from "../actions";

const initialState: BlogPostFormState = { error: null };

export default function NewBlogPostPage() {
  const [state, formAction] = useActionState(createBlogPostAction, initialState);

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">New Post</h1>
        <Link href="/admin/blog" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Blog
        </Link>
      </div>

      <form action={formAction} className="flex flex-col gap-6">
        <TextField label="Title" name="title" required />
        <TextField label="Slug" name="slug" required placeholder="e.g. interior-design-ideas" />
        <TextAreaField label="Excerpt" name="excerpt" required rows={3} />
        <TextAreaField label="Body" name="body" required rows={10} />
        <ImageField label="Cover Image" name="cover_image" />
        <TextField label="Tags (comma separated)" name="tags" placeholder="e.g. Kitchen Design" />
        <TextField label="Author" name="author_name" defaultValue="Chris" />
        <TextField label="Pull Quote" name="pull_quote" />
        <TextField label="Pull Quote Attribution" name="pull_quote_attribution" />
        <TextField label="Published At" name="published_at" type="datetime-local" />
        <CheckboxField label="Published" name="is_published" defaultChecked />
        <CheckboxField label="Show on Homepage" name="show_on_home" />

        <FormError error={state.error} />

        <SubmitButton>Create Post</SubmitButton>
      </form>
    </div>
  );
}
