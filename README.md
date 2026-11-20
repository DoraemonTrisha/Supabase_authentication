This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


What is an environment variable?
An environment variable is a configuration value stored outside your application source code.

For example, imagine you have:
Development environment.
Testing environment.
Production environment.
Each environment might use a different Supabase project.
Instead of hardcoding the URL inside your JavaScript files, you keep it in an environment file.
This makes your application easier to configure.

A mutation represents an operation that changes something or performs an action against a server.

Examples:
Login.
Register.
Create a product.
Update a profile.
Delete a record.

The lib folder is commonly used to store reusable application logic, configurations, and utility functions.
QueryClient configuration is reusable throughout the application, so keeping it inside lib makes sense.

queryprovider.tsx file connects TanStack Query with our Next.js application.

What is ReactNode?
It represents anything that React can render.
For example:
- JSX elements.
- Components.
- Text.
- Multiple elements.
- Other valid React children.
We use it to tell TypeScript what kind of content can be passed inside our component.