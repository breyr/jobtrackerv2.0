"use client";
import { Button, Input } from "@nextui-org/react";

export default function ButtonRow() {
  return (
    <div className="flex flex-row gap-4 w-5/6 items-center py-4 mx-auto">
      <Button color="primary" variant="bordered">
        + application
      </Button>
      <Input type="search" label="Search" size="sm" className="w-1/5" />
    </div>
  );
}
