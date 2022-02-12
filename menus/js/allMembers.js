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
    img = document.querySelector(".img img");
    title = document.querySelector(".text .name");
    description = document.querySelector(".text .description")
    list = document.querySelector(".list")

    navLeftBtn.addEventListener('click', () => {
        pos--;
        UpdateView();
    });

    navRightBtn.addEventListener('click', () => {
        pos++;
        UpdateView();
    });

    UpdateView();
    window.parent.postMessage('!400px', '*');
});

function UpdateView()
{
    let newView = members[pos];

    // Update buttons    
    navLeftBtn.style.visibility = pos == 0 ? 'hidden' : 'visible';
    navRightBtn.style.visibility = pos == members.length - 1 ? 'hidden' : 'visible';

    // Update details
    title.innerHTML = newView.name;
    description.innerHTML = newView.description;
    img.src = '../img/content/members/' + newView.img;

    list.replaceChildren();

    for (let work of newView.works)
    {
        // <div class="listItem"><p class="identifier"></p><p class="title"></p></div>
        let listItem = document.createElement("li");
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
        title.innerHTML = work.id ? Crush40Songs[work.id] : work.name; // TODO: Remove work.name

        listItem.appendChild(title);
    
        list.appendChild(listItem);
    }
}