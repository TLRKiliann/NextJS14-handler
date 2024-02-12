import { comments } from "@/app/lib/data";
import { CommentsProps } from "@/app/lib/definitions";
import { redirect } from "next/navigation";

// http://localhost:3000/api/test/redirect/4
export async function GET(request: Request, {params}: {params: {id: string}}) {
    if (parseInt(params.id) > comments.length) {
        redirect("/comments")
    }
    const comment = comments.find(
        (comment: CommentsProps) => comment.id === parseInt(params.id)
    )
    return Response.json(comment);
};