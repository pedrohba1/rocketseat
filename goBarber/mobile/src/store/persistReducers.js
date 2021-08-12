import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'root',
            storage: AsyncStorage,
            // os reducers que precisarem de informação persistente precisam
            // estar escritos aqui.
            whitelist: ['auth', 'user'],
        },
        reducers
    );

    return persistedReducer;
};
