"use client";

export default function ApplicationContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <table className="w-5/6 mx-auto mt-3">
        <thead>
          <tr>
            <th></th>
            <th>Position</th>
            <th>Company</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Posting URL</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
}
