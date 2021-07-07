import styled from "styled-components";

const ReplyHeaderWrapper = styled.div`
    display: block;
    padding: 16px;
    background-color: #FFFFFF;

    & .reply__title{
        display: inline;
        line-height: 21px;
        color: #1E2022;
    }

    & .reply__count {
        display: inline;
        font-size: 14px;
        color: ${({theme}) => theme.palette.gray6};
        margin: 0 8px;
    }

`;

const ReplyHeader = ({replyList}) => {
    return (
        <ReplyHeaderWrapper >
            <h4 className="reply__title">댓글</h4>
            <span className="reply__count">총 {replyList.length} 개</span>
        </ReplyHeaderWrapper>
    )

};

export default ReplyHeader;