"use client"
import { signOut, useSession } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const UserInfo = () => {

    const { data: session } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div>
            {user ?
                <button type="button" onClick={handleSignOut} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base text-white shadow-md transition hover:bg-green-700">
                    সাইন আউট
                </button>
                :
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                    <Link href="/signIn">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold sm:px-5 sm:py-3 sm:text-base text-[#1c2920] transition hover:bg-gray-100"
                        >
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/signUp">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base text-white shadow-md transition hover:bg-green-700"
                        >
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            }
        </div >
    );
};

export default UserInfo;