import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getCourses, getPageIntro, getSiteContent } from "@/lib/cms";
import { ContactDetails } from "./_components/ContactDetails";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const courses = await getCourses();
  const content = await getSiteContent();
  const intro = getPageIntro(content, "contact");

  return (
    <>
      <PageIntro
        {...intro}
      />
      <ContactDetails panels={content.contactDetails} />
      <ContactForm courses={courses} />
    </>
  );
}
