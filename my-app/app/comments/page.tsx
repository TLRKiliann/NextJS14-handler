"use client";

import React, {useState, useEffect, ComponentProps } from 'react'
import UpdateComp from '@/app/components/UpdateComp';
import styles from '@/app/styles/comments.module.css';

type CommentsProps = {
    id: number;
    name: string;
}

export default function Comments() {

    const [data, setData] = useState<CommentsProps[]>([])

    const [newData, setNewData] = useState<CommentsProps[]>([]);
    console.log(newData, "newData");

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

    useEffect(() => {
        const callerNewData = () => {
            setNewData(data);
        }
        callerNewData();
        return () => console.log("Clean-up (2)")
    }, [data]);

    // create new user
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event?.target.value)
        setUser(event.target.value);
    };

    // update (to be improve)
    const handleUpdateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const target = event.target.value;
        setNewUser(target);
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

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>, id: number, newUser: string) => {
        event.preventDefault();
        const findById = data.find((d: CommentsProps) => d.id === id);
        if (findById) {
            setNewData(newData.map((d: CommentsProps) => d.id === findById.id ? {...d, id: id, name: newUser} : d));
            try {
                const updateName = await fetch(`/api/comments/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        id: id,
                        name: newUser
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(updateName);
                setNewUser("");
            } catch (error) {
                console.log(error);
                throw new Error("Error: ");
            }
        } else {
            return undefined;
        }     
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
        <main className={styles.maincrud}>

            <h1 className={styles.title}>All users from DB :</h1>            
            

            {data.map((d: CommentsProps) => (
                <div key={d.id} className={styles.divdb}>
                    <p>ID: {d.id}</p>
                    <p>NAME: {d.name}</p>
                </div>
            ))}

            <hr />

            <form onSubmit={(event) => handleSubmit(event, user)} className={styles.formone}>
                <h2>Create user</h2>
                <input 
                    type="text" 
                    value={user} 
                    onChange={(event) => handleChange(event)} 
                    placeholder="enter name"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Enter</button>
            </form>
        
            <hr />

            {newData.map((u: CommentsProps) => (
                <form key={u.id} onSubmit={(event) => handleUpdateSubmit(event, u.id, newUser)} className={styles.formsec}>
                    <h2>Update user {u.name}</h2>
                    <UpdateComp
                        id={u.id}
                        name={u.name}
                        newUser={newUser}
                        handleUpdateChange={(event) => handleUpdateChange(event)}
                        handleDelete={(id) => handleDelete(id)}
                    />
                </form>
            ))}
        </main>
    )
}
