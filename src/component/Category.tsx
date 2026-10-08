"use client";
import Link from "next/link";
import { useState } from "react";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    image: string;
    categoryIcon: string;
    categoryNameBn: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
}

interface CategoryBodyProps {
    products: Product[];
    categoryId: string;
}

const toBangla = (value: number) =>
    value.toLocaleString("bn-BD");

export default function CategoryBody({
    products,
    categoryId,
}: CategoryBodyProps) {
    const [sortBy, setSortBy] = useState("featured");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "price-low") {
            return a.today - b.today;
        }
        else if (sortBy === "price-high") {
            return b.today - a.today;
        }
        else
            return 0;
    }
  );



return (
    <div className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 rounded-2xl sm:gap-4 border border-gray-200 bg-white p-4 sm:p-6">
                <span className="shrink-0 text-3xl sm:text-4xl">
                    {products[0]?.categoryIcon}
                </span>

                <div className="min-w-0 break-words">
                    <h1 className="text-xl font-bold sm:text-2xl text-[#1c2920]">
                        {products[0]?.categoryNameBn}
                    </h1>

                    <p className="text-sm text-gray-500">
                        {toBangla(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:justify-end rounded-2xl border border-gray-200 bg-white px-4 py-4 sm:px-5">
                <label
                    htmlFor="sort-products"
                    className="text-sm text-gray-500"
                >
                    সাজান
                </label>

                <select
                    id="sort-products"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="min-w-0 max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-600"
                >
                    <option value="featured">ডিফল্ট</option>
                    <option value="price-low">কম থেকে বেশি</option>
                    <option value="price-high">বেশি থেকে কম</option>
                </select>
            </div>
            <p className="my-4 text-sm text-gray-500">
                মোট {toBangla(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => {
                    const isUp = product.change.dir === "up";
                    const isDown = product.change.dir === "down";

                    return (
                        <Link
                            href={`/products/${product.slug}`}
                            key={product.id}
                            className="block min-w-0 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f1] text-2xl">
                                    {product.image || product.categoryIcon}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-bold text-[#1c2920] sm:text-base">
                                        {product.nameBn}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap items-end justify-between gap-2">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        আজকের দাম
                                    </p>

                                    <p className="text-lg font-bold text-[#1c2920]">
                                        {toBangla(product.today)} টাকা
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isUp
                                            ? "bg-red-50 text-red-600"
                                            : isDown
                                                ? "bg-green-50 text-green-600"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                                    {toBangla(product.change.pct)}%
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {products.length === 0 && (
                <p className="py-10 text-center text-gray-500">
                    কোনো পণ্য পাওয়া যায়নি।
                </p>
            )}

        </div>
    </div>
);
}
