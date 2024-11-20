import React, { useState } from "react";
import {
  MdEditNote,
  MdOutlineDeleteOutline,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import Loader from "./Loader";
import api from "../../api";

const Table = ({ todos, isLoading, FormatDate, setTodos }) => {
  const [editText, setEditText] = useState({});

  const handleDelete = (id) => {
    api.delete(`todo/${id}/`);
    const newList = todos.filter((todo) => todo.id !== id);
    setTodos(newList);
  };
  const handleEdit = (id, value) => {
    api
      .patch(`todo/${id}/`, value)
      .then((res) => {
        console.log(res.data);
        const newTodos = todos.map((todo) =>
          todo.id === id ? res.data : todo
        );
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(editText);
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
  };
  const handleCheckbox = (id, value) => {
    handleEdit(id, { completed: !value });
  };

  if (isLoading === true) {
    return <Loader />;
  }
  return (
    <div className="py-8">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date Created
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className="border-b border-black">
              <td className="p-3">
                <span
                  className="inline-block cursor-pointer"
                  onClick={() => handleCheckbox(todo.id, todo.completed)}
                >
                  {todo.completed ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )}
                </span>
              </td>
              <td className="p-3 text-sm">{todo.body}</td>
              <td className="p-3 text-sm">
                <span
                  className={`p-1.5 text-xs font-medium tracking-wider rounded-md text-white ${
                    todo.completed ? "bg-green-500" : "bg-red-500"
                  } `}
                >
                  {todo.completed ? "Done" : "Incomplete"}
                </span>
              </td>
              <td className="p-3 text-sm">{FormatDate(todo.created)}</td>
              <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                <span className="text-xl inline-block cursor-pointer">
                  <label
                    htmlFor="my_modal_6"
                    className="btn"
                    onClick={() => setEditText(todo)}
                  >
                    <MdEditNote />
                  </label>
                </span>
                <span className="text-xl inline-block cursor-pointer">
                  <MdOutlineDeleteOutline
                    onClick={() => handleDelete(todo.id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Note</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs mt-8"
            value={editText.body}
            onChange={handleChange}
          />
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Edit
            </label>
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
