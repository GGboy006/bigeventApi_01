const express = require('express')
const app = express()
const port = 3006

// 配置一句话,让post请求中的req.body,能够接收到参数
app.use(express.urlencoded({ extended: false }))

// 注册  db就是/database/index里面的那个fn函数
const db = require('./database/index');
app.post('/api/reguser', (req, res) => {
    // res.send('注册成功')
    // console.log(req.body);

    // 通过对象结构的方式,可以把对象中的属性定义为变量
    let { username, password } = req.body
    // console.log(username);
    let sql = `select *from user where username='${username}'`
    db(sql, (err, results) => {
        // 判断
        // console.log(results);
        if (err) return res.send({ status: 1, msg: 'sql语法错误' });
        // 如果大于1则说明用户名存在
        if (results.length >= 1) return res.send({ status: 1, msg: '用户名已经存在' })

        // res.send({ status: 0, msg: '注册成功' })\
        const utility = require('utility');
        password = utility.md5(password)
        let sql = `insert into user set username='${username}',password='${password}'`
        db(sql, (err, results) => {

            // 判断
            // console.log(results);
            if (err) return res.send({ status: 1, msg: 'sql语法错误' });
            // 如果大于1则说明用户名存在
            if (results.affectedRows !== 1) return res.send({ status: 1, msg: '添加失败' })

            res.send({ status: 0, msg: '添加成功' })
        })

    })

})



app.listen(port, () => console.log('启动成功'))
