import { useState,useEffect } from "react";
import { useFetch } from "../hooks/hooks";


function TestPage(){

    const {data, error, loading} = useFetch("https://jsonplaceholder.typicode.com/users")
    const {todos, todoError, todoLoading}= useFetch("https://jsonplaceholder.typicode.com/todos");


    const sortedData = data.filter((data) => {
            data.name.startsWith("C");
    });

    const byUser = todos.reduce((acc, todo) => {
        
        if (!acc[todo.userId]) {
            acc[todo.userId] = { todos: [], completedCount: 0, uncompletedCount: 0 };
        }
        acc[todo.userId].todos.push(todo);
        if (todo.completed) acc[todo.userId].completedCount++;
        else acc[todo.userId].uncompletedCount++;
        return acc;
        }, {});


    
    return (

        <>


        </>
    );
}

export default TestPage;