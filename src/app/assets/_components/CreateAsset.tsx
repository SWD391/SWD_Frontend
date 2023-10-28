import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, image } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Spacer, Select, SelectItem } from "@nextui-org/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik"
import { storage } from "@/app/firebase";
import axios from "axios"

export default function CreateAsset() {
    interface InitialValues {
        assetName: string,
        image: File | null,
        color: string,
        type: string,
        price: number,
        description: string,
        location: string
    }
    const initialValues: InitialValues = {
        assetName: "",
        image: null,
        color: "",
        type: "",
        price: 0,
        description: "",
        location: ""
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const accessToken = localStorage.getItem("accessToken");
            console.log(accessToken)
            if (accessToken == null) return;

            const headers = {
                Authorization: `Bearer ${accessToken}` };
            
            const image = values.image
            if (image == null) return
            const storageRef = ref(storage, image.name);

            await uploadBytes(storageRef, image)

            const downloadUrl = await getDownloadURL(storageRef)
                console.log(downloadUrl)

            axios.post("http://26.78.227.119:5065/api/Asset", {
                assetName: values.assetName,
                imageUrl: downloadUrl,
                color: values.color,
                type: values.type,
                price: values.price,
                description: values.description,
                location: values.location
            },
                {
                    headers,
                })


                .then(response => console.log(response.data))
                .catch(error => console.log(error))
        },
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Add New</Button>
            <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>

                    {(onClose) => (
                        <>
                            <form onSubmit={formik.handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1 m-auto">Create Asset</ModalHeader>
                                <ModalBody>

                                    <Spacer y={4} />
                                    <div>
                                        <div>
                                            <Spacer y={4} />
                                            <Input
                                                id="assetName"
                                                value={formik.values.assetName}
                                                onChange={formik.handleChange}
                                                label="Name of Asset"
                                                type="Text"
                                            />
                                        </div>
                                        <div>
                                            <Spacer y={4} />
                                            <Input
                                                id="color"
                                                value={formik.values.color}
                                                onChange={formik.handleChange}
                                                type="Text"
                                                label="color"
                                                variant="bordered"
                                            /></div>
                                        <div> <Spacer y={4} /> <Input
                                            id="type"
                                            value={formik.values.type}
                                            onChange={formik.handleChange}
                                            type="Text"
                                            label="Type"
                                            variant="bordered"
                                        /></div>
                                        <div> <Spacer y={4} /> <Input
                                            id="price"
                                            value={formik.values.price.toString()}
                                            onChange={formik.handleChange}
                                            type="number"
                                            label="Price"

                                        ></Input></div>
                                        <div> <Spacer y={4} /> <Input
                                            id="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            type="Text"
                                            label="Description"
                                            variant="bordered"

                                        ></Input>
                                        </div>
                                        <div> <Spacer y={4} /> <Input
                                            id="location"
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            type="Text"
                                            label="Location"
                                            variant="bordered"

                                        ></Input>

                                        </div>
                                        <div>
                                            <Spacer y={4} />
                                            <input onChange={async (event) => {
                                                const files = event.target.files
                                                if (files == null) {
                                                    formik.setFieldValue("image", null)
                                                    return
                                                }

                                                formik.setFieldValue("image", files[0])
                                            }
                                            } type="file" accept="image/*" />

                                        </div>
                                    </div>


                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button radius="sm" type="submit">
                                        Done
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </>
    );

}
