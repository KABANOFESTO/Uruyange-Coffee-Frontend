"use client";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const SignUp = () => {
    const router = useRouter();

    const signupFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            value={signupFormik.values.password}
                        />
                        {signupFormik.touched.password && signupFormik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{signupFormik.errors.password}</p>
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
