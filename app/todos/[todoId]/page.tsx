'use client';
import { Todo } from "@/app/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TodoDetail() {
    const { todoId } = useParams<{ todoId: string }>();
    const [todo, setTodo] = useState<Todo | null>(null);

    useEffect(() => {
        if (todoId) {
            async function fetchTodo() {
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
                const data = await response.json();
                setTodo(data);
            }
            fetchTodo();
        }
    }, [todoId]);

    if (!todo) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Todo Details</h1>
            <p className="mt-4">
                <strong>ID:</strong> {todo.id}
            </p>
            <p>
                <strong>Title:</strong> {todo.title}
            </p>
            <p>
                <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
            </p>
        </div>
    );
}
