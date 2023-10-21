import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { UserContextType } from "@/types/types";
import { getLoggedInUser } from "@/api/user/fetch";
import { QueryKeys } from "@/constants/query-keys";

export const UserAuthContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryFn: getLoggedInUser,
    queryKey: [QueryKeys.GetUser],
  });

  const contextValue = {
    user: isSuccess ? data : null,
    isSuccess,
    isLoading,
    isError,
    accessToken,
    setAccessToken,
  };

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);

  if (context === null) {
    throw new Error("useUserAuth must be used within a UserContextProvider");
  }

  return context;
};
