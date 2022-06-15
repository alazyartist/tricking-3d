import express from "express";

export const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
	res.send("It works");
});
loginRoutes.get("/dash", (req, res) => {
	res.send("Welcome to the Dashboard");
});
