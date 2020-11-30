const { $ } = window;

export default function setBlogNewsTitlesHeight() {
  const ProductStyle = {
    // делим массив на отрезки заданной длины
    slice(arr, n) {
      const blocklen = n;
      const newArr = $.makeArray(arr);

      return newArr.reduce((p, c, i) => {
        if (i % blocklen === 0) p.push([]);
        p[p.length - 1].push(c);
        return p;
      }, []);
    },
    // получаем максимум в массиве
    getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    },
    // выравниваем заголовки в переданной группе
    alignTitles(arr) {
      const titles = [];
      const height = [];
      $(arr).each((i, el) => {
        const title = el;
        height.push($(title).outerHeight());
        titles.push(title);
      });
      const res = ProductStyle.getMaxOfArray(height);
      $(titles).each((i, el) => {
        $(el).css({
          height: (`${res}px`),
        });
      });
    },
  };

  function aligns() {
    const heights = $('.blog-news__title');

    // выравнивание в каталоге
    if (heights.length > 1) {
      // обнуляем высоту
      $(heights).css({
        height: '',
      });
      setTimeout(() => {
        const wW = $(window).width();
        let result;
        if (wW >= 768) {
          result = ProductStyle.slice(heights, 2);
          for (let i = 0; i < result.length; i += 1) {
            ProductStyle.alignTitles(result[i]);
          }
        }
      }, 50);
    }
  }

  aligns();

  $(window).on('resize', aligns);
}
