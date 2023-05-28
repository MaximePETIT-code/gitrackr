import { Helmet, HelmetProvider } from "react-helmet-async";
import { MetaDescriptions } from "../../constants/MetaDescriptions";
import { useParams } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import KeyIndicator from "../../components/KeyIndicator/KeyIndicator";
import styles from "./UserDashboard.module.scss";
import ContributionsLineChart from "../../components/ContributionsLineChart/ContributionsLineChart";
import TopLanguagesDougnut from "../../components/TopLanguagesDoughnut/TopLanguagesDougnut";
import { useUserData } from "../../utils/useUserData";
import NotFound from "../../components/NotFound/NotFound";
import Loader from "../../components/Loader/Loader";

export default function UserDashboard() {
  const { userId } = useParams();
  const {
    userData,
    isError,
    dataIsLoading,
    totalRepositories,
    totalContributions,
  } = useUserData(userId);

  // Render the NotFound component if there's an error
  if (isError) {
    return <NotFound />;
  }

  // Render the Loader component if the user data is still loading
  if (dataIsLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <Helmet>
      <title>{MetaDescriptions.dashboard.title} {userId}</title>
          <meta
            name="description"
            content={`Check out ${userId}'s GitHub stats! You can view the monthly contributions or the top programming languages used`}
          />
      </Helmet>
      <header className={styles.general}>
        <Profile
          name={userData?.login}
          image={userData?.avatar_url}
          created_at={userData?.created_at}
          url={userData?.html_url}
        />

        <KeyIndicator
          totalRepositories={totalRepositories}
          totalContributions={totalContributions}
          isLoading={dataIsLoading}
        />
      </header>

      <div className={styles.charts}>
        <div className={styles.left}>
          <ContributionsLineChart
            totalContributions={totalContributions}
            isLoading={dataIsLoading}
          />
        </div>

        <div className={styles.right}>
          <TopLanguagesDougnut
            totalRepositories={totalRepositories}
            isLoading={dataIsLoading}
          />
        </div>
      </div>
    </HelmetProvider>
  );
}
