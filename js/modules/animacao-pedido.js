export default function initAnimacaoPedidio() {
  Swal.fire({
    title: 'Pedido Enviado!',
    text: 'Seu pedido foi enviado para o WhatsApp.',
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#ff2222',
    background: '#fff',
    color: '#333',
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  });
}
