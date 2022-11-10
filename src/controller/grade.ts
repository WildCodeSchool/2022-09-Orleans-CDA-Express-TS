import { dataSource } from "../utils";
import { Grade } from "../entity/Grade";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";
import { Controller } from "../types/Controller";

const controller: Controller = {
  read: async (req, res) => {
    try {
      const gradesFromDB = await dataSource.getRepository(Grade).find();
      res.send(gradesFromDB);
    } catch (error) {
      console.log(error);
      res.send("Error while reading grades");
    }
  },
  create: async (req, res) => {
    try {
      const wilderFromDB = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilder });
      console.log("Wilder from DB", wilderFromDB);

      const skillFromDB = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skill });
      console.log("Skill from DB", skillFromDB);

      const grade = new Grade();
      grade.grade = req.body.grade;
      if (wilderFromDB !== null && skillFromDB !== null) {
        grade.wilder = wilderFromDB;
        grade.skill = skillFromDB;

        await dataSource.getRepository(Grade).save(grade);
        res.send("Created Grade");
      } else {
        res.send("Wilder or Skill not found");
      }
    } catch (error) {
      console.log(error);
      res.send("Error while creating grade");
    }
  },
};

export default controller;
