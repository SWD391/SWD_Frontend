"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { setHub } from "@/redux/slices/signalR.slice";
import axios from "axios";
import { setUser } from "@/redux/slices/auth.slice";

export default function WrappedRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const connection = useSelector((state: RootState) => state.signalR.hub);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://26.78.227.119:5065/NotificationHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    connection.start();
    dispatch(setHub(connection));
  }, []);

  useEffect(() => {
    if (connection == null) return;
    connection.on("Welcome", (message) => {
      console.log("Received message from server: ", message);
    });
  }, [connection]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios.get("http://26.78.227.119:5065/api/Accounts/GetAccount", { headers})
    .then(response => dispatch(setUser(response.data)))
    .catch(error => console.log(error))
  }, []);

  return children;
}
