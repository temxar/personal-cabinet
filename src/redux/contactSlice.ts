import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../models/Contact";
import { v4 as uuidv4 } from "uuid";

const initialState = [] as IContact[];

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: {
      reducer: (state, action: PayloadAction<IContact>) => {
        state.push(action.payload);
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          completed: false,
        } as IContact,
      }),
    },
    removeContact(state, action: PayloadAction<string>) {
      const index = state.findIndex((contact) => contact.id === action.payload);
      state.splice(index, 1);
    },
    setContactStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((contact) => contact.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const { addContact, removeContact, setContactStatus } = contactSlice.actions;
export default contactSlice.reducer;