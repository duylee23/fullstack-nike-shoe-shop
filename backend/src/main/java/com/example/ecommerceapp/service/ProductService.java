package com.example.ecommerceapp.service;


import com.example.ecommerceapp.entity.Product;
import com.example.ecommerceapp.entity.Size;
import com.example.ecommerceapp.repository.ProductRepository;
import com.example.ecommerceapp.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final SizeRepository sizeRepository;
    public List<Product> getAllProducts() {return this.productRepository.findAll();}
    public Product handleSaveProduct(Product product) { return this.productRepository.save(product);}
    public Product getProductById(long id){ return this.productRepository.findById(id);}
    public void deleteProductById(long id) {this.productRepository.deleteById(id);}
    public Product createProduct(Product product) {
        return this.productRepository.save(product);
    }
    public List<Size> getAllSizes() {
        return this.sizeRepository.findAll();
    }
}
