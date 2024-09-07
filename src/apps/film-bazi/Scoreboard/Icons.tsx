import React from 'react';

export const CupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD700">
    <path d="M18 5V3H6v2H2v8c0 2.21 1.79 4 4 4h3v2H7v2h10v-2h-2v-2h3c2.21 0 4-1.79 4-4V5h-4zM4 13V7h2v6c0 1.1-.9 2-2 2s-2-.9-2-2zm16 0c0 1.1-.9 2-2 2s-2-.9-2-2V7h2v6h2z" />
  </svg>
);

export const MedalIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="9" r="6" />
    <path d="M9 20.25l3-3 3 3V21H9v-.75z" />
  </svg>
);