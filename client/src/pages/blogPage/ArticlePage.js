import ArticleViewer from "containers/article/articleViewer"
import ReplySection from "containers/article/ReplySection"

const ArticlePage = () => {
    return(
        <>
            <ArticleViewer />
            <ReplySection />
            {/* <ArticlePreviewer /> */}
        </>
    )
}

export default ArticlePage;