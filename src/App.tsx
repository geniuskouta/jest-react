import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { CreatePostPage, PostTimelinePage } from './components/pages';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePostPage />} />
      <Route path="/timeline" element={<PostTimelinePage />} />
    </Routes>
  );
}
