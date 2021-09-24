import styled from 'styled-components'
import Card from 'components/card/Card'
import GridContainer from 'components/common/layoutContainer/GridContainer'
import { useQuery } from '@apollo/react-hooks'
import { GetArticlesList } from 'gql/query'
import { useSelector } from 'react-redux'
import { useInView } from "react-intersection-observer"
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { RootState } from "store/store";

let cursorId = 0;
const limit = 10;

const Div = styled.div`
    height: 24px;
    margin-bottom: 16px;
    font-weight: 600;
`;

const LatestViewer = () => {
    const { loading, data, fetchMore } = useQuery(GetArticlesList,{
        variables: { cursorId: 0, limit: limit },
    })

    const { admin_flag } = useSelector( (state: RootState) => ({admin_flag: state.user.admin_flag}) );

    const [ref, inView] = useInView();

    useEffect(() => {
        if(inView === true){
            // offset = offset + limit;
            fetchMore({
                variables: { cursorId: cursorId, limit: limit },
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
        !loading ?
            <>
                <Helmet>
                    <meta name="description" content="소프트웨어 엔지니어, 크리스피의 블로그 입니다!" />
                    <link rel="canonical" href="https://crispyblog.kr/" />
                </Helmet>
                <Div>Latest Post</Div>
                <GridContainer className="sub__container" >
                    {data.articlesList.map((articlesData: any,key: string) => {
                            cursorId = articlesData.id
                            return admin_flag === false && articlesData.privacy === "private" ? null : <Card data={articlesData} key={key}/> ;
                        }
                    )}
                </GridContainer>
                <div ref={ref} style={{visibility:'hidden', position: 'absolute', bottom: '300px', width:'1px',height:'1px'}} />
            </>
        : null
    )
};

export default LatestViewer;