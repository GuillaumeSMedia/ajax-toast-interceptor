# Ajax Toast Interceptor

Intercepts AJAX / XMLHttpRequest responses and displays relevant 'toast' notifications.

## Installation

    npm install ajax-toast-interceptor --save

## Usage

Simply return a correctly formatted JSON response from your API to have messages displayed in the client's browser via [iziToast](https://github.com/marcelodolza/iziToast).

### Success (HTTP response codes 200 -> 399) :

```json
{
    "flash": true, // Displays the response in a toast notification (default: null | options: false, true)
    "title": "Success", // Optional string (default: Success)
    "message": "The action was successful", // The notification text to display (possible values: string | array)
    "callback": "reload" // (optional, one option: reload) Reloads the page
}
```

`flash` must be set to true and `message` must be present for the toast notification to be displayed.

### Error (HTTP response codes 400+) :

```json
{
    "flash": true, // Displays the response in a toast notification (default: true |options: false, true)
    "message": "Something went wrong" // Optional string | array: the notification text to display
}
```

`flash` can be set to false to disable error notifications.
Also displays classic HTTP errors (404, 500...).

### Validation errors (HTTP response code 422) :

```json
{
    "flash": true, // Displays the response in a toast notification (options: false, true)
    "message": "Something went wrong", // The notification text to display (possible values: string | array)
    "errors": ["Name field is required", "Email field is invalid"] // (optional array of errors)
}
```
