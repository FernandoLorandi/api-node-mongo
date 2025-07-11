import invalidRequest from "../error/invalidRequest.js";

async function pagination(req, res, next) {
    try {
        let {limit = 5, page = 1, orderBy = "_id:-1"} = req.query

        let [position, order] = orderBy.split(":")

        limit = parseInt(limit);
        page = parseInt(page);
        order = parseInt(order);

        const result = req.result;

        if (limit > 0 && page > 0) {
            const resultPagination = await result.find()
                .sort({[position]: order})
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            res.status(200).json(resultPagination);
        } else {
            next(new invalidRequest());
        }
    } catch (err) {
        next(err);
    }
}

export default pagination;