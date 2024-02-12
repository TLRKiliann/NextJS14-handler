# Route-Handler

# Run

`$ git clone https://...`
`$ cd my-app`
`$ pnpm install`
`$ pnpm run dev`

# Resume

This basic tutorial explains how to use api calls with route-handler of NextJS14.

You can play with parameters of headers, cookies, request.url, searchParams, etc...
with Thunder Client or with your browser to see results with url or in the comments page.tsx.

Some files required Thunder Client (in vscode) to be tested.

## API

### CRUD API

- GET by params:id, PATCH & DELETE
Location file: /api/comments/[id]/route.ts

- GET(all data) & POST
Location file: /api/dashboard/users/route.ts

### Headers 

`import { headers } from 'next/headers';`
`import { NextRequest } from "next/server";`

- NextRequest

From server request, header will be returned with GET method.

Add one parameter in headers (http-headers) of Thunder Client for the GET request with:

GET => http://localhost:3000/api/test/headers

(Accept)
(User-Agent)
- Authorization (parameter)
- Bearer 12345 (value)

Location file: /api/test/headers/route.ts

```
    (into the response)
    headers: {
        "Content-Type": "text/html",
    }
``` 

### Cookies

`import { cookies } from 'next/headers';`
`import { NextRequest } from "next/server";`

`request.cookies.get("something")`

- NextRequest

- settings
cookies().set("paramter", "value")

- return value of cookie (browser > localstorage > cookie)
cookies().get("paramter")

```
    (into the response)
    headers: {
        "Content-Type": "text/html",
        "Set-Cookie": "theme=dark"
    }
``` 

Location file: /api/test/cookies/route.ts

### Redirect

`import { redirect } from 'next/navigation';`

/api/test/redirect/

/api/test/redirect/[id]

Replace id by 4 to be redirect to /comments.

## Request parameters

`import { NextRequest } from "next/server";`

- query
- NextRequest
- request.nextUrl.searchParams

2 files required:
- Location file: /api/test/request/route.ts
- Location file: /api/test/request/[id]/route.ts

Replace id by 2 in the url:

localhost:3000/api/test/request/2

It returns automatically the number with properties & values of data.

---

## Page (route)

### CRUD

Location file: /comments/page.tsx

You can make API calls from this file.