import {configureStore} from "@reduxjs/toolkit";
import feedSlice from "./feedSlice";

import userSlice from "./userSlice";
import connectionSlice from "./connectionSlice"
const appStore = configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        connection:connectionSlice
    }
});

export default appStore;