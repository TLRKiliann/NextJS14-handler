import React, { useState } from 'react';
import styles from '@/app/styles/UpdateComp.module.css';

type UpdateProps = {
    id: number;
    name: string;
    display: boolean;
    newUser: string;
    handleUpdateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelete: (id: number) => void;
    handleShowHideUser: (id: number) => void;
};

export default function UpdateComp({id, name, newUser, display, handleShowHideUser, handleUpdateChange, handleDelete}: UpdateProps) {
    return (
        <div key={id}>

            {display ? (
                <div className={styles.update}>

                    <input 
                        type="text" 
                        value={newUser}
                        onChange={(event) => handleUpdateChange(event)}
                        placeholder={name}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Update</button> 

                </div>
                ) : null
            }

            <div className={styles.divbtn}>
                <button type="button" onClick={() => handleShowHideUser(id)} className={styles.button}>
                    {display ? "Hide" : "show"}
                </button>
        
                <button type="button" onClick={() => handleDelete(id)} className={styles.button}>
                    Delete
                </button>
            </div>

        </div>
    )
}
