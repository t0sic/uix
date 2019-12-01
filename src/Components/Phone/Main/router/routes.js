import SettingsBackground from "../../Apps/Settings/SettingsBackground";
import SettingsRingTone from "../../Apps/Settings/SettingsRingTone";
import SettingsThemes from "../../Apps/Settings/SettingsThemes";
import SettingsAddBg from "../../Apps/Settings/SettingsAddBg";
import ContactCreate from "../../Apps/Contacts/ContactCreate";
import SettingsCall from "../../Apps/Settings/SettingsCall";
import MessagesAll from "../../Apps/Messages/MessagesAll";
import Favorites from "../../Apps/Contacts/Favorites";
import Settings from "../../Apps/Settings/Settings";
import Messages from "../../Apps/Messages/Messages"; 
import Contacts from "../../Apps/Contacts/Contacts";
import Contact from "../../Apps/Contacts/Contact";
import Recent from "../../Apps/Contacts/Recent";
import Kepad from "../../Apps/Contacts/Keypad";
import Images from "../../Apps/Camera/Images";
import Image from "../../Apps/Camera/Image";
import Home from "../../Apps/Home/Home";

export const routes = [
    { path: "settings-background-add", name: "settings-background-add", Component: SettingsAddBg },
    { path: "settings-background", name: "settings-background", Component: SettingsBackground },
    { path: "settings-ring-tone", name: "settings-ring-tone", Component: SettingsRingTone },
    { path: "contacts-favorites", name: "contacts-favorites", Component: Favorites },
    { path: "settings-themes", name: "settings-themes", Component: SettingsThemes },
    { path: "contact-create", name: "contact-create", Component: ContactCreate },
    { path: "settings-call", name: "settings-call", Component: SettingsCall },
    { path: "contacts-recent", name: "contacts-recent", Component: Recent },
    { path: "messages-all", name: "messages-all", Component: MessagesAll },
    { path: "contacts-keypad", name: "contacts-keypad", Component: Kepad },
    { path: "settings", name: "settings", Component: Settings },
    { path: "contacts", name: "contacts", Component: Contacts },
    { path: "messages", name: "messages", Component: Messages },
    { path: "contact", name: "contact", Component: Contact },
    { path: "images", name: "images", Component: Images },
    { path: "image", name: "image", Component: Image },
    { path: "home", name: "home", Component: Home },
]