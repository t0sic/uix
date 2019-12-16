export const state = {
    settings: {
        background: {
            id: 3,
            url:
                "https://i.pinimg.com/564x/eb/50/ec/eb50ec6a59041970f817ea4f4512c8d8.jpg",
            dark: true,
            label: "Dark Lake"
        },
        ringtone: {
            id: 1,
            ringtone: "songpop.oog",
            label: "See me Fall"
        },
        theme: { id: 1, type: "default" },
        mobileDataEnabled: true,
        customBackgrounds: [],
        disturbeMode: false,
        wifiEnabled: false,
        showNumber: true,
        planeMode: false,
        darkMode: true
    },
    status: {
        battery: 59
    },
    general: {
        appAnimationDuration: 500,
        displayBackground: true,
        darkBackground: false,
        showStatusBar: true,
        mobileData: true,
        appAnimation: "",
        classes: "",
        wifi: true,
        path: "home"
    },
    apps: {
        contact: {
            id: "4",
            quit: "home"
        },
        recent: [
            { number: "0743232332", time: new Date(), missed: true },
            { number: "0743232332", time: new Date() },
            { number: "0743232398", time: new Date() }
        ],
        contacts: [
            {
                number: "0746232332",
                id: "20",
                favorite: true,
                label: "Lamar"
            },
            { number: "0743232332", id: "1" },
            { number: "0743232332", favorite: true, id: "0" },
            { label: "Sbdi Aventador", number: "0743232332", id: "3" },
            { label: "Xbdi Aventador", number: "0743232332", id: "4" },
            { label: "Vbdi Aventador", number: "0743232332", id: "5" },
            { label: "Sbdi Aventador", number: "0743232332", id: "6" },
            { number: "0743232332", id: "7" }
        ],
        contactCreate: {
            quit: "home",
            label: "",
            number: ""
        },
        messages: {
            quit: "home",
            id: "0743232330",
            textarea: "",
            conversation: [
                {
                    text: "This looks sexy af",
                    time: new Date(),
                    recived: false
                },
                {
                    text:
                        "this will be cancer to make a navigation system for smh",
                    time: new Date(),
                    recived: true
                },
                {
                    text:
                        "This is a very long message <script>alert('wow')</script>a",
                    time: new Date(),
                    recived: false
                },
                {
                    text: "This looks sexy af",
                    time: new Date(),
                    recived: false
                },
                {
                    text:
                        "this will be cancer to make a navigation system for smh",
                    time: new Date(),
                    recived: true
                },
                {
                    text:
                        "This is a very long message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    time: new Date(),
                    recived: false
                },
                {
                    text: "This looks sexy af",
                    time: new Date(),
                    recived: false
                },
                {
                    text:
                        "this will be cancer to make a navigation system for smh",
                    time: new Date(),
                    recived: true
                },
                {
                    text:
                        "This is a very long message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    time: new Date(),
                    recived: false
                }
            ]
        },
        conversations: [
            {
                text:
                    "This is a very long message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                time: new Date(),
                number: "0743232332"
            },
            {
                text: "Yooo nigga",
                time: new Date(),
                number: "0746232332"
            },
            { text: "Nigga john", time: new Date(), number: "122" }
        ],
        notifications: [
            // {
            //     app: "messages-all",
            //     notifications: [
            //         { number: "0743232332" },
            //     ]
            // },
            // {
            //     app: "contacts",
            //     notifications: [
            //         { type: "recent", number: "0743232332" }
            //     ]
            // }
        ],
        image: {
            quit: "images",
            link: "https://i.imgur.com/1KQ2MLc.jpg",
            type: "default",
            action: {
                icon: "fas fa-trash",
                label: "Throw",
                action: "throwImage"
            }
        },
        images: {
            images: [
                {
                    time: new Date(),
                    link: "https://i.imgur.com/ua1IeVY.jpg"
                },
                {
                    time: new Date(),
                    link: "https://i.imgur.com/1KQ2MLc.jpg"
                }
            ],
            quit: "home"
        },
        settingAddBackgroundInputs: {
            url: "",
            label: ""
        },
        twitterInputs: {
            createAccount: {
                name: "",
                link: ""
            }
        }
    }
}
