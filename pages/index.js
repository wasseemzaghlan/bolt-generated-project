import Head from 'next/head';
    import Link from 'next/link';

    export default function Home() {
      return (
        <div>
          <Head>
            <title>Next.js Home Page</title>
            <meta name="description" content="A simple home page built with Next.js" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
              <li><Link legacyBehavior href="/"><a className="text-white">Home</a></Link></li>
              <li><Link legacyBehavior href="/about"><a className="text-white">About</a></Link></li>
              <li><Link legacyBehavior href="/contact"><a className="text-white">Contact</a></Link></li>
            </ul>
          </nav>

          <main className="p-4">
            <h1 className="text-2xl font-bold">Welcome to Next.js!</h1>
            <p>This is a simple home page built with Next.js.</p>
          </main>

          <footer className="bg-gray-800 p-4 text-center text-white">
            <p>&copy; 2023 Next.js Home Page</p>
          </footer>
        </div>
      );
    }
