"use client";

import { Work_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const workSans = Work_Sans({
    variable: "--font-work-sans",
    subsets: ["latin"]
});

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <div className={`${workSans.className} ${workSans.variable} flex items-center justify-center min-h-screen p-4 relative`}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
                >
                    <source src="/videos/vidvid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden relative z-10">
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10">
                        {children}
                    </div>
                    <div className="hidden md:flex md:w-1/2 bg-black relative items-center justify-center">
                        <svg width="211" height="129" viewBox="0 0 211 129" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0">
                            <path d="M53.4058 -262.633C26.7419 -229.607 9.31402 -190.099 2.89943 -148.14C-3.51517 -106.181 1.31303 -63.2715 16.8916 -23.7871C32.4703 15.6973 58.2419 50.3438 91.5785 76.619C124.915 102.894 164.624 119.858 206.655 125.781C248.686 131.704 291.537 126.373 330.836 110.333C370.135 94.2933 404.477 68.1176 430.36 34.4756C456.243 0.83362 472.741 -39.071 478.171 -81.1689C483.601 -123.267 477.769 -166.052 461.27 -205.16L393.26 -176.468C404.685 -149.388 408.723 -119.762 404.963 -90.6116C401.203 -61.4614 389.78 -33.8298 371.857 -10.5348C353.935 12.7603 330.155 30.8854 302.942 41.9922C275.73 53.0989 246.059 56.7899 216.955 52.6888C187.85 48.5877 160.355 36.8411 137.271 18.6471C114.187 0.453019 96.342 -23.5376 85.5548 -50.8782C74.7675 -78.2188 71.4243 -107.931 75.866 -136.985C80.3077 -166.04 92.3755 -193.396 110.839 -216.265L53.4058 -262.633Z" fill="white" fillOpacity="0.14" />
                        </svg>
                    </div>
                </div>
            </div>
        </SessionProvider>
    );
}