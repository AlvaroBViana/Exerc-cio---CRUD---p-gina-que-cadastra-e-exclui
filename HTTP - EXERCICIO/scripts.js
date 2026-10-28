//Passo a passo do que fazer. Ao final, os fechamentos instruídos apenas para me situar -
// não prejudica a compreensão do código, sendo apenas para se situar nele. Observa-se que não existem outros fechamentos, além daqueles ao final.

//1. Pegar o ID do elemento <ul> para manipular depois

const clientes = document.getElementById("clientes")

//2. Fazer a requisição FETCH (com o método POST) para a API CrudCrud, ao clicar no botão "Adicionar"
document.getElementById("add").addEventListener("click", () => {
//2.1 Pegar o que é digitado nos campos nome e email
const nome = document.getElementById("name").value;
const email = document.getElementById("e-mail").value;

fetch('https://crudcrud.com/api/6a28dbebb17142da97fbe7ec2f501066/clientes', {
    method: "POST",
    headers: {
        "Content-type" : "application/JSON"
    },
    body: JSON.stringify({name: nome, email: email})
})
.then(response => {
        //2.2 Protocolo de verificação da resposta do servidor
        if (!response.ok) {
            throw new Error("Erro na resposta do servidor");
        }
        return response.json();})
    
.then(Cliente => {
        //2.3 Tratamento dos dados de resposta do servidor para renderizar a página
        // Log para você verificar no console
        console.log("Cliente retornado pela API:", Cliente);
        //2.4 Será criado um elemento LI e atribuído à variável item
        const item = document.createElement("li");
        //2.5 A variável então passa na propriedade innerHTML que imprimirá na tela o que quisermos e criar um button com uma classe para acessá-la depois
        item.innerHTML = `${Cliente.name} // ${Cliente.email} <button class="btn-deletar">X</button>`;
        //2.6 Atribuí à variável clientes (que carrega o elemento <ul>) o método .appendChild() para adicionar a variável item como nó filho 
        clientes.appendChild(item);

//3. Criando o botão DELETAR e adicionando um ouvinte ao clicá-lo (não funciona fora do .then(), pois não seria preciso identificar o id específico)
        //3.1 Pegando a classe do botão e atribuindo a variável
        const botaoDeletar = item.querySelector(".btn-deletar");
        //3.2 Aqui, ele irá deletar na API externa
        botaoDeletar.addEventListener("click", () => {
            fetch(`https://crudcrud.com/api/6a28dbebb17142da97fbe7ec2f501066/clientes/${Cliente._id}`, {
                method: "DELETE"
            })
        //3.2.1 Mas precisará de resposta para deletar também na nossa página WEB
            .then(response => {
                //3.3 IF para protocolo de resposta recebida
                if (response.ok) {
                    //. Aqui é utilizada a dica da aula para remover o item na tela, usando esse método remove()
                    item.remove(); 
                    console.log("Cliente deletado!");
                }//Fechamento da execução IF
                else {alert("Erro! Resposta não recebida.")}//Fechamento da execução else
            }//Fechamento da execução para o tratamento dos dados, em caso de serem removidos após o disparo do evento
        )//Fechamento do .then da requisição DELETE;
    }//Fechamento da execução após o ouvinte
)//Fechamento do ouvinte click no botão;

        // Limpa os campos de texto após o sucesso (Também movido para dentro do bloco de sucesso)
        document.getElementById("name").value = "";
        document.getElementById("e-mail").value = "";

    }//Fechamento da execução de todo o tratamento dos dados recebidos da requisição POST
)//Fechamento do .then(dados) da requisição POST
    .catch(error => {
        console.error("Erro ao renderizar ou enviar:", error);
            } // Fechamento das chaves de execução do catch 
        ); // Fechamento do CATCH
    }//Fechamento do evento do Listener ao clicar no botão para enviar
);//Fechamento do Listener principal

//4. Requisição GET para atualizar as informações da API na página

document.addEventListener("DOMContentLoaded", () => {

    
    fetch('https://crudcrud.com/api/6a28dbebb17142da97fbe7ec2f501066/clientes/', {
        method: "GET",
        headers: {
            "Content-type" : "application/JSON"
        },
        
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na resposta do servidor");
        }
        return response.json();})
    .then(lista => {
        //4.1 Será iterado por cada elemento da lista
        lista.forEach(element => {
            //4.2 Será criado no DOM um elemento para cada objeto da lista
            const elemento = document.createElement("li");
            //4.3 Depois cada chave receberá o elemento da lista
            elemento.innerHTML = `${element.name} // ${element.email} <button class="btn-deletar">X</button>`
            //4.4 Será adicionado o elemento
            clientes.appendChild(elemento)

            
            //4.5 Copiando o botão DELETAR e aplicando nesta FETCH
            const botaoDeletar = elemento.querySelector(".btn-deletar");
            botaoDeletar.addEventListener("click", () => {
            fetch(`https://crudcrud.com/api/6a28dbebb17142da97fbe7ec2f501066/clientes/${element._id}`, {
                method: "DELETE"
            })
            .then(response => {
                
                if (response.ok) {
                    elemento.remove(); 
                    console.log("Cliente deletado!");
                }
                else {alert("Erro! Resposta não recebida.")}
            })
            })
        });
    })
    .catch(error => {
        console.error("Erro ao renderizar ou enviar:", error);
            });
})


    



