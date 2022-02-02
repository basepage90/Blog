import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { ModifyReadingStatus } from 'gql/query';
import { useDispatch } from "react-redux";
import { updateFucusNoti } from "store/store";

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const Item = styled.div`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadow[1]};
    position: relative;
`;

const Article = styled.div<{ reading_status: string }>`
    border-radius: 0 0 12px 12px;
    display: flex;
    flex-direction: column;
    padding: 16px 16px 8px 16px;
    ${props => props.reading_status === 'READ' && 'opacity: 0.5;'}

    & p{
        flex: 1;
    }

    & span{
        font-size: 0.8rem;
    }

    & .title {
        flex:1 1 auto;
        color: #212429; 
        font-size: 1.1rem;
        font-weight: bold;
        margin: 0;
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .name, .contents {
        flex:2 2 auto;
        margin: 0;
        color: #444A55;
        font-size: 0.875rem;
        
        word-break: break-word;
        overflow-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    & .categoryInfo {
        color: #808999;
        display: flex;
        align-items: center;
        width: 40%;
    }
`;

interface NotificationCardProps {
    data: any;
    articleData: any;
    refetch: any;
}

const NotificationCard = ({ data, articleData, refetch }: NotificationCardProps) => {
    const { id, article_id, name, contents, reading_status } = data;
    const { title, category_lg, category_md } = articleData;
    const arrowIcon = <ArrowRightIcon key="arrow" />;

    const [modifyReadingStatus] = useMutation(ModifyReadingStatus);

    const changeReadingStatus = (id: string, reading_status: string) => {
        if (reading_status === "UNREAD") {
            modifyReadingStatus({
                variables: {
                    id: id,
                    reading_status: "READ",
                }
            })
            refetch();
        }
    }

    const dispatch = useDispatch();

    const closeNotification = () => {
        dispatch(updateFucusNoti());
    }

    return (
        <Link to={{ pathname: `/${category_lg}/${category_md}/${article_id}` }} style={{ textDecoration: 'none' }} onClick={() => { changeReadingStatus(id, reading_status); closeNotification(); }} >
            <Item >
                <Article reading_status={reading_status}>
                    <h4 className="title">{title}</h4>
                    <p className="name">{name}</p>
                    <p className="contents">{contents}</p>
                    <span className="categoryInfo">{category_lg}{arrowIcon}{category_md}</span>
                </Article>
            </Item>
        </Link>
    );
};

export default NotificationCard;