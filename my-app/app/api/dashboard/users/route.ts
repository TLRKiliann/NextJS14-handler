import { comments } from '@/app/lib/data';
import { CommentsProps } from '@/app/lib/definitions';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
    //console.log(request.url)
    return Response.json(comments);
}

export async function POST(request: Request) {
    const comment: CommentsProps = await request.json();
    const newComment: CommentsProps = {
        id: comments.length + 1,
        name: comment.name,
        display: false
    };
    comments.push(newComment);
    return new Response(JSON.stringify(newComment), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 201,
    });
}
