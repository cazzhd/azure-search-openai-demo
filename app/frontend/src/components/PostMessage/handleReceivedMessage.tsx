import { actionsMap } from "./ActionsMessage";

const handleReceivedMessage = (methodName: string, data: any[]) => {
    console.log("handleReceivedMessage", methodName, data);

    if (actionsMap[methodName]) {
        actionsMap[methodName](data);
    } else {
        console.log("Unknown action:", methodName);
    }
};

export default handleReceivedMessage;
