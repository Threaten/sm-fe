import type { StaffMember, TeamPage } from "@/lib/types";

export function StaffProfile({ person, labels }: { person: StaffMember; labels: TeamPage["profile"] }) {
  return (
    <>
      <section className="profile-bio">
        <p className="label">{labels.bioLabel}</p>
        <div>
          {person.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="profile-quote">
        <blockquote>“{person.quote}”</blockquote>
      </section>

      {person.achievements.length ? (
        <section className="achievements">
          <header>
            <p className="label">{labels.achievementsEyebrow}</p>
            <h2>{labels.achievementsTitle}</h2>
          </header>
          <ol>
            {person.achievements.map((achievement) => (
              <li key={`${achievement.year}-${achievement.title}-${achievement.organization}`}>
                <time>{achievement.year}</time>
                <strong>{achievement.title}</strong>
                <span>{achievement.organization}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="practice">
        <div className="practice-head">
          <p className="label">{labels.practiceEyebrow}</p>
          <h2>{labels.practiceTitle.replace("{name}", person.shortName)}</h2>
          <p>{person.teachingFocus}</p>
        </div>
        <ol className="practice-list">
          {person.specialties.map((specialty, index) => (
            <li key={specialty}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {specialty}
            </li>
          ))}
        </ol>
        <aside className="practice-pour">
          <p className="label">{labels.offDutyLabel}</p>
          <p>{labels.favoritePourLabel}</p>
          <strong>{person.favoritePour}</strong>
        </aside>
      </section>
    </>
  );
}
