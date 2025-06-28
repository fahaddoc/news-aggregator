import {useEffect, useMemo, useState} from "react";
import {fetchNewsAPIArticles, fetchNewsAPISource} from "../services/newsapi.ts";
import type {Article, Sources} from "../components/ArticleCardComponent.tsx";
import {fetchGuardianAPIArticles} from "../services/guardianapi.ts";
import {transformGuardianData, transformNYArticlesData} from "../utils/helpers.ts";
import {fetchNYTArticles} from "../services/nytapi.ts";
import {mockArticles, mockSources} from "../utils/mockes_data.ts";


export interface UserPreferences {
    sources: string[];
    categories: string[];
    authors: string[];
}

export interface Pagination {
    query: string,
    page: number,
    pageSize: number,
}

export const useUserPreferences = () => {
    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [sources, setSources] = useState<Sources[]>(mockSources);
    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState<UserPreferences>({
        sources: [],
        categories: [],
        authors: []
    });
    const [pagination, setPagination] = useState<Pagination>({
        query: 'the',
        page: 1,
        pageSize: 10,
    });


    useEffect(() => {
        const fetchCall = async () => {
            const sourcesResponse = await fetchNewsAPISource();
            await updateFetchArticleQuery(pagination.query, pagination.pageSize, pagination.page);
            if (sourcesResponse.status === "ok") {
                setIsLoading(false);
                const uniqueCategories: string[] = Array.from(new Set(sourcesResponse.sources.map((source: { category: string; }) => source.category)));
                setPreferences(prevState => ({
                    ...prevState,
                    sources: sourcesResponse.sources,
                    categories: uniqueCategories
                }));
                setSources(sourcesResponse.sources);
            }
        }
        fetchCall();
    }, [pagination]);

    useMemo(() => {
        if (!articles || !sources) return [];
        return articles.map((article) => {
            return sources.map((source) => {
                if (source.id == article.source.id) {
                    article.category = source.category;
                    return articles;
                }
            })
        });
    }, [articles, sources]);

    const updateFetchArticleQuery = async (
        query: string,
        pageSize: number,
        page: number
    ) => {
        setIsLoading(true);
        setArticles([]);
        const newsApiResponse = await fetchNewsAPIArticles(query, pageSize, page);
        const guardianArticlesResponse = await fetchGuardianAPIArticles(query, pageSize, page);
        const nyArticlesResponse = await fetchNYTArticles(query, page);

        if (newsApiResponse.status === "ok") {
            setIsLoading(false);
            setArticles(prevArticles => {
                if (prevArticles && prevArticles.length > 0) {
                    return [...prevArticles, ...newsApiResponse.articles];
                } else {
                    return newsApiResponse.articles;
                }
            });
        }

        if (guardianArticlesResponse.status === 'ok') {
            setIsLoading(false);
            const guardianTransformedResponse = transformGuardianData(guardianArticlesResponse);
            console.log("newsApiResponse", guardianArticlesResponse)
            setArticles(prevArticles => {
                if (prevArticles && prevArticles.length > 0) {
                    return [...prevArticles, ...guardianTransformedResponse];
                } else {
                    return guardianTransformedResponse;
                }
            });
        }

        if (nyArticlesResponse.status === "OK") {
            setIsLoading(false);
            const nyArticlesTransformedResponse = transformNYArticlesData(nyArticlesResponse);
            setArticles(prevArticles => {
                if (prevArticles && prevArticles.length > 0) {
                    return [...prevArticles, ...nyArticlesTransformedResponse];
                } else {
                    return nyArticlesTransformedResponse;
                }
            });
        }
        setIsLoading(false);
    };

    const onPageChange = async (page: number) => {
        await updateFetchArticleQuery(pagination.query, pagination.pageSize, page);
        setPagination(prevState => ({
            ...prevState,
            page: page,
        }));
    }

    const updatePreferences = (type: keyof UserPreferences, value: string) => {
        setPreferences(prev => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter(item => item !== value)
                : [...prev[type], value]
        }));
    };

    return {isLoading, articles, preferences, pagination, updatePreferences, updateFetchArticleQuery, onPageChange};
};