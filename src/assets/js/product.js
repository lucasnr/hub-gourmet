(function () {
  const header = $('.header');
  const productName = $('#product-name');
  const nameOffsetBottom = productName[0].offsetTop + productName.height();

  $(window).scroll(() => {
    if (pageYOffset >= nameOffsetBottom) header.addClass('show');
    else header.removeClass('show');
  });
})();
