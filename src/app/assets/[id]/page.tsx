"use client"
import { useParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Spacer,
    Textarea,
} from "@nextui-org/react";
export default function Page() {
    const params = useParams();
    type AssetDetail = {
        assetId: string,
        assetName: string,
        imageUrl: string,
        color: string,
        type: string,
        price: number,
        status: number,
        importDate: Date,
        location: string,
        description: string,

    }
    const id = params.id as string;
    const [assets, setAssets] = useState<AssetDetail | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        if (accessToken == null) return;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const url = "http://26.78.227.119:5065/api/Asset/NumAssets";
        axios
            .get(url, { headers })
            .then((response) => setAssets(response.data))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <Card className="max-w-auto m-auto">
                <CardHeader className="flex">
                    <div className="text-md font-bold m-auto text-lg">
                        Asset Details
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="d-il">
                        <div className="flex w-100 h-100 m-auto">
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                                className="w-55 h-55 text-large m-auto static"
                                isBordered
                            />
                        </div>
                        <Spacer y={4} />
                        <Divider />
                        <Spacer y={4} />
                        <div className="flex justify-between">
                            <div className="grid pl-10">
                                <div>
                                    <Textarea
                                        isReadOnly
                                        variant="bordered"
                                        label="Asset Name"
                                        labelPlacement="outside"
                                        value={assets?.assetName}
                                        size="lg"
                                        minRows={1}
                                    />
                                </div>
                                <Spacer y={3} />
                                <div>
                                    <Textarea
                                        isReadOnly
                                        variant="bordered"
                                        label="Color"
                                        labelPlacement="outside"
                                        value={assets?.color}
                                        size="lg"
                                        minRows={1}
                                    />
                                </div>
                                <Spacer y={3} />
                                <div>
                                    <Textarea
                                        isReadOnly
                                        variant="bordered"
                                        label="Type"
                                        labelPlacement="outside"
                                        value={assets?.type}
                                        size="lg"
                                        minRows={1}
                                    />
                                </div>
                                <Spacer y={3} />
                                {/* <div>
                                    <Textarea
                                        isReadOnly
                                        variant="bordered"
                                        label="Import Date"
                                        labelPlacement="outside"
                                        value={assets?.importDate.toDateString()}
                                        size="lg"
                                        minRows={1}
                                        className="w-auto h-auto"
                                    />
                                </div> */}
                                <Spacer y={3} />
                                <div>
                                    <Textarea
                                        isReadOnly
                                        variant="bordered"
                                        label="Description"
                                        labelPlacement="outside"
                                        value={assets?.description}
                                        size="lg"
                                        minRows={1}
                                    />
                                </div>
                                <Spacer y={3} />
                                <div>
                                    <Textarea
                                        isReadOnly
                                        variant="bordered"
                                        label="Location"
                                        labelPlacement="outside"
                                        value={assets?.location}
                                        size="lg"
                                        minRows={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <Divider/>
                <CardFooter>
                <div className="flex m-auto item-center gap-7" color="active">
                    <Button radius="sm" type="button" className="m-auto" color="danger">
                    {" "}
                    Back{" "}
                    </Button>
                </div>
                </CardFooter>
            </Card>
        </div>
    );
}