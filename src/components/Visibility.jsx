import React, { useState,useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import {API_BASE_URL} from '../api.config.js';

function Visibility() {

const [options, setOptions] = useState([]);

useEffect(() => {
  fetch(`${API_BASE_URL}/v1/broker/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
    .then(response => response.json())
    .then(data => {
      const formattedOptions = data.map(broker => ({
        label: `${broker.brokerName}(${broker.brokerCode})`,
        value: broker.brokerCode
      }));
      setOptions(formattedOptions);
    });
}, []);

  const [selected, setSelected] = useState([]);

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
  };



  return (
    <div className="mt-3">
        <label>Visibility:</label>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleSelect}
        labelledBy={"Select"}
        isCreatable={true}
      />
     
    </div>
  );
}

export default Visibility;
