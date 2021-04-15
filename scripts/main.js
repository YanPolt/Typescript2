import { dataCourses } from './dataCourses.js';
import { dataInfo } from './dataInfo.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredit = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var inputMinCreds = document.getElementById("min-creds");
var inputMaxCreds = document.getElementById("max-creds");
var codeElement = document.getElementById("code");
var idElement = document.getElementById("id");
var ageElement = document.getElementById("age");
var addressElement = document.getElementById("address");
var phoneElement = document.getElementById("phone");
codeElement.innerHTML = "" + dataInfo.code;
idElement.innerHTML = "" + dataInfo.id;
ageElement.innerHTML = dataInfo.age + " a\u00F1os";
addressElement.innerHTML = dataInfo.address;
phoneElement.innerHTML = "" + dataInfo.phone;
btnfilterByCredit.onclick = function () { return applyFilterByCredits(); };
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var min = parseInt(inputMinCreds.value);
    var max = parseInt(inputMaxCreds.value);
    min = (isNaN(min)) ? 0 : min;
    max = (isNaN(max)) ? Infinity : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(min, max, courses) {
    return courses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
