import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getContactPage, getCourses, getSiteSettings, pageNumber } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { ContactDetails } from "./_components/ContactDetails";
import { ContactForm } from "./_components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return pageMetadata("/contact-us", page.seo, { description: page.intro.copy });
}

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
