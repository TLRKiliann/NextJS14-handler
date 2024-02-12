# Route-Handler

# Run

`$ pnpm run dev`

# Resume

This basic tutorial explains how to use api calls with route-handler of NextJS14.

You can play with parameters of headers, cookies, request.url, searchParams, etc...

Some files required Thunder Client (in vscode) to be tested.

## API

### CRUD API

- GET by id, PATCH & DELETE
Location file: /api/comments/[id]/route.ts

- GET & POST
Location file: /api/dashboard/users/route.ts

### Headers 

From server request, header will be returned with GET method.

Add one parameter in headers (http-headers) of Thunder Client for the GET request with:

GET => http://localhost:3000/api/test/headers

(Accept)
(User-Agent)
- Authorization (parameter)
- Bearer 12345 (value)

Location file: /api/test/headers/route.ts

### Cookies

- settings
cookies().set("paramter", "value")

- return value of cookie (browser > localstorage > cookie)
cookies().get("paramter")

Location file: /api/test/cookies/route.ts

### Redirect

/api/test/redirect/

/api/test/redirect/[id]

Replace id by 4 to figure out redirect.

---

## Page (route)

### CRUD

Location file: /comments/page.tsx

You can use API from page.tsx to make api calls.
(useQuery is required to make this request).