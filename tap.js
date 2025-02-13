const last = {
    key: 0,
    index: 0,
    time: Date.now(),
};
let delay = 3;
const alpha = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
const on = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
let text = [];
let timeOut = 0;

const output = async () => {
    const e = document.getElementById("out");
    e.textContent = text.join('').slice(0, -1);
    e.dataset.end = text[text.length - 1] || '';
    if (timeOut) {
        clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
        e.textContent = text.join('');
        e.dataset.end = '  ';
    }, delay * 1e3);
    e.scrollTop = e.scrollHeight;
};

const press = async (id) => {
    const time = Date.now();
    if (id < 10) {
        if (id == last.key && (time - last.time) / 1000 <= delay) {
            const str = alpha[id - 2];
            const idx = (last.index + 1) % str.length;
            const letter = str.charAt(idx);

            text[text.length - 1] = letter;

            last.index = idx;
            last.time = time;
        } else {
            const letter = alpha[id - 2].charAt(0);

            text.push(letter);

            last.key = id;
            last.index = 0;
            last.time = time;
        }
    } else if ((id == 10)) {
        text.push(" ");

        last.key = id;
        last.index = 0;
        last.time = time;
    } else if (id == 11) {
        text.pop();

        last.key = id;
        last.index = 0;
        last.time = time;
    }
    output();
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input").forEach(async (v) => {
        if (on.includes(v.id)) {
            v.addEventListener("click", e => {
                press(Number(e.target.id));
            });
        } else if (v.id == "delay") {
            v.addEventListener("input", e => {
                delay = e.target.value;
                document.getElementById("value").textContent = delay;
            })
        }
    });
});
