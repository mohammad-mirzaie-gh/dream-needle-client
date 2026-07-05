import React from 'react'
interface Category {
    _id: string;
    title: string;
    category_parent: string | null;
    children?: Category[];
}

const CategoryTree: React.FC<{ categories: Category[], setCategory?: (data: string) => void }> = ({ categories, setCategory }) => {
    return (
        <ul className="tree pl-5 list-none">
            {categories.map((category) => (
                <li
                    onClick={(e) => {
                        e.stopPropagation()
                        if (setCategory) {
                            setCategory(category._id)
                        }
                    }}
                    key={category._id}
                    className={`relative p-2 text-lg cursor-pointer ${!category.category_parent ? "mt-12 font-bold text-colorTheme font-lalezarFont text-xl" : "ml-4 text-textColorTheme font-[] text-base z-"}`}
                >
                    {category.title}
                    {category.children && category.children.length > 0 && (
                        <CategoryTree categories={category.children} setCategory={setCategory}/>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default CategoryTree