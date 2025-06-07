import React from 'react';

export const Footer = () => (
  <footer className="bg-secondary text-white mt-auto py-3">
    <div className="container text-center small">
      &copy; {new Date().getFullYear()} GadgetHome — Все права защищены.
    </div>
  </footer>
);
