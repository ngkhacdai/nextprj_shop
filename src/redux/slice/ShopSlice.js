import { getShopInfor } from "@/api/Shop";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchShopInfor = createAsyncThunk("shop/shopinfor", async () => {
  const response = await getShopInfor();
  return response.message;
});

const initialState = {
  shopInFor: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopInfor.fulfilled, (state, action) => {
        state.shopInFor = action.payload;
      })
      .addCase(fetchShopInfor.rejected, (state, action) => {
        state.shopInFor = [];
      });
  },
});

export default shopSlice.reducer;
