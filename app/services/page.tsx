import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getServices, getServicesPage, getSiteSettings, pageNumber } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { ServiceBanner } from "./_components/ServiceBanner";
import { ServiceList } from "./_components/ServiceList";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();
  return pageMetadata("/services", page.seo, { description: page.intro.copy });
}

export default async function ServicesPage() {
  const [services, page, settings] = await Promise.all([getServices(), getServicesPage(), getSiteSettings()]);

  return (
    <>
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/services")} />
      <ServiceList services={services} linkLabel={page.itemLinkLabel} />
      <ServiceBanner content={page.banner} email={settings.contact.email} />
    </>
  );
}
