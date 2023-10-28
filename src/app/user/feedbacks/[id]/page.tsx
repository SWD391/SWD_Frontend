"use client";

import { useParams } from "next/navigation";
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
  Image,
  Input,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { FeedbackDetails } from "../page";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [feedback, setFeedback] = useState<FeedbackDetails | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/Feedbacks?feedbackId=${id}`;
    axios
      .get(url, { headers })
      .then((response) => setFeedback(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader className="p-5">
        <div className="text-lg font-bold m-auto">Feedback Details</div>
      </CardHeader>
      <CardBody>
        <Input
          isReadOnly
          radius="sm"
          isRequired
          type="text"
          label="Title"
        />
        <Spacer y={4} />
        <Image />
        <Spacer y={4} />
        <Textarea
          id="description"
          radius="sm"
          isRequired
          label="Description"
          labelPlacement="inside"
        />
        <Spacer y={4} />
      </CardBody>
      <CardFooter className="p-5">
        <Button radius="sm" type="submit" className="m-auto">
          {" "}
          Create{" "}
        </Button>
      </CardFooter>
  </Card>
  );
}
