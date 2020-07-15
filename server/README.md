# Server Folder

## Getting Start

Run `yarn` to install dependencies

Run `yarn dev` to start the server



## API Routes

### Test Route

**GET** `/test`

> Serve as a test route to check if server is working

---

### Authen Routes

**GET**  `/auth/microsoft`

> Redirect user to this url to get user to the login process
>
> // Right now after authen it redirect user to /test (I would change to the frontend page later)

**GET** `/logout`

> Make a GET request to this and attach a cookie. It would sign you out
>
> Success Response `200`
>
> Error Response `401`

---

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
> 	"year": "String",
>   "element": {
>    	"name": "String",
> 		"thai_name": "String",
> 		"image_url": "String"
>   }
> }
> ```
>
> User came from req.user (Cookie)

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
> Return the same thing as **GET** `/profile`
>
> Error Response `400 401 404`

**POST** `/profilepic`

> Request content-type: multipart/formdata
>
> Only support jpeg, jpg, png 
>
> New profile picture must be in a key called `profile_pic`
>
> Success Response `201`
>
> Return the same thing as **GET** `/profile`
>
> Error Response `400 401 404`

---

### Hint Route

**GET** `/hint`

> Response Body
>
> ```json
> [
>   {
>     "message": "String",
>     "created_at": "Date",
>     "seen": "Boolean"
> 	}
> ]
> ```
>
> Error Response `400 401`

**POST** `/hint`

> Request Body
>
> ```json
> {
>   "message": "String"
> }
> ```
>
> Success Response Status `201`
>
> Also return the same thing as **GET** `/hint`
>
> Error Response `400 401`

---

### Badge Route

**GET** `/token`

> Get token to be used in qrcode generation later
>
> Response Body
>
> ```json
> {
>     "token": "String"
> }
> ```
>
> Error Response `401`

**GET** `/badge`

> Get user owned badges 
>
> Response Body
>
> ```json
> [
>     {
>         "_id": "String",
>         "name": "String",
>         "thai_name": "String",
>         "image_url": "String",
>         member: ["String"]
>     }
> ]
> ```
>
> If user own nothing, empty array will be return
>
> Error Response `401`

**POST** `/badge`

> Claim the badge by using token from the qrcode
>
> Request Body
>
> ```json
> {
>     "token": "String"
> }
> ```
>
> Success Response `201`
>
> Error Response `401 404`

---