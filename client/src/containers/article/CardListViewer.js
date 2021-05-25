import Card from 'components/common/card/card'
import GridContainer from 'components/common/layoutContainer/gridContainer'
import { useParams } from 'react-router-dom';


// testdata 해당 카테고리의 data 모두 load 할필요없다
// 모두 가져올필요없이 match url params 로 해당 조건의 데이터를 즉시즉시 가져오면된다.
// 라우터 페이지 컨테이너 순으로 동작하기때문에 필연적으로 match를 가져올수있다.
// 우선 header 에서도 이렇게 동작하는지 확인해보자

// 카드리스트에선든 categoryLg categoryMd 까지만 알면되고
// 아티클 페이지에서는 categoryLg categoryMd 에 아티클 id 까지 알아야한다

import testData from "./testData"



const CardListViewer = () => {
    const {categoryMd} = useParams();
    // const {categoryMd} = useParams();
    // useQuery 로 대체 예정
    let data = null;

    const selectSuject = () => {
        switch (categoryMd){
            // case undefined : data = testData.homeData;
            // break;
            case 'about' : data = testData.aboutData;
            break;
            case 'hiphop' : data = testData.homeData;
            break;
            default : data = null;
            break;
        }
    }
    selectSuject()
    
    return(
        <GridContainer className="sub__container">
        {data === null ? null :
            data.map((prop,key) => 
                <Card data={prop} params={categoryMd} key={key}/>
                )
        }
        </GridContainer>
    )
};

export default CardListViewer;