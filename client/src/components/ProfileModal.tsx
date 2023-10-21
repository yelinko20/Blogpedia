import { useState } from "react";
import { useUserAuth } from "@/context/UserContextProvider";

import { useLocalStorage } from "@/hooks/userLocalStorage";
import EditGeneralProfile from "./EditGeneralProfile";

export default function ProfileModal() {
  const { user } = useUserAuth();
  const { setItem, getItem } = useLocalStorage("isCloseProfileModal");
  const isCloseProfileModal = getItem();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {(!user?.profile.image || !user.profile.bio) && !isCloseProfileModal && (
        <EditGeneralProfile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setItem={setItem}
        />
      )}
    </>
  );
}
