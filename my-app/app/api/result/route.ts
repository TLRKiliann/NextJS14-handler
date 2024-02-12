import { comments } from "@/app/lib/data";
import { CommentsProps } from "@/app/lib/definitions";

/* export async function GET() {
    return Response.json(comments)
};
 */
export async function GET(request: Request, {params}: {params: {id: string}} ) {
    const commentById = comments.find(
        (comment: CommentsProps) => comment.id === parseInt(params.id)
    )
    return Response.json(commentById)
}

// not by id !!!
export async function POST(request: Request) {
    const comment: CommentsProps = await request.json();
    const newComment: CommentsProps = {
        id: comments.length + 1,
        name: comment.name,
        display: false
    }
    comments.push(newComment);
    return new Response(JSON.stringify(newComment), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201
    })
};

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
    const body = await request.json();
    const { name } = body;
    const index = comments.findIndex(
        (comment: CommentsProps) => comment.id === parseInt(params.id)
    )
    comments[index].name = name;
    return Response.json(comments[index])
};

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const index = comments.findIndex(
        (comment: CommentsProps) => comment.id === parseInt(params.id)
    )
    const deleteComment = comments[index];
    comments.splice(index, 1);
    return Response.json(deleteComment);
};
