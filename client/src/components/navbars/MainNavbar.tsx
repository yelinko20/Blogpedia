import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/icons/icons";
import { ModeToggle } from "@/components/ui/theme-mode-toggle";
import SearchInput from "@/components/SearchInput";
import { useAppSelector } from "@/redux/hook";
import ProfileDropDown from "@/components/ProfileDropDown";
import AutoCompleteSearchBox from "../AutoCompleteSearchBox";

export default function MainNavbar() {
  const { query } = useAppSelector((state) => state.query);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query && query?.length > 0) {
      try {
        navigate(
          `/post/search?q=${query.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")}`
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      return null;
    }
  }

  return (
    <div className="fixed w-full top-0 left-0 z-20 bg-white dark:bg-background border-b border-muted">
      <nav className="w-full container flex items-center justify-between py-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/">
            <Icons.logo className="mr-2 sm:h-14 sm:w-14 w-10 h-10" />
          </Link>
          <div className="relative">
            <SearchInput handleSubmit={handleSubmit} />
            {query && query.length > 0 && (
              // <div className="absolute mt-4 hidden sm:block">
              <AutoCompleteSearchBox
                className={"absolute mt-4 hidden sm:block"}
              />
              // </div>
            )}
          </div>
        </div>

        <div className="flex items-center  gap-4">
          <Link to={"/search"} className="sm:hidden">
            <Icons.search
              style={{ width: 22, height: 22 }}
              className="text-muted-foreground dark:text-white"
            />
          </Link>
          <div>
            <Link
              to={"/write-post"}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icons.penSquare
                style={{ width: 22, height: 22 }}
                className="text-muted-foreground mr-2 dark:text-white"
              />
              <span className="text-muted-foreground font-light dark:text-white">
                Write
              </span>
            </Link>
          </div>
          <ProfileDropDown />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
