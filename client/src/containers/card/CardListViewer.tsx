import Card from 'components/card/Card'
import GridContainer from 'components/common/layoutContainer/GridContainer'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GetCardList } from 'gql/query'
import { useSelector } from 'react-redux'
import Meta from 'components/common/helmet/Meta'
import { RootState } from "store/store";
import { useEffect } from 'react'
import { useInView } from "react-intersection-observer"


let cursorId = 0;
const limit = 10;

const CardListViewer = () => {
    const { categoryLg, categoryMd } = useParams<{categoryLg: string, categoryMd: string}>();

     const { loading, data, fetchMore } = useQuery(GetCardList,{
         variables: { cursorId: 0, category_lg: String(categoryLg), category_md: String(categoryMd), limit: limit },
         fetchPolicy: "cache-first"
    })

    const { admin_flag } = useSelector((state: RootState) => ({ admin_flag: state.user.admin_flag }));
    
    const [ref, inView] = useInView();

    useEffect(() => {
        if(inView === true){
            // offset = offset + limit;
            fetchMore({
                variables: { cursorId: cursorId, limit: limit },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                        articlesListByCategory: [...prev.articlesListByCategory, ...fetchMoreResult.articlesListByCategory]
                    });
                }
            })
        }
    },[inView,fetchMore]);

    if(loading || categoryLg === undefined){
        return(
            <GridContainer className="sub__container"/>
        )
    } else {
        return(
            <>
                <Meta />
                <GridContainer className="sub__container">
                    {data.articlesListByCategory.map((articlesData: any, key: string) => {
                            cursorId = articlesData.id
                            return admin_flag === false && articlesData.privacy === "private" ? null : <Card data={articlesData} key={key}/> ;
                        }
                    )}
                </GridContainer>
                <div ref={ref} style={{visibility:'hidden', position: 'absolute', bottom: '300px', width:'1px',height:'1px'}} />
            </>
        )
    }
};

export default CardListViewer;