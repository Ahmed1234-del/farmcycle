import express from 'express'
import multer from 'multer'
import path from 'path'
import mysql from 'mysql2/promise'
import { fileURLToPath } from 'url'
import fs from 'fs'
import bodyParser from 'body-parser';
import authRoutes from './authRoutes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

const pool = mysql.createPool({
  host: 'localhost',
  user: 'ahmed',
  password: 'Ahmed@1234',
  database: 'marketplace_db',
})



app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use('/uploads', express.static(uploadsDir))
app.use(express.json())
app.use(bodyParser.json())
app.use('/api/auth', authRoutes) 

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = `${Date.now()}${ext}`
    cb(null, uniqueName)
  },
})
const upload = multer({ storage })

const deleteImageFile = (filename) => {
  if (!filename) return
  const filepath = path.join(uploadsDir, filename)
  fs.unlink(filepath, (err) => {
    if (err) console.error('Failed to delete image:', err)
  })
}



app.get('/', (_req, res) => {
  res.send('Server is ready')
})

app.get('/api/products', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products')
    res.json(rows)
  } catch (err) {
    console.error('GET /api/products error:', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, seller, location } = req.body
    const image = req.file ? req.file.filename : null
    const priceFloat = parseFloat(price)

    const [result] = await pool.query(
      'INSERT INTO products (title, description, price, seller, location, image) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, priceFloat, seller, location, image]
    )

    res.status(201).json({ message: 'Product added', id: result.insertId })
  } catch (err) {
    console.error('POST /api/products error:', err)
    res.status(500).json({ error: 'Failed to add product' })
  }
})

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, price, seller, location } = req.body
    const image = req.file ? req.file.filename : null
    const priceFloat = parseFloat(price)

    const [[oldProduct]] = await pool.query('SELECT image FROM products WHERE id=?', [id])
    if (!oldProduct) return res.status(404).json({ message: 'Product not found' })

    if (image) {
      await pool.query(
        'UPDATE products SET title=?, description=?, price=?, seller=?, location=?, image=? WHERE id=?',
        [title, description, priceFloat, seller, location, image, id]
      )
      if (oldProduct.image) deleteImageFile(oldProduct.image)
    } else {
      await pool.query(
        'UPDATE products SET title=?, description=?, price=?, seller=?, location=? WHERE id=?',
        [title, description, priceFloat, seller, location, id]
      )
    }

    res.json({ message: 'Product updated' })
  } catch (err) {
    console.error('PUT /api/products/:id error:', err)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [[product]] = await pool.query('SELECT image FROM products WHERE id=?', [id])
    if (!product) return res.status(404).json({ message: 'Product not found' })

    await pool.query('DELETE FROM products WHERE id=?', [id])
    if (product.image) deleteImageFile(product.image)

    res.json({ message: 'Product deleted' })
  } catch (err) {
    console.error('DELETE /api/products/:id error:', err)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
