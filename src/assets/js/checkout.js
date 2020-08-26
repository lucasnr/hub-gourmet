(function () {
  const modal = $('#entrega-modal');
  const dismissButton = modal.find('.modal__dismiss');
  const searchForm = modal.find('.modal__search-form');
  const addressForm = modal.find('.modal__address-form');

  const addressSection = $('#address-section');
  const changeButton = addressSection.find('#address-section-change');
  const buildAddressSection = ({ logradouro, numero, bairro, uf, title }) => {
    addressSection.css('display', 'block');
    addressSection.find('#address-section-title').text(title);
    addressSection
      .find('#address-section-street-number')
      .text(`${logradouro}, ${numero}`);
    addressSection
      .find('#address-section-neighborhood-uf')
      .text(`${bairro}/${uf}`);
  };

  const buildRetirar = () => {
    buildAddressSection({
      logradouro: 'Rua Mem de Sá',
      numero: '150',
      localidade: 'Icaraí',
      bairro: 'Niterói',
      uf: 'RJ',
      title: 'Retirar no local',
    });

    changeButton.css('display', 'none');
  };
  $('#retirar').change(buildRetirar);

  let address;
  let saved = false;

  const buildSavedAddress = () => {
    buildAddressSection({ ...address, title: 'Receber no endereço' });
    changeButton.css('display', 'block');
  };

  const show = () => {
    if (saved) buildSavedAddress();
    else modal.addClass('show');
  };
  $('#entrega').change(show);

  changeButton.click(() => {
    buildSavedAddress();
    modal.addClass('show');
  });

  const dismiss = () => {
    modal.removeClass('show');
    if (saved) buildSavedAddress();
    else {
      $('#retirar').prop('checked', 'checked');
      buildRetirar();
    }
  };
  dismissButton.click(dismiss);

  const setAddress = (data) => {
    if (!data.cep) {
      addressForm.removeClass('show');
      address = null;
      return;
    }

    address = data;
    const { logradouro, complemento, bairro, localidade } = address;
    addressForm.find('#rua').val(logradouro);
    addressForm.find('#complemento').val(complemento);
    addressForm.find('#bairro').val(bairro);
    addressForm.find('#cidade').val(localidade);
    addressForm.addClass('show');
  };

  searchForm.find('input').mask('00000-000', {
    onComplete: (maskedCep, event, input) => {
      const cep = input.cleanVal();
      $.get(`https://viacep.com.br/ws/${cep}/json/`, setAddress);
    },
  });

  searchForm.submit((event) => event.preventDefault());
  addressForm.submit((event) => {
    event.preventDefault();
    saved = Boolean(address && address.cep);
    address.numero = addressForm.find('#numero').val();
    dismiss();
  });
})();
