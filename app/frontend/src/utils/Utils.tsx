import { MODE } from "../Constants";

export const isProduction = (): boolean => {
    return MODE === "production";
};

export const isDevelopment = (): boolean => {
    return MODE === "development" || MODE === "stage";
};

export default {
    isProduction,
    isDevelopment
};
