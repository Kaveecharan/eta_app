import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    notificationCount: 0
  },
  reducers: {
    addItem: (state, action) => {
        console.log('addItem reducer: ', action);
      const { id, image, name, quantity, price } = action.payload;
      const item = {
        id,
        image,
        name,
        quantity,
        price,
        totalPrice: price * quantity,
      };
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index].quantity += quantity;
        state.items[index].totalPrice += item.totalPrice;
      } else {
        state.items.push(item);
      }
      state.total += item.totalPrice;
      state.notificationCount++;
    },
    removeItem: (state, action) => {
        const { id, quantity, price } = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.items[index].quantity -= quantity;
          state.items[index].totalPrice -= price;
          if (state.items[index].quantity === 0) {
            state.items.splice(index, 1);
          }
          state.total -= price;
        }
      },
    clearNotificationCount: (state) => {
        state.notificationCount = 0;
      },
      emptyTheCart: (state) => {
        state.items = [];
        state.total = 0;
        state.notificationCount = 0;
      }
  },
});

export const { addItem, removeItem, clearNotificationCount, emptyTheCart } = cartSlice.actions;

export default cartSlice.reducer;