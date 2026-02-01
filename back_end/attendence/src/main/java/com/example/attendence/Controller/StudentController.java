package com.example.attendence.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.attendence.Model.Student;
import com.example.attendence.Model.Teacher;
import com.example.attendence.Service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        Student registeredStudent = studentService.registerStudent(student);
        return ResponseEntity.ok(registeredStudent);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Student student = studentService.findByEmail(email);
        if (student != null && student.getRegNo().equals(password)) {
            // You can customize the response as needed, e.g., return teacher details
            Map<String, Object> responseBody = new HashMap<>();
            // Add any other data you want to send to the client
            responseBody.put("name", student.getName());
            responseBody.put("regNo", student.getRegNo());

            return ResponseEntity.ok().body(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @GetMapping("/fetch")
    public ResponseEntity<?> fetchStudentsData() {
        List<Map<String, Object>> studentsData = studentService.fetchStudentsData();
        return ResponseEntity.ok(studentsData);
    }

    @DeleteMapping("/delete")
    public void deleteStudentsByIds(@RequestBody List<Long> studentIds) {
        studentService.deleteStudentsByIds(studentIds);
    }

    @PostMapping("/edit")
    public ResponseEntity<?> updateStudent(@RequestBody Student updatedStudent) {
        // Use StudentService to update the student record
        Student updated = studentService.updateStudent(updatedStudent);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Student not found with ID: " + updatedStudent.getId());
        }
    }

}