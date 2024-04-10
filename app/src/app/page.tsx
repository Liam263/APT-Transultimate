import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin board.",
};

export default function HomePage() {
  return <h1>Admin board</h1>;
}
