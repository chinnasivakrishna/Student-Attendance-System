package com.example.attendence.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendence.Model.Student;
import com.example.attendence.Repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        // Your registration logic here
        return studentRepository.save(student);
    }

    public Student findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public boolean isValidStudent(String email, String password) {
        Student student = findByEmail(email);
        return student != null && student.getRegNo().equals(password);
    }

    public List<Map<String, Object>> fetchStudentsData() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(student -> {
            Map<String, Object> studentData = new HashMap<>();
            studentData.put("id", student.getId());
            studentData.put("regNo", student.getRegNo());
            studentData.put("name", student.getName());
            studentData.put("email", student.getEmail());
            studentData.put("branch", student.getBranch());
            studentData.put("year", student.getYear());
            studentData.put("mobile", student.getMobile());
            // Add other necessary data if needed
            return studentData;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void deleteStudentsByIds(List<Long> studentIds) {
        for (Long id : studentIds) {
            studentRepository.deleteById(id);
        }
    }

    public Student updateStudent(Student updatedStudent) {
        // Check if the student with the given ID exists
        Student existingStudent = studentRepository.findById(updatedStudent.getId()).orElse(null);
        if (existingStudent != null) {
            // Update the existing student's fields
            existingStudent.setName(updatedStudent.getName());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setRegNo(updatedStudent.getRegNo());
            existingStudent.setBranch(updatedStudent.getBranch());
            existingStudent.setYear(updatedStudent.getYear());
            existingStudent.setMobile(updatedStudent.getMobile());
            // Save the updated student
            return studentRepository.save(existingStudent);
        }
        return null; // Return null if the student with the given ID is not found
    }
}