"use client";

export default function DeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="font-body text-[14px] text-red-400 transition-colors hover:text-red-300"
      >
        Delete
      </button>
    </form>
  );
}
