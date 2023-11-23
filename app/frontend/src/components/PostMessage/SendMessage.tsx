import { POST_MESSAGE_TARGET_ORIGIN } from "../../Constants";

type MessageData = {
    action: string;
    args?: any;
};

const sendMessageToParent = (data: MessageData, targetOrigin: string = POST_MESSAGE_TARGET_ORIGIN): void => {
    console.log("sendMessageToParent", data, targetOrigin);
    window.parent.postMessage(data, targetOrigin);
};

export default sendMessageToParent;
