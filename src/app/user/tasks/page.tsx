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
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";

export interface AssignedDetails{
  assignedDetailsId: string,
  employeeId: string,
  taskId: string
}

export interface FixTaskDetails {
  taskId: string;
  title: string;
  description: string;
  createdDate: string;
  authorId: string;
  status: FixTaskStatus;
  receivedDate?: string;
  processedDate?: string;
  feedbackId: string;
  deadline: string;
  assignedDetails: AssignedDetails[]
}
export enum FixTaskStatus {
  Pending,
  Rejected,
  Accepted,
  Uncompleted,
  Completed,
}

export const statusColorMapFixTask = {
  [FixTaskStatus.Pending]: "default",
  [FixTaskStatus.Rejected]: "warning",
  [FixTaskStatus.Accepted]: "primary",
  [FixTaskStatus.Uncompleted]: "danger",
  [FixTaskStatus.Completed]: "success",
} as const;

export const renderStatus = (number: 0 | 1 | 2 | 3 | 4) => {
  switch (number) {
    case 0:
      return "Pending";
    case 1:
      return "Rejected";
    case 2:
      return "Accepted";
    case 3:
      return "Uncompleted";
    case 4:
      return "Completed";
  }
};

export default function Page() {
  const [page, setPage] = React.useState(1);

  const router = useRouter();
  const path = usePathname();

  const [fixTasks, setFixTasks] = useState<FixTaskDetails[]>([]);
  const [numTasks, setNumTasks] = useState<number>(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = "http://26.78.227.119:5065/api/FixTask/NumFixTasksBelongUser";
    axios
      .get(url, { headers })
      .then((response) => setNumTasks(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/FixTask/FixTaskPaginationBelongUser?pageNumber=${page}&pageSize=${rowsPerPage}`;

    axios
      .get(url, { headers })
      .then((response) => setFixTasks(response.data))
      .catch((error) => console.log(error));
  }, [page]);

  const renderCell = React.useCallback(
    (fixTask: FixTaskDetails, columnKey: React.Key) => {
      const cellValue = fixTask[columnKey as keyof FixTaskDetails];
      switch (columnKey) {
        case "title":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {fixTask.title}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => router.push(`${path}/${fixTask.taskId}`)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip content="Delete" color="danger">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        case "receivedDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {fixTask.receivedDate != null
                  ? new Date(fixTask.receivedDate).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          );
        case "processedDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {fixTask.processedDate != null
                  ? new Date(fixTask.processedDate).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          );
          case "deadline":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">
                  {fixTask.deadline != null
                    ? new Date(fixTask.deadline).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMapFixTask[fixTask.status as 0 | 1 | 2 | 4 ]}
              size="sm"
              variant="flat"
            >
              {renderStatus(cellValue as 0 | 1 | 2 | 3 | 4)}
            </Chip>
          );
        default:
          return ""
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
              className="w-full sm:max-w-[30%] relative"
              placeholder="Search by name..."
              startContent={<MagnifyingGlassIcon width={20} height={20} />}
            />
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
                  total={Math.max(Math.ceil(numTasks / rowsPerPage), 1)}
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
            <TableBody items={fixTasks} emptyContent={"No rows to display."}>
              {(item) => (
                <TableRow key={item.taskId}>
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
  { name: "TITLE", uid: "title" },
  { name: "DEADLINE", uid: "deadline" },
  { name: "STATUS", uid: "status" },
  { name: "RECEIVED DATE", uid: "receivedDate" },
  { name: "PROCESSED DATE", uid: "processedDate" },
  { name: "ACTIONS", uid: "actions" },
];
