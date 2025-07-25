import {Globe} from "lucide-react";
import React from "react";

const HeaderComponent: React.FC = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                    <Globe className="h-8 w-8 text-blue-600 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-900">NewsHub</h1>
                </div>
            </div>
        </div>
    </header>
);

export default HeaderComponent;