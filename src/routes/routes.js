import Bank from "../Components/Bank/Bank";
import Inventory from "../Components/Inventory/Inventory";
import CharacterSelector from "../Components/CharacterSelector/CharacterSelector";
import Phone from "../Components/Phone/Main/Phone";

export const routes = [
    { path: "/bank", Component: Bank },
    { path: "/phone", Component: Phone },
    { path: "/inventory", Component: Inventory },
    { path: "/characterSelector", Component: CharacterSelector }
]