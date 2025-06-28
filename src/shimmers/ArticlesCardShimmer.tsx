import React from "react";

export const ArticlesCardShimmer: React.FC = () => {
    return (<div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="p-6">
            <div className="flex items-center justify-between mb-2">
                <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-5 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-3/5 animate-pulse"></div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
        </div>
    </div>)
}