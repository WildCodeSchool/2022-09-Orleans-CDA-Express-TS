import type { Controller } from "../types/Controller";

import { dataSource } from "../utils";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";
import { Grade } from "../entity/Grade";

const controller: Controller = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Created wilder");
    } catch (error) {
      console.log(error);
      res.send("Error while creating wilder");
    }
  },
  read: async (req, res) => {
    try {
      const grades = await dataSource.getRepository(Grade).find();
      console.log(grades);
      const wilders = await dataSource.getRepository(Wilder).find();
      console.log("wilders", wilders);
      const data = wilders.map((wilder) => {
        const wilderGrades = grades.filter(
          (grade) => grade.wilder.id === wilder.id
        );
        const wilderGradesLean = wilderGrades.map((el) => {
          return { title: el.skill.name, votes: el.grade };
        });
        const result = {
          ...wilder,
          skills: wilderGradesLean,
        };
        console.log(result);
        return result;
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send("error while querying wilders");
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.body);
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.send("error while deleting wilder");
    }
  },
  update: async (req, res) => {
    try {
      await dataSource
        .getRepository(Wilder)
        .update(req.body.id, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.send("error while updating wilder");
    }
  },
  addSkill: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilderName });
      console.log(wilderToUpdate);
      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skillName });

      if (wilderToUpdate !== null && skillToAdd !== null) {
        wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
        await dataSource.getRepository(Wilder).save(wilderToUpdate);
        res.send("Skill added to wilder");
      } else {
        res.send("Skill or wilder not found");
      }
    } catch (err) {
      console.log(err);
      res.send("error while adding skill to wilder");
    }
  },
};

export default controller;
