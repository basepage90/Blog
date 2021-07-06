import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ReplyHeader from 'components/common/article/ReplyHeader'
import ReplyWriter from 'components/common/article/ReplyWriter'
import ReplyList from 'components/common/article/ReplyList'
import Paper from '@material-ui/core/Paper';
import { bottomMargin, sidebarWidth } from 'styles/styleConst'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Reply } from 'gql/query'

const Div = styled.div`
    margin-bottom: ${bottomMargin};
    display: flex;
    flex-direction: row;
    justify-content: center;

    .paper {
        background-color: #FFFFFF;
        flex-grow: 1;
    
        max-width : ${ props => props.sideBarState ? '96vw;' : '1110px;'}

        ${({theme}) => theme.media.xlarge}{
            max-width: ${ props => props.sideBarState ? '96vw;' : 'calc(96vw - '+ sidebarWidth +');'}
        }

        ${({theme}) => theme.media.small}{
            max-width: 96vw;
        }
        
    }
`;

const ReplyWriterWrapper = styled.div`
  background-color: ${({theme}) => theme.palette.gray0};
  padding: 24px 16px;
  border-bottom: 1px solid #DDDFE4;
`;

const ReplySection = () => {
    const { id } = useParams();

    const sideBarState = useSelector(state => state.sideBarHidden.sideBarState);

    const { loading, data, refetch } = useQuery(Reply, {
        variables: { article_id: id },
        fetchPolicy: "cache-first",
    });
    
    return (
        <>
            <Div sideBarState={sideBarState}>
                <Paper className="paper" elevation={3} >
                    {!loading && <ReplyHeader replyList={data.reply} />}
                    <ReplyWriterWrapper >
                        <ReplyWriter refetch={refetch} />
                    </ReplyWriterWrapper>
                    {!loading && <ReplyList replyList={data.reply} refetch={refetch} />}
                </Paper>
            </Div>
        </>
    )

}

export default ReplySection;