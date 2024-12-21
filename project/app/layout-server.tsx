import { headers } from 'next/headers';

export default async function RootLayoutServer() {
  const headersList = headers();
  return null;
}
