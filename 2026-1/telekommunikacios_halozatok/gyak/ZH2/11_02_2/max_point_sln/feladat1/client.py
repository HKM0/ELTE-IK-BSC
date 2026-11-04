import socket
import struct
import sys

HOST = sys.argv[1] if len(sys.argv) > 1 else "localhost"
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 20001
SERVER_ADDR = (HOST, PORT)

NEPTUN = "abc123"
JARATSZAM = "LH2048"


client_packer = struct.Struct( "6s 8s 7s" )
reply1_packer = struct.Struct( "i 10s" )
reply2_packer = struct.Struct( "12s" )

with socket.create_connection(SERVER_ADDR) as sock:
    #1.
    kuld1 = client_packer.pack(NEPTUN.encode(), JARATSZAM.encode(), b"request")
    sock.sendall(kuld1)

    #2 
    raw1 = sock.recv(reply1_packer.size)
    szabad_helyek, osztaly_bytes = reply1_packer.unpack(raw1)
    osztaly = osztaly_bytes.decode().strip("\x00").strip()

    #3.
    if osztaly == "economy" and szabad_helyek>=3:
        muvelet = b"reserve"
    else:
        muvelet = b"reject"
    
    #4. 
    kuld2 = client_packer.pack(NEPTUN.encode(), JARATSZAM.encode(), muvelet)
    sock.sendall(kuld2)

    #5. 
    raw2 = sock.recv(reply2_packer.size)
    (azonosito_bytes,) = reply2_packer.unpack(raw2)
    azonosito = azonosito_bytes.decode().strip("\x00")
    print("foglalasi azonosito: ", azonosito)