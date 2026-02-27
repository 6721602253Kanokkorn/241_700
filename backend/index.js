// ===============================
// IMPORT MODULE
// ===============================
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;

app.use(bodyParser.json());

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

// ============================================
// POST /users - เพิ่มผู้ใช้ใหม่
// ============================================
app.post('/users', async (req, res) => {
    try {
        const user = req.body;

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
