import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import NotFoundAnimation from "@/json/404-animation.json";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6">
      <div className="text-[#CACED5] text-5xl md:text-9xl">404 Page</div>
      <Lottie animationData={NotFoundAnimation} loop={true} />
      <Link to={"/"} className={cn(buttonVariants({ variant: "default" }))}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
