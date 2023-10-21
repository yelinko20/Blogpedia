import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserAuth } from "@/context/UserContextProvider";
import EditGeneralProfile from "@/components/EditGeneralProfile";

export default function Settings() {
  const { user } = useUserAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EditGeneralProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        <div className="text-3xl font-medium mb-10">Settings</div>
        <Tabs defaultValue="account">
          <TabsList className="flex items-center gap-12 justify-start w-full bg-transparent">
            <TabsTrigger
              value="account"
              className="data-[state=active]:border-b data-[state=active]:border-b-primary px-0 rounded-none"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="Publishing"
              className="data-[state=active]:border-b data-[state=active]:border-primary px-0 rounded-none"
            >
              Publishing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="mt-8 max-w-lg w-full">
              <div className="flex justify-between items-center cursor-pointer">
                <p className="text-sm">Email address</p>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="mt-8 max-w-lg w-full">
              <div className="flex justify-between items-center cursor-pointer">
                <p className="text-sm">Username & subdomain</p>
                <p className="text-sm">{user?.profile.username}</p>
              </div>
            </div>
            <div
              className="mt-8 max-w-lg w-full"
              onClick={() => setIsOpen(true)}
            >
              <div className="flex justify-between items-center cursor-pointer">
                <div>
                  <p className="text-sm">Profile information</p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    Edit your name, photo and bio
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm">{user?.name}</p>
                  {user?.profile.image ? (
                    <div className="w-7 h-7 rounded-full overflow-hidden">
                      <img
                        src={user?.profile.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white"
                      style={{ backgroundColor: user?.profile.bgColor }}
                    >
                      {user?.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Publishing">
            <div className="text-lg mt-8 text-muted-foreground">
              STILL DEVELOPING...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
