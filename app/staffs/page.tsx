import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getPageIntro, getSiteContent, getStaff } from "@/lib/cms";
import { StaffGrid } from "./_components/StaffGrid";
import { StaffNote } from "./_components/StaffNote";

export const metadata: Metadata = { title: "Staffs" };

export default async function StaffsPage() {
  const [staff, content] = await Promise.all([getStaff(), getSiteContent()]);
  const intro = getPageIntro(content, "staffs");

  return (
    <>
      <PageIntro {...intro} />
      <StaffGrid staff={staff} />
      <StaffNote content={content.staffNote} />
    </>
  );
}
