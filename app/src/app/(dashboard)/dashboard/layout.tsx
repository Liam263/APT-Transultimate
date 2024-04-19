import { DashBoard } from "@/components/admin/dash-board";
import { Toaster } from "@/components/ui/sonner";
import { accounts } from "@/constants/mock-account";
import type { Metadata } from "next";
import Template from "./template";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section suppressHydrationWarning>
      <DashBoard accounts={accounts} navCollapsedSize={0}>
        <Toaster />
        <Template>{children}</Template>
      </DashBoard>
    </section>
  );
}
