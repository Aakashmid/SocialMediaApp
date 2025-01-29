import React from 'react';

const Logo = ({ width = 20, fontSize = "text-xl", bg = "blue", p = 1 }) => {
    const padding = (() => {
        switch (p) {
            case 2:
                return "px-5 py-2";
            default:
                return "px-4 py-1";
        }
    })();

    return (
        <div className={`flex items-center justify-center w-[${width}rem] h-auto`}>
            <div className={`${bg === "blue" ? 'text-white bg-bgPrimary' : 'text-bgPrimary bg-white'} rounded-full ${padding} shadow`}>
                <h2 className={`font-bold ${fontSize} lg:hover:text-gray-500 transition duration-300 ease-in-out`}>Buzzline</h2>
            </div>
        </div>
    );
};

export default Logo;