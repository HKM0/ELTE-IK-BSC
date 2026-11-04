import select
import socket
import struct
import sys

PORT = int(sys.argv[1]) if len(sys.argv) >1 else 12345
ADDR = ( "localhost", PORT )

packer = struct.Struct( "3s 6s 8s i" )
reply_packer = struct.Struct( "i" )

def recv_exact(sock, size):
    data = b""
    while len(data) <size:
        chunk = sock.recv(size -len(data))
        if not chunk:
            return b""
        data += chunk
    return data

def tcp_server():
    raktarak = {}
    with socket.socket( socket.AF_INET, socket.SOCK_STREAM ) as server:
        server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server.bind(ADDR)
        server.listen(5)

        inputs = [server]

        while True:
            readables, _, _ = select.select( inputs, [], [], 1.0 )

            for s in readables:
                if s is server:
                    client, addr = server.accept()
                    inputs.append( client )
                    print( f"Client connected with addr:\t{ addr }" )
                    continue
                
                msg = recv_exact(s, packer.size )

                if not msg:
                    print( "Client disconnected" )
                    s.close()
                    inputs.remove( s )
                    continue

                cmd_b, w_b, p_b, q = packer.unpack( msg )
                cmd = cmd_b.decode().strip("\x00").strip()
                w = w_b.decode().strip("\x00").strip()
                p = p_b.decode().strip("\x00").strip()

                if w not in raktarak:
                    raktarak[w] = {}

                if cmd == "ADD":
                    raktarak[w][p] = raktarak[w].get(p, 0) + q
                    valasz = raktarak[w][p]
                elif cmd == "GET":
                    valasz = raktarak[w].get(p, 0)
                elif cmd == "TOT":
                    valasz = sum(raktarak[w].values())

                s.sendall(reply_packer.pack(valasz))

if __name__ == "__main__":
    tcp_server()
            