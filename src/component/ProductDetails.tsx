"use client"
import Link from "next/link";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    image: string;
    unit: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
    markets: Market[];
}

const toBangla = (value: number) =>
    value.toLocaleString("bn-BD");

const ProductDetails = ({ product }: { product: Product }) => {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const lowestPrice = Math.min(
        ...product.markets.map((market) => market.min)
    );

    const highestPrice = Math.max(
        ...product.markets.map((market) => market.max)
    );

    const unitName = product.unit === "kg" ? "কেজি" : product.unit;

    return (
        <main className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>
                    <span>›</span>
                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-green-700"
                    >
                        {product.categoryNameBn}
                    </Link>
                    <span>›</span>
                    <span className="min-w-0 break-words">{product.nameBn}</span>
                </div>
                <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between sm:p-6">

                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <div className="flex h-12 w-12 shrink-0 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-[#f1f5f1] text-4xl">
                            {product.image || product.categoryIcon}
                        </div>

                        <div className="min-w-0 break-words">
                            <h1 className="text-xl font-bold sm:text-2xl text-[#1c2920]">
                                {product.nameBn}
                            </h1>

                            <p className="text-sm text-gray-500">
                                প্রতি {unitName} · {product.categoryNameBn}
                            </p>

                            <p className="mt-2 text-sm text-gray-600">
                                গতকালের তুলনায় আজ দাম{" "}
                                {isUp
                                    ? "বেড়েছে"
                                    : isDown
                                        ? "কমেছে"
                                        : "অপরিবর্তিত রয়েছে"}
                                {isUp || isDown
                                    ? ` · ${toBangla(Math.abs(product.today - product.yesterday))} টাকা`
                                    : ""}
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 rounded-xl bg-[#f1f5f1] px-5 py-4 text-center">
                        <p className="text-xs text-gray-500">
                            আজকের দাম
                        </p>

                        <p className="text-3xl font-bold text-[#1c2920]">
                            {toBangla(product.today)}
                        </p>

                        <p className="text-xs text-gray-500">
                            টাকা / {unitName}
                        </p>

                        <p
                            className={`mt-1 text-sm font-semibold ${isUp
                                    ? "text-red-600"
                                    : isDown
                                        ? "text-green-600"
                                        : "text-gray-600"
                                }`}
                        >
                            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                            {toBangla(product.change.pct)}%
                        </p>
                    </div>
                </section>
                <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">

                    <h2 className="mb-4 text-lg font-bold text-[#1c2920]">
                        দামের সারসংক্ষেপ
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">
                                সর্বনিম্ন দাম
                            </p>

                            <p className="text-xl font-bold text-green-600">
                                {toBangla(lowestPrice)} টাকা
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                সবগুলো বাজারের মধ্যে
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">
                                সর্বোচ্চ দাম
                            </p>

                            <p className="text-xl font-bold text-red-600">
                                {toBangla(highestPrice)} টাকা
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                সবগুলো বাজারের মধ্যে
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">
                                গড় দাম
                            </p>

                            <p className="text-xl font-bold text-green-600">
                                {toBangla(product.today)} টাকা
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                প্রতি {unitName} এর হিসেবে
                            </p>
                        </div>

                    </div>
                    <h2 className="mb-4 mt-7 text-lg font-bold text-[#1c2920]">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="max-w-full overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full min-w-150 border-collapse text-left text-sm">

                            <thead className="bg-white text-gray-600">
                                <tr>
                                    <th className="px-4 py-3 font-medium">বাজার</th>
                                    <th className="px-4 py-3 font-medium">বিভাগ</th>
                                    <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                                    <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>
                                    <th className="px-4 py-3 text-right font-medium">গড়</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.markets.map((market, index) => {
                                    const averagePrice =
                                        (market.min + market.max) / 2;

                                    return (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className={`border-t border-gray-200 ${index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-[#f0f5f1]"
                                                }`}
                                        >
                                            <td className="px-4 py-3">
                                                {market.market}
                                            </td>

                                            <td className="px-4 py-3">
                                                {market.division}
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                {toBangla(market.min)} টাকা
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                {toBangla(market.max)} টাকা
                                            </td>

                                            <td className="px-4 py-3 text-right font-semibold">
                                                {toBangla(averagePrice)} টাকা
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default ProductDetails;
