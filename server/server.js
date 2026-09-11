const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/api" , (req,res) => {
    res.json({
        message : "Welcome to DevCon API"
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Test route is working"
    });
});

app.post("/api/test",(req,res) => {
    console.log(req.body);

    res.json({
        message : "data recieved successfully"
    })
})

app.listen(PORT, () => {
    console.log(`DevCon server is running on port ${PORT}`);
});