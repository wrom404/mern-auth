import { X } from "lucide-react";

const Modal = ({ actionType, task, setTask, handleEditTask, handleSubmit }) => {
  const { title, description } = task;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="p-4 max-w-lg w-full border border-gray-800 rounded-xl bg-gray-950 bg-opacity-95">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <h3 className="text-gray-200 text-xl text-center">
              {actionType} Task
            </h3>
            <X
              onClick={() => {
                setTask({});
                handleEditTask();
              }}
              className="size-8 text-gray-200"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              value={title || ""}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              type="text"
              className="input input-bordered bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              value={description || ""}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              className="textarea w-full border border-gray-800 bg-transparent"
            ></textarea>
          </div>

          <div className="form-control">
            <button className="btn btn-primary" type="submit">
              <span className="text-xl font-semibold">
                {actionType === "Edit" ? "Update" : actionType}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
