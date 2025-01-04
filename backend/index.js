const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 6551
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/news', async (req, res) => {
    try{
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${req.body.country}&category=${req.body.category}&apiKey=${req.body.apiKey}&page=${req.body.page}&pagesize=${req.body.pageSize}`);
        const parsedData = await response.json();
        res.json(parsedData);
    }
    catch(err){
        res.json({"Error":"Some Error Occured"})
    }
  
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log('Server running on http://localhost:'+PORT);
});
