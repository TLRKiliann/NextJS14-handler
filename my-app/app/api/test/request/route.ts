import { comments } from "@/app/lib/data";
import { CommentsProps } from "@/app/lib/definitions";
import { NextRequest } from "next/server";

// http://localhost:3000/api/test/request
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    //console.log(searchParams, "searchParams")
    const query = searchParams.get("query");
    const filterComment = query
     ? comments.filter((comment: CommentsProps) => comment?.text?.includes(query))
     : comments;
    return Response.json(filterComment);
};
