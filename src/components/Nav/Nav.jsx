import { NavigationItems } from "../../constants/NavigationItems";
import NavItem from "./NavItem/NavItem";
import SearchUser from "../SearchUser/SearchUser";

export default function Nav() {
  return (
    <nav>
      <ul>
        {NavigationItems.map((item, index) => (
          <NavItem key={index} title={item.title} path={item.path} icon={item.icon} />
        ))}
      </ul>

      <SearchUser/>
    </nav>
  );
}
