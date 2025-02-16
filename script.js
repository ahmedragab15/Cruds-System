//* inputs elements
let title = document.querySelector("#title"),
    count = document.querySelector("#count"),
    category = document.querySelector("#category"),
    search = document.querySelector("#search"),
    deleteAllBtn = document.querySelector("#delete-all")

//* btns elements
let submitBtn = document.querySelector("#submit"),
    searchTitleBtn = document.querySelector("#search-title"),
    searchCategoryBtn = document.querySelector("#search-category")

//*price elements
let totalPrice = document.querySelector("#total"),
    price = document.querySelector("#price"),
    texas = document.querySelector("#texas"),
    ads = document.querySelector("#ads"),
    discount = document.querySelector("#discount")

//* table body
let crudsBody = document.querySelector("tbody")

//? total calc
function totalCalc() {
    if (price.value != "") {
        let total = (+price.value + +texas.value + +ads.value) - discount.value
        totalPrice.innerHTML = total
        totalPrice.style.background = "green"
    } else {
        totalPrice.innerHTML = ""
        totalPrice.style.background = "var(--main-color)"
    }
}

//? create
let dataProduct;
let mood = "create"
let tmp;

//* load from local storage
function loadLocalstorage() {
    let storedDate = JSON.parse(localStorage.getItem("product info"))
    if (storedDate) {
        dataProduct = storedDate;
    } else {
        dataProduct = []
    }
}loadLocalstorage()

//*create on submit
submitBtn.addEventListener("click", (e) => {
    //*create object and add it to the array
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        texas: texas.value,
        ads: ads.value,
        discount: discount.value,
        totalPrice: totalPrice.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    //*push to array
    if(title.value != "" && price.value != "" && category.value != ""  && newProduct.count <= 100){
    if (mood === "create") {
        //* count
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                dataProduct.push(newProduct)
                clearInputs()
            }
        } else if(newProduct.count == 1){
            dataProduct.push(newProduct)
            clearInputs()
        }else{
            alert("enter a valid count")
        }
        //* update
    }else{
        dataProduct[tmp] = newProduct
        mood = "create"
        count.style.display = "block"
        submitBtn.textContent = "Create"
        clearInputs()
    }
    }else{
        alert("Fill the inputs")
    }

    saveToLocalstorage()
    showData()

})

//* save to local storage
function saveToLocalstorage() {
    localStorage.setItem("product info", JSON.stringify(dataProduct))
}

//* clear inputs after submit
function clearInputs() {
    let inputs = document.querySelectorAll(".inputs input")
    inputs.forEach((e) => {
        e.value = ""
        totalCalc()
    })
}

//? read
function showData() {
    let tableRow = ""
    for (let i = 0; i < dataProduct.length; i++) {
        tableRow += `   
        <tr>    
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].texas}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].totalPrice}</td>
        <td>${dataProduct[i].category}</td>
        <td> <button onclick="updateData(${i})" id="update" class="btn">update</button></td>
        <td> <button onclick="deleteData(${i})" id="delete" class="btn">delete</button></td>
        </tr>`
    }
    crudsBody.innerHTML = tableRow
    deleteAll()
}
showData()

//? delete
function deleteData(i) {
    dataProduct.splice(i, 1)
    localStorage["product info"] = JSON.stringify(dataProduct)
    showData()
}

//? delete all
function deleteAll() {
    if (dataProduct.length > 0) {
        deleteAllBtn.innerHTML = `<button class="btn">Delete All(${dataProduct.length})</button>`
        deleteAllBtn.addEventListener("click", () => {
            dataProduct.splice(0)
            localStorage["product info"] = JSON.stringify(dataProduct)
            showData()
        })
    } else {
        deleteAllBtn.innerHTML = ""
    }
}

//? update 
function updateData(i) {
    title.value = dataProduct[i].title
    price.value = dataProduct[i].price
    texas.value = dataProduct[i].texas
    ads.value = dataProduct[i].ads
    discount.value = dataProduct[i].discount
    category.value = dataProduct[i].category
    totalCalc()
    count.style.display = "none"
    submitBtn.textContent = "Update"
    mood = "update"
    tmp = i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//? search
let searchmood = "title"
//* search mood
function searchByMood(id) {
    if (id == "search-title") {
        searchmood = "title"
    } else {
        searchmood = "category"
    }
    search.placeholder = `Search By ${searchmood}`
    search.focus()
    search.value = ""
    showData()
}

//* search
function searchItems(value) {
    let tableRow = ""
    for (let i = 0; i < dataProduct.length; i++) {
    if (searchmood === "title") {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                tableRow += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].texas}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].totalPrice}</td>
                <td>${dataProduct[i].category}</td>
                <td> <button id="update" onclick="updateData(${i})" class="btn">update</button></td>
                <td> <button id="delete" onclick="deleteData(${i})" class="btn">delete</button></td>
                </tr>`
            }}else {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                tableRow += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].texas}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].totalPrice}</td>
                <td>${dataProduct[i].category}</td>
                <td> <button id="update" onclick="updateData(${i})" class="btn">update</button></td>
                <td> <button id="delete" onclick="deleteData(${i})" class="btn">delete</button></td>
                </tr>`
            }}}
    crudsBody.innerHTML = tableRow
}