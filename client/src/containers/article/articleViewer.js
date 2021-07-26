import Article from 'components/article/Article'
import PrivacySwitchContainer from 'containers/article/PrivacySwitchContainer'
import EditAndDelete from 'containers/article/EditAndDelete'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import { GetArticles } from 'gql/query'
import NotFoundPage from 'pages/NotFoundPage';
import ReplyContainer from "containers/article/ReplyContainer"


function ArtilceViewer (){
    const { id } = useParams();
    
    const { loading, data } = useQuery(GetArticles, {
        variables: { id },
        fetchPolicy: "cache-and-network",
    });

    const userInfo = useSelector(state => state.user);

    if(loading){
        return null
    } else if (data === undefined){
        return <NotFoundPage />
    } else {
        return(
            <>
                {userInfo.admin_flag ? 
                <>
                    <PrivacySwitchContainer data={data.articles} />
                    <EditAndDelete data={data.articles}/>
                </>
                : null}
                <Article data={data.articles} /> 
                <ReplyContainer />
            </>
        )
    }
}

export default ArtilceViewer;