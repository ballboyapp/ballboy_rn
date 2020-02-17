const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return '[Unserializable object]';
  }
};

export default safeStringify;
