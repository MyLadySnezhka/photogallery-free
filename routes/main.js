
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const getHash = require('hash-stream');
const multer = require('multer');
//const uploads = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
  res.render('main');
});

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  // filename: (req, file, cb) => {
  //     cb(null, Date.now() + path.extname(file.originalname));
  //     //cb(null, file.originalname + '-' + Date.now());
  // }
});
 
//const uploads = multer({ storage: storage });

router.use(express.static(__dirname));

router.use(multer({storage:storageConfig}).single('photo'));


hash = '';
newName = '';

//загрузка одного изображения
router.post('/uploads', function(req, res, next){
    const filedata = req.file;
    // console.log ('Тип файла:', filedata.mimetype);
    // console.log ('Имя файла', filedata.originalname);
    // console.log ('Размер файла:', filedata.size);
    // console.log ('Путь для сохранения:', filedata.path);
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else {
        //res.send("Файл загружен");    

    getHash(filedata.path, 'sha256', function (err, hash) {
        hash = hash.toString('hex');
        
        newName = './uploads/' + hash + path.extname(filedata.originalname); 
        console.log(newName);
        fs.rename(filedata.path, newName, (err) => {
            if (err) throw err;
            console.log('file renamed');
        });
        })
       res.render('gallery1', newName);
    
    }
 });

router.get('/uploads', (req, res) => {
  res.render('uploads');
});

// //загрузка нескольких изображений по одному
// router.post('/uploads', uploads.array('file', 25), function(req, res, next){
//     const filedata = req.file;
//     if(!filedata)
//         res.send("Ошибка при загрузке файла");
//     else
//         res.render('gallery1'); 
//  });


//const multipleUpload = upload.fields([{ name: 'file', maxCount: 10 }]);


// router.post('/gallery1', multipleUpload, (req, res) => {
//     const photos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//     if(req.files){
//         photos.forEach((i) => { async function imgChange() {
//         await sharp(`./public/uploads/DSC_${i}.jpg`)
//         .resize({
//             width:400,
//             height:400,
//             fit:'contain',
//             position:'center',
//             background: {r:255, g:255, b:255}
//         })
//         .composite([
//             {
//                 input:"./public/watermark.png",
//                 position:'center',
//             },
//         ])
        
//         .toFile(`./public/ready/new_${i}.jpg`)
//         .then(() => console.log('done...'));
//     }
//     setTimeout(imgChange, 5000);
//     })
// }
// })


//  router.get('/form', function(req, res, next){
//     const form = fs.readFyleSync('./main.ejs', {encoding: 'utf8'});
//     res.send(form);
//  });


// router.post('/tren', (req, res) => {
//     console.log('Тренировка построена!');
//     res.json({ status: 'ok' });
// });

// router.use((req, res, next) => {
//     console.log('URL:', req.url);
//     //res.send('моя прелесть!'); 
//     next();  
// });

module.exports = router;