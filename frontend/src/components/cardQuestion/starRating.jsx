import { useState } from "react";

const StarRating = ({ handleStarClick, starSize = 8, initialStarValue = 0, margin = 3, readOnly = false }) => {
    const maxRating = 10;
    // Copy value of initialStarValue to variable x

    const [selectedStar, setSelectedStar] = useState(initialStarValue);

    const onStarClick = (i) => {
        setSelectedStar(i + 1)
    }

    return (
        <div className="flex items-center justify-center">
            {
                Array.from({ length: maxRating }).map((_, i) => (
                    <svg onClick={() => {
                            if (!readOnly) { onStarClick(i); handleStarClick(i + 1) } 
                        }}
                        key={i + 1}
                        className={`w-6 h-6 md:w-${starSize} md:h-${starSize} my-1 lg:m-${margin} lg:h-7 lg:w-7 ms-1 md:ms-2 lg ${readOnly ? "" :"cursor-pointer"} ${selectedStar > i ? 'text-yellow-300' : ""}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20" >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        <text x="49%" y="65%" textAnchor="middle" dominantBaseline="middle" className={`${selectedStar > i ? "text-black" : "text-white "} dark:text-black text-xs md:text-md`} >{i + 1}</text>
                    </svg>
                ))
            }
        </div>
    )
}

export default StarRating