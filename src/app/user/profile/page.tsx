"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Textarea,
  Avatar,
  Spacer,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getRole, setUser } from "@/redux/slices/auth.slice";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { createImageBlobUrl } from "../../utils";
import axios from "axios";

export default function Page() {
    const dispatch: AppDispatch = useDispatch()

  const [isEdit, setIsEdit] = useState(false);

  interface InitialValues {
    image: File | null;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    birthdate: string | null;
  }

  const [blobImageUrl, setBlobImageUrl] = useState("");

  const initialValues: InitialValues = {
    image: null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    birthdate: null,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const image = values.image;
      let imageUrl : string | undefined;
      if (image != null) {
        const storageRef = ref(storage, image.name);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }
      
      console.log(imageUrl)
      
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      if (accessToken == null) return;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .put(
          "http://26.78.227.119:5065/api/Accounts/SelfUpdateAccount",
          {
            birthdate: values.birthdate,
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            phoneNumber: values.phoneNumber,
            imageUrl
          },
          { headers }
        )
        .then((response) => dispatch(setUser(response.data)))
        .catch((error) => console.log(error));
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files == null) return;

    const file = files.item(0);
    if (file == null) return;

    const buffer = await file.arrayBuffer();
    const blob = createImageBlobUrl(buffer);

    setBlobImageUrl(blob as string);
    formik.setFieldValue("image", file);
  };

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user == null) return;
    setBlobImageUrl(user.imageUrl);
    formik.setFieldValue("firstName", user.firstName);
    formik.setFieldValue("lastName", user.lastName);
    formik.setFieldValue("phoneNumber", user.phoneNumber);
    formik.setFieldValue("address", user.address);
    formik.setFieldValue("birthdate", user.birthdate);
  }, [user]);

  console.log(formik.values)

  return (
    <Card className="max-w-[500px] m-auto">
      <form onSubmit={formik.handleSubmit}>
        <CardHeader className="flex">
          <div className="font-bold m-auto text-xl">User Profile</div>
        </CardHeader>
        <CardBody>
          <div>
            <div className="flex w-fit items-end m-auto">
              <Avatar
                src={blobImageUrl}
                className="m-auto w-32 h-32"
                isBordered
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                isDisabled={!isEdit}
                isIconOnly
                size="sm"
              >
                {" "}
                <CameraIcon className="w-6 h-6" />
              </Button>
              <input
                onChange={handleChange}
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
              />
            </div>

            <Spacer y={6} />
            <div>
              <Input
                isReadOnly
                type="email"
                id="email"
                label="Email"
                variant="flat"
                value={user?.email}
                onChange={formik.handleChange}
              />
              <Spacer y={4} />
              <div className="flex justify-between gap-4">
                <Input
                  isReadOnly={!isEdit}
                  label="First Name"
                  id="firstName"
                  variant="flat"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <Input
                  isReadOnly={!isEdit}
                  label="Last Name"
                  id="lastName"
                  variant="flat"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
              <Spacer y={4} />
              <Input
                isReadOnly={!isEdit}
                label="Phone Number"
                id="phoneNumber"
                variant="flat"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
              <Spacer y={4} />
              <Input
                isReadOnly={!isEdit}
                label="Birthdate"
                variant="flat"
                type="date"
                id="birthdate"
                onChange={(event) =>
                  formik.setFieldValue("birthdate", event.target.value)
                }
                value={formik.values.birthdate?.substring(0,10)}
              />
              <Spacer y={4} />
              <Input
                isReadOnly={!isEdit}
                label="Address"
                variant="flat"
                id="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <Spacer y={4} />
              <Input
                isReadOnly
                label="Role"
                value={getRole(user?.role as number)}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex m-auto item-center">
            <Button
              radius="sm"
              type={!isEdit ? "submit" : undefined}
              className="m-auto"
              onClick={() => setIsEdit(!isEdit)}
            >
              {" "}
              {!isEdit ? "Edit" : "Confirm"}{" "}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export const roles = [
  {
    id: 0,
    name: "Feedback Person",
  },
  {
    id: 1,
    name: "Employee",
  },
  {
    id: 2,
    name: "Administrator Staff",
  },
  {
    id: 2,
    name: "Administrator Manager",
  },
];
