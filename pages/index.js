import Head from 'next/head';

    export default function Home() {
      return (
        <div>
          <Head>
            <title>Next.js Home Page</title>
            <meta name="description" content="A simple home page built with Next.js" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <h1>Welcome to Next.js!</h1>
            <p>This is a simple home page built with Next.js.</p>
          </main>

          <footer>
            <p>&copy; 2023 Next.js Home Page</p>
          </footer>
        </div>
      );
    }
