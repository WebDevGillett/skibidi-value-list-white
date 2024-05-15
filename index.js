var selected = 1;
var value1 = 0;
var value2 = 0;
var datasave;

const modal = document.querySelector("#myModal");

const addItem1 = document.getElementById("add-item-1");
const addItem2 = document.getElementById("add-item-2");

const itemsList1 = document.getElementById("items-1");
const itemsList2 = document.getElementById("items-2");

const value1Text = document.getElementById("value1");
const value2Text = document.getElementById("value2");

addItem1.addEventListener("click", () => {
    modal.style.display = "block";
    selected = 1;
});

addItem2.addEventListener("click", () => {
    modal.style.display = "block";
    selected = 2;
});

const span = document.querySelector(".close");

span.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const gridContainer = document.querySelector(".grid-container");

function updateText() {
    value1Text.innerText = "Value: " + value1.toLocaleString("en-US");
    value2Text.innerText = "Value: " + value2.toLocaleString("en-US");
}

function deleteUnwantedData(array) {
    const desiredProperties = ["title", "imageLink", "value", "itemImage", "title", "value", "imageLink"];
    return array.map((obj) => {
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            if (desiredProperties.includes(key)) {
                newObj[key] = obj[key];
            }
        });
        return newObj;
    });
}

function deleteUnwantedData2(array) {
    var newarray = [];
  
    array.forEach((item, index) => {
      if (item.value != undefined) {
        item.value = item.value.toString().replaceAll(":gem:", "");
        item.value = item.value.toString().replaceAll(",", "");
        item.value = parseFloat(item.value.toString());
        newarray.push(item);
      }
    });
  
    return newarray;
  }

function addItem(index) {
    var selectedsave = selected;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    itemDiv.onclick = () => {
        if (selectedsave == 1) {
            value1 = value1 - Number(datasave[index].value);
        } else {
            value2 = value2 - Number(datasave[index].value);
        }

        updateText();

        itemDiv.remove();
    };

    const titleElement = document.createElement("h1");
    titleElement.textContent = datasave[index].title;
    itemDiv.appendChild(titleElement);

    const backgroundImageDiv = document.createElement("div");
    backgroundImageDiv.classList.add("background-image");
    backgroundImageDiv.style.backgroundImage = `url(${datasave[index].imageLink})`;
    itemDiv.appendChild(backgroundImageDiv);

    if (selectedsave == 1) {
        itemsList1.appendChild(itemDiv);
        value1 = value1 + Number(datasave[index].value);
    } else {
        itemsList2.appendChild(itemDiv);
        value2 = value2 + Number(datasave[index].value);
    }

    updateText();

    modal.style.display = "none";
}

function addGridItems(data) {
    var html = "";

    data.forEach((data, index) => {
      searchTitle = data.title.toLowerCase();
      searchValue = document.querySelector('.search-bar').value.toLowerCase();
      if (searchTitle.includes(searchValue)) {
        html =
            html +
            `
        <div onclick="addItem(${index})" class="grid-item">
        <h1>${data.title}</h1>
        <div style="background-image: url(${data.imageLink})" class="background-image"></div>
        </div>
        `; 
      } else {
        html += '';
      }
    });

    gridContainer.innerHTML = html;
}

Promise.all([
    fetch("https://www.stdvaluelist.com/_functions/api/Values").then((response) => response.json())
])
    .then(([valueData]) => {
        var combinedData = valueData;
        combinedData = deleteUnwantedData(combinedData);
        combinedData = deleteUnwantedData2(combinedData);
        addGridItems(combinedData);
        datasave = combinedData;
    })
    .catch((error) => {
        console.log(error);
    });

    function search() {
        Promise.all([
            fetch("https://www.stdvaluelist.com/_functions/api/Values").then((response) => response.json())
        ])
            .then(([valueData]) => {
                var combinedData = valueData;
                combinedData = deleteUnwantedData(combinedData);
                combinedData = deleteUnwantedData2(combinedData);
        
                addGridItems(combinedData);
                datasave = combinedData;
            })
            .catch((error) => {
                console.log(error);
            });
      addGridItems(combinedData);
    }