

import ProductGrid from "./ProductGrid";

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

const Body = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

    if (!res.ok) {
    return <p>Categories are temporarily unavailable.</p>;
}
    const data = await res.json();

    

    const toBangla = (value: number) =>
        value.toLocaleString("bn-BD");

    const increasedProducts = data.filter(
        (product:Product) => product.change.dir === "up"
    ).sort((a:Product, b:Product) => b.change.pct - a.change.pct).slice(0, 6);;

    const decreasedProducts = data.filter(
        (product:Product) => product.change.dir === "down").sort((a:Product, b:Product) => b.change.pct - a.change.pct).slice(0, 6);;

    return (
        <div className="min-h-screen bg-[#f0f5f1] px-4 py-8 sm:px-6">
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
        </div>
    );
};

export default Body;
