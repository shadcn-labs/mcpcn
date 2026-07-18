"use client";

import {
  ContactForm,
  ContactFormActions,
  ContactFormContactFields,
  ContactFormContent,
  ContactFormHeader,
  ContactFormMessageField,
  ContactFormNameFields,
} from "@/registry/form/contact-form";

export default function ContactFormDemo() {
  return (
    <ContactForm>
      <ContactFormContent>
        <ContactFormHeader className="mb-6" />
        <ContactFormNameFields />
        <ContactFormContactFields />
        <ContactFormMessageField />
        <ContactFormActions />
      </ContactFormContent>
    </ContactForm>
  );
}
