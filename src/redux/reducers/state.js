export const state = {
    application: {
        path: "",
        time: new Date()
    },
    world: {
        time: "12:45"
    },
    player: {
        name: "t0sic",
        characters: [
            // { name: "Abdi Aventador", id: "2001-01-02", jobb: "police", rank: "mästare", number: "076-21 212 76", cash: 30021, bank: 500000 },
            // { name: "David Topplock", id: "2001-09-24", jobb: "korvgubbe", rank: "erfaren", number: "072-12 843 12", cash: 10, bank: 2023 },
            // { name: "Abdi Aventador", id: "2001-01-02", jobb: "police", rank: "mästare", number: "076-21 212 76", cash: 30021, bank: 500000 },
        ],
        character: {
            name: "Abdi",
            lastname: "Aventador",
            id: "p493-9428-fjs3-86dk",
            dob: "2002-09-24-7658",
            gender: "M",
            inventory: {
                leftContainer: [
                    {
                        label: "Inventory", action: "inventory", maxWeight: 20, slots: 30, items: [
                            { name: "lockpick", label: "Lockpick", weight: 0.2, count: 10, usable: false, slot: 2 }
                        ]
                    }
                ],
                rightContainer: [
                    {
                        label: "Marken", action: "ground", slots: 25, items: [
                            { name: "lockpick", label: "Lockpick", weight: 0.2, count: 12, usable: false, slot: 5 }
                        ]
                    },
                    // {
                    //     label: "Backlucka", action: "backlucka", slots: 30, items: [
                    //         // { name: "lockpick", label: "Lockpick", weight: 0.2, count: 10, usable: false, slot: 2 }
                    //     ]
                    // }
                ]
            },
            equipedWeapon: {
                name: "weapon_pistol",
                label: "M1911",
                ammo: {
                    mag: 120,
                    loaded: 20
                }
            }
        }
    },
    apps: {
        bank: {
            accounts: [
                {
                    balance: 5429, accountNumber: "4938 4893 2103 1002",
                    data: [
                        // { month: "Jan", moneyMade: 20000 },
                        // { month: "Feb", moneyMade: 1201 },
                        // { month: "Mar", moneyMade: 548 },
                        // { month: "Apr", moneyMade: 3939 },
                        // { month: "May", moneyMade: 221 },
                        // { month: "Jun", moneyMade: 2110 },
                        // { month: "Jul", moneyMade: 5030 },
                        // { month: "Aug", moneyMade: 9291 },
                        // { month: "Sep", moneyMade: 4392 },
                        // { month: "Oct", moneyMade: 2219 },
                        // { month: "Nov", moneyMade: 2211 },
                        // { month: "Dec", moneyMade: 7683 }
                    ],
                    recentTransactions: [
                        // { value: 10329, date: new Date(), label: "Swish" },
                        // { value: -200, date: new Date(), label: "Mat Dax" },
                        // { value: -5400, date: new Date(), label: "Swish Betalning" },
                        // { value: 3982, date: new Date(), label: "Irakisk Köket" },
                        // { value: -499, date: new Date(), label: "Swish Betalning" },
                        // { value: -1300, date: new Date(), label: "Mekonomen" },
                        // { value: 100, date: new Date(), label: "Fund Received" },
                    ]
                },
                {
                    balance: 122229, accountNumber: "4837 2378 7672 3784",
                    data: [
                        // { month: "Jan", moneyMade: 140302 },
                        // { month: "Feb", moneyMade: 13921 },
                        // { month: "Mar", moneyMade: 32988 },
                        // { month: "Apr", moneyMade: 39829 },
                        // { month: "May", moneyMade: 22121 },
                        // { month: "Jun", moneyMade: 21330 },
                        // { month: "Jul", moneyMade: 40000 },
                        // { month: "Aug", moneyMade: 10000 },
                        // { month: "Sep", moneyMade: 43238 },
                        // { month: "Oct", moneyMade: 32229 },
                        // { month: "Nov", moneyMade: 19999 },
                        // { month: "Dec", moneyMade: 73828 }
                    ],
                    recentTransactions: [
                        // { value: 4000, date: new Date(), label: "Fund Received" },
                        // { value: -200, date: new Date(), label: "ICA" },
                        // { value: -300, date: new Date(), label: "Swish Betalning" },
                        // { value: 10000, date: new Date(), label: "Fund Received" },
                        // { value: -30, date: new Date(), label: "Jonas Cafe" },
                        // { value: -850, date: new Date(), label: "IKEA Möbler" },
                        // { value: 10000, date: new Date(), label: "Fund Received" },
                    ]
                },
                {
                    balance: 5429, accountNumber: "7698 2538 8567 2572",
                    data: [
                        // { month: "Jan", moneyMade: 2000 },
                        // { month: "Feb", moneyMade: 500 },
                        // { month: "Mar", moneyMade: 548 },
                        // { month: "Apr", moneyMade: 900 },
                        // { month: "May", moneyMade: 1900 },
                        // { month: "Jun", moneyMade: 930 },
                        // { month: "Jul", moneyMade: 500 },
                        // { month: "Aug", moneyMade: 1000 },
                        // { month: "Sep", moneyMade: 328 },
                        // { month: "Oct", moneyMade: 229 },
                        // { month: "Nov", moneyMade: 600 },
                        // { month: "Dec", moneyMade: 700 }
                    ],
                    recentTransactions: [
                        // { value: 4000, date: new Date(), label: "Fund Received" },
                        // { value: -200, date: new Date(), label: "ICA" },
                        // { value: -300, date: new Date(), label: "Swish Betalning" },
                        // { value: 10000, date: new Date(), label: "Fund Received" },
                        // { value: -30, date: new Date(), label: "Jonas Cafe" },
                        // { value: -850, date: new Date(), label: "IKEA Möbler" },
                        // { value: 10000, date: new Date(), label: "Fund Received" },
                    ]
                },
            ]
        }
    },
    rendered: {
        dialog: {
            display: false,
            header: "Enter amount",
        },
        menu: {
            index: 0,
            menus: [
                // {
                //     name: "wow-1", label: "Glitched menu", focus: true, elements: [
                //         { text: "Inspect Item", type: "default", state: "disabled" },
                //         { text: "Inspect Item", type: "checkbox", state: true },
                //         { text: "Inspect Item", type: "slider", state: { value: 1, max: 100, min: 0 } },
                //         { text: "Inspect Item", type: "default", state: "" },
                //         { text: "Inspect Item", type: "default", state: "" },
                //         { text: "Inspect Item", type: "default", state: "" },
                //         { text: "Inspect Item", type: "default", state: "" },
                //         { text: "Inspect Item", type: "default", state: "" },
                //         { text: "Inspect Item", type: "default", state: "" },
                //         { text: "Inspect Item", type: "default", state: "" },
                //     ]
                // }
            ]
        },
        threeDMarker: {
            markers: [
                // { x: 0.5, y: 0.5, scale: 1, text: "Påbörja uppdrag", id: "test" },
            ]
        },
        comfirm: {
            display: false,
            title: "Pay",
            text: "Do you really want to payäää?",
            yes: "Yes",
            no: "No"
        },
        hud: {

        },
    },
}