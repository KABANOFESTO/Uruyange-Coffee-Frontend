import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreatePaymentMutation } from "@/lib/redux/slices/PaymentSlice";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ShippingType {
    isPay?: boolean;
    setIsPay: (value: boolean) => void;
    coffee: {
        title: string,
        price: number
    };
    quantity: number;
}

interface PaymentValues {
    email: string;
    firstName?: string;
    lastName?: string;
    address: string;
    apartment?: string;
    city: string;
    zipCode: string;
    phone?: string;
    textOffers: boolean;
    paymentMethod: string;
}

const ShippingForm = ({setIsPay, quantity, coffee }: ShippingType) => {
    const [createPayment, { isLoading: isPaymentLoading }] = useCreatePaymentMutation();
    const { data: session } = useSession()

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        firstName: Yup.string(),
        lastName: Yup.string(),
        address: Yup.string().required("Address is required"),
        apartment: Yup.string(),
        city: Yup.string().required("City is required"),
        zipCode: Yup.string().required("Zip Code is required"),
        phone: Yup.string().matches(/^\d+$/, "Invalid phone number"),
        textOffers: Yup.boolean(),
        paymentMethod: Yup.string().required("Payment method is required")
    });

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "overlay") {
            setIsPay(false);
        }
    };

    const handleSubmitFunc = async (values: PaymentValues) => {
        if (!session) {
            toast.error("You must be logged in to make a payment.");
            return;
        }
    
        const paymentData = {
            ...values,
            planName: coffee.title,
            planPrice: coffee.price * quantity,
            userId: session?.user.id
        };
    
        try {
            const result = await createPayment(paymentData).unwrap();
    
            if (result.success) {
                toast.success("Order successful! Please make payment");
                window.location.href = result.data.sessionUrl
                console.log("result", result);
            } else {
                console.log("Payment failed", result);
            }
        } catch (error) {
            console.error("Error processing payment", error);
            toast.error("Payment failed. Please try again.");
        }
    };
    

    return (
        <div
            id="overlay"
            onClick={handleOutsideClick}
            className="p-10 w-full bg-black/50 backdrop-blur-md fixed top-0 bottom-0 flex items-center justify-center z-[200]"
        >
            <div
                className="bg-white w-full md:w-[70%] lg:w-1/2 p-10 rounded-lg flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-center font-semibold text-xl">SHIPPING ADDRESS</h1>

                <Formik
                    initialValues={{
                        email: "",
                        firstName: "",
                        lastName: "",
                        address: "",
                        apartment: "",
                        city: "",
                        zipCode: "",
                        phone: "",
                        textOffers: false,
                        paymentMethod: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmitFunc(values)
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                                <div>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="p-2 border rounded w-full"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <Field type="text" name="firstName" placeholder="First Name" className="p-2 border rounded w-full" />
                                <Field type="text" name="lastName" placeholder="Last Name" className="p-2 border rounded w-full" />

                                <div>
                                    <Field
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        className="p-2 border rounded w-full"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                                </div>

                                <Field type="text" name="apartment" placeholder="Apartment (optional)" className="p-2 border rounded w-full" />

                                <div>
                                    <Field
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        className="p-2 border rounded w-full"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <Field
                                        type="text"
                                        name="zipCode"
                                        placeholder="Zip Code"
                                        className="p-2 border rounded w-full"
                                    />
                                    <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm" />
                                </div>

                                <Field type="tel" name="phone" placeholder="Phone Number" className="p-2 border rounded w-full" />

                                <label className="flex items-center gap-2">
                                    <Field type="checkbox" name="textOffers" className="w-4 h-4" />
                                    Receive text offers
                                </label>
                            </div>

                            {/* Payment Plan Dropdown */}
                            <div>
                                <Field as="select" name="paymentMethod" className="p-2 border rounded w-full">
                                    <option value="">Select Payment Method</option>
                                    <option value="card">Card</option>
                                    <option value="apple-pay">Apple Pay</option>
                                </Field>
                                <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                            >
                            {isPaymentLoading ? "Loading..." : "Continue"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ShippingForm;
