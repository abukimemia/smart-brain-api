const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select("*")
      .from("users")
      .where({
        id: id,
      })
      .then((user) => {
        console.log(user);
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("Sorry pal, They missing");
        }
      })
      .catch((err) => res.status(400).json("OOPPS...Something went wrong!"));
}

module.exports = {
    handleProfileGet: handleProfileGet
}