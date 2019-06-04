# Ajax Toast Interceptor

Intercepts AJAX / XMLHttpRequest responses from your back-end and displays relevant 'toast' notifications.

## Installation

    npm install ajax-toast-interceptor --save

## Usage

Simply return a correctly formatted JSON response from your API to have messages displayed in the client's browser via [iziToast](https://github.com/marcelodolza/iziToast).

## axios integration

```javascript
axios
    .get('/user?ID=12345')
    .then(function(response) {
        // Success notification message are handled by ajax toast interceptor
        // Your code goes here
        console.log(response);
    })
    .catch(function(error) {
        // Error notification message are handled by ajax toast interceptor
        // Your code goes here
        console.log(error);
    });
```

### jQuery integration

```javascript
$.ajax({
    url: '/save-user-profile',
    method: post,
})
    .done(function(response) {
        // Success notification message are handled by ajax toast interceptor
        // Your code goes here
        console.log(response);
    })
    .fail(function(error) {
        // Error notification message are handled by ajax toast interceptor
        // Your code goes here
        console.log(error);
    });
```

If you only want to display a notification message (error or success), you can skip the `done` and `fail` callbacks altogether.

### Success (HTTP response codes 200 -> 399) :

Example:

```json
{
    "flash": true,
    "title": "Success",
    "message": "The action was successful",
    "callback": "reload"
}
```

`flash` must be set to true and `message` must be present for the toast notification to be displayed.

### Error (HTTP response codes 400+) :

```json
{
    "flash": true,
    "message": "Something went wrong"
}
```

`flash` can be set to false to disable error notifications.
Also displays classic HTTP errors (404, 500...).

### Validation errors (HTTP response code 422) :

```json
{
    "flash": true,
    "message": "Validation failed for the following fields:",
    "errors": ["Name field is required", "Email field is invalid"]
}
```

## Ajax response content

| Option name | Description                                                                                                               | Values          | Default                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------ |
| `flash`     | Should a 'toast' notification be displayed?                                                                               | true \| false   | - HTTP success: none <br />- HTTP errors: `true`       |
| `title`     | _(optional)_ Title of the success notification. Only available for success response codes for now.                        | string          | - HTTP success: 'Success' <br />- HTTP errors: 'Error' |
| `message`   | The message (content) of the toast notification                                                                           | string \| array | none                                                   |
| `errors`    | _(optional)_ Displays each element of the array as a list. Only available for 422 validation errors for now.              | array           | none                                                   |
| `callback`  | _(optional)_ Reloads the page instead of displaying a success message. Only available for success response codes for now. | 'reload'        | none                                                   |

## Screenshots

Soon...

## Todo

-   [ ] Improve the documentation
-   [ ] Accept an array of `errors` for error response codes other than 422
-   [ ] Allow `callback: 'reload'` option for error response codes
-   [ ] Automated tests
-   [ ] Add screenshots

## Contributions

Pull requests are welcome :)
