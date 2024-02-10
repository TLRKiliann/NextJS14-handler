"use client";

import React, {useState, useEffect } from 'react'

type CommentsProps = {
    id: number;
    name: string;
}

export default function Comments() {

    const [data, setData] = useState<CommentsProps[]>([])

    const [user, setUser] = useState<string>("");

    useEffect(() => {
        const caller = async () => {
            const request = await fetch("/api/comments");
            const data = await request.json();
            console.log(data)
            setData(data)
        }
        caller()
        return () => console.log("clean-up !");
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event?.target.value)
        setUser(event.target.value);
    };

    const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const findByName = data.find((d: CommentsProps) => d.name === name);
        
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, user: string) => {
        event?.preventDefault()
        const enterData = await fetch('/api/dashboard/users', {
            method: "POST",
            body: JSON.stringify({
                id: data.length + 1,
                name: user
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(enterData);
    }

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>, id: number) => {
        event.preventDefault();
        const updateName = await fetch(`/api/comments/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                id: id,
                name: user
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(updateName);
    }

    return (
        <>
            {data.map((d: CommentsProps) => (
                <div key={d.id}>
                    <p>{d.id}</p>
                    <p>{d.name}</p>
                </div>
            ))}

            <form onSubmit={(event) => handleSubmit(event, user)}>
                <h2>Create user</h2>
                <input type="text" value={user} onChange={(event) => handleChange(event)}/>
                <button type="submit">Enter</button>
            </form>
        
            {data.map((d: CommentsProps) => (
                <form key={d.id} onSubmit={(event) => handleUpdateSubmit(event, d.id)}>
                    <h2>Update user</h2>
                    <input type="text" value={d.name} onChange={(event) => handleUpdate(event, d.name)}/>
                    <button type="submit">Update</button>
                </form>
            ))}

        </>
    )
}
