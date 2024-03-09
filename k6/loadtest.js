import http from 'k6/http';
import {check, sleep} from 'k6';


function randomInt(min, max) {
    // return [min, max] 
    let numA =  Math.floor(Math.random() * (max - min + 1) + min);
    let numB =  Math.floor(Math.random() * (max - min + 1) + min);
    let sortNum = [numA, numB].sort((a, b) => a - b);
    return sortNum;
}

function randomGender() {
    return Math.random() < 0.5 ? 'M' : 'F';
}

function randomCountry() {
    const countries = ['TW', 'US', 'JP'];
    return countries[Math.floor(Math.random() * countries.length)]
}

export let options = {
    stages:[
       
        {duration: '10s', target: 2000}, // 1000 per second
        {duration: '9s', target: 2000}, 
    ],
};



export default function () {
    const [age_start, age_end] = randomInt(18, 100);
    const country = randomCountry();
    const gender = randomGender();
    let res = http.get(`http://localhost:8080/ads?age_start=18&age_end=80&country[]=US&platform[]=ios&gender[]=F&limit=10&offset=0`)
    // let res = http.get(`http://localhost:8080/ads?age_start=${age_start}&age_end=${age_end}&country[]=${country}&platform[]=ios&gender[]=${gender}&limit=10&offset=0`);
    check(res, {'status was 200': (r) => r.status == 200});
    sleep(1);
}

