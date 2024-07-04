import { configureStore } from "@reduxjs/toolkit";

import counterStoreSlice from "./storesSlice/counter";

export const store = configureStore({
    reducer: {
        counter: counterStoreSlice,
    },
});