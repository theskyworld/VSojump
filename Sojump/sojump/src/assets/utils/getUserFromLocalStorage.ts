import { USERNAME_KEY } from "../ts/constants";

export default function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem(USERNAME_KEY)!);
}