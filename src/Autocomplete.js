import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function AutocompleteSelect() {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option


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
    const handleChange = selected => {
        setSelectedOption(selected); // Update the state with the new selected option
    };

    return (
        <div>

            <Select
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={handleChange}
                options={options}
                placeholder="Enter a code..."
                isClearable="true"
            />
            {selectedOption && <h2> {selectedOption.label}</h2>} 
        </div>
    );
}

export default AutocompleteSelect;
