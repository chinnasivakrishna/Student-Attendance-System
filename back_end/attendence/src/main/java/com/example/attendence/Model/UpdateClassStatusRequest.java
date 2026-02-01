package com.example.attendence.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UpdateClassStatusRequest {
    @Id
    private Long id;
    private String status;

    public UpdateClassStatusRequest(Long id, String status) {
        this.id = id;
        this.status = status;
    }

    public UpdateClassStatusRequest() {
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}