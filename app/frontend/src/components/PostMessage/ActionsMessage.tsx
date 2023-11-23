export const actionsMap: Record<string, (args: any[]) => void> = {
    sendMessageChild: args => {
        console.log("Executing sendMessageChild with args:", args);
    }
};
