import MarqueeContent from "./MarqueeContent";

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products?category=chal"
  );

  const data = await res.json();

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl py-3">
        <MarqueeContent products={products} />
      </div>
    </div>
  );
};

export default Marquee;