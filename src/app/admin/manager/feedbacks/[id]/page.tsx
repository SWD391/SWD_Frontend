"use client";

import { useParams } from "next/navigation";
import { SetStateAction, createContext, useEffect, useState } from "react";
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
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { FeedbackDetails, renderStatus, statusColorMapFeedback } from "../page";
import ChooseEmployees from "./_components/ChooseEmployees";
import { FormikValues, useFormik } from "formik";

export const FormikPropsContext = createContext<FormikValues | null>(null);

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [feedback, setFeedback] = useState<FeedbackDetails | null>(null);

  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `http://26.78.227.119:5065/api/Feedbacks?feedbackId=${id}`;
    axios
      .get(url, { headers })
      .then((response) => setFeedback(response.data))
      .catch((error) => console.log(error));
  }, [fetch]);

  interface InitialValues {
    title: string,
    description: string,
    deadline: string,
    employeeIds: string[];
  }

  const initialValues: InitialValues = {
    title: "",
    description: "",
    deadline: new Date().toISOString( ),
    employeeIds: [],
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      if (accessToken == null) return;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const url = `http://26.78.227.119:5065/api/FixTask`;

      axios
        .post(url, {
          title: values.title,
          description: values.description,
          deadline: values.deadline,
          feedbackId: id,
          employeeIds: values.employeeIds
        }, { headers })
        .then((response) => alert(response.data))
        .catch((error) => console.log(error));
    },
  });

  console.log(formik.values);

  return (
    <Card className="max-w-[600px] mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <FormikPropsContext.Provider value={formik}>
          <CardHeader className="p-5">
            <div className="text-lg font-bold m-auto">
              <div className="items-center">
                <div className="text-center">{feedback?.title}</div>
                <Spacer y={1} />
                <div className="text-center">
                  <Chip
                    className="capitalize"
                    color={
                      statusColorMapFeedback[feedback?.status as 0 | 1 | 2]
                    }
                    size="sm"
                    variant="flat"
                  >
                    {" "}
                    {renderStatus(feedback?.status as 0 | 1 | 2)}
                  </Chip>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Spacer y={4} />
            <Image src={feedback?.imageUrl} />
            <Spacer y={4} />
            <Textarea
              id="description"
              radius="sm"
              label="Description"
              variant="flat"
              value={feedback?.description}
            />
            <Spacer y={4} />
            <Input
              isReadOnly
              radius="sm"
              type="text"
              label="Asset Id"
              variant="flat"
              value={feedback?.assetId}
            />
          </CardBody>
          <CardFooter className="p-5">
            <div className="m-auto">
              <ChooseEmployees />
            </div>
          </CardFooter>
        </FormikPropsContext.Provider>
      </form>
    </Card>
  );
}
