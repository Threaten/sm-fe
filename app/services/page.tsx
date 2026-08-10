import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getServices, getSiteContent } from "@/lib/cms";
import { ServiceBanner } from "./_components/ServiceBanner";
import { ServiceList } from "./_components/ServiceList";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await getServices();
  const content = await getSiteContent();

  return (
    <>
      <PageIntro
        index="03"
        eyebrow="Beyond the classroom"
        title="WE BRING THE BAR TO THE BRIEF."
        intro="Private workshops, sharper menus, stronger teams. Tell us what needs mixing."
      />
      <ServiceList services={services} />
      <ServiceBanner content={content.servicesBanner} />
    </>
  );
}
