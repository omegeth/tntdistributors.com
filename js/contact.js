$(document).ready(function () {
	
	//$('.required').html('').hide();

    $('#contactForm').submit(function () {
	

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

        var phone = $('#' + formId + ' input[name=phone]');
        if (!phone.val()) {
			phone.addClass('errorRequired');
			phone.next().html(' * Phone is required').fadeIn('slow').css('display','block');
            fPass = false;
        } else { 
			phoneLength = phone.val().replace(/[^0-9]/g, '');
            if (phoneLength.length != 10) {
				phone.addClass('errorRequired');
				phone.next().html(' * Phone must contain area code and be 10 digits').fadeIn('slow').css('display','block');
                fPass = false;
            }
        }
		
        var email = $('#' + formId + ' input[name=email]');
        if (email.val() == '') {
			email.addClass('errorRequired');
			email.next().html(' * Email is required').fadeIn('slow').css('display','block');
            fPass = false;
        } else {
            if (!isValidEmailAddress(email.val())) {
				email.addClass('errorRequired');
				email.next().html(' * Invalid email address').fadeIn('slow').css('display','block');
                fPass = false;
            }
        }

		var message = $('#' + formId + ' textarea[name=message]');
        if (!message.val()) {
			message.addClass('errorRequired');
			message.next().html(' * Message is required').fadeIn('slow').css('display','block');
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

            $.post('/contact.php', $('#' + formId).serialize(), function (data) { 

                if (data == 'pass') {
                    $('#loader').hide();
                    $('#' + formId + ' table.formTable').fadeOut(500, function () {
                        $('#formSuccess').hide().delay(100).html('Thank you, your form was submitted successfully.').fadeIn(1000);
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