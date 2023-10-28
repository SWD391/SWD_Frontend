"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Input,
  Spacer,
  Card,
  CardBody,
  Pagination,
  Textarea,
  user,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "./_components/EditIcon";
import { DeleteIcon } from "./_components/DeleteIcon";
import { EyeIcon } from "./_components/EyeIcon";
import CreateUser from "./_components/CreateUser";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export interface FeedbackDetails {
  feedbackId: string;
  title: string;
  description: string;
  imageUrl: string;
  assetId: string;
  createdDate: string; // Consider using a Date object if you need to work with dates in your application
  status: number;
  submitedDate: string | null; // Consider using a Date object if you need to work with dates in your application
  creatorId: string;
}

export enum FeedbackStatus {
  Pending,
  Rejected,
  Approved,
}

export default function Page() {
  const [page, setPage] = React.useState(1);

  const router = useRouter();
  const path = usePathname();

  const [feedbacks, setFeedbacks] = useState<FeedbackDetails[]>([]);
  const [numUsers, setNumUsers] = useState<number>(0);
  const rowsPerPage = 10;

  const renderStatus = (number: 0 | 1 | 2) => {
    switch (number) {
      case 0:
        return "Pending";
      case 1:
        return "Rejected";
      case 2:
        return "Approved";
    }
  };

  const statusColorMap = {
    [FeedbackStatus.Pending]: "default",
    [FeedbackStatus.Rejected]: "danger",
    [FeedbackStatus.Approved]: "success",
  } as const;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url =
      "http://26.78.227.119:5065/api/Feedbacks/NumFeedbacksBelongUser";
    axios
      .get(url, { headers })
      .then((response) => setNumUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/Feedbacks/FeedbackPaginationBelongUser?pageNumber=${page}&pageSize=${rowsPerPage}`;

    axios
      .get(url, { headers })
      .then((response) => setFeedbacks(response.data))
      .catch((error) => console.log(error));
  }, [page]);

  const renderCell = React.useCallback(
    (feedback: FeedbackDetails, columnKey: React.Key) => {
      const cellValue = feedback[columnKey as keyof FeedbackDetails];
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: feedback.imageUrl }}
              name={feedback.title}
            ></User>
          );
        case "actions":
          return (
            <div className="relative flex items-center">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => router.push(`${path}/${feedback.feedbackId}`)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
            </div>
          );
        case "createdDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {feedback.createdDate}
              </p>
            </div>
          );
        case "submitedDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {feedback.submitedDate ?? "N/A"}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[feedback.status as 0 | 1 | 2]}
              size="sm"
              variant="flat"
            >
              {renderStatus(cellValue as 0 | 1 | 2)}
            </Chip>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <Card>
        <CardBody>
          <div className="flex justify-between">
            <Input
              isClearable
              className="w-full sm:max-w-[44%] relative"
              placeholder="Search by name..."
              startContent={<MagnifyingGlassIcon width={20} height={20} />}
            />
            <Button
              variant="flat"
              onPress={() => router.push(`${path}/create`)}
              endContent={<PlusIcon width={16} height={16} />}
            >
              Create
            </Button>
          </div>
          <Spacer y={4} />
          <Table
            aria-label="Users View"
            removeWrapper
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={Math.max(Math.ceil(numUsers / rowsPerPage), 1)}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={feedbacks}>
              {(item) => (
                <TableRow key={item.feedbackId}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

const columns = [
  { name: "NAME", uid: "name" },
  { name: "CREATED DATE", uid: "createdDate" },
  { name: "STATUS", uid: "status" },
  { name: "SUBMITED DATE", uid: "submitedDate" },
  { name: "ACTIONS", uid: "actions" },
];
