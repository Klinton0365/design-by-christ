"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import CategoryField from "@/components/admin/CategoryField";
import SubmitButton from "@/components/admin/SubmitButton";
import { createProjectAction, type ProjectFormState } from "../actions";

const initialState: ProjectFormState = { error: null };

export default function NewProjectForm({ categories }: { categories: string[] }) {
  const [state, formAction] = useActionState(createProjectAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <TextField label="Title" name="title" required />
      <TextField label="Slug" name="slug" required placeholder="e.g. modern-kitchen" />
      <CategoryField categories={categories} />
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
  );
}
