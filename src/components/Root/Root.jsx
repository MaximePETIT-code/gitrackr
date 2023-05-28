import { Outlet, useMatch } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Root.module.scss";

export default function Root() {
  const match = useMatch("/:userId");
  const isUserIdPage = match !== null;

  const containerStyle = {
    maxHeight: isUserIdPage ? "100vh" : undefined,
  };

  return (
    <div className={styles.container} style={containerStyle}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
