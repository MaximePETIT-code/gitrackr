import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import Loader from "../../components/Loader/Loader";
import Profile from "../../components/Profile/Profile";
import ContributionsLineChart from "../../components/ContributionsLineChart/ContributionsLineChart";
import { fetchUserRepositories } from "../../utils/fetchUserRepositories";
import { fetchUserContributions } from "../../utils/fetchUserContributions";
import { getCacheData, setCacheData } from "../../utils/cache";

export default function UserDashboard() {
  const { userId } = useParams();

  // State for user data
  const [userData, setUserData] = useState(getCacheData(userId, "userData"));
  const [isLoading, setIsLoading] = useState(!userData);
  const [isError, setIsError] = useState(false);

  // State for contributions and repositories of the user
  const [contributionsIsLoading, setContributionsIsLoading] = useState(!getCacheData(userId, "totalContributions"));
  const [totalRepositories, setTotalRepositories] = useState(getCacheData(userId, "totalRepositories") || {});
  const [totalContributions, setTotalContributions] = useState(getCacheData(userId, "totalContributions") || {});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // If user data is already available in the cache
      if (userData) {
        setUserData(userData);
        setTotalContributions(getCacheData(userId, "totalContributions") || {});
        setTotalRepositories(getCacheData(userId, "totalRepositories") || {});
      } else {
        try {
          const response = await fetch(`https://api.github.com/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          });

          // Check if the response is successful
          if (response.ok) {
            const userData = await response.json();
            setCacheData(userId, "userData", userData);
            setUserData(userData);

            const fetchRepositoriesAndContributions = async () => {
              const [repositories, contributions] = await Promise.all([
                fetchUserRepositories(userId),
                fetchUserContributions(userId),
              ]);

              setContributionsIsLoading(false);
              setTotalRepositories(repositories);
              setCacheData(userId, "totalRepositories", repositories);
              setTotalContributions(contributions);
              setCacheData(userId, "totalContributions", contributions);
            };

            fetchRepositoriesAndContributions();
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
  }, [userId, userData]);

  // Render the NotFound component if there's an error
  if (isError) {
    return <NotFound />;
  }

  // Render the Loader component if the user data is still loading
  if (isLoading && !userData) {
    return <Loader />;
  }

  return (
    <>
      <Profile
        name={userData?.login}
        image={userData?.avatar_url}
        created_at={userData?.created_at}
        url={userData?.html_url}
      />

      <ContributionsLineChart
        totalContributions={totalContributions}
        isLoading={contributionsIsLoading}
      />
    </>
  );
}
