(function () {
  const modal = $('#product-menu');
  const content = modal.find('> *');
  const dismissButton = modal.find('#product-menu-dismiss');

  const dismiss = () => modal.removeClass('show');
  dismissButton.click(dismiss);

  $('.menu-button').click(() => {
    modal.addClass('show');

    const closeCallback = (event) => {
      if (!content[0].contains(event.target)) {
        dismiss();
        $(modal).off('click', closeCallback);
      }
    };
    $(modal).click(closeCallback);
  });
})();
