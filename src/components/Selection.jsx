import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

function Selection() {
  const options = [
    { label: "Date Of Birth", value: "dob" },
    { label: "Sales Manager", value: "sales" },
    { label: "First Policy Issue Date", value: "issue" },
    { label: "Client Name (Chi)", value: "client-chi" },
    { label: "Client Name (Eng)", value: "client-eng" },
    { label: "Company Name", value: "company" },
    { label: "Latest Issued Policy", value: "latest-policy" },
    { label: "Broker / Agent Code", value: "broker-code" },
  ];

  const [selected, setSelected] = useState([]);

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
  };

  const handleCancel = (optionToRemove) => {
    const newSelected = selected.filter((option) => option !== optionToRemove);
    setSelected(newSelected);
  };

  return (
    <div>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleSelect}
        labelledBy={"Select"}
        isCreatable={true}
      />
      {selected.map((option) => (
        <div className="mt-2" key={option.value}>
          <label>{option.label}:</label>
          <div className="flex">
            <input
              className="rounded mr-2"
              type="text"
              readOnly={true}
              
            />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleCancel(option)}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Selection;
