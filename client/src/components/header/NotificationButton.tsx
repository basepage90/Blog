import React from "react";
import { NotificationList } from 'gql/query';
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { updateFucusNoti } from "store/store";

import IconButton from '@material-ui/core/IconButton';
import NotificationImportantOutlined from '@material-ui/icons/NotificationImportantOutlined';
import Notifications from '@material-ui/icons/Notifications';

function NotificationButton() {
    const { loading, data } = useQuery(NotificationList, {
        variables: { reading_status: "UNREAD" },
        fetchPolicy: 'network-only'
        // fetchPolicy: "cache-first",
    });

    const dispatch = useDispatch();

    const showNotification = () => {
        dispatch(updateFucusNoti());
    }

    const getUnreadCount = (notificationList: Array<Object>) => {
        let count = 0
        notificationList.forEach((notification: any) => {
            if (notification.reading_status === "UNREAD") {
                count++;
            }
        });
        return count;
    }

    return (
        <IconButton color="inherit" onClick={showNotification} >
            {!loading && getUnreadCount(data.notificationList) > 0 ?
                <NotificationImportantOutlined />
                :
                <Notifications />
            }
        </IconButton>
    );
};

export default NotificationButton;