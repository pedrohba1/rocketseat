/* eslint-disable react/static-property-placement */
import React from 'react';
import {WebView} from 'react-native-webview';

function Repository({route}) {
    const {repo} = route.params;

    return <WebView source={{uri: repo.html_url}} style={{flex: 1}} />;
}

export default Repository;
