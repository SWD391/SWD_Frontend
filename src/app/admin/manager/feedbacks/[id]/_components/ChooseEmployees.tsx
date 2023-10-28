"use client"
import React, { useContext } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Spacer, Textarea} from "@nextui-org/react";
import EmployeeTable from "./EmployeeTable";
import { FormikContext } from "formik";
import { FormikPropsContext } from "../page";

export default function ChooseEmployees() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const formik = useContext(FormikPropsContext)
  if (formik == null) return 

  return (
    <>
      <Button onPress={onOpen}>Create Fix Task</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col p-5 text-center">Create Fix Task</ModalHeader>
              <ModalBody>
                <div>
                <Input id="title" variant="flat" label="Title" onChange={formik.handleChange} value={formik.values.title}/>
                <Spacer y={4}/>
                <Textarea id="description" variant="flat" label="Description" onChange={formik.handleChange} value={formik.values.description}/>
                <Spacer y={4}/>
                <Input type="datetime-local" variant="flat" label="Deadline" id="deadline" onChange={formik.handleChange} value={formatDate(formik.values.deadline).toLocaleString()}/>
                <Spacer y={4}/>
                <EmployeeTable/>
                </div>
              </ModalBody>
              <ModalFooter className="p-5">
                <Button color="default" className="m-auto" onClick={formik.handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDate;
}
