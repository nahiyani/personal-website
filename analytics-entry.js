import { inject } from '@vercel/analytics';

const local = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
inject({ mode: local ? 'development' : 'production' });
