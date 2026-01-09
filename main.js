/*^
//String ตัวอักษร
let fname = 'John'
console.log('name',fname)
// const ค่าคงที่ เปลี่ยนค่าไม่ได้
const idcard = 123

//Number
let age = 30
let height = 150.5

fname = 'Tom'

idcard = '456'
console.log('idcard',idcard)

console.log('name',fname, 'age',age)
//console.log('age',age)
*/
/** 
let number1 = 'Kanokkorn' // string
let number2 = 'Bootthijak'

let number3 = number1+' '+ number2
console.log('Number 3 =',number3)
*/

/**
+ บวก
- ลบ
* คูณ
/ หาร
% หารเอาเศษ
 Condition statement (if,else,switch)
 == เท่ากับ   != ไม่เท่ากับ
 > มากกว่า   >= มากกว่าเท่ากับ
 < น้อยกว่า   <= น้อยกว่าเท่ากับ
 */

/**
let number1 = 90
let number2 = 55

let Condition1 = number1 >= number2

console.log('Condition id =',Condition1)
*/

// if-else condition
/**
let number1 = 90
let number2 = 5

if (number1 >= number2){
   console.log('this if')
   } else if(number1 == number2){
    console.log('this is else if')
   } else {
    console.log('this else')
   }
    */

   /*
   Grade
   >=80 A
   >= 70 B
   >= 60 C
   >= 50 D

let score = 55
if(score >= 80){
    console.log('Grade: A')
} else if( score >= 70){
    console.log(Grade: B')
} else if(score >= 60){
    console.log('Grade: C')
} else if (score >= 50){
    console.log('Grade: D')
} else {
    console.log('Grade: F')
}
*/
/* 
&& และ 
|| หรือ
! ไม่

let number1 = 5
let number2 = 10
// T || F = T
let condition = !(number1 >= 3 || number2 >= 11)
console.log('result of condition',condition)
*/
/*
let number = 20
if(!(number%2 == 0)){
    console.log('You are event.')
}
*/

/*
let counter = 0
while(counter <= 10){ //true
   console.log('Hi')
   counter = counter+1
   //counter = counter+1
   //counter += 1
   //counter--
}

for(let counter = 0; counter < 10; counter++){
    console.log('Hi')
}
*/

/* 
Array

let age1 = 20
let age2 = 25
let age3 = 30

let ages = [20, 25, 30]
ages = [200, 100, 50]

console.log('age1 age2 age3',age1,age2,age3)
console.log(`age1 age2 age3 ${age1} ${age2} ${age3}`)
console.log('Array',ages)

console.log('index',ages[0])

//ต่อ array
ages.push(25)
console.log('push array',ages)

// ลบ array ตัวสุดท้าย
ages.pop()
console.log('pop array',ages)

let ages = [50, 20, 25, 30, 35, 40]
if(ages.includes(30)) { //True
  console.log('มีเลข30อยู่ในarray')    
}
ages.sort()
    console.log('age',ages)

let name_list =['aa','bb', 'cc']
name_list.push('dd')
console.log(name_list)

name_list.pop()
console.log('pop name_list',name_list)
console.log('name_list',name_list.length)
console.log('name_list',name_list[0])
console.log('name_list',name_list[1])
console.log('name_list',name_list[2])

for(let index = 0; index < name_list.length; index++) {
    console.log('name list',name_list[index])
}
    */


/*
function 


let student = [{
    age: 30,
    name: 'aa',
    grade: 'A'
},{ 
    age: 35,
    name: 'bb',
    grade: 'B'
}]
student.push[{
    age: 40,
    name: 'cc',
    grade: 'c'
}]

student.pop()

for(let index = 0; index < student.length; index++){
console.log('student number',(index).index+1)
console.log('age',student[index].age)
console.log('name',student[index].name)
console.log('grade',student[index].grade)
}
*/

/**
 * funtion
 

let score1 = 55
let score2 = 65

let grade = ' '
// ประกาศใช้ฟังก์ชัน
function calculate_grade(score){
if(score>= 80){
    grade = ' A '
}else if (score >= 70){
    grade = ' B '
} else if (score >= 60){
    grade = ' C '
} else if (score >= 50){
    grade = ' D '
} else {
    grade = ' F '
}
return grade
}

//เรียกใช้ฟังก์ชัน
let grade1 = calculate_grade(score1)
console.log('Grade',grade1)
*/
/* array 
let score = [20,30, 40, 50]

for(let index = 0; index <= score.length; index++){
    console.log('score',score[index])
}
/*
score[0] = score[0] * 2
score[1] = score[1] * 2
score[2] = score[2] * 2
score[3] = score[3] * 2

score = score.map ((s)=> {
return s * 2
})
*/
/*
let newScore = score.filter((s) => {
   return s >= 30
})

newScore.forEach((ns) => {
    console.log('New Score',ns)
})
*/

/* object function*/
let students = [
    {
        name:'aa',
        score: 50,
        grade: 'D'
    },{
        name:'bb',
        score: 80,
        grade: 'A'
    }
]

let student = students.find((s)=> {
    if(s.name == 'aa'){
        return true
    }
})

let double_score = students.map((s) => {
    s.score = s.score*2
    return s
})
let hightScore = students.filter((s) => {
    if(s.score >= 120) {
        return
    }
})

console.log(student)

console.log('double_score',double_score)
console.log('highScore',hightScore)