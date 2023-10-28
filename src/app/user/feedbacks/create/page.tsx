"use client";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Spacer,
  Button,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { storage } from "@/app/firebase";
import { createImageBlobUrl } from "@/app/utils";
import axios from "axios";
import { setUser } from "@/redux/slices/auth.slice";

export enum AssetStatus {
  Functional,
  UnderRepair,
  NonFunctional,
}

export interface Asset {
  assetId: string;
  assetName: string;
  imageUrl: string;
  color: string;
  type: string;
  status: AssetStatus;
  price: number;
  importedDate: Date;
  description: string;
  importerId: string;
  location: string;
}

export default function Page() {
  interface InitialValues {
    title: string;
    description: string;
    image: File | null;
    assetId: string;
  }

  const initialValues: InitialValues = {
    title: "",
    description: "",
    image: null,
    assetId: "",
  };

  const [imageUrl, setImageUrl] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const image = values.image;
      if (image == null) return;
      const storageRef = ref(storage, image.name);
      await uploadBytes(storageRef, image);
      const downloadUrl = await getDownloadURL(storageRef);

      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      if (accessToken == null) return;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .post(
          "http://26.78.227.119:5065/api/Feedbacks",
          {
            title: values.title,
            description: values.description,
            imageUrl: downloadUrl,
            assetId: values.assetId
          },
          { headers }
        )
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => console.log(error));
    },
  });

  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    axios
      .get("http://26.78.227.119:5065/api/Asset/All")
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(formik.values)

  return (
    <Card className="max-w-[600px] mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <CardHeader className="p-5">
          <div className="text-lg font-bold m-auto">Create Feedback</div>
        </CardHeader>
        <CardBody>
          <Input
            id="title"
            radius="sm"
            isRequired
            type="text"
            label="Title"
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <input
            onChange={async (event) => {
              const files = event.target.files;
              if (files == null) {
                console.log("a");
                setImageUrl("");
                return;
              }

              const file = files[0];
              if (file == null) {
                setImageUrl("");
                return;
              }

              const buffer = await file.arrayBuffer();
              const _imageUrl = createImageBlobUrl(buffer) as string;
              setImageUrl(_imageUrl);
              formik.setFieldValue("image", file);
            }}
            type="file"
            accept="image/*"
            multiple
          />
          {imageUrl ? <Spacer y={2} /> : null}

          <Image src={imageUrl} />
          <Spacer y={4} />
          <Textarea
            id="description"
            radius="sm"
            isRequired
            label="Description"
            labelPlacement="inside"
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <Select
            items={assets}
            label="Asset Id"
            placeholder="Select an asset id"
            variant="flat"
            selectedKeys={
              formik.values.assetId ? [formik.values.assetId] : undefined
            }
            onChange={(event) =>
              formik.setFieldValue("assetId", event.target.value)
            }
          >
            {(asset) => (
              <SelectItem key={asset.assetId}>{asset.assetId}</SelectItem>
            )}
          </Select>
        </CardBody>
        <CardFooter className="p-5">
          <Button radius="sm" type="submit" className="m-auto">
            {" "}
            Create{" "}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
