#!/usr/bin/env python3
"""
JanSetu Citizen Services Demo - Local Server (Python)
Provides static asset serving (HTML, CSS, JS, images) and mock e-District REST API.
"""

import http.server
import json
import os
import posixpath
import random
import sys
import urllib.parse
from datetime import datetime, timezone

HOST = '127.0.0.1'
PORT = 3000
ROOT = os.path.dirname(os.path.abspath(__file__))

ALLOWED_SERVICES = {'Caste certificate', 'Birth certificate', 'Income certificate', 'Student scholarship', 'Shop licence'}

# In-memory mock database
applications = {
    'JS-20481': {
        'id': 'JS-20481',
        'service': 'Income certificate',
        'applicant': 'Ananya Sharma',
        'formData': {
            'name': 'Ananya Sharma',
            'fatherName': 'Rajesh Sharma',
            'motherName': 'Kavita Sharma',
            'dob': '2002-11-20',
            'annualIncome': '96,000',
            'district': 'Pune, Maharashtra',
            'address': 'Flat 302, Green View Apts, Kothrud'
        },
        'status': 'Issued & Verified',
        'step': 4,
        'fee': 30,
        'upiId': '7501468140-4@ybl',
        'utr': 'UPI/2026/89412039',
        'updated': datetime.now(timezone.utc).isoformat(),
        'issuedAt': datetime.now(timezone.utc).isoformat(),
        'demo': True
    }
}

handoffs = []
portal_online = True

MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.ico': 'image/x-icon',
}

