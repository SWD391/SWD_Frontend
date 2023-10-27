"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Spacer, Image } from '@nextui-org/react'
export default function Home() {
  return (
    <main>
      <section className="min-h-[500px]">
        <div className="flex justify-between items-center gap-12">
        <div>
          <div className="text-8xl font-bold text-teal-500">Facifix</div>
          <div>The platform is dedicated to receiving feedback to enhance facility services.</div>
          <Spacer y={6}/>
          <Button> Feedback Now </Button>
        </div>
        <Image alt="phuoc" src="/main.png" width={400} radius="md" isZoomed height={50}/>
        </div>
      </section>
    </main>
  )
}
