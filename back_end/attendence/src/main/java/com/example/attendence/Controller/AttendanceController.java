package com.example.attendence.Controller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendence.Model.Attendance;
import com.example.attendence.Model.AttendanceRequest;
import com.example.attendence.Model.UpdatedAttendanceDTO;
import com.example.attendence.Repository.AttendanceRepository;
import com.example.attendence.Service.AttendanceService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<Attendance>> fetchAllStudents() {
        List<Attendance> students = attendanceService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @PostMapping("/mark")
    public void markAttendance(@RequestBody AttendanceRequest attendanceRequest) {
        attendanceService.markAttendance(attendanceRequest);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAttendance(@RequestBody List<UpdatedAttendanceDTO> updatedAttendanceDTOList) {
        try {
            attendanceService.updateAttendance(updatedAttendanceDTOList);
            return ResponseEntity.ok("Attendance updated successfully");
        } catch (Exception e) {
            return ResponseEntity.ok("Error updating attendance: " + e.getMessage());
        }
    }

}