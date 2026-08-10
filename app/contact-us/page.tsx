import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getCourses, getSiteContent } from "@/lib/cms";
import { ContactDetails } from "./_components/ContactDetails";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const courses = await getCourses();
  const content = await getSiteContent();

  return (
    <>
      <PageIntro
        index="06"
        eyebrow="Say hello"
        title="QUESTIONS? GOOD."
        intro="Ask about a course, plan a private class, bring us a strange brief, or just come see the room."
        accent="coral"
      />
      <ContactDetails panels={content.contactDetails} />
      <ContactForm courses={courses} />
    </>
  );
}
