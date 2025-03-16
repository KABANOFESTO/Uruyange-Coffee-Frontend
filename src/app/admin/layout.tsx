"use client";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/admincomp/Navbar";
// import SideBar from "@/components/reusable/SideBar";
import AdminSideBar from "@/components/admincomp/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await getSession();
                
                if (session) {
                    setIsAuth(true);
                    setUserProfile(session);
                } else {
                    setIsAuth(false);
                    router.replace("/auth");
                }
            } catch (error) {
                console.error("Error checking session:", error);
                setIsAuth(false);
                router.replace("/auth");
            }
        };

        checkSession();
    }, [router]);

    if (isAuth === null) {
        return <div className="w-full flex h-full"></div>;
    }

    if (isAuth && userProfile?.user.role === "admin") {
        return (
            <div className="flex flex-row w-full min-h-screen bg-[#F9FAFB]">
                <AdminSideBar />
                <div className="flex flex-col ml-auto w-full lg:w-[78%]">
                    <Navbar />
                    {children}
                </div>
            </div>
        );
    }
    return null;
}