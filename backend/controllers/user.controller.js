import { User } from "../models/Users.js";
import db from "../models/index.js";
const user = await User(db.sequelize);
import bcrypt, { hash } from "bcrypt";
export const findAll = async (req, res) => {
	user
		.findAll()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => console.log(err));

	// res.send("User coming soon.");
};

export const findOrCreate = async (req, res) => {
	bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
		user
			.findOrCreate({
				where: {
					user_name: req.body.user_name,
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: hash,
				},
			})
			.then((res) => {
				res.send("You Created :" + req.body.user_name);
			})
			.catch((err) => res.send(err));
	});
};

export const checkPassword = async (req, res) => {
	let userPassword = await req.body.password;
	console.log(userPassword);
	const selectedUser = await user.findOne({ where: { email: req.body.email } });

	if (selectedUser) {
		Promise.resolve(selectedUser)
			.then((u) => u.dataValues.password)
			.catch((err) => res.send(err))
			.then((pass) => {
				bcrypt
					.compare(userPassword, pass)
					.then((bool) => console.log(bool))
					.catch((err) => console.log(err));
			})
			.then(() => {
				res.send(`Selected User ${req.body.email}`);
			});
	} else {
		res.send("Select Valid User");
	}
	console.log(selectedUser);
};

export const deleteUser = async (req, res) => {
	let id = req.body.id;
	user
		.destroy({ where: { id: id } })
		.then((u) => u.destroy())
		.then(() => {
			res.send(`Deleted User: ${id}`);
		})
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => res.send(err));
};
