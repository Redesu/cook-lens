# [Cook Lens]()

![Main page](https://i.imgur.com/bn7TftE.png)

A full-stack tech blog built with **NextJS**, **Tailwind**, **Gemini** and **PostgreSQL**.

## You can find a live version [HERE]()
---

## Features

- Oauth2 login with Google and Github
![Login Screenshot](https://i.imgur.com/U4yqaPc.png)
- Analyze ingredients and generate recipes
![Generating Recipes Gif](https://i.imgur.com/X25YCUy.gif)
- Save and share recipes
![Saving Recipe Gif](https://i.imgur.com/FFMLTuQ.gif)
- Profile page
![Profile Screenshot](https://i.imgur.com/8qGKmyQ.png)
- Responsive design
![Responsive Screenshot](https://i.imgur.com/U31qHkb.gif)
- PWA support for Android, IOS and Desktop
![PWA Screenshot](https://i.imgur.com/tpQpxpZ.gif)



---


## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL instance (local or cloud)
- Github and Google Client ID and Secret
- Pexels API key

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/redesu/cook-lens
cd cook-lens
```

### 2. Setup

```sh
cp .env.example .env   # Create your .env file

npm install
npm run dev            # or: npm start
```
> [!WARNING]  
> Make sure your PostgreSQL instance is running! Check the schematic script in the last step.

**Environment Variables (`.env`):**
```
NEXT_PUBLIC_API_UR=your_api_url
NEXTAUTH_URL=your_nextauth_url
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port

PEXELS_API_KEY=your_pexels_api_key

GEMINI_KEY=your_gemini_api_key
```


### 3. Create the Schematic in your PostgreSQL instance 
The database uses the following schematic
![Schema ERD](https://i.imgur.com/1Dzi8XF.png)

Create the database schema using the script in schema.sql in the project root folder.

---

## Usage

- Visit [http://localhost:3000](http://localhost:3000) to use the app.
- Login using Google or Github to start generating recipes.

---

## API Endpoints

See [`app/api`](app/api) for all available endpoints.

- `POST /api/ai/analyze-image` – Analyze image and return ingredients
- `POST /api/ai/generate-recipes` – Generate recipes based on ingredients provided

- `POST /api/auth` – NextAuth callback

- `POST /api/recipes` – Create a new recipe (auth required)
- `GET /api/recipes/:id` – Get a recipe by id (auth required)

- `POST /api/saved_recipe` – Save a recipe (auth required)
- `GET /api/saved_recipe` – Get a random saved recipe

- `GET /api/saved_recipe/:id` – Get a saved recipe by id 

- `GET /api/user/:id` – Get user info, saved recipes and generated recipes (auth required)

---


## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)