
import Link from "next/link";
import React from "react";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
}
const toBangla = (value: number) => {
    return value.toLocaleString("bn-BD");
};

const ProductGrid = ({ items }: { items: Product[] }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
                <Link
                    href={`/products/${product.slug}`}
                    key={product.id}
                    className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
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

                    <div className="mt-5 flex items-end justify-between gap-2">
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
);

const Body = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");

    const data = await res.json();

    

    const toBangla = (value: number) =>
        value.toLocaleString("bn-BD");

    const increasedProducts = data.filter(
        (product:Product) => product.change.dir === "up"
    ).sort((a:Product, b:Product) => b.change.pct - a.change.pct).slice(0, 6);;

    const decreasedProducts = data.filter(
        (product:Product) => product.change.dir === "down").sort((a:Product, b:Product) => b.change.pct - a.change.pct).slice(0, 6);;

    return (
        <main className="min-h-screen bg-[#f0f5f1] px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-7xl space-y-10">
                <section>
                    <h2 className="mb-4 text-lg font-bold text-[#1c2920]">
                        <span className="text-red-600">▲</span>{" "}
                        আজ দাম বেড়েছে
                    </h2>

                    <ProductGrid items={increasedProducts} />
                </section>
                <section>
                    <h2 className="mb-4 text-lg font-bold text-[#1c2920]">
                        <span className="text-green-600">▼</span>{" "}
                        আজ দাম কমেছে
                    </h2>

                    <ProductGrid items={decreasedProducts} />
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[#1c2920]">
                        সব পণ্য
                    </h2>

                    <p className="mb-4 mt-1 text-sm text-gray-500">
                        মোট {toBangla(data.length)}টি পণ্য দেখানো হচ্ছে
                    </p>

                    <ProductGrid items={data} />
                </section>

            </div>
        </main>
    );
};

export default Body;
