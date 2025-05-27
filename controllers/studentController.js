// Assign group + section to a student

const Student = require("../models/User");
const Module = require("../models/Module");
const Mark = require("../models/Mark");

exports.assignGroupAndSection = async (req, res) => {
  try {
    const { matricule_id, group, section } = req.body;

    const student = await Student.findOne({ matricule_id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.group = group;
    student.section = section;
    await student.save();

    res
      .status(200)
      .json({ message: "Group and section assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error assigning group and section" });
  }
};

// Assign modules to a student
exports.assignModulesToStudent = async (req, res) => {
  try {
    const { studentId, moduleIds } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const modules = await Module.find({ _id: { $in: moduleIds } });
    if (modules.length !== moduleIds.length) {
      return res.status(404).json({ message: "One or more modules not found" });
    }
    for (const module of modules) {
      student.enrolledModules.push(module._id.valueOf());
    }
    await student.save();
    res
      .status(200)
      .json({ message: "Modules assigned to student successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error assigning modules to student" });
  }
};

// Get marks for a student
exports.getMarks = async (req, res) => {
  try {
    const studentId = req.user._id.valueOf();
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const marks = await Mark.find({ studentId }).populate("moduleId");
    res.status(200).json({ marks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting marks" });
  }
};

// GET ALL STUDENTS
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({
      role: "student",
    }).select("name");
    res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting all students" });
  }
};

// Calculate average mark for a student
exports.calculateAverageMark = async (req, res) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const marks = await Mark.find({ studentId }).populate({
      path: "moduleId",
      select: "code",
    });
    let xmlModule = [];
    let dawModule = [];
    let securityModule = [];
    let projectModule = [];
    let startupModule = [];
    let redactionModule = [];
    let intelligenceModule = [];

    console.log(marks);

    marks.forEach((mark) => {
      if (mark.moduleId.code === "XML_01") {
        xmlModule.push(mark);
      } else if (mark.moduleId.code === "DAW_01") {
        dawModule.push(mark);
      } else if (mark.moduleId.code === "SE_01") {
        securityModule.push(mark);
      } else if (mark.moduleId.code === "PR_01") {
        projectModule.push(mark);
      } else if (mark.moduleId.code === "SU_01") {
        startupModule.push(mark);
      } else if (mark.moduleId.code === "RS_01") {
        redactionModule.push(mark);
      } else if (mark.moduleId.code === "AI_01") {
        intelligenceModule.push(mark);
      }
    });

    // TD * 0.4 + EXAM * 0.6
    let averageMark = 0;
    if (xmlModule.length > 0) {
      let xmlMark = 0;
      for (const mark of xmlModule) {
        if (mark.markType === "td") {
          xmlMark += mark.mark * 0.4;
        } else if (mark.markType === "exam") {
          xmlMark += mark.mark * 0.6;
        }
      }
      averageMark += xmlMark * 3;
      console.log(`moyenne in xml: ${averageMark}`);
    }

    if (dawModule.length > 0) {
      let dawMark = 0;
      for (const mark of dawModule) {
        if (mark.markType === "td") {
          dawMark += mark.mark * 0.4;
        } else if (mark.markType === "exam") {
          dawMark += mark.mark * 0.6;
        }
      }
      averageMark += dawMark * 3;
      console.log(`moyenne in daw: ${averageMark}`);
    }

    if (securityModule.length > 0) {
      let securityMark = 0;
      for (const mark of securityModule) {
        if (mark.markType === "td") {
          securityMark += mark.mark * 0.4;
        } else if (mark.markType === "exam") {
          securityMark += mark.mark * 0.6;
        }
      }
      averageMark += securityMark * 3;
      console.log(`moyenne in security: ${averageMark}`);
    }
    if (projectModule.length > 0) {
      let projectMark = 0;
      for (const mark of projectModule) {
        if (mark.markType === "td") {
          projectMark += mark.mark * 0.4;
        } else if (mark.markType === "exam") {
          projectMark += mark.mark * 0.6;
        }
      }
      averageMark += projectMark * 3;
      console.log(`moyenne in project: ${averageMark}`);
    }

    if (startupModule.length > 0) {
      let startupMark = 0;
      for (const mark of startupModule) {
        if (mark.markType === "td") {
          startupMark += mark.mark * 0.4;
        } else if (mark.markType === "exam") {
          startupMark += mark.mark * 0.6;
        }
      }
      averageMark += startupMark;
      console.log(`moyenne in startup: ${averageMark}`);
    }

    if (redactionModule.length > 0) {
      let redactionMark = 0;
      for (const mark of redactionModule) {
        if (mark.markType === "td") {
          redactionMark += mark.mark * 0.4;
        } else if (mark.markType === "exam") {
          redactionMark += mark.mark * 0.6;
        }
        averageMark += redactionMark;
        console.log(`moyenne in redaction: ${averageMark}`);
      }
    }

    if (intelligenceModule.length > 0) {
      let intelligenceMark = 0;
      for (const mark of intelligenceModule) {
        if (mark.markType === "td") {
          intelligenceMark += mark.mark * 0.4;
        } else if (mark.markType === "exam") {
          intelligenceMark += mark.mark * 0.6;
        }
      }
      averageMark += intelligenceMark * 3;
    }
    averageMark = averageMark / 17;
    student.averageMark = averageMark;
    await student.save();
    res.status(200).json({ averageMark });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error calculating average mark" });
  }
};
