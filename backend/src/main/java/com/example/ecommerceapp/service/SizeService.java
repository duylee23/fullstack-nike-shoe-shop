package com.example.ecommerceapp.service;


import com.example.ecommerceapp.entity.Size;
import com.example.ecommerceapp.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SizeService {
    private final SizeRepository sizeRepository;

    public List<Size> getAllSize() {
        return this.sizeRepository.findAll();
    }
    public Size getSizesByNumber(Long sizeNumber) {
        return this.sizeRepository.findBySizeNumber(sizeNumber);
    }
}
