const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validMobileRegex = RegExp(/^\d{10}$/)
const isValidPanNumber = RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
const validPincodeRegex =  RegExp(/^(\d{4}|\d{8})$/);

export { validEmailRegex, validMobileRegex, isValidPanNumber,validPincodeRegex }