module.exports = application => {

    application.get('/', (req, res) => {
        application.app.controllers.indexController.index(application, req, res);
    });

}