window.onload = () => {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');



    fetch('http://127.0.0.1:8000/', {
        method: 'get',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
        },
        // body: JSON.stringify(opts)
      }).then((response)=>{
        //   console.log(response)
        return response.json()
      }).then(response=>console.log(response))



      fetch('http://127.0.0.1:8000/post', {
        method: 'post',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({"ola": "teste"})
      }).then((response)=>{
        //   console.log(response)
        return response.json()
      }).then(response=>console.log(response))



      



    var themeState = {
        initConfig: () => {
            let themes = document.querySelectorAll(".theme-selector");
                themes.forEach((elem, index)=>{
                    elem.addEventListener("click", themeState.handleClickTheme);
                });
        },

        handleClickTheme: (e) => {
            let themeSelected = e.target,
                theme = themeSelected.dataset.theme,
                themePlacer = document.querySelectorAll("body.main-container")[0];

            let themes = document.querySelectorAll(".theme-selector");
                themes.forEach((elem, index)=>{
                    elem.className = elem.className.replace(/selected/gi, "");
                });
            
            themeSelected.classList += " selected";
            themePlacer.className = "main-container "+theme;
            window.localStorage.setItem("theme", theme);
        },
    
        setThemeFromSession: () => {
            let theme = window.localStorage.getItem("theme");
            if(theme){
                let themePlacer = document.querySelectorAll("body.main-container")[0]
                    themePlacer.className = "main-container "+theme;
            }
        }
    }

    themeState.setThemeFromSession();
    themeState.initConfig();
}