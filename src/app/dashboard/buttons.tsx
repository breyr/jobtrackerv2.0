"use client";
import FilterModal from "@/components/FilterModal";
import NewApplication from "@/components/NewApplication";
import Search from "@/components/Search";

export default function ButtonRow({ userId }: { userId: string }) {
  return (
    <div className="flex flex-row gap-4 w-11/12 justify-between py-4 mx-auto pl-6 items-center">
      <div>
        <NewApplication userId={userId} />
      </div>
      <div className="flex items-center gap-3 w-2/5">
        <FilterModal />
        <Search />
      </div>
    </div>
  );
}
