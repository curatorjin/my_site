// 文章目录（TOC）：原生 JS 实现，替代 jQuery 版本
document.addEventListener('DOMContentLoaded', function () {
    generate_toc();
});

window.addEventListener('scroll', function () {
    highlight_toc();
});

function getPostHeadings() {
    var content = document.querySelector('.post-content');
    if (!content) return [];
    return Array.prototype.slice.call(content.querySelectorAll('h1,h2,h3,h4,h5,h6'));
}

function generate_toc() {
    var menu = document.getElementById('menu');
    if (!menu) return;
    var titles = getPostHeadings();
    var html = '';
    for (var i = 0; i < titles.length; i++) {
        var heading = titles[i];
        var level = heading.tagName.toLowerCase();
        var name = heading.textContent.trim();
        var id = heading.getAttribute('id');
        if (!id) continue;
        html += '<div><label class="menu-index-' + level +
            ' radio"><input type="radio" name="content-title" index="' + id +
            '"><a href="#' + id + '">' + name + '</a></label></div>';
    }
    menu.innerHTML = html;
}

function highlight_toc() {
    var headings = getPostHeadings();
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = 0; i < headings.length; i++) {
        var top = headings[i].getBoundingClientRect().top + scrollTop;
        if (top - scrollTop > 20) break;
        var anchor = headings[i].getAttribute('id');
        if (!anchor) continue;
        var target = document.querySelector('input[index="' + anchor + '"]');
        if (target) target.checked = true;
    }
}
