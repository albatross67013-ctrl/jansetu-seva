import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { randomInt } from 'node:crypto';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const HOST = '127.0.0.1';
const PORT = 3000;
const allowedServices = new Set([
  'Caste certificate',
  'Birth certificate',
  'Income certificate',
  'Student scholarship',
  'Shop licence'
]);

const applications = new Map([
  ['JS-20481', {
    id: 'JS-20481',
    service: 'Income certificate',
    applicant: 'Ananya Sharma',
    status: 'Issued & Verified',
    step: 4,
    fee: 30,
    upiId: '7501468140-4@ybl',
    utr: 'UPI/2026/89412039',
    updated: new Date().toISOString(),
    issuedAt: new Date().toISOString(),
    demo: true
  }],
]);
const handoffs = [];
let portalOnline = true;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon'
};

function sendJson(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(data);
}

async function readJson(req, maxBytes = 65536) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) throw Object.assign(new Error('Request body is too large.'), { status: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw Object.assign(new Error('Expected a JSON request body.'), { status: 400 });
  }
}

function safeApplication(app) {
  return {
    id: app.id,
    service: app.service,
    applicant: app.applicant || (app.formData && app.formData.name) || 'Citizen Applicant',
    status: app.status,
    step: app.step,
    fee: app.fee || 30,
    upiId: '7501468140-4@ybl',
    utr: app.utr || 'UPI/2026/' + Math.floor(10000000 + Math.random() * 90000000),
    formData: app.formData || {},
    updated: app.updated,
    issuedAt: app.issuedAt || app.updated,
    demo: true
  };
}

async function handleApi(req, res, url) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  if (req.method === 'GET' && (url.pathname === '/api' || url.pathname === '/api/')) {
    return sendJson(res, 200, {
      name: 'JanSetu mock API',
      mode: 'demo',
      portalOnline,
      upiId: '7501468140-4@ybl',
      endpoints: ['GET /api/health', 'GET /api/applications', 'POST /api/applications', 'POST /api/applications/refresh', 'POST /api/portal', 'POST /api/handoffs']
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'ok',
      mode: 'demo',
      host: HOST,
      portalOnline,
      upiId: '7501468140-4@ybl',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/applications') {
    return sendJson(res, 200, {
      applications: Array.from(applications.values()).map(safeApplication)
    });
  }

  if (req.method === 'GET' && url.pathname.startsWith('/api/certificates/')) {
    const id = url.pathname.split('/').pop();
    const app = applications.get(id);
    if (!app) return sendJson(res, 404, { error: 'Certificate not found' });
    return sendJson(res, 200, { certificate: safeApplication(app) });
  }

  if (req.method === 'POST' && url.pathname === '/api/applications') {
    const body = await readJson(req);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return sendJson(res, 400, { error: 'Expected a JSON object.' });
    if (!body.service) return sendJson(res, 400, { error: 'Choose one of the services.' });
    if (!portalOnline) return sendJson(res, 503, { error: 'The mock portal is unavailable. Simulation outage active.' });

    const prefix = body.service.includes('Caste') ? 'JS-CAST' : body.service.includes('Birth') ? 'JS-BIRTH' : body.service.includes('Income') ? 'JS-INC' : 'JS-EDIST';
    const id = prefix + '-' + randomInt(100000, 999999);
    const applicant = (body.formData && body.formData.name) || body.applicant || 'Applicant';
    const fee = (body.payment && body.payment.amount) || (body.service.includes('Birth') ? 25 : 30);
    const utr = (body.payment && body.payment.utr) || ('UPI/' + randomInt(10000000, 99999999));

    const app = {
      id,
      service: body.service,
      applicant,
      formData: body.formData || {},
      status: 'Issued & Verified',
      step: 4,
      fee,
      upiId: '7501468140-4@ybl',
      utr,
      updated: new Date().toISOString(),
      issuedAt: new Date().toISOString(),
      demo: true
    };
    applications.set(id, app);
    return sendJson(res, 201, { application: safeApplication(app), status: 'success' });
  }

  if (req.method === 'POST' && url.pathname === '/api/applications/refresh') {
    if (!portalOnline) return sendJson(res, 503, { error: 'The mock portal is unavailable. No status changed.' });
    const now = new Date().toISOString();
    for (const app of applications.values()) {
      if (app.status !== 'Issued & Verified') {
        app.status = 'Issued & Verified';
        app.updated = now;
      }
    }
    return sendJson(res, 200, { applications: Array.from(applications.values()).map(safeApplication) });
  }

  if (req.method === 'POST' && url.pathname === '/api/portal') {
    const body = await readJson(req, 1024);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return sendJson(res, 400, { error: 'Expected a JSON object.' });
    if (typeof body.online !== 'boolean') {
      return sendJson(res, 400, { error: 'Expected only an online boolean.' });
    }
    portalOnline = body.online;
    return sendJson(res, 200, { portalOnline });
  }

  if (req.method === 'POST' && url.pathname === '/api/handoffs') {
    const body = await readJson(req, 1024);
    const handoff = { id: 'HELP-' + randomInt(1000, 9999), createdAt: new Date().toISOString(), status: 'queued-demo' };
    handoffs.push(handoff);
    return sendJson(res, 201, { handoff });
  }

  return sendJson(res, 404, { error: 'API route not found.' });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://' + HOST);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    if (req.method !== 'GET') return sendJson(res, 405, { error: 'Only GET is allowed for static assets.' });

    let reqPath = decodeURIComponent(url.pathname);
    if (reqPath === '/favicon.ico') {
      res.writeHead(204);
      return res.end();
    }
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    let filePath = path.join(ROOT, reqPath.replace(/^\/+/, ''));
    if (!filePath.startsWith(ROOT)) return sendJson(res, 403, { error: 'Forbidden' });

    if (!fs.existsSync(filePath) && reqPath.startsWith('/images/')) {
      const alt = reqPath.includes('_') ? reqPath.replace(/_/g, ' ') : reqPath.replace(/ /g, '_');
      const altFile = path.join(ROOT, alt.replace(/^\/+/, ''));
      if (fs.existsSync(altFile)) filePath = altFile;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      return sendJson(res, 404, { error: 'File Not Found' });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const stream = fs.createReadStream(filePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*'
    });
    stream.pipe(res);
  } catch (error) {
    sendJson(res, error.status || 500, { error: error.status ? error.message : 'Server encountered an error.' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`JanSetu demo frontend: http://${HOST}:${PORT}`);
  console.log(`JanSetu demo API:      http://${HOST}:${PORT}/api`);
});
