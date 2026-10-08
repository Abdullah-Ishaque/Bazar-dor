import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import { Suspense } from "react";
import Link from "next/link";

const Navbar = async () => {
    <Suspense>await connection();</Suspense>

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return (
        <div>
            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <Link  href="/">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="shrink-0 rounded-lg bg-green-600 p-1">
                            <Image
                                src="/logo-icon.png"
                                alt="Logo"
                                width={40}
                                height={40}
                            />
                        </div>

                        <div className="flex min-w-0 flex-col text-sm sm:text-base">
                            <p>বাজার দর</p>
                            <p>{date}</p>
                        </div>
                    </div>
                </Link>
                <div className="shrink-0 self-end sm:self-auto">
                    <UserInfo />
                </div>

            </div>
            <div>
                <NavLinks />
            </div>
        </div>
    );
};

export default Navbar;
