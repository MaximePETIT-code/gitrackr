import PropTypes from "prop-types";
import Card from "./Card/Card";
import styles from "./CardsRepository.module.scss";

export default function CardsRepository({ userId, totalRepositories }) {
  totalRepositories.TopRepositoriesList.forEach((repository) => {
    let totalCommits = repository.totalCommitCount;
    let userCommits = 0;

    repository.contributors.forEach((contributor) => {
      if (contributor.name.toLowerCase() === userId.toLowerCase()) {
        userCommits = contributor.commitCount;
      }
    });

    const percentageParticipation = (userCommits / totalCommits) * 100;
    repository.percentageParticipation = isFinite(percentageParticipation)
      ? percentageParticipation.toFixed(0) + "%"
      : "100%";
  });

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
            percentageParticipation={repo.percentageParticipation}
            totalCommitCount={repo.totalCommitCount}
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
