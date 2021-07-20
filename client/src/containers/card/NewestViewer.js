import Card from 'components/card/Card'
import GridContainer from 'components/common/layoutContainer/GridContainer'
import { useQuery } from '@apollo/react-hooks'
import { GetArticlesList } from 'gql/query'
import { useSelector } from 'react-redux'
import { useInView } from "react-intersection-observer"
import { useEffect } from 'react'

let offset = 0;

const NewestViewer = () => {
    const limit = 10;

    const { loading, data, fetchMore } = useQuery(GetArticlesList,{
        variables: { offset: 0, limit: limit },
    })

    const { admin_flag } = useSelector(
        state => ({admin_flag: state.user.admin_flag})
    );

    const [ref, inView] = useInView();

    useEffect(() => {
        if(inView === true){
            offset = offset + limit;
            fetchMore({
                variables: { offset: offset, limit: limit },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                        articlesList: [...prev.articlesList, ...fetchMoreResult.articlesList]
                    });
                }
            })
        }
    },[inView,fetchMore]);

    return (
        !loading && 
        <>
            <GridContainer className="sub__container" >
                {data.articlesList.map((articlesData,key) =>
                    admin_flag === false && articlesData.privacy === "private" ? null : <Card data={articlesData} key={key}/>
                )}
            </GridContainer>
            <div ref={ref} style={{visibility:'hidden', position: 'absolute', bottom: '300px', width:'1px',height:'1px'}} />
        </>
    )
};

export default NewestViewer;