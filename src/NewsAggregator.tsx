import React, {useEffect, useMemo, useState} from "react";
import {useUserPreferences} from "./hooks/useUserPreferences.ts";
import HeaderComponent from "./components/HeaderComponent.tsx";
import SearchComponent from "./components/SearchComponent.tsx";
import FilterComponent from "./components/FilterComponent.tsx";
import PreferencesComponent from "./components/PreferencesComponent.tsx";
import ArticleCardComponent, {type Article} from "./components/ArticleCardComponent.tsx";
import PaginationComponent from "./components/PaginationComponent.tsx";
import {ArticlesCardShimmer} from "./shimmers/ArticlesCardShimmer.tsx";

const NewsAggregator: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [preferencesOpen, setPreferencesOpen] = useState(false);

    const {isLoading, articles, preferences, pagination, updatePreferences, updateFetchArticleQuery, onPageChange} = useUserPreferences();

    useEffect(() => {
        if (selectedCategory != '') {
            updateFetchArticleQuery(selectedCategory, pagination.pageSize, pagination.page);
        }
        if (selectedSource != '') {
            updateFetchArticleQuery(selectedSource, pagination.pageSize, pagination.page);
        }
    }, [selectedCategory, selectedSource, pagination])


    // Filter articles based on search and filters
    const filteredArticles = useMemo(() => {
        if (articles == undefined) return null;
        return articles.filter(article => {
            const matchesSearch = searchTerm === '' ||
                article.title.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSource = selectedSource === '' || article.source.name === selectedSource;
            const matchesCategory = selectedCategory === '' || article.category === selectedCategory;

            let matchesDate = true;
            if (selectedDateRange) {
                const articleDate = new Date(article.publishedAt);
                const now = new Date();

                switch (selectedDateRange) {
                    case 'today':
                        matchesDate = articleDate.toDateString() === now.toDateString();
                        break;
                    case 'week': {
                        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        matchesDate = articleDate >= weekAgo;
                        break;
                    }
                    case 'month': {
                        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                        matchesDate = articleDate >= monthAgo;
                        break;
                    }
                }
            }

            return matchesSearch && matchesSource && matchesCategory && matchesDate;
        });

    }, [articles, searchTerm, selectedSource, selectedCategory, selectedDateRange]);

    // Sort articles by preference
    const sortedArticles = useMemo(() => {
        if (filteredArticles == null) return [];
        return [...filteredArticles].sort((a, b) => {
            const aIsPreferred = preferences.sources.includes(a.source.name) ||
                preferences.categories.includes(a.category) ||
                preferences.authors.includes(a.author);
            const bIsPreferred = preferences.sources.includes(b.source.name) ||
                preferences.categories.includes(b.category) ||
                preferences.authors.includes(b.author);

            if (aIsPreferred && !bIsPreferred) return -1;
            if (!aIsPreferred && bIsPreferred) return 1;

            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
    }, [filteredArticles, preferences]);

    const isArticlePreferred = (article: Article) => {
        return preferences.sources.includes(article.source.name) ||
            preferences.categories.includes(article.category) ||
            preferences.authors.includes(article.author);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderComponent/>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and FilterComponent */}
                <div className="mb-8 space-y-4">
                    <SearchComponent
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                    <FilterComponent
                        articles={articles ?? []}
                        categories={preferences.categories}
                        selectedSource={selectedSource}
                        selectedCategory={selectedCategory}
                        selectedDateRange={selectedDateRange}
                        onSourceChange={setSelectedSource}
                        onCategoryChange={setSelectedCategory}
                        onDateRangeChange={setSelectedDateRange}
                    />
                </div>

                {/* Preferences Panel */}
                <PreferencesComponent
                    articles={articles ?? []}
                    preferences={preferences}
                    onUpdatePreferences={updatePreferences}
                    isOpen={preferencesOpen}
                    onToggle={() => setPreferencesOpen(!preferencesOpen)}
                />

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {sortedArticles.length} article{sortedArticles.length !== 1 ? 's' : ''}
                        {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {isLoading ?
                        Array.from({length: 10}).map((_, i) => (
                            <ArticlesCardShimmer key={i}/>
                        ))
                        :
                        sortedArticles.map(article => (
                            <ArticleCardComponent
                                key={article.id}
                                article={article}
                                isPreferred={isArticlePreferred(article)}
                            />
                        ))}
                </div>

                {sortedArticles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or filters.</p>
                    </div>
                )}
            </main>

            <div className="px-6 py-6">
                <PaginationComponent
                    currentPage={pagination.page}
                    itemsPerPage={pagination.pageSize}
                    totalPages={pagination.pageSize}
                    totalItems={articles!.length}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default NewsAggregator;