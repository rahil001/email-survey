export default (emails = '') => {
    const invalidEmailArray = emails
    .split(',')
    .map(email => email.trim())
    .filter((email) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return true;
        }
        return false;
    });
    if (invalidEmailArray.length) {
        return 'Please enter valid emails';
    }

}