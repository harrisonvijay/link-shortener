# Link Shortener

- Paste your long link and get a shorter link
- You can also choose a custom ID for the link
- Check it out: https://link-shortener-ekyy.onrender.com/
- The website is responsive (adapts well to different screen sizes)

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
