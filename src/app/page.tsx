'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editTaskId, setEditTaskId] = useState("");
  const [editTaskTitle, setEditTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskTitle }),
      });
      if (response.ok) {
        await fetchTasks();
        setNewTaskTitle("");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId: any) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditTask = (taskId: string, taskTitle: string) => {
    setEditTaskId(taskId);
    setEditTaskTitle(taskTitle);
  };

  const saveEditedTask = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${editTaskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTaskTitle }),
      });
      if (response.ok) {
        await fetchTasks();
        setEditTaskId("");
        setEditTaskTitle("");
      } else {
        console.error("Failed to save edited task");
      }
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-full p-8 gap-8">
      <span className="text-2xl font-bold uppercase">To-do List</span>
      <div className="flex flex-row gap-3">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
          placeholder="Name of task"
          className="text-black font-semibold p-4 rounded-lg"
        />

        <button onClick={addTask} className="bg-blue-500 w-14 rounded-full text-xl">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task._id}>
            {editTaskId === task._id ? (
              <div className="bg-neutral-900 p-4 gap-4 flex flex-row rounded-lg justify-center items-center">
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                  className="bg-neutral-700 p-1.5 rounded-lg w-9/12 flex-grow font-semibold"
                />
                <button onClick={saveEditedTask} className="bg-neutral-800 w-12 h-8 rounded lg">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
              </div>
            ) : (
              <div className="bg-neutral-900 p-4 gap-4 flex flex-row rounded-lg justify-around items-center w-[330px] divide-x-4 divide-neutral-800">
                <span className="w-9/12 font-semibold border-r-red-400">{task.title}</span>
                <div className="flex flex-row pl-5 gap-3">
                  <button onClick={() => startEditTask(task._id, task.title)} className="bg-neutral-700 w-12 h-8 rounded lg">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => deleteTask(task._id)} className="bg-green-700 w-12 h-8 rounded lg">
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
