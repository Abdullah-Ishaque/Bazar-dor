
import INavLinkType from '@/Type/INavLinkType';
import Link from 'next/link';
import React from 'react';

const NavLinks = async () => {

    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
    if (!res.ok) {
        return <p>Categories are temporarily unavailable.</p>;
    }
    const data = await res.json();


    return (
        <div className='relative mx-auto flex w-full max-w-7xl gap-3 overflow-x-auto px-4 py-2 sm:gap-5 sm:px-6 lg:gap-8'>
            {data.map((category: INavLinkType) => (
                <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="category-tab flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-2 py-2 text-sm sm:text-base"
                >
                    <span className="category-icon">{category.icon}</span>
                    <span>{category.nameBn}</span>
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;
