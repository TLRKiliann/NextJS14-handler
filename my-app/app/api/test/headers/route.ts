import type { CommentsProps } from "@/app/lib/definitions";
import { NextRequest } from "next/server";
import { headers } from 'next/headers';
import { comments } from "@/app/lib/data";

// http://localhost:3000/api/test/headers
// add one parameter with Authorization and Bearer 12345
/* export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const headerList = headers();

    console.log(requestHeaders.get("Authorization"));
    console.log(headerList.get("Authorization"));

    return new Response("<h1>Data Test Headers</h1>", {
        headers: {
            "Content-Type": "text/html"
        }
    })
}; */

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    const filterComment = query ? comments.filter((comment: CommentsProps) => comment.text?.includes(query)) : comments;

    const requestHeaders = new Headers(request.headers);
    const headersList = headers();

    console.log(headersList.get("Authorization"))
    console.log(requestHeaders.get("Authorization"));

    return new Response(JSON.stringify(filterComment), {
        headers: {
            "Content-Type": "application/json"
        }
    })
};