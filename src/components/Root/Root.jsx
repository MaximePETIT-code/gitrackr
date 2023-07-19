import { Outlet, useMatch, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Root.module.scss";
import { useScreenSize } from "../../utils/useScreenSize";
import MobileNav from "../Nav/MobileNav/MobileNav";
import Profile from "../Profile/Profile";
import { useUserData } from "../../utils/useUserData";

export default function Root() {
  const isMobileScreen = useScreenSize(990);
  const match = useMatch("/:userId");
  const isUserIdPage = match !== null;

  const containerStyle = {
    maxHeight: isUserIdPage ? "100vh" : undefined,
  };

  const { userId } = useParams();
  const { userData } = useUserData(userId);
  
  return (
    <div className={styles.container} style={containerStyle}>
      {isMobileScreen ? <MobileNav /> : userData && <Sidebar userData={userData} />}
      <main className={styles.main}>
        <header>
          {userData && (
            <Profile
              name={userData.login}
              image={userData.avatar_url}
              created_at={userData.created_at}
              url={userData.html_url}
            />
          )}
        </header>
        <Outlet />
      </main>
    </div>
  );
}
