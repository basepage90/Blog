import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { RemoveReply } from 'gql/query';
import { useSnackbar } from 'notistack';
import ReplyWriterContainer from 'containers/article/ReplyWriteContainer'
import ReplyList from 'components/article/ReplyList'

const ReplyChild = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px 16px 16px 48px;
    background-color: ${({theme}) => theme.palette.gray0};

    ::before {
        position: relative;
        top: 6px;
        left: -12px;
        content: "";
        width: 12px;
        height: 12px;
        border-left: 1px solid #C5CBD0;
        border-bottom: 1px solid #C5CBD0;
    }
`;

const ReplyListContainer = ({replyList,refetch}) => {
    const [openReply, setOpenReply] = useState(false)
    const [currentId, setCurrentId] = useState(0)
    const [currentRemoveId, setCurrentRemoveId] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleClick = (e,id) => {
        setAnchorEl(e.currentTarget);
        setCurrentRemoveId(id)
    };
    

    const ShowReplyChild = (replyId) => {
        if(replyId !== currentId){
            setCurrentId(replyId);
            setOpenReply(true);
        } else{
            setOpenReply(!openReply);
        }
    };

    const RenderReplyChild = (replyId,groupNo,replyName) => {
        return (
            <>
                {replyId === currentId &&
                    <ReplyChild >
                        <ReplyWriterContainer
                            replyId={replyId}
                            depth={1}
                            groupNo={groupNo}
                            siblingName={replyName}
                            refetch={refetch}
                            setOpenReply={setOpenReply}
                        />
                    </ReplyChild >
                }
            </>
        )
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSnackbaraVariant = (variant) => {
      let msg;
      switch (variant) {
        case 'success':
          msg = '댓글을 삭제했어요 :)'
          break;
        case 'warning':
          msg = '비밀번호가 틀려요 :('
          break;
        default:
            break;
      }
      const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
    };

    const [ removeReply ] = useMutation(RemoveReply)

    const doRemoveReply = () => {
        const password = document.getElementById('pop__password').value;

        const success = removeReply({ variables: {id: currentRemoveId, password: String(password)}})

        success.then(({data})=> {
            // gql server 로 부터의 return 은 delete count. 즉,  0보다 크면 성공.
            if(data.removeReply > 0) {
                handleSnackbaraVariant('success')
                handleClose();
                refetch();
            } else {
                handleSnackbaraVariant('warning')
            }
        })

    }

    return (
        <ReplyList
            replyList={replyList}
            open={open}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            openReply={openReply}
            ReplyChild={ReplyChild}
            ShowReplyChild={ShowReplyChild}
            doRemoveReply={doRemoveReply}
            RenderReplyChild={RenderReplyChild}
        />

    )

}

export default ReplyListContainer;