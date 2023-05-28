import PropTypes from "prop-types";
import styles from "./Card.module.scss";
import CountItem from "./CountItem/CountItem";
import PercentageItem from "./PercentageItem/PercentageItem";
import CommitIcon from "../../../constants/Icons/CommitIcon.svg";
import ForkIcon from "../../../constants/Icons/ForkIcon.svg";
import ContributorIcon from "../../../constants/Icons/ContributorIcon.svg";

export default function Card({
  name,
  link,
  languages,
  stargazerCount,
  percentageParticipation,
  contributorsCount,
  totalCommitCount,
  forkCount,
}) {
  if (languages.length === 0) {
    return null;
  }

  return (
    <a href={link} target="_blank" rel="noreferrer" className={styles.card}>
      <h3 className={styles.card__name}>{name}</h3>
      <ul className={styles.card__languages}>
        {languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <div className={styles.card__stargazer}>
        <span>{stargazerCount}</span>
      </div>

      <div className={styles.card__countItems}>
        <CountItem icon={ForkIcon} name={"Fork"} count={forkCount} />
        <CountItem
          icon={CommitIcon}
          name={"Total commits"}
          count={totalCommitCount}
        />
      </div>

      <div className={styles.card__participation}>
        <PercentageItem
          value={percentageParticipation}
          desciption={`with ${contributorsCount > 0 ? contributorsCount : 1}`}
          desciptionIcon={ContributorIcon}
        />
        <p>
          <span className={styles.card__participation__percentage}>
            {percentageParticipation}
          </span>
          of commits
        </p>
      </div>
    </a>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    })
  ).isRequired,
  stargazerCount: PropTypes.number.isRequired,
  percentageParticipation: PropTypes.string.isRequired,
  contributorsCount: PropTypes.number.isRequired,
  totalCommitCount: PropTypes.number.isRequired,
  forkCount: PropTypes.number.isRequired,
};
