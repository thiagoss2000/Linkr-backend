import { searchUser } from "../repositories/usersRepository.js";

export async function search(req, res) {
    const { search } = req.body;
    try {
        const result = await searchUser(search);
        console.table(result.rows)
        return res.status(200).send(result.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}