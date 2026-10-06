"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import ImageField from "@/components/admin/ImageField";
import SubmitButton from "@/components/admin/SubmitButton";
import { updateServiceAction, type ServiceFormState } from "../../actions";

type Service = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string | null;
  is_highlighted: boolean;
  is_published: boolean;
  sort_order: number;
};

const initialState: ServiceFormState = { error: null };

export default function EditServiceForm({ service }: { service: Service }) {
  const updateWithSlug = updateServiceAction.bind(null, service.slug);
  const [state, formAction] = useActionState(updateWithSlug, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <TextField label="Title" name="title" defaultValue={service.title} required />
      <TextField label="Slug" name="slug" defaultValue={service.slug} required />
      <TextField label="Summary (card blurb)" name="summary" defaultValue={service.summary} required />
      <TextAreaField label="Description" name="description" defaultValue={service.description} required rows={6} />
      <ImageField label="Image" name="image" defaultImageUrl={service.image_url} />
      <TextField label="Sort Order" name="sort_order" type="number" defaultValue={service.sort_order} />
      <CheckboxField label="Highlighted" name="is_highlighted" defaultChecked={service.is_highlighted} />
      <CheckboxField label="Published" name="is_published" defaultChecked={service.is_published} />

      <FormError error={state.error} />

      <SubmitButton>Save Changes</SubmitButton>
    </form>
  );
}
