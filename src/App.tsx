import React, { useState } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Github, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackgroundPattern = () => (
  <svg className="fixed inset-0 -z-10 h-full w-full stroke-[#32fd32] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
    <defs>
      <pattern
        id="pattern-squares"
        x="0"
        y="0"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
      >
        <path d="M.5 10V.5H10" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern-squares)" />
  </svg>
);

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundPattern />

      {/* Header */}
      <header className="px-4 py-4 mb-6 bg-background backdrop-blur-sm">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">
            Todo App
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 mx-auto max-w-7xl">
        <div className="p-6 rounded-lg shadow-sm bg-background/50 backdrop-blur-sm">
          <div className="mb-6">
            <TodoInput />
          </div>
          <TodoList />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 mt-8 bg-background backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Built with ❤️ by&nbsp;
              <cite>
                Samuel Agyei
              </cite>
            </div>
            <a
              href="https://github.com/sterotech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
