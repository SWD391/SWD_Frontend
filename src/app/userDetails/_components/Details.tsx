import React from "react";
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
} from "@nextui-org/react";

export default function Details() {
  return (
    <Card className="max-w-[600px] m-auto">
      <CardHeader className="flex">
        <div className="text-md font-bold m-auto text-3xl">
          User Information Details
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="d-il">
          <div className="flex w-100 h-100 m-auto">
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="w-55 h-55 text-large m-auto static"
              isBordered
            />
          </div>
          <Spacer y={4} />
          <Divider />
          <Spacer y={4} />
          <div className="flex justify-between">
            <div className="grid pl-5">
              <div>
                <Textarea
                  isReadOnly
                  variant="bordered"
                  label="Username"
                  labelPlacement="outside"
                  placeholder="Username"
                  defaultValue="Here is user Username"
                  // value={null}
                  size="sm"
                  minRows={1}
                  className="max-w h-auto"
                />
              </div>
              <Spacer y={3} />
              <div>
                <Textarea
                  isReadOnly
                  variant="bordered"
                  label="Fullname"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  defaultValue="Here is user Fullname"
                  // value={null}
                  size="sm"
                  minRows={1}
                  className="max-w h-auto"
                />
              </div>
              <Spacer y={3} />
              <div>
                <Textarea
                  isReadOnly
                  variant="bordered"
                  placeholder="Email"
                  label="Email"
                  labelPlacement="outside"
                  defaultValue="Here is user Email"
                  // value={null}
                  size="sm"
                  minRows={1}
                  className="max-w h-auto"
                />
              </div>
            </div>
            <Spacer y={4} />
            <div className="grid">
              <div>
                <Textarea
                  isReadOnly
                  variant="bordered"
                  placeholder="Address"
                  label="Address"
                  labelPlacement="outside"
                  defaultValue="Here is user Address"
                  // value={null}
                  size="sm"
                  minRows={1}
                  className="max-w h-auto"
                />
              </div>
              <Spacer y={3} />
              <div>
                <Textarea
                  isReadOnly
                  variant="bordered"
                  placeholder="Day of Birth"
                  label="Day of Birth"
                  labelPlacement="outside"
                  defaultValue="Here is user Day of Birth"
                  // value={null}
                  size="sm"
                  minRows={1}
                  className="max-w h-auto"
                />
              </div>
              <Spacer y={3} />
              <div>
                <Textarea
                  isReadOnly
                  variant="bordered"
                  placeholder="Phonenumber"
                  label="Phonenumber"
                  labelPlacement="outside"
                  defaultValue="11111111"
                  // value={null}
                  size="sm"
                  minRows={1}
                  className="max-w h-auto"
                />
              </div>
            </div>

          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex m-auto item-center gap-7" color="active">
          <Button radius="sm" type="submit" className="m-auto">
            {" "}
            Edit{" "}
          </Button>
          <Button radius="sm" type="button" className="m-auto" color="danger">
            {" "}
            Back{" "}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
