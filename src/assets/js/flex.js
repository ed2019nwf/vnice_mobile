/**
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 */
function setRootSize() {
    var docWid = window.document.documentElement,
        width = docWid.getBoundingClientRect().width,
        fontSize = (width >= 1080) ? (1080 / 7.5) : width / 1080 * 100;
    docWid.style.fontSize = fontSize + 'px';
}
window.addEventListener('resize', function() {
    setRootSize();
}, false);
setRootSize();