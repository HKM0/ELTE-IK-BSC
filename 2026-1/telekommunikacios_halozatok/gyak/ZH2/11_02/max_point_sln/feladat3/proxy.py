import socket
import struct
import select
import sys

TCP_ADDR = ( "localhost", int( sys.argv[ 1 ] ) )
UDP_ADDR = ( "localhost", int( sys.argv[ 2 ] ) )

tcp_rcv_packer = struct.Struct( "i 20s" )
udp_snd_packer = struct.Struct( "5s 20s" )

with socket.socket( socket.AF_INET, socket.SOCK_STREAM ) as tcp_server, socket.socket( socket.AF_INET, socket.SOCK_DGRAM ) as udp_client:
    tcp_server.bind( TCP_ADDR )
    tcp_server.listen()
    
    print( f"TCP server started at:\t{ TCP_ADDR }" )

    inputs = [ tcp_server ]

    while True:
        readables, _, _ = select.select( inputs, [], [], 1 )

        for s in readables:
            if s is tcp_server:
                client, addr = tcp_server.accept()
                inputs.append( client )
                print( f"TCP client connected on: { addr[ 0 ] } : { addr[ 1 ] }" )
                continue

            msg = s.recv( tcp_rcv_packer.size )

            if not msg:
                print( "Client disconnected." )
                s.close()
                inputs.remove( s )
                continue

            tipus, felhasznalonev = tcp_rcv_packer.unpack( msg )


            if tipus == 0:
                udp_client.sendto( udp_snd_packer.pack( "LOGIN".encode(), felhasznalonev ), UDP_ADDR )
            elif tipus == 1:
                udp_client.sendto( udp_snd_packer.pack( "GUEST".encode(), felhasznalonev ), UDP_ADDR )

            data, _ = udp_client.recvfrom( 1024 )

            s.sendall( data )
