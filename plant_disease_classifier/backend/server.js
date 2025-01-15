// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/imageDB', { useNewUrlParser: true, useUnifiedTopology: true });

// // Define a schema and model for storing images
// const imageSchema = new mongoose.Schema({
//     imageData: String
// });
// const Image = mongoose.model('Image', imageSchema);

// // Middleware
// app.use(bodyParser.json({ limit: '10mb' }));

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Route to save image
// app.post('/save-image', async (req, res) => {
//     try {
//         const newImage = new Image({ imageData: req.body.image });
//         await newImage.save();
//         res.json({ message: 'Image saved successfully' });
//     } catch (error) {
//         console.error('Error saving image:', error);
//         res.status(500).json({ message: 'Error saving image' });
//     }
// });

// // Route to get all images
// app.get('/images', async (req, res) => {
//     try {
//         const images = await Image.find({});
//         res.json(images);
//     } catch (error) {
//         console.error('Error retrieving images:', error);
//         res.status(500).json({ message: 'Error retrieving images' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to save image
app.post('/save-image', upload.single('image'), (req, res) => {
    try {
        res.json({ message: 'Image saved successfully', filePath: req.file.path });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ message: 'Error saving image' });
    }
});

// Route to get all images
app.get('/images', (req, res) => {
    const dir = path.join(__dirname, 'uploads');
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).json({ message: 'Error reading directory' });
            return;
        }
        const images = files.map(file => ({
            fileName: file,
            filePath: path.join('uploads', file)
        }));
        res.json(images);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});