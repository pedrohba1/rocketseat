import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'root',
            storage,
            // os reducers que precisarem de informação persistente precisam
            // estar escritos aqui.
            whitelist: ['auth', 'user'],
        },
        reducers
    );

    return persistedReducer;
};
