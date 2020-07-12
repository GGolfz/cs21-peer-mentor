# Server Folder

## Getting Start

Run `yarn` to install dependencies

Run `yarn dev` to start the server



## API Routes

### Test Route

**GET** `/test`

> Serve as a test route to check if server is working

### Authen Routes

**GET**  `/auth/microsoft`

> Redirect user to this url to get user to the login process

### Profile Route

**GET** `/profile`

> Response Body
>
> ```json
> {
> 	"display_name": "String",
> 	"name": "String",
> 	"profile_url": "String",
> 	"bio": "String",
> 	"year": "String"
> }
> ```
>
> 

**PATCH** `/profile`

> Request Body
>
> ```json
> {
> 	"bio": "String",
> 	"display_name": "String"
> }
> ```
>
> Success Response `200`
>
> Return the same thing as GET
>
> Error Response `400 401 404`

**POST** `/profilepic`

> Request content-type: multipart/formdata
>
> New profile picture must be in a key called `profile_pic`
>
> Success Response `201`
>
> Return the same thing as GET
>
> Error Response `400 401 404`



### 

