import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from './App';

describe('<App />', () => {
    it('should render the Learn React Link', () => {
        const { getByText } = render(<App />);
        expect(getByText('Learn React')).toBeInTheDocument();
    });
});
