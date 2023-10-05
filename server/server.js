const express=require("express")
const cors=require("cors")
const mercadopago=require("mercadopago")

const app=express()

mercadopago.configure({
	access_token:"TEST-1214074434743236-100502-87841d8b4027c14feba4579ac3f69def-411315317"
})

app.use(cors())
app.use(express.json())

app.get("/",(req, res)=>{
    res.send("hola")
})

app.post("/create_preference", (req, res)=>{
    let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:5173",
			"failure": "http://localhost:5173",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
})

app.listen(3000, ()=>{

})