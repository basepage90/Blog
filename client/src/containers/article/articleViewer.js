import Article from 'components/common/article/article'

import { useParams } from 'react-router-dom';


// id 를 이용해서 query load -> data load
import testData from "./testData"

function ArtilceViewer (){
    const {categoryLg,categoryMd,id} = useParams();
    console.log(categoryLg)
    console.log(categoryMd)
    console.log(id)

    // useQuery로 대체 예정

    let data;
    
    const selectData = () => {
        switch (categoryMd){
            case undefined : data = testData.homeData;
            break;
            case 'about' : data = testData.aboutData;
            break;
            case 'hiphop' : data = testData.homeData;
            break;
            default : data = null;
            break;
        }

        data.map(prop => {
            if(prop.id === id){
                data = prop
            }
            return null;
        })
        
    }

    selectData();


    return(
        <Article data={data} />
    )
}

export default ArtilceViewer;
