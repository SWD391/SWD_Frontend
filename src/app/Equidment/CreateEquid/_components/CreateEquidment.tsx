import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Spacer, Select, SelectItem, Button } from "@nextui-org/react";
import { Resource } from "./data"

export default function Equid() {
  return (
    <Card className="max-w-[800px] m-auto">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col m-auto">
          <p className="text-md text text-lg font-bold"> Create Equidment</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Spacer y={4} />
        <div className="grid gap-4 grid-cols-2">
          <div>
            <Input
              isRequired
              type="Text"
              label="Name of Equidment"
              variant="bordered"
              className="max-w-xs" />
          </div>
          <div> <Input
            isRequired
            type="Text"
            label="Location"
            variant="bordered"
            className="max-w-xs" /></div>
          <div> <Input
            isReadOnly
            type="Text"
            label="Create At"
            variant="bordered"
            className="max-w-xs" /></div>
          <div> <Select
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
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
      <div className="m-auto">
            <Button radius="sm" type="submit">
              Done
            </Button>
          </div>
      </CardFooter>
    </Card>
  );
}