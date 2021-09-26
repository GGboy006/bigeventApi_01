function fn(sql, callback) {
    // 导入mysql
    const mysql = require('mysql');
    // 创建链接
    const conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'my_db'
    });
    conn.connect()
    conn.query(sql, callback);
    conn.end()
}

module.exports = fn