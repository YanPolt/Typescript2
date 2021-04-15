import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { dataInfo } from './dataInfo.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredit: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputMinCreds: HTMLInputElement = <HTMLInputElement> document.getElementById("min-creds")!;
const inputMaxCreds: HTMLInputElement = <HTMLInputElement> document.getElementById("max-creds")!;

const codeElement: HTMLElement = document.getElementById("code")!;
const idElement: HTMLElement = document.getElementById("id")!;
const ageElement: HTMLElement = document.getElementById("age")!;
const addressElement: HTMLElement = document.getElementById("address")!;
const phoneElement: HTMLElement = document.getElementById("phone")!;

codeElement.innerHTML = `${dataInfo.code}`;
idElement.innerHTML = `${dataInfo.id}`;
ageElement.innerHTML = `${dataInfo.age} años`;
addressElement.innerHTML = dataInfo.address;
phoneElement.innerHTML = `${dataInfo.phone}`;

btnfilterByCredit.onclick = () => applyFilterByCredits();
btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() { 
  let min = parseInt(inputMinCreds.value);
  let max = parseInt(inputMaxCreds.value);
  min = (isNaN(min)) ? 0 : min;
  max = (isNaN(max)) ? Infinity : max;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(min: number, max: number, courses: Course[]): Course[] {
  return courses.filter(c=> c.credits >=min && c.credits <=max )
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}