import ProductDetails from '@/component/ProductDetails';
import { notFound } from 'next/navigation';
import type { ComponentProps } from 'react';

const ProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {

    const { productId } = await params;

    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const products: ComponentProps<typeof ProductDetails>['product'][] = await res.json();
    const product = products.find((item) => String(item.id) === productId);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <ProductDetails
                product={product}
            />
        </div>
    );
};

export default ProductPage;
