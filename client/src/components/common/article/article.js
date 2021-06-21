import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MDRenderer from 'components/mde/MDRenderer';
import { bottomMargin, sidebarWidth } from 'styles/styleConst'

const Div = styled.div`
    margin-bottom: ${bottomMargin};
    display: flex;
    flex-direction: row;
    justify-content: center;

    .paper {
        flex-grow: 1;
        padding: 20px;
    
        max-width : ${ props => props.sideBarState ? '95vw;' : '1110px;'}

        ${({theme}) => theme.media.xlarge}{
            max-width: ${ props => props.sideBarState ? '95vw;' : 'calc(95vw - '+ sidebarWidth +');'}
        }

        ${({theme}) => theme.media.small}{
            max-width: 95vw;
        }
        
    }

    .head__wrapper{
    }

    .title {
        margin-bottom: 40px;
    }
`;

function Article({data}){
    const sideBarState = useSelector(state => state.sideBarHidden.sideBarState);

    // const {id,title,subtitle,info,contents,desc} = data;
    const {title,info,contents} = data;

    return(
        <Div sideBarState={sideBarState} >
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