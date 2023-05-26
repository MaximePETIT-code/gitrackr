import { NavigationItems } from "../../constants/NavigationItems";
import NavItem from "./NavItem/NavItem";
import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        {NavigationItems.map((item, index) => (
          <NavItem
            key={index}
            title={item.title}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </ul>
    </nav>
  );
}
