import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    const tron = Reactotron.configure()
        .useReactNative()
        .connect();

    console.tron = tron;

    // dá um refresh e limpa tudo depois do reload
    tron.clear();
}
