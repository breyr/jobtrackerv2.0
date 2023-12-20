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
    position?: string;
    company?: string;
    status?: string;
    lastUpdated?: string;
  };
}) {
  const { userId } = auth();
  const query = searchParams?.query || "";
  // get list of columns to sort by
  const sortColumns = {
    position: searchParams?.position || "",
    company: searchParams?.company || "",
    status: searchParams?.status || "",
    lastUpdated: searchParams?.lastUpdated || "",
  };

  if (!userId) {
    redirect("/");
  }

  return (
    <section className="flex-grow flex flex-col">
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
      <ButtonRow userId={userId} />
      {/* Table & Buttons */}
      <ApplicationsContent>
        <Suspense fallback={<RowSkeleton />}>
          <TableWrapper query={query} sortColumns={sortColumns} />
        </Suspense>
      </ApplicationsContent>
    </section>
  );
}
