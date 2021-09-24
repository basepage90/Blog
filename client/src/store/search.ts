import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  focus: boolean;
  searchword: string;
  searchwordMobile: string;
  searchDialogOpen: boolean;
}

const initState: SearchState = {
  focus : false,
  searchword: "",
  searchwordMobile: "",
  searchDialogOpen: false,
}

const search = createSlice({
  name: "search",
  initialState: initState,
  reducers: {
    // pc
    showResult: (state) =>  { state.focus = true } ,
    hiddenResult: (state) =>  { state.focus = false },
    updateSearchword: (state,action: PayloadAction<string>) => { state.searchword = action.payload },
    // mobile
    updateSearchwordMobile: (state,action: PayloadAction<string>) => { state.searchwordMobile = action.payload },
    openSearchDialog : (state) => { state.searchDialogOpen = true},
    closeSearchDialog : (state) => { state.searchDialogOpen = false},
  }
});

export default search;