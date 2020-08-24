(function () {
  const body = $(document.body);
  const sections = $('main section');
  const menu = $('.menu');
  const menuOffset = menu.offset().top;
  const list = menu.find('.menu__nav > ul');
  const links = list.find('li a');

  let activeIndex = 0;
  $(window).scroll(function () {
    if (pageYOffset >= menuOffset) body.addClass('menu-fixed');
    else {
      body.removeClass('menu-fixed');
      return;
    }

    let toActiveIndex = 0;
    sections.each((index, element) => {
      const $element = $(element);
      if (pageYOffset > $element.offset().top - menu.height())
        toActiveIndex = index;
    });
    if (toActiveIndex === activeIndex) return;

    $(links[activeIndex]).removeClass('active');
    activeIndex = toActiveIndex;

    const activeLink = $(links[activeIndex]);
    activeLink.addClass('active');
    scrollMenu(activeLink[0].offsetLeft);
  });

  function scrollMenu(to) {
    // list.stop().animate({ scrollLeft: to / (links.length / activeIndex) }, 200);
    list.stop().animate({ scrollLeft: to }, 200);
  }
})();
