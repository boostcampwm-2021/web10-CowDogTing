import * as express from "express";

const app = express();
app.set("port", process.env.PORT || 5000);

app.get("/",(req,res) => {
    res.send("Hello, Express");
});

app.use((err, req, res, next)=> {
    console.log(err);
    res.status(500).send(err.message);
})

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트");
});