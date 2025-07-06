import notFound from "../error/notFound.js";

function handler404(req, res, next) {
    const error404 = new notFound();
    next(error404);
  }

export default handler404;