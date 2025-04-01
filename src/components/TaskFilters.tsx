import React, { useState } from 'react';
import Dropdown from './common/Dropdown';

const statusOptions = [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' }
]

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
]

interface FilterProps {
    setSelectedFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string | null }>>;
}

// const TaskFilters: React.FC = () => {
const TaskFilters: React.FC<FilterProps> = ({ setSelectedFilters }) => {
    const handleSelection = (name: string, selected: { value: string; label: string } | null) => {
        setSelectedFilters((previous) => ({
            ...previous,
            [name]: selected?.value || null
        }));
    };

    return (
        <div className='p-4'>
            <div className="flex gap-4">
                <Dropdown name="status" label="STATUS" options={statusOptions} onChange={handleSelection}/>
                <Dropdown name="priority" label="PRIORITY" options={priorityOptions} onChange={handleSelection} />
            </div>
        </div>
    )
}

export default TaskFilters;
