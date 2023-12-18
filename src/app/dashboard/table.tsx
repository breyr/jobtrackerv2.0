import RowCheckbox from "@/components/RowCheckbox";
import { getTableData } from "@/lib/data";
import { auth } from "@clerk/nextjs";
import { Checkbox } from "@nextui-org/react";
import React from "react";

export default async function TableWrapper() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const rowData = await getTableData(userId);
  return (
    <>
      {rowData.map((row) => {
        return (
          <tr key={row.id}>
            <td>
              <RowCheckbox rowId={row.id} />
            </td>
            <td>{row.position}</td>
            <td>{row.company}</td>
            <td>{row.status}</td>
            <td>{row.notes}</td>
            <td>{row.postingLink}</td>
            <td>{row.lastUpdated.toLocaleDateString()}</td>
          </tr>
        );
      })}
    </>
  );
}
