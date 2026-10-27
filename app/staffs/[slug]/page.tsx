import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaff, getTeamPage } from "@/lib/cms";
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
    ? { title: person.name, description: `${person.name}, ${person.role}. ${person.note}` }
    : { title: "Team" };
}

export default async function StaffDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [staff, page] = await Promise.all([getStaff(), getTeamPage()]);
  const index = staff.findIndex((member) => member.slug === slug);
  if (index === -1) notFound();

  const person = staff[index];
  const nextPerson = staff[(index + 1) % staff.length];

  return (
    <>
      <StaffDetailHero person={person} number={index + 1} labels={page.profile} />
      <StaffProfile person={person} labels={page.profile} />
      {nextPerson.slug !== person.slug ? <StaffDetailFooter nextPerson={nextPerson} labels={page.profile} /> : null}
    </>
  );
}
