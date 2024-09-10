let popElement = document.getElementsByClassName("close");
let buttons = document.getElementsByClassName("btns");
let update = document.getElementsByClassName("update");
let remove = document.getElementsByClassName("delete");
let check = document.getElementsByClassName("checkID");
const list = document.getElementById("lists");
const main = document.querySelector("main");
const all = document.getElementById("all");
const pending = document.getElementById("pending");
const completed = document.getElementById("completed");
let todo = document.getElementsByClassName("todo");
const input = document.querySelector("input");
const addBtn = document.getElementById("Add");
const updateBtn = document.getElementById("Edit");
const clearBtn = document.getElementById("clear");
const allLists = document.getElementById("all");
const pendingLists = document.getElementById("pending");
const completedLists = document.getElementById("completed");
let isDelete = false;
let isUpdate = false;
let deleteIndex;
let updateIndex;
let statusValue = "unchecked";
let isstatusUpdate = false;
let checkboxIndex;
let statusTitle;
let isempty = true;

let listValues = JSON.parse(localStorage.getItem("ToDo") || "[]");

const getValue = () => {
    let titleValue = input.value;
    let localObj = {
        title: titleValue,
        status: statusValue
    }

    if (isstatusUpdate) {
        isstatusUpdate = false;
        localObj = {
            title: statusTitle,
            status: statusValue
        }
        listValues[checkboxIndex] = localObj;
        statusValue = "unchecked";
    }
    else if (isUpdate == false && titleValue && isDelete == false) {
        listValues.push(localObj);
    }
    else if (isDelete == true) {
        isDelete = false;
        listValues.splice(deleteIndex, 1);
    }
    else if (isUpdate == true && titleValue) {
        isUpdate = false;
        listValues[updateIndex] = localObj;
    }

    localStorage.setItem("ToDo", JSON.stringify(listValues));
}
getValue();


const popOpen = () => {
    Array.from(buttons).forEach((button) => {
        button.removeEventListener("click", popUpEvent, false);
        button.addEventListener("click", popUpEvent, false);
    })
}
const popUpEvent = (event) => {
    if (event.target.nextElementSibling) {
        event.target.nextElementSibling.classList.remove("close");
        event.target.nextElementSibling.classList.add("open");
    }
    updateList();
    deleteList();
}

const popClose = () => {
    main.removeEventListener("click", popCloseEvent, true);
    main.addEventListener("click", popCloseEvent, true);
}
const popCloseEvent = (event) => {
    Array.from(buttons).forEach((button) => {
        if (event.target != button.firstElementChild ||
            event.target != button.lastElementChild.firstElementChild ||
            event.target != button.lastElementChild.lastElementChild) {
            button.lastElementChild.classList.remove("open");
            button.lastElementChild.classList.add("close");
        }
    })
}

const checkedStyle = () => {
    Array.from(check).forEach((element) => {
        if (element.checked) {
            element.nextElementSibling.classList.add("text");
        }
        else if (!element.checked) {
            element.nextElementSibling.classList.remove("text");
        }
    })
}

const deleteProcess = () => {
    Array.from(remove).forEach((element, index) => {
        element.addEventListener("click", () => {
            deleteIndex = index;
            input.value = "";
            updateBtn.style.display = "none";
            addBtn.style.display = "block";
        });
    })
}

const deleteList = () => {
    deleteProcess();
    Array.from(remove).forEach((element) => {
        element.removeEventListener("click", deleteEvent);
        element.addEventListener("click", deleteEvent);
    })
}

const deleteEvent = () => {
    isDelete = true;
    getValue();
    showList();
    isChecked();
}
deleteList();

