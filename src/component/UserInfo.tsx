"use client"
import { useSession } from '@/lib/auth-client';
import { signOut } from 'better-auth/api';
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
                <button type="button" onClick={handleSignOut} className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700">
                    সাইন আউট
                </button>
                :
                <div className="flex items-center justify-center gap-6">
                    <Link href="/signIn">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg px-5 py-3 font-semibold text-[#1c2920] transition hover:bg-gray-100"
                        >
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/signUp">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700"
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