"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const signupFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), undefined], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
                    {
                        email: values.email,
                        password: values.password,
                    }
                );

                if (response.data.success) {
                    toast.success("Account created successfully");
                    resetForm();
                    router.push("/auth");
                } else {
                    toast.error(response.data.message || "Signup failed");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    // Check if error has a response property (common in Axios errors)
                    const axiosError = error as { response?: { data?: { message?: string } } };
                    const errorMessage = axiosError.response?.data?.message || error.message || "Failed to create account";
                    toast.error(errorMessage);
                } else {
                    toast.error("An unexpected error occurred");
                }
            }

            setSubmitting(false);
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-yellow-600">Create Account</h1>
                </div>
                <div className="logo flex justify-center">
                    <Link href="/">
                        <Image
                            src="/images/home.avif"
                            alt="Coffee Shop"
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-full cursor-pointer hover:scale-105 transition-transform"
                        />
                    </Link>
                </div>
                <div className="text-center">
                    <p className="text-gray-600 text-sm">Sign up to get started</p>
                </div>
                <form onSubmit={signupFormik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            value={signupFormik.values.email}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 text-sm rounded-lg p-2 pr-10 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                value={signupFormik.values.password}
                            />
                            <span
                                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="w-full border border-gray-300 text-sm rounded-lg p-2 pr-10 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                value={signupFormik.values.confirmPassword}
                            />
                            <span
                                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg p-2 transition-all duration-300"
                        disabled={signupFormik.isSubmitting}
                    >
                        {signupFormik.isSubmitting ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>
                <div className="text-center">
                    <span className="text-sm text-gray-600">
                        Already have an account? {" "}
                        <Link href="/auth" className="text-black font-medium hover:underline">
                            Sign in
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
