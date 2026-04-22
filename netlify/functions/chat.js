const handler = require('../../api/chat');

// Adapt Vercel-style handler to Netlify Functions format
exports.handler = async (event) => {
  return new Promise((resolve) => {
    const req = {
      method: event.httpMethod,
      body: (() => {
        try { return JSON.parse(event.body || '{}'); } catch { return {}; }
      })(),
    };

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
      return resolve({ statusCode: 200, headers, body: '' });
    }

    let statusCode = 200;

    const res = {
      setHeader: (k, v) => { headers[k] = v; },
      status: (code) => { statusCode = code; return res; },
      json: (data) => {
        resolve({
          statusCode,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      },
      end: (data) => {
        resolve({ statusCode, headers, body: data || '' });
      },
    };

    handler(req, res);
  });
};
