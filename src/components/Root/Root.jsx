import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>navbar</nav>
      <Outlet />
    </>
  );
}
