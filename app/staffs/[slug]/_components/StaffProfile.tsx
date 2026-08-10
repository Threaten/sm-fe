import { StaffMember } from "@/lib/data";
import { StaffAchievements } from "./StaffAchievements";

export function StaffProfile({ person }: { person: StaffMember }) {
  return (
    <>
      <section className="staff-profile-story">
        <div className="staff-profile-label">
          <span>01</span>
          <p>Behind the apron</p>
        </div>
        <div className="staff-profile-bio">
          {person.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="staff-profile-quote">
        <span>“</span>
        <blockquote>{person.quote}</blockquote>
      </section>

      <StaffAchievements person={person} />

      <section className="staff-practice">
        <div className="staff-practice-heading">
          <p className="eyebrow">At the workbench</p>
          <h2>What {person.shortName} teaches.</h2>
          <p>{person.teachingFocus}</p>
        </div>
        <div className="staff-specialties">
          {person.specialties.map((specialty, index) => (
            <div key={specialty}>
              <span>0{index + 1}</span>
              <h3>{specialty}</h3>
            </div>
          ))}
          <div className="favorite-pour">
            <span>Off duty</span>
            <p>Favorite pour:</p>
            <strong>{person.favoritePour}</strong>
          </div>
        </div>
      </section>
    </>
  );
}
