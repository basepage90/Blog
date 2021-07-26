import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import { bottomMargin, sidebarWidth } from 'constants/StyleConstant'
import MDRenderer from 'components/mde/MDRenderer';
import { useDispatch } from "react-redux";
import { showResult, updateSearchword, openSearchDialog, updateSearchwordMobile } from "store/store";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { myAvartar } from 'statics/images'

const Div = styled.div`
    margin-bottom: ${bottomMargin};
    display: flex;
    flex-direction: row;
    justify-content: center;

    .paper {
        flex-grow: 1;
        padding: 32px 48px 16px 48px ;
    
        max-width : ${ props => props.sideBarState ? '96vw;' : '1110px;'}

        ${({theme}) => theme.media.xlarge}{
            max-width: ${ props => props.sideBarState ? '96vw;' : 'calc(96vw - '+ sidebarWidth +');'}
        }

        ${({theme}) => theme.media.small}{
            max-width: 96vw;
            padding: 16px 12px 8px 12px;
        }
    }

    .head__wrapper{
    }

    .title {
        margin-bottom: 40px;
        word-break: break-word;
    }
    
    .avartarBox{
        display: flex;
        align-items: center;
    }

    .myAvartar {
        width: 48px;
        height: 48px;
    }

    .regDate{
        font-weight: 500;
        margin-left: 16px;
    }

    .contents__wrapper {
        margin-top: 24px;
    }

    & .MuiChip-root {
        background-color: ${({theme}) => theme.palette.gray1};
        margin-right: 5px;
        margin-bottom: 10px;
    }

    & .MuiChip-label {
        color: ${({theme}) => theme.palette.sky2} ;
    }
`;

function Article({data}){
    const {title,reg_date,hashtag,contents} = data;
    
    const { sideBarState, mobileFlag } = useSelector( state => ({
        sideBarState: state.sideBarHidden.sideBarState,
        mobileFlag : state.sideBarHidden.mobileFlag,
    }), shallowEqual);
    
    const getFormatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1 ;
        const day = date.getDate();
        return year + '년 ' + month + '월 ' + day + "일";
    }

    var regDate = getFormatDate(new Date(reg_date))

    const hashtagArr = hashtag.split('#');

    const dispatch = useDispatch();

    const PushSearchword = (txt) => {
        if(mobileFlag){
            dispatch(openSearchDialog());
            setTimeout(function() {
                const searchbox = document.getElementById('searchbox__mobile');
                searchbox.value = txt;
                dispatch(updateSearchwordMobile(txt));
            }, 300);

        }else{
            const searchbox = document.getElementById('searchbox');
            searchbox.value = txt;
            dispatch(updateSearchword(txt));
            dispatch(showResult());
            searchbox.focus();
        }
    }

    return(
        <Div sideBarState={sideBarState} >
            <Paper className="paper" elevation={3} >
                <div className="head__wrapper">
                    <Typography className="title" variant="h3">{title}</Typography>
                    <div className="avartarBox">
                        <Avatar src={myAvartar} className="myAvartar" />
                        <Typography className="regDate" variant="subtitle2">{regDate}</Typography>
                    </div>
                </div>
                <div className="contents__wrapper">
                    <MDRenderer contents={contents} />
                </div>
                <div>
                    {hashtagArr.map( item => {
                        return item.trim() !== "" && <Chip key={item.trim()} label={"#"+item.trim()} clickable  onClick={() => PushSearchword(item.trim())} /> ;
                    })}
                </div>
            </Paper>
        </Div>
    );
}

export default Article;