import ArticleTitleArea from 'components/mde/ArticleTitleArea';
import MDWriter from 'components/mde/MDWriter';
import ExitAndPublish from 'components/mde/ExitAndPublish';
import ArticlePublisher from 'components/mde/ArticlePublisher';

const MarkdownWriter = ({history}) => {
    return (
        <>
            <ArticleTitleArea pdata={null} />
            <MDWriter pdata={null} />
            <ExitAndPublish history={history} pdata={null}/>
            <ArticlePublisher history={history} pdata={null} />
        </>
    )
   
};

export default MarkdownWriter;