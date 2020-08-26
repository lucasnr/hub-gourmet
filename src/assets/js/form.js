(function () {
  $('.form .form__input-number').each((index, element) => {
    const $element = $(element);

    const input = $element.find('input[type="number"]');
    input.prop('readonly', true);
    const increase = input.next();
    const decrease = input.prev();

    increase.click(() => {
      const value = Number(input.val());
      input.val(value + 1);
    });

    decrease.click(() => {
      const value = Number(input.val());
      input.val(value > 0 ? value - 1 : 0);
    });
  });

  $('.form__section--radio').each((index, element) => {
    const $element = $(element);
    const labels = $element.find('.form__section--radio__labels > *');
    $(labels[1]).css('display', 'none');

    const inputs = $element.find('input[type="radio"]');
    const callback = () => {
      $(labels[0]).css('display', 'none');
      $(labels[1]).css('display', 'block');
      inputs.off('change', callback);
    };
    inputs.change(callback);
  });
})();
