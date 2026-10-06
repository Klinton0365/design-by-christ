export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-[14px] text-body">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-border bg-base px-4 py-3 font-body text-[16px] text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 5,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-body text-[14px] text-body">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={rows}
        className="rounded-xl border border-border bg-base px-4 py-3 font-body text-[16px] text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
      />
    </label>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked = false,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name={name}
        value="1"
        defaultChecked={defaultChecked}
        className="h-5 w-5 rounded border-border bg-base accent-gold"
      />
      <span className="font-body text-[16px] text-ivory">{label}</span>
    </label>
  );
}

export function FormError({ error }: { error: string | null }) {
  if (!error) return null;
  return <p className="font-body text-[14px] text-red-400">{error}</p>;
}
