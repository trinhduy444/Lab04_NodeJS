const express = require('express');
const app = express();
const path = require('path');
port = 3000;
const dotenv = require('dotenv');
const e = require('express');

dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, '/public')));
console.log(path.join(__dirname));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let flashMessage = '';

let url = 'https://gorest.co.in/public/v2/users';

app.get('/', (req, res) => {
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            res.render('index', {
                users: data,
                message: flashMessage,
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

app.get('/add', (req, res) => {
    res.render('add', { error: '' });
})
const token = 'ea8744341f29175db6c675e157ca43f604c31909ebbffdf4a618f4473eb3c4b9';
app.post('/add', (req, res) => {
    const {name, email, gender, status} = req.body;
    // console.log(name, email, gender, status);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            gender,
            status
        }),

    }).then(response => response.json(
        // console.log(response)
    )).then(data => console.log(data))
        .catch(error => console.error(error));
    flashMessage = 'Add product successfully';
    return res.redirect('/',{
        message: flashMessage,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port} http://localhost:${port}`);
});