import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Spacer, Button} from "@nextui-org/react";

export default function CreateFeedback() {
  return (
    <Card className="max-w-[400px] m-auto">
      <CardHeader className="p-5">
          <div className="text-lg font-bold m-auto"> 
          Sign In
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <Input type="email"  variant="bordered" label="Email" />
      <Spacer y={6}/>
      <Input type="password" variant="bordered"  label="Password" />
      </CardBody>
      <Divider/>
      <CardFooter className="p-5">
        <div className="flex">
            <Button> Sign In </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
