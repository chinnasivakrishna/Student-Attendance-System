package com.example.attendence.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.attendence.Model.Class;
import com.example.attendence.Model.UpdateClassRequest;
import com.example.attendence.Model.UpdateClassStatusRequest;
import com.example.attendence.Service.ClassService;

@RestController
@RequestMapping("/api/classes")
public class ClassController {
    @Autowired
    private ClassService classService;

    @PostMapping("/create")
    public ResponseEntity<?> createClass(@RequestBody Class newClass) {
        Class createdClass = classService.createClass(newClass);
        return ResponseEntity.ok(createdClass);
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<Class>> fetchAllClasses() {
        List<Class> classes = classService.getAllClasses();
        return ResponseEntity.ok(classes);
    }

    @DeleteMapping("/delete")
    public void deleteClassesByIds(@RequestBody List<Long> classIds) {
        classService.deleteClassesByIds(classIds);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateClass(@RequestBody UpdateClassRequest updateRequest) {
        Class updatedClass = classService.updateClass(updateRequest);
        if (updatedClass != null) {
            return ResponseEntity.ok(updatedClass);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/status")
    public ResponseEntity<?> updateClassStatus(@RequestBody UpdateClassStatusRequest updateRequest) {
        Long id = updateRequest.getId();
        String status = updateRequest.getStatus();
        Class updatedClass = classService.updateClassStatus(id, status);
        if (updatedClass != null) {
            return ResponseEntity.ok(updatedClass);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
