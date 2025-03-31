// src/components/Greeting.tsx
import React from 'react'

interface TaskProps {
	data: any
}

const Task: React.FC<TaskProps> = ({ data }) => {
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
					23/04/18
				</p>
			</td>
			<td className="p-4 border-b border-blue-gray-50">
				<button
					className="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
					onClick={() => { }}
				>
					Complete
				</button>
				<button
					className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
					onClick={() => { }}
				>
					Delete
				</button>

			</td>
		</tr>
	)
}

export default Task