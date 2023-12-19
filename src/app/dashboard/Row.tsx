"use client";

import { deleteApplication } from "@/lib/data";
import { Button } from "@nextui-org/react";
import { FaLink } from "react-icons/fa";

export function Row({
  recordId,
  company,
  position,
  date,
  status,
  postingLink,
  notes,
}: {
  recordId: string;
  company: string;
  position: string | null | undefined;
  date: Date;
  status: string;
  notes: string | null | undefined;
  postingLink: string | null | undefined;
}) {
  return (
    <tr
      key={recordId}
      id={recordId}
      className="hover:bg-[#18181b] hover:cursor-pointer"
    >
      <td>{position}</td>
      <td>{company}</td>
      <td>{status}</td>
      <td>{notes ? notes : <p className="text-zinc-700">none</p>}</td>
      <td>
        {postingLink ? (
          <a href={postingLink} target="_blank" className="hover:text-blue-500">
            <FaLink />
          </a>
        ) : (
          <p className="text-zinc-700">none</p>
        )}
      </td>
      <td>{date.toLocaleDateString()}</td>
      <td className="flex justify-center gap-2 w-15">
        <form action={deleteApplication}>
          <input type="hidden" name="id" value={recordId} />
          <Button variant="flat" color="danger" type="submit" size="sm">
            delete
          </Button>
        </form>
      </td>
    </tr>
  );
}
