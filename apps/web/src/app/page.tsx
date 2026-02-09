import { Button } from '@mono/ui-components';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <h1 className="text-4xl font-bold">Bomb Boilerplate</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Yarn Berry monorepo with Next.js, TypeScript, Biome, and Turbo
      </p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="secondary">Documentation</Button>
      </div>
    </div>
  );
}
