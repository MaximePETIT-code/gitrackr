import PropTypes from "prop-types";
import Card from "./Card/Card";
import styles from "./KeyIndicator.module.scss";

export default function KeyIndicator({
  totalRepositories,
  totalContributions,
  isLoading,
}) {

  if (isLoading) {
    return null;
  }

  const contributionsByMonth = totalContributions.contributionsByMonth;
  const years = Object.keys(contributionsByMonth);
  const lastYear = years[years.length - 1];
  const months = Object.keys(contributionsByMonth[lastYear]);
  const lastMonth = months[months.length - 2];
  const previousMonth = months[months.length - 3];

  const lastValue = contributionsByMonth[lastYear][lastMonth];
  const previousValue = contributionsByMonth[lastYear][previousMonth];

  let percentageChange;

  if (previousValue === 0 && lastValue === 0) {
    percentageChange = null;
  } else if (previousValue === 0 && lastValue !== 0) {
    percentageChange = 100;
  } else if (previousValue !== 0 && lastValue === 0) {
    percentageChange = -100;
  } else {
    const changeRatio = (lastValue - previousValue) / previousValue;
    percentageChange = Math.round(changeRatio * 100);
  }

  return (
    <>
      <section className={styles.KeyIndicator}>
        <Card
          title={"Total repositories created"}
          value={totalRepositories.totalRepositoriesCount}
        />

        <Card
          title={"Total contributions this month"}
          value={lastValue}
          percentage={percentageChange}
        />
      </section>
    </>
  );
}

KeyIndicator.propTypes = {
  totalRepositories: PropTypes.object.isRequired,
  totalContributions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
