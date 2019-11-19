export const state = {
    settings: {
        background: { id: 1, url: "https://cdn.discordapp.com/attachments/638346400102481932/645020723227787281/glitched_1920x1080.png", dark: true, label: "Glitched" },
        customBackgrounds: [],
        theme: { id: 1, type: "default" },
        ringtone: { id: 1, ringtone: "songpop.oog", label: "See me Fall" },
        planeMode: false,
        mobileDataEnabled: true,
        wifiEnabled: false,
        disturbeMode: false,
        darkMode: true,
        showNumber: true
    },
    status: {
        battery: 43
    },
    general: {
        path: "contact-create",
        appAnimation: "",
        appAnimationDuration: 500,
        mobileData: true,
        wifi: true,
        darkBackground: true,
        displayBackground: true,
        showStatusBar: true,
    },
    apps: {
        contact: {
            id: "4",
            quit: "home"
        },
        recent: [
            { number: "074-32 323 32", time: new Date(), missed: true },
            { number: "074-32 323 32", time: new Date() },
            { number: "074-32 323 98", time: new Date() },
        ],
        contacts: [
            { number: "074-32 323 32", id: "1" },
            { number: "074-32 323 32", favorite: true, id: "0" },
            { label: "Sbdi Aventador", number: "074-32 323 32", id: "3" },
            { label: "Xbdi Aventador", number: "074-32 323 32", id: "4" },
            { label: "Vbdi Aventador", number: "074-32 323 32", id: "5" },
            { label: "Sbdi Aventador", number: "074-32 323 32", id: "6" },
            { number: "074-32 323 32", id: "7" },
        ],
        contactCreate: {
            label: "",
            number: ""
        }
    }
}