const isLocal = process.env.REACT_APP_MODE === "local";

export const BaseURL = isLocal ? "http://localhost" : "https://crispyblog.kr";
export const ClientPort = isLocal ? ":3000" : ":443";
export const ServerPort = ":5000";