import { useParams } from "react-router-dom";
import MarkdownWriter from "containers/mde/MarkdownWriter";
import MarkdownEditor from "containers/mde/MarkdownEditor";

interface MarkdownPageProps {
    history: any;
}

const MarkdownPage = ({history}: MarkdownPageProps) => {
    const {id} = useParams<{id: string | undefined}>();
    if(id === undefined){
        return <MarkdownWriter history={history} />
    }else{
        return <MarkdownEditor history={history} id={id} />
    }
}

export default MarkdownPage;