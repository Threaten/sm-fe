import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getSiteSettings, getStaff, getTeamPage, pageNumber } from "@/lib/cms";
import { StaffGrid } from "./_components/StaffGrid";
import { StaffNote } from "./_components/StaffNote";

export const metadata: Metadata = { title: "Team" };

export default async function StaffsPage() {
  const [staff, page, settings] = await Promise.all([getStaff(), getTeamPage(), getSiteSettings()]);

  return (
    <>
      <PageIntro intro={page.intro} number={pageNumber(settings.navigation, "/staffs")} />
      <StaffGrid staff={staff} cardLinkLabel={page.cardLinkLabel} />
      <StaffNote content={page.note} />
    </>
  );
}
