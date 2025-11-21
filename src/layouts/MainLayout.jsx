import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main-layout">
        <Outlet />
      </main>
    </>
  );
};