import React from "react";
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
import { GoogleIcon } from "./GoogleIcon";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/firebase";

export default function SignUp() {
  return (
    <Card className="max-w-[400px] m-auto">
      <CardHeader className="p-5">
        <div className="text-lg font-bold m-auto">Sign In</div>
      </CardHeader>
      <CardBody>
        <Input type="email" variant="bordered" label="Email" />
        <Spacer y={4} />
        <Input type="password" variant="bordered" label="Password" />
      </CardBody>
      <CardFooter className="p-5">
        <div className="w-full">
          <Button variant="flat" className="w-full">
            {" "}
            Sign In{" "}
          </Button>
          <Spacer y={4} />
          <div className="grid place-items-center">
            <div> Or sign in with </div>
            <Spacer y={2} />
            <Button
              onClick={() => {
                signInWithPopup(auth, provider)
                  .then((result) => {
          
                    const credential =
                      GoogleAuthProvider.credentialFromResult(result);

                    if (credential == null) return;

                    const token = credential.accessToken;
                    if (token == null) return 

                    localStorage.setItem("googleAccessToken", token)

                    const user = result.user;

                    console.log(user)
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
              isIconOnly
              variant="bordered"
              radius="sm"
              size="lg"
            >
              <GoogleIcon />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
