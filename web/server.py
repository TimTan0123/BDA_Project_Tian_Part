from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from SocketServer import ThreadingMixIn
import threading
import argparse
import re
import cgi
import json
from keyword_func import keyword_search
from predict_func import predict_rate

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if None != re.search('/get/keyword/*', self.path):
            k = self.path.split('/')[-1]
            results = keyword_search(k, 'demo')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(results)
        elif None != re.search('/get/place/*', self.path):
            latlng = self.path.split('/')[-1]
            lat = latlng.split('z')[0]
            lng = latlng.split('z')[1]
            results = keyword_search("test", 'demo')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(results)
        elif None != re.search('/get/predict/*', self.path):
            business_id = self.path.split('/')[-1]
            if business_id == '0':
                results = predict_rate(business_id, 'demo')
            else: 
                results = predict_rate(business_id, '')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(results)
        elif None != re.search('/get/all/*', self.path):
            which = self.path.split('/')[-1]
            if which == 'all':
                results = open('all.json', 'r').read()
            elif which == 'bars':
                results = open('bars.json', 'r').read()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(results)
        else:
            self.send_response(403)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
        return
 
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    allow_reuse_address = True
 
    def shutdown(self):
        self.socket.close()
        HTTPServer.shutdown(self)
 
class SimpleHttpServer():
    def __init__(self, ip, port):
        self.server = ThreadedHTTPServer((ip, port), HTTPRequestHandler)
 
    def start(self):
        self.server_thread = threading.Thread(target=self.server.serve_forever)
        self.server_thread.daemon = True
        self.server_thread.start()
 
    def waitForThread(self):
        self.server_thread.join()
 
    def addRecord(self, recordID, jsonEncodedRecord):
        LocalData.records[recordID] = jsonEncodedRecord
 
    def stop(self):
        self.server.shutdown()
        self.waitForThread()
 
if __name__=='__main__': 
    server = SimpleHttpServer('0.0.0.0', 7777)
    print('HTTP Server Running...........')
    server.start()
    server.waitForThread()


