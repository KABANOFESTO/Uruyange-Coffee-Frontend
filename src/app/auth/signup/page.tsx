"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";

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
                if (
                    error &&
                    typeof error === 'object' &&
                    'response' in error &&
                    (error as { response?: { data?: { message?: string } } }).response
                ) {
                    const err = error as { response?: { data?: { message?: string } } };
                    toast.error(err.response?.data?.message || "Failed to create account");
                } else {
                    toast.error("Failed to create account");
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
                        {signupFormik.touched.email && signupFormik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">{signupFormik.errors.email}</p>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            value={signupFormik.values.password}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                        {signupFormik.touched.password && signupFormik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{signupFormik.errors.password}</p>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            value={signupFormik.values.confirmPassword}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                        {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{signupFormik.errors.confirmPassword}</p>
                        )}
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
                        Already have an account?{" "}
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