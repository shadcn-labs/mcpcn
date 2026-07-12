"use client";

import { ContactForm } from "@/registry/form/contact-form";

export default function ContactFormDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ContactForm />
      <ContactForm>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <ContactForm.Content />
        </div>
      </ContactForm>
    </div>
  );
}
