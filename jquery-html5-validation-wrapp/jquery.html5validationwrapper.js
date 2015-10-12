/*!
 *	jQuery validations wrapper Plugin 0.0.1
 * 	https://github.com/DanielGS/jquery-html5-validation-wrapper
 *  
 *	Copyright 2015 (c) Daniel Garrido Serrano
 * 
 *	Original jquery code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
 *	http://jquery.org/license
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 *
 *	Date: 14-10-2015
 */!function($){
	
	$.fn.validateWrapper = function(config) {

		this.filter('input').each(function(){
			
			//Cuando se modifica el input comprobamos si hay error para quitarlo
			if($(this).attr('type')==="checkbox"){
				$(this).on('click', function(e){
					if(config.parentToSetHasError && config.errorClassForParent){
						$(this).closest(config.parentToSetHasError).removeClass(config.errorClassForParent)
					}
					$('.messageError', $(this).closest(config.parentToSetHasError)).remove();
				});
			}else{
				$(this).on('input', function(e){
					if(config.parentToSetHasError && config.errorClassForParent){
						$(this).closest(config.parentToSetHasError).removeClass(config.errorClassForParent)
					}
					$('.messageError', $(this).parent()).remove();
				});
			}
			
			//En caso de que el input tenga error
    		$(this).on('invalid', function(e){
    			//Deshabilitamos el mensaje por defecto del navegador
    			e.preventDefault();

    			// Update father if is necesary
    			if(config.parentToSetHasError && config.errorClassForParent){
    				$(this).closest(config.parentToSetHasError).addClass(config.errorClassForParent);
    			}
    			
    			//Quitamos los errores previos
    			$('.messageError', $(this).closest(config.parentToSetHasError)).remove();
    			
    			// Generate error message
    			var errorMessage;
    			if($(this).data('message-error')){
    				errorMessage = $(this).data('message-error');
    			}else{
    				errorMessage = this.validationMessage;
    			}
    			
    			// Add Error Message to DOM
    			if(config.addErrorToFinalParent){

    				// Generate DOM with message
	    			var errorMessageDOM;
	    			if(config.errorMessageTemplate){
	    				errorMessageDOM = config.errorMessageTemplate.replace('${errorMessage}', errorMessage);
	    			}
	    			
	    			//Add flag class
	    			if($(errorMessageDOM).length){
	    				errorMessageDOM = $(errorMessageDOM).addClass('messageError');
	    			}else{
	    				errorMessageDOM = $('<p class="messageError">' + errorMessage + '</p>');
	    			}
	    			
	    			//Insert error message DOM to final parent element
	    			$(this).closest(config.parentToSetHasError).append(errorMessageDOM);
	    			
    			}
    			
    			// Send message to function if is necesary
    			if(config.functionWhenInvalid && typeof config.functionWhenInvalid === "function"){
    				config.functionWhenInvalid(errorMessage)
    			}
    			
    		});
    	});

    	return this;
    	
	};
	
}(jQuery);
