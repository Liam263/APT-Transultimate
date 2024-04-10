import { CreateUserForm } from "./components/create-user-form";

export const CreateUser = async () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create user</h2>
          <p className="text-muted-foreground">
            Here&apos;s a module for create the user app!
          </p>
        </div>
      </div>
      <CreateUserForm />
    </div>
  );
};
