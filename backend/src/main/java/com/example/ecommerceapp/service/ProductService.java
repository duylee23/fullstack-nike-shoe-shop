package com.example.ecommerceapp.service;


import com.example.ecommerceapp.model.Product;
import com.example.ecommerceapp.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public List<Product> getAllProducts() {return this.productRepository.findAll();}
    public Product handleSaveProduct(Product product) { return this.productRepository.save(product);}
    public Product getProductById(long id){ return this.productRepository.findById(id);}
    public void deleteAProduct(long id) {this.productRepository.deleteById(id);}
}
