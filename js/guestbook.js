$(document).ready(function () {

    $('#guestbookCommentForm').submit(function () {
		
		var formId = $(this).attr('id');

		$('.required').html('').hide();
		$('#' + formId + ' input, #' + formId + ' textarea').removeClass('errorRequired');

        $('#formError, #formSuccess').html('').hide();
		
        var fPass = true;
		
		var name = $('#' + formId + ' input[name=name]');
        if (!name.val()) {
			name.addClass('errorRequired');
            name.next().html(' * Name is required').fadeIn('slow').css('display','block');
            fPass = false;
        }		

		var comment = $('#' + formId + ' textarea[name=comment]');
        if (!comment.val()) {
			comment.addClass('errorRequired');
			comment.next().html(' * Comment is required').fadeIn('slow').css('display','block');
            fPass = false;
        }

		var code = $('#' + formId + ' input[name=code]');
        if (code.val()=='') {
			code.addClass('errorRequired');
			code.next().next().html(' * Code is required').fadeIn('slow').css('display','block');
            fPass = false;
        }	

        if (fPass) { 
            $('#' + formId + ' input[type="submit"]').attr('disabled','disabled');
            $('#loader').show();

            $.post('/guestbook/guestbook-process.php', $('#' + formId).serialize(), function (data) { 

                if (data == 'pass') {
                    $('#loader').hide();
                    $('#' + formId + ' table.formTable').fadeOut(500, function () {
                        $('#formSuccess').hide().delay(100).html('Thank you, your comment was submitted successfully and will be displayed upon approval.').fadeIn(1000);
                    });
                } else { 
					$('#' + formId + ' input[type="submit"]').removeAttr('disabled');
					$('#loader').hide();
					if(data == 'codeError'){
						$('#' + formId + ' input[name=code]').next().next().html('* Code is incorrect').fadeIn('slow');
					} else {
						$('#formError').html(data.substring(7)).fadeIn('slow');
					}
                }
            },'text');
            return false;
        }
        return false;
    });
	
});