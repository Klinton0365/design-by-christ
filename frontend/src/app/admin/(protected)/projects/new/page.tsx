import Link from "next/link";
import NewProjectForm from "./NewProjectForm";
import { getProjectCategories } from "../categories";

export default async function NewProjectPage() {
  const categories = await getProjectCategories();

  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <h1 className="font-heading text-[32px] text-ivory">New Project</h1>
        <Link href="/admin/projects" className="font-body text-[14px] text-body hover:text-gold">
          ← Back to Projects
        </Link>
      </div>

      <NewProjectForm categories={categories} />

      <p className="font-body text-[14px] text-body">
        You&apos;ll be able to upload gallery images after creating the project.
      </p>
    </div>
  );
}
