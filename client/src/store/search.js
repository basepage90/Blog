import { createSlice } from '@reduxjs/toolkit';

const initState = {
  focus : false,
  searchword: "",
  searchwordMobile: "",
  searchDialogOpen: false,
}

const search = createSlice({
  name: "searchReducer",
  initialState: initState,
  reducers: {
    // pc
    showResult: (state,action) =>  { state.focus = true } ,
    hiddenResult: (state,action) =>  { state.focus = false },
    updateSearchword: (state,action) => { state.searchword = action.payload },
    // mobile
    updateSearchwordMobile: (state,action) => { state.searchwordMobile = action.payload },
    openSearchDialog : (state,action) => { state.searchDialogOpen = true},
    closeSearchDialog : (state,action) => { state.searchDialogOpen = false},
  }
});

export default search;