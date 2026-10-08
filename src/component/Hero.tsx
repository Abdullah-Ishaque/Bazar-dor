import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
            <div className="mx-auto flex min-h-70 w-full items-center justify-between gap-5 rounded-3xl border border-gray-200 bg-white px-4 py-6 sm:gap-8 sm:px-8 sm:py-7 md:px-10 lg:px-14">

                <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        মঙ্গলবার, ৬ অক্টোবর, ২০২৬
                    </span>
                    <h1 className="mt-4 text-2xl leading-snug font-bold text-[#17251d] sm:text-3xl lg:text-[40px]">
                        আজকের বাজারের দাম এক নজরে
                    </h1>


                    <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
                        পরিবর্তন এক জায়গায়।
                    </p>


                    <button className="mt-7 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow hover:bg-green-700 sm:w-auto">
                        সব পণ্য দেখুন
                    </button>
                </div>
                <div className="hidden shrink-0 md:block">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের পণ্য"
                        width={200}
                        height={200}
                        className="h-auto w-40 lg:w-65"
                    />
                </div>

            </div>
        </div>

    );
};

export default Hero;
