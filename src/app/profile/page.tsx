"use client"
import { signOut, useSession } from '@/lib/auth-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Profile = () => {

    const { data: session, isPending } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
        router.refresh();
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) return;

        setIsUpdating(true);
        setMessage("");

        try {
            const { authClient } = await import('@/lib/auth-client');

            const { error } = await authClient.updateUser({
                name: name.trim()
            });

            if (error) {
                setMessage(error.message || "আপডেট করা যায়নি");
            } else {
                setMessage("নাম সফলভাবে আপডেট হয়েছে");
                setName("");
                router.refresh();
            }
        } catch {
            setMessage("কিছু সমস্যা হয়েছে");
        }

        setIsUpdating(false);
    };

    if (isPending) return null;

    if (!user) {
        return (
            <main className="min-h-screen bg-[#f0f5f1] px-4 py-12 text-center">
                <p className="text-gray-600">
                    প্রোফাইল দেখতে সাইন ইন করুন।
                </p>
                <button
                    onClick={() => router.push("/signIn")}
                    className="mt-4 cursor-pointer rounded-lg bg-green-600 px-6 py-3 font-semibold text-white"
                >
                    সাইন ইন
                </button>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f0f5f1] px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-3xl">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1c2920]">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    <div className="flex items-center gap-4">
                        {user.image ?
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="h-16 w-16 rounded-xl object-cover"
                            />
                            :
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-700">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        }

                        <div className="min-w-0">
                            <h2 className="truncate text-lg font-bold text-[#1c2920]">
                                {user.name}
                            </h2>
                            <p className="break-all text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                        ↩ সাইন আউট
                    </button>
                </div>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">

                    <h2 className="mb-7 text-lg font-bold text-[#1c2920]">
                        তথ্য
                    </h2>

                    <form
                        onSubmit={handleUpdate}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-[#1c2920]"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={user.name}
                                required
                                className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:opacity-50"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>

                        {message &&
                            <p className="text-center text-sm text-green-700">
                                {message}
                            </p>
                        }
                    </form>
                </div>

            </div>
        </main>
    );
};

export default Profile;