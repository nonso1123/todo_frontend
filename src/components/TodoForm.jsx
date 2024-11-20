import React, { useState } from "react";
import api from "../../api";

const TodoForm = ({ fetchData }) => {
  const [body, setBody] = useState("");
  const postBody = { body: body };

  const handleSubmit = (e) => {
    api
      .post("todo/", postBody)
      .then((res) => {
        console.log(res.data);

        fetchData();
        setBody("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add Todo"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        value={body}
      />
      <button className="btn btn-primary ml-2" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default TodoForm;
