"use client"
import { NextUIProvider, Spacer } from '@nextui-org/react'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './_components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
        <NextUIProvider>
          <NavBar/>
          <Spacer y={12}/>
          <div className="m-auto max-w-[1024px] px-6">
          <Spacer y={12}/>
            {children}
          </div>
          </NextUIProvider>
          </body>
    </html>
  )
}
