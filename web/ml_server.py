import os
import sys
import threading
import json
from socket import socket, AF_INET, SOCK_STREAM

port = 50008
host = 'localhost'

stdoutmutex = threading.Lock()

def server():
    sock = socket(AF_INET, SOCK_STREAM)
    sock.bind(('', port)) 
    sock.listen(10)
    while True:
        conn, addr = sock.accept()
        data = conn.recv(1024) # bufsize
        unique = 'server got : [%s]\n' % data
        dict = {
           "name": "aaa",
           "age": 30
        }
        f = open(data + ".json", "w")
        json.dump(dict, f)
        f.close()
        conn.send(unique.encode())

if __name__=='__main__':
    sthread = threading.Thread(target=server)
    sthread.daemon = False
    sthread.start()
