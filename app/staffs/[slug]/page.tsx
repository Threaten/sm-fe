import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getSiteSettings, getStaff, getTeamPage } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, person as personLd } from "@/lib/structuredData";
import { StaffDetailFooter } from "./_components/StaffDetailFooter";
import { StaffDetailHero } from "./_components/StaffDetailHero";
import { StaffProfile } from "./_components/StaffProfile";

export async function generateStaticParams() {
  return (await getStaff()).map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = (await getStaff()).find((member) => member.slug === slug);
  return person
    ? pageMetadata(`/staffs/${person.slug}`, person.seo, {
        title: person.name,
        description: `${person.name}, ${person.role}. ${person.note}`,
        image: person.image,
      })
    : { title: "Team" };
}

export default async function StaffDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [staff, page, settings] = await Promise.all([getStaff(), getTeamPage(), getSiteSettings()]);
  const index = staff.findIndex((member) => member.slug === slug);
  if (index === -1) notFound();

  const person = staff[index];
  const { siteUrl } = settings.seo;
  const nextPerson = staff[(index + 1) % staff.length];

  return (
    <>
      {siteUrl ? (
        <JsonLd
          items={[
            personLd(person, siteUrl),
            breadcrumbs(settings, "/staffs", { name: person.name, path: `/staffs/${person.slug}` }),
          ]}
        />
      ) : null}
      <StaffDetailHero person={person} number={index + 1} labels={page.profile} />
      <StaffProfile person={person} labels={page.profile} />
      {nextPerson.slug !== person.slug ? <StaffDetailFooter nextPerson={nextPerson} labels={page.profile} /> : null}
    </>
  );
}
