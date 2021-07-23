import { createSlice } from '@reduxjs/toolkit';

const initState = {
  focus : false,
  focusMobile: false,
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
    showResultMobile: (state,action) =>  { state.focusMobile = true } ,
    hiddenResultMobile: (state,action) =>  { state.focusMobile = false },
    updateSearchwordMobile: (state,action) => { state.searchwordMobile = action.payload },
    openSearchDialog : (state,action) => { state.searchDialogOpen = true},
    closeSearchDialog : (state,action) => { state.searchDialogOpen = false},
  }
});

export default search;