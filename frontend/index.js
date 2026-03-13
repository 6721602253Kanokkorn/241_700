const validateData = (userData) => {
    let err =[]
    if (!userData.firstname) {
        err.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastname) {
        err.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        err.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        err.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        err.push('กรุณาเลือกงานอดิเรกอย่างน้อย 1 อย่าง');
    }
    if (!userData.description) {
        err.push('กรุณากรอกคำอธิบาย');
    }
    return err;
}

const submitData = async () => {
    // 1. แก้ชื่อ name ให้ตรงกับ HTML (ตัวพิมพ์เล็ก)
    let firstNameDOM = document.querySelector("input[name=firstname]");
    let lastNameDOM = document.querySelector("input[name=lastname]");
    let ageDOM = document.querySelector("input[name=age]");

    // 2. แก้ Gender ต้องเลือกตัวที่ :checked เท่านั้น
    let genderDOM = document.querySelector("input[name=gender]:checked") || {}

    let interestDOM = document.querySelectorAll("input[name=interests]:checked") || {}

    // 3. แก้ Description เป็น textarea (ไม่ใช่ input)
    let descriptionDOM = document.querySelector("textarea[name=description]");

    let messageDOM = document.getElementById("message");

try{
    // จัดการเรื่อง Interest (วนลูป)
    let interest = '';
    for (let i = 0; i < interestDOM.length; i++) {
        interest += interestDOM[i].value;
        if (i !== interestDOM.length - 1) {
            interest += ', ';
        }
    }

    // สร้าง Object ข้อมูล (ต้องเช็คว่า genderDOM มีค่าไหม กัน Error กรณีไม่ได้เลือกเพศ)
    let userData = {
        firstname: firstNameDOM.value,
        lastname: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        interests: interest,
        description: descriptionDOM.value
    }

   const err = validateData(userData);
    if (err.length > 0) {
        throw{
            message: 'กรอกข้อมูลไม่ครบถ้วน',
            errors: err
        }
   }

    console.log('submitData', userData);
    const response = await axios.post('http://localhost:8000/users', userData);
    messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ';
    messageDOM.className = 'message success';
    }catch (err) {
        console.log('Error Message', err.message)
        console.log('Error Details', err.errors)
        if (err.response) {
           console.log('Error Response', err.response.data.message);
           error.message = error.responsedata.message
           error.errors = error.response.data.errors
        }

        let htmlData = '<div>'
        htmlData += `<div>${err.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < err.errors.length; i++) {
            htmlData += `<li>${err.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'


        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
}