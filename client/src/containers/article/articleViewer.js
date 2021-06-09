import Article from 'components/common/article/article'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import { GetArticles } from 'gql/query'
import NotFoundPage from 'pages/NotFoundPage';

function ArtilceViewer (){
    const { id } = useParams();
    
    const { loading, data } = useQuery(GetArticles, {
        variables: { id }
    });


    if(loading){
        return null
    } else if (data === undefined){
        return <NotFoundPage />
    } else {
        return(
            <Article data={data.articles} /> 
        )
    }
}

export default ArtilceViewer;