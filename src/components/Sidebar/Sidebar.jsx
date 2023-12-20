import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.scss";
import Recommandations from "./Recommandations/Recommandations";
export default function Sidebar({ userData }) {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(userData.followers_url);
        if (response.ok) {
          const data = await response.json();
          const randomFollowers = selectRandomFollowers(data, 3);
          setFollowers(randomFollowers);
        } else {
          console.error("Error fetching followers:", response.status);
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    if (userData && userData.followers_url) {
      fetchFollowers();
    }
  }, [userData]);

  const selectRandomFollowers = (followersData, count) => {
    const shuffledFollowers = followersData.sort(() => 0.5 - Math.random());
    return shuffledFollowers.slice(0, count);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__top}>
          <Logo size={"small"} />
          {userData && <Nav />}
        </div>
        <div className={styles.sidebar__bottom}>
          <Recommandations followers={followers} />
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  userData: PropTypes.object.isRequired,
};
