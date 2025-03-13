export default function initComprarItens() {}

const adicionar = document.querySelectorAll('[data-carrinho="btn-adicionar"]');
const total = document.querySelector('[data-total="total-preco"]');
const listaPedidos = document.querySelector('[data-lista="lista-pedidos"]');
const btnPedido = document.querySelector('[data-finalizar="btnFinalizar"]');

let carrinho = {};

function pratoInfo(botao) {
  const prato = botao.closest('.prato');
  return {
    titulo: prato.querySelector('.prato-titulo').innerText,
    preco: Number(botao.dataset.preco),
  };
}

function criarLista(titulo, preco, quantidade) {
  const lista = document.createElement('li');
  lista.innerText = `${titulo} - ${formatarPreco(preco)} Qtd:${quantidade}`;

  // botão de remover
  const botaoRemover = document.createElement('button');
  botaoRemover.innerText = 'Remover';
  botaoRemover.dataset.nome = titulo;

  // Função para remover item
  lista.appendChild(botaoRemover);

  botaoRemover.addEventListener('click', removerItem);

  // Aqui é feito o ajuste na lista usando css
  Object.assign(lista.style, {
    marginBottom: '20px',
    fontSize: '1rem',
    fontWeight: '500',
  });

  Object.assign(botaoRemover.style, {
    marginLeft: '20px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '15px',
    textDecoration: 'underline',
    fontWeight: 'bold',
  });

  return lista;
}

function atualizarCarrinho() {
  listaPedidos.innerHTML = '';
  let totalPedidos = 0;

  //Usamos Object.keys() pq carrinho é um objeto e não array
  Object.keys(carrinho).forEach(titulo => {
    const item = carrinho[titulo];
    totalPedidos += item.preco * item.quantidade;
    listaPedidos.appendChild(criarLista(titulo, item.preco, item.quantidade));
  });

  total.innerText = `Total: ${formatarPreco(totalPedidos)}`;

  Object.assign(total.style, {
    fontWeight: 'bold',
    color: 'var(--cor-primaria-6)',
  });
}

function removerItem() {
  // informação do titulo do prato
  const titulo = this.dataset.nome;

  if (carrinho[titulo].quantidade > 1) {
    carrinho[titulo].quantidade -= 1;
  } else {
    delete carrinho[titulo];
  }
  atualizarCarrinho();
}

function adicionarCarrinho() {
  const { titulo, preco } = pratoInfo(this);

  if (carrinho[titulo]) {
    carrinho[titulo].quantidade++;
  } else {
    carrinho[titulo] = { preco, quantidade: 1 };
  }
  atualizarCarrinho();
}

function formatarPreco(preco) {
  return preco
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace('\u00A0', ' ');
}

function verificarBTN() {
  if (!carrinho.quantidade > 0) {
    console.log(false);
  } else {
    console.log(true);
  }
}

adicionar.forEach(pedido => {
  pedido.addEventListener('click', adicionarCarrinho);
});

btnPedido.addEventListener('click', verificarBTN);
