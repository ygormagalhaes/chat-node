module.exports.iniciaChat = ( application, req, res ) => {

    var dadosForm = req.body;

    req.assert( 'apelido', 'Nome ou apelido é obrigatório.' ).notEmpty();
    req.assert( 'apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres.' ).len( 3, 15 );

    var erros = req.validationErrors();

    var palavra = 'Balão';

    if ( erros ) {

        res.render( 'index', {
            validacao: erros
        } );

    } else {

        res.render( 'chat', {
            apelido: dadosForm.apelido
        } );

        application.get( 'io' ).emit( 'mensagemServidor', {
            apelido: dadosForm.apelido,
            mensagem: 'Acabou de entrar no chat.'
        } );

    }

}