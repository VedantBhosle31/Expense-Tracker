var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//GetAllUsers
router.get("/GetAllUsers", async (req, res) => {
  try {
    let users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

//AddUser
router.post("/AddUser", async (req, res) => {
  try {
    let name = req.body.name;
    let user = await prisma.user.create({
      data: {
        name: name,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

//AddUserToGroup
router.post("AddUserToGroup", async (req, res) => {
  let groupId = req.body.groupId;
  let userId = res.body.userId;
  let group = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
});
//DeleteUser
router.delete("/DeleteUser", async (req, res) => {
  try {
    let userId = req.body.userId;
    let user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
