import { User } from "../models/users.js";
import db from "../models/index.js";
const user = await User(db.sequelize);
import bcrypt from "bcrypt";
import env from "dotenv";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { mailer } from "../middleware/nodemailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();

export const getUserInfo = async (req, res) => {
	console.log("hit userInfo");
	const refreshToken = req.cookies.jwt;
	user.findOne({ where: { refreshToken } }).then((currentUser) => {
		res.json(currentUser);
	});
};

export const findAll = async (req, res) => {
	user
		.findAll({
			attributes: [
				"username",
				"first_name",
				"last_name",
				"email",
				"profile_pic",
			],
		})
		.then((users) => {
			res.json(users);
		})
		.catch((err) => console.log(err));

	// res.send("User coming soon.");
};
export const getUserInfoById = async (req, res) => {
	const { id } = req.body;
	if (id) {
		user
			.findAll({
				where: { id: id },
				attributes: [
					"username",
					"first_name",
					"last_name",
					"email",
					"profile_pic",
					"uuid",
				],
			})
			.then((users) => {
				res.json(users);
			})
			.catch((err) => console.log(err));
	}

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
		//SEND REGISTRATION EMAIL
		const { first_name, last_name, username, email } = user1.dataValues;
		await mailer
			.sendMail({
				from: '"Trickedex" <torquetricking@gmail.com>',
				to: `${email}`,
				subject: `Welcome to the Trickedex, ${username}`,
				text: "Thanks for signing up. Your account is ready.",
				html: `<html>
			<body style="color: '#d4d4d8';text-align:center;">
			<h1>Welcome, <span style="color:#4f4f46;">${first_name} ${last_name}</span> Thank You for Signing Up to the</h1>
			<a href="trickedex.app"><img style="height: fit; width: fit;" src="https://trickedex.app/TrickedexLogo.png" /></a>
				<h3 style="text-size: ">We are excited to have you! Once you login you will be able to access the Dashboard and many of it's hidden features!<a style="color:#4f4622;" href='trickedex.app/dash'><h2>Go to The Dash Now</h2></a><br/> <h2>Enjoy!</h2></h3>
				</html>`,
			})
			.catch((err) => console.log(err));
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
								{ expiresIn: "12hr" }
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

export const updateUserInfo = async (req, res) => {
	const { email, username, password, first_name, last_name } = await req.body;
	//Check username and password exists
	console.log("Attemting to Update");
	if (!email || !password) {
		console.log(username, password);
		return res.status(400).json({ message: "Username && Password Required" });
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
							selectedUser.update({ username });
							selectedUser.update({ first_name });
							selectedUser.update({ last_name });

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
								message: "You updated your info!",
								username: selectedUser.username,
							});
						} else {
							res.status(401).json({ message: "Password Not Valid" });
						}
					})
					.catch((err) => console.log(err));
			});
	} else {
		res.status(400).json({ message: "Try logging back in" });
	}
};
export const updateProfilePic = async (req, res) => {
	const { uuid } = await req.body;
	const pp = req.files.file;
	pp.name = pp.name.replace(/\s/g, "");
	//local path for testing
	const serverPathName = path.join(
		__dirname,
		"..",
		"..",
		"frontend",
		"public",
		"images",
		`${uuid}`,
		`${pp.name}`
	);
	const serverPathFolderName = path.join(
		__dirname,
		"..",
		"..",
		"frontend",
		"public",
		"images",
		`${uuid}`
	);
	//Production Path
	//  const serverPathName = path.join(
	//  	"/",
	//  	"var",
	//  	"www",
	//  	"trickedex.app",
	//  	"html",
	//  	"images",
	//  	`${uuid}`,
	//  	`${pp.name}`
	//  );
	//  const serverPathFolderName = path.join(
	//  	"/",
	//  	"var",
	//  	"www",
	//  	"trickedex.app",
	//  	"html",
	//  	"images",
	//  	`${uuid}`,
	//  );

	console.log(serverPathName);
	if (pp === null) {
		return res.status(400).json({ message: "No File Found" });
	}
	console.log("Attemting to UpdateProfilePic");
	if (!uuid) {
		console.log(uuid);
		return res.status(400).json({ message: "UUID NEEDED" });
	}
	//selects user from db
	const selectedUser = await user.findOne({ where: { uuid: uuid } });

	if (selectedUser && pp) {
		res.status(200).json({
			message: `USER FOUND & ${pp.name} Received `,
			fileName: pp.name,
			filePath: `/images/${uuid}/${pp.name}`,
		});
	} else {
		res.status(400).json({ message: "Try logging back in" });
	}
	console.log();
	if (!fs.existsSync(serverPathFolderName)) {
		fs.mkdirSync(serverPathFolderName, { recursive: true });
	}
	if (fs.existsSync(serverPathName)) {
		selectedUser.update({ profilePic: pp.name });
		return res.status(200).json({
			message: `Profile Picture Switched to ${pp.name} `,
			fileName: pp.name,
			filePath: `/images/${uuid}/${pp.name}`,
		});
	}

	try {
		pp.mv(serverPathName, (err) => {
			selectedUser.update({ profilePic: pp.name });

			if (err) {
				return console.log(err);
			} else {
			}
		});
		//Check username and password exists
	} catch (err) {
		console.log(err);
	}
};
