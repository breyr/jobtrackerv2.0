"use client";

import RowCheckbox from "@/components/RowCheckbox";

export function Row({
  key,
  company,
  position,
  date,
  status,
  postingLink,
  notes,
}: {
  key: string;
  company: string;
  position: string | null | undefined;
  date: Date;
  status: string;
  notes: string | null | undefined;
  postingLink: string | null | undefined;
}) {
  return (
    <tr key={key} id={key}>
      <td>
        <RowCheckbox rowId={key} />
      </td>
      <td>{position}</td>
      <td>{company}</td>
      <td>{status}</td>
      <td>{notes}</td>
      <td>{postingLink}</td>
      <td>{date.toLocaleDateString()}</td>
    </tr>
  );
}
