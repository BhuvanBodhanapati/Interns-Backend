import express from "express";
import Work from "../../models/work.js";

const router = express.Router();

router.get("/single-work/:id", async (req, res) => {
    const work = await Work.findOne({
        _id: req.params.id,
    });
    res.status(200).send(work);
});

router.post("/student-works", async (req, res) => {
  const work = await Work.find({
    studentId: req.body.id,
  });
  if (!work) return res.status(400).send("invalid Id");
  res.status(200).send(work);
});

router.post("/all-works", async (req, res) => {
  var size = req.body.size;

  var filterWorkDetails = {}

  if (req.body.rollno){
    filterWorkDetails = {
      ...filterWorkDetails,
      "studentDetails.rollno": {
        $regex: new RegExp(req.body.rollno, "i"),
      },
    };
  }

  if (req.body.year !== "All" && req.body.year) {
    filterWorkDetails = {
      ...filterWorkDetails,
      "studentDetails.year": req.body.year,
    };
  }

  if (req.body.branch !== "All" && req.body.branch) {
    filterWorkDetails = {
      ...filterWorkDetails,
      "studentDetails.branch": req.body.branch,
    };
  }
  
  if (req.body.section !== "All" && req.body.section) {
    filterWorkDetails = {
      ...filterWorkDetails,
      "studentDetails.section": req.body.section,
    };
  }

  if (req.body.studentName) {
    filterWorkDetails = {
      ...filterWorkDetails,
      "studentDetails.studentName": {
        $regex: new RegExp(req.body.studentName, "i"),
      }
    };
  }

  if (req.body.status !== "All" && req.body.status) {
    filterWorkDetails = {
      ...filterWorkDetails,
      status: req.body.status,
    };
  }

  if (req.body.domain) {
    filterWorkDetails = {
      ...filterWorkDetails,
      domain: { $regex: new RegExp(req.body.domain, "i") },
    };
  }

  if (req.body.companyName){
    var companyName = req.body.companyName;
     filterWorkDetails = {
       ...filterWorkDetails,
       companyName: { $regex: new RegExp(companyName, "i") },
     };
  }
//  console.log(filterWorkDetails);
  var total = await Work.count(filterWorkDetails);
  // console.log(size, total);
  
  var pages = Math.ceil(total / size);
  
  var pageNumber = req.body.page;
  
  var startFrom = (pageNumber -1) * size;
  
  const work = await Work.find(filterWorkDetails)
    .sort({ companyName: 1 })
    .skip(startFrom)
    .limit(size);
    
  if (!work) return res.status(400).send("invalid Id");
  res.status(200).send({ count: total, workDetails: work });
});

export default router;
