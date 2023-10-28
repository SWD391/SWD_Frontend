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
} from "@nextui-org/react";
import { EditIcon } from "./_components/EditIcon";
import { DeleteIcon } from "./_components/DeleteIcon";
import { EyeIcon } from "./_components/EyeIcon";
import CreateUser from "./_components/CreateUser";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";

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

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const deleteUser = async (id: any) => {
    await axios.delete(
      `http://26.78.227.119:5065/api/Accounts?accountId=${id}`
    );

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/Accounts/AccountPagination?pageNumber=${page}&pageSize=${rowsPerPage}`;

    axios
      .get(url, { headers })
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };

  const [page, setPage] = React.useState(1);

  const router = useRouter();
  const path = usePathname();

  const [users, setUsers] = useState<UserDetails[]>([]);
  const [numUsers, setNumUsers] = useState<number>(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = "http://26.78.227.119:5065/api/Accounts/NumAccounts";
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
    const url = `http://26.78.227.119:5065/api/Accounts/AccountPagination?pageNumber=${page}&pageSize=${rowsPerPage}`;

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
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user.role}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => router.push(`${path}/${user.accountId}`)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteUser(user.accountId)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
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
            <CreateUser />
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
            <TableBody items={users}>
              {(item) => (
                <TableRow key={item.accountId}>
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
  { name: "ROLE", uid: "role" },
  { name: "PHONE NUMBER", uid: "phone" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
