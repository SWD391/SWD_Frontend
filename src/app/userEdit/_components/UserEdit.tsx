"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Spacer,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import CameraIcon from "./CameraIcon";
import { useFormik } from "formik";
import { storage } from "@/app/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as Yup from "yup";



export default function UserEdit() {
  interface InitialValues {
    fullname: string;
    email: string;
    phonenumber: String;
    address: String;
    birthday: Date;
    images: File[];
  }

  const initialValues: InitialValues = {
    fullname: "",
    email: "",
    phonenumber: "",
    address: "",
    birthday: new Date(),
    images: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Wrong email format").required("Email can't be empty"),
      phonenumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      for (const image of values.images) {
        const storageRef = ref(storage, image.name);
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);
      }
      console.log(values)
    },
  });

  const [avatarSrc, setAvatarSrc] = useState(
    "https://i.pravatar.cc/150?u=a04258114e29026708c"
  );

  function handleButtonClick() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const selectedFile = (event.target as HTMLInputElement)?.files?.[0];
      if (selectedFile) {
        const selectedFileUrl = URL.createObjectURL(selectedFile);
        setAvatarSrc(selectedFileUrl);
      }
    });
  }

  return (
    <Card className="max-w-[700px] mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <CardHeader className="flex gap-3">
          <div className="text-lg font-bold m-auto text-3xl">
            Edit User Info
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex w-100 h-100 m-auto">
            <Avatar
              id="images"
              src={avatarSrc}
              className="w-55 h-55 m-auto static"
              isBordered
            />
            <div className="flex items-center gap-4 m-auto mb-0">
              <Button
                isIconOnly
                color="warning"
                variant="faded"
                aria-label="Take a photo"
                onClick={handleButtonClick}
              >
                <CameraIcon />
              </Button>
            </div>
          </div>
          <Spacer y={4} />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              id="fullname"
              type="text"
              label="Full name"
              onChange={formik.handleChange}
              
            />
          </div>
          <Spacer y={4} />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              id="email"
              type="email"
              label="Email"
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.email}
            />
          </div>
          <Spacer y={4} />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              id="phonenumber"
              type="number"
              label="Phone number"
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.phonenumber}
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
              id="birthday"
              type="date"
              label="Birthday"
              onChange={formik.handleChange}
            />
          </div>
          <Spacer y={4} />
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex m-auto item-center gap-7" color="active">
            <Button radius="sm" type="submit" className="m-auto">
              {" "}
              Submit{" "}
            </Button>
            <Button radius="sm" type="button" className="m-auto" color="danger">
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
