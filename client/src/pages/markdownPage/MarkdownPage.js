import { useParams } from "react-router-dom";
import MarkdownWriter from "containers/mde/MarkdownWriter";
import MarkdownEditor from "containers/mde/MarkdownEditor";


const MarkdownPage = ({history}) => {
    const {id} = useParams();
    if(id === undefined){
        return <MarkdownWriter history={history} />
    }else{
        return <MarkdownEditor history={history} id={id} />
    }
}

export default MarkdownPage;