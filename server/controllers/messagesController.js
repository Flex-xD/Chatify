import Message from "../models/Message.js";
export const getMessage = async (req, res) => {
    try {
        const userOne = req.userId;
        const userTwo = req.body.id;
        if (!userOne || !userTwo) {
            return res.status(400).json({ message: "Both User Id's are required !" })
        }

        const messages = await Message.find({
            $or : [
                {sender:userOne , recipient:userTwo} , {sender:userTwo , recipient:userOne}
            ]
        }).sort({timestamp:1});
        return res.status(200).json({ messages });
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ message: error.message });
    }
}
