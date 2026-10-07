
import INavLinkType from '@/Type/INavLinkType';
import React from 'react';

const NavLinks = async () => {

    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data = await res.json();


    return (
        <div className='relative mx-auto max-w-7xl flex gap-8 p-2'>
            {data.map((category: INavLinkType ) => (
                <a
                    key={category.id}
                    href={`${category.slug}`}
                    className="category-tab"
                >
                    <span className="category-icon">{category.icon}</span>
                    <span>{category.nameBn}</span>
                </a>
            ))}
        </div>
    );
};

export default NavLinks;