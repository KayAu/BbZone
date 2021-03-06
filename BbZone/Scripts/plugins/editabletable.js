/*global $, window*/
$.fn.editableTableWidget = function (options) {
	'use strict';
	return $(this).each(function () {
      var buildDefaultOptions = function () {
        var opts = $.extend({}, $.fn.editableTableWidget.defaultOptions);
        opts.editor = opts.editor.clone();
        return opts;
      },
        activeOptions = $.extend(buildDefaultOptions(), options),
        ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9,
        element = $(this.nativeElement),
        parent = element.parent(),
        editor = activeOptions.editor.css('position', 'absolute').hide().appendTo(parent),
        active,
        currentCellIndex,
        currentRowIndex,
        showEditor = function (select) {
          active = element.find('td:focus');
          //active = element.find('tr').last().find('td:eq(1)');
          if (active.length) {

            editor.val(active.text())
              .removeClass('error')
              .show()
              .offset(active.offset())
              .css(active.css(activeOptions.cloneProperties))
              .width(active.width())
              .height(active.height())
              .focus();

            currentCellIndex = active.index();
            currentRowIndex = active.parent().index();
            if (select) {
              editor.select();
            }
          }
        },
        setActiveText = function () {
          var text = editor.val(),
            evt = $.Event('change'),
            originalContent;
          if (active.text() === text || editor.hasClass('error')) {
            return true;
          }
          originalContent = active.html();
          active.text(text).trigger(evt, text);
          if (evt.result === false) {
            active.html(originalContent);
          }
        },
        addNewRow = function () {
          var totalRow = element.find('tr').length;
          var newRow = `<tr>
            <td>` + totalRow +`</td>
            <td></td>
            <td>0</td>
            <td></td>
          </tr>`;
          element.append(newRow);
          element.find('td').prop('tabindex', 1);
        },
			movement = function (element, keycode) {
				if (keycode === ARROW_RIGHT) {
					return element.next('td');
				} else if (keycode === ARROW_LEFT) {
					return element.prev('td');
				} else if (keycode === ARROW_UP) {
					return element.parent().prev().children().eq(element.index());
				} else if (keycode === ARROW_DOWN) {
					return element.parent().next().children().eq(element.index());
				}
				return [];
			};
		editor.blur(function () {
			    setActiveText();
          editor.hide();
          if (currentCellIndex === 3) {
            if (currentRowIndex === element.find('tr').length - 1)
              addNewRow();
          }

		}).keydown(function (e) {
			if (e.which === ENTER) {
				setActiveText();
				editor.hide();
				active.focus();
				e.preventDefault();
				e.stopPropagation();
			} else if (e.which === ESC) {
				editor.val(active.text());
				e.preventDefault();
				e.stopPropagation();
				editor.hide();
				active.focus();
			} else if (e.which === TAB) {
				active.focus();
			} else if (this.selectionEnd - this.selectionStart === this.value.length) {
				var possibleMove = movement(active, e.which);
				if (possibleMove.length > 0) {
					possibleMove.focus();
					e.preventDefault();
					e.stopPropagation();
				}
			}
		})
		.on('input paste', function () {
			var evt = $.Event('validate');
			active.trigger(evt, editor.val());
			if (evt.result === false) {
				editor.addClass('error');
			} else {
				editor.removeClass('error');
			}
		});
		element.on('click keypress dblclick', showEditor)
		.css('cursor', 'pointer')
		.keydown(function (e) {
			var prevent = true,
				possibleMove = movement($(e.target), e.which);
			if (possibleMove.length > 0) {
				possibleMove.focus();
			} else if (e.which === ENTER) {
				showEditor(false);
			} else if (e.which === 17 || e.which === 91 || e.which === 93) {
				showEditor(true);
				prevent = false;
			} else {
				prevent = false;
			}
			if (prevent) {
				e.stopPropagation();
				e.preventDefault();
			}
		});

		element.find('td').prop('tabindex', 1);

		$(window).on('resize', function () {
			if (editor.is(':visible')) {
				editor.offset(active.offset())
				.width(active.width())
				.height(active.height());
			}
		});
	});

};
$.fn.editableTableWidget.defaultOptions = {
	cloneProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
					  'text-align', 'font', 'font-size', 'font-family', 'font-weight',
					  'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
	editor: $('<input>')
};



/* global $ */
/* this is an example for validation and change events */
$.fn.numericInputExample = function () {
  'use strict';
  var element = $(this[0].nativeElement),
    footer = element.find('tfoot tr'),
    dataRows = element.find('tbody tr'),
    initialTotal = function () {
      var column, total;
      for (column = 1; column < footer.children(); column++) {
        total = 0;
        dataRows.each(function () {
          var row = $(this);
          total += parseFloat(row.children().eq(column).text());
        });
        footer.children().eq(column).text(total);
      };
    };
  element.find('td').on('change', function (evt) {
    var cell = $(this),
      column = cell.index(),
      total = 0;
    if (column === 0) {
      return;
    }
    element.find('tbody tr').each(function () {
      var row = $(this);
      total += parseFloat(row.children().eq(column).text());
    });
    if (column === 1 && total > 5000) {
      $('.alert').show();
      return false; // changes can be rejected
    } else {
      $('.alert').hide();
      footer.children().eq(column).text(total);
    }
  }).on('validate', function (evt, value) {
    var cell = $(this),
      column = cell.index();
    if (column === 2) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    } else {      
      return !!value && value.trim().length > 0;
    }
  });

  return this;
};
