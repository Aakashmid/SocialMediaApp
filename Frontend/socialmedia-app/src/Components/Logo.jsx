import React from 'react';

const Logo = ({ width = 20, fontSize = "text-xl" }) => {
    return (
        <div className={`w-[${width}rem] h-auto `}>
            <div className="bg-white rounded-full px-2">
                <span className={`text-bgPrimary font-bold ${fontSize} hover:text-gray-500`}>Buzzline</span>
            </div>
        </div>
    );
};

export default Logo;