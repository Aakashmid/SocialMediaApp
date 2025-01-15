import React from 'react';

const Logo = ({ width = "200px" }) => {
    return (
        <div className={`w-${width} h-auto `}>
            <div className="bg-white rounded-full px-2">
                <span className="text-bgPrimary font-bold text-xl hover:text-gray-700">Buzzline</span>
            </div>
        </div>
    );
};

export default Logo;