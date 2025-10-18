export default async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(window.location.href);
        return true
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false
    }
}