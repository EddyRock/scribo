// import { configureStore } from '@reduxjs/toolkit';
//
// import rootReducer from '@/store/reducers/root-reducer.ts';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
//
// const persistConfig = {
//   key: 'root',
//   storage
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
//       }
//     })
// });
//
// export const persistor = persistStore(store);
// export default store;
