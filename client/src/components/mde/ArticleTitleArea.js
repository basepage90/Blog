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

const ArticleTitleArea = ()=>{
    return (
        <Div>
            <TextFieldTitle id="post__title" label="Title" />
            <TextFieldSubtitle id="post__subtitle" label="Subtitle" />
        </Div>
    )

}

export default ArticleTitleArea;