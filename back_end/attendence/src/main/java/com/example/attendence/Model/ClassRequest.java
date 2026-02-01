package com.example.attendence.Model;

import java.util.List;

public class ClassRequest {
    private Long id;
    private String branch;
    private String year;
    private List<String> regNos;
    private List<Long> selectedStudents;
    private String selectedDate;
    private String startTime;
    private String endTime;
    private String subject;
    private String teacherEmail;

    public ClassRequest() {
    }

    public ClassRequest(Long id, String branch, String year, List<String> regNos, List<Long> selectedStudents,
            String selectedDate, String startTime, String endTime, String subject, String teacherEmail) {
        this.id = id;
        this.branch = branch;
        this.year = year;
        this.regNos = regNos;
        this.selectedStudents = selectedStudents;
        this.selectedDate = selectedDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
        this.teacherEmail = teacherEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<String> getRegNos() {
        return regNos;
    }

    public void setRegNos(List<String> regNos) {
        this.regNos = regNos;
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

    public String getTeacherEmail() {
        return teacherEmail;
    }

    public void setTeacherEmail(String teacherEmail) {
        this.teacherEmail = teacherEmail;
    }

}
