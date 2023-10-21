import Lottie from "lottie-react";
import LoadingAnimation from "@/json/loading-animation.json";

export default function SuspenseFallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className=" w-24 h-24 overflow-hidden">
        <Lottie
          animationData={LoadingAnimation}
          loop={true}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
