export default function initCarrinho() {
  const carrinho = document.querySelectorAll('[data-pedido="btn-pedido"]');
  const checkout = document.querySelector('[data-pedidos="checkout-modal"]');
  const btnFechar = document.querySelector('[data-fechar="fechar-checkout"]');

  function checkoutAtivar() {
    checkout.classList.add('ativo');
  }

  if (checkout && btnFechar) {
    function checkoutFechar(event) {
      event.preventDefault();
      checkout.classList.remove('ativo');
    }

    function checkoutFora(event) {
      if (event.target === this) {
        checkoutFechar(event);
      }
    }

    btnFechar.addEventListener('click', checkoutFechar);
    checkout.addEventListener('click', checkoutFora);
  }

  carrinho.forEach(item => {
    item.addEventListener('click', checkoutAtivar);
  });
}
