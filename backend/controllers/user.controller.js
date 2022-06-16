import { User } from "../models/Users.js";
import db from "../models/index.js";
const user = await User(db.sequelize);
import bcrypt from "bcrypt";
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

export const findAll = async (req, res) => {
	user
		.findAll({ attributes: ["username", "first_name", "last_name", "email"] })
		.then((users) => {
			res.json(users);
		})
		.catch((err) => console.log(err));

	// res.send("User coming soon.");
};

export const findOrCreate = async (req, res) => {
	const hash = await bcrypt.hash(req.body.password.toString(), 10);
	const [user1, created] = await user
		.findOrCreate({
			where: {
				username: req.body.username,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: hash,
			},
		})
		.catch((err) => {
			console.log(err?.errors[0].message);
			res.send(err?.errors[0].message);
		});
	if (created) {
		res.status(201).send("Successfully Registered New User");
	}
};

export const checkPassword = async (req, res) => {
	const { email, password } = await req.body;
	//Check email and password exists
	if (!email || !password) {
		console.log(email, password);
		return res.status(400).json({ message: "Email && Password Required" });
	}
	//selects user from db
	const selectedUser = await user.findOne({ where: { email: email } });

	if (selectedUser) {
		Promise.resolve(selectedUser)
			.then((u) => u.dataValues.password)
			.catch((err) => res.send(err))
			.then((pass) => {
				bcrypt
					.compare(password, pass)
					.then((match) => {
						if (match) {
							//JWT TOKENS HERE
							const accessToken = jwt.sign(
								{ username: selectedUser.username, roles: "1000" },
								process.env.ACCESS_TOKEN_SECRET,
								{ expiresIn: "5min" }
							);
							const refreshToken = jwt.sign(
								{ username: selectedUser.username, roles: "1000" },
								process.env.REFRESH_TOKEN_SECRET,
								{ expiresIn: "15days" }
							);
							selectedUser.update({ refreshToken });

							res.cookie("jwt", refreshToken, {
								httpOnly: true,
								maxAge: 24 * 60 * 60 * 1000,
							});
							res.status(200).json({
								accessToken,
								message: "You are logged in!",
								username: selectedUser.username,
							});
						} else {
							res.status(401).json({ message: "Password Not Valid" });
						}
					})
					.catch((err) => console.log(err));
			});
	} else {
		res.status(400).json({ message: "Enter Valid Email or Register" });
	}
};

export const deleteUser = async (req, res) => {
	let username = req.body.username;
	user
		.destroy({ where: { username: username } })
		.then((deleted) => {
			if (deleted >= 1) {
				res.status(201).send("Deleted User");
			}
			if (deleted === 0) {
				res.status(200).send("User Already Deleted");
			}
		})
		.catch((err) => res.status(400).send(err));
};
