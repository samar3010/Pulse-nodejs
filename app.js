
// process.on('uncaughtException', (err) => {
//     console.log('uncaughtException', err)
// })

const cors = require('cors')
const express = require('express')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(cors())
app.use(express.json())
app.use(async (req, res, next) => {

    await res.header('Acess-Control-Allow-Origin', '*');
    await res.header('Access-Control-Allow-Headers', '*');
    await res.header('Access-Control-Allow-Private-Network', 'true');
    await res.header('Access-Control-Allow-Mehtods', '*');
    next();

});


cloudinary.config({
    cloud_name: 'dihzn8jze',
    api_key: '649833491998811',
    api_secret: 'FHf-ygl9zxztuof61wCUb4QbPTQ'
  });
  
  // Configure Multer
  const upload = multer({ dest: 'uploads/' });
  
  // Handle PDF upload
  app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
    const { email, username } = req.body;
  
    // Upload PDF to Cloudinary
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload PDF' });
      } else {
        const { secure_url, original_filename, format } = result;
  
        // Send response to client
        res.json({
          message: 'PDF uploaded successfully',
          pdfUrl: secure_url,
          filename: original_filename,
          fileType: format
        });
      }
    });
  });
  // app.get('/api/uploads', async (req, res) => {
  //   try {
  //     const result = await cloudinary.search
  //       .expression('resource_type:raw')
  //       .execute();
  
  //     res.status(200).json(result.resources);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // });


  app.get('/downloads', async (req, res) => {
    try {
      const result = await cloudinary.api.resources({ type: 'upload' });
      const downloads = result.resources.map((resource) => {
        return {
          publicId: resource.public_id,
          url: resource.secure_url,
          format: resource.format,
          createdAt: resource.created_at
        };
      });
      res.json(downloads);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch downloads' });
    }
  });
const { allRequires } = require('./index.js')
const { dbConnection } = require('./src/database/dbConnection.js');
require('dotenv').config({ path: './config/.env' })
const port = process.env.PORT || 4000;
var morgan = require('morgan');
const AppError = require('./src/utils/AppError.js');
const globalMiddelwareErr = require('./src/utils/globalMiddelwareErr.js');
//middleware
app.use(express.static('uploads'))
app.use(express.urlencoded({ extended: false }))
allRequires(app)

if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'))
}





//global error hndeling middle عشان فيها  4parm وبتبقي لخر حاجه فال middelware
app.use(globalMiddelwareErr)

dbConnection();
//app.listen(port,()=>console.log(`listening on port ${port}!`));
app.listen(5000, () => {
    console.log("Server Running");
});


// process.on('unhandledRejection', (err) => {
//     console.log('unhandledRejection')

// })