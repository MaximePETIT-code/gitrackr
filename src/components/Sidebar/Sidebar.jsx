import Nav from "../Nav/Nav";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <Nav/>
      </div>
    </aside>
  );
}
