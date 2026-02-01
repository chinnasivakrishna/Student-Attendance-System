package com.example.attendence.Controller;

import com.example.attendence.Model.Teacher;
import com.example.attendence.Service.TeacherService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/register")
    public ResponseEntity<Teacher> registerTeacher(@RequestBody Teacher teacher) {
        Teacher registeredTeacher = teacherService.registerTeacher(teacher);
        return ResponseEntity.ok(registeredTeacher);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Teacher teacher = teacherService.findByEmail(email);
        if (teacher != null && teacher.getPassword().equals(password)) {
            // You can customize the response as needed, e.g., return teacher details
            Map<String, Object> responseBody = new HashMap<>();
            // Add any other data you want to send to the client
            responseBody.put("name", teacher.getName());
            responseBody.put("subject", teacher.getSubject());
            responseBody.put("category", teacher.getCategory());

            return ResponseEntity.ok().body(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<Teacher>> fetchAllTeachers() {
        List<Teacher> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @DeleteMapping("/delete")
    public void deleteTeachersByIds(@RequestBody List<Long> teacherIds) {
        teacherService.deleteTeachersByIds(teacherIds);
    }
}
