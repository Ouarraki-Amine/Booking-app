const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/User');
const Place =require('./models/Place');
const Reservation = require('./models/Reservation')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs =require('fs'); 





const app = express();
//pour crypter password
const bcryptSalt = bcrypt.genSaltSync(10);

//pour genere token
const jwtSecret = 'weijldwjl3jfjefd3jedjl344';

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173',
}))


mongoose.connect(process.env.MONGO_URL).then((res)=>{
  app.listen(4000, () => {console.log(`Le sesrveur eecoute `);});
});

app.get('/test', (req, res) => {
  res.json('Bonjour lse monde !');
});

//signup
app.post('/register', async (req,res)=>{
  const {name,email,password} = req.body;
  try{
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  }catch(e){
    res.status(422).json(e)
    
  }
});


//signin
app.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const userDoc = await User.findOne({email})
  if(userDoc){
    const passOk = bcrypt.compareSync(password,userDoc.password)
    if(passOk){
      jwt.sign({email:userDoc.email, id:userDoc._id,name:userDoc.name}, jwtSecret, {},(err,token)=>{
        if (err) throw err;
        res.cookie('token',token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok')
    }
  }else{
    res.status(422).json('not found')
  }
});


// profile

app.get('/profile',(req,res)=>{
  const {token}=req.cookies;
  if(token){
    jwt.verify(token,jwtSecret,{}, async (err,userData)=>{
      if(err)throw err;
      const {name,email,_id} = await User.findById(userData.id)
      res.json({name,email,_id});
    });
  }else{
    res.json(null);
  }
})


//logout

app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true);
})


// Supprimer les photos
app.post('/rmphoto', async(req,res)=>{
  const {rmPhoto}=req.body
  const link = 'uploads/'+rmPhoto;
  fs.unlink(link, (err) => {
    if (err) {
      console.error('Erreur lors de la suppression du fichier :', err);
      return res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du fichier.' });
    }

    console.log('Le fichier a été supprimé avec succès.');
    res.status(200).json({ message: 'Le fichier a été supprimé avec succès.' });
  });
});
  



//Uploads by Link

app.post('/upload-by-link', async (req,res)=>{
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
})


//upload 
const photosMiddleware = multer({dest:'uploads/'});

app.post('/upload', photosMiddleware.array('photos', 100), (req,res)=>{
  const uploadFiles =[];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    const lastPath = newPath.split('uploads\\')
   console.log(lastPath)
    uploadFiles.push(lastPath[lastPath.length - 1]);
    
  }
  res.json(uploadFiles);
});


// add new Reservation
app.post('/reserve', async (req,res)=>{
  const {token} = req.cookies;
  const {place_id,checkIn,checkOut,nbOfGuests,nbOfChild,nbOfBaby,nbOfNights,price,etat} = req.body;
  
  if(token){
    jwt.verify(token,jwtSecret,{}, async (err,userData)=>{
      if(err)throw err;
      const reserDoc = await Reservation.create({
        owner:userData.id,
        place_id,
        checkIn,checkOut,nbOfGuests,nbOfChild,nbOfBaby,nbOfNights,price,etat,
      });
      res.json(reserDoc);
    })
    }else{
      res.status(422).json('not found')
}

})


// add new places
app.post('/places', async (req,res)=>{
  const {token} = req.cookies;
  const {title,address,addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,maxChild,maxBaby,price} = req.body;
  jwt.verify(token,jwtSecret,{}, async (err,userData)=>{
    if(err)throw err;
    const placeDoc = await Place.create({
      owner:userData.id,
      title,address,addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,maxChild,maxBaby,price
    });
    res.json(placeDoc);
  })

})


// lister les annonces de l'utilisateurs;

app.get('/user-places', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Place.find({owner:id}));
  });
});


// details de l'annonce

app.get('/places/:id', async (req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id))
})


// update l'annonce

app.put('/places', async (req,res) => {
  const {token} = req.cookies;
  const {action,title,address,addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,maxChild,maxBaby,price} = req.body;
  
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if(err) throw err;
    const placeDoc = await Place.findById(action);
    if(userData.id === placeDoc.owner.toString()){
      
      placeDoc.set({title,address,addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,maxChild,maxBaby,price})
      await placeDoc.save();
      res.json('ok');
    }
   
  })

})

// lister toute les annonces

app.get('/places', async (req,res) => {

  res.json( await Place.find());

});


//supprimer une annonce 

app.delete('/delete/:id', async (req,res) => {
  const {id} = req.params;
  const doc = await Place.findByIdAndDelete(id)
  res.json('trush')
})

// lister toute les reservation

app.get('/reservation', async (req,res) => {

  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    ;
    res.json( await Reservation.find({owner:id}).populate('place_id'))
  });

});