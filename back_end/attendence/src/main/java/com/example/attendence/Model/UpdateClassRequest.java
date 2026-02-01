package com.example.attendence.Model;

public class UpdateClassRequest {
    private Long id;
    private String branch;
    private String year;
    private String date;
    private String startTime;
    private String endTime;
    private String subject;
    private String teacherEmail;

    public UpdateClassRequest() {
    }

    public UpdateClassRequest(Long id, String branch, String year, String date, String startTime, String endTime,
            String subject, String teacherEmail) {
        this.id = id;
        this.branch = branch;
        this.year = year;
        this.date = date;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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