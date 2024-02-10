import { comments } from '@/app/lib/data';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
    //console.log(request.url)
    return Response.json(comments);
}

export async function POST(request: Request) {
    const comment = await request.json();
    const newComment = {
        id: comments.length + 1,
        name: comment.name,
    };
    comments.push(newComment);
    return new Response(JSON.stringify(newComment), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 201,
    });
}
