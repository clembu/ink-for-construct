#!/usr/bin/env python3

from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import sys
import os
from functools import partial

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('--bind', '-b', metavar='ADDRESS',
                        help='Specify alternate bind address '
                             '[default: all interfaces]')
    parser.add_argument('--directory', '-d', default=os.getcwd(),
                        help='Specify alternative directory '
                        '[default:current directory]')
    parser.add_argument('port', action='store',
                        default=50000, type=int,
                        nargs='?',
                        help='Specify alternate port [default: 50000]')
    args = parser.parse_args()
    handler_class = partial(CORSRequestHandler,
                            directory=args.directory)

    test(
        HandlerClass=handler_class,
        ServerClass=HTTPServer,
        port=args.port,
        bind=args.bind,
    )
