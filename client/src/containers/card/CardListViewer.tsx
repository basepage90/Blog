import Card from 'components/card/Card'
import GridContainer from 'components/common/layoutContainer/GridContainer'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GetCardList } from 'gql/query'
import { useSelector } from 'react-redux'
import Meta from 'components/common/helmet/Meta'
import { RootState } from "store/store";

const CardListViewer = () => {
    const { categoryLg, categoryMd } = useParams<{categoryLg: string, categoryMd: string}>();
    const { loading, data } = useQuery(GetCardList, {
        variables: { category_lg : String(categoryLg), category_md: String(categoryMd) }
    });

    const { admin_flag } = useSelector( (state: RootState) => ({admin_flag: state.user.admin_flag}) );

    if(loading || categoryLg === undefined){
        return(
            <GridContainer className="sub__container"/>
        )
    } else {
        return(
            <>
                <Meta />
                <GridContainer className="sub__container">
                    {data.articlesListByCategory.map((articlesData: any, key: string) =>
                        admin_flag === false && articlesData.privacy === "private" ? null : <Card data={articlesData} key={key}/>
                    )}
                </GridContainer>
            </>
        )
    }
};

export default CardListViewer;