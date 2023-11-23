import React, { useEffect } from "react";
import { POST_MESSAGE_TARGET_ORIGIN } from "../../Constants";

type Props = {
    onMessageReceived: (methodName: string, data: any[]) => void;
    fromTargetOrigin?: string; // fromTargetOrigin opcional
};

const ReceiveMessage: React.FC<Props> = ({ onMessageReceived, fromTargetOrigin = POST_MESSAGE_TARGET_ORIGIN }) => {
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === fromTargetOrigin) {
                const { methodName, data } = event.data;
                onMessageReceived(methodName, data);
            }
        };

        // Agrega el eventListener al montar el componente
        window.addEventListener("message", handleMessage);

        // Devuelve una función de limpieza que eliminará el eventListener al desmontar el componente
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [onMessageReceived, fromTargetOrigin]); // Asegúrate de incluir onMessageReceived y fromTargetOrigin como dependencias

    // Renderiza null para no incluir nada en el DOM
    return null;
};

export default ReceiveMessage;
