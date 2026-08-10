import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaff, getStaffBySlug } from "@/lib/cms";
import { StaffDetailFooter } from "./_components/StaffDetailFooter";
import { StaffDetailHero } from "./_components/StaffDetailHero";
import { StaffProfile } from "./_components/StaffProfile";

export function generateStaticParams() {
  return getStaff().then((list) =>
    list.map((person) => ({ slug: person.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await getStaffBySlug(slug);
  return {
    title: person?.name ?? "Staff",
    description: person
      ? `${person.name}, ${person.role} at Skill & Mix.`
      : undefined,
  };
}

export default async function StaffDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = await getStaff();
  const index = list.findIndex((member) => member.slug === slug);
  if (index === -1) notFound();

  const person = list[index];
  const nextPerson = list[(index + 1) % list.length];

  return (
    <>
      <StaffDetailHero person={person} index={index} />
      <StaffProfile person={person} />
      <StaffDetailFooter nextPerson={nextPerson} />
    </>
  );
}
