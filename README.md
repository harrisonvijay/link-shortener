# Link Shortener

- Paste your long link and get a shorter link
- You can also choose a custom ID for the link
- Check it out: http://link-shr.herokuapp.com/

### Tools and frameworks used

- HTML, CSS, JS
- NodeJS, Express, MongoDB (Mongo Atlas)
- Bootstrap library

### How does it work?

- nanoid package is used to generate the unique IDs for the links
- IDs of length 9 are used reduce the probability of collision
- ~2 years needed, in order to have a 1% probability of at least one collision, when 1000 IDs are generated each hour
- Custom IDs are also allowed
- MongoDB is used to map the full links to the IDs
- AJAX methodology is used to load the response from the /api/short endpoint
- When the browser does a GET request to the short link, the ID is looked up in the DB and the browser is redirected to the full link
- This app is currently hosted for free at herokuapp.com

### Using the API endpoint from other applications

- GET request to the /api/short endpoint with 2 query parameters -> link and custom
- Example:

  ```
  GET http://link-shr.herokuapp.com/api/short?link=https://www.google.com&custom=ggl-link

  Response:
  {
    "full_link": "https://www.google.com",
    "short_link": "http://link-shr.herokuapp.com/ggl-link",
    "error_msg": null
  }
  ```
