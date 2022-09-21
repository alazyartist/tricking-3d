import db from "../models/index.js";
import bcrypt from "bcrypt";
const user = await db.sequelize.models.Users;
const trick = await db.sequelize.models.Tricks;
import env from "dotenv";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { mailer } from "../middleware/nodemailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
env.config();
// db.sequelize.models.Tricks.associate(db.sequelize.models);
user.associate(db.sequelize.models);

export const getUserInfo = async (req, res) => {
	console.log("hit userInfo");
	const refreshToken = req.cookies.jwt;
	if (!req.cookies.jwt) return res.send("You aint got no cookies.");
	console.log(user.associations);
	try {
		user
			.findOne({
				where: { refreshToken },
				attributes: {
					exclude: ["password", "deletedAt", "refreshToken", "createdAt"],
				},
				include: [
					{
						model: db.sequelize.models.Tricks,
						as: "TricksClaimed",
						through: { attributes: [] },
					},
					{
						model: db.sequelize.models.Combo,
						as: "CombosClaimed",
						through: { attributes: [] },
					},
					{
						model: db.sequelize.models.Tricklist,
						as: "Tricklists",
						through: { attributes: [] },
					},
					{
						model: db.sequelize.models.Tricklist,
						as: "MyTricklists",
						include: [
							{
								model: db.sequelize.models.Users,
								as: "Owner",
								attributes: ["username"],
							},
						],
					},
					{
						model: db.sequelize.models.Users,
						as: "CapturedMe",
						through: { attributes: [] },
						attributes: {
							exclude: [
								"password",
								"refreshToken",
								"createdAt",
								"updatedAt",
								"deletedAt",
							],
						},
					},
					{
						model: db.sequelize.models.Users,
						as: "Captured",
						through: { attributes: [] },
						attributes: {
							exclude: [
								"password",
								"refreshToken",
								"createdAt",
								"updatedAt",
								"deletedAt",
							],
						},
					},
					{
						model: db.sequelize.models.Profile,
						attributes: {
							exclude: ["user_id", "createdAt", "updatedAt", "id"],
						},
					},
				],
			})
			.then((currentUser) => {
				// console.log(currentUser);
				res.json(currentUser);
			})
			.catch((err) => console.log(err));
	} catch (err) {
		console.log(err);
		res.json({ error: err });
	}
};
export const getUserInfoByUUID = async (req, res) => {
	console.log("hit userInfo by uuid");
	const uuid = req.params.uuid;

	try {
		user
			.findOne({
				where: { uuid },
				attributes: {
					exclude: ["password", "deletedAt", "refreshToken", "createdAt"],
				},
				include: [
					{
						model: db.sequelize.models.Tricks,
						as: "TricksClaimed",
						through: { attributes: [] },
					},
					{
						model: db.sequelize.models.Combo,
						as: "CombosClaimed",
						through: { attributes: [] },
						include: { model: db.sequelize.models.Animations },
					},
					{
						model: db.sequelize.models.Tricklist,
						as: "Tricklists",
						through: { attributes: [] },
					},
					{
						model: db.sequelize.models.Tricklist,
						as: "MyTricklists",
						include: [
							{
								model: db.sequelize.models.Users,
								as: "Owner",
								attributes: ["username"],
							},
						],
					},
					{
						model: db.sequelize.models.Users,
						as: "CapturedMe",
						through: { attributes: [] },
						attributes: {
							exclude: [
								"password",
								"refreshToken",
								"createdAt",
								"updatedAt",
								"deletedAt",
								"id",
							],
						},
					},
					{
						model: db.sequelize.models.Profile,
						attributes: {
							exclude: ["id", "user_id", "createdAt", "updatedAt", "deletedAt"],
						},
					},
					{
						model: db.sequelize.models.Users,
						as: "Captured",
						through: { attributes: [] },
						attributes: {
							exclude: [
								"password",
								"refreshToken",
								"createdAt",
								"updatedAt",
								"deletedAt",
								"id",
							],
						},
					},
					{
						model: db.sequelize.models.Profile,
						attributes: {
							exclude: ["user_id", "createdAt", "updatedAt", "id"],
						},
					},
				],
			})
			.then((currentUser) => {
				// console.log(currentUser);
				res.json(currentUser);
			})
			.catch((err) => console.log(err));
	} catch (err) {
		console.log(err);
		res.json({ error: err });
	}
};

