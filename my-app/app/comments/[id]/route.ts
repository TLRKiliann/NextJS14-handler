import { comments } from '@/app/lib/data';

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const comment = comments.find(
        (comment) => comment.id === parseInt(params.id)
    )
    return Response.json(comment);
}

export async function PATCH(request: Request, { params }: {params: {id: string}}) {
    const body = await request.json();
    const { name } = body;
    const index = comments.findIndex(
        (comment) => comment.id === parseInt(params.id)
    );
    comments[index].name = name;
    return Response.json(comments[index]);
}