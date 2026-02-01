package com.example.attendence.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.attendence.Model.Class;

import jakarta.transaction.Transactional;

@Repository
public interface ClassRepository extends JpaRepository<Class, Long> {
    void deleteAllByIdIn(List<Long> classIds);

    Optional<Class> findById(Long id);

}