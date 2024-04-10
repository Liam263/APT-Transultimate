import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateUser } from "@/components/user/add-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
};

export default async function User() {
  return (
    <Tabs defaultValue="overview">
      <div className="flex items-center px-4 py-2">
        <TabsList className="mr-auto">
          <TabsTrigger
            value="overview"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="setting"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Add user
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />

      <TabsContent value="overview" className="m-0">
        <div className="p-6"></div>
      </TabsContent>
      <TabsContent value="setting" className="m-0">
        <div className="p-6">
          <CreateUser />
        </div>
      </TabsContent>
    </Tabs>
  );
}
