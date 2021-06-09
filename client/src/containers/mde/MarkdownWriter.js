import ArticleTitleArea from 'components/mde/ArticleTitleArea';
import MDWriter from 'components/mde/MDWriter';
import ExitAndPublish from 'components/mde/ExitAndPublish';
import ArticlePublisher from 'components/mde/ArticlePublisher';
import styled from 'styled-components';


const Div = styled.div`
`;


const MarkdownWriter = ({history}) => {
    return (
        <>
            <ArticleTitleArea />
            <Div>
                <MDWriter />
                <ExitAndPublish history={history}/>
            </Div>
            <ArticlePublisher history={history} />
        </>
    )

};

export default MarkdownWriter;