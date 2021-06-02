import Article from 'components/common/article/article'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import { GetArticles } from 'gql/query'

function ArtilceViewer (){
    const { id } = useParams();
    const { loading, data } = useQuery(GetArticles, {
        variables: { id }
    });
    return(
        <>
            {loading ? null : <Article data={data.articles} />} 
        </>
    )
}

export default ArtilceViewer;