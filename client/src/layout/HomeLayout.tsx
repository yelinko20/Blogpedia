import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/navbars/MainNavbar";
import { useLocalStorage } from "@/hooks/userLocalStorage";
import { useUserAuth } from "@/context/UserContextProvider";
import GetStartPage from "@/pages/GetStartPage";

export default function HomeLayout() {
  const { getItem, removeItem } = useLocalStorage("accessToken");
  const { user, isSuccess } = useUserAuth();
  const token = getItem();
  if (isSuccess && !user) {
    removeItem();
  }
  return (
    <>
      {token || user ? (
        <>
          <MainNavbar />
          <section className="container mx-auto mt-24">
            <Outlet />
            <div className="fixed w-[16rem] h-[40rem] -z-10 right-20 top-1/4  dark:bg-gradient-to-b from-[rgb(12,34,55,0.8)] to-[rgb(42,29,55,0.8)] rounded-full -rotate-45 blur-3xl "></div>
            <div className="fixed w-[20rem] h-[40rem] -z-10 left-1/4 bottom-20 dark:bg-gradient-to-b from-[rgb(12,34,55,0.8)] to-[rgb(42,29,55,0.8)] rounded-full rotate-45 blur-3xl"></div>
          </section>
        </>
      ) : (
        <GetStartPage />
      )}
    </>
  );
}

// token || token === accessToken ? <HomeLayout /> : <GetStartPage />,
