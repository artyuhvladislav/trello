import { createSelector } from "@reduxjs/toolkit";

interface ISelector {
    column: {
        items: {
            title: string;
            cards: string[];
        }[];
    };
}

const itemsSelector = ({ column }: ISelector) => column;

export const memoizedItemsSelector = createSelector(itemsSelector, (column) => column)