import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

function Category() {
  const options = [
    { label: "cate Eng2133434", value: "dob" },
    { label: "cate Eng213", value: "sales" },
    { label: "categoryEnglidd", value: "issue" },
    { label: "main cat Eng1", value: "client-chi" },
    { label: "Test Category", value: "client-eng" },
    { label: "categoryEnglish2b", value: "company" },
    { label: "test cat", value: "latest-policy" },
    { label: "Test Edit QA 001", value: "broker-code" },
  ];

  const [selected, setSelected] = useState([]);

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
  };



  return (
    <div className="mt-2">
        <label>Category:</label>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleSelect}
        labelledBy={"Select"}
        isCreatable={true}
        hasSelectAll={false}
      />
     
    </div>
  );
}

export default Category;
