import { Example } from "./Example";

import styles from "./Example.module.css";
import sendMessageToParent from "../PostMessage/SendMessage";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "What is Cognifit?",
        value: "What is Cognifit?"
    },
    { text: "Chat SF", value: "Chat SF" },
    { text: "How can I subscribe?", value: "How can I subscribe?" }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example
                        text={x.text}
                        value={x.value}
                        onClick={x.text === "Chat SF" ? () => sendMessageToParent({ action: "helloWorld", args: { param1: "hola" } }) : onExampleClicked}
                    />
                </li>
            ))}
        </ul>
    );
};
