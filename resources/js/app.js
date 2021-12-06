	//FrontEnd

    /*
    administrativeDivision: "Vilniaus rajono savivaldybė"
    code: "azulauke"
    countryCode: "LT"
    name: "Ažulaukė"

    forecastCreationTimeUtc: "2021-12-01 07:52:10"
    forecastTimestamps: (86) [{…}, {…}, {…}]
    forecastType: "long-term"
    place: {code: 'vilnius', name:

    2021-12-06 14:00:00
    */

	window.axios = require('axios');
	window.bootstrap = require('bootstrap');

    let list = document.querySelector('#list')

    let todays_date = new Date();
   // let todays_hours = new Date();
    let select_date = document.createElement('select');
    let select_hour = document.createElement('select');

    function displayForcast(arr, dateString){

        for (let element of arr){
                if(element.forecastTimeUtc==dateString){
                    let temp = document.createElement('h4');
                    let text = document.createTextNode(`Tempreture in ${dateString} is \n${element.airTemperature}`)
                    temp.appendChild(text);
                    temp.classList.add('basic-text');
                    document.body.appendChild(temp);
                    console.log(element);
                    
                }
        }
    }

    function formForcastString(arr){

        let output = '';
        
        output = `${todays_date.getFullYear()}-${select_hour.value} ${select_date.value}:00`
        console.log(select_hour.value);

        select_hour.addEventListener('change', function (){
            if(document.querySelector('h4')){
            document.body.removeChild(document.querySelector('h4'));
        }
            output = `${todays_date.getFullYear()}-${select_hour.value} ${select_date.value}:00`
            console.log(output);
            displayForcast(arr, output);
        });

        select_date.addEventListener('change', function (){
            if(document.querySelector('h4')){
            document.body.removeChild(document.querySelector('h4'));
        }
            output = `${todays_date.getFullYear()}-${select_hour.value} ${select_date.value}:00`
            console.log(output);
            displayForcast(arr, output);
        });

        console.log(arr);

    }

    function setDateSelect (arr, callback){

        let label = document.createElement('label');
        
        //Date
        for (let i = 0; i < 8; i++) {

            let option_hour = document.createElement('option');

            if((todays_date.getDate()<10)&&(todays_date.getMonth()<10)){
            text_hour = document.createTextNode(`0${todays_date.getMonth()+1}-0${todays_date.getDate()}`)};

            if((todays_date.getDate()>=10)&&(todays_date.getMonth()<10)){
            text_hour = document.createTextNode(`0${todays_date.getMonth()+1}-${todays_date.getDate()}`)};

            if((todays_date.getDate()<10)&&(todays_date.getMonth()>=10)){
            text_hour = document.createTextNode(`${todays_date.getMonth()+1}-0${todays_date.getDate()}`)};

            if((todays_date.getDate()>=10)&&(todays_date.getMonth()>=10)){
            text_hour = document.createTextNode(`${todays_date.getMonth()+1}-${todays_date.getDate()}`)};

            option_hour.appendChild(text_hour);
            select_hour.appendChild(option_hour);

            todays_date.setDate(todays_date.getDate() + 1);
        }


        //Time
        for (let i = 0; i < 24; i++) {

            let option_date = document.createElement('option');
            let hour = todays_date.getHours()+1;

            if(hour<10){
                text_date = document.createTextNode(`0${hour}:00`)}
            else{
                text_date = document.createTextNode(`${hour}:00`)}

            option_date.appendChild(text_date);
            select_date.appendChild(option_date);

            todays_date.setHours(todays_date.getHours() + 1);

            }

            select_hour.setAttribute("id", "select_hour");
            select_date.setAttribute("id", "select_date");
        select_hour.classList.add('search-input');
        select_date.classList.add('search-input');

        date_wrapper = document.querySelector('.date_wrapper');
        console.log(date_wrapper);
        document.body.appendChild(label);
        date_wrapper.appendChild(select_hour);
        date_wrapper.appendChild(select_date);

        callback(arr);
    }

    function setDropdown (array){

        clearDropdown();

        for (let element of array){


                if(element.countryCode=='LT') {
                let li = document.createElement('li');
                let li_text =  document.createTextNode(element.name);

                li.addEventListener('click', function() {
                    document.querySelector('.search_input').value='';
                    document.querySelector('.search_input').placeholder=`${li.innerText}`;


                    if(document.querySelector('h5')){
                        document.body.removeChild(document.querySelector('h5'));
                    }
                    if(document.querySelector('h4')){
                        document.body.removeChild(document.querySelector('h4'));
                    }
                    clearDropdown();
                    let codeLocation ='';
                    for (let element of array){
                        if(element.name==li.innerText)
                            codeLocation = element.code
                    }
                    console.log(li.innerText);
                    console.log(codeLocation);
                    let viet = document.createElement('h5');
                    let text = document.createTextNode(`Location: ${li.innerText}`)
                    viet.appendChild(text);
                    viet.classList.add('basic-text');
                    document.body.appendChild(viet);

                    fetch(`/weather/long-term/${codeLocation}`)
                    .then(response => response.json())
                    .then(data => { 
                        console.log(data)

                        setDateSelect(data.forecastTimestamps, formForcastString);

                        });

                   // .reset();
                });

                li.appendChild(li_text);
                list.appendChild(li);
                }
    
        }
    }

    function clearDropdown (){
        
        while(list.firstChild){
            list.removeChild(list.firstChild);
        }
    }

    function logEmptyDropdown (){

        let li = document.createElement('li');
        let li_text =  document.createTextNode('No results');
        li.appendChild(li_text);
        list.appendChild(li);
    }

	window.addEventListener('DOMContentLoaded', (event) => {

        
        let places_data = [];
        fetch('/weather/places') 
            .then(response => response.json())
            .then(data => { places_data = data; });

        let input = document.querySelector('.search_input')

        input.addEventListener('input', function (){

            let sorted_arr = places_data.filter(p => p.name.toLowerCase().includes(this.value.toLowerCase()));
            setDropdown(sorted_arr);
            if(sorted_arr.length == 0){
                logEmptyDropdown();

            }
            if(this.value==''){
                clearDropdown();
            }

        });
	});
