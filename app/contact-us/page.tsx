import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getContactPage, getCourses, getSiteSettings, pageNumber } from "@/lib/cms";
import { ContactDetails } from "./_components/ContactDetails";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const [courses, page, settings] = await Promise.all([getCourses(), getContactPage(), getSiteSettings()]);

  return (
    <>
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/contact-us")} />
      <ContactDetails panels={page.panels} contact={settings.contact} />
      <ContactForm courses={courses} content={page.form} />
    </>
  );
}
