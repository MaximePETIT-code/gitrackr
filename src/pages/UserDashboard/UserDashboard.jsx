import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Loader from "../../components/Loader/Loader";
import Profile from "../../components/Profile/Profile";

export default function UserDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${userId}`);
        const userData = await response.json();
        setUserData(userData);
        setIsError(!response.ok);
      } catch (error) {
        console.log("An error occurred while retrieving data: ", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
    {console.log(userData)}
      {isLoading ? (
        <Loader />
      ) : (
        <Profile
          name={userData?.login}
          image={userData?.avatar_url}
          created_at={userData?.created_at}
          url={userData?.html_url}
        />
      )}
    </>
  );
}
