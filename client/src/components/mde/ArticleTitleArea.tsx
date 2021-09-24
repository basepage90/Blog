import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Div = styled.div`
    height: 120px;
    width: 80%;
    ${({theme}) => theme.media.small}{
        width: 100%;
    }
    display: flex;
    flex-direction: column;
`;

const TextFieldTitle = styled(TextField)`
    flex: 1 1 auto;
    margin-left: 20px;
    margin-right: 20px;
    `;
    
const TextFieldHashtag = styled(TextField)`
    flex: 1 1 auto;
    margin-left: 20px;
    margin-right: 20px;
`;

interface ArticleTitleAreaProps {
    pdata: any;
}
const ArticleTitleArea = ({pdata}: ArticleTitleAreaProps)=>{

    const [state, setState] = useState({
        title: "",
        hashtag: "",
    });
    
    const changeTitle = (props: any) => {
        setState({
            title: props.currentTarget.value,
            hashtag: state.hashtag,
        });
    }
    
    const changeHashtag = (props: any) => {
        setState({
            title: state.title,
            hashtag: props.currentTarget.value,
        });
    }

    useEffect(() => {
        if(pdata !== null){
            setState({
                title: pdata.title,
                hashtag: pdata.hashtag,
            });
        }
    },[pdata])
        
    return (
        <Div>
            {pdata !== null ?
            <>
                <TextFieldTitle id="post__title" label="Title" value={state.title} onChange={changeTitle} />
                <TextFieldHashtag id="post__hashtag" label="Hashtag" value={state.hashtag} onChange={changeHashtag} />
            </>
            :
            <>
                <TextFieldTitle id="post__title" label="Title" />
                <TextFieldHashtag id="post__hashtag" label="Hashtag" />
            </>
            }
        </Div>
    )
}

export default ArticleTitleArea;