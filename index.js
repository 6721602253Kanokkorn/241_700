// ===============================
// IMPORT MODULE
// ===============================
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;

app.use(bodyParser.json());
const cors = require('cors')
app.use(cors());

// ===============================
// CONNECT MYSQL
// ===============================
let conn = null;

// ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูล
const initMysql = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8700 // ถ้าใช้ default เปลี่ยนเป็น 3306
        });
        console.log('Connected to MySQL database');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
    }
};

/**
 * ============================================
 * CRUD API สำหรับตาราง users
 * ============================================
 * GET /users -> ดึงข้อมูลผู้ใช้ทั้งหมด
 * POST /users -> เพิ่มผู้ใช้ใหม่
 * GET /users/:id -> ดึงข้อมูลผู้ใช้ตาม id
 * PUT /users/:id -> แก้ไขข้อมูลผู้ใช้ตาม id
 * DELETE /users/:id -> ลบผู้ใช้ตาม id
 */

// ============================================
// GET /users - ดึงข้อมูลผู้ใช้ทั้งหมด
// ============================================
app.get('/users', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// ============================================
// GET /users/:id - ดึงข้อมูลผู้ใช้ตาม id
// ============================================
app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [rows] = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        // ถ้าไม่พบข้อมูล
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            message: 'Error fetching user'
        });
    }
});


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
        //if (err.response) {
        //console.log('Error Response', err.response.data.message);
        //}
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

// ============================================
// POST /users - เพิ่มผู้ใช้ใหม่
// ============================================
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 8) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        const [result] = await conn.query(
            'INSERT INTO users SET ?',
            user
        );

        res.json({
            message: 'User added successfully',
            insertId: result.insertId
        });

    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({
            message: 'Error adding user'
        });
    }
});

// ============================================
// PUT /users/:id - แก้ไขข้อมูลผู้ใช้
// ============================================
app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateUser = req.body;

        const [result] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updateUser, id]
        );

        // ถ้าไม่มีแถวถูกแก้ไข
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User updated successfully'
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Error updating user'
        });
    }
});

// ============================================
// DELETE /users/:id - ลบผู้ใช้ตาม id
// ============================================
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Error deleting user'
        });
    }
});

// ============================================
// START SERVER
// ============================================
app.listen(port, async () => {
    await initMysql();
    console.log(`Server is running on http://localhost:${port}`);
});