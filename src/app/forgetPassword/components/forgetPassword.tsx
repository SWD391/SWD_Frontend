"use client"
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Input, Spacer} from "@nextui-org/react";

export default function ForgetPassword() {
  return (
    <Card className="max-w-[600px] m-auto">
      <CardHeader className="flex">
        <div className="text-md font-bold m-auto text-3xl">
          Forget Password
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4" color="success">
      <Input type="email" label="Email" placeholder="Enter your email" />
    </div>
    <Spacer y={3}/>
    <div className="flex m-auto">
        <p className="text-sm color-warning">We will send you an Email for reset the password</p>
    </div>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Button radius="sm" type="submit" className="m-auto">
            {" "}
            Send{" "}
          </Button>
      </CardFooter>
    </Card>
  );
}


