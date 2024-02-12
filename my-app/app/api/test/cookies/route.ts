import { NextRequest } from "next/server";
import { headers, cookies } from 'next/headers';

// http://localhost:3000/api/test/cookies
// add one parameter with Authorization and Bearer 12345
export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const headerList = headers();

    cookies().set("page", "20");
    const theme = request.cookies.get("theme");

    console.log(requestHeaders.get("Authorization"));
    console.log(headerList.get("Authorization"));

    console.log(theme);
    console.log(cookies().get("page"));

    return new Response("<h1>Look at > Storage > Cookies</h1>", {
        headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "theme=dark"
        }
    })
}
