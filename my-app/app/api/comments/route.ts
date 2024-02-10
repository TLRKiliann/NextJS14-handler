import { comments } from "../../lib/data";

export async function GET() {
    return Response.json(comments);
}