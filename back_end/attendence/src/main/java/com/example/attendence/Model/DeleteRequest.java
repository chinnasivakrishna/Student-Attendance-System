package com.example.attendence.Model;

import java.util.List;

public class DeleteRequest {

    private List<Long> classIds;
    private List<String> regNos;

    public List<Long> getClassIds() {
        return classIds;
    }

    public void setClassIds(List<Long> classIds) {
        this.classIds = classIds;
    }

    public List<String> getRegNos() {
        return regNos;
    }

    public void setRegNos(List<String> regNos) {
        this.regNos = regNos;
    }
}
