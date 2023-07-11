import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./ContributionsLineChart.module.scss";
import TitleChart from "../TitleChart/TitleChart";

export default function ContributionsLineChart({ totalContributions, isLoading }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Prepare labels for the chart
  const labels = [];
  for (const year in totalContributions.contributionsByMonth) {
    for (const monthIndex in totalContributions.contributionsByMonth[year]) {
      const monthValue = parseInt(monthIndex);
      if (months[monthValue]) {
        labels.push(months[monthValue]);
      }
    }
  }

  // Prepare data for contributions and repositories
  const contributionsData = [];
  const repositoriesData = [];

  for (const year in totalContributions.contributionsByMonth) {
    for (const monthIndex in totalContributions.contributionsByMonth[year]) {
      if (monthIndex !== "total") {
        const contributionValue = totalContributions.contributionsByMonth[year][monthIndex];
        const repositoryValue = totalContributions.repositoriesByMonth[year][monthIndex];
        contributionsData.push(contributionValue);
        repositoriesData.push(repositoryValue);
      }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Contributions",
        data: contributionsData,
        fill: false,
        borderColor: "#2B82DA",
        backgroundColor: "#1E557B",
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return(
    <section className={styles.lineChart}>
      <TitleChart>Monthly contributions over the last 12 months</TitleChart>
      <Line data={data} options={options} />
    </section>
  );
}

ContributionsLineChart.propTypes = {
  totalContributions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
