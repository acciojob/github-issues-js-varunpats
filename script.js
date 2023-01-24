//your code here
const pNoSpan = document.getElementById('pNo');
const list = document.getElementById('list');
const next = document.getElementById('load_next');
const prev = document.getElementById('load_prev');

document.addEventListener("DOMContentLoaded", renderIssues);
next.addEventListener("click", nextPage);
prev.addEventListener("click", prevPage);

let pageNo = 1;

async function renderIssues() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    pNoSpan.textContent = pageNo;
    const url = `https://api.github.com/repositories/1296269/issues?page=${pageNo}&per_page=5`
    const res = await fetch(url);
    const data = await res.json();
    let arr = data.map(d => d.title)
    const newData = new Set(arr);
    let n = newData.size;
    for (let i = 0; i < 5 - n; i++) {
        newData.add("demo" + i);
    }
    renderData(newData);
}

function renderData(issues) {
    issues.forEach(issue => {
        const li = document.createElement('li');
        li.textContent = issue;
        list.appendChild(li);
    });
}

function nextPage() {
    pageNo += 1;
    renderIssues()
}

function prevPage() {
    if (pageNo == 1)
        return
    pageNo -= 1;
    renderIssues()
}
