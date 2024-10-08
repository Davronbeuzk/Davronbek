const input = document.querySelector(".input");
const form = document.querySelector(".form");
const todos = document.getElementById("todos");
const collect = document.querySelector(".collect");

form.addEventListener("submit", yangItem);
todos.addEventListener("change", sartarofka);

let taskCount = 0;
let tasks = [];

function yangItem(e) {
    e.preventDefault();

    taskCount++;

    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const task = {
        id: taskCount,
        text: input.value,
        time: `${hour}:${min}:${sec}`,
        date: `${day}.${month}.${year}`,
        completed: false
    };

    tasks.push(task);
    form.reset();
    displayItems(tasks, currentPage);
}

const searchIn = document.querySelector(".searchin");
searchIn.addEventListener("input", searchIt);

function searchIt() {
    const seartex = searchIn.value.toLowerCase();
    const filteredItems = tasks.filter(task => task.text.toLowerCase().includes(seartex));
    displayItems(filteredItems, 1);
}

const deleteAll = document.querySelector(".deleteAll");
deleteAll.addEventListener("click", () => {
    tasks = [];
    taskCount = 0;
    displayItems(tasks, currentPage);
});

function sartarofka() {
    const selected = todos.value;

    let sortedTasks = [...tasks];
    if (selected === "todoa-z") {
        sortedTasks = sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
    } else if (selected === "todoz-a") {
        sortedTasks = sortedTasks.sort((a, b) => b.text.localeCompare(a.text));
    }

    displayItems(sortedTasks, currentPage);
}

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumbersContainer = document.getElementById('page-numbers');
const itemsPerPage = 7;
let currentPage = 1;

function displayItems(items, page) {
    collect.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach(task => {
        const Barchaelem = document.createElement("tr");

        const tasknum = document.createElement("td");
        tasknum.innerText = task.id;

        const texth1 = document.createElement("td");
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = task.text;
        inputField.style.display = "none";

        const taskText = document.createElement("span");
        taskText.innerText = task.text;
        taskText.style.textDecoration = task.completed ? "line-through" : "none";

        texth1.appendChild(inputField);
        texth1.appendChild(taskText);

        const timeInfo = document.createElement("td");
        timeInfo.innerText = task.time;

        const dayp = document.createElement("td");
        dayp.innerText = task.date;

        const chekBox = document.createElement("td");
        const checinput = document.createElement("input");
        checinput.type = "checkbox";
        checinput.checked = task.completed;
        checinput.addEventListener('change', () => {
            task.completed = checinput.checked;
            taskText.style.textDecoration = task.completed ? "line-through" : "none";
        });
        chekBox.appendChild(checinput);

        const edit = document.createElement("td");
        const editicon = document.createElement("i");
        editicon.classList.add("fa-solid", "fa-pen-to-square");
        editicon.addEventListener('click', () => {
            inputField.style.display = "inline";
            taskText.style.display = "none";
            inputField.focus();
        });
        inputField.addEventListener('blur', () => {
            task.text = inputField.value;
            taskText.innerText = task.text;
            inputField.style.display = "none";
            taskText.style.display = "inline";
            displayItems(items, page);
        });
        edit.appendChild(editicon);

        const deleitem = document.createElement("td");
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteIcon.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            taskCount--;
            displayItems(tasks, currentPage);
        });
        deleitem.appendChild(deleteIcon);

        Barchaelem.appendChild(tasknum);
        Barchaelem.appendChild(texth1);
        Barchaelem.appendChild(timeInfo);
        Barchaelem.appendChild(dayp);
        Barchaelem.appendChild(chekBox);
        Barchaelem.appendChild(edit);
        Barchaelem.appendChild(deleitem);

        collect.appendChild(Barchaelem);
    });

    updatePaginationControls(items.length, page);
}

function updatePaginationControls(totalItems, page) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.classList.add('page-number');
        if (i === page) {
            pageNumber.classList.add('active');
        }
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            displayItems(tasks, currentPage);
        });
        pageNumbersContainer.appendChild(pageNumber);
    }

    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayItems(tasks, currentPage);
    }
});

nextButton.addEventListener('click', () => {
    const totalItems = tasks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayItems(tasks, currentPage);
    }
});

displayItems(tasks, currentPage);
