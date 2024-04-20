package com.example.ecommerceapp.repository;

import com.example.ecommerceapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findById(long id);
    List<Product> findAll();
}
