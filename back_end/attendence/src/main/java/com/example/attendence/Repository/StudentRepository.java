package com.example.attendence.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.attendence.Model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByEmail(String email);

    List<Student> findByBranchAndYear(String branch, String year);
}
