function testing() {
  var question = $('.test_answears'),
      testBtn = $('.test_button'),
      result = $('.test_ta');

  testBtn.on('click', function () {
      var countRightsAnswers = 0;

      $(this).fadeOut(100);

      question.each(function (i, el) {
          var input = $(this).find('input:checked'),
              resultColCorrect = result.find('tbody tr').eq(i + 1).find('td:nth-child(2)'),
              resultColUser = result.find('tbody tr').eq(i + 1).find('td:nth-child(3)'),
              resultColTotal = result.find('tbody tr').eq(i + 1).find('td:nth-child(4)');

          setTimeout(function () {
              result.fadeIn();
          }, 100);

          if (input.length) {
              resultColUser.text(input.val());
          } else {
              resultColUser.text('0');
          }

          if (resultColCorrect.text() == resultColUser.text()) {
              resultColTotal.text('Right');
              resultColTotal.parent().css('background', 'rgba(105, 168, 32, .1)');
          } else {
              resultColTotal.text('Wrong');
              resultColTotal.parent().css('background', 'rgba(210, 66, 94, .1)');
          }
      })

      $('tbody td:nth-child(4)').each(function () {
          if ($(this).text() == 'Right') {
              countRightsAnswers++;
          }
      })

      $('.test_count').text(countRightsAnswers);
  })
}

testing();