import { NavigationItems } from "../../constants/NavigationItems";
import NavItem from "./NavItem/NavItem";

export default function Nav() {
  console.log()
  return (
    <nav>
      <ul>
        {NavigationItems.map((item, index) => (
          <NavItem key={index} title={item.title} path={item.path} icon={item.icon} />
        ))}
      </ul>
    </nav>
  );
}
