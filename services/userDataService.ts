import { db } from '../config/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { StoredCartItem, StoredWishlistItem } from '../types';

interface UserData {
  cart: StoredCartItem[];
  wishlist: StoredWishlistItem[];
}

const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const updateUserCart = async (userId: string, cart: StoredCartItem[]): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    // Use setDoc with merge:true to create or update the document without overwriting other fields
    await setDoc(userDocRef, { cart }, { merge: true });
  } catch (error) {
    console.error("Error updating user cart:", error);
  }
};

const updateUserWishlist = async (userId: string, wishlist: StoredWishlistItem[]): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { wishlist }, { merge: true });
  } catch (error) {
    console.error("Error updating user wishlist:", error);
  }
};

// A hook-like structure to export these functions
export const useUserData = () => {
  return {
    getUserData,
    updateUserCart,
    updateUserWishlist,
  };
};