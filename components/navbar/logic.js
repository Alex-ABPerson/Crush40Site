var Navbar = class {
    navElem = null
    pageScrollCtrl = null

    constructor(nav, pageId, pageScrollCtrl) {

        this.navElem = nav;
        this.navElem.classList.add("_comp_navbar");
        this.navElem.innerHTML = `
            <div class="other">
                <img class="logo" src="img/logo_white.svg" alt="Crush 40 Logo">
                <button class="btn" title="Toggle Navigation Menu"><img src="img/icons/hamburgerMenu.svg" alt="Menu Icon"></button>
            </div>

            <ul class="items">
                <li id="navAbout">
                    <div class="back"></div>
                    <a href="index.html"><p>About</p></a>
                </li>
                <li id="navDiscography">
                    <div class="back"></div>
                    <a href="discography.html"><p>Discography</p></a>
                </li>
                <li id="navGear">
                    <div class="back"></div>
                    <a href="gear.html"><p>Gear</p></a>
                </li>
                <li id="navShows">
                    <div class="back"></div>
                    <p>Shows</p>
                </li>
                <li id="navMerch">
                    <div class="back"></div>
                    <a href="https://johnnygmerch.com" target="_blank"><p>Merch</p></a>
                </li>
                <!--<li id="navBranding">
                    <div class="back"></div>
                    <p>Branding</p>
                </li>
                <li id="navHistory">
                    <div class="back"></div>
                    <p>History</p>
                </li>-->
            </ul>
        `;

        this.navElem.querySelector(".btn").addEventListener('click', () => {
            if (this.navElem.classList.contains("_comp_navbar_open"))
                this.Close();
            else
                this.Open();
        });
    
        window.addEventListener('resize', () => {
            if (this.navElem.classList.contains("_comp_navbar_open") && window.innerWidth > 1040)
                this.Close();
        });

        this.pageScrollCtrl = pageScrollCtrl;
        this.UpdatePageSelection(pageId);
    }

    Close()
    {
        this.pageScrollCtrl.ReleaseOneNoScroll();
        this.navElem.classList.remove("_comp_navbar_open");
    }

    Open()
    {
        this.pageScrollCtrl.AddOneNoScroll();
        this.navElem.classList.add("_comp_navbar_open");
    }

    UpdatePageSelection(id) {
        let item = this.navElem.querySelector(".items #" + id);
        item.classList.add("selected");
    }
}
