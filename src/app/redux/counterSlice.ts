import { ProductType } from '@/types/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem extends ProductType {
  quantity: number;
}

interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface InitialState {
  cart: CartItem[];
  favorite: ProductType[];
  userInfo: UserInfo | null;
}

const initialState: InitialState = {
  cart: [],
  favorite: [],
  userInfo: null,
};

export const counterSlice = createSlice({
  name: "e-shop",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const productId = action.payload._id || action.payload.id;
      const existingProduct = state.cart.find(
        (item) => (item._id || item.id) === productId
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity:(state,action)=>{
      const productId = action.payload || action.payload;
      const existingProduct = state.cart.find(
        (item) => (item._id || item.id) === productId
      );
      if(existingProduct){
        existingProduct.quantity! +=1;
      }
    },
    decreaseQuantity:(state,action)=>{
      const productId = action.payload
      const existingProduct = state.cart.find(
        (item) => (item._id || item.id) === productId
      );
      if(existingProduct){
        existingProduct.quantity! -=1;
      }
    },
    removeFromCart:(state,action)=>{
      state.cart= state.cart.filter((items)=>(items._id || items.id) !== action.payload);
    },
    resetCart:(state)=>{
      state.cart=[];
    },
    addToFavorite: (state, action: PayloadAction<ProductType>) => {
      const productId = action.payload._id || action.payload.id;
      const existingProduct = state.favorite.find(
        (item) => (item._id || item.id) === productId
      );
      if (existingProduct) {
        state.favorite=state.favorite.filter(
          (items)=>((items.id) || (items._id)) !==productId
        )
      } else {
        state.favorite.push(action.payload );
      }
    },
    resetFavorite:(state)=>{
      state.favorite=[];
    }
  },
})

export const { addToCart , increaseQuantity , decreaseQuantity , addToFavorite , resetCart , removeFromCart , resetFavorite} = counterSlice.actions
export default counterSlice.reducer