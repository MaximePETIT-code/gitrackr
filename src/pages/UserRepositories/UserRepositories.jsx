import { useParams } from "react-router-dom";
import { useUserData } from "../../utils/useUserData";
import NotFound from "../../components/NotFound/NotFound";
import Loader from "../../components/Loader/Loader";
import CardsRepository from "../../components/CardsRepository/CardsRepository";
import styles from "./UserRepositories.module.scss";
import Profile from "../../components/Profile/Profile";
import TitleChart from "../../components/TitleChart/TitleChart";

export default function UserRepositories() {
  const { userId } = useParams();
  const { isError, userData, dataIsLoading, totalRepositories } =
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
    <>
      <header>
      <Profile
          name={userData?.login}
          image={userData?.avatar_url}
          created_at={userData?.created_at}
          url={userData?.html_url}
        />
      </header>

      <div className={styles.charts}>
        <TitleChart>Statistics of top repositories</TitleChart>
        <CardsRepository userId={userId} totalRepositories={totalRepositories} />
      </div>
    </>
  );
}
