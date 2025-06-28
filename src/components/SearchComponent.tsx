import React from "react";
import {Search} from "lucide-react";

interface SearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => (
    <div className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search articles..."
        />
    </div>
);

export default SearchComponent;