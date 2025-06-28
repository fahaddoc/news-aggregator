const NYT_API_BASE = 'https://api.nytimes.com/svc/search/v2';

export const fetchNYTArticles = async (query: string, page: number)=>{
    const response = await fetch(
        `${NYT_API_BASE}/articlesearch.json?q=${query}&page=${page}&api-key=${import.meta.env.VITE_REACT_APP_NYT_API_KEY}`
    );

    const data = response.json();
    return data.then((results)=>{
        return results
    })
}