export function isExpiringSoon(expirationDate) {
    const today = new Date();
    const expiryDate = new Date(expirationDate);

    const daysDifference = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    return daysDifference <= 30 && daysDifference >= 0;
}