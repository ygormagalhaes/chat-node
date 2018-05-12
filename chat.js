// Importar as configurações do servidor
var app = require( './config/server' );

// Parametrizar a porta de escuta
var server = app.listen( 8080, () => {
    console.log( 'Iniciando aplicação.' );
} );

var io = require( 'socket.io' ).listen( server );

app.set( 'io', io );

io.on( 'connect', ( socket ) => {

    console.log( 'Usuário conectou.' );

    socket.on( 'disconnect', () => {
        console.log( 'Usuário desconectou.' );
    } );

    socket.on( 'mensagemCliente', data => {

        socket.emit( 'mensagemServidor', data );
        socket.broadcast.emit( 'mensagemServidor', data );

        console.log( data );

        if ( data.apelidoListado === 'false' ) {

            socket.emit( 'atualizaListaUsuarios', data.apelido );
            socket.broadcast.emit( 'atualizaListaUsuarios', data.apelido );

        }

    } );

} );