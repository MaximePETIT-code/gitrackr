import PropTypes from "prop-types";
import Card from "./Card/Card";
import styles from "./CardsRepository.module.scss";

export default function CardsRepository({ userId, totalRepositories }) {

  return (
    <div className={styles.container}>
      {totalRepositories.TopRepositoriesList.map((repo, key) => {
        const linkRepo = `https://github.com/${userId}/${repo.name}`;
        return (
          <Card
            key={key}
            name={repo.name}
            link={linkRepo}
            languages={repo.languages}
            stargazerCount={repo.stargazerCount}
            contributorsCount={repo.contributorsCount}
            totalCommitCount={repo.commitCount}
            forkCount={repo.forkCount}
          />
        );
      })}
    </div>
  );
}

CardsRepository.propTypes = {
  userId: PropTypes.string.isRequired,
  totalRepositories: PropTypes.object.isRequired,
};
