import CategoryBody from '@/component/Category';
import React from 'react';

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {

    const { categoryId } = await params;



    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`);
    const data = await res.json();


    return (
        <div>
            <CategoryBody
                products={data}
                categoryId={categoryId}
            />
        </div>
    );
};

export default CategoryPage;
