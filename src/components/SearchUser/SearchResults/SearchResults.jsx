import PropTypes from "prop-types";
import styles from "./SearchResults.module.scss";

export default function SearchResults({ users, size = "m" }) {
  return (
    <div className={styles.userResult}>
      {users.map((user, key) => (
        <a
          className={styles.userResult__card}
          key={key}
          href={`/${user.login}/`}
        >
          <div className={styles.userResult__card__profile}>
            <img src={user.avatar_url} alt={user.login} />
          </div>
          <div
            className={`${styles.userResult__card__name} ${
              size === "s" ? styles.userResult__card__nameS : ""
            }`}
          >
            {user.login}
          </div>
        </a>
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  users: PropTypes.array.isRequired,
  size: PropTypes.string,
};
