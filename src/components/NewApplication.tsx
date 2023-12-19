import { addApplication } from "@/lib/data";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

export default function NewApplication({ userId }: { userId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const statusOptions = [
    { label: "Applied", value: "applied" },
    { label: "Interview", value: "interview" },
    { label: "Offer", value: "offer" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <>
      <Button onPress={onOpen} variant="bordered" color="secondary">
        + application
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Application
              </ModalHeader>
              <ModalBody>
                <form action={addApplication}>
                  <Input
                    type="text"
                    name="company"
                    label="Company"
                    required
                    className="mt-3"
                  />
                  <Input
                    type="text"
                    name="position"
                    label="Position"
                    className="mt-3"
                  />
                  <Select label="Status" className="mt-3">
                    {statusOptions.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Textarea label="Notes" name="notes" className="mt-3" />
                  <Input
                    type="text"
                    name="postingLink"
                    label="Posting Link"
                    className="mt-3"
                  />
                  <Input
                    type="date"
                    name="date"
                    label="Date for status"
                    placeholder="MM/DD/YYYY"
                    className="mt-3"
                  />
                  <input type="hidden" name="userId" value={userId} />
                  <Button
                    color="success"
                    variant="bordered"
                    type="submit"
                    className="mt-5"
                    onClick={onClose}
                  >
                    Submit
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
