import os
import sys
import threading
from socket import socket, AF_INET, SOCK_STREAM

port = 50008
host = 'localhost'

stdoutmutex = threading.Lock()

if __name__=='__main__':
    unique = "12345"
    sock = socket(AF_INET, SOCK_STREAM)
    sock.connect((host, port))
    sock.send(unique)
    reply = sock.recv(1024)
    sock.close()
    with stdoutmutex:
        print 'client got : [%s]' % reply
