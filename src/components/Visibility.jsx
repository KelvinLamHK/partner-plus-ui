import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

function Visibility() {
  const options = [
    { label: "Convoy xxxxxxxxx xxxxxxxx Ltd.(0308927)", value: "dob" },
    { label: "Rhoba xxxxxxxxx xxxxxxxx Ltd.(0309648)", value: "sales" },
    { label: "KGI  xxxxxxxxxx xxxxxxxxxx Ltd.(0310328)", value: "issue" },
    { label: "Administration xxxxxxxx Limited(0362670)", value: "client-chi" },
    { label: "JA xxxxxxxxx xxxxx xx Limited(0362964)", value: "client-eng" },
    { label: "Pegasus xxxxxx xxxxxxxxxx Ltd.(0363138)", value: "company" },
    { label: "Pegasus xxxxxx xxxxxxxxxx Ltd.(0363146)", value: "latest-policy" },
    { label: "PC xxxxxxxxxxxxx LIMITED(0367419)", value: "broker-code" },
  ];

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
