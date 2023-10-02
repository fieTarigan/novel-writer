const novelRouter = require("express").Router();
const { Novel, NovelWriter, Writer } = require("../models");

novelRouter.get("/", async (req, res) => {
  try {
    const novels = await Novel.findAll({
      include: [
        {
          model: Writer,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.render("../views/novel.ejs", { result: novels });
  } catch (error) {
    res.json(error);
  }
});

novelRouter.get("/add", async (req, res) => {
  try {
    let writers = await Writer.findAll({
      attributes: ["id", "name"],
    });

    res.render("../views/novelCreate.ejs", { result: writers });
  } catch (error) {
    res.json(error);
  }
});

novelRouter.post("/add", async (req, res) => {
  try {
    const { title, image, price, stock } = req.body;

    const listWriter = Object.keys(req.body).filter((key) => key.includes("writer"));
    
    const novel = await Novel.create({
      title: title,
      image: image,
      price: Number(price),
      stock: Number(stock),
    });

    if (listWriter.length !== 0) {
      const novelWriters = listWriter.map((id) => { 
        return { novelId: Number(novel.id), writerId: Number(id.slice(-1)) };
      });

      await NovelWriter.bulkCreate(novelWriters);
    }

    res.redirect("/novels");
  } catch (error) {
    res.json(error);
  }
});

novelRouter.get("/delete/:id", async (req, res) => {
  try {
    await Novel.destroy({
      where: {
        id: Number(req.params.id),
      },
    });

    await NovelWriter.destroy({
      where: {
        novelId: Number(req.params.id),
      },
    });

    res.redirect("/novels");
  } catch (error) {
    res.json(error);
  }
});

novelRouter.get("/update/:id", async (req, res) => {
  try {
    const novel = await Novel.findAll({
      attributes: ["id"],
      where: {
        id: Number(req.params.id),
      },
    });

    let writers = await Writer.findAll({
      attributes: ["id", "name"],
    });

    res.render("../views/novelEdit.ejs", { result1: novel[0], result2: writers });
  } catch (error) {
    res.json(error);
  }
});

novelRouter.post("/update/:id", async (req, res) => {
  try {
    let { title, image, price, stock } = req.body;

    const listWriter = Object.keys(req.body).filter((key) => key.includes("writer"));

    let oldNovel = await Novel.findAll({
      where: {
        id: Number(req.params.id),
      },
    });

    title = (title === "") ? oldNovel[0].title : title;
    image = (image === "") ? oldNovel[0].image : image;
    price = (price === "") ? oldNovel[0].price : price;
    stock = (stock === "") ? oldNovel[0].stock : stock;
    
    await Novel.update({
      title: title,
      image: image,
      price: Number(price),
      stock: Number(stock),
    },
    {
      where: {
        id: Number(req.params.id),
      },
    });

    if (listWriter.length !== 0) {
      await NovelWriter.destroy({
        where: {
          novelId: Number(req.params.id),
        },
      });
      
      const novelWriters = listWriter.map((id) => { 
        return { novelId: Number(req.params.id), writerId: Number(id.slice(-1)) };
      });

      await NovelWriter.bulkCreate(novelWriters);
    }

    res.redirect("/novels");
  } catch (error) {
    res.json(error);
  }
});

module.exports = novelRouter;
