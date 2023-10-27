"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Spacer,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { GoogleIcon } from "../sign-in/_components/GoogleIcon";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/firebase";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/auth.slice";
import { useFormik } from "formik";
import axios from "axios";

export default function Page() {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch: AppDispatch = useDispatch();

  interface InitialValues {
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    birthdate: Date;
  }

  const initialValues: InitialValues = {
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    birthdate: new Date(),
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      axios.post("https://localhost:7046/api/Accounts/RegisterAccountManager", {
          username: values.username,
          password: values.password,
          email: values.email,
          phone: values.phone,
          address: values.address,
          birthday: values.birthdate.toISOString()
      }).then(response => console.log(response))
      .catch(error => console.log(error))
    },
  });

  return (

    <Card className="max-w-[400px] m-auto">
      <form onSubmit={formik.handleSubmit}>
        <CardHeader className="p-5">
          <div className="text-lg font-bold m-auto">Sign Up</div>
        </CardHeader>
        <CardBody>
          <Input
            type="email"
            variant="bordered"
            id="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <Input
            type="password"
            variant="bordered"
            id="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <Input
            variant="bordered"
            id="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <Input
            variant="bordered"
            id="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <Input
            variant="bordered"
            id="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <div className="grid grid-cols-2 gap-4">
            <Input variant="bordered" label="First Name" />
            <Input variant="bordered" label="Last Name" />
          </div>
          <Spacer y={4} />
          <Input
            type="date"
            variant="bordered"
            id="password"
            label="Birthdate"
            value={formik.values.birthdate.toDateString()}
            onChange={formik.handleChange}
          />
        </CardBody>
        <CardFooter className="p-5">
          <div className="w-full">
            <Button variant="flat" type="submit" className="w-full">
              {" "}
              Sign Up{" "}
            </Button>
            <Spacer y={2} />
            <span className="text-sm"> Already have an account?</span>{" "}
            <Link
              href="#"
              size="sm"
              color="foreground"
              underline="hover"
              className="font-bold"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
