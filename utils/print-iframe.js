export default function PrintIframe() {
    const iframe = document.frames
        ? document.frames[0]
        : document.getElementById("iframe");

    const iframeWindow = iframe.contentWindow || iframe;
    iframe.focus();
    iframeWindow.print();
    return false;
}