import { Outlet, useMatch } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Root.module.scss";
import { useScreenSize } from "../../utils/useScreenSize";
import MobileNav from "../Nav/MobileNav/MobileNav";

export default function Root() {
  const isMobileScreen = useScreenSize(990);
  const match = useMatch("/:userId");
  const isUserIdPage = match !== null;

  const containerStyle = {
    maxHeight: isUserIdPage ? "100vh" : undefined,
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {isMobileScreen ? <MobileNav /> : <Sidebar />}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
