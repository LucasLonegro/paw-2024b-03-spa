import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define your translation resources with types
const resources = {
    en: {
        translation: {
            "welcome": "Welcome to the app!",
            "description": "This is a sample application.",
        },
    },
    es: {
        translation: {
            "welcome": "Bienvenido a la aplicación!",
            "description": "Esta es una aplicación de ejemplo.",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;
