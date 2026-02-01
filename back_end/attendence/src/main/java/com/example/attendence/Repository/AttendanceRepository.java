package com.example.attendence.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.attendence.Model.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Attendance findByRegNoAndDateAndStartTime(String regNo, String date, String startTime);

}