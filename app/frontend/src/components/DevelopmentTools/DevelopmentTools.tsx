import { ClearChatButton } from "../ClearChatButton";
import { SettingsButton } from "../SettingsButton";
import styles from "./DevelopmentTools.module.css";

interface Props {
    clearChat: () => void;
    setIsConfigPanelOpen: (isOpen: boolean) => void;
    lastQuestionRef: React.MutableRefObject<string>;
    isLoading: boolean;
    isConfigPanelOpen: boolean;
}

export const DevelopmentTools = ({ clearChat, setIsConfigPanelOpen, lastQuestionRef, isLoading, isConfigPanelOpen }: Props) => {
    return (
        <div className={styles.commandsContainer}>
            <ClearChatButton className={styles.commandButton} onClick={clearChat} disabled={!lastQuestionRef.current || isLoading} />
            <SettingsButton className={styles.commandButton} onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} />
        </div>
    );
};
