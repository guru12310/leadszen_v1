const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // ✅ IMPORTANT
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/lead', require('./routes/lead.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/client', require('./routes/client.routes'));

app.listen(3000, () => console.log('Server running'));