// Carrinho
let carrinhoIcone = document.querySelector("#carrinho-icone");
let carrinho = document.querySelector(".carrinho");
let fecharCarrinho = document.querySelector("#fechar-carrinho");

// Abrir Carrinho
carrinhoIcone.onclick = () => {
    carrinho.classList.add("ativo");
};
//Fechar Carrinho
fecharCarrinho.onclick = () => {
    carrinho.classList.remove("ativo");
};
//Carrinho Funcionando JS
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}
//Fazendo Função
function ready(){
    //Remover Itens do Carrinho
    var removerBotaoCarrinho = document.getElementsByClassName("carrinho-remover");
    console.log(removerBotaoCarrinho)
    for (var i = 0; i< removerBotaoCarrinho.length; i++){
        var button=removerBotaoCarrinho[i];
        button.addEventListener("click", removerItemCarrinho);
    }
    //Quantidade Mudanças
    var quantidadeEntrada = document.getElementsByClassName("carrinho-quantidade");
    for (var i = 0; i < quantidadeEntrada.length; i++){
        var input = quantidadeEntrada[i];
        input.addEventListener("change", quantidadeMudar);
    }
    //Adicionar no carrinho
    var addCarrinho = document.getElementsByClassName("add-carrinho");
    for (var i = 0; i < addCarrinho.length; i++){
        var button = addCarrinho[i];
        button.addEventListener("click", addCarrinhoClicked);
    }
    //Função do botão comprar
    document
    .getElementsByClassName("btn-comprar")[0]
    .addEventListener("click", botaoCompraClicked);
}
// Botão Comprar
function botaoCompraClicked(){
    alert("Pedido feito");
    var carrinhoConteudo = document.getElementsByClassName("carrinho-conteudo")[0];
    while(carrinhoConteudo.hasChildNodes()){
        carrinhoConteudo.removeChild(carrinhoConteudo.firstChild);
    }
    updatetotal();
}
//Remover Itens do Carrinho
function removerItemCarrinho(event) {
    var botaoClicked = event.target;
    botaoClicked.parentElement.remove();
    updatetotal();
}
//Quantidade Mudanças
function quantidadeMudar(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
//Adicionar no carrinho
function addCarrinhoClicked(event){
    var button = event.target;
    var shopProdutos = button.parentElement;
    var titulo = shopProdutos.getElementsByClassName("produto-titulo")[0].innerText;
    var preco= shopProdutos.getElementsByClassName("preco")[0].innerText;
    var produtoImagem= shopProdutos.getElementsByClassName("produto-img")[0].src;
    addProdutoNoCarrinho(titulo, preco, produtoImagem);
    updatetotal();
}
function addProdutoNoCarrinho(titulo, preco, produtoImagem) {
    var carrinhoShopBox = document.createElement("div");
    carrinhoShopBox.classList.add("carrinho-caixa");
    var carrinhoItens = document.getElementsByClassName("carrinho-conteudo")[0];
    var carrinhoItensNomes = carrinhoItens.getElementsByClassName("carrinho-produto-titulo");
    for (var i = 0; i < carrinhoItensNomes.length; i++){
        if (carrinhoItensNomes[i].innerText == titulo){
        alert ("Você já adicionou esse item ao carrinho");
        return;
    }
    }
    

var carrinhoBoxConteudo = `
                        <img src="${produtoImagem}" alt="" class="carrinho-img">
                        <div class="detalhes-caixa">
                            <div class="carrinho-produto-titulo">${titulo}</div>
                            <div class="carrinho-preco">${preco}</div>
                            <input type="number" value="1" class="carrinho-quantidade">
                        </div>
                        <!--Remover do carrinho-->
                        <i class='bx bxs-trash-alt carrinho-remover'></i>`;
carrinhoShopBox.innerHTML = carrinhoBoxConteudo;
carrinhoItens.append(carrinhoShopBox);
carrinhoShopBox.getElementsByClassName("carrinho-remover")[0].addEventListener("click", removerItemCarrinho);
carrinhoShopBox.getElementsByClassName("carrinho-quantidade")[0].addEventListener("change", quantidadeMudar);
}

//Atualização Total
function updatetotal(){
    var conteudoCarrinho = document.getElementsByClassName("carrinho-conteudo")[0];
    var boxesCarrinho = conteudoCarrinho.getElementsByClassName("carrinho-caixa");
    var total = 0;
    for (var i = 0; i< boxesCarrinho.length; i++){
        var boxCarrinho = boxesCarrinho[i];
        var precoElemento = boxCarrinho.getElementsByClassName("carrinho-preco")[0];
        var quantidadeElemento = boxCarrinho.getElementsByClassName("carrinho-quantidade")[0];
        var preco = parseFloat (precoElemento.innerText.replace("R$", ""));
        var quantidade = quantidadeElemento.value;
        total = total + preco * quantidade;
    }
        //Se o preço contiver algum valor de centavos
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-preco")[0].innerText = "R$" + total;
    
}