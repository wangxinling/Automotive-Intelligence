$(document).ready(function() {
    var name_selector = ".name-wrapper";
    var email_selector = ".email-wrapper";
    var password_selector = ".password-wrapper";
    var re_password_selector = ".re-password-wrapper";
    var name_input_selector = ".name-wrapper input";
    var email_input_selector = ".email-wrapper input";
    var password_input_selector = ".password-wrapper input";
    var re_password_input_selector = ".re-password-wrapper input";
    var regex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    $("#signin, #signup").click(function(event) {        
        if ($.trim($(name_input_selector).val()) === "" && $.trim($(email_input_selector).val()) === ""
            && $.trim($(password_input_selector).val()) === "" && $.trim($(re_password_input_selector).val()) === "") {
            event.preventDefault();

            $(name_selector).add(email_selector).add(password_selector).add(re_password_selector).addClass('error');
            $(name_selector).add(email_selector).add(password_selector).add(re_password_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(name_selector).add(email_selector).add(password_selector).add(re_password_selector).removeClass('error');
            }, 300);

            $(name_selector).add(email_selector).add(password_selector).add(re_password_selector).prev().css('top', '25%');
            $(name_selector).add(email_selector).add(password_selector).add(re_password_selector).parent().css('margin-bottom', '0px');
            $(name_selector).next().text('Name cannot be empty.');
            $(email_selector).next().text('Email cannot be empty.');
            $(password_selector).next().text('Password cannot be empty.');
            $(re_password_selector).next().text('Confirm password cannot be empty.');
        }
        else if (this.id === "signup" && $.trim($(name_input_selector).val()) === "") {
            event.preventDefault();

            $(name_selector).addClass('error');
            $(name_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(name_selector).removeClass('error');
            }, 300);

            $(name_selector).prev().css('top', '25%');
            $(name_selector).parent().css('margin-bottom', '0px');
            $(name_selector).next().text('Name cannot be empty.');
        }
        else if ($.trim($(email_input_selector).val()) === "") {
            event.preventDefault();

            $(email_selector).addClass('error');
            $(email_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(email_selector).removeClass('error');
            }, 300);

            $(email_selector).prev().css('top', '25%');
            $(email_selector).parent().css('margin-bottom', '0px');
            $(email_selector).next().text('Email cannot be empty.');
        }
        else if ($.trim($(password_input_selector).val()) === "") {
            event.preventDefault();

            $(password_selector).addClass('error');
            $(password_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(password_selector).removeClass('error');
            }, 300);

            $(password_selector).prev().css('top', '25%');
            $(password_selector).parent().css('margin-bottom', '0px');
            $(password_selector).next().text('Password cannot be empty.');
        }
        else if (this.id === "signup" && $.trim($(re_password_input_selector).val()) === "") {
            event.preventDefault();

            $(re_password_selector).addClass('error');
            $(re_password_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(re_password_selector).removeClass('error');
            }, 300);

            $(re_password_selector).prev().css('top', '25%');
            $(re_password_selector).parent().css('margin-bottom', '0px');
            $(re_password_selector).next().text('Confirm password cannot be empty.');
        }
        else if ($.trim($(email_input_selector).val()) !== "" && !regex.test($.trim($(email_input_selector).val()))) {
            event.preventDefault();

            $(email_selector).addClass('error');
            $(email_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(email_selector).removeClass('error');
            }, 300);

            $(email_selector).prev().css('top', '25%');
            $(email_selector).parent().css('margin-bottom', '0px');
            $(email_selector).next().text('Please enter a valid email address.');
        }
        else if ($.trim($(password_input_selector).val()) !== "" && $(password_input_selector).val().length < 6) {
            event.preventDefault();

            $(password_selector).addClass('error');
            $(password_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(password_selector).removeClass('error');
            }, 300);

            $(password_selector).prev().css('top', '25%');
            $(password_selector).parent().css('margin-bottom', '0px');
            $(password_selector).next().text('Password must be at least 6 characters.');
        }
        else if (this.id === "signup" && $.trim($(re_password_input_selector).val()) !== "" && $(re_password_input_selector).val().length < 6) {
            event.preventDefault();
            
            $(re_password_selector).addClass('error');
            $(re_password_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(re_password_selector).removeClass('error');
            }, 300);

            $(re_password_selector).prev().css('top', '25%');
            $(re_password_selector).parent().css('margin-bottom', '0px');
            $(re_password_selector).next().text('Confirm password must be at least 6 characters.');
        }
        else if (this.id === "signup" && $.trim($(password_input_selector).val()) !== "" && $.trim($(re_password_input_selector).val()) !== ""
                && $(password_input_selector).val() != $(re_password_input_selector).val()) {
            event.preventDefault();

            $(re_password_selector).addClass('error');
            $(re_password_selector).parent().addClass('has-error');

            setTimeout(function() {
                $(re_password_selector).removeClass('error');
            }, 300);

            $(re_password_selector).prev().css('top', '25%');
            $(re_password_selector).parent().css('margin-bottom', '0px');
            $(re_password_selector).next().text('Password and confirm password does not match.');
        }
    });

    if ($(".signin-form .alert").hasClass("login")) {
        $(".signin-form .alert").css('margin-top', '20px').show();
    }
    else if ($(".signin-form .alert").hasClass("signup")) {
        $(".signin-form .message").html("<strong>Success!</strong> Your account has created successfully, please check your email for verification link to activate your account.");
        $(".signin-form .alert").removeClass('alert-danger').addClass('alert-success').css('margin-top', '20px').show();
    }

    if ($(".signup-form .alert").hasClass("exist")) {
        $(".signup-form .alert").css('margin-top', '20px').show();
    }

    $(name_input_selector + ", " + email_input_selector + ", " + password_input_selector  + ", " + re_password_input_selector).on("input", function() {
        if ($.trim($(this).val()) !== "") {
            $(this).parent().prev().css('top', '39%');
            $(this).closest(".form-group").removeClass('has-error');
            $(this).parent().next().text('');
        }
    });

    $(".alert button.close").click(function () {
        $(this).parent().fadeOut('slow');
    });
});