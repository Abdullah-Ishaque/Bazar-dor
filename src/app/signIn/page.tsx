
"use client";

import Link from "next/link";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const SingInPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };
        const { data, error } = await signIn.email({
            ...user,
        });
        if (data) {
            toast("Signed in");
            redirect("/");
        }

        if (error) {
            toast.error("Couldn't signed in");
        }
    };


    return (
        <div className="min-h-screen bg-[#f0f5f1] px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-[#1c2920]">
                    সাইন ইন
                </h1>

                <p className="mt-2 text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>
            <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">

                <Form
                    onSubmit={onSubmit}
                    className="flex w-full flex-col gap-5"
                >
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                    >
                        <Label className="mb-2 block font-medium">
                            ইমেইল
                        </Label>

                        <Input
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
                        />

                        <FieldError className="text-sm text-red-600" />
                    </TextField>
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        className="w-full"
                    >
                        <Label className="mb-2 block font-medium">
                            পাসওয়ার্ড
                        </Label>

                        <Input
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
                        />

                        <FieldError className="text-sm text-red-600" />
                    </TextField>
                    <Button
                        type="submit"
                        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white shadow-md hover:bg-green-700"
                    >
                        সাইন ইন
                    </Button>

                </Form>
                <div className="my-5 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">
                        অথবা
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button
                        className="w-full rounded-lg border border-gray-200 py-3 font-semibold"
                    >
                        Google দিয়ে চালিয়ে যান
                    </Button>

                    <Button
                        className="w-full rounded-lg border border-gray-200 py-3 font-semibold"
                    >
                        GitHub দিয়ে চালিয়ে যান
                    </Button>
                </div>
                <p className="mt-5 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/signUp" className="font-medium text-green-700 hover:underline">
                        সাইন আপ করুন
                    </Link>
                </p>

            </div>
            <div className="mt-7 text-center">
                <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>

        </div>
    );
};

export default SingInPage;
