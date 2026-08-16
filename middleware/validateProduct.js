// Custom middleware: validates request body before it reaches the controller
// Used on POST (full validation) and PUT (partial validation, only checks provided fields)

const validateProductBody = (isUpdate = false) => {
  return (req, res, next) => {
    const { name, price, description, category, inStock } = req.body;
    const errors = [];

    if (!isUpdate) {
      // POST: name and price are mandatory
      if (name === undefined) errors.push("name is required");
      if (price === undefined) errors.push("price is required");
    }

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 2) {
        errors.push("name must be a string with at least 2 characters");
      }
    }

    if (price !== undefined) {
      if (typeof price !== "number" || Number.isNaN(price)) {
        errors.push("price must be a number");
      } else if (price < 0) {
        errors.push("price cannot be negative");
      }
    }

    if (description !== undefined && typeof description !== "string") {
      errors.push("description must be a string");
    }

    if (category !== undefined && typeof category !== "string") {
      errors.push("category must be a string");
    }

    if (inStock !== undefined && typeof inStock !== "boolean") {
      errors.push("inStock must be a boolean");
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
};

module.exports = validateProductBody;
