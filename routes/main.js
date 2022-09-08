
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/uploads', (req, res) => {
    res.render('uploads');
});

//загрузка одного изображения
router.post('/uploads', uploads.single('photo'), function(req, res, next){
    const filedata = req.file;
        if(!filedata)
            res.send("Ошибка при загрузке файла");
        else
            //res.send("Файл загружен");
            res.send('gallery1');
        // console.log ('Тип файла:', filedata.mimetype);
        // console.log ('Имя файла', filedata.originalname);
        // console.log ('Размер файла:', filedata.size);
        // console.log ('Путь для сохранения:', filedata.path);
        console.log(filedata);
 });
 
//загрузка нескольких изображений
// router.post('/uploads', uploads.array('photo', 2), function(req, res, next){
  
//     const file = req.file;
//     res.send('Завантажено!');
//  });

//  router.get('/form', function(req, res, next){
//     const form = fs.readFyleSync('./main.ejs', {encoding: 'utf8'});
//     res.send(form);
//  });


// router.post('/tren', (req, res) => {
//     console.log('Тренировка построена!');
//     res.json({ status: 'ok' });
// });

router.use((req, res, next) => {
    console.log('URL:', req.url);
    //res.send('моя прелесть!'); 
    next();  
});

module.exports = router;