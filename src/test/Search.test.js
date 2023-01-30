
import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Search from '../Search';

describe('Header tests', () => {
    const props = {
        handleSearch : (event) => {console.log(event)}
    }
    const setup = () => {
        const utils = render(<Search {...props}/>)
        const input = utils.getByLabelText('search_input')
        return {
          input,
          ...utils,
        }
      }
    it('should contains the placeholder for search', () => {
        let { getByPlaceholderText } = render(<Search />);
        expect(getByPlaceholderText("Search for comics")).toBeInTheDocument()
    });
    it('should contains the placeholder for search', () => {
        
        const {input} = setup()
        fireEvent.change(input, {target: {value: 'Antman'}})
        expect(input.value).toBe('Antman')
    });

});