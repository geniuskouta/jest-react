import React from 'react';
import { createRoot } from 'react-dom/client';
import Components from './components';

const rootElement: HTMLElement | null = document.getElementById('root');

if(rootElement) {
  const root = createRoot(rootElement);

  root.render(<Components />);  
}
