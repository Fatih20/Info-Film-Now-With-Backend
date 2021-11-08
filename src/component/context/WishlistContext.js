import React, { useContext, useState, useEffect } from "react";

const WishlistContext = React.createContext();
const RemoveFromWishlistContext = React.createContext();
const AddToWishlistContext = React.createContext();

export function useWishlist(){
    return useContext(WishlistContext);
}

export function useRemoveFromWishlist(){
    return useContext(RemoveFromWishlistContext);
}

export function useAddToWishlist(){
    return useContext(AddToWishlistContext);
}

export function WishlistProvider({ children }){
    const[wishlist, setWishlist] = useState([]);

    useEffect(()=>{
        const wishlistCandidate = JSON.parse(localStorage.getItem("Wishlist"));
        if (wishlistCandidate !== undefined && wishlistCandidate !== null){
            setWishlist(wishlistCandidate);
        }
        return;
    }, []);

    useEffect(()=>{
        localStorage.setItem("Wishlist", JSON.stringify(wishlist));
        console.log(wishlist);
    }, [wishlist]);

    // localStorage.removeItem("Wishlist");

    function removeFromWishlist(movie){
        console.log("B");
        setWishlist((prevWishlist) => {
            let i = 0;
            for (const movieInWishlist of prevWishlist){
                if (JSON.stringify(movie) === JSON.stringify(movieInWishlist)){
                    return wishlist.splice(i, 1);
                }
                i = i+1;
            }
        });
    };

    function addToWishlist(movie){
        console.log("A");
        setWishlist((prevWishlist) => {
            let isInWishlist = false;
            for (const movieInWishlist of prevWishlist){
                if (JSON.stringify(movie) === JSON.stringify(movieInWishlist)){
                    isInWishlist = true;
                    break;
                }
            }
            if (isInWishlist === false){
                return(prevWishlist.concat([movie]));
            } else {
                return prevWishlist;
            }
        });
        
    };

    return (
        <WishlistContext.Provider value={wishlist}>
            <RemoveFromWishlistContext.Provider value={removeFromWishlist}>
                <AddToWishlistContext.Provider value={addToWishlist}>
                    { children }
                </AddToWishlistContext.Provider>
            </RemoveFromWishlistContext.Provider>
        </WishlistContext.Provider>
    )
}