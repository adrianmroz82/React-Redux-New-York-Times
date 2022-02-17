import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IState } from "../../app/store_types";
import axios from "axios";

const initialState: IState = {
  data: {},
  articles: [],
  status: "initial",
  error: undefined,
  page: 1,
  copyright: "",
};

const yourApiKey = "TqbXjcy6d60sNQ7GjZPsIguZVU91BrN5";
const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const subject = "sports";

export const fetchPosts = createAsyncThunk("articles/fetchPosts", async (page: number) => {
  const response = await axios.get(`${baseUrl}?q=${subject}&api-key=${yourApiKey}&page=${page}`);
  return {
    data: response.data,
    page,
  };
});

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.articles = payload.data.response.docs;
        state.page = payload.page;
        state.copyright = payload.data.copyright;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getPage = (state: RootState) => state.articles.page;
export const getAllArticles = (state: RootState) => state.articles.articles;
export const getCopyright = (state: RootState) => state.articles.copyright;
export default articlesSlice.reducer;
