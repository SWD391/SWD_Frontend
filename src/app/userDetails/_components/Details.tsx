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
    <Card className="max-w-[700px] m-auto">
      <CardHeader className="flex gap-3">
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
          <div>
            <div className="gap-4 font-bold text-large">Username</div>
            <div className="flex max-w h-15">
              <Card>
                <CardBody className="max-w">
                  <p>username6969123</p>
                </CardBody>
              </Card>
            </div>
          </div>
          <Spacer y={6} />
          <div>
            <div className="gap-4 font-bold text-large">Fullname</div>
            <div className="flex max-w h-15">
              <Card>
                <CardBody className="max-w">
                  <p>Nguyen nguyen nguyen nguyen</p>
                </CardBody>
              </Card>
            </div>
          </div>
          <Spacer y={4} />
          <div>
            <div className="gap-4 font-bold text-large">Email</div>
            <div className="flex max-w h-15">
              <Card>
                <CardBody className="max-w">
                  <p>Nfpt@fpt.fpt.com</p>
                </CardBody>
              </Card>
            </div>
          </div>
          <Spacer y={4} />
          <div>
            <div className="gap-4 font-bold text-large">Address</div>
            <div className="flex max-w h-15">
              <Card>
                <CardBody className="max-w">
                  <p>696969 Nguyen Thi Minh Khai Quan 1</p>
                </CardBody>
              </Card>
            </div>
          </div>
          <Spacer y={4} />
          <div>
            <div className="gap-4 font-bold text-large">Date of Birth</div>
            <div className="flex max-w h-15"> 
              <Card>
                <CardBody className="max-w">
                  <p>06/09/2069</p>
                </CardBody>
              </Card>
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
