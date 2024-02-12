import { comments } from '@/app/lib/data';
import { CommentsProps } from '@/app/lib/definitions';

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const comment = comments.find(
        (comment: CommentsProps) => comment.id === parseInt(params.id) 
    );
    return Response.json(comment);
};

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
    const body = await request.json();
    const {name} = body;
    const index = comments.findIndex(
        (comment) => comment.id === parseInt(params.id)
    )
    comments[index].name = name;
    return Response.json(comments[index])
};
