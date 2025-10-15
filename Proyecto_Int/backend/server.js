const express = require('express')
const cors = require('cors')

const { supabase } = require('./src/lib/supabaseClient')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Servidor backend funcionando 🚀')
})

// Ejemplo de endpoint API
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend de JavaScript' })
})

// --- Endpoints para la tabla 'cliente' ---
// POST /api/cliente -> insertar un cliente
// Body esperado (ejemplo): { nombre: 'Ana', email: 'ana@ejemplo.com', telefono: '12345678' }
app.post('/api/cliente', async (req, res) => {
  try {
    const payload = req.body
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'Body vacío. Enviar los datos a insertar.' })
    }

    // Si el cliente envía ci_cliente que es un UUID (user id de Supabase), mapearlo a user_id
    // Para mayor compatibilidad, aceptamos user_id directamente o lo inferimos desde ci_cliente
    const body = { ...payload }
    const maybe = String(body.ci_cliente || '')
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    if (maybe && uuidRegex.test(maybe)) {
      body.user_id = maybe
      // Eliminamos ci_cliente para evitar que se inserte en la columna ci_cliente
      // (ci_cliente en la tabla original es VARCHAR(20) y truncaría/causaría error)
      // pero si la tabla requiere ci_cliente (PK NOT NULL), dejamos ci_cliente igual al uuid
      // para mantener compatibilidad: copiamos user_id en ci_cliente si no existe
      if (!body.ci_cliente) {
        body.ci_cliente = maybe
      }
    }

    const { data, error } = await supabase.from('cliente').insert([body])

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ error: error.message })
    }

    res.status(201).json({ inserted: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error interno' })
  }
})

// GET /api/cliente -> listar clientes (paginación mínima)
app.get('/api/cliente', async (req, res) => {
  try {
    const { data, error } = await supabase.from('cliente').select('*').limit(100)
    if (error) {
      console.error('Supabase select error:', error)
      return res.status(500).json({ error: error.message })
    }
    res.json({ clientes: data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error interno' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
