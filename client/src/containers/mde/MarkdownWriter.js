import styled from 'styled-components';
import ArticleTitleArea from 'components/mde/ArticleTitleArea';
import MDWriter from 'components/mde/MDWriter';
import ExitAndPublish from 'components/mde/ExitAndPublish';
import ArticlePublisher from 'components/mde/ArticlePublisher';


const Div = styled.div`
`;


const MarkdownWriter = ({history}) => {
    return (
        <>
            <ArticleTitleArea pdata={null} />
            <Div>
                <MDWriter pdata={null} />
                <ExitAndPublish history={history} pdata={null}/>
            </Div>
            <ArticlePublisher history={history} pdata={null} />
        </>
    )
   
};

export default MarkdownWriter;