import i18n from "i18next";
import en from "./translations/en.json";

const resources = {
    en: {
        translation: en,
    },
}

const newInstance = i18n.createInstance()

newInstance.init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources,
})

export default newInstance;
