// import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import NewsAggregator from "./NewsAggregator.tsx";
import './index.css';

createRoot(document.getElementById('root')!).render(
    <NewsAggregator/>,
)
