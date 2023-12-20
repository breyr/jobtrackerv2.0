import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold text-center">
        Welcome to Jobtrackr 🎉
      </h1>
      <p className="text-2xl mt-3">Track your applications seamlessly</p>
    </main>
  );
}
