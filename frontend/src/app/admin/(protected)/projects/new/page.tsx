"use client";

import { useActionState } from "react";
import Link from "next/link";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import SubmitButton from "@/components/admin/SubmitButton";
import { createProjectAction, type ProjectFormState } from "../actions";

const initialState: ProjectFormState = { error: null };

export default function NewProjectPage() {
  const [state, formAction] = useActionState(createProjectAction, initialState);

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">New Project</h1>
        <Link href="/admin/projects" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Projects
        </Link>
      </div>

      <form action={formAction} className="flex flex-col gap-6">
        <TextField label="Title" name="title" required />
        <TextField label="Slug" name="slug" required placeholder="e.g. modern-kitchen" />
        <TextField label="Category" name="category" required placeholder="e.g. Decor / Architecture" />
        <TextField label="Client" name="client" />
        <TextField label="Tags (comma separated)" name="tags" placeholder="e.g. Kitchen, Renovation" />
        <TextField label="Project Date" name="project_date" type="date" />
        <TextField label="External Link" name="external_link" type="url" />
        <TextAreaField label="Description" name="description" required rows={6} />
        <TextField label="Sort Order" name="sort_order" type="number" defaultValue={0} />
        <CheckboxField label="Published" name="is_published" defaultChecked />

        <FormError error={state.error} />

        <SubmitButton>Create Project</SubmitButton>
      </form>

      <p className="font-body text-[14px] text-body">
        You&apos;ll be able to upload gallery images after creating the project.
      </p>
    </div>
  );
}
