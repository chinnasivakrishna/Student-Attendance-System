package com.example.attendence.Service;

import com.example.attendence.Model.Teacher;
import com.example.attendence.Repository.TeacherRepository;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher registerTeacher(Teacher teacher) {
        // Your registration logic here
        return teacherRepository.save(teacher);
    }

    public Teacher findByEmail(String email) {
        return teacherRepository.findByEmail(email);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Transactional
    public void deleteTeachersByIds(List<Long> teacherIds) {
        for (Long id : teacherIds) {
            teacherRepository.deleteById(id);
        }
    }
}
