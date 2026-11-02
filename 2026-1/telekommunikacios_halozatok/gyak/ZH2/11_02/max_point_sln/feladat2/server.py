import select
import socket
import struct
import sys

ADDR = ( "localhost", int( sys.argv[ 1 ] ) )

adatb = {}

rcv_packer = struct.Struct( "3s 6s 8s i" )
snd_packer = struct.Struct( "i" )

with socket.socket( socket.AF_INET, socket.SOCK_STREAM ) as server:
    server.bind( ADDR )
    server.listen()

    inputs = [ server ]

    while True:
        readables, _, _ = select.select( inputs, [], [], 1 )

        for s in readables:
            if s is server:
                client, addr = server.accept()
                inputs.append( client )
                print( f"Client connected with addr:\t{ addr }" )
                continue
                
            msg = s.recv( rcv_packer.size )

            if not msg:
                print( "Client disconnected" )
                s.close()
                inputs.remove( s )
                continue

            command, raktar, termek, darab = rcv_packer.unpack( msg )
            command = command.decode().strip( '\0' )
            raktar = raktar.decode().strip( '\0' )
            termek = termek.decode().strip( '\0' )

            print( f"Client sent: { command } { raktar } { termek }." )

            if command == "ADD":
                print( "ADD" )

                if raktar not in adatb:
                    adatb[ raktar ] = {}

                if termek not in adatb[ raktar ]:
                    adatb[ raktar ][ termek ] = 0

                adatb[ raktar ][ termek ] += darab

                print( f">\t{ raktar }->{ termek } updated to:\t{ adatb[ raktar ][ termek ] }" )
                s.sendall( snd_packer.pack( adatb[ raktar ][ termek ] ) )
            elif command == "GET":
                print( "GET" )

                value = 0
                if raktar in adatb and termek in adatb[ raktar ]:
                    value = adatb[ raktar ][ termek ]

                print( f">\t{ raktar }->{ termek } amount now is:\t{ value }" )
                s.sendall( snd_packer.pack( value ) )
            elif command == "TOT":
                print( "TOT" )

                value = 0
                if raktar in adatb:
                    value = sum( adatb[ raktar ].values() )

                print( f">\t{ raktar }'s total inventory:\t{ value }" )
                s.sendall( snd_packer.pack( value ) )
            else:
                print( f"Unexpected command: { command }" )

            