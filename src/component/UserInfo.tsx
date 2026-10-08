"use client"
import { signOut, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const UserInfo = () => {

    const { data: session } = useSession();
    const user = session?.user;
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {user ?
                <div>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-gray-100"
                    >
                        {user.image ?
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            :
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        }

                        <span className="max-w-28 truncate text-sm font-medium text-[#1c2920]">
                            {user.name}
                        </span>

                        <span className="text-xs text-gray-500">
                            {isOpen ? "⌃" : "⌄"}
                        </span>
                    </button>

                    {isOpen &&
                        <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                            <div className="border-b border-gray-100 px-2 pb-3">
                                <p className="truncate text-sm font-semibold text-[#1c2920]">
                                    {user.name}
                                </p>
                                <p className="truncate text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>

                            <Link href="/profile" onClick={() => setIsOpen(false)} className="mt-2 block rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                আমার প্রোফাইল
                            </Link>

                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="w-full cursor-pointer rounded-lg px-2 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                                → সাইন আউট
                            </button>
                        </div>
                    }
                </div>
                :
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                    <Link href="/signIn">
                        <button className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold sm:px-5 sm:py-3 sm:text-base text-[#1c2920] transition hover:bg-gray-100">
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/signUp">
                        <button className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base text-white shadow-md transition hover:bg-green-700">
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default UserInfo;
