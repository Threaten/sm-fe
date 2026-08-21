import { StaffMember } from "@/lib/data";

export function StaffAchievements({ person, content }: { person: StaffMember; content: any }) {
  return (
    <section className="staff-achievements">
      <div className="achievement-heading">
        <p className="eyebrow">{content.achievementsEyebrow}</p>
        <h2>{content.achievementsTitle}</h2>
      </div>
      <div className="achievement-list">
        {person.achievements.map((achievement, index) => (
          <article key={`${achievement.year}-${achievement.title}`}>
            <span className="achievement-number">0{index + 1}</span>
            <time>{achievement.year}</time>
            <h3>{achievement.title}</h3>
            <p>{achievement.organization}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
