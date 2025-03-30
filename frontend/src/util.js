// Function to check if a token has expired
export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }
    const decoded = JSON.parse(atob(token.split('.')[1]))
    return decoded.exp < Date.now() / 1000
}

export const validateMobileNumber = (country_code, local_number) => {
    // Remove all spaces
    country_code = country_code.replace(/\s/g, '');
    local_number = local_number.replace(/\s/g, '');
    if (local_number.startsWith('+')) {
        throw new Error('Invalid local number');
    }

    const australianNumberWithZeroPattern = /^0\d{9}$/;
    const australianNumberWithoutZeroPattern = /^\d{9}$/;
    if (australianNumberWithZeroPattern.test(local_number)) {
        // Add the Australian country code
        return country_code + local_number.substring(1);
    } else if (australianNumberWithoutZeroPattern.test(local_number)) {
        return country_code + local_number;
    } else {
        throw new Error('Invalid mobile number');
    }
}

