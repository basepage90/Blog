import React from "react";
import IconButton from '@material-ui/core/IconButton';
import { NotificationList } from 'gql/query';
import { useQuery } from "@apollo/client";
import NotificationImportantOutlined from '@material-ui/icons/NotificationImportantOutlined';
import Notifications from '@material-ui/icons/Notifications';

function NotificationButton(){
    const UnreadNotificationListQuery  = useQuery(NotificationList,{
        variables: {reading_status: "UNREAD"},
        fetchPolicy: 'network-only'
        // fetchPolicy: "cache-first",
    });

    const loadingUnread = UnreadNotificationListQuery.loading;
    const dataUnread = UnreadNotificationListQuery.data;
    // const refetchUnread = UnreadNotificationListQuery.refetch;
    
    return (
            <IconButton color="inherit" >
                {!loadingUnread && dataUnread.notificationList.length > 0 ?
                    <NotificationImportantOutlined />
                :
                    <Notifications />
                }
            </IconButton>
    );
};

export default NotificationButton;