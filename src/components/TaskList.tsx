// src/components/Greeting.tsx
import React from 'react';
import Task from './Task';
import TaskFilters from './TaskFilters';
import Pagination from './common/Pagination';

interface GreetingProps {
	data: any,
	setSelectedFilters: any
	selectedFilters: any
}

const TaskList: React.FC<GreetingProps> = ({ data, setSelectedFilters, selectedFilters }) => {
	const handleSorting = (name: string) => {
		setSelectedFilters((previous: any) => ({
			...previous,
			sort_by: name,
			sort_order: selectedFilters.sort_order == 'asc' ? 'desc' : 'asc'
		}));
	};

	console.log('data inside tasjlist: ', data);
	return (
		<div className="min-h-full h-full bg-white flex  items-center justify-center pt-10 pb-14">
			<div className="w-full max-w-4xl px-2">
				<div>
					<h1 className="text-2xl font-medium">
						Task List
					</h1>
				</div>
				<div>
					<TaskFilters setSelectedFilters={setSelectedFilters} />
				</div>
				<div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
					{data.tasks.length > 0 &&
						<table className="w-full text-left table-auto min-w-max">
							<thead>
								<tr>
									<th className="p-4 border-y-2 border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Title
										</p>
									</th>
									<th className="p-4 border-y-2 border-blue-gray-100 bg-blue-gray-50" onClick={() => { handleSorting('status') }}>
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Status  {selectedFilters.sort_by === "status" && (selectedFilters.sort_order === "asc" ? "↑" : "↓")}
										</p>
									</th>

									<th className="p-4 border-y-2 border-blue-gray-100 bg-blue-gray-50" onClick={() => { handleSorting('priority') }}>
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Priority  {selectedFilters.sort_by === "priority" && (selectedFilters.sort_order === "asc" ? "↑" : "↓")}
										</p>
									</th>
									<th className="p-4 border-y-2 border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Completed
										</p>
									</th>
									<th className="p-4 border-y-2 border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
									</th>
								</tr>
							</thead>
							<tbody>
								{
									data.tasks.length && data.tasks.map((task: any) => (
										<Task data={task} key={task.id} />
									))
								}
							</tbody>
						</table>
					}
					{
						data.tasks.length == 0 &&
						<p> No Task Data</p>

					}
				</div>

				<Pagination
					per_page={data.meta.per_page} 
					total={data.meta.total}
					current_page={data.meta.current_page}
					setSelectedFilters={setSelectedFilters}
					from={data.meta.from}
					to={data.meta.to}
					last_page={data.meta.last_page}
				/>
			</div>
		</div>
	)
}

export default TaskList
