import PropTypes from "prop-types";
import Card from "./Card/Card";
import styles from "./CardsRepository.module.scss";

export default function CardsRepository({ userId, totalRepositories }) {
  totalRepositories.TopRepositoriesList.forEach((repository) => {
    const userCommits = repository.contributors.reduce((count, contributor) => {
      return (
        count +
        (contributor.name.toLowerCase() === userId.toLowerCase()
          ? contributor.commitCount
          : 0)
      );
    }, 0);

    const totalCommits = repository.totalCommitCount;
    const contributorsCount = repository.contributors.length;

    const percentageParticipation =
      contributorsCount === 0
        ? "100%"
        : `${((userCommits / totalCommits) * 100).toFixed(0)}%`;

    repository.percentageParticipation = percentageParticipation;
    repository.contributorsCount = contributorsCount;
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
            contributorsCount={repo.contributorsCount}
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
