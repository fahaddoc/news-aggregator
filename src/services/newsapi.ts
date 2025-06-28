const NEWS_API_BASE = 'https://newsapi.org/v2';

export const fetchNewsAPIArticles = async (query: string, pageSize: number, page: number) => {
    const response = await fetch(
        `${NEWS_API_BASE}/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${import.meta.env.VITE_REACT_APP_NEWS_API_KEY}`
    );
    const data = response.json();
    console.log("data =>", data);
    return data

}

export const fetchNewsAPISource = async () => {
    const response = await fetch(
        `${NEWS_API_BASE}/sources?apiKey=${import.meta.env.VITE_REACT_APP_NEWS_API_KEY}`
    );

    const data = response.json();
    return data;
}