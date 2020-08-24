(function () {
  const inputNumbers = $('.form .form__input-number');
  inputNumbers.each((index, element) => {
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
})();
