import { CreateAccreditation } from "@/components/customer/create-accreditation";
import { CreateDepartmentModule } from "@/components/customer/create-department";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateUser } from "@/components/user/add-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup",
};

export default async function Setup() {
  return (
    <Tabs defaultValue="accreditation">
      <div className="flex items-center px-4 py-2">
        <TabsList className="mr-auto">
          <TabsTrigger
            value="accreditation"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Accreditation
          </TabsTrigger>
          <TabsTrigger
            value="departments"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Departments
          </TabsTrigger>
          <TabsTrigger
            value="trainingModules"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Training & Modules
          </TabsTrigger>
          <TabsTrigger
            value="safetyChecks"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Safety checks
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />

      <TabsContent value="accreditation" className="m-0">
        <div className="p-6">
          <CreateAccreditation />
        </div>
      </TabsContent>
      <TabsContent value="departments" className="m-0">
        <div className="p-6">
          <CreateDepartmentModule />
        </div>
      </TabsContent>
      <TabsContent value="trainingModules" className="m-0">
        <div className="p-6"></div>
      </TabsContent>
      <TabsContent value="safetyChecks" className="m-0">
        <div className="p-6"></div>
      </TabsContent>
    </Tabs>
  );
}
