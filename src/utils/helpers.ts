import type {Article} from "../components/ArticleCardComponent.tsx";

export function transformGuardianData(guardianResponse: any): Article[] {
    return guardianResponse.results.map((item: any) => ({
        id: item.id,
        title: item.webTitle,
        description: item.fields.bodyText,
        content: item.fields.bodyText,
        url: item.fields.thumbnail,
        urlToImage: item.fields.thumbnail,
        publishedAt: item.webPublicationDate,
        source: {
            id: item.pillarId,
            name: item.pillarName,
        },
        author: item.fields.byline,
        category: item.sectionId,
    }));
}

export function transformNYArticlesData(nyResponse: any): Article[] {
    return nyResponse.response.docs.map((item: any) => ({
        id: item._id || "",
        title: item.headline?.main || "",
        description: item.abstract || item.snippet || "",
        content: item.abstract || item.snippet || "",
        url: item.web_url || "",
        urlToImage: item.multimedia?.default?.url || "",
        publishedAt: item.pub_date || "",
        source: {
            id: "",
            name: "The New York Times",
        },
        author: item.byline?.original || "",
        category: item.section_name || "",
    }));
}