function once(callabck) {
    let hasBeenCalled = false;
    let result;

    return function (...args) {
        if (hasBeenCalled === false) {
            hasBeenCalled = true;
            result = callabck(...args);
        }

        return result;
    }
}

function submitForm() {
    console.log('Форма отправлена');
}
const submitOnce = once(submitForm);
submitOnce();
submitOnce();
submitOnce();

const multiply = once((a, b) => a * b);
console.log(multiply(2, 5));
console.log(multiply(10, 10));