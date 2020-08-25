$('.section-radio').each((index, element) => {
  const $element = $(element);
  const svgs = $element.find('.section-header svg');
  $(svgs[1]).css('display', 'none');

  const inputs = $element.find('input[type="radio"]');
  inputs.change(() => {
    $(svgs[0]).css('display', 'none');
    $(svgs[1]).css('display', 'block');
  });
});
