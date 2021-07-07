import ArticleViewer from "containers/article/ArticleViewer"
import ReplyContainer from "containers/article/ReplyContainer"

const ArticlePage = () => {
    return(
        <>
            <ArticleViewer />
            <ReplyContainer />
            {/* <ArticlePreviewer /> */}
        </>
    )
}

export default ArticlePage;