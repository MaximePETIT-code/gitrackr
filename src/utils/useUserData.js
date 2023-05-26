import { useEffect, useState } from "react";
import { fetchUserRepositories } from "../utils/fetchUserRepositories";
import { fetchUserContributions } from "../utils/fetchUserContributions";
import { getCacheData, setCacheData } from "../utils/cache";

export const useUserData = (userId) => {
  // State for user data
  const [userData, setUserData] = useState(getCacheData(userId, "userData"));
  const [isError, setIsError] = useState(false);

  // State for contributions and repositories of the user
  const [dataIsLoading, setdataIsLoading] = useState(
    !getCacheData(userId, "totalContributions")
  );
  const [totalRepositories, setTotalRepositories] = useState(
    getCacheData(userId, "totalRepositories") || {}
  );
  const [totalContributions, setTotalContributions] = useState(
    getCacheData(userId, "totalContributions") || {}
  );

  useEffect(() => {
    const fetchData = async () => {
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
            setUserData(userData);
            setCacheData(userId, "userData", userData);

            const fetchRepositoriesAndContributions = async () => {
              const [repositories, contributions] = await Promise.all([
                fetchUserRepositories(userId),
                fetchUserContributions(userId),
              ]);

              setTotalRepositories(repositories);
              setCacheData(userId, "totalRepositories", repositories);
              setTotalContributions(contributions);
              setCacheData(userId, "totalContributions", contributions);
              setdataIsLoading(false);
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
    };

    fetchData();
  }, [userId, userData]);

  return {
    userData,
    isError,
    dataIsLoading,
    totalRepositories,
    totalContributions,
  };
};
