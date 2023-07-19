import PropTypes from "prop-types";
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import SearchUser from "../SearchUser/SearchUser";
import styles from "./Sidebar.module.scss";

export default function Sidebar({ userData }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <Logo />
        {userData && <Nav />}
        {console.log(userData)}
        <div className={styles.sidebar__search}>
          <SearchUser />
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  userData: PropTypes.object.isRequired,
};
