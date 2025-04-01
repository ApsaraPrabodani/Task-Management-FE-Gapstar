import React, { useState, useMemo } from "react";

interface DropdownProps {
    per_page: number;
    total: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    setSelectedFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string | null }>>;
}

const Pagination: React.FC<DropdownProps> = ({ per_page, total, current_page, from, to, last_page, setSelectedFilters }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / per_page); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (e: any, pageNumber: number) => {
        e.preventDefault(); // Prevent default anchor behavior
        setSelectedFilters((previous: any) => ({
            ...previous,
            page: pageNumber
        }));
    };

    return (
        <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
            <div className="text-lg">
                Showing {from} to {to} of {total} entries
            </div>
            <ul className="flex">
                {pageNumbers.map((number) => (
                    <li
                        className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${current_page == number
                            ? "text-blue-600  border-sky-500"
                            : "border-[#E4E4EB] "
                            }`}
                        onClick={(e) => handleClick(e, number)}
                        key={number}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Pagination;
