"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, CheckboxField, FormError } from "@/components/admin/fields";
import SubmitButton from "@/components/admin/SubmitButton";
import { updateFaqAction, type FaqFormState } from "../../actions";

type Faq = {
  id: number;
  question: string;
  answer: string | null;
  is_published: boolean;
  sort_order: number;
};

const initialState: FaqFormState = { error: null };

export default function EditFaqForm({ faq }: { faq: Faq }) {
  const updateWithId = updateFaqAction.bind(null, faq.id);
  const [state, formAction] = useActionState(updateWithId, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <TextField label="Question" name="question" defaultValue={faq.question} required />
      <TextAreaField label="Answer" name="answer" defaultValue={faq.answer} rows={5} />
      <TextField label="Sort Order" name="sort_order" type="number" defaultValue={faq.sort_order} />
      <CheckboxField label="Published" name="is_published" defaultChecked={faq.is_published} />

      <FormError error={state.error} />

      <SubmitButton>Save Changes</SubmitButton>
    </form>
  );
}
