
import React from 'react';
import { render } from "@testing-library/react";
import Header from '../Header';

describe('Header tests', () => {
    it('should contains the heading Marvel', () => {
        let { getByText } = render(<Header />);
        expect(getByText("Marvel")).toBeInTheDocument()
    });
});