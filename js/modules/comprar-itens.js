import initAnimacaoPedidio from './animacao-pedido.js';

export default function initComprarItens() {
  const adicionar = document.querySelectorAll(
    '[data-carrinho="btn-adicionar"]',
  );
  const total = document.querySelector('[data-total="total-preco"]');
  const listaPedidos = document.querySelector('[data-lista="lista-pedidos"]');
  const btnPedido = document.querySelector('[data-finalizar="btnFinalizar"]');
  const textoErro = document.getElementById('textoErro');
  const endereco = document.getElementById('endereco');
  const checkout = document.querySelector('[data-pedidos="checkout-modal"]');

  let carrinho = [];

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

  function finalizarPedido() {
    if (Object.keys(carrinho).length === 0) {
      Swal.fire({
        title: 'Carrinho Vazio!',
        text: 'Adicione itens ao carrinho antes de finalizar a compra.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff2222',
      });
      return;
    }
    if (endereco.value === '') {
      endereco.style.border = ' 3px solid red';
      endereco.style.borderRadius = '3px';
      endereco.style.fontSize = '15px';
      textoErro.classList.add('ativo');
      return;
    } else {
      const carrinhoItens = Object.keys(carrinho)
        .map(titulo => {
          const item = carrinho[titulo];
          return `${titulo} - ${formatarPreco(item.preco)} Qtd:${
            item.quantidade
          }`;
        })
        .join('');

      const mensagem = encodeURIComponent(carrinhoItens);
      const numero = '5511998765432';

      window.open(
        `https://wa.me/${numero}?text=${mensagem}%0AEndereço:%20${endereco.value}`,
        '_blank',
      );

      Swal.fire({
        title: 'Pedido Enviado!',
        text: 'Obrigado por escolher nossos hamburguers',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#7FFF00',
      });
    }

    carrinho = [];
    checkout.classList.remove('ativo');
    endereco.value = '';
    atualizarCarrinho();
  }

  btnPedido.addEventListener('click', finalizarPedido);
  adicionar.forEach(pedido => {
    pedido.addEventListener('click', adicionarCarrinho);
  });
}
