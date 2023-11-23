import StartWarsCharactersVersion from "./versionStarwars";

const correspondenceShorMode: { [key: string]: string } = {
    development: "dev",
    production: "prod",
    stage: "stage"
};

function getCurrentDateAndCharacter(): { currentDate: string; character: string } {
    let date = new Date();
    let month = date.getMonth() + 1;

    let character = StartWarsCharactersVersion[month] || StartWarsCharactersVersion[1];

    let currentDate = date.getFullYear() + "-" + month + "-" + date.getDate();
    return { currentDate, character };
}

function generateVersion(numberVersion: string, mode: string = "development"): string {
    let { currentDate, character } = getCurrentDateAndCharacter();
    return `${numberVersion}_${mode}_${currentDate}_${character}`;
}

function getShortMode(mode: string): string {
    return correspondenceShorMode[mode] || "dev";
}

export { generateVersion, getShortMode };
