package com.example.ecommerceapp.repository;

import com.example.ecommerceapp.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size, Long> {
    Size findBySizeNumber(double sizeNumber);
}
