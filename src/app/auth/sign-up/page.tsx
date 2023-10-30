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
import { useRouter } from "next/navigation";
import { AccountRole } from "@/app/admin/manager/feedbacks/[id]/_components/EmployeeTable";
import { formatDate } from "@/app/admin/manager/feedbacks/[id]/_components/ChooseEmployees";

export default function Page() {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch: AppDispatch = useDispatch();

  interface InitialValues {
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    birthdate: string;
    firstName: string;
    lastName: string;
    role: AccountRole
  }

  const initialValues: InitialValues = {
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    birthdate: new Date().toString(),
    firstName: "",
    lastName: "",
    role: AccountRole.FeedbackPerson
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      axios
        .post("http://26.78.227.119:5065/api/Accounts/SignUp", {
          password: values.password,
          email: values.email,
          phoneNumber: values.phone,
          address: values.address,
          birthday: convertToCustomFormat(values.birthdate),
          firstName: values.firstName,
          lastName: values.lastName,
          role: values.role
        })
        .then((response) => alert(response.data))
        .catch((error) => console.log(error));
    },
  });
  console.log(formik.values)

  const router = useRouter();
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
            id="birthdate"
            label="Birthdate"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <Select
            items={[
              {
                id: 0,
                value: "Feedback Person",
              },
              {
                id: 1,
                value: "Employee",
              },
            ]}
            label="Select Role"
            selectedKeys={[formik.values.role.toString()]}
            onChange={event => formik.setFieldValue("role", event.target.value)}
          >
            {(item) => (
              <SelectItem key={item.id}>{item.value}</SelectItem>
            )}
          </Select>
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
              onClick={() => router.push("/auth/sign-in")}
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

function convertToCustomFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(1, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  const customFormat = `${year}-${month}-${day}Z${hours}:${minutes}T`;
  return customFormat;
}
