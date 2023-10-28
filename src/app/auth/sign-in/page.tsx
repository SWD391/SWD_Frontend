"use client";
import React, { useEffect } from "react";
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
} from "@nextui-org/react";
import { GoogleIcon } from "./_components/GoogleIcon";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/firebase";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/auth.slice";
import { useFormik } from "formik";
import axios from "axios";

export default function Page() {
  const user = useSelector((state: RootState) => state.auth.user);
  const connection = useSelector((state: RootState) => state.signalR.hub);

  const dispatch: AppDispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (connection == null) return;
      await connection.invoke("SignIn", {
        email: values.email,
        password: values.password,
      });
    },
  });

  useEffect(() => {
    if (connection == null) return;
    connection.on("SignInSuccess", (message) => {
      localStorage.setItem("accessToken", message.accessToken)
      const account = message.account
      dispatch(setUser(account))  
    });

    connection.on("SignInError", (message) => {
      console.log(message);
    })

  }, [connection]);

  console.log(user)

  return (
    <Card className="max-w-[400px] m-auto">
      <form onSubmit={formik.handleSubmit}>
        <CardHeader className="p-5">
          <div className="text-lg font-bold m-auto">Sign In</div>
        </CardHeader>
        <CardBody>
          <Button
            onClick={() => {
              signInWithPopup(auth, provider)
                .then((result) => {
                  const credential =
                    GoogleAuthProvider.credentialFromResult(result);

                  if (credential == null) return;

                  const token = credential.accessToken;
                  if (token == null) return;

                  localStorage.setItem("googleAccessToken", token);

                  const _user = result.user;

                  console.log(_user);

                  dispatch(
                    setUser({
                      uid: _user.uid,
                      email: _user.email,
                      fullName: _user.displayName,
                      photoUrl: _user.photoURL,
                    })
                  );
                })
                .catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.customData.email;
                  // The AuthCredential type that was used.
                  const credential =
                    GoogleAuthProvider.credentialFromError(error);
                  // ...
                });
            }}
            variant="bordered"
            radius="sm"
            startContent={<GoogleIcon />}
          >
            Sign In with Google
          </Button>
          <Spacer y={4} />
          <div className="flex items-center gap-2">
            <Divider className="shrink " />
            <span className="text-xs"> OR </span>
            <Divider className="shrink " />
          </div>
          <Spacer y={4} />
          <Input
            type="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            variant="bordered"
            label="Email"
          />
          <Spacer y={4} />
          <Input
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="bordered"
            label="Password"
          />
          <Spacer y={2} />
          <div className="flex flex-row-reverse">
            <Link
              href="#"
              size="sm"
              color="foreground"
              className="font-bold"
              underline="hover"
            >
              Forget Password?
            </Link>
          </div>
        </CardBody>
        <CardFooter className="p-5">
          <div className="w-full">
            <Button variant="flat" className="w-full" type="submit">
              {" "}
              Sign In{" "}
            </Button>
            <Spacer y={2} />
            <span className="text-sm"> Do not have an accout?</span>{" "}
            <Link
              href="#"
              size="sm"
              color="foreground"
              underline="hover"
              className="font-bold"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
