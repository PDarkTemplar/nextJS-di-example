import React from 'react';
import { configure } from 'mobx';
import { AppProps } from 'next/app';

import 'reflect-metadata';
import { useStaticRendering } from 'mobx-react';

import { withProvider } from 'common-components/HOC';

import defaultContainer from 'stores/default.container';

configure({ enforceActions: 'observed' });
useStaticRendering(typeof window === 'undefined');

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

const wrapped = withProvider(App, defaultContainer);

export default wrapped;
