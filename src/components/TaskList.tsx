// src/components/Greeting.tsx
import React, {useState} from 'react';
import { ToastContainer, toast } from "react-toastify";

import Task from './Task';
import TaskFilters from './TaskFilters';
import Pagination from './common/Pagination';
import Confirmation from './common/Confimation';
import { deleteTask, addTask, completeTask } from '../api/TaskApi';
import AddTask from './AddTask';
import AddTaskDependency from './AddTaskDependency';

interface TaskListProps {
	data: any,
	setSelectedFilters: any
	selectedFilters: any
	setData: any
}

const TaskList: React.FC<TaskListProps> = ({ data, setSelectedFilters, selectedFilters, setData }) => {
	const [showCofirmationModal, setShowCofirmationModal] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(0);
	const [showAddTaskModal, setShowAddTaskModal] = useState(false);
	const [showAddDependencyModal, setShowAddDependencyModal] = useState(false);
	const [newTask, setNewTask] = useState({ title: "", status: "incomplete" , priority: "low"});

	const handleSorting = (name: string) => {
		setSelectedFilters((previous: any) => ({
			...previous,
			sort_by: name,
			sort_order: selectedFilters.sort_order == 'asc' ? 'desc' : 'asc'
		}));
	};

	const handleDelete = async () => {
		try {
			console.log('handleDelete: ', selectedTaskId);
			if (selectedTaskId) {
				await deleteTask(selectedTaskId);

				const filterdtask = data.tasks.filter((task:any) => task.id !== selectedTaskId);
				setData((prevTasks: any) => ({
					...prevTasks,
					tasks: filterdtask,
					meta: {
						...data.meta,
						total: data.meta.total -1,
						to:  data.meta.to -1
					}
				}))
				setShowCofirmationModal(false);
				toast.success(
					"Task deleted successfully!", 
					{ 	
						position: "top-center",
						hideProgressBar: true,
						theme: 'colored'
					 }
				);
			}
		} catch (error) {
			console.log('Error when deleting task', error);
			toast.error(
				"Error in Task deletion!", 
				{ 	
					position: "top-center",
					hideProgressBar: true,
					theme: 'colored'
				 }
			);
			setShowCofirmationModal(false);
		}
	};

	const handleCreateTaskSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page reload
	
		if (!newTask.title.trim()) {
		  toast.error("Task title cannot be empty!", { position: "top-center" });
		  return;
		}
	
		const newTaskItem = {
		  title: newTask.title,
		  status: newTask.status,
		  priority: newTask.priority
		};
	
		try {
			await addTask(newTaskItem);

			setData((prevTasks: any) => ({
				...prevTasks,
				tasks: [...data.tasks, newTask],
				meta: {
					...data.meta,
					total: data.meta.total +1,
					to:  data.meta.to +1
				}
			}))
	
			setShowAddTaskModal(false);
			setNewTask({ title: "", status: "Pending", priority:"low" });
			toast.success("Task added successfully!", { position: "top-center" });
		} catch (error) {
			toast.error(
				"Error in Task add!", 
				{ 	
					position: "top-center",
					hideProgressBar: true,
					theme: 'colored'
				 }
			);
		}
		
	};

	const handleCompleteTask = async (id: number) => {
		try {
			console.log('handleCompleteTask: ', id);
			if (id) {
				const response = await completeTask(id, {status: 'complete'});
				const filterdtask = data.tasks.filter((task:any) => task.id == id);
				if (response.success) {
					setData((prevData: any) => ({
						...prevData,
						tasks: prevData.tasks.map((task: any) =>
						  task.id === id ? { ...task, status: 'complete' } : task
						),
					  }));
					toast.success(
						"Task completed successfully!", 
						{ 	
							position: "top-center",
							hideProgressBar: true,
							theme: 'colored'
						 }
					);
				} else {
					toast.error(
						response.message, 
						{ 	
							position: "top-center",
							hideProgressBar: true,
							theme: 'colored'
						 }
					);
				}
				
			}
		} catch (error) {
			console.log('Error when deleting task', error);
			toast.error(
				"Error in Task deletion!", 
				{ 	
					position: "top-center",
					hideProgressBar: true,
					theme: 'colored'
				 }
			);
			setShowCofirmationModal(false);
		}
	}

	return (
		<div className="min-h-full h-full bg-white flex  items-center justify-center pt-10 pb-14">
			<div className="w-full max-w-4xl px-2">
				<div >
					<h1 className="text-2xl font-medium">
						Task List
					</h1>
					
				</div>
				<div className='flex items-center'>
					<button 
						onClick={() => setShowAddTaskModal(true)}
						className="py-3 rounded bg-blue-600 hover:bg-blue-700 px-6 font-medium uppercase leading-tight text-white shadow-md transition text-xs duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg">
							Add Task
					</button>
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
											Due Date
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
										<Task data={task} key={task.id} setShowCofirmationModal={setShowCofirmationModal} setSelectedTaskId={setSelectedTaskId} handleCompleteTask={handleCompleteTask} setShowAddDependencyModal={setShowAddDependencyModal}/>
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

				<Confirmation setShowCofirmationModal={setShowCofirmationModal} showConfirmationModal={showCofirmationModal} handleSubmit={handleDelete}/>
				<ToastContainer />
				{
					showAddTaskModal && 
						<AddTask
							setNewTask={setNewTask}
							newTask={newTask}
							setShowAddTaskModal={setShowAddTaskModal}
							handleSubmit={handleCreateTaskSubmit}
						/>
				}
				{
					showAddTaskModal && 
						<AddTaskDependency
							setShowAddDependencyModal={setShowAddDependencyModal}
							handleSubmit={handleCreateTaskSubmit}
						/>
				}
				
			</div>
		</div>
	)
}

export default TaskList
