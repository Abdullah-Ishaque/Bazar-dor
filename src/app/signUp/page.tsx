"use client";
import { signIn, signUp } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpPage = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as {
            name: string
            email: string,
            password: string,
            image: string,
        };

        const { data, error } = await signUp.email({
            ...user,
            callbackURL: "/",
        });
        if (data) {
            toast("Signed up");
            redirect("/");
        }

        if (error) {
            toast.error("Couldn't signed up");
        }


    };
    const handleGoogleSingUp = async () => {
        await signIn.social({
            provider: "google",
        });
    }
    const handleGitHubSingUp = async () => {
        await signIn.social({
        provider: "github"
    })
    }
    return (
        <div className="min-h-screen bg-[#f0f5f1] px-4 py-8 sm:px-6 sm:py-12">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl text-[#1c2920]">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
                </p>
            </div>
            <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 sm:p-7">

                <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
                    <TextField isRequired name="name" className="w-full">
                        <Label className="mb-2 block font-medium">
                            নাম
                        </Label>
                        <Input
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
                        />
                        <FieldError className="text-sm text-red-600" />
                    </TextField>
                    <TextField isRequired name="email" type="email" className="w-full">
                        <Label className="mb-2 block font-medium">
                            ইমেইল
                        </Label>
                        <Input
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
                        />
                        <FieldError className="text-sm text-red-600" />
                    </TextField>
                    <TextField isRequired name="password" type="password" minLength={8} className="w-full">
                        <Label className="mb-2 block font-medium">
                            পাসওয়ার্ড
                        </Label>
                        <Input
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
                        />
                        <FieldError className="text-sm text-red-600" />
                    </TextField>
                    <TextField isRequired name="confirmPassword" type="password" className="w-full">
                        <Label className="mb-2 block font-medium">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </Label>
                        <Input
                            placeholder="আবার লিখুন"
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-green-600"
                        />
                        <FieldError className="text-sm text-red-600" />
                    </TextField>
                    <Button
                        type="submit"
                        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white shadow-md hover:bg-green-700"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </Button>

                </Form>
                <div className="my-5 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <Button onClick={handleGoogleSingUp} className="h-auto w-full whitespace-normal rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold sm:text-base">
                        Google দিয়ে চালিয়ে যান
                    </Button>

                    <Button onClick={handleGitHubSingUp} className="h-auto w-full whitespace-normal rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold sm:text-base">
                        GitHub দিয়ে চালিয়ে যান
                    </Button>
                </div>
                <p className="mt-5 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/signIn" className="font-medium text-green-700 hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>

            </div>
            <div className="mt-7 text-center">
                <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-green-700"
                >
                    <FaArrowLeftLong /> হোম পেজে ফিরে যান
                </Link>
            </div>

        </div >
    );
};

export default SignUpPage;