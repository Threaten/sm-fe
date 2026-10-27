import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getSiteSettings, getStaff, getTeamPage, pageNumber } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { StaffGrid } from "./_components/StaffGrid";
import { StaffNote } from "./_components/StaffNote";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTeamPage();
  return pageMetadata("/staffs", page.seo, { description: page.intro.copy });
}

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
