const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modewSwitch = body.querySelector(".mode"),
    modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click",() =>{
        sidebar.classList.toggle("close");

    });

    searchBtn.addEventListener("click",() =>{
        sidebar.classList.remove("close");

    });



    modewSwitch.addEventListener("click",() =>{
        body.classList.toggle("dark");

        if(body.classList.contains("dark")){
            modeText.innerText = "Light Mode"
        }else{
            modeText.innerText = "Dark Mode"
        }

        
    });