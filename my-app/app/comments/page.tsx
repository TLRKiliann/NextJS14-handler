"use client";

import React, {useState, useEffect } from 'react'
import UpdateComp from '../components/UpdateComp';

type CommentsProps = {
    id: number;
    name: string;
}

export default function Comments() {

    const [data, setData] = useState<CommentsProps[]>([])

    const [user, setUser] = useState<string>("");

    const [newUser, setNewUser] = useState<string>("");

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

    // create new user
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event?.target.value)
        setUser(event.target.value);
    };

    // update (to be improve)
    const handleUpdateChange = (event: React.ChangeEvent<HTMLInputElement>, id: number): void => {
        setNewUser(event.target.value)
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
        setUser("");
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

    const handleDelete = async (id: number) => {
        const deleteUser = await fetch(`/api/comments/${id}`, {
            method: "DELETE",
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(deleteUser);
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
        
            {data.map((u: CommentsProps) => (
                <form key={u.id} onSubmit={(event) => handleUpdateSubmit(event, u.id)}>
                    <h2>Update user {u.name}</h2>
                    <UpdateComp
                        id={u.id}
                        name={u.name}
                        newUser={newUser}
                        handleUpdateChange={(event, id) => handleUpdateChange(event, id)}
                        handleDelete={(id) => handleDelete(id)}
                    />
                </form>
            ))}
        </>
    )
}
