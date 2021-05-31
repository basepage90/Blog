import Card from 'components/common/card/card'
import GridContainer from 'components/common/layoutContainer/gridContainer'
import { useParams } from 'react-router-dom'

import testData from "./testData"



const CardListViewer = () => {
    const {categoryMd} = useParams();
    // const {categoryMd} = useParams();
    // useQuery 로 대체 예정
    let cardData = null;

    const selectSuject = () => {
        switch (categoryMd){
            // case undefined : cateData = testData.homeData;
            // break;
            case 'about' : cardData = testData.aboutData;
            break;
            case 'hiphop' : cardData = testData.homeData;
            break;
            default : cardData = null;
            break;
        }
    }
    selectSuject()
    
    return(
        <GridContainer className="sub__container">
        {cardData === null ? null :
            cardData.map((prop,key) => 
                <Card cardData={prop} params={categoryMd} key={key}/>
                )
        }
        </GridContainer>
    )
};

export default CardListViewer;