"use client";

import { getAllCustomer } from "@/services/customer";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export const CustomerList = () => {
  const { data } = useQuery({
    queryKey: ["customer"],
    queryFn: getAllCustomer,
  });

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list view our customers
          </p>
        </div>
      </div>
      {data?.length ? <DataTable data={data as any} columns={columns} /> : ""}
    </div>
  );
};
