import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { rootReducer } from "@store/index";

interface WrapperProps {
    children?: React.ReactNode
}

const render = (ui: any, { initialState = {} } = {}) => {
    const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

    const Wrapper = ({ children }: WrapperProps) => {
        return (
            <Provider store={store}>
                { children }
            </Provider>
        );
    };

    return rtlRender(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react';

export { render };