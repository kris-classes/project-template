# restart project template

## Frontend

```shell
cd frontend
npm install
npm run dev
```

## Backend

```shell
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Project Structure

The frontend lives in `frontend/`, the backend lives in `backend/`.

Astro looks in the `pages` directory for `.md` or `.astro` files and loads components inside them. Astro can use React or other UI component libraries (Vue, Svelte, etc). This example just has React ones.
Links/routes are automatically created by astro, so if you want a `http://localhost:3000/my_page` link just create a `pages/my_page.astro` file.

Components are loaded from the `components/` directory. The React ones have a `.jsx` extension. Astro renders one-off by default, so you need to add `client:load="react"` for your components to work properly with dynamic data wherever you use them.

`ListActors.jsx` is a simple list that queries `http://localhost:8000/actors` (a FastAPI backend, runs sqlite3 to look up actors from a table in a database, and returns the result as JSON). It has a search box that performs a naive filter on the list data.

`CurrentTime.jsx` demonstrates having the component update every second using `setInterval` (and asks the backend for the current time).

`ReactExample.jsx` and `ReactExample.css` show how to do simple components that don't do anything.

To make one page link to another just add an `<a href="/my_new_link>Click me</a>` to wherever you want.


## FAQ

If you get 'You must set a region' run the `aws configure` command and set `us-west-2` or something equivalent as your region.
