import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./ContributionsLineChart.module.scss";

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
      if (months[monthValue - 1]) {
        labels.push(months[monthValue - 1]);
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
        borderColor: "rgb(75, 192, 192)",
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: "New repositories",
        data: repositoriesData,
        fill: false,
        borderColor: "rgb(192, 75, 75)",
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
        ticks: {
          stepSize: 20,
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
        position: "bottom",
      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Line className={styles.lineChart} data={data} options={options} />;
}

ContributionsLineChart.propTypes = {
  totalContributions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
