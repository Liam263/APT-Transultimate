import { AddCustomer } from "@/components/customer/add-customer";
import { CustomerList } from "@/components/customer/customer-list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer",
};

export default async function Customer() {
  return (
    <Tabs defaultValue="overview">
      <div className="flex items-center px-4 py-2">
        <TabsList className="mr-auto">
          <TabsTrigger
            value="overview"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Customers
          </TabsTrigger>
          <TabsTrigger
            value="setting"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Add customer
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />

      <TabsContent value="overview" className="m-0">
        <div className="p-6">
          <CustomerList />
        </div>
      </TabsContent>
      <TabsContent value="setting" className="m-0">
        <div className="p-6">
          <AddCustomer />
        </div>
      </TabsContent>
    </Tabs>
  );
}
