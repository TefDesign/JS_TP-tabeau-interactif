async function getDatas(){
    try {
        const api = await fetch("https://jsonplaceholder.typicode.com/users");
        const datas = await api.json();
        if(!datas || datas.length === 0){
            console.log("Aucune données à afficher")
            return;
        }
       return datas;
    } catch (e) {
        console.error(e);
    }
}

const datas = await getDatas();

function createEl(tag, value) {
    const element = document.createElement(tag);
    element.innerHTML = value;
    return element;
}

function addTable(datas) {
    const table = document.querySelector("#user-table");
    table.innerHTML = ""
    for(let data of datas){
        const tr = document.createElement("tr");
        tr.appendChild(createEl('td', data.name));
        tr.appendChild(createEl('td', data.email));
        tr.appendChild(createEl('td', data.address.city));
        table.appendChild(tr);
    }
}

function filterTable(value) {
    const filtered = datas.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    addTable(filtered);
}

function sortTableUsers() {
    const datasFilter = [...datas].sort((a, b) => a.name.localeCompare(b.name))
    addTable(datasFilter)
}

function sortTableMails() {
    const datasFilter = [...datas].sort((a, b) => a.email.localeCompare(b.email))
    addTable(datasFilter)
}

function initListeners() {
    const inputSearch = document.querySelector("#search");
    const table = document.querySelector("#user-table");
    const btnSortName = document.querySelector("#sort-name");
    const btnSortMail = document.querySelector("#sort-email");

    btnSortName.addEventListener("click", sortTableUsers);
    btnSortMail.addEventListener("click", sortTableMails);
    inputSearch.addEventListener("keyup", e => filterTable(e.target.value));
}

function main() {
    initListeners()
    addTable(datas);
}


main()

