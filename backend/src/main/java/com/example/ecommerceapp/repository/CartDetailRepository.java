package com.example.ecommerceapp.repository;

import com.example.ecommerceapp.entity.Cart;
import com.example.ecommerceapp.entity.CartDetail;
import com.example.ecommerceapp.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    boolean existsByCartAndProduct(Cart cart, Product product);
    CartDetail findByCartAndProductAndSize(Cart cart, Product product, String size);
    List<CartDetail> findCartDetailByCart(Cart cart);
}
