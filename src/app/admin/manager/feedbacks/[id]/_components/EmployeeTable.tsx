"use client";
import React, { useContext, useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { EditIcon } from "../../_components/EditIcon";
import { DeleteIcon } from "../../_components/DeleteIcon";
import { EyeIcon } from "../../_components/EyeIcon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FormikPropsContext } from "../page";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export interface UserDetails {
  accountId: string;
  email: string;
  password: string;
  imageUrl: string;
  birthdate: string;
  firstName: string;
  lastName: string;
  role: number;
  address: string;
  phoneNumber: string;
  status: boolean;
}

export enum AccountRole {
  FeedbackPerson,
  Employee,
  AdministratorStaff,
  AdministratorManager,
}

export const statusColorMapAccount = {
  [AccountRole.FeedbackPerson]: "default",
  [AccountRole.Employee]: "warning",
  [AccountRole.AdministratorStaff]: "primary",
  [AccountRole.AdministratorManager]: "secondary",
} as const;

export const renderStatus = (number: 0 | 1 | 2 | 3) => {
  switch (number) {
    case 0:
      return "Feedback Person";
    case 1:
      return "Employee";
    case 2:
      return "Administrator Staff";
    case 3:
      return "Administrator Manager";
  }
};

export default function EmployeeTable() {
  const [page, setPage] = React.useState(1);

  const [users, setUsers] = useState<UserDetails[]>([]);
  const [numUsers, setNumUsers] = useState<number>(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url =
      "http://26.78.227.119:5065/api/Accounts/NumAccountsWithRole?role=1";
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
    const url = `http://26.78.227.119:5065/api/Accounts/AccountPaginationWithRole?role=1&pageNumber=${page}&pageSize=${rowsPerPage}`;

    axios
      .get(url, { headers })
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, [page]);

  const renderCell = React.useCallback(
    (user: UserDetails, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserDetails];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.imageUrl }}
              description={user.email}
              name={user.firstName}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <Chip
              className="capitalize"
              color={statusColorMapAccount[user.role as 0 | 1 | 2 | 3]}
              size="sm"
              variant="flat"
            >
              {renderStatus(cellValue as 0 | 1 | 2)}
            </Chip>
          );
        case "phone":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user.phoneNumber}</p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const formik = useContext(FormikPropsContext)
  if (formik == null) return 
  
  return (
    <>
      <Table
        aria-label="Users View"
        removeWrapper
        color="default"
        selectionMode="multiple"
        selectedKeys={formik.values.employeeIds}
        onSelectionChange={(key) => formik.setFieldValue("employeeIds", Array.from(key))}
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
        <TableBody emptyContent={"No rows to display."} items={users}>
          {(item) => (
            <TableRow key={item.accountId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "PHONE NUMBER", uid: "phone" },
];
