import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex-grow flex flex-col justify-center items-center">
      <SignUp />
    </main>
  );
}
