"use client";
import NewApplication from "@/components/NewApplication";
import { Input } from "@nextui-org/react";

export default function ButtonRow({ userId }: { userId: string }) {
  return (
    <div className="flex flex-row gap-4 w-11/12 items-center py-4 mx-auto pl-6">
      <NewApplication userId={userId} />
      <Input type="search" label="Search" size="sm" className="w-1/5" />
    </div>
  );
}
