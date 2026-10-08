import Image from "next/image";
import NavLinks from "./NavLinks";
import { connection } from "next/server";
import { Suspense } from "react";
import { useSession } from "@/lib/auth-client";
import UserInfo from "./UserInfo";

const Navbar = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return (
        <div>
            <div className="relative mx-auto flex max-w-7xl justify-between">
                <div className="flex gap-4 p-2">
                    <div className="rounded-lg bg-green-600 p-1">
                        <Image
                            src="/logo-icon.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    </div>

                    <div className="flex flex-col">
                        <p>বাজার দর</p>
                        <p>{date}</p>
                    </div>
                </div>
                <div className="p-2">
                    <UserInfo/>
                </div>

            </div>
            <div>
                <NavLinks />
            </div>
        </div>
    );
};

export default Navbar;