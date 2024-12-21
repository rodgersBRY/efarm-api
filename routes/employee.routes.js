const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);

router.post("/new", employeeController.addEmployee);

router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
