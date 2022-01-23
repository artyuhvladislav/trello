import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import reorderCardsHelper from "../helpers/reorderCardsHelper";

export interface IColumn {
  items: {
    title: string;
    cards: string[];
  }[];
}

export interface IAddCard {
  columnIndex: number;
  value: string;
}
export interface IAddColumn {
  title: string;
  cards: never[];
}
export interface IRemoveCard {
  columnIndex: number;
  cardIndex: number;
}

interface DraggableLocation {
  droppableId: string;
  index: number;
}
interface DragResult {
  destination?: DraggableLocation;
  source: DraggableLocation;
}

const initialState: IColumn = {
  items: [
    { title: "some title", cards: ["first", "second", "first"] },
    { title: "second title", cards: [] },
  ],
};

export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {

    addCard: (state, action: PayloadAction<IAddCard>) => {
      state.items.forEach((item, index) => {
        if (action.payload.columnIndex === index) {
          item.cards.push(action.payload.value);
        }
      });
    },

    addColumn: (state, action: PayloadAction<IAddColumn>) => {
      state.items.push(action.payload);
    },

    removeColumn: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item, index) => index !== action.payload
      );
    },

    removeCard: (state, action: PayloadAction<IRemoveCard>) => {
      state.items[action.payload.columnIndex].cards = state.items[
        action.payload.columnIndex
      ].cards.filter((item, index) => index !== action.payload.cardIndex);
    },

    reorderCards: (state, action: PayloadAction<DragResult>) => {
  
      const { source, destination } = action.payload;
  
      state.items = reorderCardsHelper({
        state: state.items,
        source,
        destination,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCard, addColumn, removeColumn, removeCard, reorderCards } =
  columnSlice.actions;

export default columnSlice.reducer;
