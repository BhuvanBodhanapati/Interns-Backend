import express from "express";
import Certification from "../../models/certification.js";

const router = express.Router();

router.get("/single-certification/:id", async (req, res) => {
  const certification = await Certification.findOne({
    _id: req.params.id,
  });
  res.status(200).send(certification);
});

router.post("/student-certifications", async (req, res) => {
  const certification = await Certification.find({
    studentId: req.body.id,
  });
  if (!certification) return res.status(400).send("invalid Id");
  res.status(200).send(certification);
});

router.post("/all-certifications", async (req, res) => {

  var filterCertificationsDetails = {};

  if (req.body.rollno) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      "studentDetails.rollno": {
        $regex: new RegExp(req.body.rollno, "i"),
      },
    };
  }

  if (req.body.year !== "All" && req.body.year) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      "studentDetails.year": req.body.year,
    };
  }

  if (req.body.branch !== "All" && req.body.branch) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      "studentDetails.branch": req.body.branch,
    };
  }

  if (req.body.section !== "All" && req.body.section) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      "studentDetails.section": req.body.section,
    };
  }

  if (req.body.studentName) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      "studentDetails.studentName": {
        $regex: new RegExp(req.body.studentName, "i"),
      },
    };
  }

  if (req.body.status !== "All" && req.body.status) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      status: req.body.status,
    };
  }

  if (req.body.certificationName) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      certificationName: { $regex: new RegExp(req.body.certificationName, "i") },
    };
  }

  if (req.body.organizationName) {
    filterCertificationsDetails = {
      ...filterCertificationsDetails,
      organizationName: { $regex: new RegExp(req.body.organizationName, "i") },
    };
  } 
  var size = req.body.size;
  var total = await Certification.count(filterCertificationsDetails);

  var pages = Math.ceil(total / size);

  var pageNumber = req.body.page;
  var startFrom = (pageNumber - 1) * size;
  console.log(size, pageNumber, startFrom)

  const certification = await Certification.find(filterCertificationsDetails)
    .sort({ organizationName: 1 })
    .skip(startFrom)
    .limit(size);
  if (!certification) return res.status(400).send("invalid Id");
  res.status(200).send({ count: total, certificationDetails: certification });
});

export default router;
