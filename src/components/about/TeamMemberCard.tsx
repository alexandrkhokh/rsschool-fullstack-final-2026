import type { JSX } from 'react';
import type { TeamMember } from '../../constants/teamMembers';
import styles from './TeamMemberCard.module.css';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps): JSX.Element => {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.name}>{member.name}</h3>
          <p className={styles.role}>{member.role}</p>
        </div>
        <a
          href={member.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          {member.githubLogin}
        </a>
      </div>

      <ul className={styles.contributionsList}>
        {member.contributions.map((item) => (
          <li key={item} className={styles.contributionItem}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
};
