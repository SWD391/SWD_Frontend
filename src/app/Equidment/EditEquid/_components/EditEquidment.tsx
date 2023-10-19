import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Spacer, SelectItem, Select, Button } from "@nextui-org/react";
import { Resource } from "./data";
import { useFormik } from "formik"
import { storage } from "@/app/firebase"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function Equid() {
  interface InitialValues {
    nameofEquidment: string,
    location: string,
    creataat: string,
    images: File[]
  }

  const initialValues: InitialValues = {
    nameofEquidment: "",
    location: "",
    creataat: "",
    images: []
  }
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {

      for (const image of values.images) {
        const storageRef = ref(storage, image.name);

        await uploadBytes(storageRef, image)

        const downloadUrl = await getDownloadURL(storageRef)

        console.log(downloadUrl)
      }
    },
  });
  console.log(formik.values);
  return (

    <Card className="max-w-[800px] m-auto">
      <form onSubmit={formik.handleSubmit}>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col m-auto">
            <p className="text-md text text-lg font-bold"> Edit Equidment</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Spacer y={4} />
          <div className="grid gap-4 grid-cols-2">

            <Input
              id="nameofEquidment"
              isRequired
              type="text"
              label="Name of Equidment"
              variant="bordered"
              className="max-w-xs" />
            <Input
              id="location"
              isRequired
              type="text"
              variant="bordered"
              label="Location"
              className="max-w-xs" />
            <Input
              id="createat"
              isReadOnly
              type="text"
              label="Create At"
              variant="bordered"
              className="max-w-xs" />
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                label="Select an resource"
                className="max-w-xs"
                isRequired
              >
                {Resource.map((Resource) => (
                  <SelectItem key={Resource.value} value={Resource.value}>
                    {Resource.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Spacer y={4} />
              <input onChange={async (event) => {
                const files = event.target.files
                if (files == null) {
                  formik.setFieldValue("images", [])
                  return
                }

                let fileArray: File[] = []
                let imageArray: string[] = []

                for (let i = 0; i < files.length; i++) {
                  const item = files.item(i)
                  if (item == null) return

                  fileArray.push(item)

                  const data = await item.arrayBuffer()

                  var base64 = btoa(
                    new Uint8Array(data)
                      .reduce((data, byte) => data + String.fromCharCode(byte), '')
                  );

                  imageArray.push(base64)
                }

                formik.setFieldValue("images", fileArray)
              }
              } type="file" accept="image/*" multiple />

            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="p-5">
          <div className="m-auto">
            <Button radius="sm" type="submit">
              Done
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}