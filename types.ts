import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string; // Short description for preview
  longDescription?: string; // Detailed description for the page
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  features?: string[]; // List of key features
  challenges?: string; // Optional: Challenges faced
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  logo: string;
}

export interface TechSkill {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}