"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Spacer,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function CreateUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  interface InitialValues {
    email: string;
    password: string;
    birthdate: Date;
    firstName: string;
    lastName: string;
    role: number;
    address: string;
    phoneNumber: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
    birthdate: new Date(),
    firstName: "",
    lastName: "",
    role: 0,
    address: "",
    phoneNumber: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Wrong email format")
        .required("Email can't be empty"),
      phoneNumber: Yup.string()
        .matches(/^\d{9}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);

      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      if (accessToken == null) return;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .post(
          "http://26.78.227.119:5065/api/Accounts",
          {
            email: values.email,
            password: values.password,
            birthdate: values.birthdate,
            firstName: values.firstName,
            lastName: values.lastName,
            role: values.role,
            address: values.address,
            phoneNumber: values.phoneNumber,
          },
          {
            headers,
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      onOpenChange();
    },
  });

  console.log(formik.values);

  return (
    <>
      <Button
        variant="flat"
        onPress={onOpen}
        endContent={<PlusIcon width={16} height={16} />}
      >
        Create
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create User
                </ModalHeader>
                <ModalBody>
                  <div>
                    <Spacer y={4} />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-1">
                      <div className="">
                        <Input
                          id="firstName"
                          type="text"
                          label="First name"
                          onChange={formik.handleChange}
                        />
                      </div>
                      <Spacer y={4} />
                      <div className="">
                        <Input
                          id="lastName"
                          type="text"
                          label="Last name"
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <Spacer y={4} />
                    <div className="flex">
                      <Select
                        className="flex max-w"
                        label="User role"
                        id="role"
                        value={0}
                        onChange={(event) => {
                          const selectedRoleValue = event.target.value;
                          // Set the value of the select tag to the selected role value.
                          formik.setFieldValue("role", selectedRoleValue);
                        }}
                      >
                        <SelectItem
                          id="role"
                          key="0"
                          startContent={
                            <Avatar
                              alt="Argentina"
                              className="w-6 h-6"
                              src="https://flagcdn.com/ar.svg"
                            />
                          }
                          onChange={formik.handleChange}
                        >
                          Feedback Person
                        </SelectItem>
                        <SelectItem
                          id="role"
                          key="1"
                          startContent={
                            <Avatar
                              alt="Venezuela"
                              className="w-6 h-6"
                              src="https://flagcdn.com/ve.svg"
                            />
                          }
                          onChange={formik.handleChange}
                        >
                          Role 1
                        </SelectItem>
                        <SelectItem
                          id="role"
                          key="2"
                          value={2}
                          startContent={
                            <Avatar
                              alt="Venezuela"
                              className="w-6 h-6"
                              src="https://flagcdn.com/ve.svg"
                            />
                          }
                          onChange={formik.handleChange}
                        >
                          Role 2
                        </SelectItem>
                        <SelectItem
                          id="role"
                          key="3"
                          startContent={
                            <Avatar
                              alt="Venezuela"
                              className="w-6 h-6"
                              src="https://flagcdn.com/ve.svg"
                            />
                          }
                          onChange={formik.handleChange}
                        >
                          Role 3
                        </SelectItem>
                      </Select>
                    </div>
                    <Spacer y={4} />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        id="email"
                        type="email"
                        label="Email"
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.email}
                        errorMessage={formik.errors.email}
                      />
                    </div>
                    <Spacer y={4} />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        id="password"
                        type="password"
                        label="Password"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <Spacer y={4} />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        id="phoneNumber"
                        label="Phone number"
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.phoneNumber}
                      />
                    </div>
                    <Spacer y={4} />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        id="address"
                        type="text"
                        label="Address"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <Spacer y={4} />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        id="birthdate"
                        defaultValue="2023-01-01"
                        type="date"
                        label="Birthdate"
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
