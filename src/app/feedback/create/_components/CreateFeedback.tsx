"use client";
import React from "react";
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
} from "@nextui-org/react";
import { useFormik } from "formik";
import { storage } from "@/app/firebase";

export default function CreateFeedback() {
  
  interface InitialValues {
    title: string,
    description: string,
    images: File[],
  }

  const initialValues: InitialValues = {
    title: "",
    description: "",
    images: []
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {

      for (const image of values.images){
        const storageRef = ref(storage, image.name);

        await uploadBytes(storageRef, image)

        const downloadUrl = await getDownloadURL(storageRef)

        console.log(downloadUrl)
      }
    },
  });

  console.log(formik.values);

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
            variant="bordered"
            label="Title"
            onChange={formik.handleChange}
          />
          <Spacer y={4} />
          <input onChange={async (event) => {
            const files = event.target.files
            if (files == null) {
              formik.setFieldValue("images", [])
              return 
            } 
            
            let fileArray: File[] = []
            let imageArray: string[] = []

            for (let i = 0; i < files.length; i++){
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

          <Spacer y={4} />
          <Textarea
            id="description"
            radius="sm"
            isRequired
            label="Description"
            labelPlacement="inside"
            variant="bordered"
            onChange={formik.handleChange}
          />
        </CardBody>
        <CardFooter className="p-5">
          <Button radius="sm" type="submit"> Create </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
