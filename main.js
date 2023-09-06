const { default: axios } = require('axios');
const {app, BrowserWindow, Notification} = require('electron')

function carregar_janela() {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,
    });
    janela.loadFile("index.html");
}
app.whenReady().then(() => {
    carregar_janela()
    chamaApi()
   // novaNotification();

})


function novaNotification(){

    if (!Notification.isSupported) {

        console.log("Notificações não são suportadas neste ambiente.");
        return;        
    }

    const novaNotification = new Notification({
        title: "Aplicativo aberto",
        body: "O aplicativo foi aberto com sucesso",
        silent: true,
        timeoutType: "default",

    });

    console.log("Exibindo notificação");

    novaNotification.show();
}

function chamaApi(){

    axios.get("http://localhost:3000/mostrarNotificacao").then(Response => {
        console.log(Response);


        retornoTitulo = Response.data.notificacao.titulo;

        console.log('O que tem aqui ?',Response.data.notificacao)


        const novaNotification = new Notification({
            title: retornoTitulo,
            body: "O aplicativo foi aberto com sucesso",
            silent: true,
            timeoutType: "default",
    
        });
    
        console.log("Exibindo notificação");
    
        novaNotification.show();


    }).catch(Error => {
        console.error(Error);
    })
}