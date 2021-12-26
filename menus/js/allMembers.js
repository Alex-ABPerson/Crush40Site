var navLeftBtn;
var navRightBtn;
var img;
var title;
var description;
var list;
var pos = 0;

window.addEventListener('load', () => {
    navLeftBtn = document.querySelector(".navLeft");
    navRightBtn = document.querySelector(".navRight");
    img = document.querySelector(".img");
    title = document.querySelector(".text .name");
    description = document.querySelector(".text .description")
    list = document.querySelector(".list")

    UpdateView(members[0]);
});

function UpdateView(newView)
{
    title.innerHTML = newView.name;
    description.innerHTML = newView.description;
    img.src = '../img/' + newView.img;

    list.replaceChildren();

    for (let work of newView.works)
    {
        // <div class="listItem"><p class="identifier"></p><p class="title"></p></div>
        let listItem = document.createElement("div");
        listItem.classList.add("item");

        let identifier = document.createElement("p");
        identifier.classList.add("identifier");

        switch (work.type)
        {
            case "show":
                identifier.innerHTML = "SHOW";
                listItem.classList.add("itemShow");
                break;
            case "song":
                identifier.innerHTML = "SONG";
                listItem.classList.add("itemSong");
                break;
        }

        listItem.appendChild(identifier);

        let title = document.createElement("p");
        title.classList.add("title");
        title.innerHTML = work.name;

        listItem.appendChild(title);
    
        list.appendChild(listItem);
    }
}