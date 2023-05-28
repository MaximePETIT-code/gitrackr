import { NavigationItems } from "../../../constants/NavigationItems";
import MobileNavItem from "./MobileNavItem/MobileNavItem";
import styles from "./MobileNav.module.scss";

export default function MobileNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__container}>
        {NavigationItems.map((item, index) => (
          <MobileNavItem
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
