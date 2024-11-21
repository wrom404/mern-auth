import React from "react";
import { Trash, Pencil } from "lucide-react";

const Card = ({ task, handleEditTask, handleDeleteTask }) => {
  const { title, description, _id } = task;
  return (
    <div className="hover:scale-105 transition-transform card bg-transparent text-gray-200 w-96 border border-gray-800">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="truncate">{description}</p>
        <div className="card-actions justify-end">
          <Pencil
            onClick={() => handleEditTask("Edit", _id)}
            className="ml-8 text-green-500 hover:text-green-600"
          />
          <Trash
            onClick={() => handleDeleteTask(_id)}
            className="text-red-500 hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
