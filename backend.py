#!/usr/bin/env python3
"""
JanSetu Digital Citizen Services & e-District Portal - Backend Server
----------------------------------------------------------------------
Provides a high-performance REST API and static asset server using
Python's standard library (no third-party dependencies required).

Endpoints:
  GET  /api                     - Service metadata and route index
  GET  /api/health              - Portal health and connectivity status
  GET  /api/applications        - Retrieve all citizen applications
  GET  /api/certificates/<id>   - Retrieve specific issued certificate
  POST /api/applications        - Submit application with verified UPI payment
  POST /api/applications/refresh- Sync and finalize pending applications
  POST /api/verify-payment      - Real-time simulated UPI verification
  POST /api/portal              - Toggle simulation portal outage mode
  POST /api/handoffs            - Human assistance escalation ticket
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

UPI_RECEIVER_ID = '7501468140-4@ybl'

SERVICES = {
    'Caste certificate': {'fee': 30, 'code': 'CAST'},
    'Birth certificate': {'fee': 25, 'code': 'BIRTH'},
    'Income certificate': {'fee': 30, 'code': 'INC'},
    'Student scholarship': {'fee': 25, 'code': 'SCHOL'},
    'Shop licence': {'fee': 50, 'code': 'SHOP'}
}

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


class JanSetuBackendService:
    """Core in-memory service layer for JanSetu Portal."""

    def __init__(self):
        self.portal_online = True
        self.handoffs = []
        self.audit_log = []
        now_iso = datetime.now(timezone.utc).isoformat()
        self.applications = {
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
                'upiId': UPI_RECEIVER_ID,
                'utr': 'UPI/2026/89412039',
                'updated': now_iso,
                'issuedAt': now_iso,
                'demo': True
            }
        }

    def get_info(self):
        return {
            'name': 'JanSetu Citizen Services API',
            'version': '2.0.0',
            'mode': 'demo',
            'portalOnline': self.portal_online,
            'upiReceiverId': UPI_RECEIVER_ID,
            'supportedServices': list(SERVICES.keys()),
            'endpoints': [
                'GET  /api',
                'GET  /api/health',
                'GET  /api/applications',
                'GET  /api/certificates/<id>',
                'POST /api/applications',
                'POST /api/applications/refresh',
                'POST /api/verify-payment',
                'POST /api/portal',
                'POST /api/handoffs'
            ]
        }

    def get_health(self):
        return {
            'status': 'ok',
            'mode': 'demo',
            'host': HOST,
            'portalOnline': self.portal_online,
            'upiId': UPI_RECEIVER_ID,
            'activeApplications': len(self.applications),
            'timestamp': datetime.now(timezone.utc).isoformat()
        }

    def list_applications(self):
        return list(self.applications.values())

    def get_certificate(self, cert_id):
        return self.applications.get(cert_id)

    def create_application(self, payload):
        if not self.portal_online:
            raise RuntimeError('e-District portal is currently offline. Retry when portal is restored.')

        service = payload.get('service', 'Income certificate')
        cfg = SERVICES.get(service, {'fee': 30, 'code': 'EDIST'})
        prefix = f"JS-{cfg['code']}"
        app_id = f"{prefix}-{random.randint(100000, 999999)}"

        form_data = payload.get('formData', {})
        applicant = form_data.get('name') or payload.get('applicant', 'Citizen Applicant')
        payment_info = payload.get('payment', {})
        fee = payment_info.get('amount') or cfg['fee']
        utr = payment_info.get('utr') or f"UPI/{random.randint(10000000, 99999999)}"

        now_iso = datetime.now(timezone.utc).isoformat()
        app = {
            'id': app_id,
            'service': service,
            'applicant': applicant,
            'formData': form_data,
            'status': 'Issued & Verified',
            'step': 4,
            'fee': fee,
            'upiId': UPI_RECEIVER_ID,
            'utr': utr,
            'updated': now_iso,
            'issuedAt': now_iso,
            'demo': True
        }
        self.applications[app_id] = app
        return app

    def refresh_applications(self):
        if not self.portal_online:
            raise RuntimeError('e-District portal is currently offline. Cannot sync statuses.')

        now_iso = datetime.now(timezone.utc).isoformat()
        for app in self.applications.values():
            if app.get('status') != 'Issued & Verified':
                app['status'] = 'Issued & Verified'
                app['step'] = 4
                app['updated'] = now_iso
                if not app.get('issuedAt'):
                    app['issuedAt'] = now_iso
        return list(self.applications.values())

    def set_portal_online(self, is_online):
        self.portal_online = bool(is_online)
        return self.portal_online

    def create_handoff(self, payload):
        hid = f"HELP-{random.randint(1000, 9999)}"
        entry = {
            'id': hid,
            'createdAt': datetime.now(timezone.utc).isoformat(),
            'reason': payload.get('reason', 'user_requested'),
            'service': payload.get('service', 'General assistance'),
            'status': 'queued-demo'
        }
        self.handoffs.append(entry)
        return entry

    def verify_payment(self, payload):
        utr = payload.get('utr', '').strip()
        amount = payload.get('amount', 30)
        return {
            'verified': True,
            'utr': utr or f"UPI/{random.randint(10000000, 99999999)}",
            'amount': amount,
            'receiver': UPI_RECEIVER_ID,
            'status': 'SUCCESS',
            'timestamp': datetime.now(timezone.utc).isoformat()
        }


# Singleton service instance
service_backend = JanSetuBackendService()


class JanSetuHTTPHandler(http.server.BaseHTTPRequestHandler):
    """HTTP Request Handler serving both REST API and Portal Static Assets."""

    def send_json(self, status, data):
        body = json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def read_json(self, max_bytes=65536):
        length = int(self.headers.get('Content-Length', 0))
        if length > max_bytes:
            raise ValueError('Request payload too large')
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        return json.loads(raw.decode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Accept')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return

        # Route API requests
        if path.startswith('/api'):
            return self.handle_api_get(path)

        # Route Static Files
        return self.serve_static(path)

    def handle_api_get(self, path):
        if path in ('/api', '/api/'):
            return self.send_json(200, service_backend.get_info())

        if path == '/api/health':
            return self.send_json(200, service_backend.get_health())

        if path == '/api/applications':
            return self.send_json(200, {'applications': service_backend.list_applications()})

        if path.startswith('/api/certificates/'):
            cert_id = path.split('/')[-1]
            cert = service_backend.get_certificate(cert_id)
            if not cert:
                return self.send_json(404, {'error': f'Certificate "{cert_id}" not found'})
            return self.send_json(200, {'certificate': cert})

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

        try:
            if path == '/api/applications':
                service = body.get('service')
                if not service:
                    return self.send_json(400, {'error': 'Service name is required'})
                app = service_backend.create_application(body)
                return self.send_json(201, {'application': app, 'status': 'success'})

            if path == '/api/applications/refresh':
                apps = service_backend.refresh_applications()
                return self.send_json(200, {'applications': apps, 'status': 'synced'})

            if path == '/api/verify-payment':
                res = service_backend.verify_payment(body)
                return self.send_json(200, res)

            if path == '/api/portal':
                online = body.get('online')
                if not isinstance(online, bool):
                    return self.send_json(400, {'error': 'Expected boolean property "online"'})
                status = service_backend.set_portal_online(online)
                return self.send_json(200, {'portalOnline': status})

            if path == '/api/handoffs':
                handoff = service_backend.create_handoff(body)
                return self.send_json(201, {'handoff': handoff})

            return self.send_json(404, {'error': 'API endpoint not found'})
        except RuntimeError as e:
            return self.send_json(503, {'error': str(e)})

    def serve_static(self, path):
        if path in ('/', ''):
            path = '/index.html'

        rel_path = posixpath.normpath(urllib.parse.unquote(path.lstrip('/')))
        full_path = os.path.join(ROOT, rel_path)

        # Path traversal guard
        if not os.path.abspath(full_path).startswith(os.path.abspath(ROOT)):
            self.send_error(403, 'Forbidden')
            return

        if not os.path.isfile(full_path):
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

    def log_message(self, format, *args):
        # Concise formatted logging
        sys.stderr.write(f"[{datetime.now().strftime('%H:%M:%S')}] {args[0]} {args[1]}\n")


def run(port=PORT):
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    server_address = (HOST, port)
    httpd = http.server.ThreadingHTTPServer(server_address, JanSetuHTTPHandler)
    print("=" * 60)
    print("  JanSetu Citizen Services & e-District Portal - Backend")
    print(f"  Portal URL:    http://{HOST}:{port}/")
    print(f"  API Root:      http://{HOST}:{port}/api")
    print(f"  API Health:    http://{HOST}:{port}/api/health")
    print(f"  UPI Receiver:  {UPI_RECEIVER_ID}")
    print("=" * 60)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nBackend shutting down gracefully.")
        httpd.server_close()


if __name__ == '__main__':
    port = PORT
    if len(sys.argv) > 1:
        arg = sys.argv[1].replace('--port=', '')
        if arg.isdigit():
            port = int(arg)
    run(port)
