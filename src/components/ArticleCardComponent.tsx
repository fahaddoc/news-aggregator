import React from "react";
import {Clock, ExternalLink, Star} from "lucide-react";

export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    author: string;
    category: string;
}

export interface Sources {
    category: string
    country: string
    description: string
    id: string,
    language: string,
    name: string,
    url: string,
}

interface ArticleCardProps {
    article: Article;
    isPreferred: boolean;
}

const ArticleCardComponent: React.FC<ArticleCardProps> = ({article, isPreferred}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isPreferred ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="relative">
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400';
                    }}
                />
                {isPreferred && (
                    <div className="absolute top-2 right-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current"/>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {article.category}
          </span>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1"/>
                        {formatDate(article.publishedAt)}
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-sm">
                            <p className="text-gray-900 font-medium">{article.source.name}</p>
                            {article.author && (
                                <p className="text-gray-600">by {article.author}</p>
                            )}
                        </div>
                    </div>

                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                    >
                        Read More
                        <ExternalLink className="ml-1 h-4 w-4"/>
                    </a>
                </div>
            </div>
        </article>
    );
};

export default ArticleCardComponent;