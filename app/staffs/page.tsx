import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getStaff } from "@/lib/cms";
import { StaffGrid } from "./_components/StaffGrid";
import { StaffNote } from "./_components/StaffNote";

export const metadata: Metadata = { title: "Staffs" };

export default async function StaffsPage() {
  const staff = await getStaff();

  return (
    <>
      <PageIntro
        index="02"
        eyebrow="The people behind the bar"
        title="GOOD HANDS. SHARP TONGUES."
        intro="Working bartenders, obsessive teachers, and generous critics. Meet the people who will make your next drink better."
        accent="cobalt"
      />
      <StaffGrid staff={staff} />
      <StaffNote />
    </>
  );
}
