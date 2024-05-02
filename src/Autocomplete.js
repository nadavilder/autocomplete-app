import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function AutocompleteSelect() {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get(`https://epsg.io/?format=json&trans=1&q=${inputValue}`)
            .then(response => {
                if (response.data && response.data.results) {
                    const formattedOptions = response.data.results.map(item => ({
                        label: `${item.name} (${item.code})`,
                        value: item.code
                    }));
                    setOptions(formattedOptions);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [inputValue]);

    const handleInputChange = newValue => {
        setInputValue(newValue);
    };

    return (
        <Select
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            placeholder="Enter a code..."
            isClearable="true"
        />
    );
}

export default AutocompleteSelect;
