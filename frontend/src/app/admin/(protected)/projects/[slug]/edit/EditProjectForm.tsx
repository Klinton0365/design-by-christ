"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import CategoryField from "@/components/admin/CategoryField";
import SubmitButton from "@/components/admin/SubmitButton";
import { updateProjectAction, type ProjectFormState } from "../../actions";

type Project = {
  title: string;
  slug: string;
  category: string;
  client: string | null;
  tags: string[];
  project_date: string | null;
  external_link: string | null;
  description: string;
  is_published: boolean;
  show_on_home: boolean;
  sort_order: number;
};

const initialState: ProjectFormState = { error: null };

export default function EditProjectForm({
  project,
  categories,
}: {
  project: Project;
  categories: string[];
}) {
  const updateWithSlug = updateProjectAction.bind(null, project.slug);
  const [state, formAction] = useActionState(updateWithSlug, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <TextField label="Title" name="title" defaultValue={project.title} required />
      <TextField label="Slug" name="slug" defaultValue={project.slug} required />
      <CategoryField categories={categories} defaultValue={project.category} />
      <TextField label="Client" name="client" defaultValue={project.client} />
      <TextField label="Tags (comma separated)" name="tags" defaultValue={project.tags.join(", ")} />
      <TextField label="Project Date" name="project_date" type="date" defaultValue={project.project_date} />
      <TextField label="External Link" name="external_link" type="url" defaultValue={project.external_link} />
      <TextAreaField label="Description" name="description" defaultValue={project.description} required rows={6} />
      <TextField label="Sort Order" name="sort_order" type="number" defaultValue={project.sort_order} />
      <CheckboxField label="Published" name="is_published" defaultChecked={project.is_published} />
      <CheckboxField label="Show on Homepage" name="show_on_home" defaultChecked={project.show_on_home} />

      <FormError error={state.error} />

      <SubmitButton>Save Changes</SubmitButton>
    </form>
  );
}
