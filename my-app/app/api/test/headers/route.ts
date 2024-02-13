import { NextRequest } from "next/server";
import { headers } from 'next/headers';

// http://localhost:3000/api/test/headers
// add one parameter with Authorization and Bearer 12345
export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const headerList = headers();

    console.log(requestHeaders.get("Authorization"));
    console.log(headerList.get("Authorization"));

    return new Response("<h1>Data Test Headers</h1>", {
        headers: {
            "Content-Type": "text/html"
        }
    })
};
