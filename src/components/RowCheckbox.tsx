import { Button } from "@nextui-org/react";

export default function RowCheckbox({ rowId }: { rowId: string }) {
  return (
    <Button id={rowId} color="danger" variant="flat">
      Delete
    </Button>
  );
}
