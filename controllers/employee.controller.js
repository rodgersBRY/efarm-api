const Employee = require("../models/employee.model");

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json({ employees: employees });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  const idNo = req.params.id;

  try {
    const employee = await Employee.findOne({ idNo: idNo });

    if (!employee) throwError("Employee does not exist", 404);

    return res.status(200).json({ result: employee });
  } catch (err) {
    next(err);
  }
};

exports.addEmployee = async (req, res, next) => {
  const { name, idNo, status, phone } = req.body;

  try {
    const employeeExists = await Employee.findOne({ idNo: idNo });

    if (employeeExists) throwError("Employee with that id number exists", 409);

    const newEmployee = new Employee({
      name: name,
      idNo: idNo,
      active: status || false,
      phoneNumber: phone,
    });

    const result = await newEmployee.save();

    return res.status(201).json({ message: "success", result });
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const idNo = req.params.id;

  try {
    const employee = await Employee.findOneAndDelete({ idNo: idNo });

    if (!employee) throwError("that id number does not exist", 404);

    return res.status(204).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

const throwError = function (errorText, errorCode) {
  const error = new Error(errorText);
  error.status = errorCode;
  throw error;
};
