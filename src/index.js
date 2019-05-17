import iZtoast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

(function(open) {
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener(
            'load',
            function() {
                // Prevent cross-origin requests interception
                if (
                    window.location.hostname !==
                    new URL(this.responseURL).hostname
                ) {
                    return;
                }

                // Ajax response text
                let responseText;

                // Success
                if (this.status >= 200 && this.status < 400) {
                    responseText = this.responseText;

                    // We want an object
                    responseText =
                        typeof responseText === 'string'
                            ? JSON.parse(responseText)
                            : responseText;
                    if (
                        typeof responseText.callback !== 'undefined' &&
                        responseText.callback === 'reload'
                    ) {
                        window.location.reload(true);
                    }
                    if (
                        typeof responseText.flash !== 'undefined' && // .flash must be exist
                        responseText.flash && // and be != false or null
                        typeof responseText.message !== 'undefined' // .message must be defined
                    ) {
                        return iZtoast.success({
                            title: responseText.title || 'Success', // if .title is defined we use id, or fallback
                            message:
                                responseText.message || (responseText || ''),
                            position: 'bottomRight',
                        });
                    }
                }

                // Errors
                if (this.status >= 400) {
                    // Try to convert string to JSON, fails if not valid JSON
                    // (ie: "Method not defined" or "Error 404" messages)
                    try {
                        responseText = JSON.parse(this.responseText);
                    } catch (e) {
                        responseText = this.responseText;
                    }

                    // The message we will display
                    let message = '';

                    if (
                        typeof responseText.flash !== 'undefined' &&
                        responseText.flash === false
                    ) {
                        return;
                    }

                    if (typeof responseText.message !== 'undefined') {
                        // Do we have a message key in response?
                        if (typeof responseText.message === 'object') {
                            // Is message an array of messages (ie: errors)?
                            message = '<ul>';
                            responseText.message.forEach(function(value) {
                                message += '<li>' + value + '</li>';
                            });
                            message += '</ul>';
                        } else {
                            // If not, use single message
                            message = responseText.message.substring(0, 50);
                        }
                    } else if (typeof responseText !== 'undefined') {
                        // Do we have a single message as response?
                        message = responseText.substring(0, 50);
                    }

                    // Handles validation errors
                    if (
                        this.status === 422 && // Only validation errors
                        typeof responseText.errors !== 'undefined' && // .errors must be defined
                        typeof responseText.errors === 'object' // it must be an array
                    ) {
                        message += '<ul>';
                        responseText.errors.forEach(function(element) {
                            message += '<li>' + element.join(', ') + '</li>';
                        });
                        message += '</ul>';
                    }

                    iZtoast.error({
                        title: 'Error',
                        message: message,
                        position: 'bottomRight',
                    });
                }
            },
            false
        );
        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);
