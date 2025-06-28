const GUARDIAN_API_BASE = 'https://content.guardianapis.com';

export const fetchGuardianAPIArticles = async (query: string, pageSize: number, page: number) => {
    const response = await fetch(
        `${GUARDIAN_API_BASE}/search?q=${query}&page=${page}&page-size=${pageSize}&api-key=${import.meta.env.VITE_REACT_APP_GUARDIAN_API_KEY}&show-fields=all`
    );

    const data = await response.json();
    console.log("GUARD", data);
    return data.response;
}