"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
  Spacer,
} from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgetPassword() {
  interface InitialValues {
    email: string;
  }

  const initialValues: InitialValues = {
    email:"",
  }

  const formik = useFormik (
    {
      initialValues,
      validationSchema: Yup.object({
        email: Yup.string().email("Wrong email format").required("Email can't be empty")

      }),
      onSubmit: async (values) =>{
        console.log(values)
      },
    }
  );


  return (
    <Card className="max-w-[600px] m-auto">
      <form onSubmit={formik.handleSubmit}>
        <CardHeader className="flex">
          <div className="text-md font-bold m-auto text-3xl">
            Forget Password
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div
            className="flex w-full flex-wrap md:flex-nowrap gap-4"
            color="success"
          >
            <Input id="email" label="Email" placeholder="Enter your email" onChange={formik.handleChange} isInvalid={!!formik.errors.email} errorMessage={formik.errors.email}/>
          </div>
          <div>
            <p className=""></p>
          </div>
          <Spacer y={3} />
          <div className="flex m-auto">
            <p className="text-sm color-warning">
              We will send you an Email for reset the password
            </p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button radius="sm" type="submit" className="m-auto">
            {" "}
            Send{" "}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}