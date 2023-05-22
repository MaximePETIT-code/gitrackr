import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import Loader from "../../components/Loader/Loader";
import Profile from "../../components/Profile/Profile";

const cache = {};

export default function UserDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(cache[userId] || null);
  const [isLoading, setIsLoading] = useState(!cache[userId]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (cache[userId]) {
        setUserData(cache[userId]);
      } else {
        try {
          const response = await fetch(
            `https://api.github.com/users/${userId}`
          );
          const userData = await response.json();

          if (response.ok) {
            cache[userId] = userData;
            setUserData(userData);
          } else {
            setIsError(true);
          }
        } catch (error) {
          console.log("An error occurred while retrieving data: ", error);
          setIsError(true);
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, [userId]);

  if (isError) {
    return <NotFound />;
  }

  if (isLoading && !userData) {
    return <Loader />;
  }

  return (
    <Profile
      name={userData?.login}
      image={userData?.avatar_url}
      created_at={userData?.created_at}
      url={userData?.html_url}
    />
  );
}
