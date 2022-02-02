import React, { useRef } from "react";
import styled from 'styled-components'
import { NotificationList, GetArticlesList } from 'gql/query';
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

import NotificationCard from "components/card/NotificationCard"
import NotificationContainer from "components/common/layoutContainer/NotificationContainer"

const Div = styled.div<{ focus: boolean }>`
    visibility: ${props => !props.focus && 'hidden'};
    & > * {
        visibility: ${props => !props.focus && 'hidden'};
    }
    transition-property: visibility;
    transition-duration: ${({ theme }) => theme.transition.duration.shortest};
    position: absolute;
    z-index: 2000;
    top: 64px;
    right: 8px;
    width: 80%;
    height: auto;
    max-width: 310px;
    max-height: 600px;
    border-radius: 6px;
    box-shadow: ${({ theme }) => theme.shadow[10]};
    background-color: #FAFAFA;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px grey; 
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.palette.gray5}; 
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.palette.gray6}; 
    }
`;


function NotificationViewer() {
    const { focusNoti } = useSelector((state: RootState) => ({ focusNoti: state.notification.focusNoti }));

    const { loading, data, refetch } = useQuery(NotificationList, {
        fetchPolicy: 'network-only'
        // fetchPolicy: "cache-first",
    });

    const GetArticlesListQuery = useQuery(GetArticlesList, {
        variables: { limit: 10000 },
        fetchPolicy: 'network-only'
        // fetchPolicy: "cache-first",
    });

    const loading2 = GetArticlesListQuery.loading;
    const data2 = GetArticlesListQuery.data;

    const checker = useRef<HTMLElement>();

    if (!loading && !loading2) {
        return (
            <Div focus={focusNoti} >
                <NotificationContainer className="sub__container" ref={checker} checker={checker} >
                    {data.notificationList.map((noti: any) => {
                        return data2.articlesList.map((article: any) => {
                            if (noti.article_id === article.id) {
                                return <NotificationCard data={noti} articleData={article} refetch={refetch} />;
                            }
                            return null;
                        });
                    })}
                </NotificationContainer>
            </Div>
        )
    }

    return null;
}

export default NotificationViewer;    