import React from "react";
import {ChevronDown, User} from "lucide-react";
import type {UserPreferences} from "../hooks/useUserPreferences.ts";
import type {Article} from "./ArticleCardComponent.tsx";

interface PreferencesPanelProps {
    articles: Article[];
    preferences: UserPreferences;
    onUpdatePreferences: (type: keyof UserPreferences, value: string) => void;
    isOpen: boolean;
    onToggle: () => void;
}

const PreferencesComponent: React.FC<PreferencesPanelProps> = ({
                                                               articles,
                                                               preferences,
                                                               onUpdatePreferences,
                                                               isOpen,
                                                               onToggle
                                                           }) => {
    const sources = [...new Set(articles.map(article => article.source.name))];
    const categories = [...new Set(articles.map(article => article.category))];
    const authors = [...new Set(articles.map(article => article.author).filter(Boolean))];

    return (
        <div className="bg-white rounded-lg shadow-md mb-6">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
                <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-900">Personalize Your News Feed</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Preferred Sources</h4>
                        <div className="space-y-2">
                            {sources.map(source => (
                                <label key={source} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={preferences.sources.includes(source)}
                                        onChange={() => onUpdatePreferences('sources', source)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{source}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Preferred Categories</h4>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <label key={category} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={preferences.categories.includes(category)}
                                        onChange={() => onUpdatePreferences('categories', category)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Preferred Authors</h4>
                        <div className="space-y-2">
                            {authors.map(author => (
                                <label key={author} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={preferences.authors.includes(author)}
                                        onChange={() => onUpdatePreferences('authors', author)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{author}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreferencesComponent;