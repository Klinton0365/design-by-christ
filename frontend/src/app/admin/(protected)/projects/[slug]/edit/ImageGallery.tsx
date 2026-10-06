"use client";

import { useRef, useTransition } from "react";

type ProjectImage = { id: number; image_url: string; is_cover: boolean };

export default function ImageGallery({
  images,
  uploadAction,
  setCoverAction,
  deleteAction,
}: {
  images: ProjectImage[];
  uploadAction: (formData: FormData) => Promise<void>;
  setCoverAction: (imageId: number) => Promise<void>;
  deleteAction: (imageId: number) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-heading text-[22px] text-ivory">Gallery</h2>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="flex flex-col gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.image_url}
                alt=""
                className="h-[120px] w-full rounded-xl border border-border object-cover"
              />
              <div className="flex items-center justify-between font-body text-[13px]">
                {image.is_cover ? (
                  <span className="text-gold">Cover</span>
                ) : (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => startTransition(() => setCoverAction(image.id))}
                    className="text-body hover:text-gold"
                  >
                    Set as cover
                  </button>
                )}
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    if (confirm("Remove this image?")) {
                      startTransition(() => deleteAction(image.id));
                    }
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <form
        ref={formRef}
        action={async (formData) => {
          await uploadAction(formData);
          formRef.current?.reset();
        }}
        className="flex flex-col gap-3"
      >
        <label className="flex flex-col gap-2">
          <span className="font-body text-[14px] text-body">Add images</span>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="font-body text-[14px] text-body file:mr-4 file:rounded-xl file:border-0 file:bg-gold file:px-4 file:py-2 file:font-body file:text-[14px] file:font-semibold file:text-white"
          />
        </label>
        <button
          type="submit"
          className="inline-flex w-fit items-center justify-center rounded-[18px] bg-dark px-6 py-3 font-body text-[14px] font-semibold text-white glow-gold transition-opacity hover:opacity-90"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
