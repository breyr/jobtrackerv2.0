"use client";

import EditApplication from "@/components/EditApplication";
import { deleteApplication } from "@/lib/data";
import { Button } from "@nextui-org/react";
import { FaLink, FaTrash } from "react-icons/fa";

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
  position: string;
  date: Date;
  status: string;
  notes: string | null | undefined;
  postingLink: string | null | undefined;
}) {
  return (
    <tr key={recordId} id={recordId}>
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
      <td>
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "UTC",
        })}
      </td>
      <td>
        <div className="inline-block mr-3">
          <EditApplication
            {...{
              recordId,
              company,
              position,
              status,
              notes,
              postingLink,
            }}
          />
        </div>
        <div className="inline-block">
          <form action={deleteApplication}>
            <input type="hidden" name="id" value={recordId} />
            <Button
              isIconOnly
              variant="flat"
              color="danger"
              type="submit"
              size="sm"
            >
              <FaTrash />
            </Button>
          </form>
        </div>
      </td>
    </tr>
  );
}