class JanSetuHandler(http.server.BaseHTTPRequestHandler):
    def send_json(self, status, data):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def read_json(self, max_bytes=65536):
        length = int(self.headers.get('Content-Length', 0))
        if length > max_bytes:
            raise ValueError('Request payload too large')
        raw = self.rfile.read(length)
        if not raw:
            return {}
        return json.loads(raw.decode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return

        if path.startswith('/api/'):
            return self.handle_api_get(path, parsed)

        # Static files serving
        if path == '/' or path == '':
            path = '/index.html'

        # Normalize relative path
        rel_path = posixpath.normpath(urllib.parse.unquote(path.lstrip('/')))
        full_path = os.path.join(ROOT, rel_path)

        # Check path safety
        if not os.path.abspath(full_path).startswith(os.path.abspath(ROOT)):
            self.send_error(403, 'Forbidden')
            return

        if not os.path.isfile(full_path):
            # Check if this might be an image in the images folder with space/underscore
            if rel_path.startswith('images/'):
                alt_name = rel_path.replace('_', ' ') if '_' in rel_path else rel_path.replace(' ', '_')
                alt_full = os.path.join(ROOT, alt_name)
                if os.path.isfile(alt_full):
                    full_path = alt_full
                else:
                    self.send_error(404, 'File Not Found')
                    return
            else:
                self.send_error(404, 'File Not Found')
                return

        ext = os.path.splitext(full_path)[1].lower()
        content_type = MIME_TYPES.get(ext, 'application/octet-stream')

        try:
            with open(full_path, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Cache-Control', 'no-store')
            self.send_header('X-Content-Type-Options', 'nosniff')
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f'Internal error: {e}')

    def handle_api_get(self, path, parsed):
        global portal_online

        if path == '/api' or path == '/api/':
            return self.send_json(200, {
                'name': 'JanSetu Citizen Services API',
                'mode': 'demo',
                'portalOnline': portal_online,
                'upiId': '7501468140-4@ybl',
                'endpoints': [
                    'GET /api/health',
                    'GET /api/applications',
                    'POST /api/applications',
                    'POST /api/applications/refresh',
                    'POST /api/portal',
                    'POST /api/handoffs'
                ]
            })

        if path == '/api/health':
            return self.send_json(200, {
                'status': 'ok',
                'mode': 'demo',
                'host': HOST,
                'portalOnline': portal_online,
                'upiId': '7501468140-4@ybl',
                'timestamp': datetime.now(timezone.utc).isoformat()
            })

        if path == '/api/applications':
            return self.send_json(200, {
                'applications': list(applications.values())
            })

        if path.startswith('/api/certificates/'):
            cert_id = path.split('/')[-1]
            app = applications.get(cert_id)
            if not app:
                return self.send_json(404, {'error': 'Certificate not found'})
            return self.send_json(200, {'certificate': app})

        return self.send_json(404, {'error': 'API route not found'})

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if not path.startswith('/api/'):
            return self.send_json(404, {'error': 'Endpoint not found'})

        try:
            body = self.read_json()
        except Exception as e:
            return self.send_json(400, {'error': f'Invalid JSON payload: {e}'})

        global portal_online

        if path == '/api/applications':
            service = body.get('service')
            if not service:
                return self.send_json(400, {'error': 'Service is required'})
            
            # Check portal online
            if not portal_online:
                return self.send_json(503, {'error': 'The mock portal is temporarily unavailable. Simulation outage active.'})

            # Generate reference ID
            prefix = 'JS-CAST' if 'Caste' in service else 'JS-BIRTH' if 'Birth' in service else 'JS-INC' if 'Income' in service else 'JS-EDIST'
            app_id = f"{prefix}-{random.randint(100000, 999999)}"

            applicant = body.get('formData', {}).get('name') or body.get('applicant', 'Sample Citizen')
            fee = body.get('payment', {}).get('amount') or (25 if 'Birth' in service else 30)
            utr = body.get('payment', {}).get('utr') or f"UPI/{random.randint(10000000, 99999999)}"

            app = {
                'id': app_id,
                'service': service,
                'applicant': applicant,
                'formData': body.get('formData', {}),
                'status': 'Issued & Verified',
                'step': 4,
                'fee': fee,
                'upiId': '7501468140-4@ybl',
                'utr': utr,
                'updated': datetime.now(timezone.utc).isoformat(),
                'issuedAt': datetime.now(timezone.utc).isoformat(),
                'demo': True
            }
            applications[app_id] = app
            return self.send_json(201, {'application': app, 'status': 'success'})

        if path == '/api/applications/refresh':
            if not portal_online:
                return self.send_json(503, {'error': 'Mock portal is offline. Cannot refresh.'})
            now = datetime.now(timezone.utc).isoformat()
            for app in applications.values():
                if app['status'] != 'Issued & Verified':
                    app['status'] = 'Issued & Verified'
                    app['updated'] = now
            return self.send_json(200, {'applications': list(applications.values())})

        if path == '/api/portal':
            online = body.get('online')
            if not isinstance(online, bool):
                return self.send_json(400, {'error': 'Expected boolean property "online"'})
            portal_online = online
            return self.send_json(200, {'portalOnline': portal_online})

        if path == '/api/handoffs':
            hid = f"HELP-{random.randint(1000, 9999)}"
            handoff = {
                'id': hid,
                'createdAt': datetime.now(timezone.utc).isoformat(),
                'reason': body.get('reason', 'user_requested'),
                'status': 'queued-demo'
            }
            handoffs.append(handoff)
            return self.send_json(201, {'handoff': handoff})

        return self.send_json(404, {'error': 'API endpoint not found'})

    def log_message(self, format, *args):
        # Concise logging
        sys.stderr.write(f"[{datetime.now().strftime('%H:%M:%S')}] {args[0]} {args[1]}\n")

def run(port=PORT):
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    server_address = (HOST, port)
    httpd = http.server.ThreadingHTTPServer(server_address, JanSetuHandler)
    print(f"=====================================================")
    print(f"  JanSetu Citizen Services Portal (Python Server)")
    print(f"  Portal URL:   http://{HOST}:{port}/")
    print(f"  API Endpoint: http://{HOST}:{port}/api")
    print(f"  UPI Receiver: 7501468140-4@ybl")
    print(f"=====================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer shutting down gracefully.")
        httpd.server_close()

if __name__ == '__main__':
    port = PORT
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    run(port)
