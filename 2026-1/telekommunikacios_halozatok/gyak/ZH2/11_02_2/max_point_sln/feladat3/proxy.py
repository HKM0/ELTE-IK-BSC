#3

import socket
import struct
import select
import sys

PROXY_PORT = int( sys.argv[ 1 ] if len(sys.argv) > 1 else 10002)
SERVER_PORT = int( sys.argv[ 2 ] if len(sys.argv) > 2 else 20002)

PROXY_ADDR = ("localhost", PROXY_PORT)
UDP_ADDR = ("localhost", SERVER_PORT)

tcp_packer = struct.Struct( "i 20s" )
udp_packer = struct.Struct( "5s 20s" )



def recv_exact(sock, size):
    data = b""
    while len(data) <size:
        chunk = sock.recv(size - len(data))
        if not chunk:
            return b""
        data += chunk
    return data

def tcp_proxy():

    with socket.socket( socket.AF_INET, socket.SOCK_DGRAM ) as udp_sock:
        with socket.socket( socket.AF_INET, socket.SOCK_STREAM ) as server:
            server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            server.bind( PROXY_ADDR )
            server.listen()

            inputs = [ server ]

            while True:
                readables, _, _ = select.select( inputs, [], [], 1 )

                for s in readables:
                    if s is server:
                        client, addr = server.accept()
                        inputs.append( client )
                        continue

                    msg = recv_exact(s, tcp_packer.size )

                    if not msg:
                        print( "Client disconnected." )
                        s.close()
                        inputs.remove( s )
                        continue

                    kliens_tipus, felhasznalonev_bytes = tcp_packer.unpack( msg )
                    felhasznalonev = felhasznalonev_bytes.decode().strip("\x00").strip()



                    if kliens_tipus == 0:
                       parancs = b"LOGIN"
                    elif kliens_tipus == 1:
                        parancs = b"GUEST"
                    
                    udp_msg = udp_packer.pack(parancs,felhasznalonev.encode())
                    udp_sock.sendto(udp_msg, UDP_ADDR)
                    
                    valasz, _ = udp_sock.recvfrom( 1024 )

                    s.sendall( valasz )

if __name__ == "__main__":
    tcp_proxy()
