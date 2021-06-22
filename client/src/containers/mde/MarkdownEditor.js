import styled from 'styled-components';
import ArticleTitleArea from 'components/mde/ArticleTitleArea';
import MDWriter from 'components/mde/MDWriter';
import ExitAndPublish from 'components/mde/ExitAndPublish';
import ArticlePublisher from 'components/mde/ArticlePublisher';
import { useQuery } from '@apollo/react-hooks'
import { GetArticles } from 'gql/query'



const Div = styled.div`
`;


const MarkdownEditor = ({history, id}) => {
    const { loading, data } = useQuery(GetArticles, {
        variables: { id } ,
        fetchPolicy: "network-only",
    });

    if (!loading){
        return (
            <>
                <ArticleTitleArea pdata={data.articles} />
                <Div>
                    <MDWriter pdata={data.articles} />
                    <ExitAndPublish history={history}/>
                </Div>
                <ArticlePublisher history={history} pdata={data.articles} />
            </>
        )
    }else{
        return null
    }

};

export default MarkdownEditor;