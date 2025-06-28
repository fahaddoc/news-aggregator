import {Filter} from "lucide-react";
import React from "react";
import type {Article} from "./ArticleCardComponent.tsx";

type Props = {
    articles: Article[];
    categories: string[];
    selectedSource: string;
    selectedCategory: string;
    selectedDateRange: string;
    onSourceChange: (source: string) => void;
    onCategoryChange: (category: string) => void;
    onDateRangeChange: (range: string) => void;
}

const FilterComponent: React.FC<Props> = ({
                                              articles,
                                              categories,
                                              selectedSource,
                                              selectedCategory,
                                              selectedDateRange,
                                              onSourceChange,
                                              onCategoryChange,
                                              onDateRangeChange
                                          }) => {
    const sources = [...new Set(articles.map(article => article.source.name))];
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500"/>
                <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <select
                value={selectedSource}
                onChange={(e) => onSourceChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option value="">All Sources</option>
                {sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                ))}
            </select>

            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {[...new Set([...categories,...articles.map((article)=> article.category !== '' ? article.category : '')])].map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <select
                value={selectedDateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
            </select>
        </div>
    );
}
export default FilterComponent;