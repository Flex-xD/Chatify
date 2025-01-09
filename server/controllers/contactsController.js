import User from "../models/User.js";
export const searchContact = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required !" })
        }
        const sanitizedSearchTerm = searchTerm.replace(
            /[.*=${}()|[\]\\]/g,
            "\\$&"
        )
        const regex = new RegExp(sanitizedSearchTerm, "i");
        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [
                        { firstName: regex },
                        { lastName: regex },
                        { email: regex }
                    ]
                }
            ]
        });
        console.log({ contacts })
        return res.status(200).json({ contacts });
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ message: error.message });
    }
}
