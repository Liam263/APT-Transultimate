import { CreateCustomerForm } from "./components/create-customer-form";

export const AddCustomer = async () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create customer</h2>
          <p className="text-muted-foreground">
            Here&apos;s a module for create the customer, it also auto create
            the user for customer!
          </p>
        </div>
      </div>
      <CreateCustomerForm />
    </div>
  );
};
