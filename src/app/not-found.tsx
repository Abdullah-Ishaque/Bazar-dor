
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const NotFound = () => {
    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-[#f0f5f1] px-4 py-12">
            <div className="w-full max-w-lg text-center">

                <div className="mb-5 text-8xl font-extrabold tracking-tight text-green-600 sm:text-9xl">
                    ৪০৪
                </div>

                <div className="mb-6 text-6xl">
                    🛒
                </div>

                <h1 className="mb-3 text-2xl font-bold text-[#1c2920] sm:text-3xl">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h1>

                <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                    দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
                    অথবা আপনি ভুল ঠিকানায় এসেছেন।
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
                    >
                        <FaArrowLeftLong />
                        হোম পেজে ফিরে যান
                    </Link>

                    <Link
                        href="/category/chal"
                        className="rounded-lg border border-green-600 bg-white px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                    >
                        বাজারের দাম দেখুন
                    </Link>
                </div>

                <p className="mt-10 text-xs text-gray-400">
                    Error 404 — Page Not Found
                </p>

            </div>
        </main>
    );
};

export default NotFound;
