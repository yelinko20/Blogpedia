import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/icons/icons";

export default function GuestNavbar() {
  return (
    <div className="fixed w-full top-0 left-0 z-20 sm:border-b sm:border-[#020817] dark:text-[#020817]">
      <nav className="w-full container flex items-center justify-between py-3 sm:py-2">
        <div className="flex items-center gap-2">
          <Icons.logo className="mr-2 sm:h-14 sm:w-14 w-12 h-12" />
          <span className="font-extrabold text-2xl hidden sm:block">
            Blogpedia
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden sm:block"
            )}
            to={"/auth/log-in"}
          >
            Write
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden sm:block"
            )}
            to={"/auth/log-in"}
          >
            Sign In
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "dark:bg-[#020817] dark:text-foreground"
            )}
            to={"/auth/register"}
          >
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}
