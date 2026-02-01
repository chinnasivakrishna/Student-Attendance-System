package com.example.attendence.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.attendence.Model.Class;
import com.example.attendence.Model.UpdateClassRequest;
import com.example.attendence.Repository.ClassRepository;

import jakarta.transaction.Transactional;

@Service
public class ClassService {
    @Autowired
    private ClassRepository classRepository;

    public Class createClass(Class newClass) {
        return classRepository.save(newClass);
    }

    public List<Class> getAllClasses() {
        return classRepository.findAll();
    }

    @Transactional
    public void deleteClassesByIds(List<Long> classIds) {
        for (Long id : classIds) {
            classRepository.deleteById(id);
        }
    }

    @Transactional
    public Class updateClass(UpdateClassRequest updateRequest) {
        Optional<Class> optionalClass = classRepository.findById(updateRequest.getId());
        if (optionalClass.isPresent()) {
            Class existingClass = optionalClass.get();
            existingClass.setBranch(updateRequest.getBranch());
            existingClass.setYear(updateRequest.getYear());
            existingClass.setDate(updateRequest.getDate());
            existingClass.setStartTime(updateRequest.getStartTime());
            existingClass.setEndTime(updateRequest.getEndTime());
            existingClass.setSubject(updateRequest.getSubject());
            existingClass.setTeacherEmail(updateRequest.getTeacherEmail());
            return classRepository.save(existingClass);
        } else {
            return null; // Handle case where the class with the given id is not found
        }
    }

    public Class updateClassStatus(Long id, String status) {
        Class existingClass = classRepository.findById(id).orElse(null);
        if (existingClass != null) {
            existingClass.setStatus(status);
            return classRepository.save(existingClass);
        } else {
            return null; // Handle case where the class with the given id is not found
        }
    }

}
