"use client";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./_components/NavBar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import axios from "axios";
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import WrappedRoot from "./_layout"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => { 
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) return;

    // axios.get("https://localhost:7046/api/Accounts/ProfileAccount", {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // }).then(console.log)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <Provider store={store}>
          <WrappedRoot>
            <NavBar />
            <Spacer y={12} />
            <div className="m-auto max-w-[1024px] px-6">
              <Spacer y={12} />
              {children}
            </div>
            </WrappedRoot>
          </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
