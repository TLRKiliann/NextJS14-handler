"use client";

import type { CommentsProps } from '../lib/definitions';
import React, {useState, useEffect } from 'react'
import Link from 'next/link';
import UpdateComp from '@/app/components/UpdateComp';
import styles from '@/app/styles/comments.module.css';

export const dynamic = "force-dynamic";

export default function Comments() {

    const [data, setData] = useState<CommentsProps[]>([])
    const [newData, setNewData] = useState<CommentsProps[]>([]);

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

    const [showUser, setShowUser] = useState<boolean>(false);

    const handleShowHideUser = (id: number): void => {
        const findById = newData.find((d: CommentsProps) => d.id === id)
        if (findById) {
            setNewData(newData.map((d: CommentsProps) => d.id === id ? {...d, id: findById.id, name: d.name, display: !d.display} : d))
        }
    };

    // create new user
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const targetUser = (event.target.value)
        setUser(targetUser);
    };

    // update (to be improve)
    const handleUpdateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const targetNewUsr = event.target.value;
        setNewUser(targetNewUsr);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, user: string) => {
        event.preventDefault()
        setNewData([...newData, {id: newData.length + 4, name: user, display: false}])
 
        const enterData = await fetch('/api/dashboard/users', {
            method: "POST",
            body: JSON.stringify({
                id: data.length + 1,
                name: user,
                display: false
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
            setNewData(newData.map((d: CommentsProps) => d.id === findById.id ? {...d, id: id, name: newUser, display: !d.display} : d));
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
                setShowUser(!showUser); 
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
        const findById = data.find((d: CommentsProps) => d.id === id);
        if (findById) {
            setNewData(newData.filter((d: CommentsProps) => d.id !== id))
            try {
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
            } catch (error) {
                throw new Error("Error: error to delete user by id")
            }
        } else {
            return undefined;
        }
    }

    return (
        <main className={styles.maincrud}>

            <h1 className={styles.title}>All users from DB :</h1>            
            

            {newData.map((d: CommentsProps) => (
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
                        display={u.display}
                        newUser={newUser}
                        handleShowHideUser={(id) => handleShowHideUser(id)}
                        handleUpdateChange={(event) => handleUpdateChange(event)}
                        handleDelete={(id) => handleDelete(id)}
                    />
                </form>
            ))}

            <div className={styles.lastdiv}>
    
                <h3>Link to reach by Id:</h3>
    
                {newData.map((comment: CommentsProps) => (
                    <li key={comment.id}>
                        <Link href={`/comments/${comment.id}`}>{comment.name}</Link>
                    </li>
                ))}

            </div>

        </main>
    )
}
