import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import {fetchTasks} from './api/TaskApi';
import Spinner from './components/common/Spinner';

// const data1 = {
// 	"tasks": [
// 		{
// 			"id": 6,
// 			"title": "Task 12",
// 			"status": 0,
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:29:31.366Z",
// 			"updated_at": "2025-03-25T12:29:31.366Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 1,
// 			"title": "Task 1",
// 			"status": "in_progress",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:17:03.878Z",
// 			"updated_at": "2025-03-25T12:17:03.878Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 2,
// 			"title": "Task 12",
// 			"status": "in_progress",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:24:22.398Z",
// 			"updated_at": "2025-03-25T12:24:22.398Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 3,
// 			"title": "Task 12",
// 			"status": "in_progress",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:25:31.135Z",
// 			"updated_at": "2025-03-25T12:25:31.135Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 4,
// 			"title": "Task 12",
// 			"status": "in_progress",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:25:34.157Z",
// 			"updated_at": "2025-03-25T12:25:34.157Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 5,
// 			"title": "Task 12",
// 			"status": "in_progress",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:25:36.674Z",
// 			"updated_at": "2025-03-25T12:25:36.674Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 7,
// 			"title": "Task 12",
// 			"status": "sss",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:35:35.796Z",
// 			"updated_at": "2025-03-25T12:35:35.796Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 8,
// 			"title": "Task 12",
// 			"status": "sss",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T12:35:37.623Z",
// 			"updated_at": "2025-03-25T12:35:37.623Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 9,
// 			"title": "Task 12",
// 			"status": "sss",
// 			"priority": "qqq",
// 			"created_at": "2025-03-25T19:12:56.980Z",
// 			"updated_at": "2025-03-25T19:12:56.980Z",
// 			"deletedAt": null
// 		},
// 		{
// 			"id": 10,
// 			"title": "Task 12",
// 			"status": "sss",
// 			"priority": "qqq",
// 			"created_at": "2025-03-26T08:14:47.469Z",
// 			"updated_at": "2025-03-26T08:14:47.469Z",
// 			"deletedAt": null
// 		}
// 	],
// 	"meta": {
// 		"current_page": 1,
// 		"last_page": 2,
// 		"per_page": 10,
// 		"total": 14,
// 		"from": 1,
// 		"to": 14
// 	}
// };

function App() {
	const [data, setData] = useState<any>({
			tasks: [],
			meta: {
				per_page: 10,
				total: 0,
				current_page: 1,
				from:0,
				to:0,
				last_page:1

			}
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | null }>({
        status: null,
        priority: null,
		sort_by: 'status',
		sort_order: 'asc',
    });

	useEffect(()=>{
		const getData = async () => {
			try {
			  const task = await fetchTasks(selectedFilters);
			  console.log('task:', task);
			  setData(task.data); 
			} catch (err) {
			  setError('Failed to fetch data');
			} finally {
			  setLoading(false);  // Set loading state to false
			}
		  };
		  getData();
	}, [selectedFilters]);
	console.log('data:', data);

	useEffect( () => {

	}, [selectedFilters])
	return (
		<div className="App">
			<main>
				{ loading && <Spinner/>}
				<TaskList data={data} setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} setData={setData}/>
			</main>
		</div>
	);
}

export default App;
