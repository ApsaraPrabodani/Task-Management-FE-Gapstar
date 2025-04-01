import React from 'react'

interface AddTaskProps {
	newTask: any,
	setNewTask: any,
	handleSubmit: any,
    setShowAddTaskModal: any
}

const AddTask: React.FC<AddTaskProps> = ({ newTask, setNewTask, handleSubmit, setShowAddTaskModal}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Add New Task</h3>
            
            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block font-semibold">Task Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Title"
                required
              />

              <label className="block font-semibold mt-3">Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="incomplete">Pending</option>
              </select>

              <label className="block font-semibold mt-3">Prority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddTaskModal(false)} 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default AddTask