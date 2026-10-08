import Link from "next/link";

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
const toBangla = (value: number) =>
    value.toLocaleString("bn-BD");
const ProductGrid = ({ items }: { items: Product[] }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
                <Link href={`/product/${product.id}`} key={product.id} className="block min-w-0 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
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
);



export default ProductGrid;