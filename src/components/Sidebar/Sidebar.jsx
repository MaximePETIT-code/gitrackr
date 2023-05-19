import { NavigationItems } from "../../constants/NavigationItems";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <nav>
          <ul>
            {NavigationItems.map((item) => (
              <li key={item.id}>
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
