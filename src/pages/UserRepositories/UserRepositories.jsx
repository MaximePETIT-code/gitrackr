import { useParams } from "react-router-dom";
import { useUserData } from "../../utils/useUserData";
import NotFound from "../../components/NotFound/NotFound";
import Loader from "../../components/Loader/Loader";

export default function UserRepositories() {
  const { userId } = useParams();
  const {
    userData,
    isError,
    dataIsLoading,
    totalRepositories,
  } = useUserData(userId);

  // Render the NotFound component if there's an error
  if (isError) {
    return <NotFound />;
  }

  // Render the Loader component if the user data is still loading
  if (dataIsLoading) {
    return <Loader />;
  }

  return <div>All repositories</div>;
}
