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
  Select,
  SelectItem,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import {
  AssignedDetails,
  FixTaskDetails,
  FixTaskStatus,
  renderStatus,
  statusColorMapFixTask,
} from "../page";
import { UserIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/app/admin/manager/feedbacks/[id]/_components/ChooseEmployees";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [fixTask, setFixTask] = useState<FixTaskDetails | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/FixTask?taskId=${id}`;
    axios
      .get(url, { headers })
      .then((response) => setFixTask(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(fixTask);
  const createList = (list: AssignedDetails[] | undefined) => {
    if (list == undefined) return null;
    const body = list.map((element) => (
      <li className="text-sm flex gap-2 items-center">
        {" "}
        <UserIcon className="w-4 h-4" /> {element.employeeId}{" "}
      </li>
    ));
    return <ul> {body} </ul>;
  };

  const connection = useSelector((state: RootState) => state.signalR.hub);

  useEffect(() => {
    if (connection == null) return;
    connection.on("ProcessFixTaskSuccess", (message) => {
      alert(message);
    });
    connection.on("ReceiveFixTaskSuccess", (message) => {
      alert(message);
    });
  }, [connection]);

  console.log(fixTask)
  const _renderButtons = () => {
    switch (fixTask?.status) {
      case FixTaskStatus.Pending:
        return (
          <>
            <Button
              radius="sm"
              color="danger"
              onClick={async () => {
                if (connection == null) return;

                connection.invoke("ReceiveFixTask", {
                  fixTaskId: id,
                  handle: false,
                });
              }}
            >
              {" "}
              Reject{" "}
            </Button>
            <Button
              radius="sm"
              onClick={async () => {
                if (connection == null) return;

                connection.invoke("ReceiveFixTask", {
                  fixTaskId: id,
                  handle: true,
                });
              }}
            >
              {" "}
              Accept{" "}
            </Button>
          </>
        );
      case FixTaskStatus.Accepted:
        return <>
          <Button
            radius="sm"
            color="danger"
            onClick={async () => {
              if (connection == null) return;

              connection.invoke("ProcessFixTask", {
                fixTaskId: id,
                handle: false,
              });
            }}
          >
            {" "}
            Uncomplete{" "}
          </Button>
          <Button
            radius="sm"
            onClick={async () => {
              if (connection == null) return;

              connection.invoke("ProcessFixTask", {
                fixTaskId: id,
                handle: true,
              });
            }}
          >
            {" "}
            Complete{" "}
          </Button>
        </>;
        break;
      default:
        return null;
    }
  };
  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader className="p-5">
        <div className="text-lg font-bold m-auto">
          <div className="items-center">
            <div className="text-center">{fixTask?.title}</div>
            <Spacer y={1} />
            <div className="text-center">
              <Chip
                className="capitalize"
                color={
                  statusColorMapFixTask[fixTask?.status as 0 | 1 | 2 | 3 | 4]
                }
                size="sm"
                variant="flat"
              >
                {" "}
                {renderStatus(fixTask?.status as 0 | 1 | 2)}
              </Chip>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Input
          isReadOnly
          radius="sm"
          type="text"
          label="Feedback Id"
          variant="flat"
          value={fixTask?.feedbackId}
        />
        <Spacer y={4} />
        <Textarea
          id="description"
          radius="sm"
          label="Description"
          variant="flat"
          value={fixTask?.description}
        />
        <Spacer y={4} />
        <Input
          type="datetime-local"
          isReadOnly
          radius="sm"
          label="Deadline"
          variant="flat"
          value={formatDate(fixTask?.deadline as string)}
        />
        <Spacer y={4} />
        <div className="text-xs"> Assigned To</div>
        <Spacer y={1} />
        {createList(fixTask?.assignedDetails)}
      </CardBody>
      <CardFooter className="p-5">
        <div className="m-auto flex gap-4">{_renderButtons()}</div>
      </CardFooter>
    </Card>
  );
}
