import { getTableData } from "@/lib/data";
import { auth } from "@clerk/nextjs";
import React from "react";
import { Row } from "./Row";

export default async function TableWrapper() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const records = await getTableData(userId);
  return (
    <>
      {records.map((record) => {
        return (
          <Row
            key={record.id}
            recordId={record.id}
            company={record.company}
            position={record.position}
            date={record.lastUpdated}
            status={record.status}
            notes={record.notes}
            postingLink={record.postingLink}
          />
        );
      })}
    </>
  );
}
