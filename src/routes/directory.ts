import { BASE_CLIENT_URL } from "."
import { locationName } from "../utils/types";

function backPathFromLocationName (backLocationName : locationName){
    if (backLocationName === "Wishlist"){
        return `${BASE_CLIENT_URL}/login`
    } else if (backLocationName === "Movie List"){
        return `/${BASE_CLIENT_URL}`
    }
}

// const backPathFromLocationName = {
//     "Wishlist" : `/${BASE_CLIENT_URL}/wishlist`,
//     "Movie List" : `/${BASE_CLIENT_URL}`
// }

export default backPathFromLocationName;