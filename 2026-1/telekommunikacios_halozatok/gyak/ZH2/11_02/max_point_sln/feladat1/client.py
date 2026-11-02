import socket
import struct
import sys

ADDR = ( sys.argv[ 1 ], int( sys.argv[ 2 ] ) )

NEPTUN = "abc123"
JARAT = "MU102"

snd_packer = struct.Struct( "6s 8s 7s" )
rcv_packer = struct.Struct( "i 10s" )
id_packer = struct.Struct( "12s" )

with socket.socket( socket.AF_INET, socket.SOCK_STREAM ) as client:
    client.connect( ADDR )

    client.sendall( snd_packer.pack( NEPTUN.encode(), JARAT.encode(), "request".encode() ) )

    num, osztaly = rcv_packer.unpack( client.recv( rcv_packer.size ) )
    osztaly = osztaly.decode()

    good = not ( num < 5 or osztaly != "business" )

    if not good:
        client.sendall( snd_packer.pack( NEPTUN.encode(), JARAT.encode(), "reject".encode() ) )
    else:
        client.sendall( snd_packer.pack( NEPTUN.encode(), JARAT.encode(), "reserve".encode() ) )

    azon = id_packer.unpack( client.recv( id_packer.size ) )