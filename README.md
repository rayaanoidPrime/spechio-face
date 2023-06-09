This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Spechio Beauty AI

Spechio frontend for extracting facial features and recommending beauty products
	
    Requirement:											
	As a user I want the application to scan my face and do skin Analysis so that it can recommend me suitable beauty products.											
												
	Acceptance Criteria:											
	1.       Application should be able to scan user’s face.											
	2.       ML model for face features analysis.											
	3.       Recommend beauty products based on extracted features of the face. (Create a dummy beauty products mapping in the backend)											
												
## Getting Started For ML & Backend:

### Localhost deployment : 

1.  Run the command from the root folder to create virtual env.

```bash
npm run ml 
```

2.  Activate the venv by running 

```bash
.\\venv\\Scripts\\activate
```

3.  Go into the backend folder using 

```bash
cd .\\backend
```

4.  Run the uvicorn server using 

```bash
uvicorn main:app --host localhost --port 8000
# or 
uvicorn main:app --host localhost --port 8000 --reload # for development to enable hot reloading with file changes.
```


## Getting Started For Frontend:

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
