import os
import sys
import threading
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
        with stdoutmutex:
            print data
        reply = 'server got : [%s]\n' % data
        conn.send(reply.encode())

if __name__=='__main__':
    sthread = threading.Thread(target=server)
    sthread.daemon = False
    sthread.start()
