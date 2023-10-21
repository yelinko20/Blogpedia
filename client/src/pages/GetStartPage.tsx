import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HomeAnimation from "@/json/home-animation.json";
import GuestNavbar from "@/components/navbars/GuestNavbar";

export default function GetStartPage() {
  return (
    <section>
      <GuestNavbar />
      <div className="min-h-screen pt-28 bg-[#FFC017] pb-4 dark:text-[#020817]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="lg:w-1/2">
            <div className="text-5xl md:text-7xl mb-4 lg:mb-8 font-dmserif font-bold">
              Stay Curious
            </div>
            <div className="mb-4 lg:mb-8">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </div>
            <Link
              to={"/auth/register"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "dark:bg-[#020817] dark:text-foreground"
              )}
            >
              Start Reading
            </Link>
          </div>
          <div className="lg:w-1/2">
            <Lottie animationData={HomeAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
