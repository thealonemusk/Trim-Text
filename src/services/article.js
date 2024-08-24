import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPIDAPI_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Assuming your FastAPI server is running on localhost at port 8000
// const baseUrl = "https://api-jmwm.onrender.com";

// export const articleApi = createApi({
//   reducerPath: "articleApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl,
//     prepareHeaders: (headers) => {
//       // Setting Content-Type to application/x-www-form-urlencoded since FastAPI is expecting form data
//       headers.set("Content-Type", "application/x-www-form-urlencoded");
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getSummary: builder.query({
//       query: (params) => ({
//         url: `/summarize/`,
//         method: 'POST',
//         body: new URLSearchParams({ url: params.articleUrl }).toString(), // Sending the URL as form data
//       }),
//     }),
//   }),
// });

// export const { useLazyGetSummaryQuery } = articleApi;
