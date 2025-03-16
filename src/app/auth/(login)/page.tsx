"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignIn = () => {
    const router = useRouter();
    const { data: sessionData } = useSession();

    useEffect(() => {
        getSession();
    }, []);

    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                toast.error("Invalid credentials");
            } else {
                const session = await getSession();
                if (session?.user) {
                    window.location.href = session.user.role === "admin" ? "/admin" : "/";
                }
            }
            setSubmitting(false);
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-yellow-600">Welcome Back</h1>
                    <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
                </div>
                <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.email}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg p-2 transition-all duration-300"
                        disabled={loginFormik.isSubmitting}
                    >
                        {loginFormik.isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <div className="text-center">
                    <span className="text-sm text-gray-600">
                        don't have an Account?{" "}
                        <Link href="/auth/signup" className="text-black font-medium hover:underline">
                            Sign Up
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;