export const findAll = async (req, res) => {
	user
		.findAll({
			attributes: [
				"username",
				"first_name",
				"last_name",
				"email",
				"profilePic",
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
		try {
			user
				.findAll({
					where: { id: id },
					attributes: [
						"username",
						"first_name",
						"last_name",
						"email",
						"profilePic",
						"uuid",
					],
				})
				.then((users) => {
					res.json(users);
				})
				.catch((err) => console.log(err));
		} catch (err) {
			console.log(err);
		}
	} else {
		res.send("User has no ID.");
	}
};

export const findOrCreate = async (req, res) => {
	const hash = await bcrypt.hash(req.body.password.toString(), 10);
	user
		.findOrCreate({
			where: {
				username: req.body.username,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: hash,
			},
		})
		.then((data) => {
			return data[0];
		})
		.then((data) => {
			console.log(data);
			const { first_name, last_name, username, email } = data.dataValues;
			mailer.sendMail({
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
			});
		})
		.then(() => {
			res.status(201).send("Successfully Registered New User");
		})
		.catch((err) => {
			if (err) {
				console.log(err);
				res
					.status(401)
					.json({ error: err, message: "Not Able To Create User, Try Again" });
			}
		});
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
							console.log("LoggedIn");
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
	const user_id = await req.params.user_id;
	const username = req.body.username;
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(400);
	const token = authHeader.split(" ")[1];

	if (req.cookies) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
			if (err) return res.sendStatus(401);
			if (decoded?.username) {
				const selectedUser = await user.findOne({
					where: { username: decoded.username },
				});
				if (selectedUser.dataValues.uuid === user_id) {
					console.log("GONNA DELETE THIS SHIT");
					selectedUser
						.destroy()
						.then((deleted) => {
							if (deleted >= 1) {
								res.status(201).send("Deleted User");
							}
							if (deleted === 0) {
								res.status(200).send("User Already Deleted");
							}
						})
						.catch((err) => res.status(400).send(err));
				}
			}
			console.log(decoded.username, user_id);
		});
	}
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
	// const serverPathName = path.join(
	// 	__dirname,
	// 	"..",
	// 	"..",
	// 	"frontend",
	// 	"public",
	// 	"images",
	// 	`${uuid}`,
	// 	`${pp.name}`
	// );
	// const serverPathFolderName = path.join(
	// 	__dirname,
	// 	"..",
	// 	"..",
	// 	"frontend",
	// 	"public",
	// 	"images",
	// 	`${uuid}`
	// );
	//Production Path

	const serverPathName = path.join(
		"/",
		"var",
		"www",
		"trickedex.app",
		"html",
		"images",
		`${uuid}`,
		`${pp.name}`
	);
	const serverPathFolderName = path.join(
		"/",
		"var",
		"www",
		"trickedex.app",
		"html",
		"images",
		`${uuid}`
	);

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

export const changeUserPassword = async (req, res) => {
	const { user_id } = await req.params;
	const passwords = await req.body;
	//Check username and password exists
	console.log("Attemting to Change Password");
	if ((req.body && !passwords?.oldPassword) || !passwords?.newPassword) {
		console.log(passwords?.oldPassword, passwords?.newPassword);
		return res.status(400).json({ message: "Old & New Passwords Required" });
	}
	//selects user from db
	const selectedUser = await user.findOne({ where: { uuid: user_id } });
	const hash = await bcrypt.hash(passwords.newPassword.toString(), 10);
	if (selectedUser) {
		Promise.resolve(selectedUser)
			.then((u) => u.dataValues.password)
			.catch((err) => res.send(err))
			.then((pass) => {
				bcrypt
					.compare(passwords.oldPassword, pass)
					.then((match) => {
						if (match) {
							selectedUser.update({ password: hash });
							res
								.status(200)
								.json({ message: "Password Successfully Changed" });
						} else {
							res.status(401).json({ message: "oldPassword Not Valid" });
						}
					})
					.catch((err) => console.log(err));
			});
	} else {
		res.status(400).json({ message: "Try logging back in" });
	}
};
