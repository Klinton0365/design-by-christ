"use client";

import { useActionState } from "react";
import Link from "next/link";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import ImageField from "@/components/admin/ImageField";
import SubmitButton from "@/components/admin/SubmitButton";
import { createServiceAction, type ServiceFormState } from "../actions";

const initialState: ServiceFormState = { error: null };

export default function NewServicePage() {
  const [state, formAction] = useActionState(createServiceAction, initialState);

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">New Service</h1>
        <Link href="/admin/services" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Services
        </Link>
      </div>

      <form action={formAction} className="flex flex-col gap-6">
        <TextField label="Title" name="title" required />
        <TextField label="Slug" name="slug" required placeholder="e.g. project-plan" />
        <TextField label="Summary (card blurb)" name="summary" required />
        <TextAreaField label="Description" name="description" required rows={6} />
        <ImageField label="Image" name="image" />
        <TextField label="Sort Order" name="sort_order" type="number" defaultValue={0} />
        <CheckboxField label="Highlighted" name="is_highlighted" />
        <CheckboxField label="Published" name="is_published" defaultChecked />

        <FormError error={state.error} />

        <SubmitButton>Create Service</SubmitButton>
      </form>
    </div>
  );
}
