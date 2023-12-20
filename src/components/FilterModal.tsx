"use client";
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
import { revalidatePath } from "next/cache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";

export default function FilterModal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleRadioChange = (label: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    switch (label) {
      case "Position":
        params.set("position", value);
        break;
      case "Company":
        params.set("company", value);
        break;
      case "Status":
        params.set("status", value);
        break;
      case "Date":
        params.set("lastUpdated", value);
        break;
      default:
        break;
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const clearSorts = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("position");
    params.delete("company");
    params.delete("status");
    params.delete("lastUpdated");
    replace(`${pathname}?${params.toString()}`);
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
                <div className="flex mx-auto items-around gap-2 mb-3">
                  <p className="w-20">Position</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("position")?.toString() || ""} //! has to be or empty string because the checked radio button will not clear
                    onChange={(e) => {
                      handleRadioChange("Position", e.target.value);
                    }}
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <div className="flex mx-auto items-center gap-2 mb-3">
                  <p className="w-20">Company</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("company")?.toString() || ""}
                    onChange={(e) =>
                      handleRadioChange("Company", e.target.value)
                    }
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <div className="flex mx-auto items-center gap-2 mb-3">
                  <p className="w-20">Status</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("status")?.toString() || ""}
                    onChange={(e) =>
                      handleRadioChange("Status", e.target.value)
                    }
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <div className="flex mx-auto items-center gap-2 mb-3">
                  <p className="w-20">Date</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("lastUpdated")?.toString() || ""}
                    onChange={(e) => handleRadioChange("Date", e.target.value)}
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    clearSorts();
                  }}
                >
                  clear
                </Button>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
