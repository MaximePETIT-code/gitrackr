import { Helmet, HelmetProvider } from "react-helmet-async";
import { MetaDescriptions } from "../../constants/MetaDescriptions";
import { useParams } from "react-router-dom";
import { useUserData } from "../../utils/useUserData";
import NotFound from "../../components/NotFound/NotFound";
import Loader from "../../components/Loader/Loader";
import CardsRepository from "../../components/CardsRepository/CardsRepository";
import styles from "./UserRepositories.module.scss";
import TitleChart from "../../components/TitleChart/TitleChart";

export default function UserRepositories() {
  const { userId } = useParams();
  const { isError, dataIsLoading, totalRepositories } =
    useUserData(userId);

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
        <title>
          {MetaDescriptions.dashboard.title} {userId}
        </title>
        <meta
          name="description"
          content={`Check out ${userId}'s GitHub stats! You can view the monthly contributions or the top programming languages used`}
        />
      </Helmet>

      <div className={styles.charts}>
        <TitleChart>Statistics of top repositories</TitleChart>
        <CardsRepository
          userId={userId}
          totalRepositories={totalRepositories}
        />
      </div>
    </HelmetProvider>
  );
}
