import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, CardFooter, Divider, CardBody, Link, Card, CardHeader, Switch, Pagination } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { PlusIcon } from "./PlusIcon";
import CreateAsset from "./CreateAsset";
import axios from "axios";
import { Asset } from "next/font/google";
import { useParams, usePathname, useRouter } from "next/navigation";
import path from "path";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

export default function ViewAsset() {

  const params = useParams();
  const id = params.id as string;

  const [page, setPage] = React.useState(1);

  const router = useRouter();
  const path = usePathname();
  
  type AssetDetail = {
    assetId: string,
    assetName: string,
    imageUrl: string,
    color: string,
    type: string,
  }
  const [assets, setAssets] = useState<AssetDetail[]>([]);
  const [numberAsset, setNumAssets] = useState<number>(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) return;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = "http://26.78.227.119:5065/api/Asset/NumAssets";
    axios
      .get(url, { headers })
      .then((response) => setNumAssets(response.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/Asset/AssetPagination?pageNumber=${page}&pageSize=${rowsPerPage}`
    console.log(url);
    axios
      .get(url, { headers })
      .then((response) => setAssets(response.data))
      .catch((error) => console.log(error));
  }, [page]);

  const renderCell = React.useCallback(
    (asset: AssetDetail, columnKey: React.Key) => {
      const cellValue = asset[columnKey as keyof AssetDetail];
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: asset.imageUrl }}
              name={asset.assetName}
            >
            </User>
          );
          case "color":
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{asset.color}</p>
            </div>
        case "type":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{asset.type}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details" >
                <span onClick={() => router.push(`${path}/${asset.assetId}`)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);


  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-1 items-end">
          <CreateAsset />
        </div>
      </div>
    );
  }, [
    assets.length,
  ]);
  return (
    <Table aria-label="Asset VIew"
      removeWrapper
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={Math.max(Math.ceil(numberAsset / rowsPerPage), 1)}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      isHeaderSticky
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      topContent={topContent}
      topContentPlacement="outside">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={assets}>
        {(item) => (
          <TableRow key={item.assetId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
const columns = [
  { name: "NAME", uid: "name" },
  { name: "TYPE", uid: "type" },
  { name: "ACTIONS", uid: "actions" },
];