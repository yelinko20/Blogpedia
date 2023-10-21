import { Link } from "react-router-dom";
import { UserCircle, Settings2, Save } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserAuth } from "@/context/UserContextProvider";
import { Separator } from "@/components/ui/separator";
import maskEmail from "@/utils/maskEmail";
import axiosInstance from "@/api/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/hooks/userLocalStorage";
import { Icons } from "@/icons/icons";

export default function ProfileDropDown() {
  const { user, isLoading } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const splitName = user?.name.charAt(0);
  const username = user?.profile.username;
  let maskedEmail;
  if (user?.email) {
    maskedEmail = maskEmail(user.email, 2);
  }

  const { removeItem } = useLocalStorage("accessToken");

  async function LoggedOut() {
    setLoading(true);
    try {
      await axiosInstance.post("/api/auth/log-out");
      toast.success("Log Out Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      removeItem();
      window.location.assign("/");
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <Icons.user
        style={{ width: "1.5rem", height: "1.5rem" }}
        className="text-muted-foreground"
      />
    );
  }

  return (
    <div className="mr-4 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            {user?.profile.image ? (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.profile.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-full inline-flex justify-center items-center"
                style={{
                  backgroundColor: user?.profile.bgColor,
                  color: "white",
                }}
              >
                {splitName}
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              className="w-full inline-flex items-center gap-2"
              to={`/profile/${username}`}
            >
              <UserCircle size={20} />
              <p>Profile</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full inline-flex items-center gap-2"
              to={"/me/lists"}
            >
              <Save size={20} />
              <p>Library</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full inline-flex items-center gap-2"
              to={"/settings"}
            >
              <Settings2 size={20} />
              Setting
            </Link>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <button
              className="w-full flex flex-col items-start gap-2 cursor-pointer"
              type="button"
              disabled={loading}
              onClick={LoggedOut}
            >
              <p>Sign out</p>
              <p>{maskedEmail}</p>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
