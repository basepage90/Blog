import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ReplyHeader from 'components/article/ReplyHeader'
import ReplyWriterContainer from 'containers/article/ReplyWriteContainer'
import ReplyListContainer from 'containers/article/ReplyListContainer'
import { bottomMargin, sidebarWidth } from 'constants/StyleConstant'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Reply } from 'gql/query'
import { RootState } from "store/store";

import Paper from '@material-ui/core/Paper';

const Div = styled.div<{sideBarState: boolean}>`
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

const ReplyContainer = () => {
    const { id } = useParams<{id: string}>();

    const sideBarState = useSelector( (state: RootState) => state.sideBarHidden.sideBarState);

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
                        <ReplyWriterContainer replyId={null} refetch={refetch} />
                    </ReplyWriterWrapper>
                    {!loading && <ReplyListContainer replyList={data.reply} refetch={refetch} />}
                </Paper>
            </Div>
        </>
    )

}

export default ReplyContainer;