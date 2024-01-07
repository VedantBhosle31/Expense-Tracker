const { PrismaClient } = require("@prisma/client");
var express = require("express");
var router = express.Router();

let prisma = new PrismaClient();

// router.get('/', async (req, res) => {
//     try {
//     } catch (error) {
//         console.log(error)

//     }
// })
//GetAllUserInAGroup
router.get("/GetAllUserInAGroup", async (req, res) => {
  try {
    let id = req.body.id;
    let user = await prisma.group.findMany({
      where: {
        id: id,
      },
      include: {
        User: true,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

//GetAllTrancationsForAGroup
router.get("/GetAllTrancationsForAGroup", async (req, res) => {
  try {
    let id = req.body.id;
    let Transactions = await prisma.transaction.findMany({
      where: {
        groupId: id,
      },
    });
    res.json(Transactions);
  } catch (error) {
    console.log(error);
  }
});

//GetAllGroups
router.get("/GetAllGroups", async (req, res) => {
  try {
    let groups = await prisma.group.findMany();
    res.json(groups);
  } catch (error) {
    console.log(error);
  }
});

//AddGroup
router.post("/AddGroup", async (req, res) => {
  try {
    let groupName = req.body.groupName;
    let userIds = res.body.userId;
    const createdGroup = await prisma.group.create({
      data: {
        groupName: groupName,
        users: {
          connect: userIds.map((userId) => ({ id: userId })),
        },
      },
      include: {
        users: true, // Optional: Include the associated users in the response
      },
    });
    res.json(createdGroup);
  } catch (error) {
    console.log(error);
  }
});

//UpdateGroup
router.put("/UpdateGroup", async (req, res) => {
  try {
    let groupId = req.body.groupId;
    let groupName = res.body.groupName;

    let group = await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        // name: groupName
      },
    });
    res.json(group);
  } catch (error) {
    console.log(error);
  }
});

//DeleteUserFromGroup
router.put("/DeleteUserFromGroup", async (req, res) => {
  try {
    let groupId = req.body.groupId;
    let userId = res.body.userId;
    let user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        Groups: {
          disconnect: {
            id: groupId,
          },
        },
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});
//DeleteGroup
router.delete("/DeleteGroup", async (req, res) => {
  try {
    let groupId = req.body.groupId;
    let DeletedGroup = await prisma.group.delete({
      where: {
        id: groupId,
      },
    });
    res.json(DeletedGroup);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
