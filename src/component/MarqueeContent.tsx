"use client";
import Link from "next/link";
import MarqueeText from "react-fast-marquee";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

export default function MarqueeContent({
  products,
}: {
  products: Product[];
}) {
  return (
    <MarqueeText
      speed={200}
      gradient={false}
      pauseOnHover
      autoFill
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="mx-3 inline-flex items-center gap-2 whitespace-nowrap text-sm sm:mx-5 sm:text-base lg:text-lg text-gray-800 hover:underline"
        >
          <span>{product.categoryIcon}</span>

          <span>
            {product.nameBn}{" "}
            {product.today.toLocaleString("bn-BD")} টাকা/
            {product.unit === "kg" ? "কেজি" : product.unit}
          </span>

          {product.change.dir !== "same" && (
            <span
              className={`font-bold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          )}
        </Link>
      ))}
    </MarqueeText>
  );
}