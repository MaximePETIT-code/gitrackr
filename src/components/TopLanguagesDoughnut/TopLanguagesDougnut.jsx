import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import TitleChart from "../TitleChart/TitleChart";
import styles from "./TopLanguagesDougnut.module.scss"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TopLanguagesDoughnut({ totalRepositories, isLoading }) {
  if (isLoading) return null;

  // Extract unique language names from repositories
  const languages = totalRepositories.TopRepositoriesList.reduce(
    (acc, repo) => {
      repo.languages.forEach((lang) => {
        if (!acc.includes(lang.name)) {
          acc.push(lang.name);
        }
      });
      return acc;
    },
    []
  );

  // Select the top 6 languages
  const labels = languages.slice(0, 5);

  // Calculate the sum of sizes for each selected language
  const languageDataSizes = labels.map((label) => {
    const totalSize = totalRepositories.TopRepositoriesList.reduce(
      (acc, repo) => {
        const lang = repo.languages.find((lang) => lang.name === label);
        if (lang) {
          acc += lang.size;
        }
        return acc;
      },
      0
    );
    return totalSize;
  });

  // Calculate the total sum of sizes
  const totalSum = languageDataSizes.reduce((sum, value) => sum + value, 0);

  // Calculate the percentages for each language size
  const languageDataPercentages = languageDataSizes.map((value) =>
    ((value / totalSum) * 100).toFixed(1)
  );

  // Define the color mapping for languages
  const languageColors = {
    JavaScript: "#FFCF40",
    Python: "#356BAA",
    Java: "#B07119",
    C: "#606060",
    Ruby: "#C52D22",
    Go: "#00B8D8",
    SCSS: "#C84C9E",
    CSS: "#7255A4",
    HTML: "#E74C3C",
    TypeScript: "#007BCD",
    PHP: "#54638F",
    Swift: "#FF9C48",
    Kotlin: "#A481FF",
    Rust: "#D18F73",
    Lua: "#3B3D4E",
    Perl: "#299BC5",
    Shell: "#76C156",
    PowerShell: "#004267",
    ObjectiveC: "#4286F5",
    R: "#33A5E2",
    MATLAB: "#DD6B4D",
    Haskell: "#776E9C",
    Scala: "#C43845",
    Groovy: "#DF8F61",
    Dart: "#00C1B9",
    Julia: "#8F6DB9",
    CoffeeScript: "#2F476F",
    Elixir: "#775E8B",
    Vue: "#42C085",
    Solidity: "#B26751",
    WebAssembly: "#6C5CF3",
    EJS: "#B52960",
    XML: "#815DAA",
    JSON: "#E5E5E5",
    YAML: "#C83542",
    TOML: "#9F6EB9",
    SQL: "#F26C13",
    Makefile: "#48891E",
    Batchfile: "#8BDF30",
    Dockerfile: "#3D5059",
    Apache: "#E5242C",
    Nginx: "#009149",
    "C++": "#ED4C77",
    "C#": "#169700",
    "Visual Basic": "#805DAE",
    "Objective-C++": "#5F6CFB",
    "F#": "#AE51F2",
    Clojure: "#D45A57",
    Erlang: "#B93E8F",
    OCaml: "#45D454",
    Assembly: "#705319",
    TeX: "#54961A",
    ActionScript: "#9C392D",
    Arduino: "#A665BF",
  };
  

  // Generate background colors and border colors based on language
const backgroundColors = labels.map(
  (label) => `${languageColors[label] || "rgba(0, 0, 0, 0.2)"}90`
);
const borderColors = labels.map(
  (label) => languageColors[label] || "rgba(0, 0, 0, 1)"
);

  // Prepare the chart data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Percentage of utilization: ",
        data: languageDataPercentages,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  }

  return(
    <section className={styles.dougnutChart}>
      <TitleChart>Top 5 languages utilization</TitleChart>
      <Doughnut data={data} options={options} />
    </section>
  );
}

TopLanguagesDoughnut.propTypes = {
  totalRepositories: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
