import type { JSX } from "react";
import type { UserCardProps } from "@/types/props";

const UserCard = ({ name, email }: UserCardProps): JSX.Element => {
  return (
    <article className="user-card" aria-label={`Profile of ${name}`}>
      <h3 className="user-card__name">{name}</h3>
      <p className="user-card__email">
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </article>
  );
};

export default UserCard;
