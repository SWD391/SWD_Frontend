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
  Chip,
  Divider,
  Image,
  Input,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { FeedbackDetails, renderStatus, statusColorMapFeedback } from "../page";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [feedback, setFeedback] = useState<FeedbackDetails | null>(null);

  const [fetch, setFetch] = useState(false);

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
  }, [fetch]);

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader className="p-5">
        <div className="text-lg font-bold m-auto">
          <div className="items-center">
            <div className="text-center">{feedback?.title}</div>
            <Spacer y={1} />
            <div className="text-center">
              <Chip
                className="capitalize"
                color={statusColorMapFeedback[feedback?.status as 0 | 1 | 2]}
                size="sm"
                variant="flat"
              >
                {" "}
                {renderStatus(feedback?.status as 0 | 1 | 2)}
              </Chip>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Spacer y={4} />
        <Image src={feedback?.imageUrl} />
        <Spacer y={4} />
        <Textarea
          id="description"
          radius="sm"
          label="Description"
          variant="flat"
          value={feedback?.description}
        />
        <Spacer y={4} />
        <Input
          isReadOnly
          radius="sm"
          type="text"
          label="Asset Id"
          variant="flat"
          value={feedback?.assetId}
        />
      </CardBody>
      <CardFooter className="p-5">
        <div className="m-auto flex gap-4">
          <Button
            radius="sm"
            color="danger"
            onClick={async () => {
              const accessToken = localStorage.getItem("accessToken");
              console.log(accessToken);
              if (accessToken == null) return;

              const headers = {
                Authorization: `Bearer ${accessToken}`,
              };
              const url = `http://26.78.227.119:5065/api/Feedbacks/SubmitFeedback`;
              axios
                .post(
                  url,
                  {
                    feedbackId: id,
                    approve: false,
                  },
                  { headers }
                )
                .then((response) => {
                  setFetch(false);
                  alert(response.data);
                })
                .catch((error) => console.log(error));
            }}
          >
            {" "}
            Reject{" "}
          </Button>
          <Button
            radius="sm"
            onClick={async () => {
              const accessToken = localStorage.getItem("accessToken");
              console.log(accessToken);
              if (accessToken == null) return;

              const headers = {
                Authorization: `Bearer ${accessToken}`,
              };
              const url = `http://26.78.227.119:5065/api/Feedbacks/SubmitFeedback`;
              axios
                .post(
                  url,
                  {
                    feedbackId: id,
                    approve: true,
                  },
                  { headers }
                )
                .then((response) => {
                  setFetch(true);
                  alert(response.data);
                })
                .catch((error) => console.log(error));
            }}
          >
            {" "}
            Approve{" "}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
