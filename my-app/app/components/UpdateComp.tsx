import React, { useState } from 'react';
import styles from '@/app/styles/UpdateComp.module.css';

type UpdateProps = {
    id: number;
    name: string;
    newUser: string;
    handleUpdateChange: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    handleDelete: (id: number) => void;
};

export default function UpdateComp({id, name, newUser, handleUpdateChange, handleDelete}: UpdateProps) {

    const [showUser, setShowUser] = useState<boolean>(false);

    const handleShowHideUser = (): void => {
        setShowUser(!showUser)
    };

    return (
        <div key={id}>

            {showUser ? (
                <div className={styles.update}>

                    <input 
                        type="text" 
                        value={newUser}
                        onChange={(event) => handleUpdateChange(event, id)}
                        placeholder={name}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Update</button> 

                </div>
                ) : null
            }

            <div className={styles.divbtn}>
                <button type="button" onClick={handleShowHideUser} className={styles.button}>
                    {showUser ? "Hide" : "show"}
                </button>
        
                <button type="button" onClick={() => handleDelete(id)} className={styles.button}>
                    Delete
                </button>
            </div>

        </div>
    )
}
