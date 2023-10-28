"use client";

import { useParams } from "next/navigation";
import { UserDetails } from "../_components/ViewUsers";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spacer,
  Textarea,
} from "@nextui-org/react";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/Accounts?accountId=${id}`;
    axios
      .get(url, { headers })
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Card className="max-w-[600px] m-auto">
        <CardHeader className="flex">
          <div className="text-md font-bold m-auto text-lg">
            User Information Details
          </div>
        </CardHeader>
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
              <div className="grid pl-10">
                <div>
                  <Textarea
                    isReadOnly
                    variant="bordered"
                    label="First Name"
                    labelPlacement="outside"
                    placeholder="Username"
                    value={user?.firstName}
                    size="lg"
                    minRows={1}
                    className="w-auto h-auto"
                  />
                </div>
                <Spacer y={3} />
                <div>
                  <Textarea
                    isReadOnly
                    variant="bordered"
                    label="Phonenumber"
                    labelPlacement="outside"
                    placeholder="Phonenumber"
                    value={user?.phoneNumber}
                    size="lg"
                    minRows={1}
                    className="w-auto h-auto"
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
                    value={user?.email}
                    size="lg"
                    minRows={1}
                    className="max-w h-auto"
                  />
                </div>
              </div>
              <Spacer y={4} />
              <div className="grid pr-12">
                <div>
                  <Textarea
                    isReadOnly
                    variant="bordered"
                    placeholder="lastName"
                    label="Last Name"
                    labelPlacement="outside"
                    value={user?.lastName}
                    size="lg"
                    minRows={1}
                    className="w-auto h-auto"
                  />
                </div>
                <Spacer y={3} />
                <div>
                  <Textarea
                    isReadOnly
                    variant="bordered"
                    placeholder="Birthdate"
                    label="Birthdate"
                    labelPlacement="outside"
                    value={user?.birthdate}
                    // value={null}
                    size="lg"
                    minRows={1}
                    className="max-w h-auto"
                  />
                </div>
                <Spacer y={3} />
                <div>
                  <Textarea
                    isReadOnly
                    variant="bordered"
                    placeholder="Address"
                    label="Address"
                    labelPlacement="outside"
                    value={user?.address}
                    size="lg"
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
    </div>
  );
}
