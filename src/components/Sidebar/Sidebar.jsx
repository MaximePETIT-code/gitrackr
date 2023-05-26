import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import SearchUser from "../SearchUser/SearchUser";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <Logo />
        <Nav />
        <div className={styles.sidebar__search}>
          <SearchUser />
        </div>
      </div>
    </aside>
  );
}
