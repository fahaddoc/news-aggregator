# 📚 News Aggregator App

![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5.x-purple?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🚀 Overview

**News Aggregator App** is a powerful web application built with **React + TypeScript + Vite**. It aggregates and displays news articles seamlessly from multiple major APIs:

- **NewsAPI.org**
- **The Guardian Open Platform**
- **The New York Times API**

This app fetches data from different sources, merges it into a unified feed, and offers filters, pagination, and a pleasant user experience with shimmer loading placeholders.

---

## ✨ Features

- ✅ Fetch articles from multiple APIs
- ✅ Shimmer loading UI for better UX while loading data
- ✅ Category filters to refine news results
- ✅ Pagination to browse large datasets
- ✅ Merges data from multiple APIs into a single unified feed
- ✅ Built with Docker for easy deployment
- ✅ TypeScript used throughout for type safety and robust architecture

---

## 🛠️ How This Project Was Built

This application has been crafted through a series of iterative improvements and problem-solving sessions:

- **State Management:** Carefully designed with React hooks like `useState`, `useEffect`, and `useMemo` for managing asynchronous data and UI state.
- **Merging Data:** Custom logic merges articles from multiple APIs, ensuring a unified list without duplicates.
- **Type Safety:** All APIs and data transformations are strongly typed using TypeScript interfaces like `Article` and `Sources`.
- **Filtering and Transformation:** Data from APIs is transformed into a common `Article` structure, with helpers like `transformGuardianData` and `transformNYArticlesData`.
- **Loading UI:** Implemented shimmer loading cards (`ArticlesCardShimmer`) which display while waiting for API responses.
- **Pagination:** APIs are called with `page` and `pageSize` parameters. Handlers update pagination state and trigger new API requests.
- **Docker Support:** The project includes a Dockerfile so the entire app can be containerized and deployed easily.
- **Refactoring and Debugging:** This project evolved through extensive troubleshooting—e.g. fixing ES module errors in PostCSS configs, handling rate limits in NewsAPI, and aligning disparate API response formats. Each challenge was debugged step-by-step with context and solutions documented.
- **Code Principles Followed:** I have applied key software design principles to keep the codebase clean and maintainable. The project follows the **SOLID principles** to ensure each module has a single responsibility and is easy to extend without modifying existing code. I’ve also adhered to **KISS (Keep It Simple, Stupid)** to avoid over-complicating logic, and used the **DRY (Don't Repeat Yourself)** approach to prevent duplicate code and keep the application concise and easy to maintain.


I continuously focused on this task to make it perfect and followed modern development techniques and best practices.

---

## 🌐 APIs Used

- [NewsAPI.org](https://newsapi.org/)
- [The Guardian Open Platform](https://open-platform.theguardian.com/)
- [The New York Times API](https://developer.nytimes.com/)

---

## ⚙️ Installation

First, clone the repository:

```bash
git clone https://github.com/fahaddoc/news-aggregator.git
cd news-aggregator
```

Then install dependencies:

```bash
npm install
```

---

## 🚀 Running Locally

Start the development server:

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

## 🐳 Docker

This project includes a Docker image for containerized deployment.

### Build Docker Image

```bash
docker build -t news-aggregator .
```

### Run Docker Container

```bash
docker run -p 5173:5173 news-aggregator
```

Now the app will be accessible at:

```
http://localhost:5173
```

---

## 📚 Usage Instructions

- Clone the repo and install dependencies.
- Set up your environment variables for API keys:

  ```bash
  VITE_REACT_APP_NEWS_API_KEY=<your_newsapi_key>
  VITE_REACT_APP_GUARDIAN_API_KEY=<your_guardian_api_key>
  VITE_REACT_APP_NYT_API_KEY=<your_nyt_api_key>
  ```

- Run the app locally with:

  ```bash
  npm run dev
  ```

- Navigate the UI to:
  - Browse aggregated news
  - Filter articles by category
  - Use pagination controls
  - Observe loading shimmer effects while data loads

---

## 🧑‍💻 Developer’s Note

> This app was built through many iterative changes, problem-solving, and debugging:
>
> - Initially struggled with Tailwind + Vite PostCSS config due to ESM vs CJS conflicts.
> - Built helper transformations for each API’s response to map data into a unified `Article` interface.
> - Added Docker for consistent deployments.
> - Carefully handled rate-limits in free API plans, especially for NewsAPI.org and NY Times.
> - Discussed every issue, bug, and solution step-by-step via interactive sessions, shaping a robust and maintainable architecture.
>
> Thanks to these insights, the project is both scalable and production-ready.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your proposals.

---

## 📄 License

MIT © Shah Fahad

---

## ⭐ Author

Made with ❤️ by **Shah Fahad**

- [LinkedIn](https://www.linkedin.com/in/fahaddoc600)
- [GitHub](https://github.com/fahaddoc)

---

## 🔗 Repository

[GitHub Repo → News Aggregator App](https://github.com/fahaddoc/news-aggregator)
