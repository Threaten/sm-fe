import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getPageIntro, getServices, getSiteContent } from "@/lib/cms";
import { ServiceBanner } from "./_components/ServiceBanner";
import { ServiceList } from "./_components/ServiceList";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await getServices();
  const content = await getSiteContent();
  const intro = getPageIntro(content, "services");

  return (
    <>
      <PageIntro
        {...intro}
      />
      <ServiceList services={services} />
      <ServiceBanner content={content.servicesBanner} />
    </>
  );
}
