import { combineReducers, configureStore } from '@reduxjs/toolkit';
import error, {ErrorState} from 'store/error';
import search, {SearchState} from 'store/search';
import sideBarHidden, {SideBarHiddenState} from 'store/sideBarHidden';
import menuClick, {MenuClickState} from 'store/menuClick';
import admin, {AdminState} from 'store/admin';
import snackBar, {SnackBarState} from 'store/snackBar';
import article, {ArticleState} from 'store/article';
import publish, {PublishState} from 'store/publish';
import post, {PostState} from 'store/post';
import user, {UserState} from 'store/user';

export type RootState = {
    error: ErrorState;
    search: SearchState;
    sideBarHidden: SideBarHiddenState;
    menuClick: MenuClickState;
    admin: AdminState;
    snackBar: SnackBarState;
    article: ArticleState;
    publish: PublishState;
    post: PostState;
    user: UserState;
};

const rootReducer = combineReducers({
    error: error.reducer,
    search: search.reducer,
    sideBarHidden: sideBarHidden.reducer,
    menuClick: menuClick.reducer,
    admin: admin.reducer,
    snackBar: snackBar.reducer,
    article: article.reducer,
    publish: publish.reducer,
    post: post.reducer,
    user: user.reducer,
});

const store = configureStore({
    reducer: rootReducer
});

export const { transSideBar, transMobileFlag } = sideBarHidden.actions;
export const { click } = menuClick.actions;
export const { adminOpen, adminClose } = admin.actions;
export const { snackBarOpen, snackBarClose } = snackBar.actions;
export const { cardClick } = article.actions;
export const { openPublisher, closePublisher } = publish.actions;
export const { setContents } = post.actions;
export const { setUser } = user.actions;
export const {
    showResult, hiddenResult, updateSearchword,
    updateSearchwordMobile, openSearchDialog, closeSearchDialog
} = search.actions;

export default store;