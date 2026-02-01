package com.example.attendence.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendence.Model.Attendance;
import com.example.attendence.Model.AttendanceRequest;
import com.example.attendence.Model.UpdatedAttendanceDTO;
import com.example.attendence.Repository.AttendanceRepository;

import jakarta.transaction.Transactional;

@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;

    @Autowired
    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<Attendance> getAllStudents() {
        return attendanceRepository.findAll();
    }

    public void markAttendance(AttendanceRequest attendanceRequest) {
        Attendance attendance = new Attendance();
        attendance.setRegNo(attendanceRequest.getRegNo());
        attendance.setAttendanceStatus(attendanceRequest.getAttendanceStatus());
        attendance.setDate(attendanceRequest.getDate());
        attendance.setStartTime(attendanceRequest.getStartTime());
        attendance.setEndTime(attendanceRequest.getEndTime());
        attendance.setSubject(attendanceRequest.getSubject());
        attendance.setEmail(attendanceRequest.getEmail());
        attendance.setMobile(attendanceRequest.getMobile());

        attendanceRepository.save(attendance);
    }

    public void updateAttendance(List<UpdatedAttendanceDTO> updatedAttendanceDTOList) {
        for (UpdatedAttendanceDTO updatedAttendanceDTO : updatedAttendanceDTOList) {
            // Fetch existing attendance record based on criteria (e.g., regNo, date,
            // startTime, etc.)
            Attendance existingAttendance = attendanceRepository.findByRegNoAndDateAndStartTime(
                    updatedAttendanceDTO.getRegNo(), updatedAttendanceDTO.getDate(),
                    updatedAttendanceDTO.getStartTime());
            if (existingAttendance != null) {
                // Update the existing attendance record with the new attendance status
                existingAttendance.setAttendanceStatus(updatedAttendanceDTO.getAttendanceStatus());
                attendanceRepository.save(existingAttendance); // Save the updated attendance record
            }
            // Handle case where existing attendance record is not found
            else {
                // You may choose to throw an exception, log a message, or handle it in another
                // way
            }
        }
    }

}
