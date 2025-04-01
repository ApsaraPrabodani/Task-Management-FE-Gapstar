import React from 'react'

interface TaskProps {
	data: any,
	setShowCofirmationModal: React.Dispatch<React.SetStateAction<boolean>>,
	setSelectedTaskId: any,
	handleCompleteTask: any
	setShowAddDependencyModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Task: React.FC<TaskProps> = ({ data, setShowCofirmationModal, setSelectedTaskId, handleCompleteTask, setShowAddDependencyModal}) => {
	return (
		<tr>
			<td className="p-4 border-b border-blue-gray-50">
				<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
					{data.title}
				</p>
			</td>
			<td className="p-4 border-b border-blue-gray-50">
				<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
					{data.status}
				</p>
			</td>
			<td className="p-4 border-b border-blue-gray-50">
				<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
					{data.priority}
				</p>
			</td>
			<td className="p-4 border-b border-blue-gray-50">
				<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
					
				</p>
			</td>
			<td className="p-4 border-b border-blue-gray-50">
				<button
					className="bg-blue-500 text-white px-2 py-2 text-xs rounded hover:bg-blue-600"
					onClick={() => {
						handleCompleteTask(data.id)
					}}
				> Complete
				</button>
				<button
					className="bg-red-500 text-white px-2 py-2 text-xs rounded hover:bg-red-600"
					onClick={() => { 
						setShowCofirmationModal(true);
						setSelectedTaskId(data.id);
					}}
				> Delete
				</button>
				<button
					className="bg-green-500 text-white px-2 py-2 text-xs rounded hover:bg-green-600"
					onClick={() => { 
						setShowAddDependencyModal(true)
					}}
				> Add Dependency
				</button>

			</td>
		</tr>
	)
}

export default Task