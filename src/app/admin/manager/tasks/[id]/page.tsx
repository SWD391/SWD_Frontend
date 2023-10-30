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
  renderStatus,
  statusColorMapFixTask,
} from "../page";
import { UserIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../feedbacks/[id]/_components/ChooseEmployees";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [fixTask, setFixTask] = useState<FixTaskDetails | null>(null);

  const [fetch, setFetch] = useState(false);

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
      .then((response) => {
        console.log(response.data);
        setFixTask(response.data);
      })
      .catch((error) => console.log(error));
  }, [fetch]);

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

  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    if (fixTask == null) return 
     setCurrentStatus(fixTask.feedback.asset.status)
  }, [fixTask])

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
          label="Feedback Title"
          variant="flat"
          value={fixTask?.feedback.title}
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
        <Spacer y={12} />
        <div className="text-xl font-bold"> Asset </div>
        <Spacer y={4} />
        <Input
          isReadOnly
          radius="sm"
          type="text"
          label="Asset Name"
          variant="flat"
          value={fixTask?.feedback.asset.assetName}
        />
        <Spacer y={4} />
        <Select
          items={[
            {
              key: 0,
              value: "Functional",
            },
            {
              key: 1,
              value: "Under Repair",
            },
            {
              key: 2,
              value: "Non-Functional",
            },
          ]}
          label="Update Status"
          placeholder="Select an animal"
          selectedKeys={[currentStatus.toString()]}
          onChange={(event) => setCurrentStatus(Number(event.target.value))}
        >
          {(aa) => <SelectItem key={aa.key.toString()}>{aa.value}</SelectItem>}
        </Select>
      </CardBody>
      <CardFooter className="p-5">
        <Button
          className="mx-auto"
          onClick={() => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken == null) return;
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
            const url = "http://26.78.227.119:5065/api/Asset/UpdateAssetStatus";
            axios
              .put(
                url,
                {
                  assetId: fixTask?.feedback.assetId,
                  status: currentStatus,
                },
                { headers }
              )
              .then((response) => alert(response.data))
              .catch((error) => console.log(error));
          }}
        >
          Apply Change
        </Button>
      </CardFooter>
    </Card>
  );
}
