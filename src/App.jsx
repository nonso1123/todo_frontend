import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import Table from "./components/Table";
import api from "../api";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    api
      .get("todo")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const FormatDate = (isoString) => {
    const date = new Date(isoString);
    return date
      .toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  return (
    <>
      <div className="bg-indigo-100 px-8 min-h-screen">
        <nav className="pt-8">
          <h1 className="text-5xl text-center pb-8">ToDo List</h1>
        </nav>
        <TodoForm setTodos={setTodos} fetchData={fetchData} />
        <Table
          todos={todos}
          setTodos={setTodos}
          isLoading={isLoading}
          FormatDate={FormatDate}
        />
      </div>
    </>
  );
};

export default App;