const showList = () => {
    Array.from(todo).forEach((element) => {
        element.remove();
    });
    if (listValues) {
        listValues.forEach((listItem) => {
            let listElement = `<div class="todo">
                    <input class="checkID" type="checkbox" ${listItem.status}>
                    <p>${listItem.title}</p>
                    <button class="btns"><img src="ellipsis-solid.svg" alt="3Dots"><span class="popup close">
                    <p class="update"><img src="pencil-solid.svg" alt="^&^">Update</p>
                    <p class="delete"><img src="trash-can-solid.svg" alt="*^*">Delete</p>
                    </span></button>
                </div>`;
            list.insertAdjacentHTML("beforeend", listElement);
            buttons = document.getElementsByClassName("btns");
            todo = document.getElementsByClassName("todo");
            popElement = document.getElementsByClassName("popup");
            update = document.getElementsByClassName("update");
            remove = document.getElementsByClassName("delete");
            check = document.getElementsByClassName("checkID");
            popOpen();
            popClose();
            checkedStyle();
        });
    }
}
showList();

const localAdd = () => {
    addBtn.addEventListener("click", () => {
        isUpdate = false;
        isDelete = false;
        getValue();
        showList();
        isChecked();
        input.value = "";
    })
}
localAdd();

const localUpdate = () => {
    updateBtn.addEventListener("click", () => {
        isUpdate = true;
        if(updateBtn){
        getValue();
        showList();
        input.value = "";
        localAdd();
        }
        updateBtn.style.display = "none";
        addBtn.style.display = "block";
    })
}

const updateProcess = () => {
    Array.from(update).forEach((element, index) => {
        element.addEventListener("click", () => {
            updateIndex = index;
            console.log(updateIndex);
        });
    })
}

const updateList = () => {
    updateProcess();
    Array.from(update).forEach((element) => {
        element.removeEventListener("click", updateEvent);
        element.addEventListener("click", updateEvent);
    })
}
const updateEvent = (event) => {
    updateBtn.style.display = "block";
    addBtn.style.display = "none";
    input.value = event.target.parentElement.parentElement.previousElementSibling.innerText;
    localUpdate();
    isChecked();
}
updateList();

const clearAll = () => {
    if (localStorage.getItem("ToDo") == []) {
        alert("No Task To Delete!!!")
    }
    else {
        input.value = "";
        let confirmation = confirm("Do you want to clear the List!!!");
        if (confirmation == true) {
            localStorage.clear();
            listValues = [];
            showList();
        }
        else {
            alert("List is not removed");
        }
    }
}

const isChecked = () => {
    Array.from(check).forEach((element, index) => {
        element.addEventListener("click", (e) => {
            isstatusUpdate = true;
            checkboxIndex = index;
            statusTitle = e.target.nextElementSibling.innerText;
            if (element.checked) {
                e.target.nextElementSibling.classList.add("text");
                statusValue = "checked";
                getValue();
                console.log(statusValue);
            }
            else if (!element.checked) {
                e.target.nextElementSibling.classList.remove("text");
                statusValue = "unchecked";
                getValue();
                console.log(statusValue);
            }
        })
    })
}
isChecked();

const allList = () => {
    all.addEventListener("click", () => {
        all.classList.add("borderBottom");
        pending.classList.remove("borderBottom");
        completed.classList.remove("borderBottom");
        console.log("ALL");
        showList();
        isChecked();
        completedList();
        pendingList();
    })
}
allList();

const pendingList = () => {
    pending.addEventListener("click", () => {
        all.classList.remove("borderBottom");
        pending.classList.add("borderBottom");
        completed.classList.remove("borderBottom");
        Array.from(check).forEach((element) => {
            if (element.checked == true) {
                element.parentElement.style.display = "none";
            }
            else if (element.checked == false) {
                element.parentElement.style.display = "flex";
            }
        })
    })
}
pendingList();

const completedList = () => {
    completed.addEventListener("click", () => {
        all.classList.remove("borderBottom");
        pending.classList.remove("borderBottom");
        completed.classList.add("borderBottom");
        Array.from(check).forEach((element) => {
            if (element.checked == false) {
                element.parentElement.style.display = "none";
            }
            else if (element.checked == true) {
                element.parentElement.style.display = "flex";
            }
        })
    })
}
completedList();