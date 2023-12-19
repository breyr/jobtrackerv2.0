import CardsSkeleton from "@/components/CardsSkeleton";
import RowSkeleton from "@/components/RowSkeleton";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ApplicationsContent from "./ApplicationContent";
import ButtonRow from "./buttons";
import CardWrapper from "./cards";
import TableWrapper from "./table";

export default function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const { userId } = auth();
  const query = searchParams?.query || "";

  if (!userId) {
    redirect("/");
  }

  return (
    <section className="flex-grow flex flex-col">
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
      <ButtonRow userId={userId} query={query} />
      {/* Table & Buttons */}
      <ApplicationsContent>
        <Suspense fallback={<RowSkeleton />}>
          <TableWrapper query={query} />
        </Suspense>
      </ApplicationsContent>
    </section>
  );
}
