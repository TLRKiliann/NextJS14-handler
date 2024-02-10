import React, { useState } from 'react';

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
                <div>
                    <input 
                        type="text" 
                        value={newUser}
                        onChange={(event) => handleUpdateChange(event, id)}
                        placeholder={name}
                    />
                    <button type="submit">Update</button> 

                </div>
                ) : null
            }

            <button type="button" onClick={handleShowHideUser}>
                {showUser ? "Hide" : "show"}
            </button>
       
            <button type="button" onClick={() => handleDelete(id)}>
                Delete
            </button>

        </div>
    )
}
