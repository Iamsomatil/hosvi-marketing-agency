// Simple in-memory cache for development
const cache = new Map();

module.exports = {
  get: (key) => cache.get(key),
  set: (key, value) => cache.set(key, value),
  has: (key) => cache.has(key),
  delete: (key) => cache.delete(key),
  clear: () => cache.clear(),
};
