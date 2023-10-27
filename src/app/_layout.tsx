"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { setHub } from "@/redux/slices/signalR.slice";

export default function WrappedRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const connection = useSelector((state: RootState) => state.signalR.hub);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:7130/NotificationHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    connection.start()
    dispatch(setHub(connection));
  }, []);

  useEffect(() => {
    if (connection == null) return;
        connection.on("Welcome", (message) => {
          console.log("Received message from server: ", message);
        });
  }, [connection]);

  return children;
}
