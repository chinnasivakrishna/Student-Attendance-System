package com.example.attendence.Model;

import java.util.List;

public class ClassDTO {
    private Long id;
    private List<Long> selectedStudents;
    private String selectedDate;
    private String startTime;
    private String endTime;
    private String subject;
    private String teacher_email;

    public ClassDTO() {
    }

    public ClassDTO(Long id, List<Long> selectedStudents, String selectedDate, String startTime, String endTime,
            String subject, String teacher_email) {
        this.id = id;
        this.selectedStudents = selectedStudents;
        this.selectedDate = selectedDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
        this.teacher_email = teacher_email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Long> getSelectedStudents() {
        return selectedStudents;
    }

    public void setSelectedStudents(List<Long> selectedStudents) {
        this.selectedStudents = selectedStudents;
    }

    public String getSelectedDate() {
        return selectedDate;
    }

    public void setSelectedDate(String selectedDate) {
        this.selectedDate = selectedDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTeacher_email() {
        return teacher_email;
    }

    public void setTeacher_email(String teacher_email) {
        this.teacher_email = teacher_email;
    }

    // Getters and setters
    // Constructor
}