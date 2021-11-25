import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router";
import { RootState } from "../../app/store";
import { IState } from "../../app/store_types";

const initialState: IState = {
  data: {},
  articles: [],
  status: "initial",
  error: undefined,
  page: 1,
};

// type idType = {
//   id: string | any;
// };

const yourApiKey = "TqbXjcy6d60sNQ7GjZPsIguZVU91BrN5";
const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const subject = "sports";

export const fetchPosts = createAsyncThunk("articles/fetchPosts", async (page) => {
  // const { id }: string | any = useParams();
  // console.log(id);
  const response = await axios.get(`${baseUrl}?q=${subject}&api-key=${yourApiKey}&page=${page}`);

  return response.data;
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
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.response.docs;
        state.data = action.payload;
        state.page = action.meta.arg;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getPage = (state: RootState) => state.articles.page;
export const getAllArticles = (state: RootState) => state.articles.articles;
export const getData = (state: RootState) => state.articles.data;
export default articlesSlice.reducer;
