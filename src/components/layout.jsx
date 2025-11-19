import ScrollToTop from "./scrollToTop";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
