import ArticleTitleArea from 'components/mde/ArticleTitleArea';
import MDWriter from 'components/mde/MDWriter';
import ExitAndPublish from 'components/mde/ExitAndPublish';
import ArticlePublisher from 'components/mde/ArticlePublisher';
import { useQuery } from '@apollo/react-hooks'
import { GetArticles } from 'gql/query'

interface MarkdownEditorProps {
    history: any;
    id: string | undefined;
}

const MarkdownEditor = ({history, id}: MarkdownEditorProps) => {
    const { loading, data } = useQuery(GetArticles, {
        variables: { id } ,
        fetchPolicy: "network-only",
    });

    if (!loading){
        return (
            <>
                <ArticleTitleArea pdata={data.articles} />
                <div>
                    <MDWriter pdata={data.articles} />
                    <ExitAndPublish history={history}/>
                </div>
                <ArticlePublisher history={history} pdata={data.articles} />
            </>
        )
    }else{
        return null
    }

};

export default MarkdownEditor;