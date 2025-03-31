import React, {useState} from "react";
import Select from "react-select";

interface OptionType {
    value: string;
    label: string;
}

interface DropdownProps {
    name: string;
    options: OptionType[];
    label?: string;
    onChange: (name: string, selected: OptionType | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, options, label, onChange }) => {
    const handleChange = (selected: OptionType | null) => {
        onChange(name, selected);
    };

    return (

        <div className="flex flex-col gap-2 w-64">
            {label && <label className="font-semibold">{label}</label>}
            <Select
                options={options}
                onChange={handleChange}
                placeholder="Select an option"
                isSearchable
                isClearable
            />
        </div>
    );
};

export default Dropdown;
