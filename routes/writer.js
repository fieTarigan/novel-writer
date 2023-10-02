const writerRouter = require("express").Router();
const { Novel, NovelWriter, Writer } = require("../models");

writerRouter.get("/", async (req, res) => {
  try {
    const writers = await Writer.findAll({
      include: [
        {
          model: Novel,
          attributes: ["title"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.render("../views/writer.ejs", { result: writers });
  } catch (error) {
    res.json(error);
  }
});

writerRouter.get("/add", async (req, res) => {
  try {
    let novels = await Novel.findAll({
      attributes: ["id", "title"],
    });

    res.render("../views/writerCreate.ejs", { result: novels });
  } catch (error) {
    res.json(error);
  }
});

writerRouter.post("/add", async (req, res) => {
  try {
    const { name, image, age, birthTown } = req.body;

    const listNovel = Object.keys(req.body).filter((key) => key.includes("novel"));

    const writer = await Writer.create({
      name: name,
      image: image,
      age: Number(age),
      birthTown: birthTown,
    });

    if (listNovel.length !== 0) {
      const novelWriters = listNovel.map((id) => { 
        return { novelId: Number(id.slice(-1)), writerId: Number(writer.id) };
      });

      await NovelWriter.bulkCreate(novelWriters);
    }

    res.redirect("/writers");
  } catch (error) {
    res.json(error);
  }
});

writerRouter.get("/delete/:id", async (req, res) => {
  try {
    await Writer.destroy({
      where: {
        id: Number(req.params.id),
      },
    });

    await NovelWriter.destroy({
      where: {
        writerId: Number(req.params.id),
      },
    });

    res.redirect("/writers");
  } catch (error) {
    res.json(error);
  }
});

writerRouter.get("/update/:id", async (req, res) => {
  try {
    const writer = await Writer.findAll({
      attributes: ["id"],
      where: {
        id: Number(req.params.id),
      },
    });

    let novels = await Novel.findAll({
      attributes: ["id", "title"],
    });

    res.render("../views/writerEdit.ejs", { result1: writer[0], result2: novels });
  } catch (error) {
    res.json(error);
  }
});

writerRouter.post("/update/:id", async (req, res) => {
  try {
    let { name, image, age, birthTown } = req.body;

    const listNovel = Object.keys(req.body).filter((key) => key.includes("novel"));

    let oldWriter = await Writer.findAll({
      where: {
        id: Number(req.params.id),
      },
    });

    name = (name === "") ? oldWriter[0].name : name;
    image = (image === "") ? oldWriter[0].image : image;
    age = (age === "") ? oldWriter[0].age : age;
    birthTown = (birthTown === "") ? oldWriter[0].birthTown : birthTown;
    
    await Writer.update({
      name: name,
      image: image,
      age: Number(age),
      birthTown: birthTown,
    },
    {
      where: {
        id: Number(req.params.id),
      },
    });

    if (listNovel.length !== 0) {
      await NovelWriter.destroy({
        where: {
          writerId: Number(req.params.id),
        },
      });
      
      const novelWriters = listNovel.map((id) => { 
        return { novelId: Number(id.slice(-1)), writerId: Number(req.params.id) };
      });

      await NovelWriter.bulkCreate(novelWriters);
    }

    res.redirect("/writers");
  } catch (error) {
    res.json(error);
  }
});

module.exports = writerRouter;