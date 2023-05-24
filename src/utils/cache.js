const cache = {};

export const getCacheData = (userId, key) => {
  if (cache[userId]) {
    return cache[userId][key] || null;
  }
  return null;
};

export const setCacheData = (userId, key, data) => {
  if (!cache[userId]) {
    cache[userId] = {};
  }
  cache[userId][key] = data;
};
