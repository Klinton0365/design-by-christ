"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/ui/Modal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import AnimatedText from "@/components/AnimatedText";

export default function ProjectEnquiryCta({ projectTitle }: { projectTitle: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glow-gold mt-14 flex flex-col items-center gap-8 rounded-[70px] bg-dark px-8 py-20 text-center sm:px-24">
      <div className="flex flex-col items-center gap-3">
        <AnimatedText as="h2" className="font-heading text-[36px] text-white sm:text-[50px]">
          Love what you see?
        </AnimatedText>
        <AnimatedText as="p" className="max-w-[450px] font-body text-[18px] text-white sm:text-[22px]">
          Let&apos;s talk about bringing this feeling into your own space.
        </AnimatedText>
      </div>

      <Button variant="gold" onClick={() => setOpen(true)}>
        Enquire About This Project
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy="enquiry-modal-title">
        <EnquiryForm onClose={() => setOpen(false)} heading={`Interested in ${projectTitle}?`} />
      </Modal>
    </div>
  );
}
