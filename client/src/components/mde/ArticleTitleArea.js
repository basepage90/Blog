import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Div = styled.div`
    height: 120px;
    width: 80%;
    ${({theme}) => theme.media.xsmall}{
        width: 100%;
    }
    display: flex;
    flex-direction: column;
`;

const TextFieldTitle = styled(TextField)`
    flex: 1 1 auto;
    margin-left: 20px;
`;
    
    const TextFieldSubtitle = styled(TextField)`
    flex: 1 1 auto;
    margin-left: 20px;
`;

const ArticleTitleArea = ({pdata})=>{

    const [state, setState] = useState({
        title: "",
        subtitle: "",
    });
    
    const changeTitle = (props) => {
        setState({
            title: props.currentTarget.value,
            subtitle: state.subtitle,
        });
    }
    
    const changeSubtitle = (props) => {
        setState({
            title: state.title,
            subtitle: props.currentTarget.value,
        });
    }

    useEffect(() => {
        if(pdata !== null){
            setState({
                title: pdata.title,
                subtitle: pdata.subtitle,
            });
        }
    },[pdata])
        
    return (
        <Div>
            {pdata !== null ?
            <>
                <TextFieldTitle id="post__title" label="Title" value={state.title} onChange={changeTitle} />
                <TextFieldSubtitle id="post__subtitle" label="Subtitle" value={state.subtitle} onChange={changeSubtitle} />
            </>
            :
            <>
                <TextFieldTitle id="post__title" label="Title" />
                <TextFieldSubtitle id="post__subtitle" label="Subtitle" />
            </>
            }
        </Div>
    )
}

export default ArticleTitleArea;