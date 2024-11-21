import { useEffect, useState, useRef } from "react";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SquarePlus, LogOut } from "lucide-react";

import Card from "../components/Card";
import Modal from "../components/Modal";
import useTaskStore from "../store/taskStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [actionType, setActionType] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const { guardDashboard, logout } = useAuthStore();
  const { addTask, getTask, getTasks, deleteTask, updateTask } = useTaskStore();

  // Verify user if authenticated before proceeding to this component dashboard
  useEffect(() => {
    const handleEffect = async () => {
      const response = await guardDashboard();
      if (!response.success) {
        toast.error(response.message);
        navigate("/login");
      }
    };
    handleEffect();
  }, []);

  // get all task in the database
  useEffect(() => {
    const handleEffect = async () => {
      const response = await getTasks();
      if (response.data.success) {
        setTasks(response.data.task);
      }
    };
    handleEffect();
  }, [getTasks]);

  //get selected task that is about edit and update that task
  useEffect(() => {
    const handleEffect = async () => {
      if (actionType === "Edit") {
        const response = await getTask(currentTaskId);
        setTask({
          title: response.data.task.title,
          description: response.data.task.description,
        });
      }
      // console.log(`action type: ${actionType}`);
    };

    handleEffect();
  }, [actionType, currentTaskId]);

  const handleEditTask = (actionType, taskId) => {
    setActionType(actionType);
    setCurrentTaskId(taskId);
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      if (response.data.success) {
        const updatedTask = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTask);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.success(error.response);
    }
  };

  const handleClickLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (actionType === "Add") {
      const response = await addTask(task);
      if (response.data.success) {
        setTasks((prevTask) => [...prevTask, response.data.task]); // Update the tasks state with the new task to refresh the component
        setTask({});
        setIsModalOpen(!isModalOpen);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
      console.log("Add function");
    } else {
      const { title, description } = task;
      if (!title || !description) {
        toast.error("All fields are required.");
      }
      try {
        const response = await updateTask(task, currentTaskId);
        if (response.success) {
          const updatedTAsk = tasks.map((task) =>
            task._id === response.updatedTask._id ? response.updatedTask : task
          );
          setTasks(updatedTAsk);
          setIsModalOpen(!isModalOpen);
          console.log(response.updatedTask);
          return toast.success(response.message);
        }
        toast.error(response?.data?.error);
      } catch (error) {}
    }
  };

  return (
    <div className="min-h-[100%] bg-gray-950 bg-opacity-95">
      <div className="flex justify-between">
        <h1 className="text-gray-200 font-semibold text-2xl py-4 px-8">
          Dashboard
        </h1>
        <p
          onClick={handleClickLogout}
          className="text-gray-200 font-semibold text-xl py-4 px-8 cursor-pointer flex items-center gap-2"
        >
          Logout <LogOut className="size-6" />
        </p>
      </div>
      <div className="text-gray-200 pr-28 flex justify-end hover:text-blue-600 cursor-pointer">
        <span
          onClick={() => handleEditTask("Add")}
          className="font-semibold text-xl flex gap-2"
        >
          Add task <SquarePlus className="size-8" />
        </span>
      </div>
      <div className="min-h-screen py-4 flex justify-center bg-transparent ">
        <div className="max-w-screen-xl w-full min-h-[80%] border border-gray-800 rounded-xl p-4">
          <h3 className="text-gray-200 text-2xl font-semibold my-4 text-center">
            Task
          </h3>
          <div>
            {tasks && tasks.length > 0 ? (
              <div className="grid place-items-center grid-cols-3 gap-4">
                {tasks.map((task, i) => (
                  <Card
                    key={i}
                    task={task}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                  />
                ))}
              </div>
            ) : (
              <h3 className="text-gray-200 mt-48 text-center">
                No added task yet
              </h3>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          actionType={actionType}
          task={task}
          setTask={setTask}
          handleEditTask={handleEditTask}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;
