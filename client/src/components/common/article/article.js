import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MDRenderer from 'components/mde/MDRenderer';
import { bottomMargin } from 'styles/styleConst'

const Div = styled.div`
    margin-bottom: ${bottomMargin};
    display: flex;
    justify-content: center;
    
    .paper {
        max-width : 1080px;
        flex-grow: 1;
        padding: 20px;
    }

    .head__wrapper{

    }

    .title {
        margin-bottom: 40px;
    }

`;

function Article({data}){

    // const {id,title,subtitle,info,contents,desc} = data;
    const {title,info,contents} = data;

    
    return(
    <Div>
        <Paper className="paper" elevation={3} >
            <div className="head__wrapper">
                <Typography className="title" variant="h3">{title}</Typography>
                <Typography className="information" variant="subtitle2">{info}</Typography>
            </div>
            <MDRenderer contents={contents} />
        </Paper>
    </Div>
    

    );

}

export default Article;

