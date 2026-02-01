package com.example.attendence.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.attendence.Model.UpdateClassStatusRequest;

public interface ClassStatusRepository extends JpaRepository<UpdateClassStatusRequest, Long> {
    // Add custom query methods if needed
}