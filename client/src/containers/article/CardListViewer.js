import Card from 'components/common/card/card'
import GridContainer from 'components/common/layoutContainer/gridContainer'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GetCardList } from 'gql/query'

const CardListViewer = () => {
    const { categoryLg, categoryMd } = useParams();
    const { loading, data } = useQuery(GetCardList, {
        variables: { category_lg : String(categoryLg), category_md: String(categoryMd) }
    });
    if(loading || categoryLg === undefined){
        return(
            <GridContainer className="sub__container"/>
        )
    }else{
        return(
            <GridContainer className="sub__container">
            {data.articlesListByCategory.map((articlesData,key) =>
                <Card data={articlesData} key={key}/>
            )}
            </GridContainer>
        )
    }
};

export default CardListViewer;