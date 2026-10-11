"use client";

import { useActionState } from "react";
import Link from "next/link";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import SubmitButton from "@/components/admin/SubmitButton";
import { createFaqAction, type FaqFormState } from "../actions";

const initialState: FaqFormState = { error: null };

export default function NewFaqPage() {
  const [state, formAction] = useActionState(createFaqAction, initialState);

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">New FAQ</h1>
        <Link href="/admin/faqs" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to FAQs
        </Link>
      </div>

      <form action={formAction} className="flex flex-col gap-6">
        <TextField label="Question" name="question" required />
        <TextAreaField label="Answer" name="answer" rows={5} />
        <TextField label="Sort Order" name="sort_order" type="number" defaultValue={0} />
        <CheckboxField label="Published" name="is_published" defaultChecked />

        <FormError error={state.error} />

        <SubmitButton>Create FAQ</SubmitButton>
      </form>
    </div>
  );
}
