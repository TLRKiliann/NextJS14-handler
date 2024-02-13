"use client";

import React, {useState, useEffect} from 'react';

import { comments } from "@/app/lib/data";
import { CommentsProps } from "@/app/lib/definitions";
import Link from "next/link";
import { redirect } from 'next/navigation';

type CommentProps = {
    id: number;
    name: string;
    display: boolean;
};

export default function CommentById({params}: {params: {id: string}}) {

    if (parseInt(params.id) > comments.length) {
        redirect("/comments")
    };

    const [test, setTest] = useState<CommentProps | null>(null);

    useEffect(() => {
        const caller = async () => {
            const res = await fetch(`/api/test/request/${params.id}`)
            const data = await res.json();
            setTest(data);
        }
        caller();
        return () => console.log("clean-up done")
    }, []);

    const apiUrl = `/api/test/request/${params.id}`
    //console.log(apiUrl)

    return (
        <div>
            <h3>Corresponding id with comments result from db:</h3>
            {comments.map((comment: CommentsProps) => comment.id === parseInt(params.id) ? (
                <p key={comment.id}>{comment.id} {comment.name}</p>
            ): null)}

            <hr />

            <li>
                <Link href={apiUrl}>Display in json with api url</Link>
            </li>

            <hr />

            <h3>Result by fetching data from api/test/request/params.id :</h3>
            <p>
                {test?.id} {test?.name}
            </p>
        </div>
    )
}
