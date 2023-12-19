"use client";
import { getTableData } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

export default function FilterModal({ query }: { query: string }) {
  const user = useUser();
  const userId = user.user!.id; // shouldn't be null because we are signed in

  const [positionSort, setPositionSort] = useState("");
  const [companySort, setCompanySort] = useState("");
  const [statusSort, setStatusSort] = useState("");
  const [dateSort, setDateSort] = useState("");

  const handleRadioChange = (label: string, value: string) => {
    switch (label) {
      case "Position":
        setPositionSort(value);
        break;
      case "Company":
        setCompanySort(value);
        break;
      case "Status":
        setStatusSort(value);
        break;
      case "Date":
        setDateSort(value);
        break;
      default:
        break;
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly onPress={onOpen} variant="flat" color="secondary">
        <FaFilter />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-80">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sort Rows
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (e.currentTarget.checkValidity()) {
                      const formData = new FormData(e.currentTarget);
                      getTableData(userId, query, formData);
                      onClose();
                    }
                  }}
                >
                  <div className="flex w-full items-center gap-2 mb-3">
                    <p className="w-20">Position: </p>
                    <RadioGroup
                      orientation="horizontal"
                      value={positionSort}
                      onChange={(e) =>
                        handleRadioChange("Position", e.target.value)
                      }
                    >
                      <Radio value="position-asc">asc</Radio>
                      <Radio value="position-desc">desc</Radio>
                    </RadioGroup>
                  </div>
                  <div className="flex w-full items-center gap-2 mb-3">
                    <p className="w-20">Company: </p>
                    <RadioGroup
                      orientation="horizontal"
                      value={companySort}
                      onChange={(e) =>
                        handleRadioChange("Company", e.target.value)
                      }
                    >
                      <Radio value="company-asc">asc</Radio>
                      <Radio value="company-desc">desc</Radio>
                    </RadioGroup>
                  </div>
                  <div className="flex w-full items-center gap-2 mb-3">
                    <p className="w-20">Status: </p>
                    <RadioGroup
                      orientation="horizontal"
                      value={statusSort}
                      onChange={(e) =>
                        handleRadioChange("Status", e.target.value)
                      }
                    >
                      <Radio value="status-asc">asc</Radio>
                      <Radio value="status-desc">desc</Radio>
                    </RadioGroup>
                  </div>
                  <div className="flex w-full items-center gap-2 mb-3">
                    <p className="w-20">Date: </p>
                    <RadioGroup
                      orientation="horizontal"
                      value={dateSort}
                      onChange={(e) =>
                        handleRadioChange("Date", e.target.value)
                      }
                    >
                      <Radio value="date-asc">asc</Radio>
                      <Radio value="date-desc">desc</Radio>
                    </RadioGroup>
                  </div>
                  <Button
                    color="success"
                    variant="bordered"
                    type="submit"
                    className="mt-5"
                  >
                    save
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    className="ml-3"
                    onClick={() => {
                      setPositionSort("");
                      setCompanySort("");
                      setStatusSort("");
                      setDateSort("");
                    }}
                  >
                    clear
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
