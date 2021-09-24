import ArticleTitleArea from 'components/mde/ArticleTitleArea';
import MDWriter from 'components/mde/MDWriter';
import ExitAndPublish from 'components/mde/ExitAndPublish';
import ArticlePublisher from 'components/mde/ArticlePublisher';

interface MarkdownWriterProps {
    history: any;
}

const MarkdownWriter = ({history}: MarkdownWriterProps) => {
    return (
        <>
            <ArticleTitleArea pdata={null} />
            <MDWriter pdata={null} />
            <ExitAndPublish history={history} />
            <ArticlePublisher history={history} pdata={null} />
        </>
    )
   
};

export default MarkdownWriter;